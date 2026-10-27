#!/usr/bin/env python3
"""Consistency and privacy check for this repo. Run before committing."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
problems = []

manifest = json.loads((ROOT / "manifest.json").read_text())

# Every file the manifest names exists.
for skill in manifest["skills"]:
    if not (ROOT / skill["path"] / "SKILL.md").exists():
        problems.append(f"manifest skill missing: {skill['path']}/SKILL.md")
skill_names = {s["name"] for s in manifest["skills"]}
for agent in manifest["agents"]:
    if not (ROOT / agent["charter"]).exists():
        problems.append(f"manifest charter missing: {agent['charter']}")
    for routine in agent["routines"]:
        if not (ROOT / routine).exists():
            problems.append(f"manifest routine missing: {routine}")
    for skill in agent["skills"]:
        if ":" not in skill and skill not in skill_names:
            problems.append(f"{agent['name']} uses unknown skill: {skill}")
for project in manifest["projects"]:
    if not (ROOT / project).exists():
        problems.append(f"manifest project missing: {project}")

# Every routine file is listed once, has the full header and the guard lines.
listed = {r for a in manifest["agents"] for r in a["routines"]}
for path in sorted((ROOT / "routines").glob("*.prompt")):
    rel = path.relative_to(ROOT).as_posix()
    if rel not in listed:
        problems.append(f"routine not in manifest: {rel}")
    text = path.read_text()
    head, _, body = text.partition("\n---\n")
    for key in ("NAME:", "OWNER:", "ACCOUNT:", "WHEN:", "MILESTONE:", "STATUS:"):
        if key not in head:
            problems.append(f"{rel}: header missing {key}")
    for line in ("Switch check:", "Test mode:", "Isolation guard:", "Lean run:", "Run record:"):
        if line not in body:
            problems.append(f"{rel}: missing '{line}'")

# Every charter has a Profile block; every skill has frontmatter.
CONTRACT_ROWS = ("Owner", "Reads", "Only writer of", "Produces", "Tools and scopes", "Never", "Hands off to",
                 "Limits per run", "Wakes on", "If a run fails", "Stops and tells Dan when", "Done means")
for path in sorted((ROOT / "agents").glob("*.md")):
    text = path.read_text()
    if "## Profile" not in text:
        problems.append(f"{path.relative_to(ROOT)}: no Profile block")
    # Active roles (01-89) carry an Operating contract; reserved ones (90+) don't yet.
    if path.name[:2].isdigit() and int(path.name[:2]) < 90:
        if "## Operating contract" not in text:
            problems.append(f"{path.relative_to(ROOT)}: no Operating contract")
        for row in CONTRACT_ROWS:
            if f"| **{row}** |" not in text:
                problems.append(f"{path.relative_to(ROOT)}: Operating contract missing '{row}'")
for path in sorted(ROOT.glob("**/SKILL.md")):
    text = path.read_text()
    if not (text.startswith("---\n") and "\nname:" in text and "\ndescription:" in text):
        problems.append(f"{path.relative_to(ROOT)}: missing name/description frontmatter")

# Nothing that looks like a secret or a private identifier.
patterns = {
    "Slack token": r"xox[abpr]-[0-9A-Za-z-]{10,}",
    "API key": r"\b(sk|pk|rk)_(live|test)_[0-9A-Za-z]{10,}",
    "OpenAI-style key": r"\bsk-[0-9A-Za-z]{20,}",
    "Slack user ID": r"\bU(?=[0-9A-Z]*[0-9])[0-9A-Z]{8,10}\b",
    "Slack channel ID": r"\bC(?=[0-9A-Z]*[0-9])[0-9A-Z]{8,10}\b",
    "Google Sheet link": r"docs\.google\.com/spreadsheets/d/",
    "email address": r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
}
# Optional extra terms (private names, figures) to keep out, one per line, never committed.
extra = ROOT / "private" / "blocked-terms.txt"
blocked = [t.strip() for t in extra.read_text().splitlines() if t.strip()] if extra.exists() else []

for path in sorted(ROOT.rglob("*")):
    if not path.is_file() or ".git" in path.parts or "private" in path.parts:
        continue
    if path.name == "CLIENT-CONTEXT.md" or path.suffix not in {".md", ".prompt", ".json", ".py", ".txt", ".mjs"}:
        continue
    text = path.read_text(errors="ignore")
    rel = path.relative_to(ROOT)
    for label, pattern in patterns.items():
        for match in re.findall(pattern, text):
            hit = match if isinstance(match, str) else match[0]
            # git@github.com is GitHub's SSH login (a deploy-key clone URL), not someone's address.
            if label == "email address" and (hit.endswith(("@example.com", "@anthropic.com")) or hit == "git@github.com"):
                continue
            problems.append(f"{rel}: possible {label}: {hit[:24]}")
    for term in blocked:
        if re.search(r"(?<![A-Za-z0-9])" + re.escape(term) + r"(?![A-Za-z0-9])", text, re.IGNORECASE):
            problems.append(f"{rel}: blocked term: {term}")

if problems:
    print("\n".join(problems))
    sys.exit(1)
print(f"ok: {len(manifest['agents'])} agents, {len(listed)} routines, {len(skill_names)} skills, {len(manifest['projects'])} projects")
