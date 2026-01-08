# Claude Code Instructions for SovereignSky Site

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

## Project Structure

```
sovereignsky-site/
├── config/                    # Hugo configuration
├── content/                   # Hugo content (markdown pages)
│   ├── networks/              # Generated network pages
│   ├── laws/                  # Generated law pages
│   ├── publications/          # Generated publication pages
│   └── ...
├── data/                      # Data files
│   ├── networks/              # Network data
│   │   ├── networks.json
│   │   ├── networks-actors.json
│   │   ├── networks-places.json
│   │   └── networks-trawler.json
│   ├── publications/          # Publications data
│   │   └── publications.json
│   ├── laws/                  # Laws data
│   │   └── laws.json
│   └── schemas/               # JSON Schema definitions
│       ├── networks.schema.json
│       ├── networks-actors.schema.json
│       └── networks-places.schema.json
├── layouts/                   # Hugo templates
│   └── shortcodes/            # Reusable shortcodes
├── scripts/                   # Node.js scripts
│   ├── generate-network-pages.js
│   ├── generate-laws-pages.js
│   ├── generate-publications-pages.js
│   └── validate.js
└── static/                    # Static assets
```

## Key Scripts

### Generate Network Pages
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-network-pages.js"
```
- Generates content pages from `data/networks/networks.json`
- Always updates frontmatter from JSON
- Preserves custom body content if edited

### Generate Laws Pages
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-laws-pages.js"
```

### Generate Publications Pages
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-publications-pages.js"
```
- Generates content pages from `data/publications/publications.json`
- Field mappings: `datePublished` → `date`, `name` → `title`, `url` → `external_url`, `about` → `topics`, `author` → `authors`
- Preserves custom body content after Summary section

### Validate Data Files
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

## Data & Schema Pattern

Data files in `data/networks/` are validated against schemas in `data/schemas/`:

| Data File | Schema |
|-----------|--------|
| networks.json | networks.schema.json |
| networks-actors.json | networks-actors.schema.json |
| networks-places.json | networks-places.schema.json |

All data files are arrays at root level (no wrapper objects).

## Publications Data Structure

Publications in `data/publications/publications.json` use schema.org-aligned field names:

| JSON Field | Hugo Frontmatter | Description |
|------------|------------------|-------------|
| id | (directory name) | URL slug |
| name | title | Publication title |
| description | description | Short description |
| datePublished | date | Publication date |
| url | external_url | Link to original |
| author | authors | Array of author names |
| publisher | publisher | Publisher name |
| about | topics | Array of topic slugs |
| audience | audience | Array of persona types |
| tags | tags | Array of keyword tags |
| abstract | (in body) | Short abstract text |
| summary | (in body) | Longer summary text |
| image | featured.png | Cover image (copied to content folder) |

## Hugo Development

The Hugo server runs inside the devcontainer and is accessible at `http://localhost:1313`.

To restart Hugo:
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo server -D --bind 0.0.0.0 --disableFastRender"
```
