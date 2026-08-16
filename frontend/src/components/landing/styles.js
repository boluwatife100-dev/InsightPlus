/* ============================================================
   Landing page — shared class strings.

   The marketing page is styled entirely with Tailwind utilities.
   Colours, radii and shadows come from the design tokens in
   styles/tokens.css so this page stays in sync with the rest of
   the app (single source of truth, no duplicated hex values).

   Breakpoints mirror the original marketing design:
     < 721px   phone
     ≥ 721px   tablet
     ≥ 861px   small laptop (3-up steps, 4-up testimonials)
     ≥ 1101px  desktop (full nav + dashboard sidebar)

   Every utility is written out in full below. Tailwind scans this
   file as plain text, so class names must never be built by string
   concatenation (`px-` + size) or they will not be generated.
   ============================================================ */

// Page gutter shared by the header, every section and the footer.
export const CONTAINER = 'mx-auto w-full bg-white  p-6'

// Violet brand wash used on avatars, badges and icon tiles.
export const BRAND_GRADIENT =
  'bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-deep))]'

// Mirrors --ease-out in tokens.css (Tailwind can't read a var() here).
export const EASE_OUT = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

// 44px tap target: header hamburger + drawer close button.
export const ICON_BUTTON =
  'inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text)]'

// Vertical rhythm for the marketing sections below the hero.
export const SECTION_Y = 'py-12 min-[721px]:py-24'

// Nav row / drawer links share this hover treatment.
export const NAV_LINK_HOVER =
  'transition-colors duration-150 hover:bg-[var(--color-primary-faint)] hover:text-[var(--color-primary-deep)]'

/* ---- Buttons ----
   The border colour is declared per variant, never on the shared base.
   Two competing border-color utilities land in the same Tailwind layer,
   and the winner is decided by stylesheet order rather than class order. */
const BTN =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold leading-tight tracking-[0.01em] whitespace-nowrap transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]'

export const BTN_VARIANT = {
  primary: `${BTN} border border-transparent bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-deep))] text-white shadow-[0_4px_14px_rgba(124,58,237,0.28)] hover:text-white hover:shadow-[0_10px_26px_rgba(124,58,237,0.38)] hover:-translate-y-px`,
  outline: `${BTN} border border-[var(--color-primary)] bg-transparent text-[var(--color-primary-dark)] hover:text-white hover:bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-deep))] hover:shadow-[0_10px_26px_rgba(124,58,237,0.34)] hover:-translate-y-px`,
}

export const BTN_SIZE = {
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const BTN_WIDTH = {
  auto: '',
  full: 'w-full',
  // Stacked and full-width on phones, back to intrinsic width from tablet up.
  mobile: 'w-full min-h-[3.25rem] min-[721px]:w-auto min-[721px]:min-h-0',
}
