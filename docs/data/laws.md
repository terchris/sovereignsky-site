# Laws Data Structure

This document describes the data structure for laws and regulations tracked in SovereignSky.

## Files

| File | Purpose |
|------|---------|
| `data/laws/laws.json` | Main collection of laws |
| `data/laws/law_types.json` | Category definitions |
| `data/laws/relationship_types.json` | Relationship type definitions |

## Schema

All data files follow schema.org conventions:

- `@context`: Always `"https://schema.org"`
- `@type`: `"ItemList"` for collections, `"Legislation"` for individual laws
- `itemListElement`: Array of items

### Law Entry Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `@type` | string | Yes | Always `"Legislation"` |
| `identifier` | string | Yes | URL-safe slug (e.g., `gdpr`, `cloud-act`) |
| `name` | string | Yes | Short display name |
| `alternateName` | string | No | Full official name |
| `description` | string | Yes | Short description (20-50 words) |
| `abstract` | string | No | Medium description (50-100 words) |
| `summary` | string | No | Detailed description (100-200 words) |
| `legislationDate` | string | Yes | Year enacted (e.g., `"2018"`) |
| `legislationJurisdiction` | array | Yes | Jurisdiction IDs (references jurisdictions.json) |
| `legislationLegalForce` | string | No | `InForce`, `NotInForce`, or `PartiallyInForce` |
| `url` | string | No | Link to official text |
| `category` | string | Yes | Law type (references law_types.json) |
| `governmentAccess` | string | Yes | `broad`, `targeted`, `limited`, or `none` |
| `dataProtection` | string | Yes | `strong`, `moderate`, `weak`, or `none` |
| `extraterritorial` | boolean | Yes | Claims jurisdiction beyond borders |
| `requiresLocalization` | boolean | Yes | Requires local data storage |
| `requiresBackdoor` | boolean | Yes | Can compel decryption/backdoor access |
| `isRelatedTo` | array | No | Relationships to other laws |
| `topics` | array | No | Topic IDs (references topics.json) |
| `tags` | array | No | Free-form keywords |
| `audience` | array | No | Target audience IDs (references audience.json) |
| `reviewStatus` | string | No | `ai-generated` or `verified` |

### Text Field Hierarchy

Following the publications.json pattern:

| Field | Length | Purpose |
|-------|--------|---------|
| `description` | 20-50 words | What the law is (one sentence) |
| `abstract` | 50-100 words | Key finding or thesis |
| `summary` | 100-200 words | Detailed explanation |

### Categories (law_types.json)

| Identifier | Description |
|------------|-------------|
| `privacy` | Protects individual data rights |
| `access` | Enables government data access |
| `surveillance` | Establishes surveillance powers |
| `localization` | Requires data storage in jurisdiction |
| `security` | National security frameworks |
| `sector` | Sector-specific regulations |

### Relationship Types (relationship_types.json)

| Type | Inverse | Description |
|------|---------|-------------|
| `implements` | `implemented_by` | National law implementing directive |
| `interprets` | `interpreted_by` | Court ruling interpreting law |
| `conflicts_with` | (symmetric) | Legal tension or contradiction |
| `complements` | (symmetric) | Works alongside in related area |
| `succeeds` | `succeeded_by` | Replaces previous framework |
| `extends` | `extended_by` | Expands scope |
| `amends` | `amended_by` | Modifies existing law |

## Generator Script

`scripts/generate-laws-pages.js` creates content pages from the data:

```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-laws-pages.js"
```

The script:
1. Reads `data/laws/laws.json`
2. Builds bidirectional relationships (if law A relates to B, B also relates to A)
3. Creates `content/laws/{identifier}/index.md` for each law
4. Preserves custom body content if the file already exists
5. Always updates frontmatter from the JSON data

## Validation

```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

Schemas are in `data/schemas/`:
- `laws.schema.json` - Full collection schema
- `law.schema.json` - Individual law entry schema
- `law_types.schema.json` - Category definitions schema
- `relationship_types.schema.json` - Relationship types schema

## Adding a New Law

1. Add entry to `data/laws/laws.json` with all required fields
2. Run the generator script
3. Optionally add custom content to the generated markdown file
4. Run validation to ensure data integrity

## Dependencies

- `data/jurisdictions.json` - For jurisdiction lookups (flags, names)
- `data/audience/audience.json` - For audience field values
- `data/topics/topics.json` - For tag enrichment (optional)
