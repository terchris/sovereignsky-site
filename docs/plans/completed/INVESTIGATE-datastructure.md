# Plan: Data Structure Refactoring

## Status: Backlog

**Goal**: Consolidate and restructure data files for countries, blocs, and jurisdictions into a consistent schema.org-based format.

**Last Updated**: 2026-01-10

---

## Executive Summary

### The Problem

The current data structure has evolved organically and has several issues:

1. **Overlapping content**: Three pages exist for Norway (`/datacenters/norway/`, `/jurisdictions/norway/`, `/countries/norway/`) with unclear focus
2. **Inconsistent data formats**: `regions.json` doesn't follow schema.org pattern used elsewhere
3. **Redundant data files**: `jurisdictions.json` duplicates information now in `blocs.json`
4. **Unclear data ownership**: Risk levels and adequacy decisions aren't clearly modeled

### Decisions Made

1. **Three user navigation paths**:
   - **Datacenters path**: Datacenters → Overview → Country or Provider
   - **Countries path**: Countries → Overview → Individual Country
   - **Blocs path**: Blocs → Overview → EU/EEA/etc. → Laws, Countries, or Datacenters

2. **Data restructuring**:
   - Rename `data/regions.json` → `data/countries/countries.json` with schema.org format
   - Store `riskLevel` in countries.json (with optional override capability)
   - Store `adequacyDecisions` in blocs.json (on the granting bloc)
   - Delete `jurisdictions.json` and `/jurisdictions/` section

---

## Current State

### Data Files - Current State

| File | Format | Status |
|------|--------|--------|
| `data/blocs/blocs.json` | Schema.org ✓ | **Ready** - but 0 templates use it |
| `data/blocs/risk-levels.json` | ? | Supporting lookup |
| `data/regions.json` | Plain array | **Needs migration** - 35 templates use it |

### Template Migration Required

| Old Path | New Path | Templates Affected |
|----------|----------|-------------------|
| `site.Data.jurisdictions.blocs` | `site.Data.blocs.blocs.itemListElement` | 22 templates |
| `site.Data.regions` | `site.Data.countries.countries.itemListElement` | 35 templates |

**Note:** `data/jurisdictions/` folder no longer exists. Templates referencing it are broken or using fallbacks.

### Data Files Requiring Changes

| File | Current Purpose | Action |
|------|-----------------|--------|
| `data/regions.json` | Country data (50+ countries) | Move to `data/countries/countries.json` + schema.org |
| `data/blocs/blocs.json` | Bloc definitions | Add `adequacyDecisions` array |
| `data/events/events.json` | Conference/event listings | Add schema.org wrapper (low priority) |

### Data Files Already Good

| File | Format | Notes |
|------|--------|-------|
| `data/blocs/blocs.json` | Schema.org ✓ | Uses `memberOf` for members, `inheritsFrom` for inheritance |
| `data/laws/laws.json` | Schema.org ✓ | Links to blocs via `legislationJurisdiction` |
| `data/laws/law_types.json` | Schema.org ✓ | Lookup table |
| `data/laws/relationship_types.json` | Schema.org ✓ | Lookup table |
| `data/audience/audience.json` | Schema.org ✓ | - |
| `data/datacenters/datacenters.json` | Schema.org ✓ | - |
| `data/networks/*` | Plain arrays | Leave as-is (multi-country capable) |

### Current regions.json Structure

```json
[
  {
    "identifier": "NO",
    "slug": "norway",
    "name": "Norway",
    "flag": "🇳🇴",
    "description": "...",
    "euMember": false,
    "eeaMember": true,
    "blocs": ["EEA"],
    "lawConcern": "moderate",
    "riskLevel": "low",
    "nationalLaws": ["NO-PDA"],
    "abstract": "...",
    "summary": "..."
  }
]
```

### Current blocs.json Structure

```json
[
  {
    "identifier": "EU",
    "slug": "european-union",
    "name": "European Union",
    "flag": "🇪🇺",
    "description": "...",
    "riskLevel": "low",
    "members": ["AT", "BE", "BG", ...],
    "inheritsFrom": []
  }
]
```

---

## Target State

### New countries.json Structure

