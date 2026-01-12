# Plan: Data Integrity Checks

## Status: Complete ✅

**Last Updated**: 2026-01-12

**Progress**: Phase 1 ✅ | Phase 2 ✅ | Phase 3 ✅ | Phase 4 ✅ | Phase 5 ✅

---

## Problem Statement

JSON data files across the site have inconsistencies:
- Publications reference topics not defined in topics.json
- No automated validation ensures data files match their schemas
- No cross-file integrity checks to catch missing references

## Goals

1. **Schema Validation**: Validate each JSON file against its JSON Schema
2. **Cross-File Integrity**: Ensure references between files are valid
3. **CI Integration**: Run checks automatically on commits/PRs
4. **Developer Experience**: Clear error messages showing exactly what's wrong

## Current State

### Validation Script
- ✅ `scripts/validate.js` - Schema validation with ajv
- ✅ `scripts/lib/reference-validator.js` - Cross-file reference validation
- ✅ `npm run validate` script configured
- ✅ Uses `x-validates-against` schema annotations (machine-readable, single source of truth)

### Cross-File Validation
Schemas use `x-validates-against` to declare which reference file validates a field:

```json
"topics": {
  "type": "array",
  "items": { "type": "string" },
  "description": "Topic identifiers for categorization",
  "x-validates-against": "data/topics/topics.json"
}
```

**Configured validations:**
| Schema | Field | Validates Against |
|--------|-------|-------------------|
| sovereignsky-projects | topics | data/topics/topics.json |
| sovereignsky-projects | audience | data/audience/audience.json |
| blog | topics | data/topics/topics.json |
| blog | audience | data/audience/audience.json |
| laws | topics | data/topics/topics.json |
| laws | audience | data/audience/audience.json |
| events | topics | data/topics/topics.json |
| events | audience | data/audience/audience.json |
| audience | topics | data/topics/topics.json |
| audience | lawTypes | data/laws/law_types.json |

### Data Files & Schemas
| File | Schema | Status |
|------|--------|--------|
| data/topics/topics.json | data/schemas/topics.schema.json | ✅ Passes |
| data/audience/audience.json | data/schemas/audience.schema.json | ✅ Passes |
| data/blog/blog.json | data/schemas/blog.schema.json | ✅ Passes |
| data/laws/laws.json | data/schemas/laws.schema.json | ✅ Passes |
| data/laws/law_types.json | data/schemas/law_types.schema.json | ✅ Passes |
| data/laws/relationship_types.json | data/schemas/relationship_types.schema.json | ✅ Passes |
| data/events/events.json | data/schemas/events.schema.json | ✅ Passes |
| data/countries/countries.json | data/schemas/countries.schema.json | ✅ Passes |
| data/networks/networks.json | data/schemas/networks.schema.json | ✅ Passes |
| data/networks/networks-actors.json | data/schemas/networks-actors.schema.json | ✅ Passes |
| data/networks/networks-places.json | data/schemas/networks-places.schema.json | ✅ Passes |
| data/sovereignsky/projects.json | data/schemas/sovereignsky-projects.schema.json | ✅ Passes |

### Topics Status
- 25 valid topics defined in topics.json
- 22 topics used across all files
- ✅ All used topics are valid (no missing topics)

## Implementation Plan

### Phase 1: Schema Validation Script — ✅ DONE

Implemented as `scripts/validate.js`:
- Uses ajv for JSON Schema validation
- Reports all errors, not just first one
- Exit code 1 on failure for CI

### Phase 2: Cross-File Integrity — ✅ DONE

Implemented in `scripts/lib/reference-validator.js`:
- Reads `x-validates-against` annotations from schemas
- Validates topics, audience, lawTypes references
- Single source of truth (schema defines validation rules)

### Phase 3: Missing Topics Resolution — ✅ DONE

All topics used across files now exist in topics.json.

### Phase 4: NPM Scripts Integration — ✅ DONE

In package.json:
```json
{
  "scripts": {
    "validate": "node scripts/validate.js"
  }
}
```

### Phase 5: CI Integration — ✅ DONE

Added validation to `.github/workflows/deploy.yml` before Hugo build:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.153.0
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Validate data files
        run: npm run validate

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: ${{ env.HUGO_VERSION }}
          extended: true

      # ... rest of build
```

**Key points:**
- Validation runs BEFORE Hugo build
- If validation fails, build stops (no inconsistent website deployed)
- Uses `npm ci` for faster, reproducible installs

## Adding New Validations

To add cross-file validation for a new field:

1. Add extractor to `scripts/lib/reference-validator.js` (if new reference file):
```javascript
const REFERENCE_EXTRACTORS = {
  'data/new-file.json': (data) => (data.itemListElement || []).map(item => item.identifier),
};
```

2. Add `x-validates-against` to schema:
```json
"myField": {
  "type": "array",
  "items": { "type": "string" },
  "x-validates-against": "data/new-file.json"
}
```

3. Run `npm run validate` to test

## Success Criteria

1. ✅ `npm run validate` passes with no errors
2. ✅ All content types have JSON Schemas
3. ✅ All cross-file references are valid
4. ✅ CI blocks deploys with validation errors
5. ✅ Clear documentation for adding new validations

## Priority

High - Data integrity issues cause runtime bugs and inconsistent filtering.

## Completed

All phases complete. The CI workflow will now:
1. Run `npm run validate` before Hugo build
2. Fail the build if validation errors are found
3. Prevent inconsistent websites from being deployed
