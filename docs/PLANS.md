# Implementation Plans

How we plan, track, and implement features and fixes.

---

## Folder Structure

```
docs/plans/
├── backlog/      # Approved plans waiting for implementation
├── active/       # Currently being worked on (max 1-2 at a time)
└── completed/    # Done - kept for reference
```

### Flow

```
GitHub Issue → PLAN file in backlog/ → active/ → completed/
                     ↓
            (or INVESTIGATE file first if unclear)
```

---

## File Types

### PLAN-*.md

For work that is **ready to implement**. The scope is clear, the approach is known.

**When to create:**
- Bug fix with known solution
- Feature request with clear requirements
- Refactoring with defined scope

**Naming:** `PLAN-<short-name>.md` or `PLAN-<nn>-<short-name>.md`

Examples:
- `PLAN-mobile-responsiveness.md`
- `PLAN-01-countries-data-migration.md`
- `PLAN-add-search.md`

### INVESTIGATE-*.md

For work that **needs research first**. The problem exists but the solution is unclear.

**When to create:**
- Complex refactoring where options need evaluation
- Bug with unknown root cause
- Feature requiring design decisions

**Naming:** `INVESTIGATE-<topic>.md`

Examples:
- `INVESTIGATE-datastructure.md`
- `INVESTIGATE-performance-issues.md`

**After investigation:** Create one or more PLAN files with the chosen approach.

---

## Plan Structure

Every plan has these sections:

### 1. Header (Required)

```markdown
# Plan Title

## Status: Backlog | Active | Blocked | Completed

**Goal**: One sentence describing what this achieves.

**GitHub Issue**: #42 (if applicable)

**Last Updated**: 2026-01-11
```

### 2. Dependencies (If applicable)

```markdown
**Prerequisites**: Plan 01 must be complete first
**Blocks**: Plan 03 cannot start until this is done
**Priority**: High | Medium | Low
```

### 3. Problem Summary (Required)

What's wrong or what's needed. Be specific.

### 4. Phases with Tasks (Required)

Break work into phases. Each phase has:
- Numbered tasks
- A validation step at the end

```markdown
## Phase 1: Setup

### Tasks

- [ ] 1.1 Create the schema file
- [ ] 1.2 Add validation rules
- [ ] 1.3 Test with sample data

### Validation

\`\`\`bash
# Command to verify this phase is complete
npm run validate
\`\`\`

---

## Phase 2: Implementation

### Tasks

- [ ] 2.1 Update the template
- [ ] 2.2 Fix the CSS
- [ ] 2.3 Add responsive breakpoints

### Validation

\`\`\`bash
# Hugo builds without errors
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Manual check: http://localhost:1313/page/
\`\`\`
```

### 5. Acceptance Criteria (Required)

```markdown
## Acceptance Criteria

- [ ] Feature works on desktop
- [ ] Feature works on mobile (375px)
- [ ] No console errors
- [ ] `npm run validate` passes
- [ ] Hugo builds successfully
```

### 6. Implementation Notes (Optional)

Technical details, gotchas, code patterns to follow.

### 7. Files to Modify (Optional but helpful)

```markdown
## Files to Modify

- `layouts/partials/home/custom.html`
- `assets/css/custom.css`
```

---

## Status Values

| Status | Meaning | Location |
|--------|---------|----------|
| `Backlog` | Approved, waiting to start | `backlog/` |
| `Active` | Currently being worked on | `active/` |
| `Blocked` | Waiting on something else | `backlog/` or `active/` |
| `Completed` | Done | `completed/` |

---

## Updating Plans During Implementation

**Critical:** Plans are living documents. Update them as you work.

### When starting a phase:

```markdown
## Phase 2: Implementation — IN PROGRESS
```

### When completing a task:

```markdown
- [x] 2.1 Update the template ✓
- [ ] 2.2 Fix the CSS
```

### When a phase is done:

```markdown
## Phase 2: Implementation — ✅ DONE
```

### When blocked:

```markdown
## Status: Blocked

**Blocked by**: Waiting for design decision on card layout
```

### When complete:

1. Update status: `## Status: Completed`
2. Add completion date: `**Completed**: 2026-01-11`
3. Move file: `mv docs/plans/active/PLAN-xyz.md docs/plans/completed/`
4. Close GitHub issue: `gh issue close 42 --comment "Fixed in commit abc123"`

