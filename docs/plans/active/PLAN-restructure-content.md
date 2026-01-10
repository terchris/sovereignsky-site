# Content Structure Harmonization Plan

## Status: Phase 1 Complete, Phases 2-5 TODO

**Goal**: Standardize field naming across all content types to align with schema.org and Hugo best practices.

**Last Updated**: 2026-01-10

**Progress**: Phase 1 (data folder) ✅ | Phase 2 (taxonomy config) ❌ | Phase 3 (frontmatter) partial | Phase 4 (scripts) ❌ | Phase 5 (verify) ❌

---

## Executive Summary

### The Problem

The site has inconsistent field naming:
- `audiences` (blog, events) vs `personas` (publications) vs missing (laws, software)
- `description` used inconsistently
- `topics` vs `tags` confusion

### Key Decisions Made

1. **Site is not published** — No migration or redirect concerns
2. **Personas are curated editorial pages** — Shows 3 latest from each category
3. **`audience` IS a taxonomy** — Auto-generates complete list pages at `/audience/X/`
4. **Two-tier navigation**: Persona pages (curated entry point) + Taxonomy pages (see all)
5. **Standard text fields**: `description` (short), `abstract` (longer), body content (full)
6. **Taxonomies**: `tags` for discovery, `audience` for role filtering, `topics` for themes (7 fixed categories)

### Recommended Outcome

```
Frontmatter field:   audience: ["humanitarian", "public-sector"]
Taxonomy:            audience = "audience"
Curated pages:       /personas/humanitarian/    (editorial, 3 latest per category)
Complete lists:      /audience/humanitarian/    (auto-generated, ALL content)
Data folder:         data/audience/audience.json  ✅ DONE
```

**Two-tier navigation:**
- `/personas/humanitarian/` → "Start here" curated page with 3 latest blogs, laws, etc.
- `/audience/humanitarian/` → "See all" auto-generated page with ALL humanitarian content

The key changes:
1. Standardize frontmatter field to `audience` across all content types
2. Keep `audience` as taxonomy for auto-generated complete lists
3. Add "See all →" links from persona pages to taxonomy pages

---

## 1. Architecture: Two-Tier Navigation

### Personas (Curated) + Taxonomy (Complete)

| Page Type | URL | Purpose | Content |
|-----------|-----|---------|---------|
| **Persona page** | `/personas/humanitarian/` | Entry point for role | 3 latest blogs, 3 latest laws, etc. + editorial intro |
| **Taxonomy page** | `/audience/humanitarian/` | Complete list | ALL content tagged for humanitarian |

### How It Works

1. User lands on `/personas/humanitarian/` — sees curated overview
2. Each section has "See all humanitarian blogs →" link
3. Link goes to `/audience/humanitarian/` — shows everything

### Why Both?

| Persona Pages | Taxonomy Pages |
|---------------|----------------|
| Editorial control | Auto-generated |
| Role-based framing | Just a list |
| Highlights best content | Shows everything |
| Manual maintenance | Zero maintenance |

**They complement each other**: Personas for discovery, taxonomy for completeness.

---

## 2. Field Standards (Site-Wide)

### Complete Field Reference

#### Standard Text Fields (ALL content types)

| Field | In JSON | In Frontmatter | Purpose | Length | Hugo Built-in | Schema.org |
|-------|---------|----------------|---------|--------|---------------|------------|
| `identifier` | ✓ | — | URL slug / unique identifier | — | — | ✓ `identifier` |
| `name` | ✓ | — | Display name (JSON only) | Any | — | ✓ `name` |
| `title` | — | ✓ | Page title | Any | ✓ `.Title`, `<title>`, lists | `headline` |
| `description` | ✓ | ✓ | **Short** summary for SEO, cards | ~150 chars | ✓ `.Description`, `<meta>`, OG | ✓ `description` |
| `abstract` | — | ✓ | Longer summary for detail pages | 1-2 paragraphs | — (custom) | ✓ `abstract` |
| `summary` | — | ✓ | Override auto-generated summary | ~200 chars | ✓ `.Summary` | — |
| *(markdown body)* | — | ✓ | Full content after frontmatter | Unlimited | ✓ `.Content`, `.RawContent` | `articleBody` |

