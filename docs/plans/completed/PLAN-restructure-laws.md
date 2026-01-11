# Plan: Restructure Laws Data

## Overview

Migrate `data/laws/laws.json` to schema.org-aligned structure with consistent field naming across the site.

## New Structure

See `docs/plans/active/laws-data2.json` for complete example with all 41 laws.

### Field Mapping

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `id` | `identifier` | schema.org |
| `name` | `name` | unchanged |
| `full_name` | `alternateName` | schema.org |
| `summary` | `description` + `abstract` + `summary` | description=short, abstract=medium, summary=detailed |
| `year` | `legislationDate` | schema.org |
| `applies_to` | `legislationJurisdiction` | schema.org |
| `url` | `url` | unchanged |
| `type` | `category` | avoid conflict with @type |
| `government_access` | `governmentAccess` | camelCase |
| `data_protection` | `dataProtection` | camelCase |
| `extraterritorial` | `extraterritorial` | unchanged |
| `requires_localization` | `requiresLocalization` | camelCase |
| `requires_backdoor` | `requiresBackdoor` | camelCase |
| `related_laws` | `isRelatedTo` | schema.org |
| `review_status` | `reviewStatus` | camelCase |
| `scope` | (removed) | derive from jurisdiction |
| (new) | `legislationLegalForce` | schema.org: InForce/NotInForce |
| (new) | `tags` | free-form keywords |
| (new) | `audience` | link to audience.json |

### Text Fields Pattern (from publications.json)

| Field | Length | Purpose |
|-------|--------|---------|
| `description` | ~20-50 words | Short - what it is (1 sentence) |
| `abstract` | ~50-100 words | Medium - key finding/thesis |
| `summary` | ~100-200 words | Detailed - fuller explanation |

### Removed Fields (text moved to markdown body)

- `what_it_does`
- `who_it_applies_to`
- `key_provisions`
- `compliance_actions`
- `enforcement`

---

## Lookup Files

| File | Purpose | Used by field |
|------|---------|---------------|
| `data/laws/law_types.json` | Category definitions (privacy, access, etc.) | `category` |
| `data/laws/relationship_types.json` | Relationship type definitions | `isRelatedTo[].type` |
| `data/laws/laws.json` | Law entries (self-referential) | `isRelatedTo[].identifier` |

---

## Tasks

### Phase 1: Update Data File

- [ ] **1.1** Backup current `data/laws/laws.json`
- [ ] **1.2** Replace `data/laws/laws.json` with `docs/plans/active/laws-data2.json`
- [x] **1.3** Definitions already in separate file: `data/laws/law_types.json`
- [x] **1.4** Populate `tags` for each law (done in laws-data2.json)
- [x] **1.5** Populate `audience` for each law (done in laws-data2.json)
- [x] **1.6** Write proper `description`, `abstract`, `summary` for all 41 laws
- [x] **1.7** Create `data/laws/relationship_types.json` for isRelatedTo lookups

### Phase 2: Update Generator Script

- [ ] **2.1** Update `scripts/generate-laws-pages.js` field mappings
- [ ] **2.2** Update frontmatter generation to use new field names
- [ ] **2.3** Handle `isRelatedTo` → build relationship data for templates
- [ ] **2.4** Test generator (see Testing Procedure below)
- [ ] **2.5** Verify generated markdown files have correct frontmatter

#### Field Mapping in Generator

```javascript
// Old → New
law.id → law.identifier
law.full_name → law.alternateName
law.summary → law.abstract (use description for short)
law.year → law.legislationDate
law.applies_to → law.legislationJurisdiction
law.type → law.category
law.government_access → law.governmentAccess
law.data_protection → law.dataProtection
law.requires_localization → law.requiresLocalization
law.requires_backdoor → law.requiresBackdoor
law.related_laws → law.isRelatedTo
law.review_status → law.reviewStatus
```

### Phase 3: Update Templates

- [ ] **3.1** Update `layouts/laws/single.html` to use new field names
- [ ] **3.2** Update `layouts/laws/list.html` to use new field names
- [ ] **3.3** Update relationship display to use `isRelatedTo` + `relationship_types.json`
- [ ] **3.4** Add tags display (link to topics if matching)
- [ ] **3.5** Add audience display (link to personas)