Location: `data/countries/countries.json`

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SovereignSky Countries",
  "description": "Countries with datacenter infrastructure and data sovereignty characteristics",
  "itemListElement": [
    {
      "@type": "Country",
      "identifier": "NO",
      "slug": "norway",
      "name": "Norway",
      "flag": "🇳🇴",
      "description": "EEA member with strong privacy protections",
      "abstract": "Norway offers...",
      "summary": "As an EEA member...",
      "riskLevel": "low",
      "riskLevelOverride": null,
      "blocs": ["EEA", "NORDIC"],
      "nationalLaws": ["NO-PDA"]
    }
  ]
}
```

**Key changes:**
- Schema.org wrapper with `@context`, `@type`, `name`, `description`
- Items in `itemListElement` array
- `@type: "Country"` for each item
- Removed redundant `euMember`/`eeaMember` (derived from blocs)
- Added optional `riskLevelOverride` field

### Enhanced blocs.json Structure

Location: `data/jurisdictions/blocs.json` (or rename to `data/blocs/blocs.json`)

The existing `data/blocs/blocs.json` already has schema.org format. Only change needed is adding `adequacyDecisions`:

```json
{
  "@type": "Organization",
  "identifier": "eu",
  "name": "European Union",
  "alternateName": "EU",
  "flag": "🇪🇺",
  "memberOf": ["AT", "BE", "BG", "..."],
  "inheritsFrom": [],
  "riskLevel": "low",
  "adequacyDecisions": [
    {
      "countryId": "JP",
      "countryName": "Japan",
      "date": "2019-01-23",
      "scope": "full",
      "notes": "Mutual adequacy agreement"
    },
    {
      "countryId": "CH",
      "countryName": "Switzerland",
      "date": "2000-07-26",
      "scope": "full"
    }
  ]
}
```

**Key change:**
- Add `adequacyDecisions` array to relevant blocs (EU, UK)

---

## Risk Level Logic

### Calculation Rules

1. If country has `riskLevelOverride` → use override value
2. Else if country is member of bloc(s) → use lowest risk level from bloc memberships
3. Else → "unknown"

### Edge Cases

| Country | Situation | Solution |
|---------|-----------|----------|
| Switzerland | Not EU/EEA but has adequacy | `riskLevelOverride: "low"` |
| UK | Post-Brexit, has adequacy | `riskLevelOverride: "moderate"` |
| US | Complex (state-level varies) | `riskLevelOverride: "elevated"` |

---

## Schema Definitions

### New/Updated Schemas Required

| Schema File | Purpose |
|-------------|---------|
| `data/schemas/countries.schema.json` | Validate countries.json |
| `data/schemas/blocs.schema.json` | Validate blocs.json (update existing) |

### countries.schema.json

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Countries",
  "type": "object",
  "required": ["@context", "@type", "name", "itemListElement"],
  "properties": {
    "@context": { "const": "https://schema.org" },
    "@type": { "const": "ItemList" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "itemListElement": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["@type", "identifier", "slug", "name", "flag", "riskLevel"],
        "properties": {
          "@type": { "const": "Country" },
          "identifier": {
            "type": "string",
            "pattern": "^[A-Z]{2}$",
            "description": "ISO 3166-1 alpha-2 country code"
          },
          "slug": { "type": "string" },
          "name": { "type": "string" },
          "flag": { "type": "string" },
          "description": { "type": "string" },
          "abstract": { "type": "string" },
          "summary": { "type": "string" },
          "riskLevel": {
            "type": "string",
            "enum": ["low", "moderate", "elevated", "high", "sanctioned", "unknown"]
          },
          "riskLevelOverride": {
            "type": ["string", "null"],
            "enum": ["low", "moderate", "elevated", "high", "sanctioned", null]
          },
          "blocs": {
            "type": "array",
            "items": { "type": "string" }
          },
          "nationalLaws": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    }
  }
}
```

