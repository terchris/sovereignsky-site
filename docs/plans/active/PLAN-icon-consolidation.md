# PLAN: Icon & Content Type Consolidation

## Status: Completed

## Branch: `feature/icon-consolidation`

## Goal
Consolidate all icon definitions into a single data file and create content-type mappings. This eliminates duplication and enables site-wide icon/color consistency.

## Problem Statement

Icons are currently defined in **3 places** with duplicated SVG path data:

1. `layouts/partials/content-icon.html` - ~40 icons hardcoded with if/else
2. `data/topics/topics.json` - each topic has `icon` + `iconPath`
3. `data/audience/audience.json` - each audience has `icon` + `iconPath`

This causes:
- Maintenance burden (change icon = update 3 places)
- Inconsistency risk (same icon, different paths)
- No central icon inventory
- No validation that icon references are valid

## Proposed Solution

### 1. Centralized Icon Data

Create `data/icons/icons.json`:
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Site Icons",
  "description": "SVG icon definitions for use across the site",
  "itemListElement": [
    {
      "@type": "ImageObject",
      "identifier": "globe",
      "name": "Globe",
      "description": "World/international icon",
      "source": "heroicons",
      "style": "outline",
      "viewBox": "0 0 24 24",
      "strokeWidth": "2",
      "paths": [
        { "d": "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }
      ]
    }
  ]
}
```

### 2. Content Type Mappings

Create `data/content-types/content-types.json`:
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Content Types",
  "description": "Maps content sections to icons, colors, and display properties",
  "itemListElement": [
    {
      "@type": "WebPageElement",
      "identifier": "publications",
      "name": "Publications",
      "namePlural": "Publications",
      "description": "Research papers, reports, and guides",
      "icon": "book",
      "color": "#fbbf24",
      "colorName": "warning",
      "urlPath": "/publications/"
    }
  ]
}
```

### 3. Remove Duplication

Update `topics.json` and `audience.json` to only reference icons by identifier:
```json
{
  "identifier": "cybersecurity",
  "name": "Cybersecurity",
  "icon": "lock"
}
```
Remove the `iconPath` field entirely.

## Phases

### Phase 1: Icon Data File
- [x] Create `data/icons/icons.json` with all ~50 icons from `content-icon.html`
- [x] Create `data/schemas/icons.schema.json`
- [x] Add icons validation to `scripts/validate.js`
- [x] Test validation passes

### Phase 2: Remove Duplication
- [x] Update `data/topics/topics.json` - remove `iconPath` field
- [x] Update `data/audience/audience.json` - remove `iconPath` field
- [x] Update `data/schemas/topics.schema.json` - remove `iconPath`, add `x-validates-against` for icon
- [x] Update `data/schemas/audience.schema.json` - remove `iconPath`, add `x-validates-against` for icon
- [x] Add icon extractor to `scripts/lib/reference-validator.js`
- [x] Test validation passes

### Phase 3: Content Types
- [x] Create `data/content-types/content-types.json` with 11 section mappings
- [x] Create `data/schemas/content-types.schema.json`
- [x] Add content-types validation to `scripts/validate.js`
- [x] Test validation passes

### Phase 4: Refactor Partials
- [x] Create new `layouts/partials/icon.html` that reads from `data/icons/icons.json`
- [x] Update all templates using `content-icon.html` to use new `icon.html`
- [x] Remove old `layouts/partials/content-icon.html`
- [x] Test all pages render correctly

Note: `layouts/partials/content-type.html` was not needed - templates can access content-types data directly via `site.Data.content-types.content-types`.

### Phase 5: Validation
- [x] Run full site build
- [x] Check all list pages (publications, blog, laws, etc.)
- [x] Run `npm run validate`

## Icons Inventory

Icons extracted from `content-icon.html` + additional icons:

| Icon | Used By | Source |
|------|---------|--------|
| scale | laws | Heroicons |
| book | publications | Heroicons |
| pencil | blog | Heroicons |
| computer | software | Heroicons |
| server | datacenters | Heroicons |
| flag | jurisdictions, public-sector | Heroicons |
| calendar | events | Heroicons |
| globe | countries, networks | Heroicons |
| user | personas, consumer | Heroicons |
| bolt | cables | Heroicons |
| link | networks | Heroicons |
| shield | data-protection | Heroicons |
| lock-open | access | Heroicons |
| eye | surveillance, government-access | Heroicons |
| location | localization | Heroicons |
| lock | cybersecurity | Heroicons |
| clipboard | sector | Heroicons |
| users | organizers | Heroicons |
| clock | time | Heroicons |
| search | search | Heroicons |
| info | info | Heroicons |
| warning | warning | Heroicons |
| check-circle | success | Heroicons |
| building | blocs, enterprise | Heroicons |
| tag | tags | Heroicons |
| code | developers | Heroicons |
| cloud | cloud-sovereignty | Heroicons |
| key | encryption | Heroicons |
| plug | api | Heroicons |
| alert-triangle | risk | Heroicons |
| briefcase | business | Heroicons |
| home | self-hoster | Heroicons |
| piggy-bank | cost-conscious | Heroicons |
| heart | humanitarian | Heroicons |
| shield-check | security-defence | Heroicons |
| folder | categories | Heroicons |
| filter | filter | Heroicons |
| external | external-link | Heroicons |
| compare | compare | Heroicons |
| document | default | Heroicons |
| fingerprint | biometrics | Heroicons |
| rocket | projects | Heroicons |
| newspaper | blog (alt) | Heroicons |
| chart | analytics | Heroicons |
| lightbulb | ideas | Heroicons |
| megaphone | announcements | Heroicons |
| chat | discussion | Heroicons |
| github | github | Simple Icons |
| id-card | digital-identity | Heroicons |
| user-shield | privacy | Heroicons |
| database | metadata | Heroicons |
| alert-circle | national-preparedness | Heroicons |
| refresh | digital-resilience | Heroicons |
| message-warning | disinformation | Heroicons |
| truck | supply-chain | Heroicons |
| gavel | cloud-act | Heroicons |
| chevron-right | navigation | Heroicons |
| chevron-down | navigation | Heroicons |
| x-mark | close | Heroicons |
| check | checkmark | Heroicons |
| arrow-right | navigation | Heroicons |

## Content Types Inventory

| Identifier | Name | Icon | Color | Color Name |
|------------|------|------|-------|------------|
| publications | Publications | book | #fbbf24 | warning |
| blog | Blog | pencil | #a855f7 | accent |
| laws | Laws | scale | #38bdf8 | info |
| countries | Countries | globe | #34d399 | success |
| networks | Networks | link | #f87171 | error |
| datacenters | Datacenters | server | #f472b6 | pink |
| events | Events | calendar | #6366f1 | secondary |
| software | Software | code | #3b82f6 | primary |
| blocs | Regional Blocs | building | #14b8a6 | teal |
| sovereignsky | Projects | rocket | #22c55e | success |
| personas | Personas | user | #8b5cf6 | violet |

## Related Files

### Created
- `data/icons/icons.json` - 56 icons with SVG paths
- `data/schemas/icons.schema.json` - validation schema
- `data/content-types/content-types.json` - 11 content type mappings
- `data/schemas/content-types.schema.json` - validation schema
- `layouts/partials/icon.html` - new data-driven icon partial

### Updated
- `data/topics/topics.json` - removed `iconPath`
- `data/audience/audience.json` - removed `iconPath`
- `data/schemas/topics.schema.json` - removed `iconPath` requirement, added `x-validates-against`
- `data/schemas/audience.schema.json` - removed `iconPath` requirement, added `x-validates-against`
- `scripts/validate.js` - added icons and content-types validation
- `scripts/lib/reference-validator.js` - added icon extractor
- All 63 templates using `content-icon.html` → now use `icon.html`

### Removed
- `layouts/partials/content-icon.html` - replaced by `icon.html`

## Acceptance Criteria

- [x] All icons defined once in `data/icons/icons.json`
- [x] No `iconPath` fields in topics.json or audience.json
- [x] All icon references validated against icons.json
- [x] Content types define section-to-icon/color mappings
- [x] `npm run validate` passes (15 validations)
- [x] All pages render with correct icons (934 pages built)
- [x] Dark mode icons work correctly (uses currentColor)

## Dependent Plans

The following plans depend on this work:
- `PLAN-homepage2.md` - Homepage JSON-driven content (uses icon system)
