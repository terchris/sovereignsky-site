# Page Layout Components

This document defines the standard naming conventions for page layout components used across the SovereignSky site.

## Page Types

The site has two main page types:

| Type | Prefix | Example URLs | Purpose |
|------|--------|--------------|---------|
| **List pages** | `section-*` | `/networks/`, `/datacenters/`, `/laws/` | Index pages showing collections of items |
| **Detail pages** | `detail-*` | `/jurisdictions/norway/`, `/networks/havfrue/` | Single item pages with full details |

---

## Section Header Partial

The `section-header.html` partial provides a standardized header for all list/section pages.

### Usage in Layouts

```html
{{ partial "section-header.html" (dict
    "title" .Title
    "description" .Description
    "icon" "globe"
) }}
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `title` | Yes | Page title (usually `.Title`) |
| `description` | No | Short description (usually `.Description`) |
| `icon` | No | Icon name from content-icon.html |
| `align` | No | "left" (default) or "center" |

### Standard Icons by Section

| Section | Icon |
|---------|------|
| Networks | `globe` |
| Datacenters | `server` |
| Laws | `scale` |
| Events | `calendar` |
| Software | `computer` |
| Jurisdictions | `flag` |
| Publications | `book` |
| Personas | `users` |
| Blog | `pencil` |
| About | `info` |
| Totalforsvarsaret | `shield` |

---

## Section Stats Shortcode

The `page-stats` shortcode displays section-specific statistics using DaisyUI stat components.

### Usage in Content Files

Add this shortcode to the top of section `_index.md` files, right after the front matter:

```markdown
---
title: "Networks"
description: "..."
---

{{</* page-stats section="networks" */>}}

Rest of the content...
```

### Supported Sections

| Section | Stats Shown |
|---------|-------------|
| `software` | Products Analyzed, High Risk, Low Risk |
| `datacenters` | Datacenter Regions, Providers, Countries |
| `jurisdictions` | Countries Mapped, EU Members, Five Eyes, Sanctioned |
| `laws` | Laws Documented, Extraterritorial Reach, Government Access |
| `networks` | Total Connections, Submarine Cables, Land Connections, Active |
| `events` | Events in 2026, Topic Areas |
| `publications` | Key Publications, Audience Types |

### Implementation

The shortcode is defined in `layouts/shortcodes/page-stats.html` and automatically calculates statistics from site data.

---

## List Page Components (`section-*`)

List pages display collections of items with filtering and navigation.

```
┌─────────────────────────────────────────────────────────┐
│  section-header                                         │
│  (title, description, breadcrumbs)                      │
├─────────────────────────────────────────────────────────┤
│  section-stats                                          │
│  (key metric cards with icons)                          │
├─────────────────────────────────────────────────────────┤
│  section-chart (optional)                               │
│  (bar chart, pie chart, distribution visualization)     │
├─────────────────────────────────────────────────────────┤
│  section-filters                                        │
│  (search box, filter buttons, toggles)                  │
├─────────────────────────────────────────────────────────┤
│  section-content                                        │
│  (tables, card grids, lists, maps)                      │
└─────────────────────────────────────────────────────────┘
```

### Component Definitions

| Component | Required | Description |
|-----------|----------|-------------|
| `section-header` | Yes | Page title, description, optional breadcrumbs |
| `section-stats` | Yes | Key metrics displayed as stat cards with icons |
| `section-chart` | No | Visual breakdown of data (charts, graphs) |
| `section-filters` | No | Search input and filter controls |
| `section-content` | Yes | Main content area (tables, grids, maps) |

### Examples by Section

| Section | header | stats | chart | filters | content |
|---------|--------|-------|-------|---------|---------|
| `/networks/` | ✓ | ✓ | map | — | tables |
| `/datacenters/` | ✓ | ✓ | bar chart | ✓ | cards |
| `/laws/` | ✓ | ✓ | — | ✓ | grouped lists |
| `/events/` | ✓ | ✓ | — | ✓ | event cards |
| `/software/` | ✓ | ✓ | — | ✓ | product grid |
| `/jurisdictions/` | ✓ | ✓ | — | — | country cards |
| `/publications/` | ✓ | ✓ | — | — | publication list |

---

## Detail Page Components (`detail-*`)

Detail pages show comprehensive information about a single item.

```
┌─────────────────────────────────────────────────────────┐
│  detail-header                                          │
│  (title, flag/icon, description, key attributes)        │
├─────────────────────────────────────────────────────────┤
│  detail-stats                                           │
│  (item-specific metrics)                                │
├───────────────────────────────────┬─────────────────────┤
│                                   │                     │
│  detail-content                   │  detail-sidebar     │
│                                   │                     │
│  (main body content,              │  (navigation,       │
│   sections, data tables)          │   related items,    │
│                                   │   quick links)      │
│                                   │                     │
└───────────────────────────────────┴─────────────────────┘
```

### Component Definitions

| Component | Required | Description |
|-----------|----------|-------------|
| `detail-header` | Yes | Item title, icon/flag, description, key attributes |
| `detail-stats` | No | Item-specific metrics as stat cards |
| `detail-content` | Yes | Main content area with detailed information |
| `detail-sidebar` | No | Secondary navigation, related items, quick links |

### Examples by Section

| Detail Page | header | stats | content | sidebar |
|-------------|--------|-------|---------|---------|
| `/jurisdictions/norway/` | ✓ (flag, name) | ✓ (laws, datacenters, blocs) | laws by type | memberships, nav, related |
| `/networks/havfrue/` | ✓ (name, route) | — | attributes, map, actors | — |
| `/laws/gdpr/` | ✓ (name, year) | — | details, applies to | related |
| `/datacenters/norway/` | ✓ (flag, name) | ✓ | provider cards | — |

---

## Icon System

All components use the centralized icon system defined in:
- **Icons**: `layouts/partials/content-icon.html`
- **Colors & mappings**: `data/tag-vocabulary.json` (under `contentTypes`)

### Available Icons

| Icon | Usage | Color |
|------|-------|-------|
| `scale` | Laws | warning |
| `server` | Datacenters | secondary |
| `globe` | Networks | info |
| `flag` | Jurisdictions | accent |
| `calendar` | Events | error |
| `book` | Publications | primary |
| `computer` | Software | primary |
| `user` | Personas | secondary |
| `bolt` | Submarine cables | success |
| `location` | Locations | secondary |
| `users` | Organizations | secondary |
| `clock` | Time/planned | secondary |
| `check-circle` | Active/success | success |
| `eye` | Surveillance/access | warning |
| `shield` | Protection/privacy | success |
| `warning` | Alerts/high risk | error |
| `info` | Information | info |

### Usage Example

```html
{{ partial "content-icon.html" (dict "name" "scale" "color" "warning" "size" "8") }}
```

---

## Implementation Files

| Component Type | Layout Files |
|----------------|--------------|
| List pages | `layouts/{section}/list.html` |
| Detail pages | `layouts/{section}/single.html` or `layouts/{section}/country.html` |
| Shared partials | `layouts/partials/` |
| Shortcodes | `layouts/shortcodes/` |
| Stats | `layouts/shortcodes/page-stats.html` |
| Icons | `layouts/partials/content-icon.html` |
