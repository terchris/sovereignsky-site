# Issue to Implementation Workflow

How issues become features on SovereignSky.

## The Flow

```
GitHub Issue → Triage → Plan File → Claude Code → PR → Merge → Done
     ↓           ↓          ↓            ↓         ↓
  (anyone)    (you)    (backlog/)   (implement)  (review)
```

## Step 1: Triage New Issues

When a new issue arrives:

1. Review the issue content
2. Add labels:
   - `approved` - good to implement
   - `needs-info` - ask clarifying questions
   - `wontfix` - explain why and close
   - `duplicate` - link to existing issue

3. If approved, decide:
   - **Quick fix**: Implement directly with Claude Code
   - **Larger feature**: Create a plan file first

## Step 2: Create Plan File (Optional)

For larger features, create `docs/plans/backlog/PLAN-<name>.md`:

```markdown
# Feature Name

## Status: Backlog

**GitHub Issue**: #42
**Goal**: One sentence description

---

## Requirements

From the issue:
- Requirement 1
- Requirement 2

## Implementation Notes

Technical details, file locations, etc.

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Works on mobile

## Files to Modify

- layouts/partials/...
- assets/css/...
```

## Step 3: Implement with Claude Code

### Option A: From GitHub Issue

```bash
# In the project directory
claude

# Then tell Claude Code:
"Implement GitHub issue #42. Read the issue first with gh issue view 42"
```

### Option B: From Plan File

```bash
claude

# Then tell Claude Code:
"Implement the plan in docs/plans/active/PLAN-feature-name.md"
```

### During Implementation

Move the plan file:
```bash
mv docs/plans/backlog/PLAN-feature.md docs/plans/active/
```

Update the status in the file:
```markdown
## Status: Active → In Progress
```

## Step 4: Review and Merge

1. Test the changes locally
2. Check mobile if relevant
3. Commit and push
4. Close the GitHub issue with a comment

## Step 5: Complete

Move the plan to completed:
```bash
mv docs/plans/active/PLAN-feature.md docs/plans/completed/
```

Update the status:
```markdown
## Status: Completed
**Completed**: 2026-01-11
```

---

## Quick Commands for Claude Code

```bash
# View an issue
"Read GitHub issue #42 using: gh issue view 42"

# Implement from issue
"Implement the feature requested in GitHub issue #42"

# Implement from plan
"Read and implement docs/plans/active/PLAN-xyz.md"

# Check the result
"Run the Hugo server and verify the changes work"
```

## Labels Reference

| Label | When to Use |
|-------|-------------|
| `triage` | Auto-added to new issues |
| `approved` | Ready to implement |
| `in-progress` | Currently being worked on |
| `blocked` | Waiting on something |
| `needs-info` | Need more details from reporter |

---

*This workflow keeps you in control while letting anyone suggest improvements.*
