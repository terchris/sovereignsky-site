# Claude Code Instructions for SovereignSky Site

## Issue & Plan Workflow

When asked to **"work on issue #X"** or similar:

### Step 1: Read and Plan

1. Read the issue: `gh issue view <number>`
2. Add "approved" label: `gh issue edit <number> --add-label "approved"`
3. Create a plan file in `docs/plans/backlog/`:
   - `PLAN-<name>.md` if solution is clear
   - `INVESTIGATE-<name>.md` if research needed first
4. **Stop and ask the user to review the plan**

### Step 2: Wait for Approval

Do NOT proceed until the user confirms the plan is approved.

User will say something like:
- "Plan approved"
- "Looks good, start"
- "Go ahead"

### Step 3: Implement

1. Move plan: `mv docs/plans/backlog/PLAN-*.md docs/plans/active/`
2. Work through phases in order
3. Run validation after each phase
4. Update the plan file (mark tasks `[x]`)
5. If validation fails, stop and ask for help

### Step 4: Complete

When user approves the result:

1. Move plan: `mv docs/plans/active/PLAN-*.md docs/plans/completed/`
2. Update status in plan: `## Status: Completed`
3. Commit: `git add . && git commit -m "description - closes #X"`
4. Push: `git push`
5. Close issue: `gh issue close <number> --comment "Fixed in commit [hash]"`

### Plan File Format

See **[docs/PLANS.md](docs/PLANS.md)** for full details.

Every plan needs:
- Header with status, goal, issue link
- Phases with numbered tasks
- Validation commands after each phase
- Acceptance criteria

---

## CRITICAL: Devcontainer Environment

**ALL commands that install packages or run code MUST be executed inside the devcontainer.**

The devcontainer name is `relaxed_napier`. Use this pattern:

```bash
# Install packages
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm install <package>"

# Run npm scripts
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run <script>"

# Run validation
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"

# Run Hugo server (already running in devcontainer)
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo server -D --bind 0.0.0.0"

# Run Node.js scripts
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/<script>.js"
```

**DO NOT run these directly on the host machine:**
- `npm install`
- `npm run`
- `node scripts/*.js`
- `hugo` commands

---

## Project Structure

See **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** for development setup.

```
sovereignsky-site/
├── config/                    # Hugo configuration
├── content/                   # Hugo content (markdown pages)
├── data/                      # Data files and schemas
├── docs/                      # Documentation and plans
│   └── plans/                 # Implementation plans
│       ├── backlog/           # Plans waiting for approval
│       ├── active/            # Currently implementing
│       └── completed/         # Done
├── layouts/                   # Hugo templates
├── scripts/                   # Node.js scripts
└── static/                    # Static assets
```

---

## Key Scripts

### Generate Pages from Data
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-network-pages.js"
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-laws-pages.js"
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-publications-pages.js"
```

### Validate Data Files
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

See **[docs/DATA-VALIDATION.md](docs/DATA-VALIDATION.md)** for schema details.

---

## Hugo Development

The Hugo server runs inside the devcontainer at `http://localhost:1313`.

To restart Hugo:
```bash
docker exec relaxed_napier bash -c "pkill hugo; cd /workspaces/sovereignsky-site && hugo server -D --bind 0.0.0.0 --disableFastRender"
```

See **[docs/PAGE-LAYOUTS.md](docs/PAGE-LAYOUTS.md)** for template information.

---

## Styling

The site uses:
- **Hugo theme**: Blowfish
- **Component library**: DaisyUI (loaded via CDN in `layouts/partials/extend-head.html`)
- **CSS framework**: Tailwind (from Blowfish)
- **Custom CSS**: `assets/css/custom.css`

Prefer Tailwind/DaisyUI classes over custom CSS when possible.
