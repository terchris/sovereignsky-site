# Plan 04: Remove Jurisdictions Section

## Status: Blocked

**Goal**: Remove duplicate `/jurisdictions/` section, consolidating all content under `/countries/`.

**Prerequisites**:
- Plan 03 (Template Data Paths) - MUST be complete

**Blocks**: None

**Last Updated**: 2026-01-10

---

## Overview

The `/jurisdictions/` section duplicates `/countries/` content. This plan removes:
- 67 content pages in `content/jurisdictions/`
- Menu entries for "Jurisdictions"
- `data/jurisdictions.json` file
- Any remaining references

---

## Phase 1: Verify Countries Section is Complete

### Tasks

- [ ] 1.1 Compare content in `/jurisdictions/` vs `/countries/`:
  ```bash
  ls content/jurisdictions/ | wc -l
  ls content/countries/ | wc -l
  ```

- [ ] 1.2 Identify any pages in jurisdictions that don't exist in countries
- [ ] 1.3 Copy any missing content from jurisdictions to countries

### Validation

```bash
# List jurisdictions pages not in countries
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && comm -23 <(ls content/jurisdictions/ | sort) <(ls content/countries/ | sort)"
# Should output nothing or only _index.md
```

---

## Phase 2: Update Navigation Menus

### Tasks

- [ ] 2.1 Edit `config/_default/menus.en.toml`:
  - Remove "Jurisdictions" from `[[main]]` menu
  - Remove "Jurisdictions" from `[[footer]]` menu

- [ ] 2.2 Search for any hardcoded "Jurisdictions" links in templates:
  ```bash
  grep -r "jurisdictions" layouts/ --include="*.html" -i
  ```

### Validation

```bash
# No jurisdictions in menu config
grep -i "jurisdictions" config/_default/menus.en.toml
# Should output nothing

# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

---

## Phase 3: Add Redirects

### Tasks

- [ ] 3.1 Create redirects for old URLs (choose one method):

**Option A: Hugo aliases** (in `content/countries/_index.md` and individual pages)
```yaml
aliases:
  - /jurisdictions/
```

**Option B: Static redirects file** (`static/_redirects` for Netlify/Cloudflare)
```
/jurisdictions/*  /countries/:splat  301
```

**Option C: Hugo server config** (in `hugo.toml`)
```toml
[server.redirects]
  [[server.redirects]]
  from = "/jurisdictions/**"
  to = "/countries/:splat"
  status = 301
```

### Validation

```bash
# Test redirect (if using Hugo server)
curl -I http://localhost:1313/jurisdictions/norway/ 2>/dev/null | grep -E "301|Location"
# Should show 301 redirect to /countries/norway/
```

---

## Phase 4: Update Internal Links

### Tasks

- [ ] 4.1 Find all content files linking to `/jurisdictions/`:
  ```bash
  grep -r "/jurisdictions/" content/ --include="*.md" -l
  ```

- [ ] 4.2 Update each link to point to `/countries/`

- [ ] 4.3 Find template files with jurisdictions links:
  ```bash
  grep -r "/jurisdictions/" layouts/ --include="*.html" -l
  ```

- [ ] 4.4 Update each template link

### Validation

```bash
# No jurisdictions links in content
grep -r "/jurisdictions/" content/ --include="*.md" | wc -l
# Should output: 0

# No jurisdictions links in templates
grep -r "/jurisdictions/" layouts/ --include="*.html" | wc -l
# Should output: 0
```

---

## Phase 5: Delete Jurisdictions Content

### Tasks

- [ ] 5.1 Delete `content/jurisdictions/` directory:
  ```bash
  rm -rf content/jurisdictions/
  ```

- [ ] 5.2 Delete `data/jurisdictions.json`:
  ```bash
  rm data/jurisdictions.json
  ```

### Validation

```bash
# Directories/files deleted
ls content/jurisdictions/ 2>&1 | grep -q "No such file" && echo "OK: content/jurisdictions/ deleted"
ls data/jurisdictions.json 2>&1 | grep -q "No such file" && echo "OK: data/jurisdictions.json deleted"

# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

---

## Phase 6: Final Verification

### Tasks

- [ ] 6.1 Check site builds with correct page count (should be ~67 fewer pages)
- [ ] 6.2 Verify countries section works: http://localhost:1313/countries/
- [ ] 6.3 Verify no broken links using Hugo's built-in checker or external tool
- [ ] 6.4 Check that redirects work for old URLs

### Validation

```bash
# Hugo build shows reduced page count
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc" | grep "Pages"
# Should show ~67 fewer pages than before

# No references to jurisdictions anywhere
grep -r "jurisdictions" content/ layouts/ config/ data/ --include="*.md" --include="*.html" --include="*.toml" --include="*.json" | grep -v "^Binary" | wc -l
# Should output: 0 (or only comments/documentation)
```

---

## Success Criteria

- [ ] `content/jurisdictions/` deleted (67 pages removed)
- [ ] `data/jurisdictions.json` deleted
- [ ] "Jurisdictions" removed from all menus
- [ ] Redirects in place: `/jurisdictions/*` → `/countries/*`
- [ ] Zero internal links to `/jurisdictions/`
- [ ] Hugo builds without errors
- [ ] All countries pages accessible
- [ ] `npm run validate` passes

---

## Notes

- Before deleting, ensure all unique content from jurisdictions is preserved in countries
- The redirect is important for SEO - don't skip it
- Some external sites may link to old URLs - redirects handle this
- Page count should decrease by ~67 after this plan completes
