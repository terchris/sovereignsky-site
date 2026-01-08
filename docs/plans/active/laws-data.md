# Laws Data Structure

## Schema.org Mapping

Base type: `schema:Legislation` (extends CreativeWork → Thing)

### Direct Schema.org Mappings

| Current Field | Schema.org Property | Type | Notes |
|---------------|---------------------|------|-------|
| `id` | `identifier` | Text | Unique ID (e.g., "gdpr") |
| `name` | `name` | Text | Short name (e.g., "GDPR") |
| `full_name` | `alternateName` | Text | Full official name |
| `year` | `legislationDate` | Date | Year enacted (use YYYY format) |
| `url` | `url` | URL | Official source URL |
| `applies_to` | `legislationJurisdiction` | AdministrativeArea[] | Jurisdiction IDs |
| `summary` | `description` | Text | Short description |
| - | `abstract` | Text | Extended summary (from CreativeWork) |
| - | `inLanguage` | Text | Language code (e.g., "en") |
| - | `datePublished` | Date | Publication date |
| - | `dateModified` | Date | Last update date |

### Legislation Relationship Properties

| Current Field | Schema.org Property | Description |
|---------------|---------------------|-------------|
| `related_laws.complements` | `isRelatedTo` | General relation (custom subtype) |
| `related_laws.conflicts_with` | - | Custom (no schema.org equivalent) |
| `related_laws.extended_by` | `legislationApplies` | Legislation transferred to different context |
| `related_laws.implemented_by` | `legislationEnsuresImplementationOf` (inverse) | National implementation of directive |
| `related_laws.amended_by` | `legislationAmends` (inverse) | Amendments |
| `related_laws.repealed_by` | `legislationRepeals` (inverse) | Repealed legislation |
| `related_laws.interpreted_by` | - | Custom (court decisions) |

### Schema.org LegalForceStatus

| Value | Description |
|-------|-------------|
| `InForce` | Currently in force |
| `NotInForce` | Not in force (repealed, expired) |
| `PartiallyInForce` | Partially in force |

### Schema.org LegislationType (suggested values)

| Value | Description |
|-------|-------------|
| `Regulation` | Directly applicable EU regulation |
| `Directive` | Requires national implementation |
| `Act` | National legislative act |
| `Law` | General law |
| `Decree` | Executive decree |
| `Order` | Executive order |
| `Decision` | Court or authority decision |

---

## Custom Fields (No Schema.org Equivalent)

These fields are domain-specific for data sovereignty analysis:

### Classification

| Field | Type | Values | Description |
|-------|------|--------|-------------|
| `sovereigntyType` | string | privacy, access, surveillance, localization, security, sector | Primary impact on data sovereignty |
| `governmentAccess` | string | broad, targeted, limited, none | Level of government data access |
| `dataProtection` | string | strong, moderate, weak, none | Individual protection level |
| `extraterritorial` | boolean | true/false | Claims jurisdiction beyond borders |
| `requiresLocalization` | boolean | true/false | Requires data stored locally |
| `requiresBackdoor` | boolean | true/false | Can compel decryption/access |

### Practical Guidance

| Field | Type | Description |
|-------|------|-------------|
| `whatItDoes` | string[] | Bullet points explaining the law |
| `whoItAppliesTo` | string[] | Affected entities |
| `keyProvisions` | object[] | {title, description} for main provisions |
| `complianceActions` | string[] | Steps organizations should take |
| `enforcement` | object | {authority, penalties, notes} |

### Metadata

| Field | Type | Values | Description |
|-------|------|--------|-------------|
| `reviewStatus` | string | ai-generated, human-reviewed, verified | Content quality status |
| `audience` | string[] | humanitarian, enterprise, public-sector, etc. | Who should care about this law |

---

