# Content Structure Harmonization Plan

## Status: Decisions Made — Ready for Implementation

**Goal**: Standardize field naming across all content types to align with schema.org and Hugo best practices.

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
Data folder:         data/personas/             (keep current)
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

### Data Files (4 files)
- [x] `data/audience/audience.json` — NEW: Renamed from personas.json, new field names ✓ CREATED
- [ ] `data/personas/personas.json` — DELETE after migration
- [ ] `data/publications/publications.json` — Update field names to match standard
- [x] `data/topics/topics.json` — NEW: 7 fixed topic categories ✓ CREATED

**Field changes in audience.json:**
| Old Field | New Field |
|-----------|-----------|
| `audienceType` | `identifier` |
| `disambiguatingDescription` | *(removed)* |
| `description` (long) | `description` (short, ~150 chars) |
| Long inspiring text | → markdown body content |

### Generator Scripts (3 files)
- [ ] `scripts/generate-persona-pages.js` — Update to read from `data/audience/audience.json`, use `identifier` field
- [ ] `scripts/generate-publications-pages.js` — Change output from `personas:` to `audience:`
- [ ] `scripts/generate-laws-pages.js` — Add `audience` field generation

### Templates (7+ files)
- [ ] `layouts/personas/single.html` — Change `.Params.personas` → `.Params.audience`, add "See all →" links to `/audience/X/`
- [ ] `layouts/personas/list.html` — Update data references
- [ ] `layouts/publications/single.html` — Change `.Params.personas` → `.Params.audience`
- [ ] `layouts/events/single.html` — Change `.Params.audiences` → `.Params.audience`
- [ ] `layouts/events/list.html` — Update data references
- [ ] `layouts/partials/persona-list.html` — Update references
- [ ] `layouts/partials/persona-chips.html` — Update references
- [ ] `layouts/audience/list.html` — NEW: Custom template for taxonomy list page (optional)
- [ ] `layouts/audience/term.html` — NEW: Custom template for `/audience/humanitarian/` (optional)

### Content Files (34 files)
- [ ] `content/blog/**/*.md` (9 files) — Change `audiences:` → `audience:`
- [ ] `content/events/**/*.md` (18 files) — Change `audiences:` → `audience:`
- [ ] `content/publications/**/*.md` (7 files) — Change `personas:` → `audience:`

### Taxonomy Term Pages (Optional)
- [ ] `content/audience/_index.md` — Custom content for `/audience/` list page
- [ ] `content/audience/humanitarian/_index.md` — Custom intro for `/audience/humanitarian/`

---

## 6. Implementation Order

### Phase 1: Config
1. Update `hugo.toml` — change `audience = "audiences"` to `audience = "audience"`

### Phase 2: Templates
2. Update all templates to use `.Params.audience`
3. Add "See all →" links to persona single template
4. Test that persona pages still work
5. Verify `/audience/humanitarian/` auto-generates

### Phase 3: Generator Scripts
6. Update `generate-publications-pages.js` to output `audience:`
7. Update `generate-laws-pages.js` to include `audience:`
8. Run generators

### Phase 4: Content
9. Update blog frontmatter: `audiences:` → `audience:`
10. Update events frontmatter: `audiences:` → `audience:`
11. Re-run publication generator (already uses `audience`)

### Phase 5: Verify
12. Test all persona pages show correct filtered content
13. Test taxonomy pages `/audience/X/` show ALL content
14. Test "See all →" links work
15. Test all content pages render

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

### Current Status

| Data Type | Current Location | Target Location | Status |
|-----------|------------------|-----------------|--------|
| Audience | `data/personas/personas.json` | `data/audience/audience.json` | ✅ Created |
| Topics | — | `data/topics/topics.json` | ✅ Created |
| Events | `data/events/events.json` | ✓ Already correct | ✅ Done |
| Publications | `data/publications/publications.json` | ✓ Already correct | ✅ Done |
| Networks | `data/networks/networks.json` | ✓ Already correct | ✅ Done |
| Laws | `data/laws.json` | `data/laws/laws.json` | ⏳ To migrate |
| Jurisdictions | `data/jurisdictions.json` | `data/jurisdictions/jurisdictions.json` | ⏳ To migrate |
| Vendors | `data/vendors.json` | `data/vendors/vendors.json` | ⏳ To migrate |
| Regions | `data/regions.json` | `data/regions/regions.json` | ⏳ To migrate |
| Use Areas | `data/useAreas.json` | `data/useAreas/useAreas.json` | ⏳ To migrate |
| Datacenters | `data/datacenters.json` + `data/datacenters/*.json` | Consolidate in `data/datacenters/` | ⏳ To review |
| Schemas | `data/schemas/*.json` | ✓ Already correct | ✅ Done |
| Products | `data/products.json`, `data/productsList.json` | *(deferred)* | — |

### Files to Delete After Migration

- [ ] `data/personas/personas.json` (replaced by `data/audience/audience.json`)

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

1. ✅ Plan complete
2. ✅ Decision: Use Option D (personas + taxonomy for "see all")
3. ✅ Decision: Add `topics` taxonomy (7 fixed categories in `data/topics/topics.json`)
4. [ ] Implement Phase 1-5
5. [ ] Test
6. [ ] Commit & PR

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
