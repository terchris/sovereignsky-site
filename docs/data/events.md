# Events Data

Conferences, meetups, and events related to digital sovereignty, cybersecurity, and preparedness.

## Files

- `events.json` - Array of event objects
- `../schemas/events.schema.json` - JSON Schema (TODO: create)

## Schema

```json
{
  "identifier": "hackcon-21",
  "name": "HackCon #21",
  "nameOriginal": "HackCon #21",
  "description": "Norway's premier IT security conference...",
  "eventStatus": "scheduled",
  "eventAttendanceMode": "offline",
  "startDate": "2026-02-11",
  "endDate": "2026-02-12",
  "location": {
    "name": "Høyres Hus",
    "city": "Oslo",
    "country": "NO"
  },
  "organizer": {
    "name": "HackCon",
    "url": "https://www.hackcon.org"
  },
  "externalUrl": "https://www.hackcon.org/",
  "tags": ["cybersecurity"],
  "audience": ["it-ops", "developer", "enterprise"],
  "topics": ["cybersecurity"]
}
```

### Fields

| Field | Type | Required | Description | Schema.org |
|-------|------|----------|-------------|------------|
| `identifier` | string | ✓ | URL slug, unique ID | ✓ `identifier` |
| `name` | string | ✓ | Display name (English) | ✓ `name` |
| `nameOriginal` | string | | Original language name | — |
| `description` | string | ✓ | Short description (~150 chars) | ✓ `description` |
| `eventStatus` | string | ✓ | `scheduled`, `cancelled`, `completed` | ✓ `eventStatus` |
| `eventAttendanceMode` | string | ✓ | `offline`, `online`, `mixed` | ✓ `eventAttendanceMode` |
| `startDate` | string | ✓ | ISO date `YYYY-MM-DD` | ✓ `startDate` |
| `endDate` | string | | ISO date (null if single day) | ✓ `endDate` |
| `location` | object | | Venue details | ✓ `location` |
| `location.name` | string | | Venue name | |
| `location.city` | string | | City | |
| `location.country` | string | | Country code (ISO 3166-1) | |
| `organizer` | object | | Organizer details | ✓ `organizer` |
| `organizer.name` | string | | Organizer name | |
| `organizer.url` | string | | Organizer website | |
| `externalUrl` | string | | Link to event page | ✓ `url` |
| `tags` | array | | Free-form keywords | `keywords` |
| `audience` | array | | Target audiences | ✓ `audience` |
| `topics` | array | | High-level themes | `about` |

## Generator Script

`scripts/generate-events-pages.js`

- Reads `data/events/events.json`
- Creates `content/events/{identifier}/index.md` for each event
- Updates frontmatter from JSON
- Preserves custom body content if edited

Run:
```bash
node scripts/generate-events-pages.js
```

## Usage

### In Templates

```go
{{ $events := site.Data.events.events }}
{{ range $events }}
  {{ .name }} - {{ .startDate }}
{{ end }}
```

### Hugo Taxonomies

Events use these taxonomies:
- `tags` - Free-form keywords
- `audience` - From `data/audience/audience.json`
- `topics` - From `data/topics/topics.json`

## Related Data

| Data | Relationship |
|------|--------------|
| Audience | `audience` field links to audience identifiers |
| Topics | `topics` field links to topic identifiers |
| Countries | `location.country` is ISO country code |

## Content Pages

Generated at `/events/{identifier}/`:
- Frontmatter from JSON
- Body content can be manually edited (preserved on regeneration)