---

## Validation Requirements

Every phase MUST end with a validation step. This ensures:
- Work is verifiable
- Claude can confirm completion
- Regressions are caught

**Good validation:**

```markdown
### Validation

\`\`\`bash
# Specific command that proves this works
docker exec relaxed_napier bash -c "cd /workspaces/sovereignsky-site && npm run validate"

# Expected output
# ✓ All schemas valid
# ✓ All integrity checks passed
\`\`\`
```

**Bad validation:**

```markdown
### Validation

Check that it works.
```

---

## Plan Templates

### Simple Bug Fix

```markdown
# Fix: [Bug Description]

## Status: Backlog

**Goal**: [One sentence]

**GitHub Issue**: #XX

**Last Updated**: YYYY-MM-DD

---

## Problem

[What's broken]

## Solution

[How to fix it]

---

## Phase 1: Fix

### Tasks

- [ ] 1.1 [Specific change]
- [ ] 1.2 [Another change]

### Validation

\`\`\`bash
[Command to verify]
\`\`\`

---

## Acceptance Criteria

- [ ] Bug is fixed
- [ ] No regressions
- [ ] Hugo builds successfully
```

### Feature Implementation

```markdown
# Feature: [Feature Name]

## Status: Backlog

**Goal**: [One sentence]

**GitHub Issue**: #XX

**Last Updated**: YYYY-MM-DD

---

## Overview

[What this feature does and why]

---

## Phase 1: [Setup/Preparation]

### Tasks

- [ ] 1.1 [Task]
- [ ] 1.2 [Task]

### Validation

\`\`\`bash
[Command]
\`\`\`

---

## Phase 2: [Core Implementation]

### Tasks

- [ ] 2.1 [Task]
- [ ] 2.2 [Task]
- [ ] 2.3 [Task]

### Validation

\`\`\`bash
[Command]
\`\`\`

---

## Phase 3: [Polish/Testing]

### Tasks

- [ ] 3.1 Test on desktop
- [ ] 3.2 Test on mobile
- [ ] 3.3 Fix any issues found

### Validation

\`\`\`bash
[Command]
\`\`\`

---

## Acceptance Criteria

- [ ] [Criterion]
- [ ] [Criterion]
- [ ] Works on mobile
- [ ] Hugo builds successfully

---

## Implementation Notes

[Technical details, patterns to follow, gotchas]

## Files to Modify

- `path/to/file.html`
- `path/to/other.css`
```

### Investigation

```markdown
# Investigate: [Topic]

## Status: Backlog

**Goal**: Determine the best approach for [topic]

**Last Updated**: YYYY-MM-DD

---

## Questions to Answer

1. [Question 1]
2. [Question 2]
3. [Question 3]

---

## Current State

[What exists now]

---

## Options

### Option A: [Name]

**Pros:**
- 

**Cons:**
- 

### Option B: [Name]

**Pros:**
- 

**Cons:**
- 

---

## Recommendation

[After investigation, what do we do?]

---

## Next Steps

- [ ] Create PLAN-xyz.md with chosen approach
- [ ] [Other follow-up]
```

---

## Working with Claude Code

When implementing a plan, tell Claude Code:

```
Implement docs/plans/active/PLAN-xyz.md
```

Claude Code should:

1. **Read the plan first** - understand the full scope
2. **Work phase by phase** - don't skip ahead
3. **Run validation** after each phase
4. **Update the plan** - mark tasks complete, note issues
5. **Stop if blocked** - update status and explain why

### Example prompt for Claude Code:

```
Read and implement docs/plans/active/PLAN-mobile-responsiveness.md

Work through each phase in order. After each phase:
1. Run the validation commands
2. Update the plan file to mark completed tasks
3. Only proceed if validation passes

If you encounter issues, update the plan with notes and ask for guidance.
```

---

## Best Practices

1. **One active plan at a time** - finish before starting another
2. **Small phases** - easier to validate and recover from errors
3. **Specific tasks** - "Update line 42 in file.html" not "Fix the thing"
4. **Runnable validation** - commands, not descriptions
5. **Update as you go** - the plan is the source of truth
6. **Link GitHub issues** - traceability
7. **Keep completed plans** - they're documentation
