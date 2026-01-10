# Content Structure Harmonization Plan

## Status: Complete — Only taxonomy page design remains

**Goal**: Standardize field naming across all content types to align with schema.org and Hugo best practices.

**Last Updated**: 2026-01-10

**Progress**: Phase 1 ✅ | Phase 2 ✅ | Phase 3 ✅ | Phase 4 ✅ | Phase 5 ✅ | Phase 6 (design) ❌

---

## Executive Summary

### Current State (Updated 2026-01-10)

**Standardized on `audience` (singular) everywhere:**
- ✅ `/personas/` — Curated content pages work
- ✅ `/personas/humanitarian/` — Individual persona pages work
- ✅ `/audience/` — Taxonomy list page works (needs design)
- ✅ `/audience/developer/` — Taxonomy term pages work (need design)
- ✅ All content uses `audience:` (singular) — matches taxonomy
- ✅ All JSON data uses `"audience":` — schema.org aligned
- ✅ `data/audience/audience.json` — exists with all 7 personas

**Remaining:**
- ❌ `/audience/` pages have default Blowfish styling — need custom design
- ⚠️ `/topics/` taxonomy not configured (optional)

### Key Architecture (COMPLETE)

```
Taxonomy config:     audience = "audience"  (in hugo.toml)
Frontmatter field:   audience: ["humanitarian", "public-sector"]
JSON data field:     "audience": ["humanitarian", "public-sector"]
Curated pages:       /personas/humanitarian/    ✅ WORKING
Taxonomy pages:      /audience/humanitarian/    ✅ WORKING (needs design)
Data folder:         data/audience/audience.json  ✅ DONE
```

**Two-tier navigation (WORKING):**
- `/personas/humanitarian/` → Curated editorial page with selected content
- `/audience/humanitarian/` → Auto-generated page with ALL humanitarian content

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

### Field Mapping: Current State

| Content Type | Current | Status |
|--------------|---------|--------|
| Blog | `audiences:` | ✅ Correct |
| Events | `audiences:` | ✅ Correct |
| Publications | `audience:` | ❌ Needs `audiences:` |
| Laws | `audience:` | ✅ Working (in JSON data) |

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

### Current `hugo.toml` — ✅ WORKING AS-IS
```toml
[taxonomies]
  tag = "tags"
  category = "categories"
  audience = "audiences"  # ✅ Keep plural - already working
  risk_level = "risk_levels"
  vendor_country = "vendor_countries"
  use_area = "use_areas"
```

### Optional Addition (if topics taxonomy wanted)
```toml
[taxonomies]
  # ... existing ...
  topic = "topics"        # Optional: high-level themes (7 fixed categories)
```

**Decision**: Keep `audiences` (plural) — it's already working and content uses it correctly.

URLs are `/audiences/humanitarian/` — this is fine and consistent with other Hugo sites.

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

### Content Files — NEARLY DONE
- [x] `content/blog/**/*.md` (11 files) — ✅ Already uses `audiences:` (correct)
- [x] `content/events/**/*.md` (18 files) — ✅ Already uses `audiences:` (correct)
- [ ] `content/publications/**/*.md` (7 files) — ❌ Uses `audience:` (singular), needs `audiences:` (plural)

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

### Phase 2: Taxonomy Configuration — ✅ ALREADY DONE
1. [x] `hugo.toml` has `audience = "audiences"` — working correctly
2. [x] Taxonomy pages generate at `/audiences/...` — verified working
3. [ ] Optional: Add `topic = "topics"` if `/topics/` pages wanted

### Phase 3: Content Frontmatter — ✅ NEARLY DONE
4. [x] Blog uses `audiences:` — correct, no changes needed
5. [x] Events use `audiences:` — correct, no changes needed
6. [ ] **Publications need fix**: Change `audience:` → `audiences:` (7 files)

### Phase 4: Generator Scripts — ✅ DONE
7. [x] Scripts output correct field names

### Phase 5: Verify — ✅ PARTIAL
8. [x] Persona pages work: `/personas/humanitarian/`
9. [x] Taxonomy pages work: `/audiences/humanitarian/`
10. [ ] Topics taxonomy not configured (optional)

### Phase 6: Design — ❌ NEW TODO
11. [ ] `/audiences/` list page needs custom design (currently default Blowfish)
12. [ ] `/audiences/{term}/` pages need custom design
13. [ ] Consider custom taxonomy templates in `layouts/audiences/`

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
3. ✅ Data folder restructured
4. ✅ Templates updated to use new data paths
5. ✅ Taxonomy working at `/audiences/`
6. ✅ Blog/Events use correct `audiences:` field
7. ✅ Persona pages working at `/personas/`

### Remaining Work (Small)
8. [ ] **Fix Publications** (7 files): Change `audience:` → `audiences:`
9. [ ] **Design taxonomy pages**: Custom templates for `/audiences/` and `/audiences/{term}/`

### Optional
10. [ ] Add `topic = "topics"` taxonomy to hugo.toml
11. [ ] Create custom taxonomy templates in `layouts/audiences/`

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
