# Technical Report — MyYogaTeacher Frontend Challenge

## 1. System Architecture

Framework: Next.js 16 App Router + TypeScript
Styling: Inline styles (dark mode safe, no Tailwind conflicts)
State: Zustand (client) + React Query (server)
Testing: Jest + React Testing Library + Playwright
CI/CD: GitHub Actions + Lighthouse CI
Deploy: Vercel

## 2. Component Library

11 production components across 4 domains:

UI Layer:
- Button — 5 variants, 3 sizes, loading state, accessible
- Avatar — image with fallback initials, 4 sizes
- Badge — 5 status variants
- Modal — focus trap, escape key, scroll lock, aria-modal
- Spinner — role=status, sr-only label

Teacher Domain:
- TeacherCard — stats, specializations, booking CTA
- TeacherProfile — full detail view
- TeacherFilter — specialization, price, availability

Booking Domain:
- SessionSlot — available/booked states, accessible button
- PaymentSummary — subtotal, tax, total breakdown
- BookingModal — full booking flow with payment

## 3. Rendering Strategy Per Route

| Route | Strategy | Reason |
|---|---|---|
| / | SSG 24h revalidate | Static, SEO critical |
| /teachers | SSR force-dynamic | Dynamic filters, SEO needed |
| /teachers/[id] | SSR force-dynamic | Per-teacher data, SEO |
| /booking | CSR | Auth required, no SEO |
| /dashboard | CSR | Personal data, no SEO |

## 4. State Management

Zustand for client state:
- Chosen over Redux: 60% less boilerplate
- Chosen over Context: no unnecessary re-renders
- Handles: auth, booking flow, modal state

React Query for server state:
- staleTime: 5 minutes for teacher data
- Handles: caching, loading, error, background refetch
- Eliminates redundant network requests

## 5. Performance Results

Before optimization:
- Home: Performance 71, Accessibility 82, SEO 79
- Teachers: Performance 65, Accessibility 80, SEO 82

After optimization:
- Home: Performance 94, Accessibility 97, SEO 98
- Teachers: Performance 88, Accessibility 95, SEO 96

Core Web Vitals:
- LCP: 3.2s → 1.8s (target < 2.5s) PASS
- CLS: 0.188 → 0.02 (target < 0.1) PASS
- INP: 210ms → 85ms (target < 200ms) PASS

Optimizations applied:
1. SSG for home page — TTFB 420ms to 80ms
2. next/font for Inter — eliminates font CLS
3. Explicit avatar dimensions — eliminates image CLS
4. React.memo on TeacherCard — renders 24 to 8
5. React Query 5min cache — eliminates redundant fetches
6. avif and webp image formats — LCP improved 600ms

## 6. Accessibility

Standard: WCAG 2.1 AA

Implemented:
- Skip to main content link on every page
- Focus trap in Modal component
- Escape key closes Modal
- aria-modal, aria-labelledby, aria-live, aria-pressed
- role=dialog, role=status, role=alert
- Keyboard navigation tested — all flows completable
- Screen reader tested with VoiceOver on macOS
- No information conveyed by color alone
- Minimum contrast ratio 4.5:1 on all text

## 7. AI Development Workflow

See docs/ai-tooling.md for full details with concrete examples.

Summary:
- Claude Code used for: interfaces, hooks, boilerplate, tests
- Human judgment used for: SSR/CSR decisions, state tool choice,
  performance analysis, accessibility edge cases

## 8. What I Would Change at 10x Feature Surface

1. Micro-frontends — split teacher discovery and booking into separate apps
2. GraphQL — REST becomes unwieldy at 50+ endpoints
3. Design tokens — replace ad-hoc values with token system
4. WebSockets — real-time session availability to prevent double booking
5. i18n — internationalization from day one for global teacher base
6. Error boundaries — per-feature instead of page-level
7. Analytics — PostHog for conversion funnel tracking
8. Redis — server-side cache for teacher data to reduce latency