## Proposed JSON Structure

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "sovereignsky": "https://sovereignsky.org/vocab/"
  },
  "@type": "Legislation",

  "identifier": "gdpr",
  "name": "GDPR",
  "alternateName": "General Data Protection Regulation",
  "description": "Comprehensive data protection law giving individuals control over their personal data.",
  "abstract": "Extended description...",

  "legislationDate": "2018",
  "legislationLegalForce": "InForce",
  "legislationType": "Regulation",
  "legislationJurisdiction": ["eu"],
  "url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
  "inLanguage": "en",

  "sovereignsky:sovereigntyType": "privacy",
  "sovereignsky:governmentAccess": "limited",
  "sovereignsky:dataProtection": "strong",
  "sovereignsky:extraterritorial": true,
  "sovereignsky:requiresLocalization": false,
  "sovereignsky:requiresBackdoor": false,

  "sovereignsky:whatItDoes": [
    "Comprehensive data protection law giving individuals control over their personal data.",
    "Requires lawful basis for processing, data minimization, and grants rights."
  ],
  "sovereignsky:whoItAppliesTo": [
    "Data controllers",
    "Data processors",
    "Organizations processing EU personal data"
  ],
  "sovereignsky:keyProvisions": [
    {
      "title": "Lawful basis",
      "description": "Processing requires explicit legal basis"
    }
  ],
  "sovereignsky:complianceActions": [
    "Assess whether you are in scope",
    "Map data processing activities"
  ],
  "sovereignsky:enforcement": {
    "authority": "Independent Data Protection Authorities",
    "penalties": "Up to 4% global turnover or €20M",
    "notes": "Enforcement varies by member state"
  },

  "isRelatedTo": [
    {"@type": "Legislation", "identifier": "eprivacy", "sovereignsky:relationshipType": "complements"},
    {"@type": "Legislation", "identifier": "cloud-act", "sovereignsky:relationshipType": "conflicts_with"}
  ],

  "sovereignsky:audience": ["humanitarian", "enterprise", "public-sector"],
  "sovereignsky:reviewStatus": "ai-generated"
}
```

---

## Field Comparison: Current vs Proposed

| Current | Proposed | Change |
|---------|----------|--------|
| `id` | `identifier` | Renamed to schema.org |
| `name` | `name` | Same |
| `full_name` | `alternateName` | Renamed to schema.org |
| `year` | `legislationDate` | Renamed, use ISO date |
| `url` | `url` | Same |
| `scope` | (removed) | Redundant with jurisdiction |
| `applies_to` | `legislationJurisdiction` | Renamed to schema.org |
| `type` | `sovereigntyType` | Renamed, avoid conflict with @type |
| `government_access` | `governmentAccess` | camelCase |
| `data_protection` | `dataProtection` | camelCase |
| `extraterritorial` | `extraterritorial` | Same |
| `requires_localization` | `requiresLocalization` | camelCase |
| `requires_backdoor` | `requiresBackdoor` | camelCase |
| `summary` | `description` | Renamed to schema.org |
| `what_it_does` | `whatItDoes` | camelCase |
| `who_it_applies_to` | `whoItAppliesTo` | camelCase |
| `key_provisions` | `keyProvisions` | camelCase |
| `compliance_actions` | `complianceActions` | camelCase |
| `enforcement` | `enforcement` | Same, add penalties |
| `related_laws` | `isRelatedTo` | Use schema.org with custom relationshipType |
| `review_status` | `reviewStatus` | camelCase |
| (new) | `legislationLegalForce` | Add: InForce/NotInForce/PartiallyInForce |
| (new) | `legislationType` | Add: Regulation/Directive/Act/etc. |
| (new) | `audience` | Add: who should care |
| (new) | `abstract` | Add: extended description |

---

## Relationship Types

### Schema.org Native
| Property | Use For |
|----------|---------|
| `legislationAmends` | Law A amends Law B |
| `legislationRepeals` | Law A repeals Law B |
| `legislationApplies` | Law A applies Law B in new context |
| `legislationTransposes` | National law implements EU directive |
| `legislationConsolidates` | Consolidated version includes |
| `isRelatedTo` | General relationship |

### Custom (sovereignsky:relationshipType)
| Value | Description |
|-------|-------------|
| `complements` | Works alongside, covers related area |
| `conflicts_with` | Creates legal tension or contradiction |
| `interpreted_by` | Court decision interpreting the law |
| `supersedes` | Replaces previous framework |
| `requires` | Depends on another law |

---

## Questions

1. **Use JSON-LD @context?**
   - Full JSON-LD with namespaced custom fields?
   - Or simpler flat JSON with schema.org-inspired names?

2. **Keep definitions in file or separate?**
   - Current: definitions block in laws.json
   - Alternative: separate vocabulary file

3. **Audience field values?**
   - Reuse from audience.json identifiers?
   - Or law-specific audience categories?

4. **Extended content (prose)?**
   - Keep in markdown body only?
   - Add `text` or `articleBody` field?

---

## Related Files

- `data/laws/laws.json` - Main data file
- `data/laws/schemas/law.schema.json` - JSON schema (needs update)
- `scripts/generate-laws-pages.js` - Page generator
- `layouts/laws/single.html` - Law page template
- `content/laws/*/index.md` - Generated pages (41 total)
