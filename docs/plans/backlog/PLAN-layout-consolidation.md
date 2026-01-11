# Plan: Layout Consolidation

## Status: Backlog

## Goal
Consolidate single-page layouts to reduce code duplication by extending `common-single-page.html` to handle more use cases, then migrating layouts that currently duplicate the two-column structure.

## Issue
Related to ongoing architecture improvements (no specific GitHub issue yet)

## Background

Currently 9 single-page layouts exist:
- **2 use `common-single-page.html`** (laws, publications) - clean, ~25 lines each
- **5 duplicate the two-column structure** (countries, personas, networks, blog, datacenters/*) - 150-260 lines each
- **2 are completely custom** (events, software) - different designs, keep as-is

The duplicated pattern in Group B layouts:
```html
<article class="max-w-full">
  {{ partial "common-detail-header.html" ... }}
  <section class="flex flex-col max-w-full mt-0 lg:flex-row">
    {{ partial "sidebar/common-sidebar.html" . }}
        {{/* sidebar cards */}}
    {{ partial "sidebar/common-sidebar-end.html" . }}
    <div class="min-w-0 flex-1">
      <div class="article-content prose dark:prose-invert max-w-none mb-20">
        {{/* content */}}
      </div>
    </div>
  </section>
</article>
```

## Approach

Extend `common-single-page.html` with new parameters:
- `beforeContent` - partial to render before abstract/summary (for maps, etc.)
- `afterContent` - partial to render after main content (for related sections)
- `contentPartial` - optional partial to completely replace main content area
- `showAbstract` / `showSummary` - toggles (default true)
- `backLinkUrl` / `backLinkText` - customizable back link

This allows layouts to provide custom inline sections while reusing the page structure.

---

## Phase 1: Extend common-single-page.html

### Tasks
- [ ] 1.1 Add `beforeContent` parameter that renders a partial before abstract
- [ ] 1.2 Add `afterContent` parameter that renders a partial after main content
- [ ] 1.3 Add `contentPartial` parameter for complete content replacement
- [ ] 1.4 Add `showAbstract` and `showSummary` boolean parameters (default true)
- [ ] 1.5 Add `backLinkUrl` and `backLinkText` parameters
- [ ] 1.6 Add `pageData` parameter to pass arbitrary data to partials

### Validation
```bash
# Verify laws and publications still work
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

Check in browser:
- http://localhost:1313/laws/gdpr/
- http://localhost:1313/publications/

---

## Phase 2: Create content partials for countries

### Tasks
- [ ] 2.1 Create `layouts/partials/content/countries-before.html` (map shortcode)
- [ ] 2.2 Create `layouts/partials/content/countries-main.html` (laws, providers sections)
- [ ] 2.3 Migrate `countries/single.html` to use `common-single-page.html`
- [ ] 2.4 Test countries pages thoroughly

### Validation
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

Check in browser:
- http://localhost:1313/countries/australia/
- http://localhost:1313/countries/norway/
- http://localhost:1313/countries/united-states/

---

## Phase 3: Create content partials for personas

### Tasks
- [ ] 3.1 Create `layouts/partials/content/personas-main.html` (featured image, related content grids)
- [ ] 3.2 Migrate `personas/single.html` to use `common-single-page.html`
- [ ] 3.3 Test personas pages

### Validation
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

Check in browser:
- http://localhost:1313/personas/
- Individual persona pages

---

## Phase 4: Create content partials for networks

### Tasks
- [ ] 4.1 Create `layouts/partials/content/networks-main.html` (route, owners sections)
- [ ] 4.2 Migrate `networks/single.html` to use `common-single-page.html`
- [ ] 4.3 Move data lookups to the layout file, pass via `pageData`
- [ ] 4.4 Test networks pages

### Validation
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

Check in browser:
- http://localhost:1313/networks/
- Individual network pages

---

## Phase 5: Evaluate remaining layouts

### Tasks
- [ ] 5.1 Evaluate `blog/single.html` - has unique features (author, series, sharing)
- [ ] 5.2 Evaluate `datacenters/*.html` - 3 layouts with similar structure
- [ ] 5.3 Document decision: migrate or keep custom
- [ ] 5.4 If migrating, create content partials and migrate

### Notes
- `blog/single.html` may benefit from staying custom due to author/series complexity
- `datacenters/` layouts share a lot with countries - could potentially share partials

---

## Phase 6: Cleanup and documentation

### Tasks
- [ ] 6.1 Remove any dead code from migrated layouts
- [ ] 6.2 Update PAGE-LAYOUTS.md with new architecture
- [ ] 6.3 Add inline comments to common-single-page.html explaining parameters
- [ ] 6.4 Full mobile/desktop testing of all migrated pages

### Validation
```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

---

## Acceptance Criteria

- [ ] `common-single-page.html` supports custom content sections via partials
- [ ] At least 3 more layouts migrated (countries, personas, networks)
- [ ] No visual regression on any pages
- [ ] Code reduction of at least 300 lines total
- [ ] Documentation updated

---

## Estimated Complexity

| Phase | Complexity | Risk |
|-------|------------|------|
| 1 | Low | Low |
| 2 | Medium | Medium |
| 3 | Medium | Low |
| 4 | Medium | Medium |
| 5 | Variable | Variable |
| 6 | Low | Low |

## Dependencies

- Sidebar consolidation (completed)
- Mobile responsiveness testing (in progress - issue #5)

## Notes

- Keep `events/single.html` and `software/single.html` as-is - different design intent
- Consider creating a `common-list-page.html` for list templates in future
- The `pageData` parameter pattern allows complex data to be prepared in the layout and passed to content partials
