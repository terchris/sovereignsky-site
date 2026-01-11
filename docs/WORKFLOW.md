# Issue to Implementation Workflow

How GitHub issues become implemented features.

---

## The Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  1. USER: "Claude, work on issue #42"                               │
│                                                                     │
│  2. CLAUDE:                                                         │
│     - Reads the issue                                               │
│     - Adds "approved" label                                         │
│     - Creates PLAN-*.md or INVESTIGATE-*.md in backlog/             │
│     - Asks user to review the plan                                  │
│                                                                     │
│  3. USER: Reviews and edits the plan, then confirms                 │
│                                                                     │
│  4. CLAUDE:                                                         │
│     - Moves plan to active/                                         │
│     - Implements phase by phase                                     │
│     - Runs validation after each phase                              │
│     - Updates plan with progress                                    │
│                                                                     │
│  5. USER: Reviews result                                            │
│                                                                     │
│  6. CLAUDE:                                                         │
│     - Moves plan to completed/                                      │
│     - Closes the GitHub issue                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Pick an Issue

Look at open issues:

```bash
gh issue list
```

Tell Claude which one to work on:

```
"Work on issue #42"
```

or

```
"Look at the open issues and pick the highest priority one"
```

---

## Step 2: Claude Creates a Plan

Claude will:

1. **Read the issue**: `gh issue view 42`
2. **Add label**: `gh issue edit 42 --add-label "approved"`
3. **Create plan file** in `docs/plans/backlog/`:
   - `PLAN-*.md` if the solution is clear
   - `INVESTIGATE-*.md` if research is needed first
4. **Ask you to review** the plan

### What Claude writes in the plan:

- Problem summary from the issue
- Phases with numbered tasks
- Validation commands for each phase
- Acceptance criteria
- Files to modify

---

## Step 3: Review the Plan

Open the plan file and review it:

- Are the phases in the right order?
- Are the tasks specific enough?
- Is anything missing?
- Are the validation steps correct?

Edit the file if needed.

When satisfied, tell Claude:

```
"Plan approved, start implementation"
```

---

## Step 4: Claude Implements

Claude will:

1. **Move plan to active/**:
   ```bash
   mv docs/plans/backlog/PLAN-xyz.md docs/plans/active/
   ```

2. **Work phase by phase**:
   - Complete tasks in order
   - Run validation after each phase
   - Update the plan file (mark tasks complete)
   - Stop if validation fails

3. **Ask for help** if blocked or unclear

---

## Step 5: Review Result

Check the changes:

- Does it work on desktop?
- Does it work on mobile?
- Any console errors?

If changes needed, tell Claude what to fix.

If good, tell Claude:

```
"Looks good, complete it"
```

---

## Step 6: Claude Completes

Claude will:

1. **Move plan to completed/**:
   ```bash
   mv docs/plans/active/PLAN-xyz.md docs/plans/completed/
   ```

2. **Update plan status**: `## Status: Completed`

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Fix: [description] - closes #42"
   git push
   ```

4. **Close the issue**:
   ```bash
   gh issue close 42 --comment "Fixed in commit [hash]"
   ```

---

## Quick Reference

### Commands to give Claude:

| You say | Claude does |
|---------|-------------|
| "Work on issue #42" | Reads issue, creates plan, asks for review |
| "Plan approved" | Moves to active/, starts implementing |
| "Looks good, complete it" | Moves to completed/, closes issue |
| "Stop" | Pauses and waits for instructions |

### Issue labels:

| Label | Meaning |
|-------|---------|
| `triage` | New, needs review |
| `approved` | Ready to implement |
| `in-progress` | Currently being worked on |
| `needs-info` | Waiting for clarification |

---

## Example Session

```
YOU: Work on issue #5

CLAUDE: I've read issue #5 about mobile responsiveness. I've:
        - Added the "approved" label
        - Created docs/plans/backlog/PLAN-mobile-responsiveness.md
        
        Please review the plan and let me know if it looks good
        or needs changes.

YOU: [reviews file, makes edits]
     Plan approved, start implementation

CLAUDE: Moving to active/ and starting Phase 1...
        [works through phases, updating plan]
        
        Phase 2 complete. Validation passed. 
        Continuing to Phase 3...
        
        All phases complete. Please review the result at
        http://localhost:1313

YOU: Looks good, complete it

CLAUDE: Done! I've:
        - Moved plan to completed/
        - Committed with message "Fix mobile responsiveness - closes #5"
        - Closed issue #5
```
