# Plan: Restructure Networks Content

## Overview

Standardize networks content to:
1. Use consistent field names matching other content types
2. Add standard content fields (abstract, summary, url, body, image)
3. Use consistent camelCase naming convention
4. Move content from markdown files into the data layer

## Standard Content Fields

All content types should have these standard fields:

| Field | Type | Description |
|-------|------|-------------|
| `identifier` | string | URL slug, unique ID |
| `name` | string | Display title |
| `description` | string | Short description for SEO/lists (1-2 sentences) |
| `abstract` | string | Longer summary for cards/previews (2-3 sentences) |
| `summary` | string | Full detailed summary (paragraph) |
| `url` | string | Primary external source URL |
| `body` | string | Main markdown content |
| `image` | string | Image filename |
| `topics` | array | Topic slugs from topics.json |
| `tags` | array | Free-form keywords |
| `audience` | array | Persona types for filtering |

## Naming Convention

Use **camelCase** for all multi-word field names (matching publications/laws):

| snake_case (current) | camelCase (target) |
|---------------------|-------------------|
| `connection_id` | → `identifier` |
| `connection_name` | → `name` |
| `owner_actor_ids` | → `ownerActorIds` |
| `operator_actor_ids` | → `operatorActorIds` |
| `endpoint_place_ids` | → `endpointPlaceIds` |
| `length_km` | → `lengthKm` |
| `country_id` | → `countryId` |
| `actor_id` | → `identifier` |
| `actor_name` | → `name` |
| `actor_type` | → `type` |
| `place_type` | → `type` |

## Current State

### `networks.json` Current Fields

```json
{
  "connection_id": "havfrue",
  "connection_name": "Havfrue/AEC-2",
  "description": "Transatlantic system...",
  "type": "submarine",
  "scope": "international",
  "medium": "subsea",
  "status": "active",
  "rfs": "2020-11",
  "length_km": 7650,
  "owner_actor_ids": ["aqua-comms", "bulk-infrastructure"],
  "operator_actor_ids": ["bulk-infrastructure"],
  "endpoint_place_ids": ["kristiansand", "blaabjerg"],
  "tags": ["submarine-cables"],
  "sources": [{"title": "...", "url": "..."}]
}
```

### `networks-actors.json` Current Fields

```json
{
  "actor_id": "aqua-comms",
  "actor_name": "Aqua Comms",
  "actor_type": "operator",
  "country_id": "IE"
}
```

### `networks-places.json` Current Fields

```json
{
  "identifier": "kristiansand",
  "name": "Kristiansand",
  "place_type": "landing_station",
  "address": {...},
  "geo": {...}
}
```

## Target State

### `networks.json` Target Fields

```json
{
  "identifier": "havfrue",
  "name": "Havfrue/AEC-2",
  "description": "Transatlantic system with a Norway branch landing near Kristiansand.",
  "abstract": "Major transatlantic submarine cable connecting Norway to North America via Denmark and Ireland, owned by consortium including Meta, Google, Aqua Comms and Bulk Infrastructure.",
  "summary": "Havfrue/AEC-2 is a 7,650 km submarine cable system that entered service in November 2020. The Norway branch lands near Kristiansand, connecting to the main transatlantic route via Blaabjerg (Denmark) and Killala Bay (Ireland) to Wall Township, New Jersey. The system is operated by Bulk Infrastructure and provides critical international connectivity for Norwegian data traffic.",
  "url": "https://www.submarinecablemap.com/submarine-cable/havfrueaec-2",
  "body": "",
  "image": "havfrue.png",
  "type": "submarine",
  "scope": "international",
  "medium": "subsea",
  "status": "active",
  "operationalDate": "2020-11",
  "lengthKm": 7650,
  "ownerActorIds": ["aqua-comms", "bulk-infrastructure", "meta", "google"],
  "operatorActorIds": ["bulk-infrastructure"],
  "endpointPlaceIds": ["kristiansand", "blaabjerg", "killala-bay", "wall-township"],
  "topics": ["critical-infrastructure"],
  "tags": ["submarine-cables", "transatlantic"],
  "audience": ["it-ops", "security", "public-sector"],
  "sources": [
    {"title": "SubmarineCableMap", "url": "https://..."},
    {"title": "Bulk Infrastructure", "url": "https://..."}
  ]
}
```

### `networks-actors.json` Target Fields

```json
{
  "identifier": "aqua-comms",
  "name": "Aqua Comms",
  "description": "Subsea cable operator headquartered in Ireland.",
  "type": "operator",
  "countryId": "IE",
  "url": "https://www.aquacomms.com"
}
```

### `networks-places.json` Target Fields

```json
{
  "identifier": "kristiansand",
  "name": "Kristiansand",
  "description": "Cable landing station near Kristiansand, Norway.",
  "type": "landing_station",
  "address": {...},
  "geo": {...}
}
```

## Field Mapping Summary

### networks.json

