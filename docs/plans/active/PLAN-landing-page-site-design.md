# SovereignSky Landing Page Redesign

## Status: Active

**Goal**: Redesign the homepage to create awareness about digital sovereignty, help visitors understand what it means for them, and invite people to join the effort.

**Last Updated**: 2026-01-11

---

## Core Purpose

The site exists to **create awareness about digital sovereignty** for Norwegian organizations.

Key objectives:
1. Help visitors understand what digital sovereignty means **for them personally**
2. Showcase the research and content we've created
3. Invite people to join and help make Norway digitally sovereign

---

## Current Assets

### Personas (7)
- Consumer
- Developer
- Enterprise
- Humanitarian
- IT-Ops
- Public Sector
- Security

### Databases
- **Datacenters**: 358 regions across 50+ providers
- **Countries/Blocs**: Jurisdiction analysis and data agreements
- **Laws**: ~40 laws analyzed (GDPR, CLOUD Act, etc.)
- **Networks**: ~25 submarine cables and infrastructure

### Content
- **Blog**: 10+ articles on digital sovereignty topics
- **Events**: 15+ events in 2026 calendar
- **Publications**: Research papers and reports

---

## Design Approach: DaisyUI

**Reference**: https://daisyui.com/

Use DaisyUI component patterns instead of default Blowfish styling:

### Why DaisyUI
- Modern, clean aesthetic
- Excellent component library
- Works with Tailwind CSS (already in Blowfish)
- Better cards, buttons, and hero patterns

### Key Components to Use
- **Hero**: DaisyUI hero with gradient/overlay
- **Cards**: DaisyUI card component for personas, blog, databases
- **Stats**: DaisyUI stats component for numbers
- **Timeline**: DaisyUI timeline for "Coming Soon" roadmap
- **Footer**: DaisyUI footer with multiple columns
- **Buttons**: DaisyUI btn classes for CTAs

### Implementation
- Add DaisyUI to the project (via CDN or npm)
- Create custom partials using DaisyUI classes
- Override Blowfish default styles where needed
- Maintain color scheme consistency

---

## Proposed Homepage Structure

### Section 1: Hero
**Purpose**: Create awareness, set the context

**Content**:
- **Context badge**: "Totalforsvarsåret 2026 · Digital Preparedness"
- **Headline**: "Digital sovereignty resources for Norwegian organizations"
- **Sub-headline**: "Understand your digital dependencies and take action"
- **Primary CTA**: "Find what matters to you" (scroll to personas)
- **Secondary CTA**: "Explore the databases"

**Design**: DaisyUI hero with gradient background

---

### Section 2: What Does This Mean For Me? (Personas)
**Purpose**: Help visitors self-identify and find relevant content

**Content**:
- **Section headline**: "What does digital sovereignty mean for you?"
- **Persona cards** (grid of 7):
  - Developer - "Building sovereign software"
  - IT-Ops - "Managing infrastructure dependencies"
  - Public Sector - "Government compliance and security"
  - Enterprise - "Business continuity and risk"
  - Security - "Threat landscape and defense"
  - Humanitarian - "Data protection in crisis"
  - Consumer - "Personal digital independence"

**Design**:
- DaisyUI cards with icon, title, short description
- Click to go to persona page with curated content
- Mobile: 2-column grid

---

### Section 3: Latest Insights (Blog)
**Purpose**: Show the conversation, demonstrate expertise

**Content**:
- **Section headline**: "Latest insights"
- **3-4 recent blog posts** with:
  - Title
  - Short excerpt
  - Date
  - Read more link
- **CTA**: "Read all articles →"

**Design**:
- DaisyUI card layout
- Show featured image if available
- Mobile: stack vertically

---

### Section 4: What We've Mapped (Databases)
**Purpose**: Showcase the research depth

**Content**:
- **Section headline**: "The data behind digital sovereignty"
- **Stats overview** (DaisyUI stats component):
  - 41 Software Products
  - 358 Datacenter Regions
  - 50+ Countries Mapped
  - 40+ Laws Documented
- **Database cards** (4):
  - Datacenters - "Where your data lives"
  - Countries - "Jurisdiction and data agreements"
  - Laws - "Legal frameworks that affect you"
  - Networks - "Infrastructure dependencies"

**Design**:
- DaisyUI stats component for numbers
- DaisyUI cards for database links

---

### Section 5: Key Events
**Purpose**: Time-sensitive engagement

**Content**:
- **Section headline**: "Key Events in 2026"
- **5-6 upcoming events** with date, name, focus
- **CTA**: "Full calendar →"

**Design**: DaisyUI table or card list

---

### Section 6: Join Us
**Purpose**: Community building, call to action

