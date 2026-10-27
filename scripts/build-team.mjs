#!/usr/bin/env node
// Writes team.json from manifest.json, the charters' Better than GrokBot roles and routines/*.prompt.
// Run it after changing any of those. verify.mjs fails while team.json is out of date.
//
//   node scripts/build-team.mjs           # write team.json
//   node scripts/build-team.mjs --check   # exit 1 if team.json is out of date, change nothing

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, buildTeam } from "./btg-team.mjs";

const path = join(ROOT, "team.json");
const text = `${JSON.stringify(buildTeam(), null, 2)}\n`;
const current = existsSync(path) ? readFileSync(path, "utf8") : "";

if (process.argv.includes("--check")) {
  if (current !== text) {
    console.log("✗ team.json is out of date: run node scripts/build-team.mjs");
    process.exit(1);
  }
  console.log("✓ team.json is up to date");
} else {
  writeFileSync(path, text);
  const team = JSON.parse(text);
  const bots = team.workspaces.flatMap((w) => [w.lead, ...w.specialists]);
  console.log(`${current === text ? "✓ team.json already up to date" : "✓ wrote team.json"}: ${team.workspaces.length} workspaces, ${bots.length} bots, ${team.routines.length} routines`);
}