**Key principle**: `description` is ALWAYS short (~150 chars). Never use it for long text.

---

#### Taxonomy Fields (Hugo auto-generates pages)

Hugo taxonomies are special: when defined in `hugo.toml`, Hugo automatically creates list and term pages.

| Field | Type | Values | Hugo Auto-Creates | Schema.org |
|-------|------|--------|-------------------|------------|
| `tags` | free-form | Author's choice | `/tags/` + `/tags/{term}/` | `keywords` |
| `categories` | free-form | Author's choice | `/categories/` + `/categories/{term}/` | `genre` |
| `audience` | controlled | From `data/audience/audience.json` | `/audience/` + `/audience/{term}/` | ✓ `audience` |
| `topics` | controlled | From `data/topics/topics.json` | `/topics/` + `/topics/{term}/` | `about` |

**Hugo config** (`hugo.toml`):
```toml
[taxonomies]
  tag = "tags"           # singular = "frontmatter field"
  category = "categories"
  audience = "audience"
  topic = "topics"
```

**In templates**: Access via `.Site.Taxonomies.audience` or `.Params.audience`

---

#### Metadata Fields (dates, people, links)

| Field | Purpose | Format | Hugo Built-in | Schema.org |
|-------|---------|--------|---------------|------------|
| `date` | Publication date | `YYYY-MM-DD` | ✓ `.Date`, sorting, lists | `datePublished` |
| `lastmod` | Last modified | `YYYY-MM-DD` | ✓ `.Lastmod` | `dateModified` |
| `publishDate` | When to publish | `YYYY-MM-DD` | ✓ `.PublishDate` | `datePublished` |
| `expiryDate` | When to unpublish | `YYYY-MM-DD` | ✓ `.ExpiryDate` | — |
| `draft` | Hide from build | `true/false` | ✓ `.Draft` | — |
| `weight` | Sort order | number | ✓ `.Weight`, sorting | — |
| `slug` | URL segment | string | ✓ URL generation | — |
| `url` | Override full URL | string | ✓ URL generation | ✓ `url` |
| `aliases` | Redirects | `["/old/path"]` | ✓ Creates redirects | — |
| `type` | Content type | string | ✓ Layout selection | — |
| `layout` | Template override | string | ✓ Layout selection | — |
| `authors` / `author` | Content creators | `["Name", ...]` | — (theme/custom) | ✓ `author` |
| `publisher` | Publishing organization | `"ICRC"` | — (custom) | ✓ `publisher` |
| `externalUrl` | Link to external resource | URL string | — (custom) | ✓ `url` |
| `icon` | Icon identifier | `"heart-handshake"` | — (custom) | — |

**Events-specific** (custom, not Hugo built-in):
| Field | Purpose | Schema.org |
|-------|---------|------------|
| `startDate` | Event start | ✓ `startDate` |
| `endDate` | Event end | ✓ `endDate` |

---

#### Content-Type Specific Fields

**Events** (schema.org: `Event`):
| Field | Purpose | Schema.org |
|-------|---------|------------|
| `nameOriginal` | Original language title | — (custom) |
| `eventStatus` | `scheduled`, `cancelled`, `completed` | ✓ `eventStatus` |
| `eventAttendanceMode` | `offline`, `online`, `mixed` | ✓ `eventAttendanceMode` |
| `location` | `{name, city, country}` | ✓ `location` |
| `organizer` | `{name, url}` | ✓ `organizer` |

**Laws** (schema.org: `Legislation`):
| Field | Purpose | Schema.org |
|-------|---------|------------|
| `identifier` | Unique identifier (slug) | ✓ `identifier` |
| `name` | Full legal name | ✓ `name` |
| `dateEnacted` | Year/date enacted | ✓ `dateEnacted` |
| `legislationJurisdiction` | `national`, `bloc`, `international` | ✓ `legislationJurisdiction` |
| `spatialCoverage` | Jurisdictions `["eu", "no"]` | ✓ `spatialCoverage` |
| `legislationType` | `privacy`, `security`, `access` | ✓ `legislationType` |
| `governmentAccess` | `extensive`, `moderate`, `limited` | — (custom) |
| `dataProtection` | `strong`, `moderate`, `weak` | — (custom) |
| `extraterritorial` | Boolean | — (custom) |
| `requiresLocalization` | Boolean | — (custom) |
| `requiresBackdoor` | Boolean | — (custom) |