**Content**:
- **Section headline**: "Help make Norway digitally sovereign"
- **Message**:
  - "SovereignSky is an open initiative by helpers.no"
  - "We believe digital sovereignty is a shared responsibility"
  - "Join us in mapping, documenting, and building alternatives"
- **Ways to contribute**:
  - Contribute research
  - Suggest improvements
  - Share with your network
  - Join the conversation
- **CTA buttons**:
  - "View on GitHub" (link to repo)
  - "About this initiative" (link to about page)

**Design**:
- Warm, inviting section
- Different background to stand out
- DaisyUI buttons for CTAs

---

### Section 7: Coming Soon (What We're Building)
**Purpose**: Show the roadmap, invite collaboration

**Content**:
- **Section headline**: "What we're building"
- **Projects in development**:

1. **Software Database v2**
   - Current: ~50 products (MVP)
   - Coming: 4,000+ software products
   - Categorized, validated, with sovereign alternatives
   - Find replacements for foreign-controlled tools

2. **NDSI Survey**
   - Take the survey, get a report on your digital sovereignty
   - Based on EU Cloud Sovereignty Framework
   - Personalized recommendations for improving your sovereignty posture

3. **SovereignSky Software Suite**:

   a) **urbalurba-infrastructure**
   - Azure service equivalents on a Kubernetes stack
   - Self-hosted alternatives for common cloud services

   b) **devcontainer-toolbox**
   - All development tools set up in a secure devcontainer
   - Reproducible, sovereign development environment

   c) **secure-net**
   - Encrypted overlay network
   - Secure access between developers and production clusters

**Design**:
- DaisyUI timeline or roadmap style
- Progress indicators where applicable
- "Want to help?" links for each project

---

### Section 8: Footer (Expanded)
**Purpose**: Comprehensive navigation

**Content**:
- **Column 1 - About**: SovereignSky logo, brief tagline, helpers.no link
- **Column 2 - Databases**: Datacenters, Countries, Laws, Networks
- **Column 3 - Learn**: Blog, Publications, Events, Personas
- **Column 4 - Engage**: About, Totalforsvarsåret, GitHub, Contact

**Design**: DaisyUI footer component, 4-column on desktop, stacked on mobile

---

## Content to Remove/De-emphasize

- **NDSI Survey link** - tool not finished, move to "Coming Soon"
- **Software Risk Check link** - tool not finished, remove from homepage
- **Problem statement table** - keep but move lower, after personas

---

## Mobile Considerations

1. Hero: Keep compact, clear CTAs
2. Personas: 2-column grid
3. Blog: Stack cards vertically
4. Databases: 2-column or stacked
5. Events: Simplified list
6. Join Us: Full-width CTA section
7. Coming Soon: Stacked timeline
8. Footer: Stacked columns or accordion

---

## Implementation Plan

### Phase 1: Setup DaisyUI
1. Add DaisyUI to project
2. Configure with Blowfish theme colors
3. Test basic components work

### Phase 2: Hero Section
1. Create DaisyUI hero partial
2. Add gradient background
3. Style CTAs

### Phase 3: Persona Section
1. Create persona cards partial
2. Style cards with icons and descriptions
3. Link to existing persona pages
4. Test responsive layout

### Phase 4: Blog Section
1. Create blog preview partial
2. Query recent posts (limit 3-4)
3. Style cards with excerpts
4. Add "Read all" link

### Phase 5: Databases Section
1. Update stats with DaisyUI component
2. Add database cards
3. Style consistently

### Phase 6: Events Section
1. Create events preview partial
2. Show upcoming events
3. Add calendar link

### Phase 7: Join Us Section
1. Create call-to-action section
2. Add contribution messaging
3. Style with distinct background
4. Add GitHub and About links

### Phase 8: Coming Soon Section
1. Create timeline/roadmap partial
2. Add project descriptions
3. Add "Want to help?" CTAs

### Phase 9: Footer
1. Create custom footer partial
2. Add 4-column layout
3. Populate with comprehensive links
4. Test mobile responsiveness

### Phase 10: Testing
1. Test all sections on desktop
2. Test all sections on mobile
3. Fix any styling issues

---

## Success Criteria

1. Visitor understands site purpose within 5 seconds
2. Visitor can self-identify via persona within 10 seconds
3. Clear path to relevant content for each persona
4. Invitation to contribute is visible and compelling
5. Mobile experience is equally effective
6. Design feels modern and professional (DaisyUI aesthetic)

---

## Next Steps

1. [ ] Review and approve this revised plan
2. [ ] Add DaisyUI to project
3. [ ] Implement hero section
4. [ ] Implement persona cards section
5. [ ] Implement blog preview section
6. [ ] Implement databases section
7. [ ] Implement events section
8. [ ] Implement join us section
9. [ ] Implement coming soon section
10. [ ] Enhance footer
11. [ ] Test on mobile
