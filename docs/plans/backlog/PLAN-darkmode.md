# Plan: Fix Dark Mode Issues

## Status: In Progress

## Goal
Fix all dark mode styling issues across the site to ensure text is readable and backgrounds are consistent.

## Context
The site uses the Blowfish Hugo theme with Tailwind CSS. Dark mode is toggled via a `.dark` class on the `<html>` element. The theme uses `oklch` color values which were causing issues.

---

## Completed Work

### 1. HTML Root Background Fix
**Problem:** The `<html>` element had `oklch(1 0 0)` (white) background in dark mode, causing white areas to show through.

**Solution:** Added CSS in `assets/css/custom.css`:
```css
html.dark {
  background-color: rgb(30, 41, 59) !important;
}
```

### 2. Dark Mode Toggle Icon
**Problem:** The moon icon was showing in dark mode instead of the sun icon.

**Solution:** Added CSS utilities:
```css
.dark .dark\:hidden { display: none !important; }
.dark .dark\:flex { display: flex !important; }
```

### 3. Footer Text Color
**Problem:** Footer text was black on black background in dark mode.

**Solution:** Added DaisyUI-style color utilities:
```css
.text-base-content { color: #1f2937; }
.dark .text-base-content { color: #e5e7eb; }
```

### 4. TOC (Table of Contents) Readability
**Problem:** TOC text was unreadable in dark mode.

**Solution:** Added border and background utilities:
```css
.border-base-300 { border-color: #e5e5e5; }
.dark .border-base-300 { border-color: #374151; }
.dark .dark\:bg-neutral-800\/50 { background-color: rgba(38, 38, 38, 0.5); }
```

### 5. Article Content Text Color
**Problem:** Body text in blog posts (paragraphs, list items) was dark/black in dark mode.

**Solution:** Added in `assets/css/custom.css`:
```css
.dark .article-content,
.dark .article-content p,
.dark .article-content li,
.dark .article-content td,
.dark .article-content th {
  color: #e5e7eb;
}
```

### 6. Article Headings and Strong Text
**Problem:** H2, H3, H4 headings and `<strong>` text were dark in dark mode.

**Solution:** Added:
```css
.dark .article-content h2,
.dark .article-content h3,
.dark .article-content h4,
.dark .article-content h5,
.dark .article-content h6 {
  color: #f3f4f6;
}

.dark .article-content strong,
.dark .article-content b {
  color: #f9fafb;
}
```

---

## Remaining Issues

### 1. About Page (`/about/`) - Text Too Faint
**Problem:** Body text on the about page uses `.prose` class (not `.article-content`) and appears faint in dark mode.

**Investigation:**
- The page uses `.prose.dark:prose-invert` classes
- First paragraph has color `rgb(148, 163, 184)` which is light gray but low contrast
- The `.article-content` CSS fixes don't apply because about page doesn't use that class

**Proposed Solution:**
Add similar fixes targeting `.prose` class:
```css
.dark .prose p,
.dark .prose li,
.dark .prose td {
  color: #e5e7eb;
}

.dark .prose h2,
.dark .prose h3,
.dark .prose h4 {
  color: #f3f4f6;
}

.dark .prose strong {
  color: #f9fafb;
}
```

### 2. Personas Pages
- `/personas/` - List page appears okay
- `/personas/consumer/` - Appears okay
- May need verification on other persona detail pages

### 3. Other Pages to Test
- Homepage sections
- Blog listing page
- Publication pages
- Law/regulation pages
- Events pages

---

## Files Modified

All changes are in: `assets/css/custom.css`

Key sections added:
- Lines ~78-83: Border color utilities
- Lines ~84-86: Dark mode background utilities for TOC
- Lines ~88-100: Article content text color fixes
- Lines ~102-114: Article headings and strong text fixes
- Lines ~116-118: HTML root element background fix

---

## Git Commits Made

1. `68684ed` - "Fix dark mode: article body white background and TOC readability"
2. Previous commits for icon rename and footer fixes

---

## Testing Checklist

- [x] Blog post pages - headings, body text, lists, TOC
- [x] Footer - text visible in dark mode
- [x] Dark mode toggle - correct icon (sun in dark, moon in light)
- [x] Sidebar - details cards readable
- [ ] About page - body text needs more contrast
- [ ] Homepage - all sections
- [ ] Blog listing page
- [ ] Publications pages
- [ ] Laws/regulations pages
- [ ] Events pages
- [ ] Personas detail pages (all)

---

## How to Test

1. Start Hugo server: `docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo server -D --bind 0.0.0.0"`
2. Open browser to `http://localhost:1313`
3. Toggle dark mode using the sun/moon icon in the header
4. Navigate to various pages and verify text is readable

---

## Notes

- The Blowfish theme uses `oklch` color values which don't always work well with custom CSS
- The `dark:prose-invert` Tailwind class should handle most prose styling but seems insufficient
- Custom CSS with `!important` may be needed to override theme defaults
- Color values used:
  - `#e5e7eb` - Light gray for body text
  - `#f3f4f6` - Lighter gray for headings
  - `#f9fafb` - Near white for strong/bold text
  - `rgb(30, 41, 59)` - Dark background matching body
