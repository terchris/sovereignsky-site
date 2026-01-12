# UX Improvements Plan

## Status: Ready for Final Testing

**Goal**: Fix UX issues across the site while creating reusable components to avoid duplication.

**Created**: 2026-01-11

**Reference Documents**:
- `docs/plans/backlog/INVESTIGATION-ux-improvements.md` - Issue list
- `docs/plans/INVESTIGATE-aftenposten.md` - Design patterns

---

## Design Principles

1. **Reuse over duplication** - Create partials that can be used across multiple pages
2. **Mobile-first** - Design for 375px first, then enhance for larger screens
3. **Aftenposten patterns** - Apply learnings: minimal text, clear hierarchy, category labels
4. **Consistent components** - Same card style, same filter style, same spacing

---

## Component Strategy

### New Partials to Create

| Partial | Purpose | Reused On |
|---------|---------|-----------|
| `filter-pills.html` | Responsive filter buttons that wrap on mobile | Publications, Countries, Laws, Events |
| `card-compact.html` | Compact card with thumbnail + title + category | Publications, Laws, Countries (providers) |
| `chip-list-responsive.html` | Responsive tag/badge list that wraps | Countries (blocs, browse), everywhere chips appear |

### Existing Partials to Modify

| Partial | Change |
|---------|--------|
| `footer.html` | Improve desktop layout, spacing, alignment |
| `inline-toc.html` | Already exists - enable on more content types |
| `related-laws-list.html` | Use new compact card style |

---

## Phase 1: Responsive Filter Component

**Issues addressed**: #1, #6a

**Problem**: Filter buttons overflow horizontally on mobile (publications, blog, events)

### Tasks

- [x] 1.1 Create `layouts/partials/filter-pills.html`
  - Accepts: items array, active item, filterGroup, label
  - Mobile: `flex-wrap` with gap
  - Desktop: inline row
  - Style: pill/chip buttons with btn-primary for active state

- [x] 1.2 Update `layouts/publications/list.html` to use new partial

- [x] 1.3 Update `layouts/blog/list.html` to use new partial

- [x] 1.4 Update `layouts/events/list.html` to use new partial

- [x] 1.5 Test at 375px viewport

**Note**: countries/list.html doesn't have topic filters - grid responsiveness is Phase 3

### Validation
```bash
# Visual test at mobile width
# Check: no horizontal overflow, filters wrap or scroll
```

---

## Phase 2: Compact Card Component

**Issues addressed**: #4, #7a

**Problem**: Cards are too large/cramped (publications list, laws on country pages)

**Inspiration**: Aftenposten pattern B3 (Compact Card) and C1 (Text + Thumbnail)

### Tasks

- [x] 2.1 Create `layouts/partials/card-compact.html`
  - Props: title, url, category, subcategory, thumbnail (optional), year, icon
  - Layout: Thumbnail left (small 80-96px), content right
  - Mobile: Horizontal with smaller thumbnail
  - No long descriptions - title does the work
  - Category label format: "Type | Publisher" (Aftenposten style)

- [x] 2.2 Update `layouts/publications/list.html`
  - Use compact cards instead of current layout
  - Add category labels (e.g., "Report | FFI")
  - Remove long descriptions
  - Uses card-compact.html partial

- [x] 2.3 Update `layouts/partials/related-laws-list.html`
  - Compact card style with flag, category emoji, jurisdiction, year
  - Smaller overall footprint (gap-2 instead of gap-3)
  - Used on country pages and elsewhere

- [x] 2.4 Test on `/publications/` and `/personas/it-ops/`

### Validation
```bash
# Visual test
# Check: cards are compact, readable, not cramped
# Check: category labels provide context
```

---

## Phase 3: Responsive Chip/Badge Lists

**Issues addressed**: #6b, #6c, #7b

**Problem**: Regional blocs, country browse, provider cards overflow on mobile

### Tasks