### blocs.schema.json (updated)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Regional Blocs",
  "type": "object",
  "required": ["@context", "@type", "name", "itemListElement"],
  "properties": {
    "@context": { "const": "https://schema.org" },
    "@type": { "const": "ItemList" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "itemListElement": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["@type", "identifier", "slug", "name", "riskLevel", "members"],
        "properties": {
          "@type": { "const": "Organization" },
          "identifier": { "type": "string" },
          "slug": { "type": "string" },
          "name": { "type": "string" },
          "flag": { "type": "string" },
          "description": { "type": "string" },
          "abstract": { "type": "string" },
          "summary": { "type": "string" },
          "notes": { "type": "string" },
          "riskLevel": {
            "type": "string",
            "enum": ["low", "moderate", "elevated", "high", "sanctioned", "unknown"]
          },
          "members": {
            "type": "array",
            "items": { "type": "string" }
          },
          "inheritsFrom": {
            "type": "array",
            "items": { "type": "string" }
          },
          "adequacyDecisions": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["countryId", "date"],
              "properties": {
                "countryId": { "type": "string" },
                "countryName": { "type": "string" },
                "date": { "type": "string", "format": "date" },
                "scope": {
                  "type": "string",
                  "enum": ["full", "partial", "conditional"]
                },
                "notes": { "type": "string" }
              }
            }
          }
        }
      }
    }
  }
}
```

---

## User Journeys Analysis

### Current State (Problems)

```
CURRENT NAVIGATION (menus.en.toml)
==================================

Menu: Databases
├── Software      → /software/
├── Datacenters   → /datacenters/
├── Countries     → /countries/      ←┐
├── Jurisdictions → /jurisdictions/  ←┴── DUPLICATE CONTENT!
├── Laws          → /laws/
└── Networks      → /networks/


CURRENT USER JOURNEYS
=====================

1. DATACENTERS PATH
   /datacenters/ (overview with map, provider list)
        │
        ├──→ Provider: /datacenters/aws/
        │         └── regions, compliance, links to countries
        │
        └──→ {{< datacenter-countries >}} links to... unclear

2. COUNTRIES PATH
   /countries/ (overview + map + bloc cards)
        │
        ├──→ Bloc: /countries/eu/
        │         └── members, laws, datacenters
        │
        └──→ Country: /countries/norway/

3. JURISDICTIONS PATH (DUPLICATE!)
   /jurisdictions/ (overview + map - same as countries!)
        │
        ├──→ Bloc: /jurisdictions/eu/
        │
        └──→ Country: /jurisdictions/norway/

4. LAWS PATH
   /laws/ (overview)
        │
        └──→ Law: /laws/gdpr/
                  └── applies to jurisdictions, conflicts
```

**Problems identified:**

| Issue | Impact |
|-------|--------|
| `/countries/` and `/jurisdictions/` duplicate | 49 + 68 = 117 pages for same content |
| Menu shows both Countries AND Jurisdictions | Confuses users - which to click? |
| Cross-links inconsistent | Some link to /countries/, some to /jurisdictions/ |
| Datacenters overview links unclear | Where do country links go? |
| 22 templates reference `site.Data.jurisdictions.blocs` | Data path doesn't exist |

### Proposed Clean Structure

```
PROPOSED NAVIGATION
===================

Menu: Databases
├── Software      → /software/
├── Datacenters   → /datacenters/
├── Countries     → /countries/      (includes blocs)
├── Laws          → /laws/
└── Networks      → /networks/

(Jurisdictions menu item REMOVED)


PROPOSED USER JOURNEYS
======================

1. DATACENTERS PATH
   ─────────────────
   /datacenters/
        │
        ├──→ /datacenters/{provider}/     (e.g., /datacenters/aws/)
        │         │
        │         └──→ Links to /countries/{country}/ for jurisdiction info
        │
        └──→ Overview shows providers grouped by region
             Click country badge → /countries/{country}/


2. COUNTRIES PATH (includes blocs)
   ────────────────────────────────
   /countries/
        │
        ├──→ /countries/{bloc}/           (e.g., /countries/eu/)
        │         │
        │         ├── Overview: description, risk level, adequacy
        │         ├── Tab/Section: Member Countries (grid)
        │         ├── Tab/Section: Applicable Laws (list)
        │         └── Tab/Section: Datacenters in bloc (list)
        │
        └──→ /countries/{country}/        (e.g., /countries/norway/)
                  │
                  ├── Overview: risk level, bloc memberships
                  ├── Section: Applicable Laws (from bloc + national)
                  └── Section: Datacenters in this country


