// The Better than GrokBot view of this repo, built from manifest.json, the charters and routines/*.prompt.
// Pure: it reads files and changes nothing. build-team.mjs writes the result to team.json; install-team.mjs
// and verify.mjs import the helpers.

import { readFileSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

// ---- charters and routine files ---------------------------------------------

/** The charter's Better than GrokBot role: the text between <!-- btg-role --> markers, 1-500 characters. */
export function roleOf(charterPath) {
  const m = read(charterPath).match(/<!-- btg-role -->([\s\S]*?)<!-- \/btg-role -->/);
  if (!m) throw new Error(`${charterPath}: no <!-- btg-role --> block`);
  const role = m[1].replace(/\s+/g, " ").trim();
  if (!role || role.length > 500) throw new Error(`${charterPath}: role must be 1-500 characters (is ${role.length})`);
  return role;
}

/** A routine file: its header lines (NAME, OWNER, ...) and the instruction below "---". */
export function readRoutine(path) {
  const [head, body] = read(path).split(/\n---\n/);
  if (body === undefined) throw new Error(`${path}: no "---" line`);
  const fields = Object.fromEntries(head.split("\n").map((l) => l.match(/^([A-Z]+):\s*(.*)$/)).filter(Boolean).map((m) => [m[1], m[2].trim()]));
  return { ...fields, body: body.trim() };
}

/** "7:47 AM" → "07:47". */
function clock24(text) {
  const m = text.trim().match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
  if (!m || +m[1] < 1 || +m[1] > 12 || +m[2] > 59) throw new Error(`can't read the time "${text}"`);
  const h = (+m[1] % 12) + (m[3] === "PM" ? 12 : 0);
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

/**
 * A routine's WHEN line as Better than GrokBot schedules. The app has daily, weekdays, weekly and once,
 * so each time of day becomes its own routine, and "the 4th of every month" becomes daily with a date check.
 * Anything this doesn't recognise is an error, never a guess.
 */
export function parseWhen(when) {
  const notes = [];
  let text = when.trim();
  const webhook = text.match(/,? and by webhook$/);
  if (webhook) {
    text = text.slice(0, webhook.index);
    notes.push("Better than GrokBot routines have no webhook trigger, so this one runs on its schedule only.");
  }
  const until = text.match(/, until (.+)$/);
  if (until) {
    text = text.slice(0, until.index);
    notes.push(`Runs until ${until[1]}; then Dan switches it off.`);
  }
  const m = text.match(/^(?:Every day|Every weekday \(Monday to Friday\)|Every (Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)|The (\d{1,2})(?:st|nd|rd|th) of every month) at (.+)$/);
  if (!m) throw new Error(`can't read the schedule "${when}"`);
  const times = m[3].split(/, | and /).map(clock24);
  let base;
  let dayOfMonth = null;
  if (text.startsWith("Every day")) base = { kind: "daily" };
  else if (text.startsWith("Every weekday")) base = { kind: "weekdays" };
  else if (m[1]) base = { kind: "weekly", day: DAYS.indexOf(m[1]) };
  else {
    dayOfMonth = +m[2];
    if (dayOfMonth < 1 || dayOfMonth > 28) throw new Error(`"${when}": a monthly day must be 1-28 so it happens every month`);
    base = { kind: "daily" };
    notes.push("Better than GrokBot has no monthly schedule, so this runs daily and its first line stops it on every other day.");
  }
  return { schedules: times.map((time) => ({ ...base, time })), dayOfMonth, notes };
}

const ordinal = (n) => `${n}${n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th"}`;
const clock12 = (time) => {
  const [h, mi] = time.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(mi).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

/** What the bot is asked to do when the routine fires: where its charter and skills are, then the routine file's instruction. */
export function goalFor({ bot, charter, folder, dayOfMonth, body }) {
  const lines = [
    `Better than GrokBot routine for ${bot}. Do it on your cloud computer. First read your Profile in ${folder}/repo/${charter} and follow it. A skill named below is in /workspace/capabilities/skills/<name>/SKILL.md, or ${folder}/repo/skills/<name>/SKILL.md if it isn't there. Times are Eastern (America/New_York).`,
  ];
  if (dayOfMonth) lines.push(`Date check: this job runs on the ${ordinal(dayOfMonth)} of the month only. If today's date in Eastern time isn't the ${ordinal(dayOfMonth)}, stop now without writing or sending anything.`);
  return `${lines.join(" ")}\n\n${body}`;
}

// ---- the team ---------------------------------------------------------------

/** team.json: what install-team.mjs creates in Better than GrokBot. */
export function buildTeam(manifest = JSON.parse(read("manifest.json"))) {
  const btg = manifest.better_than_grokbot;
  const milestone = (v) => (v === undefined || v === "-" ? null : /^\d+$/.test(String(v)) ? Number(v) : v);
  const workspaces = Object.entries(manifest.accounts).map(([key, account]) => {
    const agents = manifest.agents.filter((a) => a.account === key);
    const lead = agents.find((a) => a.pinned);
    if (!lead) throw new Error(`manifest: no pinned lead for the ${key} account`);
    const entry = (a) => ({ name: a.name, charter: a.charter, milestone: milestone(a.milestone) });
    const order = (a) => (typeof milestone(a.milestone) === "number" ? milestone(a.milestone) : Infinity);
    return {
      key,
      name: btg.workspaces[key],
      use_current: key === "business",
      optional: key !== "business",
      folder: account.workspace,
      lead: { ...entry(lead), role: roleOf(lead.charter) },
      // Every bot in a workspace shares the lead's computer, so they all see the one shared folder.
      specialists: agents.filter((a) => a !== lead && !a.reserved).sort((a, b) => order(a) - order(b))
        .map((a) => ({ ...entry(a), own_computer: false, role: roleOf(a.charter) })),
      reserved: agents.filter((a) => a.reserved).map(entry),
    };
  });

  const routines = [];
  for (const agent of manifest.agents) {
    const ws = workspaces.find((w) => w.key === agent.account);
    for (const file of agent.routines) {
      const r = readRoutine(file);
      if (r.OWNER !== agent.name) throw new Error(`${file}: OWNER is ${r.OWNER}, but the manifest lists it under ${agent.name}`);
      if (r.ACCOUNT !== agent.account) throw new Error(`${file}: ACCOUNT is ${r.ACCOUNT}, but ${agent.name} is on ${agent.account}`);
      const { schedules, dayOfMonth, notes } = parseWhen(r.WHEN);
      for (const schedule of schedules) {
        routines.push({
          file,
          name: r.NAME,
          // Several times a day become several routines; the time in the title keeps each one findable on re-runs.
          title: schedules.length > 1 ? `${r.NAME} (${clock12(schedule.time)})` : r.NAME,
          bot: agent.name,
          workspace: agent.account,
          milestone: milestone(r.MILESTONE),
          when: r.WHEN,
          schedule,
          where: "cloud",
          ...(dayOfMonth ? { day_of_month: dayOfMonth } : {}),
          ...(notes.length ? { notes } : {}),
          goal: goalFor({ bot: agent.name, charter: agent.charter, folder: ws.folder, dayOfMonth, body: r.body }),
        });
      }
    }
  }

  return {
    schema_version: 1,
    generated: "Built from manifest.json, agents/*.md and routines/*.prompt by `node scripts/build-team.mjs`. Don't edit by hand.",
    package: basename(manifest.repo_url),
    app: { name: "Better than GrokBot", repo: btg.app_repo, api: btg.app_api, tested_against: btg.tested_against },
    team_timezone: manifest.timezone,
    owner: btg.owner,
    workspaces,
    routines,
    skills: manifest.skills,
    external_skills: manifest.external_skills,
  };
}

// ---- time zones: team.json times are Eastern; the app fires routines on its Mac's clock ----

function offsetMs(tz, instant) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(instant);
  const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return Date.UTC(+v.year, +v.month - 1, +v.day, +v.hour, +v.minute, +v.second) - instant.getTime();
}

function wallToInstant(y, mo, d, h, mi, tz) {
  const guess = Date.UTC(y, mo, d, h, mi);
  const first = guess - offsetMs(tz, new Date(guess));
  return new Date(guess - offsetMs(tz, new Date(first)));
}

function wallIn(tz, instant) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23", weekday: "short", hour: "2-digit", minute: "2-digit",
  }).formatToParts(instant);
  const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(v.weekday);
  return { time: `${v.hour}:${v.minute}`, day };
}

