# INVESTIGATE: Configurable Stats Cards

## Status: Backlog
## Type: Investigation
## Created: 2026-01-12

## Goal

Investigate how to make stats cards on list pages configurable via JSON data, allowing each content type to define its own stats without hardcoding in templates.

## Background

Currently, stats cards are hardcoded in list templates (e.g., `layouts/sovereignsky/list.html`). Each content type has different stats needs:
- Projects: total count, active count, topics covered
- Publications: total count, types breakdown, years covered
- Laws: total count, jurisdictions, law types

We want to define stats in the `listConfig.display` section of each data JSON file.

## Challenge

How do we specify calculations in JSON that Hugo templates can evaluate at render time?

## Options

### Option 1: Predefined Calculation Types (Simplest)

```json
"stats": [
  { "label": "Projects", "calc": "total", "icon": "code", "desc": "Open source tools" },
  { "label": "Active", "calc": "status:active", "icon": "check-circle", "desc": "In development" },
  { "label": "Topics", "calc": "unique:topics", "icon": "tag", "desc": "Subject areas" }
]
```

Template has hardcoded handlers for patterns like:
- `total` - count all pages
- `status:<value>` - count where status equals value
- `unique:<field>` - count unique values of field

**Pros:**
- Simple to implement
- Easy to understand
- Safe - no arbitrary expressions
- Quick to add new patterns

**Cons:**
- Limited flexibility
- New calculation types require template changes
- Pattern syntax could become inconsistent

---

### Option 2: Structured Count Object (Recommended)

```json
"stats": [
  {
    "label": "Projects",
    "count": { "type": "total" },
    "icon": "code",
    "desc": "Open source tools"
  },
  {
    "label": "Active",
    "count": { "type": "countWhere", "field": "status", "value": "active" },
    "icon": "check-circle",
    "desc": "In development"
  },
  {
    "label": "Topics",
    "count": { "type": "uniqueValues", "field": "topics" },
    "icon": "tag",
    "desc": "Subject areas"
  }
]
```

Supported calculation types:
- `total` - count all items
- `countWhere` - count where field = value
- `uniqueValues` - count distinct values of array field
- `sum` - sum numeric field (future)

**Pros:**
- Flexible enough for common patterns
- Structured for JSON schema validation
- Safe (no arbitrary code execution)
- Clear, self-documenting semantics
- Extensible without syntax changes

**Cons:**
- More verbose than Option 1
- Requires implementing each calculation type in template
- May need content-type-specific handlers

---

### Option 3: Named Calculations (Most Extensible)

Define calculations separately, reference by name in config:

```json
"stats": ["total-projects", "active-count", "topic-count"]
```

Calculations defined in either:
- `data/stats-calculations.json` - centralized definitions
- Template partials - `partials/stats/total-projects.html`

**Pros:**
- Maximum flexibility
- Reusable across content types
- Can implement complex calculations
- Separation of concerns

**Cons:**
- More indirection
- Harder to understand at a glance
- Requires maintaining separate calculation definitions
- Overkill for simple counts

---

### Option 4: Expression Strings (Most Powerful, Risky)

```json
"stats": [
  { "label": "Projects", "count": "len(.Pages)", "icon": "code", "desc": "..." },
  { "label": "Active", "count": "countWhere(.Pages, 'status', 'active')", "icon": "...", "desc": "..." }
]
```

**Pros:**
- Maximum flexibility
- Can express any calculation

**Cons:**
- Security concerns (arbitrary expression evaluation)
- Harder to validate
- Requires building expression parser
- Error-prone
- Not recommended

---

## Recommendation

**Option 2: Structured Count Object** provides the best balance:
1. Flexible enough for all current use cases
2. Safe and validatable with JSON schema
3. Clear semantics
4. Extensible for future needs

## Implementation Considerations

### Schema Definition

```json
"stats": {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["label", "count", "icon"],
    "properties": {
      "label": { "type": "string" },
      "count": {
        "type": "object",
        "required": ["type"],
        "properties": {
          "type": { "enum": ["total", "countWhere", "uniqueValues", "sum"] },
          "field": { "type": "string" },
          "value": { "type": "string" }
        }
      },
      "icon": { "type": "string" },
      "desc": { "type": "string" },
      "color": { "type": "string", "enum": ["primary", "success", "accent", "warning", "error"] }
    }
  }
}
```

### Template Partial

Create `partials/stats-cards.html` that:
1. Receives stats config array
2. Iterates over stats
3. Evaluates each calculation type
4. Renders stat cards

### Migration Path

1. Implement Option 2 for projects
2. Test with different calculation types
3. Extract to reusable partial
4. Apply to other content types (publications, laws, etc.)

## Questions to Resolve

1. Should stats be optional or required in listConfig?
2. How to handle missing/null values in countWhere?
3. Should we support nested field paths (e.g., `project.status`)?
4. Do we need percentage calculations (e.g., "80% active")?

## Related Files

- `layouts/sovereignsky/list.html` - Current hardcoded stats
- `data/sovereignsky/projects.json` - listConfig location
- `data/schemas/sovereignsky-projects.schema.json` - Schema to update
