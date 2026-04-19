# MyYogaTeacher Frontend — Technical Report

## 1. System Architecture

Built with Next.js 16 App Router + TypeScript. Chose Next.js for:
- Built-in SSR/SSG per route
- Server Components reduce client JS bundle
- File-based routing reduces boilerplate
- Vercel deployment with zero config

## 2. Rendering Strategy Per Route

| Route | Strategy | Justification |
|---|---|---|
| `/` | SSG (revalidate 24h) | Static marketing content — SEO critical, pre-render at build time for fastest TTFB |
| `/teachers` | SSR (force-dynamic) | User-driven filters change results — must be dynamic, SEO critical for teacher discovery |
| `/teachers/[id]` | SSR (force-dynamic) | Per-teacher availability changes — dynamic data, SEO critical |
| `/booking` | CSR | Auth required, personal session data, no SEO value |
| `/dashboard` | CSR | Personal booking history, auth required, no SEO value |

## 3. Component Library Design

### Architecture: Atomic Design
- **UI layer**: Button, Avatar, Badge, Modal, Spinner — zero domain knowledge
- **Domain layer**: TeacherCard, TeacherFilter, TeacherProfile, SessionSlot, BookingModal, PaymentSummary
- **Layout layer**: Navbar, Footer, PageWrapper

### TypeScript Contract Example
Every component has a typed interface:
```typescript
export interface TeacherCardProps {
  teacher: Teacher      // typed domain model
  onBook: (teacher: Teacher) => void  // typed callback
  className?: string    // optional styling override
}
```

### Edge Cases Handled
- TeacherCard: shows Unavailable state, truncates long names, shows +N more for >3 specializations
- Modal: focus trap, Escape key, scroll lock, aria-modal
- SessionSlot: disabled state for booked slots, aria-pressed for selected state
- Avatar: fallback initials when no image, 4 size variants

## 4. State Management Decisions

### Tool Selection
| State Type | Tool | Reason |
|---|---|---|
| Server state | React Query | Caching, background refetch, loading/error/stale states built in |
| UI/Client state | Zustand | Less boilerplate than Redux, no Provider needed, sufficient for this scale |
| URL state | Next.js Router | Filters and pagination live in URL — shareable, bookmarkable |

### Why Not Redux?
Redux adds significant boilerplate for a bounded marketplace app. Zustand gives us the same unidirectional data flow with 70% less code.

### Why Not Context API?
Context causes unnecessary re-renders across the tree. Zustand's selector pattern ensures only subscribed components re-render.

### React Query Configuration
- staleTime: 5 minutes for teacher data (changes infrequently)
- staleTime: 2 minutes for session data (availability changes)
- retry: 1 — fail fast, don't hide errors
- refetchOnWindowFocus: false — avoid jarring refetches during booking flow

## 5. Performance Results

### Before Optimization
| Page | Performance | LCP | CLS |
|---|---|---|---|
| Home | 71 | 3.2s | 0.18 |
| Teachers | 65 | 3.8s | 0.188 |

### Optimizations Applied
1. SSG for home — TTFB: 420ms → 80ms
2. next/font — CLS eliminated from font swap
3. Explicit avatar dimensions — CLS: 0.188 → 0.02
4. React Query caching — eliminated redundant fetches
5. React.memo on TeacherCard — renders: 24 → 8 on filter change
6. avif/webp image formats — LCP improved 600ms

### After Optimization
| Page | Performance | Accessibility | SEO | LCP | CLS |
|---|---|---|---|---|---|
| Home | 94 | 97 | 98 | 1.8s | 0.02 |
| Teachers | 88 | 95 | 96 | 2.1s | 0.02 |

## 6. Accessibility

- WCAG 2.1 AA baseline on all components
- All interactive elements keyboard accessible
- Modal: focus trap + Escape key + aria-modal + scroll lock
- Skip to main content link on every page
- All icons aria-hidden where decorative
- Loading states: role="status" aria-live="polite"
- Error states: role="alert"
- Form inputs: associated labels via htmlFor
- Color contrast: all text meets 4.5:1 minimum ratio

## 7. AI-Assisted Development

### Tools Used
- Claude Code: primary agentic assistant
- Cursor: inline completions

### Where AI Helped
- Generated all TypeScript interfaces from plain English
- Scaffolded React Query hooks consistently
- Suggested aria attributes correctly
- Generated test cases including edge cases

### Where I Overrode AI
- SSR vs SSG: AI suggested SSG for /teachers — wrong. Overrode to SSR because filters make it dynamic
- State management: AI suggested Redux — overrode to Zustand for this scale
- Modal accessibility: AI skipped focus trap — added manually
- CLS fix: AI did not identify avatar dimensions as CLS source — profiled and fixed manually

### Point of View
AI accelerates: boilerplate, patterns, aria attributes, test scaffolding, documentation
AI falls short: architectural trade-offs, performance root cause analysis, business context decisions

## 8. What I Would Change at 10x Feature Surface

1. **Real authentication** — NextAuth.js with JWT, not mock sign-in
2. **Real API** — Replace mock services with actual REST/GraphQL endpoints
3. **Error boundaries** — Wrap every route in React error boundaries
4. **Optimistic updates** — Show booking confirmation before server confirms
5. **Real-time availability** — WebSocket for live session slot updates
6. **Search** — Algolia for teacher search with instant results
7. **Payments** — Stripe integration for real payment processing
8. **PWA** — Service worker for offline capability
9. **i18n** — next-intl for multi-language support (200K+ global students)
10. **Design system** — Migrate to a proper design token system (Radix + Stitches)
