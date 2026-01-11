# UX Improvements Investigation

## Status: Backlog

**Goal**: Investigate and fix various UX issues across the site.

**Created**: 2026-01-11

---

## Issues to Investigate

### 1. Publications Topic Filtering - Mobile Overflow

**URL**: http://localhost:1313/publications/

**Problem**: Topic filtering goes off the screen on mobile devices.

**To investigate**:
- [ ] Check the filter component implementation
- [ ] Identify CSS causing horizontal overflow
- [ ] Propose fix (horizontal scroll, wrap, collapse, etc.)

---

### 2. Table of Contents Consistency

**URL**: http://localhost:1313/publications/totalberedskapsmeldingen-2025/

**Problem**: Publications have inline TOC - is this also implemented on laws and blogs?

**To investigate**:
- [ ] Check if TOC is implemented on `/laws/` single pages
- [ ] Check if TOC is implemented on `/blog/` single pages
- [ ] Determine if TOC should be consistent across all content types
- [ ] If missing, add TOC to laws and/or blogs

---

### 3. Footer Design Issues

**Problem**: Footer looks bad on web/desktop view.

**To investigate**:
- [ ] Review current footer layout and spacing
- [ ] Compare with modern footer designs
- [ ] Identify specific issues (alignment, spacing, typography)
- [ ] Propose improvements

---

### 4. Publications List - Cramped Layout

**URL**: http://localhost:1313/publications/

**Problem**: The publications list looks cramped and could be improved.

**To investigate**:
- [ ] Analyze current card/list layout
- [ ] Review Aftenposten.no design patterns for inspiration
- [ ] Consider: more whitespace, better hierarchy, cleaner typography
- [ ] Propose improved layout

**Reference**: Aftenposten.no uses:
- Minimal text on cards (headline does the work)
- Clear visual hierarchy
- Generous whitespace
- Category labels for context

---

### 5. Excessive Space Above Maps on Mobile

**URL**: http://localhost:1313/datacenters/azure/

**Problem**: Too much space above maps, especially on mobile devices.

**To investigate**:
- [ ] Check what's causing the extra space (padding, margin, empty elements)
- [ ] Review map partial/component styling
- [ ] Test on mobile viewport
- [ ] Reduce spacing while maintaining visual balance

---

### 6. Countries Page - Mobile Overflow Issues

**URL**: http://localhost:1313/countries/

**Problem**: Multiple elements overflow horizontally on mobile:

**a) Filters overflow**
- [ ] Check filter component styling
- [ ] Make filters wrap or scroll horizontally

**b) Regional Blocs overflow**
- [ ] Check bloc cards/buttons layout
- [ ] Make responsive (wrap, smaller on mobile)

**c) Browse by Country overflow**
- [ ] Check country list/grid layout
- [ ] Make responsive for mobile viewports

**To investigate**:
- [ ] Identify common cause (fixed widths, no flex-wrap, etc.)
- [ ] Apply consistent fix across all three components
- [ ] Test at 375px viewport

---

### 7. Country Single Page - Card Issues

**URL**: http://localhost:1313/countries/australia/

**Problem**: Multiple card layout issues on country detail pages:

**a) Laws cards too big**
- [ ] Review laws card sizing
- [ ] Consider more compact card design
- [ ] Compare with other card styles on site

**b) Providers in Australia - cards overflow**
- [ ] Check provider cards layout
- [ ] Make responsive for mobile viewports
- [ ] Ensure cards wrap properly

**To investigate**:
- [ ] Check `related-laws-list.html` partial
- [ ] Check datacenter/provider card partial
- [ ] Apply consistent compact card styling

---

## Notes

(Add findings here during investigation)
