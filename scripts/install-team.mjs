#!/usr/bin/env node
// Loads Dan's team (team.json) into a running Better than GrokBot.
// Safe to re-run: bots are matched by name within their workspace, routines by bot + title.
// Every routine it creates is left PAUSED.
//
//   node scripts/install-team.mjs --dry-run            # show the plan, change nothing
//   node scripts/install-team.mjs                      # milestone 1: AI Co-Founder, Funding Launch, their routines
//   node scripts/install-team.mjs --milestone 2        # also Sales Manager and Revenue Analyst (3 adds Call Bank)
//   node scripts/install-team.mjs --personal           # also the Personal workspace, led by the Personal Assistant
//   node scripts/install-team.mjs --only "Call Bank"   # one bot and its routines (the Money Manager is added this way)
//   node scripts/install-team.mjs --update             # after a routine file changes, or daylight saving moves the Mac's
//                                                      # clock against Eastern: replace changed routines, each kept on or off
//
// Options: --api <url> (default team.json app.api) · --no-skills
//          --skills-dir <path> (default ~/.bops/workspace/capabilities/skills)
//          --btg-dir <path> (a Better than GrokBot checkout; the full charters are copied to its charters/)

import { readFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { ROOT, convertSchedule, dstShift, sameSchedule } from "./btg-team.mjs";

const MAIN_WORKSPACE = "ws_main";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};

const team = JSON.parse(readFileSync(join(ROOT, "team.json"), "utf8"));
const API = (opt("--api") ?? team.app.api).replace(/\/$/, "");
const DRY = flag("--dry-run");
const ONLY = opt("--only");
const MILESTONE = Number(opt("--milestone") ?? 1);
const PERSONAL = flag("--personal");
const UPDATE = flag("--update");
const log = (...a) => console.log(...a);

const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();
const wsOf = (b) => b.workspaceId ?? MAIN_WORKSPACE;
const allBots = (ws) => [{ ...ws.lead, kind: "lead" }, ...ws.specialists.map((s) => ({ ...s, kind: "specialist" }))];

/**
 * Milestone 1 by default; later milestones only when asked. The Personal workspace's lead comes with --personal,
 * and its specialists only by name with --only, after Dan says yes to each (START-HERE, Personal account).
 */
function wanted(ws, b) {
  if (ONLY) return sameName(b.name, ONLY);
  if (ws.optional) return PERSONAL && b.kind === "lead";
  return b.milestone === null || (typeof b.milestone === "number" && b.milestone <= MILESTONE);
}

// ---- API ------------------------------------------------------------------

