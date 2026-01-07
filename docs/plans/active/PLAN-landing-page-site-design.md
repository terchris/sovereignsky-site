NOTES on homepage structure:
1) get the facts - the data we have collected
2) what does it mean for me - the tools we have
   - Personas: there is a lot of stuff here - what should i care about
   - 

# SovereignSky Landing Page Design Plan

## Executive Summary

This plan outlines a redesign of the SovereignSky homepage to better communicate the site's mission, engage visitors, and guide them to actionable resources. The design must be mobile-first and leverage the existing Blowfish Hugo theme capabilities.

---

## 1. Current State Analysis

### Current Homepage Structure
The existing homepage includes:
- Hero section with "SovereignSky" branding and Totalforsvarsåret 2026 framing
- "Explore the databases" section with 5 cards (Software, Datacenters, Jurisdictions, Laws, Networks)
- "Quick baseline" section linking to NDSI survey and Software Risk Check
- "The Problem is Clear" section with statistics table
- "Key Events in 2026" table
- About section
- Minimal footer (About / Totalforsvarsåret / Blog / helpers.no)

### Current Issues Identified
1. **Footer is too thin** - lacks comprehensive navigation and contact info
2. **Mission/problem not immediately clear** - requires scrolling to understand purpose
3. **No clear user journey** - visitors may not know where to start
4. **Statistics section is plain** - could be more visually impactful
5. **Mobile experience is adequate but not optimized** - cards stack but hero could be tighter

---

## 2. Design Inspiration (from ThemeForest Hugo Templates)

### Aplio SaaS Landing Template Patterns
Key design patterns observed:
1. **Hero Section**: Bold headline + sub-headline + CTA buttons + product visualization
2. **Trust Indicators**: "50K+ Trusted Businesses" with logo bar
3. **Services Grid**: 3-column icon cards with hover effects
4. **Statistics Section**: Large percentage numbers with labels
5. **Two-Column Features**: Image + text with bullet checklist
6. **Testimonials**: Cards with company logos and ratings
7. **CTA Section**: Pre-footer call-to-action with value propositions
8. **Rich Footer**: 4-column layout (Brand, Explore, Resources, Contact)

---

## 3. Proposed Homepage Structure

### Section 1: Hero (Above the Fold)
**Purpose**: Immediately communicate mission and primary action

**Content**:
- **Tagline**: "Totalforsvarsåret 2026 · Digital Preparedness"
- **Headline**: "Understand your digital dependencies and take action"
- **Sub-headline**: "Digital sovereignty resources for Norwegian organizations. Map your exposure to foreign laws, infrastructure, and vendors."
- **Primary CTA**: "Take the NDSI Survey" (button)
- **Secondary CTA**: "Explore the Databases" (link)
- **Visual**: Abstract sovereignty/network illustration (existing or new)

### Section 2: Problem Statement (Why This Matters)
**Purpose**: Create urgency and relevance

**Content**:
- **Section Label**: "THE CHALLENGE"
- **Headline**: "Your data is subject to foreign laws"
- **Statistics Cards** (visual redesign of current table):
  - 65% of Norwegian cloud market is Microsoft → Foreign jurisdiction exposure
  - 87% controlled by American companies → Single point of failure
  - 86% of government agencies use cloud → Critical dependency
  - US subset in US CLOUD Act → Data can be seized

**Design**: Large stat numbers with explanatory labels, similar to Aplio's stats section

### Section 3: Quick Actions (Assessment Tools)
**Purpose**: Get visitors to engage with tools immediately

**Content**:
- **Section Label**: "ASSESS YOUR EXPOSURE"
- **Headline**: "Start with a quick baseline"
- **Two Feature Cards**:
  1. **NDSI Survey**: "Answer 11 questions → Get your sovereignty level + recommendations"
  2. **Software Risk Check**: "Select your tools → See immediate risk signals"

**Design**: Two prominent cards with icons, descriptions, and CTA buttons

### Section 4: Software Database Highlight
**Purpose**: Showcase the flagship database (10,000+ products)

**Content**:
- **Section Label**: "SOFTWARE DATABASE"
- **Headline**: "10,000+ software products analyzed for sovereignty risk"
- **Search Box**: Embedded search directly on homepage
- **Quick Filters**: Risk Level chips (Low/Moderate/Elevated/High)
- **Sample Results**: Show 3-4 example products dynamically
- **CTA**: "Search all software →"

**Design**: Search-first interface, not just a link. This is the largest database and deserves prominent treatment with inline search capability.

### Section 5: Other Databases
**Purpose**: Showcase the supporting research resources

**Content**:
- **Section Label**: "EXPLORE MORE"
- **Headline**: "Maps, laws, and infrastructure"
- **4 Cards**:
  - Datacenters (67+ locations, jurisdiction exposure map)
  - Jurisdictions (country risk levels, legal frameworks)
  - Laws (government access, data protection laws)
  - Networks (submarine cables, infrastructure dependencies)

**Design**: Icon + title + count/stat + brief description + "Explore →" link

### Section 6: Key Events
**Purpose**: Show upcoming relevant events

**Content**:
- **Section Label**: "EVENTS"
- **Headline**: "Key Events in 2026"
- **Event List**: 5-6 upcoming events with dates, names, and focus areas
- **CTA**: "Full calendar and details →"

**Design**: Clean table or card list, similar to current but with better visual hierarchy

### Section 7: About / Call to Action
**Purpose**: Build trust and explain the initiative

**Content**:
- **Headline**: "A helpers.no Initiative"
- **Brief Text**: Open-source, volunteer-driven, practical focus
- **CTA**: "Read more about this initiative →"

### Section 8: Footer (Expanded)
**Purpose**: Comprehensive navigation and attribution

