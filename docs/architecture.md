# Architecture Decisions

## Framework: Next.js 16 App Router

Chosen over alternatives because:
- Built-in per-route rendering strategy (SSR/SSG/CSR)
- Server Components reduce client JS bundle
- File-based routing reduces boilerplate
- Vercel deployment is zero-config

## Rendering Strategy

| Route | Strategy | Justification |
|---|---|---|
| / | SSG revalidate 24h | Static marketing content. SEO critical. Rarely changes. Pre-rendering gives fastest TTFB. |
| /teachers | SSR force-dynamic | Filter state is dynamic. SSG would serve wrong cached HTML. SEO needed for teacher discovery. |
| /teachers/[id] | SSR force-dynamic | Per-teacher data changes. SEO critical — teachers need to be discoverable by name. |
| /booking | CSR | Auth required. No SEO value. Highly interactive. No server rendering needed. |
| /dashboard | CSR | Personal user data. Auth required. No SEO value. |

## State Management

### Zustand for client/UI state
Handles: auth state, booking flow, modal open/close
Why Zustand over Redux: 60% less boilerplate, no Provider wrapper, same performance
Why Zustand over Context: no unnecessary re-renders on unrelated state changes

### React Query for server state
Handles: teachers, sessions, bookings
Why React Query: automatic caching, background refetch, loading/error states built in
staleTime: 5 minutes — balances freshness vs performance

### Next.js Router for URL state
Handles: filter params, pagination
Why URL: filters are shareable and bookmarkable

## Component Architecture

Follows atomic design pattern:
- ui/ — atoms: Button, Avatar, Badge, Modal, Spinner
- teacher/ — molecules: TeacherCard, TeacherFilter, TeacherProfile
- booking/ — molecules: SessionSlot, PaymentSummary, BookingModal
- layout/ — organisms: Navbar, Footer, PageWrapper

Rules enforced:
- No prop drilling beyond 2 levels
- Each component exports its TypeScript interface
- Each component handles its own edge cases
- No cross-domain imports (booking does not import teacher)

## Data Flow

User action
→ Zustand store update (UI state)
→ React Query cache check
→ Network request if stale (> 5 minutes)
→ Component re-render with new data

## Testing Strategy

Unit tests: Jest + React Testing Library
- Tests: Button, Avatar, Badge, Spinner, TeacherCard, PaymentSummary
- Hooks: useAuth store behavior

E2E tests: Playwright
- Tests: home page load, teachers page, navigation flows
- Runs against localhost:3000

CI/CD: GitHub Actions
- type-check on every push
- lint on every push
- build on every push
- Lighthouse CI on every push to main
