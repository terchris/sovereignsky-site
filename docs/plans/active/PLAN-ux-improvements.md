# UX Improvements Plan

## Status: Active

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

- [ ] 3.1 Create `layouts/partials/chip-list-responsive.html`
  - Accepts: items array (with name, url, flag optional)
  - Mobile: `flex-wrap` with proper gap
  - Chips sized appropriately for touch (min 44px height)
  - Max items option with "Show more" for long lists

- [ ] 3.2 Update countries list page - Regional Blocs section
  - Use new responsive chip list

- [ ] 3.3 Update countries list page - Browse by Country section
  - Use new responsive chip list
  - Consider alphabetical grouping on mobile

- [ ] 3.4 Update country single page - Providers section
  - Ensure provider cards wrap properly
  - Use responsive grid

- [ ] 3.5 Test at 375px viewport

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

- [ ] 4A.1 Review footer against Aftenposten and modern designs
- [ ] 4A.2 Fix spacing and alignment issues
- [ ] 4A.3 Ensure consistent column widths
- [ ] 4A.4 Test on desktop and mobile

### 4B: Map Spacing

**Problem**: Too much space above maps on mobile

- [ ] 4B.1 Identify source of extra spacing in datacenter pages
- [ ] 4B.2 Reduce top margin/padding on map containers
- [ ] 4B.3 Test on `/datacenters/azure/` at mobile width

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

- [ ] 5.1 Audit current TOC usage
  - Check: `layouts/publications/single.html`
  - Check: `layouts/laws/single.html`
  - Check: `layouts/blog/single.html`

- [ ] 5.2 Determine which content types need TOC
  - Publications: Yes (long documents) ✓
  - Laws: Yes (complex legal text)
  - Blog: Maybe (for long posts)

- [ ] 5.3 Add TOC to laws single page using `inline-toc.html`

- [ ] 5.4 Add TOC option to blog (based on content length or front matter)

### Validation
```bash
# Check TOC appears on:
# - /publications/totalberedskapsmeldingen-2025/
# - /laws/gdpr/
# - Long blog posts
```

---

## File Changes Summary

### New Files
```
layouts/partials/filter-pills.html        # Phase 1
layouts/partials/card-compact.html        # Phase 2
layouts/partials/chip-list-responsive.html # Phase 3
```

### Modified Files
```
layouts/publications/list.html            # Phase 1, 2
layouts/countries/list.html               # Phase 1, 3
layouts/partials/related-laws-list.html   # Phase 2
layouts/partials/footer.html              # Phase 4A
layouts/datacenters/single.html           # Phase 4B (or related partial)
layouts/laws/single.html                  # Phase 5
layouts/blog/single.html                  # Phase 5
```

---

## Acceptance Criteria

- [ ] No horizontal overflow on any page at 375px viewport
- [ ] Filter pills wrap properly on mobile
- [ ] Cards are compact and scannable (Aftenposten-inspired)
- [ ] Category labels provide context without descriptions
- [ ] Footer looks professional on desktop
- [ ] Map spacing is reasonable on mobile
- [ ] TOC available on publications, laws, and long blogs
- [ ] All new components are reusable partials

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
