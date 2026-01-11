# Plan: Replace ECharts Map with Alternative Library

## Status: Backlog

**Goal**: Replace ECharts map visualization with a library that reliably supports per-region coloring for bloc member country highlighting.

**Last Updated**: 2026-01-10

---

## Executive Summary

### The Problem

The bloc-member-map shortcode uses ECharts to display a world map with member countries highlighted. However, ECharts has a fundamental issue where per-item `itemStyle.areaColor` in map series data is not visually rendered, despite being correctly stored in the chart options.

**Symptoms observed:**
- Data correctly shows blue color (`#3b82f6`) in chart options for member countries
- Visual rendering shows all countries as gray (default color)
- Manual `setOption()` calls from browser console sometimes work, sometimes don't
- Multiple workaround attempts failed (setTimeout, events, visualMap, geo regions, canvas renderer)

**Current workaround:** Map section is commented out in `layouts/countries/bloc.html`. The member countries grid provides the same information.

### Impact

- Bloc pages (EU, EEA, Five Eyes, etc.) lack visual geographic context
- Users cannot quickly see member country distribution on a map
- Reduced visual appeal compared to other site sections that use ECharts successfully

---

## Current State

### Files Involved

| File | Purpose | Status |
|------|---------|--------|
| `layouts/shortcodes/bloc-member-map.html` | ECharts map shortcode | Exists but disabled |
| `layouts/countries/bloc.html` | Bloc page layout | Map section commented out |
| `static/data/world.json` | GeoJSON world map data | Used by ECharts |
| `data/regions.json` | Country identifiers (ISO codes) | Used for member lookup |
| `data/jurisdictions/blocs.json` | Bloc member lists | Source of member countries |

### What Was Tried

1. **itemStyle.areaColor in data** - Not rendered visually
2. **setTimeout (100ms, 500ms, 1000ms)** - Data set correctly but not rendered
3. **ECharts `rendered` event** - Same issue
4. **ECharts `finished` event** - Same issue
5. **requestAnimationFrame** - Same issue
6. **geo component with regions** - Same issue
7. **Canvas renderer (instead of SVG)** - Same issue
8. **visualMap with piecewise** - Same issue
9. **select state with selectedMode** - Shows labels but not colors
10. **dispatchAction mapSelect** - Same issue

### Root Cause Analysis

ECharts map series has a known limitation/bug where per-item styling is not reliably applied during initial render. The data model correctly stores the styles, but the rendering engine doesn't apply them consistently. This appears to be specific to map series; other ECharts chart types (bar, line, pie) work correctly with per-item styling.

---

## Options Analysis

### Option A: Leaflet.js

**Pros:**
- Widely used, well-documented
- Excellent support for GeoJSON and per-feature styling
- Interactive features (zoom, pan) built-in
- Large plugin ecosystem
- Lightweight (~42KB)

**Cons:**
- Requires tile server for base maps (or use tile-free GeoJSON-only approach)
- Different API paradigm from ECharts
- May need to handle dark mode separately

**Complexity:** Medium

### Option B: D3.js

**Pros:**
- Direct SVG manipulation - full control over styling
- No rendering bugs for per-region coloring
- Already included in some Hugo themes
- Highly customizable

**Cons:**
- More code required for basic functionality
- Steeper learning curve
- Need to handle zoom/pan manually
- Larger bundle size if not already included

**Complexity:** High

### Option C: Simple Maps (amCharts)

**Pros:**
- Purpose-built for map visualizations
- Reliable per-region coloring
- Good documentation
- Handles projections well

**Cons:**
- Commercial license for some features
- Additional dependency
- Larger bundle size

**Complexity:** Medium

### Option D: Static SVG Map

**Pros:**
- No JavaScript required
- Guaranteed consistent rendering
- Fast loading
- Can be styled with CSS (including dark mode)

**Cons:**
- No interactivity (zoom, pan, tooltips)
- Need pre-generated SVG per bloc or dynamic generation
- Less visually impressive

**Complexity:** Low

### Option E: Chart.js with geo plugin

**Pros:**
- Chart.js may already be in use
- chartjs-chart-geo plugin adds map support
- Consistent API with other Chart.js charts

**Cons:**
- Plugin less mature than dedicated map libraries
- May have similar per-region styling issues

**Complexity:** Medium

---

## Recommendation

**Option A: Leaflet.js** is recommended for the following reasons:

1. **Proven reliability** for per-feature GeoJSON styling
2. **Lightweight** and performant
3. **Rich ecosystem** for future enhancements (markers, popups, etc.)
4. **Well-documented** with many examples
5. **Active community** and long-term maintenance

Alternative: **Option D (Static SVG)** if interactivity is not required and simplicity is preferred.

---

## Implementation Plan

### Phase 1: Proof of Concept

1. Create test page with Leaflet.js
2. Load world GeoJSON
3. Style 3 countries (Norway, Iceland, Liechtenstein) in blue
4. Verify colors render correctly on initial load
5. Test dark mode support

### Phase 2: Create New Shortcode

1. Create `layouts/shortcodes/bloc-member-map-leaflet.html`
2. Implement member country highlighting
3. Add click-to-navigate functionality
4. Support dark mode toggle
5. Match existing map styling (zoom, center, colors)

### Phase 3: Integration

1. Update `layouts/countries/bloc.html` to use new shortcode
2. Test on all bloc pages (EU, EEA, Five Eyes, etc.)
3. Verify tooltip/hover behavior
4. Test responsive behavior

### Phase 4: Cleanup

1. Remove old ECharts shortcode (or keep for reference)
2. Remove ECharts map-related workaround code
3. Update documentation
4. Consider removing world.json if Leaflet uses different source

---

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `layouts/shortcodes/bloc-member-map-leaflet.html` | New Leaflet-based map shortcode |
| `static/js/leaflet-init.js` | (Optional) Leaflet initialization helper |

### Modified Files

| File | Changes |
|------|---------|
| `layouts/countries/bloc.html` | Uncomment map section, use new shortcode |
| `config/_default/params.toml` | (If needed) Add Leaflet CDN or local assets |
| `layouts/partials/head.html` | (If needed) Include Leaflet CSS |

### Potentially Removed Files

| File | Reason |
|------|--------|
| `layouts/shortcodes/bloc-member-map.html` | Replaced by Leaflet version |

---

## Dependencies

### Leaflet.js CDN

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

### GeoJSON Data

- Existing `static/data/world.json` may be compatible
- Or use Leaflet-optimized GeoJSON source
- Consider file size optimization (simplify geometries)

---

## Success Criteria

- [ ] Member countries display in blue on initial page load
- [ ] Non-member countries display in gray
- [ ] Colors consistent across page reloads
- [ ] Dark mode support works correctly
- [ ] Click on member country navigates to country page
- [ ] Hover shows country name tooltip
- [ ] Map is zoomable and pannable
- [ ] Works on EU page (27 members)
- [ ] Works on EEA page (3 direct members)
- [ ] Works on Five Eyes page (5 members)
- [ ] Responsive on mobile devices
- [ ] No console errors

---

## Estimated Effort

| Phase | Effort |
|-------|--------|
| Phase 1: Proof of Concept | 2-4 hours |
| Phase 2: Create Shortcode | 4-6 hours |
| Phase 3: Integration | 2-3 hours |
| Phase 4: Cleanup | 1-2 hours |
| **Total** | **9-15 hours** |

---

## References

- [Leaflet.js Documentation](https://leafletjs.com/reference.html)
- [Leaflet GeoJSON Tutorial](https://leafletjs.com/examples/geojson/)
- [ECharts Map Series Bug Discussion](https://github.com/apache/echarts/issues/) (various issues)
- [Natural Earth GeoJSON](https://github.com/nvkelso/natural-earth-vector) (alternative data source)

---

## Appendix: ECharts Debugging Session Summary

**Date:** 2026-01-10

The following approaches were tried and documented:

1. Per-item `itemStyle.areaColor` in series data - Colors stored but not rendered
2. Multiple setTimeout delays (100ms, 500ms, 1000ms) - No effect
3. ECharts events (`rendered`, `finished`) - No effect
4. `requestAnimationFrame` after render - No effect
5. `geo` component with `regions` array - No effect
6. Canvas renderer instead of SVG - No effect
7. `visualMap` with piecewise mapping - No effect
8. `select` state with `selectedMode: 'multiple'` - Shows labels only
9. `dispatchAction` with `mapSelect` - No effect

Manual `setOption()` calls from browser console occasionally worked (e.g., turning Norway red), but the same code in setTimeout callbacks did not produce visual changes despite correctly updating the chart's internal data model.

**Conclusion:** ECharts map series has unreliable per-region styling that cannot be worked around with timing or event-based solutions. A different library is required.