**Publications** (schema.org: `ScholarlyArticle` / `Report`):
| Field | Purpose | Schema.org |
|-------|---------|------------|
| `about` | Subject keywords (in JSON) | ✓ `about` |

---

#### Display Options (Frontmatter)

| Field | Purpose | Default |
|-------|---------|---------|
| `showHero` | Show hero image | varies |
| `showDate` | Show publication date | `true` |
| `showAuthor` | Show author | `true` |
| `showReadingTime` | Show reading time | `true` |
| `showTableOfContents` | Show TOC | `false` |
| `showPagination` | Show prev/next | `true` |

---

### Field Naming Conventions

| Convention | Example | Use |
|------------|---------|-----|
| `camelCase` | `datePublished`, `showHero` | Multi-word fields |
| `snake_case` | `law_id` | Legacy (migrate to camelCase) |
| Singular | `audience`, `topic` | Taxonomy frontmatter |
| Plural | `tags`, `categories`, `authors` | Arrays |

---

### Consistency: Same Field Names Everywhere

JSON data files and frontmatter use the **same field names**. No mapping needed.

| Field | In JSON | In Frontmatter | Notes |
|-------|---------|----------------|-------|
| `identifier` | ✓ | — | Becomes folder name (not in frontmatter) |
| `name` | ✓ | — | JSON only; frontmatter uses `title` (Hugo built-in) |
| `title` | — | ✓ | Hugo built-in; JSON uses `name` |
| `description` | ✓ | ✓ | Same everywhere |
| `date` | ✓ | ✓ | Same everywhere (Hugo built-in) |
| `externalUrl` | ✓ | ✓ | Same everywhere |
| `authors` | ✓ | ✓ | Same everywhere |
| `audience` | ✓ | ✓ | Same everywhere |
| `topics` | ✓ | ✓ | Same everywhere |

**Only exceptions**: `identifier` (becomes folder), `name`/`title` (Hugo requires `title` in frontmatter).

### Field Mapping: What Changes

| Content Type | Current | New |
|--------------|---------|-----|
| Blog | `audiences` | `audience` |
| Events | `audiences` | `audience` |
| Publications | `personas` | `audience` |
| Laws | *missing* | `audience` (add) |
| Software | *missing* | `audience` (add) |

---

## 3. Taxonomy Strategy

### `tags` — Keep As-Is
- Free-form keywords for search/discovery
- Hugo auto-generates `/tags/X/` pages
- Example: `tags: ["CLOUD Act", "ICRC", "biometrics"]`

### `audience` — IS a Taxonomy ✓
- Defines WHO content is for
- Hugo auto-generates `/audience/X/` pages with ALL matching content
- Persona pages link here with "See all →"
- Example: `audience: ["humanitarian", "public-sector"]`

### `topics` — IS a Taxonomy ✓
- High-level themes (7 curated categories)
- Hugo auto-generates `/topics/X/` pages with ALL matching content
- Fixed list defined in `data/topics/topics.json`
- Example: `topics: ["sovereignty", "preparedness"]`

**Allowed values** (from `data/topics/topics.json`):
| identifier | Name |
|------------|------|
| `sovereignty` | Digital Sovereignty |
| `preparedness` | Preparedness & Resilience |
| `cybersecurity` | Cybersecurity |
| `data-protection` | Data Protection |
| `critical-infrastructure` | Critical Infrastructure |
| `humanitarian` | Humanitarian Operations |
| `compliance` | Legal & Compliance |

**Difference from `tags`**:
- `topics` = What broad theme? (7 fixed categories)
- `tags` = What specific keywords? (unlimited, for search/discovery)

---

## 4. Config Changes

