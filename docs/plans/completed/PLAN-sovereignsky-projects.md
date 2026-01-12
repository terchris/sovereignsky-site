# SovereignSky Projects

## Status: Completed

**Completed**: 2026-01-12

**Goal**: Create a new content type for SovereignSky projects with data-driven page generation.

**Created**: 2026-01-12

---

## Overview

Create a new content type similar to publications/networks:
- Data source: `data/sovereignsky/projects.json`
- Generated content: `content/sovereignsky/<identifier>/`
- Layout templates: `layouts/sovereignsky/`

---

## Phase 1: Create Data Structure

### 1.1 Create data file

Create `data/sovereignsky/projects.json` with structure:

```json
[
  {
    "identifier": "ndsi",
    "name": "Norwegian Digital Sovereignty Index",
    "description": "...",
    "summary": "...",
    "image": "ndsi.png",
    "dateStarted": "2024-01-01",
    "status": "active",
    "url": "https://...",
    "topics": ["digital-sovereignty"],
    "tags": ["norway", "index", "assessment"]
  }
]
```

### 1.2 Create schema

Create `data/schemas/sovereignsky-projects.schema.json` for validation.

### 1.3 Update validation script

Add sovereignsky projects to `scripts/validate-data.js`.

---

## Phase 2: Create Generator Script

### 2.1 Create script

Create `scripts/generate-sovereignsky-pages.js`:
- Read from `data/sovereignsky/projects.json`
- Generate `content/sovereignsky/<identifier>/index.md`
- Copy/reference images

### 2.2 Add npm script

Update `package.json` to include generate script.

---

## Phase 3: Create Layout Templates

### 3.1 List page

Create `layouts/sovereignsky/list.html` - shows all projects.

### 3.2 Single page

Create `layouts/sovereignsky/single.html` - individual project page.

---

## Phase 4: Migrate NDSI Content

### 4.1 Add NDSI to projects.json

```json
{
  "identifier": "ndsi",
  "name": "Norwegian Digital Sovereignty Index",
  "description": "Tools and frameworks for assessing digital sovereignty",
  "image": "ndsi.png",
  "status": "active",
  "subpages": [
    "eu-cloud-sovereignty-framework",
    "software-risk-check",
    "survey"
  ]
}
```

### 4.2 Handle subpages

Decide approach for NDSI subpages:
- Option A: Nested content under `content/sovereignsky/ndsi/`
- Option B: Separate data entries for each subpage
- Option C: Manual content with links from generated parent

### 4.3 Copy images

- `content/ndsi/featured.png` → `static/images/sovereignsky/ndsi.png`
- Subpage images as needed

### 4.4 Run generator

```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-sovereignsky-pages.js"
```

---

## Phase 5: Add EU Cloud Sovereignty Framework as Publication

### 5.1 Add to publications.json

- identifier: `eu-cloud-sovereignty-framework`
- name: "EU Cloud Sovereignty Framework"
- publisher: SovereignSky / NDSI
- Link to `/sovereignsky/ndsi/eu-cloud-sovereignty-framework/`

### 5.2 Copy image

`content/ndsi/eu-cloud-sovereignty-framework/featured.jpg` → `static/images/publications/`

### 5.3 Run publications generator

```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-publications-pages.js"
```

---

## Phase 6: Cleanup

### 6.1 Remove old content

After verifying new structure works:
```bash
rm -rf content/ndsi
```

---

## Acceptance Criteria

- [ ] `data/sovereignsky/projects.json` exists with NDSI entry
- [ ] Schema validates projects data
- [ ] Generator creates content pages
- [ ] `/sovereignsky/` list page shows projects
- [ ] `/sovereignsky/ndsi/` shows NDSI project
- [ ] NDSI subpages accessible
- [ ] EU Cloud Sovereignty Framework in `/publications/`
