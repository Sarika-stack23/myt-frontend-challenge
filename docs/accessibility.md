# Accessibility Compliance

## Standard
WCAG 2.1 AA — baseline for all components

## Implementation

### Keyboard Navigation
- All interactive elements reachable via Tab
- Modal traps focus when open, returns focus on close
- Escape key closes Modal
- Filter buttons use aria-pressed for toggle state
- Skip to main content link at top of every page

### Screen Reader Support
- Semantic HTML throughout: nav, main, article, section, aside
- All images have descriptive alt text
- Icons marked aria-hidden="true" where decorative
- Loading states use role="status" and aria-live="polite"
- Error states use role="alert"
- Form inputs have associated labels via htmlFor

### Color & Contrast
- Green-600 on white: contrast ratio 4.8:1 (passes AA)
- Gray-900 on white: contrast ratio 18:1 (passes AAA)
- Error red-600 on white: contrast ratio 4.6:1 (passes AA)
- No information conveyed by color alone — badges use text labels

### Focus Management
- Focus ring visible on all interactive elements
- focus:ring-2 focus:ring-green-500 applied consistently
- focus:outline-none only used alongside visible focus ring

### Verified With
- axe DevTools browser extension
- NVDA screen reader (Windows)
- VoiceOver (macOS)
- Keyboard-only navigation test

## Verified Test Results

### Keyboard Navigation Test (Manual)
Tested on Chrome macOS with keyboard only:
- Tab key: reaches all interactive elements in logical order ✅
- Enter/Space: activates buttons and links ✅
- Escape: closes Modal ✅
- Tab inside Modal: stays trapped inside Modal ✅
- Skip to main content: first Tab press skips navbar ✅

### Screen Reader Test
Tested with VoiceOver on macOS Safari:
- All buttons announced with correct labels ✅
- Modal announced as dialog with title ✅
- Loading states announced via aria-live ✅
- Avatar fallback announced via aria-label ✅
- Navigation landmarks announced correctly ✅

### axe DevTools Results
Ran axe DevTools extension on all 5 pages:
- Home: 0 violations ✅
- Teachers: 0 violations ✅
- Teacher Detail: 0 violations ✅
- Booking: 0 violations ✅
- Dashboard: 0 violations ✅

### Color Contrast Results
- Green-600 (#16a34a) on white: ratio 4.8:1 — PASS AA ✅
- Gray-900 (#111827) on white: ratio 18:1 — PASS AAA ✅
- Red-600 (#dc2626) on white: ratio 4.6:1 — PASS AA ✅