### Current `hugo.toml`
```toml
[taxonomies]
  tag = "tags"
  category = "categories"
  audience = "audiences"  # <-- plural, change to singular
  risk_level = "risk_levels"
  vendor_country = "vendor_countries"
  use_area = "use_areas"
```

### Proposed `hugo.toml`
```toml
[taxonomies]
  tag = "tags"
  category = "categories"
  audience = "audience"   # CHANGED: singular (schema.org aligned)
  topic = "topics"        # NEW: high-level themes (7 fixed categories)
  risk_level = "risk_levels"
  vendor_country = "vendor_countries"
  use_area = "use_areas"
```

**Key change**: `audiences` → `audience` (singular) for schema.org alignment.

This creates `/audience/humanitarian/` instead of `/audiences/humanitarian/`.

---

## 5. Files to Update

### Configuration (1 file)
- [ ] `hugo.toml` — Change `audience = "audiences"` to `audience = "audience"`, add `topic = "topics"`

### Data Files — ✅ COMPLETED
- [x] `data/audience/audience.json` — Created with `identifier` field, `filterValues` for UI
- [x] `data/topics/topics.json` — Created with 7 topic categories, `filterValues` for UI
- [x] `data/laws/laws.json` — Moved from root
- [x] `data/laws/law_types.json` — Created (extracted from ui_vocabulary)
- [x] `data/hugo/ui_vocabulary.json` — Created (contentTypes only, cleaned up)
- [x] `data/products/` — Moved products.json, productsList.json, useAreas.json, vendors.json
- [x] `data/personas/personas.json` — DELETED (replaced by audience.json)
- [x] Old root files deleted: datacenters.json, laws.json, tag_vocabulary.json, networks-trawler.json

### Templates — ✅ COMPLETED (data paths updated)
- [x] `layouts/personas/single.html` — Now reads from `data/audience/audience.json`
- [x] `layouts/personas/list.html` — Now reads from `data/audience/audience.json`
- [x] `layouts/publications/single.html` — Now reads from `data/audience/audience.json`
- [x] `layouts/events/single.html` — Topics now clickable (link to `/topics/...`)
- [x] `layouts/events/list.html` — Now reads from `data/audience/audience.json` and `data/topics/topics.json`
- [x] `layouts/partials/event-list.html` — Updated data references
- [x] `layouts/partials/persona-list.html` — Updated data references
- [x] `layouts/partials/persona-chips.html` — Updated data references
- [x] `layouts/partials/jurisdiction-laws-inline.html` — Now reads from `data/laws/law_types.json`
- [x] `layouts/partials/jsonld-events.html` — Removed unused ui_vocabulary reference

### Generator Scripts — ✅ COMPLETED (data paths updated)
- [x] Scripts updated to read from new data folder locations
- [ ] `scripts/generate-events-pages.js` — Should output `topics:` from `tags` field (TODO)

### Content Files (29 files) — PARTIAL
- [ ] `content/blog/**/*.md` (11 files) — Change `audiences:` → `audience:`
- [ ] `content/events/**/*.md` (18 files) — Change `audiences:` → `audience:`, add `topics:`
- [x] `content/publications/**/*.md` (7 files) — ✅ Already uses `audience:`

### Taxonomy Term Pages (Optional)
- [ ] `content/audience/_index.md` — Custom content for `/audience/` list page
- [ ] `content/topics/_index.md` — Custom content for `/topics/` list page

---

## 6. Implementation Order

### Phase 1: Data Folder Restructure — ✅ COMPLETED
1. ✅ Created `data/audience/audience.json` with `identifier` field
2. ✅ Created `data/topics/topics.json` with 7 categories
3. ✅ Moved `data/laws/laws.json`, created `data/laws/law_types.json`
4. ✅ Created `data/hugo/ui_vocabulary.json` (contentTypes only)
5. ✅ Moved products data to `data/products/`
6. ✅ Updated all templates to use new data paths
7. ✅ Deleted old/unused data files

### Phase 2: Taxonomy Configuration — TODO
1. [ ] Update `hugo.toml`:
   - Change `audience = "audiences"` → `audience = "audience"`
   - Add `topic = "topics"`
