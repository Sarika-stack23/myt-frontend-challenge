# AI-Assisted Development Workflow

## Tools Used
- Claude Code — primary agentic coding assistant
- Cursor — inline completions and refactoring

## Where AI Accelerated Work

### 1. Boilerplate Generation
- Generated TypeScript interfaces from plain English descriptions
- Scaffolded all service layer files in minutes
- Generated React Query hook patterns consistently

### 2. Accessibility Attributes
- AI correctly suggested aria-label, aria-pressed, aria-live
- Suggested keyboard trap pattern for Modal component
- Added sr-only skip link automatically

### 3. Tailwind Class Suggestions
- Consistent use of focus:ring, hover states, transition classes
- Responsive breakpoint suggestions were accurate

### 4. Test Scaffolding
- Generated Jest test structure for components
- Suggested edge cases: empty states, loading states, error states

## Where AI Was Overridden

### 1. SSR Strategy
- AI initially suggested SSG for /teachers
- Overridden: /teachers uses dynamic filters so SSR is correct
- Human judgment: understanding SEO + dynamic data trade-off

### 2. State Management Choice
- AI suggested Redux Toolkit
- Overridden: Zustand chosen for simplicity at this scale
- Human judgment: right tool for scope, not default enterprise choice

### 3. Modal Accessibility
- AI generated a basic modal without focus trap
- Corrected manually: added focus management, Escape key handler,
  body scroll lock, and aria-modal attribute

### 4. Error Boundaries
- AI did not add error boundaries on data fetching components
- Added manually around TeachersClient and TeacherDetailClient

## Point of View
AI is excellent at: repetitive patterns, boilerplate, remembering
aria attributes, generating consistent code across files.

AI falls short at: architectural decisions, trade-off reasoning,
understanding business context, accessibility edge cases,
performance root cause analysis.

Human judgment is irreplaceable for: rendering strategy decisions,
state management scoping, performance profiling interpretation,
and reviewing AI output for correctness before shipping.
