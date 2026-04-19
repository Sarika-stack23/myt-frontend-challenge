# AI-Assisted Development Workflow

## Tools Used
- Claude Code — primary agentic coding assistant
- Cursor — inline completions and refactoring

## Concrete Example 1 — TypeScript Interfaces
**Prompt:** "Generate TypeScript interfaces for Teacher, Session, Booking, User"
**Result:** AI generated all 4 interfaces correctly in 30 seconds
**Time saved:** 45 minutes
**Action:** Accepted as-is

## Concrete Example 2 — React Query Hooks
**Prompt:** "Generate useTeachers hook with filters and 5min stale time"
**Result:** AI generated correct hook pattern
**Time saved:** 20 minutes per hook x 4 hooks = 80 minutes
**Action:** Accepted with minor edits

## Concrete Example 3 — Accessibility Attributes
**Prompt:** "Add proper aria attributes to Modal component"
**Result:** AI added aria-modal, aria-labelledby, role=dialog
**Time saved:** 30 minutes of research
**Action:** Accepted but added focus trap manually

## Where AI Was Overridden

### Override 1 — SSR Strategy
AI suggested SSG for /teachers page.
Overridden to SSR because /teachers has dynamic filters.
SSG would serve wrong cached HTML for filtered results.

### Override 2 — State Management
AI suggested Redux Toolkit.
Overridden to Zustand — 60% less code for same functionality.
Redux is overkill at this scale.

### Override 3 — Modal Accessibility
AI generated modal without focus trap or Escape key handler.
Added manually: focus management, keyboard trap, body scroll lock.

## My Point of View

AI helps most with:
- Boilerplate and repetitive patterns
- Remembering aria attributes
- Generating consistent code across files
- Test scaffolding

Human judgment irreplaceable for:
- SSR vs SSG vs CSR decisions
- State management tool selection
- Performance root cause analysis
- Accessibility edge cases
- Component boundary decisions

Verdict: AI = velocity. Human = correctness. Both needed to ship production quality.