/** The first date within a year when `fromTz` and `toTz` stop being a fixed distance apart (daylight saving). */
export function dstShift(fromTz, toTz, now = new Date()) {
  const gap = (d) => offsetMs(fromTz, d) - offsetMs(toTz, d);
  const start = gap(now);
  for (let day = 1; day <= 366; day++) {
    const d = new Date(now.getTime() + day * 86400000);
    if (gap(d) !== start) return d.toISOString().slice(0, 10);
  }
  return null;
}

/** A daily/weekdays/weekly schedule written in `fromTz`, re-expressed on the `toTz` clock (uses today's offsets). */
export function convertSchedule(schedule, fromTz, toTz, now = new Date()) {
  if (fromTz === toTz || schedule.kind === "once") return { ...schedule };
  const [h, mi] = schedule.time.split(":").map(Number);
  // A reference day in fromTz: today, or for weekly the next matching weekday.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: fromTz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(now);
  const t = Object.fromEntries(today.map((p) => [p.type, p.value]));
  let ref = Date.UTC(+t.year, +t.month - 1, +t.day);
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(t.weekday);
  if (schedule.kind === "weekly") ref += ((schedule.day - dow + 7) % 7) * 86400000;
  const r = new Date(ref);
  const local = wallIn(toTz, wallToInstant(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate(), h, mi, fromTz));
  if (schedule.kind === "weekly") return { kind: "weekly", day: local.day, time: local.time };
  if (schedule.kind === "weekdays" && local.day !== dow) {
    // A weekdays schedule that crosses midnight would shift onto the wrong days; make it daily and say so.
    return { kind: "daily", time: local.time, note: "weekdays schedule crossed midnight in this time zone; installed as daily" };
  }
  return { kind: schedule.kind, time: local.time };
}

export const sameSchedule = (a, b) => a.kind === b.kind && a.time === b.time && (a.kind !== "weekly" || a.day === b.day);
