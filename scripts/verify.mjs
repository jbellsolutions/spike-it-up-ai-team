#!/usr/bin/env node
// Static checks for the Better than GrokBot install. No network, changes nothing.
//   node scripts/verify.mjs

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { ROOT, buildTeam, roleOf, readRoutine, convertSchedule } from "./btg-team.mjs";

const problems = [];
const ok = [];
const check = (cond, good, bad) => (cond ? ok.push(good) : problems.push(bad));

// team.json is what the installer creates, so it must match the files it's built from.
let team;
try { team = JSON.parse(readFileSync(join(ROOT, "team.json"), "utf8")); ok.push("team.json parses"); }
catch (e) { problems.push(`team.json: ${e.message}`); }
let built;
try { built = buildTeam(); ok.push("team.json builds from manifest.json, charters and routines"); }
catch (e) { problems.push(`build: ${e.message}`); }

if (team && built) {
  check(JSON.stringify(team) === JSON.stringify(built), "team.json is up to date", "team.json is out of date: run node scripts/build-team.mjs");
  const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));

  // The app's own limits (better-than-grokbot app/api/owner, bots, workspaces).
  check(team.owner.name.length <= 80, `owner.name ${team.owner.name.length}/80`, `owner.name is ${team.owner.name.length} chars (max 80)`);
  check(team.owner.about.length <= 600, `owner.about ${team.owner.about.length}/600`, `owner.about is ${team.owner.about.length} chars (max 600; the app cuts the rest)`);

  const bots = new Map();
  for (const ws of team.workspaces) {
    check(ws.name.length <= 40, `workspace "${ws.name}" name ok`, `workspace "${ws.name}": names are 40 characters at most`);
    const names = new Set();
    for (const b of [ws.lead, ...ws.specialists]) {
      try {
        const role = roleOf(b.charter);
        ok.push(`${b.name}: role ${role.length}/500`);
        // The role ends by pointing the bot at its full charter on its computer.
        check(role.endsWith(`${ws.folder}/repo/${b.charter}`), `${b.name}: role points to its charter`, `${b.name}: role must end with ${ws.folder}/repo/${b.charter}`);
      } catch (e) { problems.push(`${b.name}: ${e.message}`); }
      check(b.name.length <= 40, `${b.name}: name ok`, `${b.name}: names are 40 characters at most`);
      check(!names.has(b.name.toLowerCase()), `${b.name}: unique in ${ws.name}`, `${b.name}: two bots with that name in ${ws.name}`);
      names.add(b.name.toLowerCase());
      bots.set(`${ws.key}:${b.name}`, b);
    }
    // One shared folder only works if every bot in the workspace is on the lead's computer.
    for (const s of ws.specialists) check(s.own_computer === false, `${s.name}: shares ${ws.lead.name}'s computer`, `${s.name}: must share ${ws.lead.name}'s computer (own_computer: false) to see ${ws.folder}`);
    for (const r of ws.reserved) check(existsSync(join(ROOT, r.charter)), `${r.name}: reserved charter exists`, `${r.name}: missing ${r.charter}`);
  }
  for (const a of manifest.agents.filter((a) => !a.reserved)) check(bots.has(`${a.account}:${a.name}`), `${a.name} is in team.json`, `${a.name} from manifest.json is missing from team.json`);

  // Routines: valid for the app, unique per bot, run in the cloud, and every skill they name exists.
  const skillNames = new Set(manifest.skills.map((s) => s.name));
  const titles = new Set();
  for (const r of team.routines) {
    const key = `${r.workspace}:${r.bot}`;
    check(bots.has(key), `routine "${r.title}" → ${r.bot}`, `routine "${r.title}": no bot ${key}`);
    check(!titles.has(`${key}:${r.title.toLowerCase()}`), `routine "${r.title}" unique for ${r.bot}`, `routine "${r.title}": ${r.bot} has two routines with that title`);
    titles.add(`${key}:${r.title.toLowerCase()}`);
    const s = r.schedule;
    const valid = ["daily", "weekdays", "weekly"].includes(s.kind) && /^([01]\d|2[0-3]):[0-5]\d$/.test(s.time) && (s.kind !== "weekly" || (Number.isInteger(s.day) && s.day >= 0 && s.day <= 6));
    check(valid, `routine "${r.title}" schedule ok`, `routine "${r.title}": bad schedule ${JSON.stringify(s)}`);
    check(r.where === "cloud", `routine "${r.title}" runs in the cloud`, `routine "${r.title}": must run in the cloud, where ${r.workspace} files live`);
    check(r.goal.includes("Switch check:"), `routine "${r.title}" keeps its switch check`, `routine "${r.title}": goal lost its switch check`);
    for (const m of r.goal.matchAll(/\b([a-z]+(?:-[a-z]+)+) skill\b/g)) check(skillNames.has(m[1]), `routine "${r.title}" skill ${m[1]} exists`, `routine "${r.title}" names missing skill ${m[1]}`);
    try { convertSchedule(s, team.team_timezone, "America/Chicago"); } catch (e) { problems.push(`routine "${r.title}": time conversion failed: ${e.message}`); }
  }
  // Every routine file is installed, and only by its owner.
  for (const f of readdirSync(join(ROOT, "routines")).filter((f) => f.endsWith(".prompt"))) {
    const file = `routines/${f}`;
    const owner = readRoutine(file).OWNER;
    const mine = team.routines.filter((r) => r.file === file);
    check(mine.length > 0 && mine.every((r) => r.bot === owner), `${file} → ${owner}`, `${file}: not in team.json, or under the wrong bot`);
  }
}

// Secrets: nothing that looks like a key anywhere in the repo (private/ and CLIENT-CONTEXT.md are git-ignored and skipped).
const SECRET = /(sk-[A-Za-z0-9_-]{20,}|sk-or-v1-[a-f0-9]{20,}|xox[abpr]-[0-9A-Za-z-]{10,}|pit-[0-9a-f-]{20,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  if ([".git", "node_modules", "private"].includes(n) || n === "CLIENT-CONTEXT.md") return [];
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const leaks = walk(ROOT).filter((p) => SECRET.test(readFileSync(p, "utf8")));
check(leaks.length === 0, "no secrets found in repo files", `possible secret in: ${leaks.map((p) => relative(ROOT, p)).join(", ")}`);

for (const p of problems) console.log(`✗ ${p}`);
console.log(`\n${ok.length} checks passed, ${problems.length} problem(s).`);
process.exit(problems.length ? 1 : 0);
