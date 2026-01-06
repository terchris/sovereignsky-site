# Law Relationships Feature Implementation

## Overview
Add semantic relationships between laws (conflicts_with, implements, complements, etc.) to the SovereignSky laws section. Relationships must be bidirectional (define once, display on both law pages).

## Status: IN PROGRESS

## Completed
- [x] Phase 1.1: Schema already had related_laws defined
- [x] Phase 1.2: Added related_laws to all 41 laws in laws.json
- [x] Phase 2.1: Updated generate-laws-pages.js with bidirectional relationship logic
  - 108 total relationships generated (including inverses)
  - Relationships grouped by type in frontmatter
- [x] Phase 3.1: Updated layouts/laws/single.html with semantic relationship display
  - Color-coded relationship types with icons
  - Kept "Same jurisdiction" as fallback below

---

## Phase 1: Schema & Data

### 1.1 Update schema
- [ ] Update `data/schemas/law.schema.json` with `related_laws` definition

### 1.2 Add relationships to laws.json
- [ ] Add `related_laws` array to all 41 laws in `data/laws.json`

**Relationship types:**
| Type | Meaning | Example |
|------|---------|---------|
| `implements` | National law implementing EU/bloc law | Personopplysningsloven → GDPR |
| `interprets` | Court ruling interpreting a law | Schrems II → GDPR |
| `conflicts_with` | Legal tension/incompatibility | GDPR ↔ CLOUD Act |
| `complements` | Works alongside in same jurisdiction | GDPR + ePrivacy |
| `succeeds` | Replaces earlier framework | EU-US DPF → Privacy Shield |
| `extended_by` | Scope expanded by another law | GDPR → EEA Agreement |
| `amends` | Modifies existing law | - |

**Key relationship clusters to map:**

1. **EU Privacy Stack** (complements each other)
   - GDPR, ePrivacy, LED, Schrems II

2. **EU Digital Stack** (complements each other)
   - DSA, DMA, DGA, Data Act, AI Act

3. **EU Security Stack** (complements each other)
   - NIS2, DORA, CRA

4. **US Surveillance Stack** (complements each other)
   - CLOUD Act, FISA 702, EO 12333, Patriot Act, ECPA

5. **US ↔ EU Conflicts**
   - GDPR conflicts_with: CLOUD Act, FISA 702, EO 12333
   - Schrems II conflicts_with: CLOUD Act, FISA 702, EO 12333

6. **Transfer Framework Chain**
   - Schrems II → succeeds (invalidates Privacy Shield)
   - EU-US DPF → succeeds Schrems II (attempts resolution)

7. **National Implementations** (implements GDPR)
   - Personopplysningsloven (NO)
   - BDSG (DE)
   - UK GDPR (GB)

8. **EEA Extension**
   - EEA Agreement extended_by: all EU laws to NO, IS, LI

9. **China Stack** (complements each other)
   - National Intelligence Law, Cybersecurity Law, Data Security Law, PIPL

10. **Russia Stack** (complements each other)
    - SORM, Yarovaya Law, Data Localization Law

---

## Phase 2: Generate Script

### 2.1 Update generate-laws-pages.js
- [ ] Read `related_laws` from each law entry
- [ ] Build bidirectional relationship map (if A → B, then B → A)
- [ ] Compute inverse relationship types:
  - `implements` ↔ `implemented_by`
  - `interprets` ↔ `interpreted_by`
  - `conflicts_with` ↔ `conflicts_with` (symmetric)
  - `complements` ↔ `complements` (symmetric)
  - `succeeds` ↔ `succeeded_by`
  - `extended_by` ↔ `extends`
  - `amends` ↔ `amended_by`
- [ ] Pass relationships to frontmatter as structured data

---

## Phase 3: Template/Layout

### 3.1 Update law page layout
- [ ] Create or update partial for relationship display
- [ ] Group relationships by type with icons:
  - ⚔️ Conflicts with
  - 🔗 Complements / Works with
  - 📜 Implements / Implemented by
  - ⚖️ Interprets / Interpreted by
  - 🔄 Succeeds / Succeeded by
  - 📋 Extends / Extended by
- [ ] Keep existing "Same jurisdiction" auto-grouping below explicit relationships

### 3.2 Display format
```
Related Laws

⚔️ Conflicts with
├── GDPR (EU, 2018)
└── Schrems II (EU, 2020)

🔗 Works with
├── FISA Section 702 (US, 2008)
└── Patriot Act (US, 2001)

────────────────────

📍 Same jurisdiction (US)
└── ECPA (1986)
```

---

## Files to modify

1. `data/schemas/law.schema.json` - schema update
2. `data/laws.json` - add related_laws to all entries
3. `scripts/generate-laws-pages.js` - bidirectional relationship logic
4. `layouts/laws/single.html` or `layouts/partials/related-laws.html` - display

---

## Progress Log

### 2025-12-25
- Created implementation plan
- Starting Phase 1.1: Schema update

