# Audience Data

Target audiences for content filtering and persona pages.

## Files

- `audience.json` - List of audience types
- `../schemas/audience.schema.json` - JSON Schema (TODO: create)

## Schema

```json
{
  "identifier": "humanitarian",
  "name": "Humanitarian",
  "description": "NGOs, aid organizations, and humanitarian operations.",
  "abstract": "When crisis strikes, you're the ones who show up...",
  "icon": "heart-handshake"
}
```

| Field | Type | Description | Schema.org |
|-------|------|-------------|------------|
| `identifier` | string | URL slug, unique ID | ✓ `identifier` |
| `name` | string | Display name | ✓ `name` |
| `description` | string | Short description (~150 chars) | ✓ `description` |
| `abstract` | string | Longer inspiring text (1-2 paragraphs) | ✓ `abstract` |
| `icon` | string | Icon identifier for UI | — |

## Usage

### In Content Frontmatter

```yaml
audience:
  - "humanitarian"
  - "public-sector"
```

### In Templates

```go
{{ range .Params.audience }}
  {{ $aud := index site.Data.audience.audience.itemListElement . }}
{{ end }}
```

### Hugo Taxonomy

Defined in `hugo.toml`:
```toml
[taxonomies]
  audience = "audience"
```

Auto-generates:
- `/audience/` - List of all audiences
- `/audience/humanitarian/` - All content for humanitarian audience

## Related Data

| Data | Relationship |
|------|--------------|
| Blog | `audience` field in frontmatter |
| Events | `audience` field in frontmatter |
| Publications | `audience` field in frontmatter |
| Laws | `audience` field in frontmatter |
| Personas | `/personas/{identifier}/` pages use this data for filtering |

## Persona Pages vs Taxonomy Pages

| Page | URL | Purpose |
|------|-----|---------|
| Persona (curated) | `/personas/humanitarian/` | Editorial page with 3 latest per category |
| Taxonomy (complete) | `/audience/humanitarian/` | Auto-generated, ALL matching content |
