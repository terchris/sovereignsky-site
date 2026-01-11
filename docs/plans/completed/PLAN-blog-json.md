# Plan: Blog JSON Data System

## Overview

Convert blog posts from pure markdown files to a JSON-driven system consistent with laws, publications, and events. Metadata and structured content will be stored in JSON, with markdown body content preserved in generated files.

## Current State

- **11 blog posts** in `content/blog/{date-slug}/index.md`
- Pure markdown with frontmatter
- Custom `layouts/blog/single.html` template (Blowfish-based)
- Free-form tags not mapped to topics.json
- No audience/persona mapping
- No schema.org structured data

## Target State

- `data/blog/blog.json` - Structured blog metadata (schema.org BlogPosting)
- `scripts/generate-blog-pages.js` - Generate content pages from JSON
- `layouts/blog/single.html` - Uses `common-single-page.html` base template
- Sidebar partials for blog-specific cards
- Tags mapped to valid topics from `topics.json`
- Audience field for persona filtering

## Architecture

```
CMS (future: Sanity/Strapi/etc)
    ↓ exports
data/blog/blog.json (complete source of truth, including body)
    ↓ generate script
content/blog/{id}/index.md (Hugo pages - generated, not edited)
```

**Key principle:** JSON is the single source of truth. The generate script creates everything from JSON. No content is preserved from existing markdown files.

## Data Structure

### data/blog/blog.json

```json
[
  {
    "identifier": "2025-12-25-arpanet-broken-promise",
    "name": "From ARPANET to Amazon: How We Broke the Internet's Original Promise",
    "description": "The internet was built to survive nuclear war. We've since made it vulnerable to fishing trawlers and policy changes in Washington.",
    "abstract": "The internet was built to survive nuclear war. We've since made it vulnerable to fishing trawlers and policy changes in Washington. The same architecture designed for resilience has been recentralized - and Russia is already testing our cables.",
    "datePublished": "2025-12-25",
    "author": ["SovereignSky"],
    "image": "featured.jpg",
    "topics": ["digital-sovereignty", "critical-infrastructure", "cybersecurity"],
    "tags": ["arpanet", "russia", "hybrid-warfare", "submarine-cables"],
    "audience": ["it-ops", "public-sector", "enterprise"],
    "category": "Analysis",
    "showHero": true,
    "relatedLaws": ["cloud-act", "schrems-ii", "eu-us-dpf", "nis2"],
    "relatedPosts": ["2025-12-15-hybrid-war-already-here"],
    "body": "In 1969, ARPANET introduced packet switching – a radical idea where data could route around damage. No single point of failure. The US military wanted communications that could survive a Soviet first strike.\n\nThe architecture was resilient by design. Distributed. Decentralized. Sovereign.\n\n## What we built instead\n\nFifty years later, European critical infrastructure runs on three American hyperscalers..."
  }
]
```

**Note on body field:**
- Contains full markdown content
- Newlines encoded as `\n`
- Special characters (quotes, backslashes) must be JSON-escaped
- For manual editing, use a JSON editor with multiline support
- When CMS is integrated, CMS handles escaping automatically

### Field Mappings (JSON → Hugo Frontmatter)

| JSON Field | Hugo Frontmatter | Description |
|------------|------------------|-------------|
| identifier | (directory name) | URL slug |
| name | title | Post title |
| description | description | SEO description |
| abstract | abstract | Short abstract |
| summary | summary | Longer summary |
| datePublished | date | Publication date |
| author | authors | Array of author names |
| image | (featured.jpg) | Hero image filename |
| topics | topics | Array of topic slugs (from topics.json) |
| tags | tags | Array of free-form keywords |
| audience | audience | Array of persona types |
| category | categories | Post category |
| showHero | showHero | Display hero image |
| relatedLaws | relatedLaws | Array of law identifiers |
| relatedPosts | relatedPosts | Array of blog post identifiers |
| body | (markdown content) | Full article body |

### Standard Field Names (all content types)

| Field | Purpose | Used By |
|-------|---------|---------|
| `identifier` | URL slug / unique ID | laws, publications*, events*, blog |
| `name` | Display title | all |
| `description` | Short description | all |
| `topics` | Topic slugs from topics.json | laws, publications*, events*, blog |
| `tags` | Free-form keywords | all |
| `audience` | Persona types | all |

*Requires migration (see PLAN-standardize-field-names.md)

## Files to Create

### 1. data/blog/blog.json
Extract metadata from existing 11 blog posts into JSON array.

### 2. scripts/generate-blog-pages.js
```
- Read data/blog/blog.json
- For each post:
  - Create content/blog/{id}/index.md
  - Generate frontmatter from JSON metadata fields
  - Write body field as markdown content (no preservation)
  - Copy/download featured image if specified
- Generate content/blog/_index.md for list page
```

### 3. layouts/partials/sidebar/blog-meta-card.html
Display: Date, Author, Reading time, Category

