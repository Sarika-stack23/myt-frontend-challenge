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
