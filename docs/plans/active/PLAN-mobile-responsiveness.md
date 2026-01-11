# Mobile Responsiveness Fixes

## Status: In Progress

**Goal**: Fix mobile display issues on the homepage and throughout the site.

**Last Updated**: 2026-01-11

---

## Problem Summary

The homepage was redesigned with DaisyUI, but uses inline styles with fixed pixel widths that break on mobile devices:

1. **Fixed-width cards** don't fit small screens
2. **Low contrast colors** in gradient sections
3. **Touch targets too small** for mobile interaction
4. **Content overflow** from tables and cards

## Root Cause

In `layouts/partials/home/custom.html`, inline styles use fixed widths:

```html
style="width: 280px;"  <!-- Database cards -->
style="width: 240px;"  <!-- Persona cards -->  
style="width: 140px;"  <!-- Join us cards -->
```

These bypass DaisyUI's responsive system.

---

## Fixes Required

### Priority 1: Card Widths

**File**: `layouts/partials/home/custom.html`

Replace fixed widths with responsive classes:

| Current | Replace With |
|---------|--------------|
| `style="width: 280px;"` | `class="w-full sm:w-[280px]"` |
| `style="width: 240px;"` | `class="w-full sm:w-[240px]"` |
| `style="width: 140px;"` | `class="w-full xs:w-[140px]"` |

Or better, use a responsive grid:

```html
<!-- Database cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- cards without width styles -->
</div>
```

### Priority 2: Color Contrast

**Files**: `layouts/partials/home/custom.html`, `assets/css/custom.css`

1. **Join Us section** - Change `rgba(255,255,255,0.1)` to `rgba(255,255,255,0.2)` minimum
2. **Opacity text** - Change `opacity: 0.7` to `opacity: 0.8` or higher for body text
3. **Hero gradient** - Ensure WCAG AA contrast (4.5:1 for text)

### Priority 3: Touch Targets

**File**: `layouts/partials/home/custom.html`

Ensure all clickable elements are minimum 44×44px:

```html
<!-- Join us action cards - make larger on mobile -->
<div class="p-4 min-h-[88px] min-w-[88px] sm:w-[140px]">
```

### Priority 4: Events Table

**File**: `layouts/partials/home/custom.html`

Replace table with cards on mobile:

```html
<!-- Desktop: table -->
<div class="hidden md:block">
  <table>...</table>
</div>

<!-- Mobile: cards -->
<div class="md:hidden space-y-3">
  {{ range ... }}
  <div class="card card-compact">...</div>
  {{ end }}
</div>
```

### Priority 5: Footer Stacking

**File**: `layouts/partials/footer.html`

Ensure footer columns stack properly:

```html
<footer class="footer footer-center md:footer-horizontal ...">
```

---

## Acceptance Criteria

- [ ] Homepage looks correct on 375px width (iPhone SE)
- [ ] Homepage looks correct on 390px width (iPhone 14)
- [ ] All text passes WCAG AA contrast (4.5:1)
- [ ] All buttons/links are minimum 44×44px touch targets
- [ ] Events section is readable on mobile
- [ ] Footer columns stack vertically on mobile
- [ ] No horizontal scrolling on any mobile viewport

## Testing

Test with Chrome DevTools device emulation:
- iPhone SE (375px)
- iPhone 14 (390px)
- iPad Mini (768px)
- Desktop (1440px)

Also test:
- Light mode
- Dark mode

---

## Implementation Notes

### Don't Break Desktop

When fixing mobile, ensure desktop layout is preserved:
- Use `sm:`, `md:`, `lg:` breakpoint prefixes
- Test both mobile AND desktop after changes

### DaisyUI + Tailwind

The site uses:
- **DaisyUI** for components (loaded via CDN)
- **Tailwind** utilities from Blowfish theme
- **Custom CSS** in `assets/css/custom.css`

Prefer Tailwind classes over custom CSS where possible.

### Devcontainer

Run all commands in the devcontainer:

```bash
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo server -D --bind 0.0.0.0"
```

---

## Related Issues

- GitHub Issue: (create and link)