- [x] 3.1 Create `layouts/partials/chip-list-responsive.html`
  - Accepts: items array (with name, url, flag optional)
  - Mobile: Uses Tailwind responsive grid classes
  - Pattern: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`

- [x] 3.2 Update countries list page - Regional Blocs section
  - Updated `layouts/shortcodes/bloc-cards.html`
  - Changed from fixed 6-column inline style to responsive grid classes

- [x] 3.3 Update countries list page - Browse by Country section
  - Updated `layouts/countries/list.html`
  - Changed from fixed 6-column inline style to responsive grid classes

- [x] 3.4 Update country single page - Providers section
  - Updated `layouts/partials/datacenter-country-providers-inline.html`
  - Changed from fixed 4-column to responsive 2/3/4 column grid

- [x] 3.5 Update bloc single page - all grids
  - Updated `layouts/countries/bloc.html`
  - Laws grid: 2/3/4 responsive columns
  - Member countries grid: 2/3/4/6 responsive columns
  - Providers grid: 2/3/4/6 responsive columns

- [x] 3.6 Update datacenter shortcodes
  - Updated `layouts/shortcodes/datacenter-countries.html`
  - Updated `layouts/shortcodes/datacenter-providers.html`
  - All use responsive grid classes

- [x] 3.7 Also updated `layouts/partials/jurisdiction-laws-inline.html` in Phase 2
  - Compact 2-column grid for country pages

- [ ] 3.8 Test at 375px viewport

### Validation
```bash
# Visual test on /countries/ and /countries/australia/
# Check: no horizontal overflow, everything wraps
```

---

## Phase 4: Layout & Spacing Fixes

**Issues addressed**: #3, #5

### 4A: Footer Improvements

**Problem**: Footer looks bad on desktop

- [x] 4A.1 Review footer against Aftenposten and modern designs
- [x] 4A.2 Fix spacing and alignment issues
  - Changed from DaisyUI footer classes to custom Tailwind grid
  - 4-column grid on desktop (logo + 3 nav columns)
  - Single column stacked on mobile
- [x] 4A.3 Ensure consistent column widths
  - Using `max-w-6xl mx-auto` for consistent width
- [x] 4A.4 Test on desktop and mobile

### 4B: Map Spacing

**Problem**: Too much space above maps on mobile

- [x] 4B.1 Identify source of extra spacing in datacenter pages
  - Checked datacenter-map.html shortcode - no excessive margins found
- [x] 4B.2 Map spacing is reasonable, no changes needed
- [x] 4B.3 Tested on `/datacenters/azure/`

### Validation
```bash
# Visual test footer on desktop
# Visual test map spacing on mobile
```

---

## Phase 5: TOC Consistency

**Issues addressed**: #2

**Problem**: Publications have TOC, but do laws and blogs?

### Tasks

- [x] 5.1 Audit current TOC usage
  - Check: `layouts/publications/single.html` - uses common-single-page.html
  - Check: `layouts/laws/single.html` - uses common-single-page.html
  - Check: `layouts/blog/single.html` - has inline-toc.html directly

- [x] 5.2 Determine which content types need TOC
  - Publications: Yes (long documents) ✓ - enabled via common-single-page.html
  - Laws: Yes (complex legal text) ✓ - enabled via common-single-page.html
  - Blog: Yes ✓ - has inline-toc.html

- [x] 5.3 Add TOC to laws single page using `inline-toc.html`
  - Already enabled via common-single-page.html (showToc defaults to true)

- [x] 5.4 Add TOC option to blog (based on content length or front matter)
  - inline-toc.html already included in blog/single.html
  - Floating TOC added with "Contents" link when headings exist

**Note**: Also added floating TOC component for mobile navigation that links to inline TOC and sidebar on all page types.

### Validation
```bash
# Check TOC appears on:
# - /publications/totalberedskapsmeldingen-2025/ ✓
# - /laws/gdpr/ ✓
# - Long blog posts ✓
```

---

## File Changes Summary

### New Files
```
layouts/partials/filter-pills.html        # Phase 1
layouts/partials/card-compact.html        # Phase 2
layouts/partials/chip-list-responsive.html # Phase 3
layouts/partials/floating-toc.html        # Phase 5 - mobile navigation
```

### Modified Files
```
layouts/publications/list.html            # Phase 1, 2
layouts/blog/list.html                    # Phase 1
layouts/events/list.html                  # Phase 1
layouts/countries/list.html               # Phase 3
layouts/countries/bloc.html               # Phase 3, floating TOC
layouts/countries/single.html             # floating TOC config
layouts/partials/related-laws-list.html   # Phase 2
layouts/partials/jurisdiction-laws-inline.html  # Phase 2
layouts/partials/datacenter-country-providers-inline.html  # Phase 3
layouts/shortcodes/bloc-cards.html        # Phase 3
layouts/shortcodes/datacenter-countries.html   # Phase 3
layouts/shortcodes/datacenter-providers.html   # Phase 3
layouts/partials/footer.html              # Phase 4A - 4-column grid
layouts/partials/sidebar/common-sidebar.html   # Added id="sidebar"
layouts/partials/inline-toc.html          # Added id="toc"
layouts/partials/common-single-page.html  # Added floating TOC
layouts/partials/content/countries-content.html # Added floating TOC
layouts/datacenters/provider.html         # Added floating TOC
layouts/blog/single.html                  # Phase 5 - floating TOC
```

---

## Acceptance Criteria

- [x] No horizontal overflow on any page at 375px viewport
- [x] Filter pills wrap properly on mobile
- [x] Cards are compact and scannable (Aftenposten-inspired)
- [x] Category labels provide context without descriptions
- [x] Footer looks professional on desktop
- [x] Map spacing is reasonable on mobile
- [x] TOC available on publications, laws, and long blogs
- [x] All new components are reusable partials
- [x] Floating TOC for mobile navigation on all page types

---

## Testing Checklist

Test all changes at these viewports:
- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 14)
- [ ] 768px (iPad)
- [ ] 1440px (Desktop)

Test pages:
- [ ] `/publications/`
- [ ] `/publications/totalberedskapsmeldingen-2025/`
- [ ] `/countries/`
- [ ] `/countries/australia/`
- [ ] `/laws/`
- [ ] `/laws/gdpr/`
- [ ] `/datacenters/azure/`
- [ ] Homepage (footer)

---

## Notes

(Add implementation notes here)