#### Template Field Updates

```go
// Old → New
.Params.law_id → .Params.identifier
.Params.full_name → .Params.alternateName
.Params.source_url → .Params.url
.Params.law_type → .Params.category
.Params.government_access → .Params.governmentAccess
.Params.data_protection → .Params.dataProtection
.Params.requires_localization → .Params.requiresLocalization
.Params.requires_backdoor → .Params.requiresBackdoor
```

#### Relationship Display Example

```go
{{ $relTypes := site.Data.laws.relationship_types.itemListElement }}
{{ range .Params.isRelatedTo }}
  {{ $rel := where $relTypes "identifier" .type | first }}
  {{ $rel.emoji }} {{ $rel.name }}: {{ .identifier }}
{{ end }}
```

### Phase 4: Update Related Data Lookups

- [ ] **4.1** Verify `isRelatedTo` relationships resolve correctly
- [ ] **4.2** Update any partials that display related laws
- [ ] **4.3** Test bidirectional relationship display
- [ ] **4.4** Verify jurisdiction lookups work with `legislationJurisdiction`

### Phase 5: Create Schema

- [ ] **5.1** Create `data/schemas/laws.schema.json` (does not exist yet)
- [ ] **5.2** Create `data/schemas/law_types.schema.json` for law_types.json validation
- [ ] **5.3** Create `data/schemas/relationship_types.schema.json` for relationship_types.json validation
- [ ] **5.4** Run validation: `npm run validate`

### Phase 6: Documentation

- [ ] **6.1** Create `docs/data/laws.md` documenting new structure (does not exist yet)
- [ ] **6.2** Archive `docs/plans/active/laws-data.md` and `laws-data2.json` after migration

---

## Testing Procedure

To test the generator script after making changes:

```bash
# 1. Backup current content/laws folder
cp -r content/laws content/laws.backup

# 2. Delete content/laws folder
rm -rf content/laws

# 3. Run the generator script
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-laws-pages.js"

# 4. Restart Hugo to rebuild (or it may auto-reload)
# Hugo should be running in devcontainer already

# 5. Verify in Chrome
# Open http://localhost:1313/laws/
# Check list page renders
# Click through to individual law pages
# Verify related laws display correctly
```

**To restore if something goes wrong:**
```bash
rm -rf content/laws
mv content/laws.backup content/laws
```

---

## Verification Checklist

- [x] All 41 laws converted to new structure (in laws-data2.json)
- [ ] Generator script runs without errors
- [ ] All law pages render correctly at `/laws/{identifier}/`
- [ ] Related laws display correctly on each page
- [ ] Law list page filters work (category, jurisdiction)
- [ ] Tags display and link correctly
- [ ] Audience badges display correctly
- [ ] Jurisdiction flags resolve from `jurisdictions.json`

---

## Rollback Plan

If issues arise:
1. Restore `data/laws/laws.json` from backup
2. Revert generator script changes
3. Revert template changes
4. Regenerate law pages

---

## Files Affected

| File | Action |
|------|--------|
| `data/laws/laws.json` | Replace with new structure from laws-data2.json |
| `data/laws/relationship_types.json` | Created (done) |
| `data/laws/law_types.json` | Keep (already exists) |
| `data/schemas/laws.schema.json` | Create (does not exist) |
| `data/schemas/law_types.schema.json` | Create (does not exist) |
| `data/schemas/relationship_types.schema.json` | Create (does not exist) |
| `scripts/generate-laws-pages.js` | Update field mappings |
| `layouts/laws/single.html` | Update field references |
| `layouts/laws/list.html` | Update field references |
| `content/laws/*/index.md` | Regenerate (41 files) |
| `docs/data/laws.md` | Create (does not exist) |

---

## Dependencies

- `data/jurisdictions.json` - for jurisdiction lookups (blocs vs countries)
- `data/audience/audience.json` - for audience field values
- `data/topics/topics.json` - for tags display (optional enrichment)
- `data/laws/law_types.json` - for category display
- `data/laws/relationship_types.json` - for relationship type display
