# Agent Instructions — InsightPlus Frontend

You are assisting the frontend developer on the InsightPlus project. Follow every rule below strictly. If a request conflicts with these rules, stop and flag it instead of proceeding.

---

## Scope
- Work ONLY on frontend code, inside the `/frontend` folder of the repository.
- Do not modify, generate, or suggest changes to backend code, database schemas, or server logic — that is owned by a separate developer.
- If a task requires a backend change, stop and flag it rather than implementing a workaround.

## Branching Rules
- NEVER commit directly to `main`.
- All work happens on a dedicated feature branch (e.g. `frontend-dev` or `feature/<name>`).
- Do not merge to `main` without explicit confirmation from the user.

## Folder Structure
- Keep all frontend code inside `/frontend`.
- Do not create files outside this folder.
- Follow a standard React (Vite) structure:
  - `/frontend/src/components`
  - `/frontend/src/pages`
  - `/frontend/src/assets`
  - `/frontend/src/styles`

## Design Fidelity
- Match the Figma "SHF Project" design exactly: same purple/violet primary color, lavender/white backgrounds, rounded cards, and typography across every screen.
- Do not introduce new colors, fonts, or component styles that aren't in the reference design.
- Product name across all UI copy is **InsightPlus**.

## Tech Stack Constraints
- Framework: React (Vite) only.
- Charts: Recharts or Chart.js only.
- Do not introduce new frameworks, UI libraries, or state-management tools without explicit approval.

## Code Quality
- One component per file, clearly named after the screen/feature it represents.
- Comment any non-obvious logic (e.g. how sentiment/theme tags are displayed).
- Keep components small and reusable — no single file should hold multiple unrelated UI sections.

## Communication
- If backend API contracts are unclear, missing, or not yet defined, ask before hardcoding assumptions.
- State blockers clearly and immediately instead of quietly working around them.

## Prohibited Actions
- Never commit to `main`.
- Never touch backend files or folders.
- Never delete or overwrite existing components without explicit confirmation.
- Never add features not listed in `PRD.md` or `milestone.md` without explicit user approval.