**Content**:
- **Column 1 - Brand**: SovereignSky logo, brief tagline, helpers.no attribution
- **Column 2 - Tools**: NDSI Survey, Software Risk Check, Software Database, Datacenter Map
- **Column 3 - Learn**: Jurisdictions, Laws, Networks, Blog, Publications, Events
- **Column 4 - About**: About SovereignSky, Totalforsvarsåret 2026, GitHub, Contact
- **Bottom Bar**: "Published by helpers.no" + Copyright

---

## 4. Software Database Scale Considerations

### Current vs Future Scale
- **Current**: ~50 software products
- **Target**: ~10,000 software products (after scraping)

### Implications for Homepage

1. **Search-First Design**: With 10K products, browsing is impractical. The homepage must feature search prominently, not just a "browse" link.

2. **Homepage Search Widget**: Embed a lightweight search input on the homepage that:
   - Shows instant results as you type
   - Filters by risk level with quick chips
   - Displays 3-4 sample results inline
   - Links to full results page

3. **Dynamic Stats**: Show live counts ("10,247 products analyzed") to demonstrate database comprehensiveness.

4. **Category Entry Points**: Instead of "explore software", offer entry points:
   - "High-risk software you might be using"
   - "Find alternatives to [popular tool]"
   - "Search by use area (Collaboration, Storage, etc.)"

### Performance Considerations

1. **Homepage Load**: Don't load all 10K products on homepage - use search endpoint
2. **Software Page**: Will need:
   - Pagination or infinite scroll
   - Server-side or client-side search indexing
   - Faceted filtering (current filters are good)
   - Lazy loading of product cards
3. **Search Implementation Options**:
   - Hugo's built-in Fuse.js search (may struggle at 10K)
   - Pagefind (static site search, handles large datasets well)
   - External search service (Algolia, Typesense)

### Recommendation
Consider **Pagefind** for the software search - it's designed for static sites and handles 10K+ documents efficiently. Can be embedded on homepage as a search widget.

---

## 5. Mobile Considerations

### Priority Order (Mobile)
1. Hero with headline + primary CTA
2. Problem stats (2x2 grid instead of 1x4)
3. Quick actions (stacked cards)
4. Database cards (2-column or stacked)
5. Events (simplified list)
6. Footer (accordion or stacked columns)

### Mobile-Specific Adjustments
- Reduce hero visual complexity
- Ensure CTAs are thumb-friendly (min 44px tap targets)
- Stats become 2x2 grid
- Database cards stack 2-column
- Footer columns collapse to expandable sections

---

## 6. Implementation Approach

### Using Blowfish Theme Capabilities
Reference: https://blowfish.page/docs/homepage-layout/

Blowfish supports multiple homepage layouts:
- `page` - Standard content page
- `profile` - Profile card with content below
- `hero` - Full-width hero background
- `card` - Card-based layout
- `background` - Background image hero
- `custom` - Full custom layout

**Recommended**: Use `custom` layout with partials for maximum flexibility

### Implementation Steps

#### Phase 1: Homepage Layout Structure
1. Create custom homepage partial in `layouts/partials/home/`
2. Define section components:
   - `hero.html`
   - `problem-stats.html`
   - `quick-actions.html`
   - `software-search.html` (embedded search widget)
   - `databases.html` (other databases)
   - `events.html`
   - `about-cta.html`

#### Phase 2: Footer Enhancement
1. Create custom footer partial overriding Blowfish default
2. Add multi-column layout with comprehensive links
3. Ensure mobile responsiveness

#### Phase 3: Styling
1. Use existing Blowfish color scheme (maintain consistency)
2. Add custom CSS for:
   - Stats cards with large numbers
   - Feature cards with hover states
   - Mobile-specific adjustments

#### Phase 4: Software Search Implementation
1. Evaluate search options (Pagefind recommended for 10K+ products)
2. Implement search indexing for software products
3. Create homepage search widget component
4. Add pagination/infinite scroll to software listing page

#### Phase 5: Content Migration
1. Move existing homepage content to new structure
2. Write/refine copy for each section
3. Add any missing content (expanded footer links)

---

## 7. Content Requirements

### Copy Needed
- [ ] Hero headline and sub-headline (finalize wording)
- [ ] Problem section intro text
- [ ] Quick actions card descriptions
- [ ] Footer column organization
- [ ] Mobile-specific CTAs

### Assets Needed
- [ ] Hero illustration (optional - can use existing)
- [ ] Icons for database cards (can use existing or Blowfish icons)
- [ ] Stats visualization style

---

## 8. Success Metrics

### Primary Goals
1. **Clarity**: Visitor understands site purpose within 5 seconds
2. **Engagement**: Increased clicks on NDSI Survey and Software Risk Check
3. **Mobile**: Same quality experience on mobile devices
4. **Navigation**: Footer provides clear paths to all major sections

### Measurable Outcomes (if analytics added)
- Time to first CTA click
- Bounce rate reduction
- Mobile vs desktop engagement parity

---

## 9. Next Steps

1. **Review & Approve** this plan
2. **Create homepage partials** structure
3. **Implement hero section** first (highest impact)
4. **Implement software search** (critical for 10K products)
5. **Iterate through remaining sections** in priority order
6. **Expand footer**
7. **Test on mobile** throughout development

---

## Appendix: Reference Screenshots

During analysis, the following pages were reviewed:
- SovereignSky homepage (localhost:1313)
- SovereignSky NDSI page
- SovereignSky Software database
- SovereignSky Networks page
- SovereignSky Datacenters page
- SovereignSky Jurisdictions page
- SovereignSky Events page
- SovereignSky Blog page
- SovereignSky About page
- ThemeForest Hugo templates (44 templates reviewed)
- Aplio SaaS Landing Template (detailed review)
