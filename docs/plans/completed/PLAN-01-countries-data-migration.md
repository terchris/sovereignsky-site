# Plan 01: Countries Data Migration

## Status: Active

**Goal**: Migrate `data/regions.json` to `data/countries/countries.json` with schema.org format.

**Prerequisites**: None

**Blocks**: Plan 03 (Template Data Paths)

**Last Updated**: 2026-01-10

---

## Phase 1: Create Schema

### Tasks

- [ ] 1.1 Create `data/schemas/countries.schema.json` with:
  - Schema.org ItemList wrapper (`@context`, `@type`, `name`, `description`)
  - `itemListElement` array with Country items
  - Required fields: `@type`, `identifier`, `slug`, `name`, `flag`, `riskLevel`
  - Optional fields: `description`, `abstract`, `summary`, `blocs`, `nationalLaws`, `riskLevelOverride`
  - Identifier pattern: `^[A-Z]{2}$` (ISO 3166-1 alpha-2)
  - riskLevel enum: `low`, `moderate`, `elevated`, `high`, `sanctioned`, `unknown`

### Validation

```bash
# Schema file exists and is valid JSON
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"JSON.parse(require('fs').readFileSync('data/schemas/countries.schema.json'))\""
```

---

## Phase 2: Create Countries Data File

### Tasks

- [ ] 2.1 Create `data/countries/` directory
- [ ] 2.2 Create `data/countries/countries.json` with:
  - Schema.org wrapper structure
  - All countries from `data/regions.json` converted to new format
  - Remove redundant `euMember`/`eeaMember` fields (derived from blocs)
  - Keep all other fields

### Data Transformation

From (regions.json):
```json
[
  {
    "identifier": "NO",
    "slug": "norway",
    "name": "Norway",
    "flag": "🇳🇴",
    "euMember": false,
    "eeaMember": true,
    "blocs": ["eea"],
    "riskLevel": "low",
    ...
  }
]
```

To (countries/countries.json):
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SovereignSky Countries",
  "description": "Countries with datacenter infrastructure and data sovereignty characteristics",
  "itemListElement": [
    {
      "@type": "Country",
      "identifier": "NO",
      "slug": "norway",
      "name": "Norway",
      "flag": "🇳🇴",
      "blocs": ["eea"],
      "riskLevel": "low",
      ...
    }
  ]
}
```

### Validation

```bash
# Directory and file exist
ls -la data/countries/countries.json

# File is valid JSON
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"JSON.parse(require('fs').readFileSync('data/countries/countries.json'))\""

# Country count matches regions.json
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"
const regions = JSON.parse(require('fs').readFileSync('data/regions.json'));
const countries = JSON.parse(require('fs').readFileSync('data/countries/countries.json'));
console.log('regions.json count:', regions.length);
console.log('countries.json count:', countries.itemListElement.length);
if (regions.length !== countries.itemListElement.length) throw new Error('Count mismatch!');
console.log('OK: Counts match');
\""
```

---

## Phase 3: Add Validation to Build

### Tasks

- [ ] 3.1 Update `scripts/validate.js` to add countries validation:
  ```javascript
  {
    schema: "data/schemas/countries.schema.json",
    data: "data/countries/countries.json",
  }
  ```

### Validation

```bash
# Run validation - should pass
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

---

## Phase 4: Verify Hugo Can Read New Data

### Tasks

- [ ] 4.1 Create a temporary test partial or check Hugo can access the data
- [ ] 4.2 Verify data path works: `site.Data.countries.countries.itemListElement`

### Validation

```bash
# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Check Hugo recognizes the data (in Hugo debug output or temporary template)
```

---

## Success Criteria

- [ ] `data/countries/countries.json` exists with schema.org format
- [ ] `data/schemas/countries.schema.json` exists
- [ ] All countries from `regions.json` are in `countries.json`
- [ ] `npm run validate` passes
- [ ] Hugo builds successfully
- [ ] Data accessible at `site.Data.countries.countries.itemListElement`

---

## Notes

- Do NOT delete `data/regions.json` yet - templates still depend on it
- Deletion happens after Plan 03 (Template Data Paths) is complete
- The `euMember`/`eeaMember` fields are removed as they're derivable from `blocs` membership