3. LAWS PATH
   ──────────
   /laws/
        │
        └──→ /laws/{law}/                 (e.g., /laws/gdpr/)
                  │
                  ├── Overview: description, scope
                  ├── Applies to: links to /countries/{bloc}/
                  └── Conflicts with: links to other laws


CONNECTION DIAGRAM
==================

                    ┌─────────────┐
                    │  COUNTRIES  │
                    │  /countries/│
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  BLOCS   │ │ COUNTRY  │ │  LAWS    │
        │ /eu/     │ │ /norway/ │ │ /laws/   │
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             │            │            │
             │    ┌───────┴───────┐    │
             │    │               │    │
             ▼    ▼               ▼    ▼
        ┌─────────────────────────────────┐
        │          DATACENTERS            │
        │         /datacenters/           │
        │                                 │
        │  Providers link TO countries    │
        │  for jurisdiction context       │
        └─────────────────────────────────┘
```

### Three User Entry Points

| Entry Point | User Intent | Journey |
|-------------|-------------|---------|
| `/datacenters/` | "Where can I host my data?" | Browse providers → See regions → Check country jurisdiction |
| `/countries/` | "What are the rules in X?" | Browse blocs/countries → See laws → Find compliant datacenters |
| `/laws/` | "What does GDPR require?" | Read law details → See where it applies → Understand conflicts |

## Content Structure

### Pages to Keep

| Path | Purpose | Data Source |
|------|---------|-------------|
| `/countries/` | Countries overview + blocs + world map | countries.json, blocs.json |
| `/countries/{country}/` | Individual country detail | countries.json |
| `/countries/{bloc}/` | Bloc detail with tabs/sections for laws, countries, datacenters | blocs.json |
| `/datacenters/` | Datacenters overview | datacenters.json |
| `/datacenters/{provider}/` | Provider detail | datacenters.json |

### Bloc Page Structure

The bloc detail page (`/countries/{bloc}/`) should provide navigation to:

| Section | Content | Data Source |
|---------|---------|-------------|
| Overview | Bloc description, risk level, adequacy status | blocs.json |
| Member Countries | Grid of member countries with risk levels | countries.json filtered by bloc |
| Applicable Laws | Laws that apply to this bloc | laws.json filtered by `legislationJurisdiction` |
| Datacenters | Datacenters in member countries | datacenters.json filtered by country |
| Map | Visual map of member countries | (uses map shortcode) |

### Pages to Remove

| Path | Count | Reason |
|------|-------|--------|
| `/jurisdictions/` | 1 | Replaced by `/countries/` |
| `/jurisdictions/{country}/` | 62 | Replaced by `/countries/{country}/` |
| `/jurisdictions/{bloc}/` | 5 | Replaced by `/countries/{bloc}/` |

**Total: 68 pages to delete from `content/jurisdictions/`**

### Menu Changes Required

Update `config/_default/menus.en.toml`:

```toml
# REMOVE these entries:
[[main]]
  name = "Jurisdictions"
  parent = "Databases"
  pageRef = "jurisdictions"
  weight = 24

[[footer]]
  name = "Jurisdictions"
  pageRef = "jurisdictions"
  weight = 40
