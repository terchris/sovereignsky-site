# Networks Data

Network infrastructure including submarine cables, terrestrial connections, and satellite links.

## TODO: Field Name Migration

Fields need renaming to match site-wide standards:

| File | Current | Target | Schema.org |
|------|---------|--------|------------|
| networks.json | `connection_id` | `identifier` | ✓ `identifier` |
| networks.json | `connection_name` | `name` | ✓ `name` |
| networks-actors.json | `actor_id` | `identifier` | ✓ `identifier` |
| networks-actors.json | `actor_name` | `name` | ✓ `name` |
| networks-places.json | ✓ `identifier` | — | Already correct |
| networks-places.json | ✓ `name` | — | Already correct |

Update required in:
- [ ] `data/networks/networks.json`
- [ ] `data/networks/networks-actors.json`
- [ ] `data/schemas/networks.schema.json`
- [ ] `data/schemas/networks-actors.schema.json`
- [ ] `scripts/generate-network-pages.js`
- [ ] Templates referencing these fields

## Files

- `networks.json` - Network connections (cables, links)
- `networks-actors.json` - Organizations (operators, owners)
- `networks-places.json` - Locations (landing stations, cities)
- `networks-trawler.json` - Raw/scraped source data
- `../schemas/networks.schema.json` - JSON Schema for networks
- `../schemas/networks-actors.schema.json` - JSON Schema for actors
- `../schemas/networks-places.schema.json` - JSON Schema for places

## Data Model

```
┌─────────────────┐     operator_actor_ids     ┌─────────────────┐
│    Networks     │◄──────────────────────────►│     Actors      │
│  (connections)  │     owner_actor_ids        │ (organizations) │
└─────────────────┘                            └─────────────────┘
        │                                              │
        │ endpoint_place_ids                           │ country_id
        ▼                                              ▼
┌─────────────────┐                            ┌─────────────────┐
│     Places      │                            │    Countries    │
│(landing stations)│                            │                 │
└─────────────────┘                            └─────────────────┘
```

## Schema: networks.json

```json
{
  "connection_id": "havfrue",
  "connection_name": "Havfrue/AEC-2",
  "type": "submarine",
  "scope": "international",
  "medium": "subsea",
  "status": "active",
  "rfs": "2020-11",
  "length_km": 7650,
  "description": "Transatlantic system with a Norway branch...",
  "operator_actor_ids": ["bulk-infrastructure"],
  "owner_actor_ids": ["aqua-comms", "bulk-infrastructure", "meta", "google"],
  "endpoint_place_ids": ["kristiansand", "blaabjerg", "killala-bay", "wall-township"],
  "tags": ["submarine-cables", "critical-infrastructure"],
  "sources": [{ "title": "...", "url": "..." }]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `connection_id` | string | Unique identifier (slug) |
| `connection_name` | string | Display name |
| `type` | string | `submarine`, `terrestrial`, `satellite` |
| `scope` | string | `international`, `national`, `regional` |
| `medium` | string | `subsea`, `fiber`, `satellite`, `microwave` |
| `status` | string | `active`, `planned`, `under_construction`, `decommissioned` |
| `rfs` | string | Ready for service date |
| `length_km` | number | Cable length in kilometers |
| `description` | string | Short description |
| `operator_actor_ids` | array | Links to actors (operators) |
| `owner_actor_ids` | array | Links to actors (owners) |
| `endpoint_place_ids` | array | Links to places (landing stations) |
| `tags` | array | Free-form keywords |
| `sources` | array | Source references |

## Schema: networks-actors.json

```json
{
  "@type": "Organization",
  "actor_id": "bulk-infrastructure",
  "actor_name": "Bulk Infrastructure",
  "actor_type": "infrastructure_operator",
  "country_id": "NO",
  "website": "https://bulkinfrastructure.com"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `actor_id` | string | Unique identifier |
| `actor_name` | string | Organization name |
| `actor_type` | string | `infrastructure_operator`, `telecom_operator`, `state_owned_enterprise`, etc. |
| `country_id` | string | ISO country code |
| `website` | string | Organization website |

## Schema: networks-places.json

```json
{
  "@type": "Place",
  "identifier": "kristiansand",
  "name": "Kristiansand",
  "description": "Major southern Norway landing area...",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 58.1467,
    "longitude": 7.9956
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kristiansand",
    "addressRegion": "Agder",
    "addressCountry": "NO"
  },
  "place_type": "landing_station"
}
```

| Field | Type | Description | Schema.org |
|-------|------|-------------|------------|
| `identifier` | string | Unique identifier | ✓ `identifier` |
| `name` | string | Place name | ✓ `name` |
| `description` | string | Short description | ✓ `description` |
| `geo` | object | Coordinates | ✓ `geo` |
| `geo.latitude` | number | Latitude | ✓ `latitude` |
| `geo.longitude` | number | Longitude | ✓ `longitude` |
| `address` | object | Address details | ✓ `address` |
| `place_type` | string | `landing_station`, `exchange`, `datacenter` | — |

## Generator Script

`scripts/generate-network-pages.js`

- Reads `data/networks/networks.json`
- Creates `content/networks/{connection_id}/index.md` for each network
- Preserves custom body content

Run:
```bash
node scripts/generate-network-pages.js
```

## Usage in Templates

```go
{{ $networks := site.Data.networks.networks }}
{{ $actors := site.Data.networks.networks_actors }}
{{ $places := site.Data.networks.networks_places }}

{{ range $networks }}
  {{ .connection_name }}
  {{ range .operator_actor_ids }}
    {{ $actor := index $actors . }}
    {{ $actor.actor_name }}
  {{ end }}
{{ end }}
```

## Related Data

| Data | Relationship |
|------|--------------|
| Actors | `operator_actor_ids`, `owner_actor_ids` link to actor records |
| Places | `endpoint_place_ids` link to place records |
| Countries | `country_id` in actors/places links to ISO country codes |

## Content Pages

Generated at `/networks/{connection_id}/`:
- Frontmatter from JSON
- Body content can be manually edited
