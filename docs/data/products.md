# Products Data

Software products with sovereignty risk assessments based on the NDSI framework.

**Note:** This is the current dataset (~40 products). Will be replaced with a larger dataset (~5000 products) in future.

## Files

- `products.json` - Full product data with assessments, concerns, mitigations
- `productsList.json` - Slim/denormalized list for client-side filtering (generated)
- `vendors.json` - Vendor/company data
- `useAreas.json` - Software category definitions

### Related

- `../frameworks/ndsi.json` - NDSI assessment framework definition
- `../schemas/products.schema.json` - JSON Schema (TODO: create)

## Data Model

```
┌─────────────────┐         ┌─────────────────┐
│    Products     │────────►│     Vendors     │
│ (products.json) │vendor_id│ (vendors.json)  │
└────────┬────────┘         └─────────────────┘
         │
         │ use_areas[]
         ▼
┌─────────────────┐
│    Use Areas    │
│ (useAreas.json) │
└─────────────────┘

All files in data/products/ folder.
```

## Schema: products.json

```json
{
  "products": [
    {
      "id": "ms-teams",
      "slug": "teams",
      "name": "Microsoft Teams",
      "description": "Collaboration platform with chat, video and file sharing",
      "vendor_id": "microsoft",
      "use_areas": ["communication", "collaboration"],
      "risk_level": "elevated",

      "assessments": {
        "ndsi": {
          "version": "1.0",
          "date": "2025-12-01",
          "score": 2.24,
          "risk_level": "elevated",
          "scores": {
            "strategic": { "score": 3, "rationale": "..." },
            "legal": { "score": 3, "rationale": "..." }
          }
        }
      },

      "key_concerns": ["Subject to US CLOUD Act", "..."],

      "mitigations": [
        {
          "title": "Enable EU Data Boundary",
          "description": "Ensure data is stored within EU/EEA",
          "effort": "low",
          "impact": "medium",
          "url": "https://..."
        }
      ],

      "alternatives": ["pexip", "whereby"],

      "hosting": {
        "self_hosted": false,
        "data_residency": ["NO", "EU_EEA"],
        "jurisdiction_exposure": ["US"]
      },

      "open_source": false,
      "data_portability": "partial",

      "meta": {
        "sources": ["https://..."]
      }
    }
  ]
}
```

### Product Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✓ | Unique identifier |
| `slug` | string | ✓ | URL slug for content pages |
| `name` | string | ✓ | Display name |
| `description` | string | ✓ | Short description |
| `vendor_id` | string | ✓ | Links to vendors.json |
| `use_areas` | array | ✓ | Category IDs from useAreas.json |
| `risk_level` | string | ✓ | `low`, `moderate`, `elevated`, `significant`, `critical` |
| `assessments` | object | | NDSI and other framework assessments |
| `key_concerns` | array | | Main sovereignty concerns |
| `mitigations` | array | | Risk mitigation options |
| `alternatives` | array | | Product IDs of alternatives |
| `hosting` | object | | Hosting and data residency options |
| `open_source` | boolean | | Whether source code is available |
| `data_portability` | string | | `full`, `partial`, `none` |
| `meta` | object | | Sources and additional metadata |

### NDSI Assessment Scores

| Dimension | Description |
|-----------|-------------|
| `strategic` | Ownership, control, market position |
| `legal` | Legal jurisdiction, CLOUD Act exposure |
| `data` | Data residency, encryption, access |
| `operational` | Self-hosting capability, independence |
| `supply_chain` | Dependencies, subcontractors |
| `technology` | Standards, interoperability, lock-in |
| `security` | Certifications, security features |
| `environment` | Environmental impact |
| `national_security` | Critical infrastructure concerns |
| `local_presence` | Local support, partners |

Score values: 0 (best) to 3 (worst concern)

### Risk Levels

| Level | Score Range | Description |
|-------|-------------|-------------|
| `low` | 0.0 - 0.99 | Minimal sovereignty concerns |
| `moderate` | 1.0 - 1.49 | Some concerns, manageable |
| `elevated` | 1.5 - 1.99 | Significant concerns |
| `significant` | 2.0 - 2.49 | Major concerns |
| `critical` | 2.5+ | Severe sovereignty risk |

## Schema: productsList.json (generated)

Denormalized array for client-side filtering. Includes vendor info embedded.

```json
[
  {
    "id": "ms-teams",
    "slug": "teams",
    "name": "Microsoft Teams",
    "description": "...",
    "vendor_id": "microsoft",
    "vendor_name": "Microsoft Corporation",
    "vendor_country": "US",
    "risk_level": "elevated",
    "use_areas": ["communication", "collaboration"],
    "use_area_names": ["Communication", "Collaboration & Documentation"],
    "open_source": false,
    "self_hosted": false,
    "has_us_exposure": true,
    "url": "/software/teams/"
  }
]
```

## Generator Script

`scripts/generate-software-pages.js`

- Reads `data/products/products.json`
- Creates `content/software/{slug}.md` for each product
- Generates `data/products/productsList.json` (denormalized)

```bash
node scripts/generate-software-pages.js
```

## Usage in Templates

```go
{{ $products := site.Data.products.products.products }}
{{ $productsList := site.Data.products.productsList }}
{{ $vendors := site.Data.products.vendors.vendors }}
{{ $useAreas := site.Data.products.useAreas }}

{{ range $products }}
  {{ .name }} - Risk: {{ .risk_level }}
{{ end }}
```

## Related Data

| Data | Relationship |
|------|--------------|
| Vendors | `vendor_id` links to `vendors.json` |
| Use Areas | `use_areas[]` links to `useAreas.json` |
| NDSI Framework | Assessment structure from `data/frameworks/ndsi.json` |

## Content Pages

Generated at `/software/{slug}/`:
- Frontmatter references product ID
- Body content rendered from products.json via templates

## TODO

- [ ] Create `data/schemas/products.schema.json`
- [ ] Migrate to ~5000 product dataset
- [ ] Standardize field names (`id` → `identifier`, etc.)