```

### Redirect Rules

Add redirects for old URLs (in `static/_redirects` or Hugo aliases):

```
/jurisdictions/*  /countries/:splat  301
```

### Template Updates Required

| Template | Changes Needed |
|----------|----------------|
| `layouts/countries/single.html` | Update to use new countries.json structure |
| `layouts/countries/bloc.html` | Update to use new blocs.json structure |
| `layouts/shortcodes/jurisdiction-map.html` | Update data source reference |
| `layouts/shortcodes/bloc-cards.html` | Update data source reference |
| `layouts/shortcodes/country-cards.html` | Update data source reference |

---

## Implementation Plan

### Phase 1: Data Migration

1. Create `data/countries/countries.json` from `data/regions.json`
   - Add schema.org wrapper
   - Keep all existing fields
2. Create `data/schemas/countries.schema.json`
3. Add `adequacyDecisions` to `data/blocs/blocs.json`
4. Update `data/schemas/blocs.schema.json`
5. Run validation: `npm run validate`

### Phase 2: Template Migration (57 files)

Update data lookups in templates:

| Old Path | New Path | Files |
|----------|----------|-------|
| `site.Data.jurisdictions.blocs` | `site.Data.blocs.blocs.itemListElement` | 22 |
| `site.Data.regions` | `site.Data.countries.countries.itemListElement` | 35 |

Key files to update:
- `layouts/countries/single.html`
- `layouts/countries/bloc.html`
- `layouts/shortcodes/bloc-cards.html`
- `layouts/shortcodes/jurisdiction-map.html`
- `layouts/shortcodes/datacenter-*.html`
- All partials in `layouts/partials/sidebar/jurisdiction-*.html`

### Phase 3: Content Consolidation

1. **Ensure `/content/countries/` is complete**
   - Compare with `/content/jurisdictions/` - add any missing
   - Currently: 49 pages in countries, 68 in jurisdictions

2. **Delete `/content/jurisdictions/`** (68 pages)
   ```bash
   rm -rf content/jurisdictions/
   ```

3. **Update internal links**
   - Search for `/jurisdictions/` links in content
   - Replace with `/countries/`

4. **Add redirects** for SEO
   - `/jurisdictions/* → /countries/:splat`

### Phase 4: Navigation Update

1. Update `config/_default/menus.en.toml`
   - Remove "Jurisdictions" from main menu
   - Remove "Jurisdictions" from footer menu

2. Update any hardcoded navigation in templates

### Phase 5: Cleanup

1. Delete `data/regions.json`
2. Delete old schema files if unused
3. Update `scripts/validate.js` for new schemas
4. Update `CLAUDE.md` documentation
5. Run full site build and test

---

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `data/countries/countries.json` | Country data in schema.org format |
| `data/schemas/countries.schema.json` | Schema for countries.json |

### Modified Files

| File | Changes |
|------|---------|
| `data/jurisdictions/blocs.json` | Add schema.org wrapper, adequacyDecisions |
| `data/schemas/blocs.schema.json` | Update for new structure |
| `layouts/countries/single.html` | Update data lookups |
| `layouts/countries/bloc.html` | Update data lookups |
| `layouts/shortcodes/*.html` | Update data references |
| `scripts/validate.js` | Add new schema validations |

### Deleted Files

| File | Reason |
|------|--------|
| `data/regions.json` | Replaced by countries/countries.json |
| `data/jurisdictions/jurisdictions.json` | No longer needed |
| `content/jurisdictions/*` | Section removed |

---

## Success Criteria

- [ ] All data files follow schema.org ItemList pattern
- [ ] countries.json validates against schema
- [ ] blocs.json validates against schema
- [ ] All country pages render correctly
- [ ] All bloc pages render correctly
- [ ] Risk levels display correctly (including overrides)
- [ ] Adequacy decisions appear on bloc pages
- [ ] No broken internal links
- [ ] `npm run validate` passes
- [ ] No console errors on any page

---

## Other Data Directories Reviewed

### Networks (`data/networks/`)

**Decision: Leave as-is**

The networks data model is already multi-country capable:
- `networks.json` - Cable systems connecting places across countries
- `networks-actors.json` - Organizations with `countryId` field
- `networks-places.json` - Locations with `addressCountry` field

The Norway focus is a **content scope decision**, not a data model limitation. Adding Swedish/Finnish/Danish infrastructure requires only new data entries, no schema changes.

Files:
- `networks.json` - Plain array (acceptable, no schema.org wrapper needed)
- `networks-actors.json` - Plain array with `@type` on items
- `networks-places.json` - Plain array with `@type` on items
- `networks-trawler.json` - Scraper output

### Laws (`data/laws/`)

**Decision: No changes needed**

Already uses schema.org format:
- `laws.json` - Schema.org ItemList ✓
- `law_types.json` - Schema.org ItemList ✓
- `relationship_types.json` - Schema.org ItemList ✓

Laws link to jurisdictions via `legislationJurisdiction` array (e.g., `["eu"]`, `["us"]`).

### Events (`data/events/`)

**Decision: Add schema.org wrapper for consistency**

Current state:
- `events.json` - Plain array (no schema.org wrapper)
- Has `location.country` field, already multi-country capable
- Currently all events are in Norway (content scope, not model limitation)

Proposed change:
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SovereignSky Events",
  "description": "Conferences and events relevant to data sovereignty",
  "itemListElement": [
    {
      "@type": "Event",
      "identifier": "hackcon-21",
      ...
    }
  ]
}
```

This is a low-priority change for consistency but not blocking.

---

## Data Model Summary

| Directory | Schema.org | Multi-country | Action |
|-----------|------------|---------------|--------|
| `data/audience/` | ✓ Yes | N/A | None |
| `data/countries/` | To create | ✓ Yes | **Create** |
| `data/datacenters/` | ✓ Yes | ✓ Yes | None |
| `data/events/` | ✗ No | ✓ Yes | **Add wrapper** (low priority) |
| `data/jurisdictions/blocs.json` | ✗ No | ✓ Yes | **Add wrapper + adequacy** |
| `data/jurisdictions/jurisdictions.json` | N/A | N/A | **Delete** |
| `data/laws/` | ✓ Yes | ✓ Yes | None |
| `data/networks/` | Partial | ✓ Yes | None (leave as-is) |
| `data/regions.json` | ✗ No | ✓ Yes | **Move to countries/** |

---

## Open Questions

1. **Bloc file location**: Keep at `data/jurisdictions/blocs.json` or move to `data/blocs/blocs.json`?
2. **UK adequacy**: Should UK bloc have its own adequacy decisions array?
3. **Historical adequacy**: Should we track revoked adequacy decisions (e.g., US Privacy Shield)?

---

## References

- [Schema.org Country](https://schema.org/Country)
- [Schema.org Organization](https://schema.org/Organization)
- [Schema.org ItemList](https://schema.org/ItemList)
- [EU Adequacy Decisions](https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en)

---

## Appendix: Complete Data File Inventory

### Current State
```
data/
├── audience/
│   └── audience.json              # Schema.org ✓
├── blocs/
│   ├── blocs.json                 # Schema.org ✓ - READY (templates not updated)
│   └── risk-levels.json           # Lookup table
├── datacenters/
│   └── datacenters.json           # Schema.org ✓
├── events/
│   └── events.json                # Plain array
├── laws/
│   ├── laws.json                  # Schema.org ✓
│   ├── law_types.json             # Schema.org ✓
│   └── relationship_types.json    # Schema.org ✓
├── networks/
│   ├── networks.json              # Plain array - LEAVE AS-IS
│   ├── networks-actors.json       # Plain array - LEAVE AS-IS
│   ├── networks-places.json       # Plain array - LEAVE AS-IS
│   └── networks-trawler.json      # Scraper output
├── regions.json                   # Plain array - TO BE MIGRATED
└── schemas/
    ├── blocs.schema.json          # Exists
    ├── regions.schema.json        # Exists
    └── ...
```

### Target State
```
data/
├── audience/
│   └── audience.json              # No changes
├── blocs/
│   ├── blocs.json                 # Add adequacyDecisions
│   └── risk-levels.json           # No changes
├── countries/
│   └── countries.json             # NEW - from regions.json with schema.org
├── datacenters/
│   └── datacenters.json           # No changes
├── events/
│   └── events.json                # Add schema.org wrapper (low priority)
├── laws/
│   └── *.json                     # No changes
├── networks/
│   └── *.json                     # No changes (LEAVE AS-IS)
├── regions.json                   # DELETED
└── schemas/
    ├── blocs.schema.json          # Update for adequacyDecisions
    ├── countries.schema.json      # NEW
    └── events.schema.json         # NEW (low priority)
```

### Identifier Conventions

| Type | Format | Example | Reason |
|------|--------|---------|--------|
| Countries | UPPERCASE | `"NO"`, `"US"`, `"GB"` | ISO 3166-1 alpha-2 standard |
| Blocs | lowercase | `"eu"`, `"eea"`, `"five-eyes"` | URL-friendly slugs |

References:
- `regions.json` blocs field → lowercase: `"blocs": ["eea"]`
- `blocs.json` memberOf field → uppercase: `"memberOf": ["NO", "IS", "LI"]`

### Blocs.json Field Mapping

Note: The existing `blocs.json` uses different field names than originally planned:

| Planned | Actual in blocs.json |
|---------|---------------------|
| `members` | `memberOf` |
| `slug` | Not present (uses `identifier` as slug) |

Templates will need to use `memberOf` when referencing bloc members.