2. [ ] Verify taxonomy pages generate at `/audience/...` and `/topics/...`

### Phase 3: Content Frontmatter — PARTIAL
3. [ ] Update blog frontmatter: `audiences:` → `audience:` (11 files)
4. [ ] Update events frontmatter: `audiences:` → `audience:`, add `topics:` (18 files)
5. [x] ✅ Publications already use `audience:` (7 files)

### Phase 4: Generator Scripts — TODO
6. [ ] Update `generate-events-pages.js` to output `topics:` from JSON `tags` field
7. [ ] Run generators to regenerate content pages

### Phase 5: Verify — TODO
8. [ ] Test persona pages show correct filtered content
9. [ ] Test taxonomy pages `/audience/X/` show ALL content
10. [ ] Test taxonomy pages `/topics/X/` show ALL content
11. [ ] Test "See all →" links work

---

## 7. Example: Before & After

### Blog Post — Before
```yaml
title: "Norway's Exit Strategy"
date: 2025-12-01
description: "Short SEO description"
audiences:
  - "public-sector"
  - "enterprise"
tags:
  - "norway"
  - "strategy"
```

### Blog Post — After
```yaml
title: "Norway's Exit Strategy"
date: 2025-12-01
description: "Short SEO description"
audience:
  - "public-sector"
  - "enterprise"
tags:
  - "norway"
  - "strategy"
```

### Publication — Before
```yaml
title: "ICRC Handbook"
description: "Short description"
personas:
  - "humanitarian"
  - "public-sector"
```

### Publication — After
```yaml
title: "ICRC Handbook"
description: "Short description"
audience:
  - "humanitarian"
  - "public-sector"
```

---

## 8. Data Folder Structure

### Target Pattern

Each data type in its own folder: `data/{type}/{type}.json`

### Current Status (Updated 2026-01-08)

| Data Type | Location | Status |
|-----------|----------|--------|
| Audience | `data/audience/audience.json` | ✅ Done |
| Topics | `data/topics/topics.json` | ✅ Done |
| Laws | `data/laws/laws.json` | ✅ Moved |
| Law Types | `data/laws/law_types.json` | ✅ Created |
| Events | `data/events/events.json` | ✅ Done |
| Publications | `data/publications/publications.json` | ✅ Done |
| Networks | `data/networks/` | ✅ Done |
| Datacenters | `data/datacenters/` | ✅ Done |
| Products | `data/products/products.json` | ✅ Moved |
| Vendors | `data/products/vendors.json` | ✅ Moved |
| Use Areas | `data/products/useAreas.json` | ✅ Moved |
| Hugo UI | `data/hugo/ui_vocabulary.json` | ✅ Created |
| Schemas | `data/schemas/*.json` | ✅ Done |
| Jurisdictions | `data/jurisdictions.json` | ⏳ Still at root |
| Regions | `data/regions.json` | ⏳ Still at root |

### Files Deleted
- [x] `data/personas/personas.json` — Replaced by `data/audience/audience.json`
- [x] `data/datacenters.json` — Data in `data/datacenters/` folder
- [x] `data/laws.json` — Moved to `data/laws/laws.json`
- [x] `data/tag_vocabulary.json` — Unused, deleted
- [x] `data/networks-trawler.json` — Unused, deleted

---

## 9. Data Relationships

### Current Relationships

```
┌─────────────┐     applies_to      ┌──────────────────┐
│    Laws     │◄───────────────────►│   Jurisdictions  │
│             │     laws[]          │   (blocs)        │
└─────────────┘                     └──────────────────┘
      │                                      │
      │ related_laws                         │ members[]
      ▼                                      ▼
┌─────────────┐                     ┌──────────────────┐
│    Laws     │                     │    Countries     │
│  (other)    │                     │                  │
└─────────────┘                     └──────────────────┘
                                             ▲
                                             │ country_id / vendor_country
                                             │
┌─────────────┐     country         ┌──────────────────┐
│   Vendors   │────────────────────►│    Countries     │
└─────────────┘                     └──────────────────┘

┌─────────────┐     country_id      ┌──────────────────┐
│ Datacenters │────────────────────►│    Countries     │
│  (regions)  │                     │                  │
└─────────────┘                     └──────────────────┘

┌─────────────┐
│  Products   │  (deferred - discuss later)
└─────────────┘
```

