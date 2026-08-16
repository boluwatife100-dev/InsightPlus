# Product Requirements Document (PRD)
## InsightLoop — AI-Powered Customer Feedback Analytics

---

### 1. Overview
InsightLoop turns raw customer feedback into clear business decisions automatically. Instead of dumping responses into a spreadsheet, InsightLoop collects feedback, tags it (sentiment + recurring theme), and surfaces the most important issue a business should act on — in a live dashboard.

**One-liner:** "Other tools collect feedback. We turn it into decisions — automatically."

---

### 2. Problem Statement
Businesses collect customer feedback through forms and surveys, but rarely have the time or tools to translate it into action. Existing tools (Google Forms, SurveyMonkey, Typeform) are built to *collect* responses, not *interpret* them — someone still has to manually read through everything to find what matters.

---

### 3. Target Users
- **Primary (paying customer):** small-to-medium business owners — restaurants, salons, gyms, retail shops, clinics, event organizers — who don't have budget for enterprise tools like Qualtrics.
- **Secondary (end user):** the business's own customers/patients/students who submit feedback. No login required for this group — friction-free by design.

---

### 4. Goals & Success Metrics (Hackathon Demo)
- A working end-to-end pipeline: submission → automatic tagging → live dashboard update.
- Judges can submit feedback live via QR code and watch the dashboard update in real time during the pitch.
- Clear evidence (survey data + scorecard) presented up front to justify why this problem/project was chosen.

---

### 5. Core Features (MVP)
1. Public feedback form (no login) — star rating, short comment, category dropdown.
2. QR code / shareable link entry point.
3. Confirmation screen after submission.
4. Business login/signup (may be simplified/mocked for the demo — see Out of Scope).
5. Live dashboard: overall satisfaction score, new feedback count, AI insight summary, customer issues breakdown, recent feedback feed, recommended action card.
6. Automatic sentiment tagging (positive/neutral/negative) + theme clustering (e.g. "slow delivery," "pricing concerns").
7. "Top issue this week" callout.
8. Live sentiment gauge (visual, updates in real time).

---

### 6. Screens
1. **Landing page** — hero ("Turn customer feedback into better business decisions"), how-it-works section, trusted-by logos, testimonials.
2. **Login / Signup** — business owner authentication entry point.
3. **Dashboard (Overview)** — sidebar nav (Overview, Feedback, AI Insight, Settings), overall satisfaction score + chart, new feedback count, AI insight summary, recommended action, customer issues breakdown, recent feedback feed.
4. **Feedback submission form** — public, mobile-first, no login.
5. **Confirmation screen** — "Thanks for your feedback!"

---

### 7. User Flow (Pipeline)
Business signs up → gets their unique link/QR code → shares it with customers → customer submits feedback (no login) → system auto-tags sentiment & theme → dashboard updates live with insights and a recommended action.

---

### 8. Design System
Reference: Figma "SHF Project" file.
- **Primary color:** purple/violet
- **Backgrounds:** lavender / white
- **Components:** rounded cards, soft shadows, clean sans-serif typography
- **Charts:** bar charts (satisfaction trend), progress bars (issue breakdown)
- All screens must match this palette and typography exactly — no new colors or fonts introduced.

---

### 9. Tech Stack
- **Frontend:** React (Vite)
- **Backend/DB:** Firebase or Supabase (real-time)
- **Charts:** Recharts or Chart.js
- **Hosting:** Vercel or Netlify
- **Design:** Figma

---

### 10. Out of Scope (Hackathon Version)
- Full production authentication system (use a single mocked demo business account)
- Multi-business account switching
- Payment/billing
- PDF export
- Email notifications
- Admin roles / permissions

---

### 11. Team & Roles
- **Data Analyst:** research, problem validation, metric definitions, tagging logic, dashboard KPIs.
- **UI/UX Designer:** Figma designs, design system, screen flows.
- **Frontend Developer:** builds all UI screens, connects to backend per API contract.
- **Backend Developer:** database, API endpoints, real-time data pipeline, sentiment/theme tagging logic.

---

### 12. Repository Structure Note
Single repository with a dedicated `/frontend` folder for the frontend developer's work. Frontend developer commits to a feature branch (never `main`) to keep deployment stable for the backend developer.