| Current | Target | Notes |
|---------|--------|-------|
| `connection_id` | `identifier` | Standard ID field |
| `connection_name` | `name` | Standard name field |
| `description` | `description` | Keep |
| - | `abstract` | **NEW** - Add longer summary |
| - | `summary` | **NEW** - Add full description |
| - | `url` | **NEW** - Primary external URL (from sources[0]) |
| - | `body` | **NEW** - Markdown content |
| - | `image` | **NEW** - Image filename |
| `type` | `type` | Keep |
| `scope` | `scope` | Keep |
| `medium` | `medium` | Keep |
| `status` | `status` | Keep |
| `rfs` | `operationalDate` | Rename + camelCase |
| `length_km` | `lengthKm` | camelCase |
| `owner_actor_ids` | `ownerActorIds` | camelCase |
| `operator_actor_ids` | `operatorActorIds` | camelCase |
| `endpoint_place_ids` | `endpointPlaceIds` | camelCase |
| `tags` | `tags` | Keep |
| - | `topics` | **NEW** - Add topic slugs |
| - | `audience` | **NEW** - Add audience types |
| `sources` | `sources` | Keep |
| `route` | `route` | Keep (geo coordinates) |

### networks-actors.json

| Current | Target | Notes |
|---------|--------|-------|
| `actor_id` | `identifier` | Standard ID field |
| `actor_name` | `name` | Standard name field |
| - | `description` | **NEW** |
| `actor_type` | `type` | Simplify name |
| `country_id` | `countryId` | camelCase |
| - | `url` | **NEW** - Company website |

### networks-places.json

| Current | Target | Notes |
|---------|--------|-------|
| `identifier` | `identifier` | Already standard |
| `name` | `name` | Already standard |
| - | `description` | **NEW** |
| `place_type` | `type` | Simplify name |
| `address` | `address` | Keep |
| `geo` | `geo` | Keep |

## Files to Update

| File | Changes |
|------|---------|
| `data/networks/networks.json` | Rename fields, add new fields |
| `data/networks/networks-actors.json` | Rename fields, add new fields |
| `data/networks/networks-places.json` | Rename `place_type` → `type`, add description |
| `data/schemas/networks.schema.json` | Update schema |
| `scripts/generate-network-pages.js` | Use new field names |
| `layouts/networks/single.html` | Use new field names |
| `layouts/networks/list.html` | Use new field names (if exists) |
| `layouts/partials/sidebar/networks-details-card.html` | Use new field names |
| `layouts/shortcodes/network-map.html` | Use new field names in JS |
| `layouts/shortcodes/network-actors.html` | Use new field names |
| `layouts/shortcodes/network-connection-map.html` | Use new field names |
| `content/networks/*/index.md` | Simplify to front matter only |

## Migration Steps

### Step 1: Backup
```bash
cp -r data/networks data/networks.backup
cp -r content/networks content/networks.backup
```

### Step 2: Update JSON Data Files
1. `data/networks/networks.json`:
   - Rename fields to camelCase
   - Add `abstract`, `summary`, `url`, `body`, `image`, `topics`, `audience`
2. `data/networks/networks-actors.json`:
   - Rename fields to camelCase
   - Add `description`, `url`
3. `data/networks/networks-places.json`:
   - Rename `place_type` → `type`
   - Add `description`

### Step 3: Update Schema
1. `data/schemas/networks.schema.json` - reflect new structure

### Step 4: Update Scripts
1. `scripts/generate-network-pages.js` - use new field names

### Step 5: Update Templates
1. `layouts/networks/single.html`
2. `layouts/partials/sidebar/networks-details-card.html`
3. `layouts/shortcodes/network-map.html`
4. `layouts/shortcodes/network-actors.html`
5. `layouts/shortcodes/network-connection-map.html`

### Step 6: Simplify Content Files
1. Run generate script to update front matter
2. Remove duplicated body content (now in JSON)

### Step 7: Validate
```bash
npm run validate
```

## Verification Checklist

- [ ] `networks.json`: All fields use camelCase
- [ ] `networks.json`: Has `identifier`, `name`, `description`, `abstract`, `summary`, `url`, `image`
- [ ] `networks.json`: Has `topics` and `audience` arrays
- [ ] `networks-actors.json`: All fields use camelCase
- [ ] `networks-actors.json`: Has `identifier`, `name`, `description`
- [ ] `networks-places.json`: `place_type` renamed to `type`
- [ ] Generate script updated
- [ ] All templates/shortcodes updated
- [ ] Network map renders correctly
- [ ] Network detail pages render correctly
- [ ] Filtering works on networks list page
- [ ] No broken links or missing content
- [ ] Schema validation passes

## Rollback Plan

```bash
rm -rf data/networks
mv data/networks.backup data/networks
rm -rf content/networks
mv content/networks.backup content/networks
git checkout -- layouts/networks/ layouts/partials/sidebar/networks-* layouts/shortcodes/network-*
```

## Dependencies

- Depends on: `PLAN-standardize-field-names.md` (completed)
- Related: Should update `topics.json` to include network-related topics

## Notes

- The `route` field contains geographic coordinates and should remain unchanged
- The `sources` array structure remains unchanged
- Images should be added to `content/networks/*/` directories
- Consider creating a script to migrate existing data automatically