async function call(method, path, body) {
  if (DRY && method !== "GET") {
    log(`  [dry-run] ${method} ${path} ${body ? JSON.stringify(body).slice(0, 160) : ""}`);
    return { dryRun: true, id: `dry_${Math.random().toString(36).slice(2, 8)}`, botId: `dry_${Math.random().toString(36).slice(2, 8)}` };
  }
  const res = await fetch(API + path, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${json.error ?? text.slice(0, 200)}`);
  return json;
}

// ---- install --------------------------------------------------------------

async function main() {
  if (!Number.isInteger(MILESTONE) || MILESTONE < 1) throw new Error("--milestone takes a whole number: 1, 2 or 3");
  if (ONLY) {
    const ws = team.workspaces.find((w) => allBots(w).some((b) => sameName(b.name, ONLY)));
    const reserved = team.workspaces.flatMap((w) => w.reserved).find((b) => sameName(b.name, ONLY));
    if (reserved) throw new Error(`${reserved.name} is reserved: it gets a role and routines only when Dan decides to start it (${reserved.charter}).`);
    if (!ws) throw new Error(`No bot named "${ONLY}" in team.json.`);
  }
  log(`Dan's team → ${API}${DRY ? " (dry run: nothing will change)" : ""}\n`);

  const health = await call("GET", "/api/health").catch((e) => { throw new Error(`The app isn't answering at ${API}/api/health (${e.message}). Start it first (INSTALL.md step 2).`); });
  if (!health.bops) throw new Error(`${API}/api/health did not answer {"bops":true}; is this Better than GrokBot?`);

  let { state, instance } = await call("GET", "/api/state");
  const appTz = instance?.timezone ?? state?.instance?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  log(`App clock: ${appTz} · team schedules written in ${team.team_timezone}\n`);

  const report = { bots: [], routines: [], warnings: [] };
  const shift = dstShift(team.team_timezone, appTz);
  if (shift) report.warnings.push(`Daylight saving: ${appTz} and ${team.team_timezone} drift apart on ${shift}. Routine times are fitted for today; run \`node scripts/install-team.mjs --update\` on or after that date.`);
  const refresh = async () => ({ state } = await call("GET", "/api/state"));

  // 1. Who the bots work for.
  if (!ONLY) {
    if (state.owner?.name && !sameName(state.owner.name, team.owner.name)) report.warnings.push(`Owner was "${state.owner.name}"; set to "${team.owner.name}".`);
    if (state.owner?.name !== team.owner.name || state.owner?.about !== team.owner.about) {
      await call("POST", "/api/owner", { name: team.owner.name, about: team.owner.about });
      log(`✓ Owner: ${team.owner.name}`);
    } else log(`✓ Owner: ${team.owner.name} (already set)`);
  }

  // 2. Workspaces and bots.
  const botIds = {}; // `${wsKey}:${name}` → botId, for the bots this run installs
  let businessId;
  for (const ws of team.workspaces) {
    const todo = allBots(ws).filter((b) => wanted(ws, b));
    if (!todo.length) {
      if (ws.optional && !PERSONAL && !ONLY) log(`\n- Workspace "${ws.name}" skipped (add --personal when Dan wants it)`);
      continue;
    }
    const named = (state.workspaces ?? []).find((w) => sameName(w.name, ws.name));
    let wsId = named?.id;
    if (!wsId && ws.use_current) {
      // First install: the business team goes into the workspace that's open, unless that's another of this team's.
      wsId = state.workspace ?? MAIN_WORKSPACE;
      const open = (state.workspaces ?? []).find((w) => w.id === wsId)?.name;
      if (open && team.workspaces.some((o) => o !== ws && sameName(o.name, open))) throw new Error(`The app has "${open}" open. Switch to the main workspace in the app, then run this again.`);
      await call("PATCH", "/api/workspaces", { id: wsId, name: ws.name });
    }
    if (!wsId) {
      if (ONLY) throw new Error(`Workspace "${ws.name}" doesn't exist yet. Run with --personal first.`);
      const back = state.workspace ?? MAIN_WORKSPACE;
      wsId = (await call("POST", "/api/workspaces", { name: ws.name })).id;
      await call("PATCH", "/api/workspaces", { current: businessId ?? back }); // creating one switches to it; switch back
    }
    if (ws.use_current) businessId = wsId;
    await refresh();
    log(`\nWorkspace "${ws.name}" (${wsId})`);
    const inWs = () => (state.bots ?? []).filter((b) => wsOf(b) === wsId);

    for (const w of todo) {
      // The workspace's main bot is the lead (and its head of operations); everyone else is a specialist.
      const b = w.kind === "lead" ? inWs().find((x) => x.isMain) : inWs().find((x) => !x.isMain && sameName(x.name, w.name));
      if (b) {
        const patch = { botId: b.id };
        if (b.name !== w.name) patch.name = w.name;
        if (b.role !== w.role) patch.role = w.role;
        if (Object.keys(patch).length > 1) await call("PATCH", "/api/bots", patch);
        log(`  ✓ ${w.name} (${w.kind}) — ${Object.keys(patch).length > 1 ? `updated ${Object.keys(patch).filter((k) => k !== "botId").join(", ")}` : "already set"}`);
        if (w.kind === "specialist" && b.computer === "own") report.warnings.push(`${w.name} has its own computer, so it can't see ${ws.folder} on ${inWs().find((x) => x.isMain)?.name}'s. Set it to Shared (its Details → Orgo computer, or PATCH /api/bots {"botId":"${b.id}","computer":"shared"}).`);
        botIds[`${ws.key}:${w.name}`] = b.id;
        report.bots.push({ name: w.name, status: "updated" });
      } else if (w.kind === "lead") {
        if (!DRY) throw new Error(`Workspace "${ws.name}" has no main bot to make ${w.name}.`);
        log(`  [dry-run] its main bot becomes ${w.name} (lead)`);
        botIds[`${ws.key}:${w.name}`] = "dry_lead";
        report.bots.push({ name: w.name, status: "created" });
      } else {
        const made = await call("POST", "/api/bots", { name: w.name, role: w.role, workspaceId: wsId, ownComputer: w.own_computer === true });
        if (made.note) report.warnings.push(`${w.name}: ${made.note}`);
        botIds[`${ws.key}:${w.name}`] = made.botId;
        log(`  + ${w.name} (${w.kind}) created`);
        report.bots.push({ name: w.name, status: "created" });
      }
    }
    for (const b of allBots(ws).filter((b) => !wanted(ws, b) && !ONLY)) {
      const exists = inWs().some((x) => !x.isMain && sameName(x.name, b.name));
      if (!exists) log(`  · ${b.name} ${typeof b.milestone === "number" ? `waits for milestone ${b.milestone} (--milestone ${b.milestone})` : `only after Dan says yes (--only "${b.name}")`}`);
    }
    for (const r of ws.reserved) if (!ONLY) log(`  · ${r.name} reserved: created only when Dan decides (${r.charter})`);
  }

  // 3. Routines, all paused.
  await refresh();
  log(`\nRoutines (all left paused)`);
  for (const r of team.routines) {
    const botId = botIds[`${r.workspace}:${r.bot}`];
    if (!botId) continue; // its bot isn't part of this run
    if (!ONLY && typeof r.milestone === "number" && r.milestone > MILESTONE) continue;
    const sched = convertSchedule(r.schedule, team.team_timezone, appTz);
    if (sched.note) report.warnings.push(`${r.title}: ${sched.note}`);
    delete sched.note;
    const shown = sched.kind === "weekly" ? `weekly day ${sched.day} ${sched.time}` : `${sched.kind} ${sched.time}`;
    const exists = (state.routines ?? []).find((x) => x.botId === botId && sameName(x.title, r.title));
    const stale = exists && (!sameSchedule(exists.schedule, sched) || exists.goal !== r.goal);
    if (exists && !(UPDATE && stale)) {
      log(`  ✓ ${r.bot} · ${r.title} — exists (${exists.enabled ? "ENABLED" : "paused"}${stale ? "; out of date, run with --update" : ""})`);
      report.routines.push({ title: r.title, status: "exists" });
      continue;
    }
    // --update: the app can't edit a routine's goal or schedule, so replace it and keep it on or off as it was.
    if (exists) await call("DELETE", "/api/routines", { id: exists.id });
    const made = await call("POST", "/api/routines", { botId, title: r.title, goal: r.goal, schedule: sched, where: r.where });
    const keepOn = exists?.enabled === true;
    if (made.id && !keepOn) await call("PATCH", "/api/routines", { id: made.id, enabled: false });
    log(`  ${exists ? "↻" : "+"} ${r.bot} · ${r.title} — ${shown} app time (${r.schedule.time} ET), ${keepOn ? "ENABLED (as before)" : "paused"}`);
    for (const n of r.notes ?? []) if (!report.warnings.includes(`${r.name}: ${n}`)) report.warnings.push(`${r.name}: ${n}`);
    report.routines.push({ title: r.title, status: exists ? "replaced" : "created" });
  }

  // 4. Skills for tasks on Dan's Mac, and the full charters in the app checkout. Cloud tasks read the
  //    skills from /workspace/capabilities/skills on the bot's computer, which the lead's setup task fills.
  if (!flag("--no-skills")) {
    const dest = opt("--skills-dir") ?? join(homedir(), ".bops", "workspace", "capabilities", "skills");
    const names = team.skills.map((s) => s.path).filter((p) => existsSync(join(ROOT, p, "SKILL.md")));
    if (DRY) log(`\n  [dry-run] copy ${names.length} skills → ${dest}`);
    else {
      mkdirSync(dest, { recursive: true });
      for (const p of names) cpSync(join(ROOT, p), join(dest, basename(p)), { recursive: true });
      log(`\n✓ ${names.length} skills → ${dest}`);
    }
  }
  const btg = opt("--btg-dir");
  if (btg) {
    if (DRY) log(`  [dry-run] copy charters → ${join(btg, "charters")}`);
    else { cpSync(join(ROOT, "agents"), join(btg, "charters"), { recursive: true }); log(`✓ Charters → ${join(btg, "charters")}`); }
  }

  log(`\nDone: ${report.bots.length} bots, ${report.routines.length} routines.`);
  for (const w of report.warnings) log(`⚠ ${w}`);
  log(`\nNext: INSTALL.md step 5, the lead's setup task on its computer. Nothing runs until Dan switches it on.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((e) => { console.error(`✗ ${e.message}`); process.exit(1); });
}
