# SovereignSky Website

Public website for SovereignSky - secure developer access to internal services.

**Live site:** [totalforsvarsaret.no](https://totalforsvarsaret.no)

## Development

### Prerequisites

Open this folder in VS Code/Cursor and reopen in the devcontainer. Hugo is pre-installed.

### Local Preview

```bash
hugo server -D --bind 0.0.0.0
```

Open http://localhost:1313

### Writing Content

- **Documentation:** `content/docs/`
- **Blog posts:** `content/blog/`
- **Home page:** `content/_index.md`

### Blog Post Frontmatter

Blog posts use page bundles (folder with `index.md` + `featured.png`):

```yaml
---
title: "Your Post Title"
date: 2025-01-15
description: "For SEO and social sharing (Google, LinkedIn, Twitter)"
summary: "Displayed on the blog listing page"
tags: ["tag1", "tag2"]
categories: ["Category"]
---
```

- `description` - Used for `<meta>` tags (SEO) and social media previews
- `summary` - Displayed on the `/blog/` listing page (Congo theme requires this)
- `featured.png` - Place in the same folder as `index.md` for the post image

### Publishing

Push to `main` branch. GitHub Actions automatically builds and deploys.

## Structure

```
sovereignsky-site/
├── .devcontainer/    # Hugo dev environment
├── content/          # Markdown content
│   ├── docs/        # Documentation pages
│   └── blog/        # Blog posts
├── static/          # Static files (images, CNAME)
├── themes/congo/    # Hugo theme (submodule)
└── hugo.toml        # Site configuration
```

## Related

- [SovereignSky](https://github.com/your-org/sovereignsky) - Main project repository (private)
