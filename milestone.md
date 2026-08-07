# Milestones — InsightPlus (Frontend Build)

Use this file as the working checklist. Complete phases in order — do not start a later phase before the current one is functionally done.

---

## Phase 0 — Setup
- [ ] Clone the repository
- [ ] Create a `/frontend` folder at the repo root for all frontend code
- [ ] Initialize a React (Vite) project inside `/frontend`
- [ ] Create and switch to a dedicated branch (e.g. `frontend-dev`) — never work on `main`
- [ ] Install dependencies: `recharts` (or `chart.js`), `react-router-dom`
- [ ] Pull design tokens (colors, fonts, spacing) from the Figma "SHF Project" file and document them in `/frontend/src/styles/tokens.css` or equivalent

## Phase 1 — Static Screens (no live data yet)
- [ ] Landing page: hero section, "how it works" 3-step section, testimonials, trusted-by logos
- [ ] Login / Signup page (UI shell — functional auth is optional for MVP)
- [ ] Feedback submission form (public route, no login required)
- [ ] Confirmation screen ("Thanks for your feedback!")
- [ ] Dashboard layout shell: sidebar nav (Overview, Feedback, AI Insight, Settings) + empty widget placeholders

## Phase 2 — Dashboard Components
- [ ] Overall satisfaction score card + bar chart
- [ ] New feedback count card
- [ ] AI insight summary card
- [ ] Recommended action card
- [ ] Customer issues breakdown (labeled progress bars)
- [ ] Recent feedback feed (star rating + comment list)
- [ ] Live sentiment gauge component
- [ ] "Top issue this week" callout card

## Phase 3 — Backend Integration
- [ ] Confirm API contract / data schema with backend developer before wiring anything
- [ ] Connect submission form to the backend endpoint
- [ ] Connect dashboard widgets to the live data source
- [ ] Implement real-time updates (polling or realtime listener, per backend setup)
- [ ] Handle loading, empty, and error states on every data-driven screen

## Phase 4 — Polish & QA
- [ ] Responsive pass: form optimized for mobile, dashboard optimized for desktop/large screen
- [ ] Pixel-check spacing, typography, and color against the Figma reference
- [ ] Test the full QR code → form → dashboard flow on an actual phone
- [ ] Seed fallback demo data so the dashboard never appears empty if live submissions are slow

## Phase 5 — Demo Readiness
- [ ] Full team rehearsal of the live demo flow
- [ ] Confirm the deployed build (Vercel/Netlify) works reliably on venue Wi-Fi
- [ ] Freeze the feature branch — merge to `main` only after explicit team review and approval
