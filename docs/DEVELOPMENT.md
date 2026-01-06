# Development Guide

Quick reference for local development tasks.

## DevContainer Setup

This project uses a DevContainer based on `mcr.microsoft.com/devcontainers/base:ubuntu-24.04` with Hugo extended edition installed.

When you open the project in VS Code with the DevContainer extension, you're working **inside** the container.

## Hugo Server Commands

### Inside the DevContainer (VS Code terminal)

When working in VS Code's integrated terminal (inside the devcontainer), run commands directly:

```bash
# Start Hugo server
hugo server --bind 0.0.0.0 -p 1313 --disableFastRender

# Restart Hugo (kill and start)
pkill hugo; sleep 1; hugo server --bind 0.0.0.0 -p 1313 --disableFastRender &

# Check if Hugo is running
pgrep -a hugo
```

### From Host Machine (outside container)

When running from your host terminal, first find the devcontainer by its mount.

**Step 1: Find the container**
```bash
docker ps -q | xargs -I {} docker inspect {} \
  --format '{{.Name}} {{range .Mounts}}{{.Destination}}{{end}}' \
  | grep sovereignsky-site | cut -d' ' -f1 | tr -d '/'
```

**Step 2: Restart Hugo** (replace `CONTAINER_NAME` with the result from step 1)
```bash
docker exec CONTAINER_NAME pkill hugo 2>/dev/null
sleep 1
docker exec -d CONTAINER_NAME sh -c 'cd /workspaces/sovereignsky-site && hugo server --bind 0.0.0.0 -p 1313 --disableFastRender'
sleep 4
```

Or as a one-liner in bash:
```bash
C=$(docker ps -q | xargs -I {} docker inspect {} --format '{{.Name}} {{range .Mounts}}{{.Destination}}{{end}}' | grep sovereignsky-site | awk '{print $1}' | tr -d '/') && docker exec $C pkill hugo; sleep 1; docker exec -d $C sh -c 'cd /workspaces/sovereignsky-site && hugo server --bind 0.0.0.0 -p 1313 --disableFastRender'
```

**What the restart command does:**
1. `pkill hugo` - Kills any running Hugo process
2. `sleep 1` - Waits for clean shutdown
3. `hugo server ...` - Starts Hugo in background (`-d` flag)
4. `--disableFastRender` - Forces full rebuild (needed for template changes)
5. `sleep 4` - Waits for server to be ready

## When to Restart Hugo

Hugo's live reload handles most changes automatically, but you need to restart for:

- New layout files (e.g., `layouts/blog/list.html`)
- Changes to partials structure
- New shortcodes
- Config file changes (`config.toml`, `params.toml`)

Content file changes (`.md` files) typically don't require a restart.

## Local URLs

- Site: http://localhost:1313/
- LiveReload: Automatic on file changes

---

## Data Architecture

Content pages are generated from JSON data files using Node.js scripts.

### Data Flow

```
data/*.json  →  scripts/generate-*-pages.js  →  content/*/index.md
```

| Data Source | Script | Generated Content |
|-------------|--------|-------------------|
| `data/jurisdictions/` | `generate-jurisdictions-pages.js` | `content/jurisdictions/{country}/` |
| `data/networks/` | `generate-network-pages.js` | `content/networks/{network}/` |
| `data/software/` | `generate-software-pages.js` | `content/software/{product}/` |
| `data/datacenters/` | `generate-datacenters-pages.js` | `content/datacenters/{provider}/` |
| `data/laws/` | `generate-laws-pages.js` | `content/laws/{law}/` |

### Important

- **DO NOT** manually edit generated content pages - changes will be overwritten
- **DO** edit the JSON source files in `data/` and regenerate
- **Layouts** in `layouts/` control how generated content is displayed

### Section Index Files (`_index.md`)

| Section | `_index.md` Generated? |
|---------|------------------------|
| `jurisdictions` | ✅ Yes |
| `laws` | ❌ No (manual) |
| `networks` | ❌ No (manual) |
| `software` | ❌ No (manual) |
| `datacenters` | ❌ No (manual) |

**TODO:** Update all generation scripts to also generate `_index.md` for consistency.

**Note:** The generation scripts should also pre-calculate section statistics (counts, breakdowns by type/status, etc.) for display in `section-stats`. Currently these calculations are duplicated in:
- Layouts (`layouts/*/list.html`)
- Shortcodes (`layouts/shortcodes/page-stats.html`)

Ideally, stats should be calculated once during generation and stored in the `_index.md` front matter or a dedicated data file.

### Regenerating Content

```bash
# Regenerate all pages for a section
node scripts/generate-jurisdictions-pages.js
node scripts/generate-network-pages.js
node scripts/generate-software-pages.js
node scripts/generate-datacenters-pages.js
node scripts/generate-laws-pages.js
```
