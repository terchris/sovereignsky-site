# PLAN: Homepage Redesign with JSON-Driven Content

## Status: Active

## Branch: `feature/homepage-json-driven`

## Goal
Create a flexible, data-driven homepage system where content sections are defined in JSON and rendered by Hugo templates. This enables easy content management without touching templates.

## Dependencies

- **PLAN-icon-consolidation.md** - Icon system must be completed first (provides `data/icons/icons.json` and `layouts/partials/icon.html`)

## Problem Statement
- Current homepage uses Blowfish's default profile layout
- No structured way to define what content appears on the homepage
- Adding/removing/reordering sections requires template changes
- No separation between content definition and presentation

## Proposed Solution

### JSON Structure for Homepage Sections

Following the same schema.org ItemList pattern as `data/sovereignsky/projects.json`, create `data/homepage/sections.json` that defines:
- Which sections appear on the homepage
- Order of sections (weight)
- Section-specific configuration
- Content source (static, query, or reference)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SovereignSky Homepage",
  "description": "Digital sovereignty resources for Norwegian organizations",
  "abstract": "Homepage sections defining the content and layout of the SovereignSky homepage",
  "summary": "A JSON-driven homepage where content sections are defined in data and rendered by Hugo templates",
  "listConfig": {
    "sorting": {
      "field": "weight",
      "direction": "asc"
    },
    "display": {
      "renderMode": "sections"
    }
  },
  "itemListElement": [
    {
      "@type": "WebPageElement",
      "identifier": "hero",
      "name": "Hero Section",
      "sectionType": "hero",
      "weight": 10,
      "enabled": true,
      "config": {
        "style": "gradient",
        "title": "Digital sovereignty resources for Norwegian organizations",
        "description": "Understand your digital dependencies and take action."
      }
    },
    {
      "@type": "WebPageElement",
      "identifier": "databases",
      "name": "Databases Stats Grid",
      "sectionType": "stats-grid",
      "weight": 20,
      "enabled": true,
      "config": {
        "title": "The data behind digital sovereignty",
        "items": [...]
      }
    }
  ]
}
```

Key differences from simpler structure:
- Uses schema.org `@context` and `@type: "ItemList"` wrapper
- Items are in `itemListElement` array (not `sections`)
- Each item has `@type: "WebPageElement"`, `identifier`, `name`
- Section type is in `sectionType` (not `type`) to avoid confusion with `@type`
- Consistent with `projects.json` pattern for validation

### Source Selection Modes

The `source` config supports two selection modes:

#### Query Mode (dynamic)
Pull items dynamically from a section with sorting and limits:
```json
"source": {
  "type": "section",
  "path": "sovereignsky",
  "select": "query",
  "limit": 4,
  "sort": "weight",
  "filter": { "status": "active" }
}
```

#### Explicit Mode (by identifier)
Select specific items by their identifiers, in exact order:
```json
"source": {
  "type": "section",
  "path": "sovereignsky",
  "select": "explicit",
  "identifiers": ["software-database", "ndsi", "bifrost", "devcontainer-toolbox"]
}
```

#### Mixed Example
You can also combine - show specific items first, then fill with query:
```json
"source": {
  "type": "section",
  "path": "publications",
  "select": "mixed",
  "identifiers": ["eu-cloud-sovereignty-framework"],
  "fillWith": {
    "sort": "date",
    "limit": 2
  }
}
```

This gives full control: pin important items, fill remaining slots dynamically.

### Section Types

| sectionType | Description | Config Options |
|-------------|-------------|----------------|
| `hero` | Full-width hero banner | style, gradient, badge, title, description |
| `stats-grid` | Statistics/numbers display | title, description, background, columns, items[] |
| `content-cards` | Grid of content from a section | source, cardStyle, columns, showMoreLink |
| `content-block` | Text + optional image | layout, image, content |
| `audience-cards` | Audience persona cards | source, cardStyle, columns |
| `events-list` | List of upcoming events | source, showMoreLink, showMoreText |
| `cta` | Call-to-action banner | style, gradient, title, description, features, buttons |
| `projects-roadmap` | Project roadmap display | items[] with progress, subItems, footer |
| `custom` | Custom partial reference | partial, data |

### Implementation Approach

1. **Data Layer**: `data/homepage/sections.json` ✅ Created
2. **Template Layer**: Create `layouts/partials/home/json-driven.html` and update config to `layout = "json-driven"`
3. **Partial Layer**: `layouts/partials/homepage/` contains section type templates
4. **Helper Partials**:
   - `layouts/partials/homepage/section-wrapper.html` - common wrapper for all sections
   - `layouts/partials/homepage/resolve-count.html` - resolves countSource paths to numbers
   - `layouts/partials/homepage/resolve-source.html` - resolves content source to items
   - `layouts/partials/icon.html` - site-wide SVG icon renderer (reads from `data/icons/icons.json`)
5. **Style Layer**: Tailwind + DaisyUI inline (consistent with current approach)

### Icon System

Icons are provided by the consolidated icon system (see **PLAN-icon-consolidation.md**):
- `data/icons/icons.json` - all SVG icons
- `data/content-types/content-types.json` - section-to-icon/color mappings
- `layouts/partials/icon.html` - renders icons by name

Usage in homepage templates:
```go
{{ partial "icon.html" (dict "name" "globe" "size" "8" "color" "#34d399") }}
```

### countSource Resolution

The `countSource` field needs a helper partial to resolve different path patterns:

| Pattern | Hugo Resolution |
|---------|-----------------|
| `data.countries.countries.itemListElement` | `len site.Data.countries.countries.itemListElement` |
| `data.networks.networks` | `len site.Data.networks.networks` |
| `data.datacenters.datacenters.regions` | Sum of `len .regions` for each datacenter |
| `pages.blog` | `len (where site.RegularPages "Section" "blog")` |

### Content Source Resolution

The `source` config in content-cards and audience-cards needs resolution:

| source.type | source.path | Resolution |
|-------------|-------------|------------|
| `section` | `blog` | Hugo pages in `/content/blog/` |
| `section` | `publications` | Hugo pages in `/content/publications/` |
| `data` | `audience.audience.itemListElement` | `site.Data.audience.audience.itemListElement` |
| `query` | (events) | `site.Data.events.events.itemListElement` sorted by date |

For `select: "explicit"`, match pages by filename (slug) against identifiers.

### Migration Strategy

1. Create new partial `layouts/partials/home/json-driven.html`
2. Test with `homepage.layout = "json-driven"` in config
3. Keep `custom.html` as fallback during development
4. Once complete, optionally rename or delete `custom.html`

## Phases

### Phase 0: Planning ✅
- [x] Analyze current homepage structure (8 sections identified)
- [x] Design JSON schema for sections
- [x] Create `data/homepage/sections.json` with current content
- [x] Document source selection modes (query, explicit, mixed)
- [x] Restructure JSON to use schema.org ItemList pattern (like projects.json)

### Phase 1: Infrastructure
- [x] Create JSON schema for validation (`data/schemas/homepage.schema.json`) - basic structure only
- [ ] Create advanced cross-file validation (see Phase 1b)
- [ ] Create `layouts/index.html` override that reads JSON
- [ ] Create base section wrapper partial
- [ ] Test with simple hero section

### Phase 1b: Advanced Validation
The basic JSON schema validates structure but not that referenced paths exist. Need custom validation for:

#### Data Path Validation
Paths like `"path": "audience.audience.itemListElement"` must resolve to actual data:
- `audience.audience.itemListElement` → `site.Data.audience.audience.itemListElement`
- `blog` (section) → Hugo content section `/content/blog/`

#### countSource Validation
Paths like `"countSource": "data.countries.countries.itemListElement"` must:
- Resolve to an array that can be counted
- Handle different data structures (itemListElement, plain arrays, nested objects)

| countSource Pattern | Resolves To |
|---------------------|-------------|
| `data.countries.countries.itemListElement` | `site.Data.countries.countries.itemListElement` |
| `data.sovereignsky.projects.itemListElement` | `site.Data.sovereignsky.projects.itemListElement` |
| `data.networks.networks` | `site.Data.networks.networks` (plain array) |
| `pages.blog` | `len (where site.Pages "Section" "blog")` |

#### Explicit Identifier Validation
When `select: "explicit"`, identifiers must exist in the source:
```json
"source": {
  "type": "section",
  "path": "blog",
  "select": "explicit",
  "identifiers": ["2025-12-10-developer-power-sovereignty", ...]
}
```
Must validate that each identifier matches a page in `/content/blog/`.

#### Implementation Options
1. **Extend reference-validator.js** - Add homepage-specific extractors and path resolution
2. **Create homepage-validator.js** - Dedicated validator for homepage paths
3. **Hugo partial validation** - Validate at build time with warnings

Tasks:
- [ ] Add data path extractors to reference-validator.js
- [ ] Add countSource path validation
- [ ] Add explicit identifier validation for content sections
- [ ] Add x-validates-against annotations to schema where applicable

### Phase 2: Icon & Content Type System (Consolidation) ✅

**Icon Data:**
- [x] Extract ~40 icons from `content-icon.html` into `data/icons/icons.json` (56 icons)
- [x] Create `data/schemas/icons.schema.json` - JSON schema for icons
- [x] Add icons validation to `scripts/validate.js`

**Remove Duplication:**
- [x] Update `data/topics/topics.json` - remove `iconPath`, keep only `icon`
- [x] Update `data/audience/audience.json` - remove `iconPath`, keep only `icon`
- [x] Update `data/schemas/topics.schema.json` - remove `iconPath` requirement, add icon x-validates-against
- [x] Update `data/schemas/audience.schema.json` - remove `iconPath` requirement, add icon x-validates-against

**Content Types:**
- [x] Create `data/content-types/content-types.json` - section-to-icon/color mappings (11 sections)
- [x] Create `data/schemas/content-types.schema.json` - JSON schema for content types
- [x] Add content-types validation to `scripts/validate.js`

**Partials:**
- [x] Refactor `layouts/partials/content-icon.html` → `layouts/partials/icon.html` (read from data)
- [ ] Create `layouts/partials/content-type.html` - lookup content type metadata (optional - not needed)
- [x] Update existing templates that use `content-icon.html` to use new `icon.html` (63 templates updated)

### Phase 3: Homepage Helper Partials ✅
- [x] Create `layouts/partials/homepage/resolve-count.html` - countSource resolver
- [x] Create `layouts/partials/homepage/resolve-source.html` - content source resolver
- [x] Create `layouts/partials/homepage/section-wrapper.html` - common section wrapper
- [x] Create `layouts/partials/home/json-driven.html` - main entry point

### Phase 4: Section Type Partials (matching sections.json) ✅
- [x] `hero.html` - gradient/image hero with badge, title, description
- [x] `stats-grid.html` - grid of stats cards with icons and counts
- [x] `audience-cards.html` - persona cards from data source
- [x] `content-cards.html` - blog/publications cards from Hugo pages
- [x] `events-list.html` - upcoming events list/table
- [x] `cta.html` - call-to-action with features and buttons
- [x] `projects-roadmap.html` - project cards with progress bars

### Phase 5: Testing & Polish (In Progress)
- [x] Test all section types render correctly
- [x] Test enabled/disabled toggle works
- [x] Test weight-based ordering works
- [ ] Verify responsive behavior (mobile, tablet, desktop)
- [x] Verify dark mode support - **Issues found and partially fixed** (see `docs/plans/backlog/PLAN-darkmode.md`)
  - [x] Fixed HTML root background (was white in dark mode)
  - [x] Fixed dark mode toggle icon (sun/moon)
  - [x] Fixed footer text visibility
  - [x] Fixed TOC readability
  - [x] Fixed article body text color
  - [x] Fixed article headings (h2-h6) and strong text
  - [ ] About page text still needs more contrast
  - [ ] Other pages may need testing
- [x] Add error handling for missing data/invalid configs

### Phase 6: Cleanup
- [ ] Remove hardcoded `custom.html` (or keep as backup)
- [ ] Update documentation
- [ ] Final visual review

## Design Considerations

### Visual Hierarchy
- Hero should be impactful and set the tone
- Clear visual separation between sections
- Consistent card/grid styling
- Breathing room between sections

### Content Strategy
- Lead with value proposition
- Show credibility (stats, projects)
- Guide users to relevant content
- End with clear CTA

### Technical
- Lazy load images below fold
- Minimize layout shifts
- Fast initial paint
- SEO-friendly structure

## Error Handling

The templates should handle these edge cases gracefully:

| Scenario | Behavior |
|----------|----------|
| Unknown `sectionType` | Log warning, skip section |
| `enabled: false` | Skip section (no output) |
| Empty `source` results | Show "No items" message or hide section |
| Invalid `countSource` path | Show "?" or 0 |
| Missing icon name | Show placeholder or nothing |
| Invalid identifier in explicit select | Skip that item, continue with others |

## Questions Resolved

1. ~~Should sections be able to have conditional visibility?~~ → Yes, use `enabled: true/false`
2. ~~How to override Blowfish homepage?~~ → Create new partial, update `homepage.layout` in config

## Questions to Resolve

1. Should we add `visibleOn: ["mobile", "tablet", "desktop"]` for responsive visibility?
2. How to handle section-specific JavaScript (e.g., animated counters)?
3. Should the projects-roadmap pull from `data/sovereignsky/projects.json` instead of hardcoded items?

## Related Files

### Data Layer
- `data/homepage/sections.json` ✅ - defines all homepage sections (schema.org ItemList format)
- `data/schemas/homepage.schema.json` ✅ - JSON schema for validation
- `data/icons/icons.json` (to create) - centralized SVG icon definitions (~40 icons)
- `data/schemas/icons.schema.json` (to create) - JSON schema for icons
- `data/content-types/content-types.json` (to create) - section-to-icon/color mappings
- `data/schemas/content-types.schema.json` (to create) - JSON schema for content types
- `data/topics/topics.json` (to update) - remove `iconPath` duplication
- `data/audience/audience.json` (to update) - remove `iconPath` duplication
- `scripts/validate.js` ✅ - add icons and content-types validation

### Config (to update)
- `config/_default/params.toml` - change `homepage.layout = "json-driven"`

### Template Layer (to create)
- `layouts/partials/home/json-driven.html` - main entry point, reads JSON and renders sections

### Helper Partials (to create)
- `layouts/partials/icon.html` - site-wide SVG icon renderer (reusable across site)
- `layouts/partials/homepage/section-wrapper.html` - common wrapper (background, padding, id)
- `layouts/partials/homepage/resolve-count.html` - countSource path resolver
- `layouts/partials/homepage/resolve-source.html` - content source resolver

### Section Partials (to create)
- `layouts/partials/homepage/hero.html`
- `layouts/partials/homepage/stats-grid.html`
- `layouts/partials/homepage/audience-cards.html`
- `layouts/partials/homepage/content-cards.html`
- `layouts/partials/homepage/events-list.html`
- `layouts/partials/homepage/cta.html`
- `layouts/partials/homepage/projects-roadmap.html`

### Existing (reference/backup)
- `layouts/partials/home/custom.html` - current hardcoded homepage (412 lines)

## Acceptance Criteria

- [x] Homepage content is fully defined in JSON
- [x] Adding/removing sections requires no template changes
- [x] Sections can be reordered by changing weight
- [x] Each section type has consistent, attractive styling
- [x] Page loads fast and looks professional
- [ ] Works well on mobile, tablet, and desktop (needs visual verification)
