# Aftenposten Design Patterns Analysis

## Purpose

Analyze Aftenposten.no's content display methods to learn patterns we can apply to SovereignSky for better readability and visual hierarchy.

**Date**: 2026-01-11

---

## Content Display Categories

### Category A: Hero/Featured Content

| ID | Pattern | Description | Use Case |
|----|---------|-------------|----------|
| A1 | **Full-Width Hero** | Large image spanning full width, category labels below, bold headline, no description | Top story, breaking news |
| A2 | **Magazine Feature** | Dramatic full-width photo, centered text, byline/dates, premium feel | Long-form articles, special reports |
| A3 | **Video Hero** | Large image with play button overlay, headline overlaid on dark gradient | Video content, documentaries |

---

### Category B: Card Layouts

| ID | Pattern | Description | Use Case |
|----|---------|-------------|----------|
| B1 | **Two-Column Grid** | Two cards side-by-side, image + category + headline each | General news feed |
| B2 | **Standard Card** | Image on top, "Category \| Topic" labels, bold headline, no description | Most articles |
| B3 | **Compact Card** | Small thumbnail + headline only, minimal space | Secondary stories |

---

### Category C: List Formats

| ID | Pattern | Description | Use Case |
|----|---------|-------------|----------|
| C1 | **Text + Thumbnail Right** | Headline on left, small square thumbnail on right | Related articles, compact lists |
| C2 | **Breaking News Bar** | "Akkurat nå" label, headline only, no image | Breaking/live news |
| C3 | **Numbered List** | "01, 02, 03..." with thumbnail + headline | Most read, popular articles |

---

### Category D: Opinion/Commentary

| ID | Pattern | Description | Use Case |
|----|---------|-------------|----------|
| D1 | **Opinion with Portrait** | Illustration, "Kommentar" label, headline, author name + photo | Commentary, op-eds |
| D2 | **Expert Quote** | Portrait photo, quote-style headline (with dash), category | Expert interviews |
| D3 | **Italic Commentary** | Illustration, italicized headline, author byline | Editorial opinion |

---

### Category E: Special Sections

| ID | Pattern | Description | Use Case |
|----|---------|-------------|----------|
| E1 | **Topic Cluster** | Red/highlighted section header, groups related articles | Ongoing stories, series |
| E2 | **Video Carousel** | Horizontal scroll, duration badges, headline overlay | Video section |
| E3 | **Games Row** | Icons/illustrations, horizontal layout, "Se alle" link | Interactive content |
| E4 | **Sponsored Content** | "ANNONSØRINNHOLD" label, clearly marked | Advertising |

---

### Category F: Labels & Metadata

| ID | Pattern | Description | Example |
|----|---------|-------------|---------|
| F1 | **Category Pipe** | Location \| Topic format | "Oslo \| Statsbygg" |
| F2 | **Section Label** | Magazine/section name | "A-magasinet", "Vink" |
| F3 | **Time Label** | "Akkurat nå", timestamps | Breaking news |
| F4 | **Author Byline** | Name + role + portrait | Commentary articles |

---

## Key Design Principles Observed

### 1. Minimal Text on Cards
- Headlines do the heavy lifting
- Descriptions are rare - only on feature articles
- Category labels provide context instead

### 2. Strong Visual Hierarchy
- Hero images are LARGE (full-width)
- Clear size difference between primary and secondary content
- Whitespace separates sections

### 3. Consistent Category System
- "Location | Topic" format throughout
- Color-coded section headers for special coverage
- Clear distinction between news, opinion, magazine content

### 4. Mobile-First Approach
- Single column is primary
- Two-column used sparingly
- Full-width images scale well
- Touch-friendly spacing

### 5. Content Type Differentiation
- News: Photo + factual headline
- Opinion: Illustration + author portrait
- Magazine: Dramatic photos + centered text
- Video: Play button overlay + duration badge

---

## Patterns to Consider for SovereignSky

### For Publications List (Issue #4)
- Use **B2 Standard Card** but more compact
- Remove long descriptions, let titles speak
- Add category labels like "Report | FFI" or "Guide | ICRC"

### For Laws/Countries Cards (Issue #7)
- Use **C1 Text + Thumbnail** for compact lists
- Consider **B3 Compact Card** for dense information

### For Blog Articles
- Use **A1 Full-Width Hero** for featured posts
- Use **B1 Two-Column Grid** for article lists
- Add **F4 Author Byline** pattern

### For Topic Pages
- Consider **E1 Topic Cluster** for grouping related content
- Use section headers to organize

---

## Mobile vs Desktop Differences

### Mobile (observed at ~500px)
- Single column layout dominant
- Full-width images
- Stacked cards
- Video carousel still horizontal (scrollable)
- Games section horizontal (scrollable)

### Desktop (observed earlier at wider viewport)
- Sidebar with "Siste nyheter" (latest news) list
- "Mest lest" (most read) numbered sidebar
- Two-column article grids
- More whitespace between sections

---

## Action Items

- [ ] Simplify publication cards - remove long descriptions
- [ ] Add category labels to cards ("Type | Publisher")
- [ ] Create compact card variant for dense lists
- [ ] Consider topic clustering for related content
- [ ] Improve visual hierarchy with size differentiation
- [ ] Ensure mobile uses single-column layouts

---

## Screenshots Reference

Patterns observed from https://www.aftenposten.no/ on 2026-01-11
