# Plan: Data Integrity Checks

## Problem Statement

JSON data files across the site have inconsistencies:
- Publications reference 33 unique topics, but only 25 are defined in topics.json
- No automated validation ensures data files match their schemas
- No cross-file integrity checks to catch missing references

## Goals

1. **Schema Validation**: Validate each JSON file against its JSON Schema
2. **Cross-File Integrity**: Ensure references between files are valid
3. **CI Integration**: Run checks automatically on commits/PRs
4. **Developer Experience**: Clear error messages showing exactly what's wrong

## Current State

### Data Files
| File | Schema | Status |
|------|--------|--------|
| data/topics/topics.json | data/schemas/topics.schema.json | Needs creation |
| data/audience/audience.json | data/schemas/audience.schema.json | Needs creation |
| data/publications/publications.json | data/schemas/publications.schema.json | Needs creation |
| data/blog/blog.json | data/schemas/blog.schema.json | Needs creation |
| data/laws/laws.json | data/schemas/laws.schema.json | Needs creation |
| data/events/events.json | data/schemas/events.schema.json | Needs creation |
| data/networks/networks.json | data/schemas/networks.schema.json | Exists |

### Known Integrity Issues
- Publications use topics not in topics.json: 11 missing topics
- Blog posts may reference undefined topics/audiences
- Laws may reference undefined topics/audiences

## Implementation Plan

### Phase 1: Schema Validation Script

Create `scripts/validate-schemas.js`:

```
Purpose: Validate all JSON data files against their schemas
Input: data/*.json files and data/schemas/*.schema.json
Output: Pass/fail with detailed error messages

Features:
- Auto-discover data files and match to schemas
- Use ajv for JSON Schema validation
- Report all errors, not just first one
- Exit code 1 on failure for CI
```

### Phase 2: Cross-File Integrity Script

Create `scripts/validate-integrity.js`:

```
Purpose: Check referential integrity across data files
Checks:
1. Topics Integrity
   - All topics used in publications exist in topics.json
   - All topics used in blog posts exist in topics.json
   - All topics used in laws exist in topics.json
   - All topics used in events exist in topics.json

2. Audience Integrity
   - All audiences used in publications exist in audience.json
   - All audiences used in blog posts exist in audience.json
   - All audiences used in laws exist in audience.json
   - All audiences used in events exist in audience.json

3. Jurisdiction Integrity
   - All jurisdictions used in laws exist in jurisdictions.json
   - All jurisdictions used in datacenters exist in jurisdictions.json

4. Cross-References
   - relatedLaws in blog posts reference existing laws
   - relatedPosts in blog posts reference existing posts
   - isRelatedTo in laws reference existing laws

Output:
- List of missing references grouped by type
- Suggestions (e.g., "Add 'blockchain' to topics.json")
- Exit code 1 on failure
```

### Phase 3: Missing Topics Resolution

After running integrity checks, fix the data:

1. **Option A**: Add missing topics to topics.json
   - Add the 8 missing topics with proper names, descriptions, icons

2. **Option B**: Remove invalid topics from publications
   - Less preferred as it loses categorization

Missing topics to add (11 total):
- civil-preparedness
- crisis-response
- data-breaches
- digital-threats
- geopolitics
- hybrid-warfare
- messaging-apps
- mobile-money
- security-risk-management
- telecommunications
- voluntary-organizations

### Phase 4: NPM Scripts Integration

Add to package.json:
```json
{
  "scripts": {
    "validate": "npm run validate:schemas && npm run validate:integrity",
    "validate:schemas": "node scripts/validate-schemas.js",
    "validate:integrity": "node scripts/validate-integrity.js",
    "validate:fix": "node scripts/fix-integrity.js"
  }
}
```

### Phase 5: CI Integration

Add validation to GitHub Actions workflow:
- Run on push to main/feature branches
- Run on pull requests
- Block merge if validation fails

## File Structure

```
scripts/
├── validate-schemas.js      # JSON Schema validation
├── validate-integrity.js    # Cross-file reference checks
├── fix-integrity.js         # Auto-fix common issues (optional)
└── validate.js              # Existing (to be updated/replaced)

data/schemas/
├── topics.schema.json
├── audience.schema.json
├── publications.schema.json
├── blog.schema.json
├── laws.schema.json
├── events.schema.json
└── networks.schema.json     # Exists
```

## Validation Rules Summary

### Required Fields by Content Type

**Publications**:
- identifier (unique)
- name
- description
- topics (array, each must exist in topics.json)
- audience (array, each must exist in audience.json)

**Blog Posts**:
- identifier (unique)
- name
- datePublished
- topics (array, each must exist in topics.json)
- audiences (array, each must exist in audience.json)

**Laws**:
- identifier (unique)
- name
- legislationDate
- legislationJurisdiction (array, each must exist in jurisdictions.json)
- topics (array, each must exist in topics.json)

**Events**:
- identifier (unique)
- name
- startDate
- topics (array, each must exist in topics.json)
- audience (array, each must exist in audience.json)

## Success Criteria

1. `npm run validate` passes with no errors
2. All content types have JSON Schemas
3. All cross-file references are valid
4. CI blocks PRs with validation errors
5. Clear documentation for adding new content

## Priority

High - Data integrity issues cause runtime bugs and inconsistent filtering.

## Estimated Effort

- Phase 1 (Schema validation): 2-3 hours
- Phase 2 (Integrity checks): 3-4 hours
- Phase 3 (Fix missing topics): 1 hour
- Phase 4 (NPM integration): 30 minutes
- Phase 5 (CI integration): 1 hour

Total: ~8 hours
