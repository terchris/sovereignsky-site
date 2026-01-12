# UX Improvements Plan - Part 2

## Status: Backlog

**Goal**: Fix remaining UX issues from the original UX improvements work.

**Created**: 2026-01-12

**Previous Plan**: `docs/plans/completed/PLAN-ux-improvements.md`

---

## Unresolved Issue: Map Whitespace on /countries/

**Problem**: The map on `/countries/` has excessive whitespace above it on mobile viewports.

**Previous Attempts**:
- Tried `layoutCenter` and `layoutSize` (same approach that worked on `/datacenters/`)
- Tried `top`/`bottom`/`left`/`right` percentage positioning
- Tried different zoom/center values

**Why it failed**: The `/countries/` map uses ECharts `series` type 'map' configuration, while `/datacenters/` uses the `geo` component. These have different positioning behaviors.

**Files involved**:
- `layouts/shortcodes/jurisdiction-map.html` - Contains the ECharts map configuration

### Investigation Needed

- [ ] 1.1 Research ECharts `series` type 'map' positioning options
  - Check if `top`, `bottom`, `left`, `right` work differently than `geo`
  - Look for alternative approaches (e.g., `center`, `aspectScale`, `boundingCoords`)

- [ ] 1.2 Consider alternative solutions
  - CSS-based cropping/overflow hidden on container
  - Negative margins to pull content up
  - Different container structure

- [ ] 1.3 Test on mobile viewport (375px)

### Implementation

- [ ] 2.1 Apply fix to `layouts/shortcodes/jurisdiction-map.html`
- [ ] 2.2 Verify fix doesn't break desktop view
- [ ] 2.3 Test on multiple pages using the shortcode

---

## Issue: Better Design for /blocs/

**Problem**: The `/blocs/` page needs a better design.

**Page**: `http://localhost:1313/blocs/`

**Files involved**:
- `layouts/blocs/list.html` (if exists) or relevant layout file

### Tasks

- [ ] 3.1 Review current /blocs/ page design
- [ ] 3.2 Identify specific issues (layout, spacing, cards, etc.)
- [ ] 3.3 Design improved layout
- [ ] 3.4 Implement changes
- [ ] 3.5 Test on mobile and desktop

---

## Issue: Better Design for /topics/

**Problem**: The `/topics/` pages (e.g., `/topics/encryption/`) need a better design.

**Page**: `http://localhost:1313/topics/encryption/`

**Files involved**:
- `layouts/topics/list.html` or `layouts/topics/term.html` (if exists) or relevant layout file

### Tasks

- [ ] 4.1 Review current /topics/ page design
- [ ] 4.2 Identify specific issues (layout, spacing, content grouping, etc.)
- [ ] 4.3 Design improved layout
- [ ] 4.4 Implement changes
- [ ] 4.5 Test on mobile and desktop

---

## Issue: Better Design for /tags/

**Problem**: The `/tags/` pages (e.g., `/tags/russia/`) lack proper design.

**Page**: `http://localhost:1313/tags/russia/`

**Files involved**:
- `layouts/tags/list.html` or `layouts/tags/term.html` (if exists) or relevant layout file

### Tasks

- [ ] 5.1 Review current /tags/ page design
- [ ] 5.2 Identify specific issues (layout, spacing, content grouping, etc.)
- [ ] 5.3 Design improved layout
- [ ] 5.4 Implement changes
- [ ] 5.5 Test on mobile and desktop

---

## Acceptance Criteria

- [ ] Map on `/countries/` has minimal whitespace above it on mobile
- [ ] Map remains functional and properly centered on desktop
- [ ] No regressions on other pages using jurisdiction-map shortcode
- [ ] `/blocs/` page has improved design
- [ ] `/topics/` pages have improved design
- [ ] `/tags/` pages have improved design
