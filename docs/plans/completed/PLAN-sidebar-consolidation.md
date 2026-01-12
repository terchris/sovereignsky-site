# Plan: Consolidate Sidebar Implementations

## Status: Completed

**Completed**: 2026-01-12

## Goal
Refactor all templates to use the `common-sidebar.html` partial instead of custom inline sidebar divs, ensuring consistent sidebar behavior across all pages.

## Issue
Related to mobile responsiveness work (Issue #5)

## Background

Currently there are two patterns for sidebars:

**Pattern A: common-sidebar partial** (preferred)
```hugo
{{ partial "sidebar/common-sidebar.html" . }}
    <!-- sidebar cards -->
{{ partial "sidebar/common-sidebar-end.html" . }}
```

**Pattern B: Custom inline divs** (to be refactored)
```html
<div class="order-last px-0 lg:ps-8 lg:max-w-xs ...">
  <div class="print:hidden lg:sticky ...">
    <!-- sidebar cards -->
  </div>
</div>
```

## Templates to Refactor

| Template | Current Pattern | Priority |
|----------|----------------|----------|
| `layouts/blog/single.html` | Custom div | High |
| `layouts/countries/single.html` | Custom div | Medium |
| `layouts/datacenters/provider.html` | Custom div | Medium |
| `layouts/datacenters/country.html` | Custom div | Medium |
| `layouts/datacenters/single.html` | Custom div | Medium |

## Templates Already Using common-sidebar

- `layouts/personas/single.html`
- `layouts/networks/single.html`
- `layouts/partials/common-single-page.html` (publications, laws, etc.)

## Phase 1: Standardize common-sidebar.html

- [ ] Review current common-sidebar.html classes
- [ ] Decide on standard width: `lg:w-[340px]` vs `lg:max-w-xs` (320px)
- [ ] Ensure sticky positioning works with fixed headers
- [ ] Add any missing utility classes to custom.css if needed

### Validation
```bash
# Check common-sidebar.html
cat layouts/partials/sidebar/common-sidebar.html
```

## Phase 2: Refactor blog/single.html

- [ ] Replace custom sidebar div with common-sidebar partial
- [ ] Move sidebar content between partial calls
- [ ] Test on desktop (sidebar on right)
- [ ] Test on mobile (content first, sidebar after)

### Before
```hugo
<div class="order-last lg:ml-auto px-0 lg:ps-8 lg:max-w-xs">
  <div class="not-prose space-y-4 print:hidden lg:sticky {{ $topClass }}">
    <!-- cards -->
  </div>
</div>
```

### After
```hugo
{{ partial "sidebar/common-sidebar.html" . }}
    <!-- cards -->
{{ partial "sidebar/common-sidebar-end.html" . }}
```

### Validation
- http://localhost:1313/blog/ - check any blog post
- Test mobile viewport in Chrome DevTools

## Phase 3: Refactor countries/single.html

- [ ] Replace custom sidebar div with common-sidebar partial
- [ ] Test desktop and mobile views

### Validation
- http://localhost:1313/countries/australia/
- http://localhost:1313/countries/norway/

## Phase 4: Refactor datacenters templates

- [ ] Refactor `datacenters/provider.html`
- [ ] Refactor `datacenters/country.html`
- [ ] Refactor `datacenters/single.html`
- [ ] Test all datacenter page types

### Validation
- http://localhost:1313/datacenters/
- http://localhost:1313/datacenters/microsoft-azure/
- http://localhost:1313/datacenters/norway/

## Phase 5: Cleanup

- [ ] Remove unused CSS classes from custom.css (lg:order-first, lg:order-last if no longer needed)
- [ ] Update any documentation
- [ ] Final cross-browser testing

## Acceptance Criteria

1. All sidebar implementations use common-sidebar.html partial
2. Desktop: Sidebar appears on the right side
3. Mobile: Content appears first, sidebar after
4. Sticky behavior works correctly with fixed headers
5. No visual regressions on any page type

## Notes

- The `$topClass` variable for sticky positioning is currently calculated in each template. Consider moving this into the common-sidebar partial.
- Some templates pass context differently - ensure partial receives correct page context.
