# Plan 02: Blocs Adequacy Decisions

## Status: Active

**Goal**: Add `adequacyDecisions` array to `data/blocs/blocs.json` and update schema.

**Prerequisites**: None (can run in parallel with Plan 01)

**Blocks**: None (templates can use new field when ready)

**Last Updated**: 2026-01-10

---

## Phase 1: Update Blocs Schema

### Tasks

- [ ] 1.1 Update `data/schemas/blocs.schema.json` to add `adequacyDecisions` field:
  ```json
  "adequacyDecisions": {
    "type": "array",
    "items": {
      "type": "object",
      "required": ["countryId", "date"],
      "properties": {
        "countryId": { "type": "string", "description": "ISO country code" },
        "countryName": { "type": "string" },
        "date": { "type": "string", "format": "date" },
        "scope": { "enum": ["full", "partial", "conditional"] },
        "notes": { "type": "string" }
      }
    }
  }
  ```

### Validation

```bash
# Schema is valid JSON
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"JSON.parse(require('fs').readFileSync('data/schemas/blocs.schema.json'))\""
```

---

## Phase 2: Add EU Adequacy Decisions

### Tasks

- [ ] 2.1 Add `adequacyDecisions` array to EU bloc in `data/blocs/blocs.json`

EU Adequacy Decisions (as of 2024):
| Country | Date | Scope |
|---------|------|-------|
| Andorra | 2010-10-21 | full |
| Argentina | 2003-07-05 | full |
| Canada | 2001-12-20 | partial (commercial) |
| Faroe Islands | 2010-03-05 | full |
| Guernsey | 2003-11-21 | full |
| Israel | 2011-01-31 | full |
| Isle of Man | 2004-04-28 | full |
| Japan | 2019-01-23 | full |
| Jersey | 2008-05-08 | full |
| New Zealand | 2012-12-19 | full |
| South Korea | 2021-12-17 | full |
| Switzerland | 2000-07-26 | full |
| United Kingdom | 2021-06-28 | conditional |
| Uruguay | 2012-08-21 | full |
| USA (DPF) | 2023-07-10 | partial (DPF certified) |

### Validation

```bash
# Blocs file is valid JSON
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"JSON.parse(require('fs').readFileSync('data/blocs/blocs.json'))\""

# EU bloc has adequacyDecisions
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && node -e \"
const blocs = JSON.parse(require('fs').readFileSync('data/blocs/blocs.json'));
const eu = blocs.itemListElement.find(b => b.identifier === 'eu');
if (!eu) throw new Error('EU bloc not found');
if (!eu.adequacyDecisions) throw new Error('EU missing adequacyDecisions');
console.log('EU adequacy decisions:', eu.adequacyDecisions.length);
\""
```

---

## Phase 3: Add UK Adequacy Decisions

### Tasks

- [ ] 3.1 Add `adequacyDecisions` array to UK bloc (if exists) or note for future

UK Adequacy Decisions (post-Brexit):
| Country | Date | Scope |
|---------|------|-------|
| EEA countries | 2021-01-01 | full (inherited) |
| (others TBD) | | |

### Validation

```bash
# Validation passes
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"
```

---

## Phase 4: Verify Hugo Access

### Tasks

- [ ] 4.1 Verify Hugo can access adequacy decisions via `site.Data.blocs.blocs.itemListElement[].adequacyDecisions`

### Validation

```bash
# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"
```

---

## Success Criteria

- [ ] `data/schemas/blocs.schema.json` includes `adequacyDecisions` definition
- [ ] EU bloc has complete `adequacyDecisions` array (15+ countries)
- [ ] UK bloc has `adequacyDecisions` array (if bloc exists)
- [ ] `npm run validate` passes
- [ ] Hugo builds successfully

---

## Notes

- Adequacy decisions are granted BY a bloc TO a country
- The EU grants adequacy to non-EU countries allowing free data flow
- UK post-Brexit has its own adequacy framework
- Historical/revoked decisions (e.g., US Safe Harbor, Privacy Shield) not included - only current valid decisions

---

## References

- [EU Adequacy Decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en)
- [UK Adequacy Regulations](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/international-transfers-a-guide/)