### 4. layouts/partials/sidebar/blog-related-laws-card.html
Display: Related laws from relatedLaws field

### 5. layouts/blog/single.html (refactor)
Use `common-single-page.html` with blog-specific sidebar cards:
```go
{{ partial "common-single-page.html" (dict
    "page" .
    "icon" "pencil"
    "section" "Blog"
    "sectionUrl" "/blog/"
    "headerDescription" .Description
    "sidebarCards" (slice
        "sidebar/blog-meta-card.html"
        "sidebar/blog-related-laws-card.html"
        "sidebar/common-audience-card.html"
        "sidebar/common-topics-card.html"
        "sidebar/common-tags-card.html"
        "sidebar/common-related-card.html"
    )
    "showHero" true
) }}
```

## Migration Steps

### Phase 1: Create JSON Data
1. Create `data/blog/blog.json` with metadata from all 11 posts
2. **Extract existing markdown body content** into JSON `body` field
3. Map existing tags to valid topics from `topics.json`
4. Add audience fields for persona filtering
5. Add relatedLaws for explicit law connections

**Migration helper script (optional):**
```bash
# scripts/migrate-blog-to-json.js
# Reads existing content/blog/*/index.md files
# Extracts frontmatter → JSON fields
# Extracts body → JSON body field (escaped)
# Outputs data/blog/blog.json
```

### Phase 2: Create Generation Script
1. Create `scripts/generate-blog-pages.js`
2. Handle frontmatter generation
3. Preserve existing markdown body content
4. Handle image copying
5. Generate `_index.md` for list page

### Phase 3: Create Sidebar Partials
1. Create `sidebar/blog-meta-card.html`
2. Create `sidebar/blog-related-laws-card.html`
3. Test partials independently

### Phase 4: Refactor Templates
1. Update `layouts/blog/single.html` to use `common-single-page.html`
2. Preserve hero image functionality
3. Preserve author display
4. Update `layouts/blog/list.html` if needed

### Phase 5: Testing & Documentation
1. Regenerate all blog pages
2. Verify all pages render correctly
3. Test sidebar cards display
4. Update CLAUDE.md with blog generation instructions

## Existing Blog Posts to Migrate

| ID | Title | Current Tags |
|----|-------|--------------|
| 2025-12-25-arpanet-broken-promise | From ARPANET to Amazon | arpanet, sovereignty, infrastructure, russia, hybrid-warfare, submarine-cables, cloud-dependency |
| 2025-12-16-ndsi-launch | NDSI Launch | (check) |
| 2025-12-15-hybrid-war-already-here | Hybrid War Already Here | (check) |
| 2025-12-13-war-fear-digital-dependency | War Fear Digital Dependency | (check) |
| 2025-12-12-take-control-digital-sovereignty | Take Control Digital Sovereignty | (check) |
| 2025-12-11-digital-sovereignty-moral-independence | Digital Sovereignty Moral Independence | (check) |
| 2025-12-10-developer-power-sovereignty | Developer Power Sovereignty | (check) |
| 2025-12-08-hyperscaler-to-local-sovereignty | Hyperscaler to Local Sovereignty | (check) |
| 2025-12-06-vendor-lock-in-hidden-cost | Vendor Lock-in Hidden Cost | (check) |
| 2025-12-03-eu-cloud-sovereignty-framework | EU Cloud Sovereignty Framework | (check) |
| 2025-12-01-norway-exit-strategy | Norway Exit Strategy | (check) |

## Tag to Topic Mapping

Map free-form blog tags to valid topics.json identifiers:

| Current Tag | Valid Topic |
|-------------|-------------|
| sovereignty | digital-sovereignty |
| arpanet | (remove or keep as tag) |
| infrastructure | critical-infrastructure |
| russia | (keep as tag) |
| hybrid-warfare | (keep as tag) |
| submarine-cables | (keep as tag) |
| cloud-dependency | platform-dependency |

## Considerations

### Hero Images
- Blog posts use hero images from Blowfish theme
- `common-single-page.html` already supports featured images
- May need to preserve `showHero` and `heroStyle` params

### Author Display
- Blowfish has author partial integration
- May need to add author handling to common template or keep as blog-specific

### Body Content from JSON
- Generate script reads `body` field from JSON
- No preservation of existing content - JSON is source of truth
- Different from publications pattern (which preserves existing body)
- When migrating: extract existing markdown body into JSON `body` field

### Reading Time
- Hugo calculates reading time automatically
- Display in blog-meta-card partial

## Success Criteria

- [ ] All 11 blog posts render correctly from JSON
- [ ] Topics filter works on blog list page
- [ ] Audience filter works on blog list page
- [ ] Related laws display in sidebar
- [ ] Hero images display correctly
- [ ] Author information displays correctly
- [ ] Body content preserved after regeneration
- [ ] CLAUDE.md updated with blog generation docs
