# MyYogaTeacher Frontend Challenge

Production-grade React/Next.js frontend for a live yoga session booking marketplace.

## Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS
- **State**: Zustand (client) + React Query (server)
- **Testing**: Jest + React Testing Library + Playwright
- **CI/CD**: GitHub Actions + Lighthouse CI

## Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Tests with coverage |
| `npm run test:e2e` | Playwright e2e tests |
| `npm run lhci` | Lighthouse CI audit |
| `npm run type-check` | TypeScript check |
| `npm run lint` | ESLint check |

## Project Structure
See `docs/architecture.md` for full breakdown.

## Performance Results
See `docs/performance-report.md` for before/after Lighthouse scores.

## AI Tooling
See `docs/ai-tooling.md` for full workflow documentation.

## Accessibility
See `docs/accessibility.md` for WCAG 2.1 AA compliance details.

## Components
8 production-grade components across 3 domains:
- **UI**: Button, Avatar, Badge, Modal, Spinner
- **Teacher**: TeacherCard, TeacherProfile, TeacherFilter
- **Booking**: SessionSlot, PaymentSummary, BookingModal
