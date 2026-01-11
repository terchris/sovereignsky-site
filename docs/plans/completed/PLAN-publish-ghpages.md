# Plan: Publish to GitHub Pages with Custom Domain

## Status: Active

**Goal**: Deploy the SovereignSky Hugo site to GitHub Pages with the custom domain `sovereignsky.no`

**Prerequisites**:
- Repository on GitHub (terchris/sovereignsky-site)
- Domain `sovereignsky.no` registered and DNS access available

**Last Updated**: 2026-01-11

---

## Overview

This plan covers:
1. Hugo configuration for production
2. GitHub Actions workflow for automated deployment
3. GitHub Pages configuration
4. DNS configuration for custom domain
5. HTTPS setup (automatic via GitHub)

---

## Phase 1: Hugo Configuration

### Tasks

- [ ] 1.1 Update `config/_default/config.toml` with production baseURL:
  ```toml
  baseURL = "https://sovereignsky.no/"
  ```

- [ ] 1.2 Create production config override `config/production/config.toml`:
  ```toml
  baseURL = "https://sovereignsky.no/"
  ```

- [ ] 1.3 Verify Hugo builds with production config:
  ```bash
  docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --environment production"
  ```

### Validation

```bash
# Check that public/ folder is created with correct URLs
grep -r "sovereignsky.no" public/ | head -5
```

---

## Phase 2: GitHub Actions Workflow

### Tasks

- [ ] 2.1 Create `.github/workflows/deploy.yml`:
  ```yaml
  name: Deploy Hugo to GitHub Pages

  on:
    push:
      branches:
        - main
    workflow_dispatch:

  permissions:
    contents: read
    pages: write
    id-token: write

  concurrency:
    group: "pages"
    cancel-in-progress: false

  defaults:
    run:
      shell: bash

  jobs:
    build:
      runs-on: ubuntu-latest
      env:
        HUGO_VERSION: 0.153.0
      steps:
        - name: Checkout
          uses: actions/checkout@v4
          with:
            submodules: recursive
            fetch-depth: 0

        - name: Setup Hugo
          uses: peaceiris/actions-hugo@v3
          with:
            hugo-version: ${{ env.HUGO_VERSION }}
            extended: true

        - name: Setup Pages
          id: pages
          uses: actions/configure-pages@v4

        - name: Build with Hugo
          env:
            HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
            HUGO_ENVIRONMENT: production
          run: |
            hugo \
              --gc \
              --minify \
              --baseURL "${{ steps.pages.outputs.base_url }}/"

        - name: Upload artifact
          uses: actions/upload-pages-artifact@v3
          with:
            path: ./public

    deploy:
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      runs-on: ubuntu-latest
      needs: build
      steps:
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v4
  ```

- [ ] 2.2 Ensure `.gitignore` excludes `public/` folder (should already be there)

### Validation

```bash
# Check workflow file is valid YAML
cat .github/workflows/deploy.yml | head -20
```

---

## Phase 3: GitHub Repository Configuration

### Tasks

- [ ] 3.1 Go to repository Settings → Pages
- [ ] 3.2 Set Source to "GitHub Actions"
- [ ] 3.3 Add custom domain `sovereignsky.no`
- [ ] 3.4 Enable "Enforce HTTPS" (after DNS propagates)

### Validation

- Repository Settings → Pages shows deployment source as "GitHub Actions"
- Custom domain field shows `sovereignsky.no`

---

## Phase 4: DNS Configuration

### Tasks

Configure DNS records for `sovereignsky.no`:

- [ ] 4.1 Add A records pointing to GitHub Pages IPs:
  ```
  A     @     185.199.108.153
  A     @     185.199.109.153
  A     @     185.199.110.153
  A     @     185.199.111.153
  ```

- [ ] 4.2 Add AAAA records for IPv6 (optional but recommended):
  ```
  AAAA  @     2606:50c0:8000::153
  AAAA  @     2606:50c0:8001::153
  AAAA  @     2606:50c0:8002::153
  AAAA  @     2606:50c0:8003::153
  ```

- [ ] 4.3 Add CNAME for www subdomain:
  ```
  CNAME www   terchris.github.io
  ```

- [ ] 4.4 Wait for DNS propagation (can take up to 24-48 hours)

### Validation

```bash
# Check DNS records
dig sovereignsky.no +short
dig www.sovereignsky.no +short

# Should return GitHub Pages IPs
```

---

## Phase 5: CNAME File

### Tasks

- [ ] 5.1 Create `static/CNAME` file with domain:
  ```
  sovereignsky.no
  ```

This ensures the CNAME file is included in every build.

### Validation

```bash
# After build, check CNAME exists
cat public/CNAME
```

---

## Phase 6: Merge and Deploy

### Tasks

- [ ] 6.1 Merge `feature/content-restructure` branch to `main` (or current working branch)
- [ ] 6.2 Push to GitHub
- [ ] 6.3 Monitor GitHub Actions workflow
- [ ] 6.4 Verify deployment at https://sovereignsky.no

### Validation

```bash
# Check GitHub Actions status
gh run list --limit 5

# Test site is live
curl -I https://sovereignsky.no
```

---

## Success Criteria

- [ ] GitHub Actions workflow runs successfully on push to main
- [ ] Site is accessible at https://sovereignsky.no
- [ ] Site is accessible at https://www.sovereignsky.no (redirects to apex)
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)
- [ ] All pages render correctly
- [ ] No mixed content warnings

---

## Troubleshooting

### DNS not propagating
- Use `dig` or online tools to check DNS status
- Clear local DNS cache: `sudo dscacheutil -flushcache` (macOS)

### 404 errors after deploy
- Check that `baseURL` matches the custom domain
- Verify CNAME file exists in `public/` folder
- Check GitHub Pages settings show correct domain

### HTTPS certificate errors
- Wait for GitHub to provision certificate (can take up to 24 hours after DNS propagates)
- Ensure DNS records point to GitHub Pages IPs

### Build failures
- Check Hugo version matches local development
- Ensure submodules (themes) are checked out
- Review GitHub Actions logs for specific errors

---

## Notes

- GitHub Pages is free for public repositories
- Custom domain HTTPS certificates are automatically provisioned by GitHub
- The `--baseURL` in the workflow uses the Pages URL, but CNAME overrides this
- Consider adding a `robots.txt` and `sitemap.xml` for SEO (Hugo generates sitemap by default)
