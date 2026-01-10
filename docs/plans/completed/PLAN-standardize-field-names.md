# Plan: Standardize Field Names Across Content Types

## Overview

Standardize JSON field names across all content types for consistency and CMS integration.

## Current State

| Field | Publications | Laws | Events |
|-------|--------------|------|--------|
| ID | `id` | `identifier` | `id` |
| Topics | `about` | `topics` | `tags` |
| Tags | `tags` | `tags` | - |

## Target State

| Field | All Content Types |
|-------|-------------------|
| ID | `identifier` |
| Topics | `topics` (slugs from topics.json) |
| Tags | `tags` (free-form keywords) |

## Standard Field Definitions

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `identifier` | string | URL slug, unique ID | Yes |
| `name` | string | Display title | Yes |
| `description` | string | Short description for SEO/lists | Yes |
| `topics` | array | Topic slugs from topics.json | No |
| `tags` | array | Free-form keywords | No |
| `audience` | array | Persona types for filtering | No |

## Changes Required

### 1. Publications (`data/publications/publications.json`)

```diff
- "id": "icrc-data-protection-handbook",
+ "identifier": "icrc-data-protection-handbook",

- "about": ["data-protection", "cloud-sovereignty"],
+ "topics": ["data-protection", "cloud-sovereignty"],
```

**Files to update:**
- `data/publications/publications.json` - rename fields
- `scripts/generate-publications-pages.js` - use new field names
- `layouts/partials/sidebar/publications-*.html` - if referencing fields directly

### 2. Events (`data/events/events.json`)

```diff
- "id": "samfunnssikkerhetskonferansen-2026",
+ "identifier": "samfunnssikkerhetskonferansen-2026",

- "tags": ["cybersecurity", "critical-infrastructure"],
+ "topics": ["cybersecurity", "critical-infrastructure"],
+ "tags": [],
```

**Files to update:**
- `data/events/events.json` - rename fields
- `scripts/generate-events-pages.js` - use new field names
- `layouts/events/list.html` - update filter logic
- `layouts/partials/event-list.html` - update data attributes

### 3. Laws (already correct)

Laws already uses `identifier` and `topics`. No changes needed.

## Migration Steps

### Phase 1: Publications
1. Update `data/publications/publications.json`:
   - Rename `id` → `identifier`
   - Rename `about` → `topics`
2. Update `scripts/generate-publications-pages.js`:
   - Change `pub.id` → `pub.identifier`
   - Change `pub.about` → `pub.topics`
3. Regenerate publication pages
4. Test publications section

### Phase 2: Events
1. Update `data/events/events.json`:
   - Rename `id` → `identifier`
   - Rename `tags` → `topics` (these are topic slugs)
   - Add empty `tags` array (for future free-form keywords)
2. Update `scripts/generate-events-pages.js`:
   - Change `event.id` → `event.identifier`
   - Change `event.tags` → `event.topics`
3. Update `layouts/events/list.html`:
   - Update filter group from `tags` to `topics`
4. Update `layouts/partials/event-list.html`:
   - Change `data-tags` → `data-topics`
5. Regenerate event pages
6. Test events section and filtering

### Phase 3: Validation
1. Run validation script to ensure all JSON files use correct field names
2. Add schema validation for standard fields
3. Update CLAUDE.md documentation

## Verification Checklist

- [x] Publications: `identifier` field used
- [x] Publications: `topics` field used (not `about`)
- [x] Events: `identifier` field used
- [x] Events: `topics` field used for topic slugs
- [x] All generate scripts updated
- [x] All templates/partials updated
- [x] Filtering works on all list pages
- [x] No broken links or missing content

## Completion Notes (2026-01-08)

All field standardization completed:
- `data/publications/publications.json`: Changed all `id` → `identifier`, `about` → `topics`
- `data/events/events.json`: Changed all `id` → `identifier`, `tags` → `topics`
- `scripts/generate-publications-pages.js`: Updated to use `pub.identifier` and `pub.topics`
- `scripts/generate-events-pages.js`: Updated to use `event.identifier` and `event.topics`
- `layouts/partials/event-list.html`: Updated to use `.identifier`, `.topics`, `data-topics`
- `layouts/events/list.html`: Updated JavaScript filter logic for `topics`

## Rollback Plan

If issues arise:
1. Git revert the JSON changes
2. Git revert the script changes
3. Regenerate pages from original JSON

## Dependencies

- Must complete before implementing blog JSON (PLAN-blog-json.md)
- Topics.json must contain all topic slugs used by events
