# Architecture Decisions

## Framework
Next.js 14 with App Router chosen for:
- Built-in SSR/SSG support per route
- File-based routing reducing boilerplate
- Server Components reducing client JS bundle

## Rendering Strategy Per Route

| Route | Strategy | Reason |
|---|---|---|
| `/` | SSG (revalidate 24h) | Static content, SEO critical, rarely changes |
| `/teachers` | SSR (force-dynamic) | Dynamic filters, SEO needed, data changes often |
| `/teachers/[id]` | SSR (force-dynamic) | Per-teacher dynamic data, SEO critical |
| `/booking` | CSR | Auth required, no SEO value |
| `/dashboard` | CSR | Personal data, auth required, no SEO value |

## State Management
- **Zustand** for client/UI state (booking flow, modal state, auth)
  - Chosen over Redux: less boilerplate, simpler API, sufficient for this scale
  - Chosen over Context: avoids unnecessary re-renders
- **React Query** for server state (teachers, sessions, bookings)
  - Handles caching, background refetch, loading/error states automatically
  - Reduces manual fetch logic significantly
- **Next.js Router** for URL state (filters, pagination)

## Component Architecture
- Atomic design: ui → domain → layout
- Each component owns its TypeScript interface
- No prop drilling beyond two levels — store or composition used instead
- Styling: TailwindCSS — utility-first, no style leakage, consistent

## Data Flow
User Action → Zustand Store Update → React Query Fetch → UI Re-render
