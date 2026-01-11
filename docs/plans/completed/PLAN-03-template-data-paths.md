# Plan 03: Template Data Paths Migration

## Status: Blocked

**Goal**: Update all templates from old data paths to new schema.org paths.

**Prerequisites**:
- Plan 01 (Countries Data Migration) - MUST be complete
- Plan 02 (Blocs Adequacy) - SHOULD be complete

**Blocks**: Plan 04 (Remove Jurisdictions Section)

**Last Updated**: 2026-01-10

---

## Overview

Two major data path changes required across ~57 templates:

| Old Path | New Path | Files Affected |
|----------|----------|----------------|
| `site.Data.regions` | `site.Data.countries.countries.itemListElement` | ~35 |
| `site.Data.jurisdictions.blocs` | `site.Data.blocs.blocs.itemListElement` | ~22 |

---

## Phase 1: Inventory Affected Templates

### Tasks

- [ ] 1.1 Find all templates using `site.Data.regions`:
  ```bash
  grep -r "site.Data.regions" layouts/ --include="*.html" -l
  ```

- [ ] 1.2 Find all templates using `site.Data.jurisdictions`:
  ```bash
  grep -r "site.Data.jurisdictions" layouts/ --include="*.html" -l
  ```

- [ ] 1.3 Document each file and the specific changes needed

### Validation

```bash
# Count matches before migration
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && echo 'regions references:' && grep -r 'site.Data.regions' layouts/ --include='*.html' | wc -l"
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && echo 'jurisdictions references:' && grep -r 'site.Data.jurisdictions' layouts/ --include='*.html' | wc -l"
```

---

## Phase 2: Migrate Regions References

### Tasks

For each file using `site.Data.regions`:

- [ ] 2.1 Update variable assignments:
  ```hugo
  # Old
  {{ $regions := site.Data.regions }}

  # New
  {{ $countries := site.Data.countries.countries.itemListElement }}
  ```

- [ ] 2.2 Update range loops:
  ```hugo
  # Old
  {{ range site.Data.regions }}

  # New
  {{ range site.Data.countries.countries.itemListElement }}
  ```

- [ ] 2.3 Update index lookups:
  ```hugo
  # Old (if using identifier lookup)
  {{ range site.Data.regions }}
    {{ if eq .identifier $countryCode }}...{{ end }}
  {{ end }}

  # New (same pattern, different source)
  {{ range site.Data.countries.countries.itemListElement }}
    {{ if eq .identifier $countryCode }}...{{ end }}
  {{ end }}
  ```

### Files to Update (run grep to get actual list)

Expected files include:
- `layouts/countries/list.html`
- `layouts/countries/single.html`
- `layouts/shortcodes/country-cards.html`
- `layouts/shortcodes/datacenter-*.html`
- `layouts/partials/sidebar/*.html`

### Validation

```bash
# No more regions references
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && grep -r 'site.Data.regions' layouts/ --include='*.html' | wc -l"
# Should output: 0

# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

---

## Phase 3: Migrate Jurisdictions.blocs References

### Tasks

For each file using `site.Data.jurisdictions.blocs`:

- [ ] 3.1 Update variable assignments:
  ```hugo
  # Old
  {{ $blocs := site.Data.jurisdictions.blocs }}

  # New
  {{ $blocs := site.Data.blocs.blocs.itemListElement }}
  ```

- [ ] 3.2 Update field name `members` → `memberOf`:
  ```hugo
  # Old
  {{ $bloc.members }}

  # New
  {{ $bloc.memberOf }}
  ```

### Files to Update (run grep to get actual list)

Expected files include:
- `layouts/countries/bloc.html`
- `layouts/shortcodes/bloc-cards.html`
- `layouts/shortcodes/bloc-member-map.html`
- `layouts/partials/sidebar/jurisdiction-*.html`

### Validation

```bash
# No more jurisdictions references
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && grep -r 'site.Data.jurisdictions' layouts/ --include='*.html' | wc -l"
# Should output: 0

# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

---

## Phase 4: Visual Verification

### Tasks

- [ ] 4.1 Check countries list page: http://localhost:1313/countries/
- [ ] 4.2 Check a country detail page: http://localhost:1313/countries/norway/
- [ ] 4.3 Check a bloc detail page: http://localhost:1313/countries/eu/
- [ ] 4.4 Check datacenter pages that reference countries
- [ ] 4.5 Check any maps that show country/bloc data

### Validation

```bash
# Hugo server running
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo server -D --bind 0.0.0.0 --disableFastRender" &

# Manual visual check of pages listed above
```

---

## Phase 5: Delete Old Data Files

### Tasks

- [ ] 5.1 Delete `data/regions.json` (now replaced by `data/countries/countries.json`)
- [ ] 5.2 Verify no templates reference the old file

### Validation

```bash
# File deleted
ls data/regions.json 2>&1 | grep -q "No such file" && echo "OK: regions.json deleted"

# Hugo still builds
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Validation still passes
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

---

## Success Criteria

- [ ] Zero templates reference `site.Data.regions`
- [ ] Zero templates reference `site.Data.jurisdictions`
- [ ] All templates use new paths:
  - `site.Data.countries.countries.itemListElement`
  - `site.Data.blocs.blocs.itemListElement`
- [ ] `data/regions.json` deleted
- [ ] Hugo builds without errors
- [ ] All country/bloc pages render correctly
- [ ] `npm run validate` passes

---

## Notes

- This is the largest migration task - consider doing in batches
- Test each batch before proceeding
- Keep `regions.json` until ALL templates are migrated
- Field name change: `members` → `memberOf` in blocs data