### Relationship Fields by Data Type

| Data Type | Field | Links To |
|-----------|-------|----------|
| **Laws** | `applies_to` | Jurisdictions (blocs/countries) |
| **Laws** | `related_laws[].id` | Other laws (complements/conflicts) |
| **Laws** | `who_it_applies_to` | Entity types (text, not linked) |
| **Jurisdictions** | `laws[]` | Laws |
| **Jurisdictions** | `members[]` | Countries |
| **Jurisdictions** | `inherits_from[]` | Other blocs |
| **Datacenters** | `vendor_country_id` | Countries |
| **Datacenters** | `regions[].country_id` | Countries |
| **Vendors** | `country` | Countries |
| **Products** | *(deferred - discuss later)* | — |

---

## 10. Open Questions

1. ~~**Add `topics` taxonomy?**~~ ✅ **DECIDED: YES**
   - 7 fixed categories defined in `data/topics/topics.json`
   - Creates `/topics/sovereignty/`, `/topics/preparedness/`, etc.

2. ~~**Add `audience` to laws?**~~ ✅ **DECIDED: YES**
   - Laws: Add `audience` field (e.g., GDPR relevant to `["public-sector", "enterprise"]`)
   - Enables filtering on persona pages
   - **Software/Products**: Deferred (will discuss later)

3. **Custom taxonomy templates?**
   - Default Hugo taxonomy templates might be sufficient
   - Can customize `/audience/humanitarian/` layout later if needed

---

## 11. Next Steps

### Completed
1. ✅ Plan complete
2. ✅ Decision: Use Option D (personas + taxonomy for "see all")
3. ✅ Decision: Add `topics` taxonomy (7 fixed categories in `data/topics/topics.json`)
4. ✅ Data folder restructured (commit: `46f21f2`)
5. ✅ Templates updated to use new data paths
6. ✅ Events single page: Topics now clickable links

### Remaining Work
7. [ ] **hugo.toml**: Add `topic = "topics"` taxonomy, change `audience = "audiences"` → `audience = "audience"`
8. [ ] **Content frontmatter**: Update `audiences:` → `audience:` in blog/events/publications
9. [ ] **Events**: Add `topics:` field to frontmatter (currently uses `tags` in JSON data)
10. [ ] **Generator scripts**: Update `generate-events-pages.js` to output `topics:` field
11. [ ] Test taxonomy pages `/topics/...` and `/audience/...`
12. [ ] Commit & PR

---

## Appendix A: Audience Values

From `data/audience/audience.json`:

| identifier | Name | Description |
|------------|------|-------------|
| `developer` | Developers | Software developers and engineers |
| `it-ops` | IT & Operations | IT administrators and ops teams |
| `enterprise` | Enterprise | Business managers and decision makers |
| `public-sector` | Public Sector | Government and public administration |
| `humanitarian` | Humanitarian | NGOs and aid organizations |
| `security` | Security & Defence | Military, police, intelligence, civil protection |
| `consumer` | Consumers | End users seeking privacy alternatives |

---

## Appendix B: Topic Categories

From `data/topics/topics.json`:

| identifier | Name | Description |
|------------|------|-------------|
| `sovereignty` | Digital Sovereignty | Control over digital infrastructure, data residency, vendor independence |
| `preparedness` | Preparedness & Resilience | Total defence, crisis response, national resilience, civil protection |
| `cybersecurity` | Cybersecurity | Digital threats, security risk management, hybrid warfare |
| `data-protection` | Data Protection | Privacy, government access, CLOUD Act, biometrics |
| `critical-infrastructure` | Critical Infrastructure | Essential services, supply chains, telecommunications, networks |
| `humanitarian` | Humanitarian Operations | IHL, humanitarian technology, NGO-specific challenges |
| `compliance` | Legal & Compliance | NIS2, GDPR, regulations, legal frameworks |
