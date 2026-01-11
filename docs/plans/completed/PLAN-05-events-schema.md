# Plan 05: Events Schema.org Wrapper

## Status: Backlog (Low Priority)

**Goal**: Add schema.org wrapper to `data/events/events.json` for consistency with other data files.

**Prerequisites**: None (independent of other plans)

**Blocks**: None

**Priority**: Low - current format works, this is for consistency only

**Last Updated**: 2026-01-10

---

## Overview

The events data file currently uses a plain array format. For consistency with other data files (countries, blocs, laws, etc.), we should add a schema.org ItemList wrapper.

This is a low-priority task as the current format works and templates can be updated later.

---

## Phase 1: Create Events Schema

### Tasks

- [ ] 1.1 Create `data/schemas/events.schema.json`:
  ```json
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Events",
    "type": "object",
    "required": ["@context", "@type", "name", "itemListElement"],
    "properties": {
      "@context": { "const": "https://schema.org" },
      "@type": { "const": "ItemList" },
      "name": { "type": "string" },
      "description": { "type": "string" },
      "itemListElement": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["@type", "identifier", "name", "startDate"],
          "properties": {
            "@type": { "const": "Event" },
            "identifier": { "type": "string" },
            "name": { "type": "string" },
            "description": { "type": "string" },
            "startDate": { "type": "string", "format": "date" },
            "endDate": { "type": "string", "format": "date" },
            "location": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "address": { "type": "string" },
                "city": { "type": "string" },
                "country": { "type": "string" }
              }
            },
            "url": { "type": "string", "format": "uri" },
            "eventType": { "type": "string" },
            "topics": { "type": "array", "items": { "type": "string" } },
            "audience": { "type": "array", "items": { "type": "string" } }
          }
        }
      }
    }
  }
  ```

### Validation

```bash
# Schema is valid JSON
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"JSON.parse(require('fs').readFileSync('data/schemas/events.schema.json'))\""
```

---

## Phase 2: Migrate Events Data

### Tasks

- [ ] 2.1 Read current `data/events/events.json` structure
- [ ] 2.2 Create new file with schema.org wrapper:

From (current):
```json
[
  {
    "identifier": "hackcon-21",
    "name": "HackCon 21",
    ...
  }
]
```

To (new):
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SovereignSky Events",
  "description": "Conferences and events relevant to data sovereignty",
  "itemListElement": [
    {
      "@type": "Event",
      "identifier": "hackcon-21",
      "name": "HackCon 21",
      ...
    }
  ]
}
```

### Validation

```bash
# File is valid JSON
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"JSON.parse(require('fs').readFileSync('data/events/events.json'))\""

# Event count preserved
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"
const events = JSON.parse(require('fs').readFileSync('data/events/events.json'));
console.log('Event count:', events.itemListElement.length);
\""
```

---

## Phase 3: Update Templates

### Tasks

- [ ] 3.1 Find all templates using events data:
  ```bash
  grep -r "site.Data.events" layouts/ --include="*.html" -l
  ```

- [ ] 3.2 Update data paths:
  ```hugo
  # Old
  {{ range site.Data.events.events }}

  # New
  {{ range site.Data.events.events.itemListElement }}
  ```

### Validation

```bash
# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Events pages render correctly
# Manual check: http://localhost:1313/events/
```

---

## Phase 4: Add Validation

### Tasks

- [ ] 4.1 Update `scripts/validate.js` to include events:
  ```javascript
  {
    schema: "data/schemas/events.schema.json",
    data: "data/events/events.json",
  }
  ```

### Validation

```bash
# Validation passes
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

---

## Success Criteria

- [ ] `data/events/events.json` has schema.org wrapper
- [ ] `data/schemas/events.schema.json` exists
- [ ] All templates updated to use `.itemListElement`
- [ ] Events pages render correctly
- [ ] `npm run validate` passes
- [ ] Hugo builds without errors

---

## Notes

- This is a LOW PRIORITY task - only for consistency
- Current events functionality works fine without this change
- Can be done when convenient or alongside other data work
- Events already have `location.country` field, so multi-country ready
