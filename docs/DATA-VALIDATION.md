# Data Validation

This document describes how JSON data files are validated against schemas in the SovereignSky site.

## Overview

Data files in `data/networks/` are validated against JSON Schema definitions in `data/schemas/`. This ensures data integrity and catches errors before they cause issues in the Hugo site.

## Technology Stack

- **JSON Schema**: Draft-07 specification
- **AJV (Another JSON Validator)**: Fast JSON schema validator for Node.js
- **ajv-formats**: Plugin for format validation (uri, email, date-time, etc.)

## Directory Structure

```
sovereignsky-site/
├── data/
│   ├── networks/                    # Data files
│   │   ├── networks.json
│   │   ├── networks-actors.json
│   │   ├── networks-places.json
│   │   └── networks-trawler.json
│   └── schemas/                     # Schema definitions
│       ├── networks.schema.json
│       ├── networks-actors.schema.json
│       └── networks-places.schema.json
└── scripts/
    └── validate.js                  # Validation script
```

## Schema-to-Data Mappings

| Data File | Schema | Description |
|-----------|--------|-------------|
| `networks.json` | `networks.schema.json` | Network connections (cables, routes) |
| `networks-actors.json` | `networks-actors.schema.json` | Organizations (owners, operators) |
| `networks-places.json` | `networks-places.schema.json` | Locations (landing stations, hubs) |

## Running Validation

**Important:** All commands must be run inside the devcontainer.

```bash
# Run validation
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

### Expected Output

```
Validating data files against schemas...

✓ data/networks/networks.json
✓ data/networks/networks-actors.json
✓ data/networks/networks-places.json

──────────────────────────────────────────────────
Results: 3 passed, 0 failed
```

### Validation Failure Example

```
Validating data files against schemas...

✓ data/networks/networks.json
✗ data/networks/networks-actors.json
    /5/actor_id: must be string
    /12: must have required property 'actor_name'

──────────────────────────────────────────────────
Results: 2 passed, 1 failed
```

## Schema Structure

All data files are **arrays at root level** (no wrapper objects).

### networks.schema.json

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "$ref": "#/$defs/connection"
  },
  "$defs": {
    "connection": {
      "type": "object",
      "required": ["connection_id", "connection_name", "scope", "medium"],
      "properties": {
        "connection_id": { "type": "string" },
        "connection_name": { "type": "string" },
        "scope": { "enum": ["international", "domestic"] },
        "medium": { "enum": ["subsea", "terrestrial", "satellite"] },
        "status": { "enum": ["active", "planned"] },
        ...
      }
    }
  }
}
```

### networks-actors.schema.json

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "$ref": "#/$defs/actor"
  },
  "$defs": {
    "actor": {
      "type": "object",
      "required": ["actor_id", "actor_name"],
      "properties": {
        "actor_id": { "type": "string" },
        "actor_name": { "type": "string" },
        "actor_type": { "enum": ["infrastructure_operator", "telecom_operator", ...] },
        "country_id": { "type": "string" },
        ...
      }
    }
  }
}
```

### networks-places.schema.json

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "$ref": "#/$defs/place"
  },
  "$defs": {
    "place": {
      "type": "object",
      "required": ["identifier", "name"],
      "properties": {
        "identifier": { "type": "string" },
        "name": { "type": "string" },
        "place_type": { "enum": ["landing_station", "backbone_endpoint", ...] },
        "geo": {
          "type": "object",
          "properties": {
            "latitude": { "type": "number" },
            "longitude": { "type": "number" }
          }
        },
        ...
      }
    }
  }
}
```

## Adding New Validations

To add validation for a new data file:

1. Create a schema in `data/schemas/`:
   ```json
   {
     "$schema": "http://json-schema.org/draft-07/schema#",
     "$id": "my-data.schema.json",
     "title": "My Data",
     "type": "array",
     "items": { ... }
   }
   ```

2. Add the mapping to `scripts/validate.js`:
   ```javascript
   const validations = [
     // ... existing mappings
     {
       schema: "data/schemas/my-data.schema.json",
       data: "data/my-data.json",
     },
   ];
   ```

3. Run validation to test.

## npm Scripts

```json
{
  "scripts": {
    "validate": "node scripts/validate.js",
    "generate:networks": "node scripts/generate-network-pages.js",
    "generate:laws": "node scripts/generate-laws-pages.js"
  }
}
```

## Best Practices

1. **Run validation before commits** - Catch errors early
2. **Use descriptive error messages** - Helps debug issues
3. **Keep schemas in sync with data** - Update schemas when data structure changes
4. **Use enums for controlled vocabularies** - Prevents typos in status, type fields
5. **Mark required fields** - Ensures essential data is always present

## References

- [JSON Schema Draft-07](https://json-schema.org/draft-07/json-schema-release-notes.html)
- [AJV Documentation](https://ajv.js.org/)
- [ajv-formats](https://github.com/ajv-validator/ajv-formats)
