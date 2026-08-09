/* ============================================================
   Building blocks for the hero dashboard snapshot.

   The snapshot is a miniature of the real dashboard, so its type
   scale is much smaller than the rest of the page. These shells keep
   the sizes consistent between the six cards.
   ============================================================ */

export const CARD =
  'flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-xs)]'

// Cards below the fold of the snapshot are dropped on phones to keep
// the frame legible; from 861px they sit two-up.
export const CARD_EXTRA = `${CARD} hidden min-[721px]:flex col-span-12 min-[861px]:col-span-6`

export const CARD_TITLE = 'block text-sm tracking-[-0.01em] text-[var(--color-text)]'
export const CARD_SUB = 'text-[0.6rem] text-[var(--color-text-faint)]'

export const ICON_TILE =
  'inline-flex h-[1.7rem] w-[1.7rem] shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary-light)] text-[var(--color-primary-deep)] [&_svg]:h-[0.9rem] [&_svg]:w-[0.9rem]'

export const CHIP_SOFT =
  'inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-primary-faint)] px-2 py-1 text-[0.6rem] font-semibold text-[var(--color-primary-deep)]'

export const META_STRONG = 'truncate text-xs text-[var(--color-text)]'
export const META_SPAN = 'text-[0.6rem] text-[var(--color-text-faint)]'

// Card header. With `icon` the title sits beside the mark; without it
// the title and the trailing `aside` (a chip) sit at opposite ends.
export function CardHead({ icon, title, subtitle, aside }) {
  if (icon) {
    return (
      <div className="flex items-start gap-2">
        <span className={ICON_TILE}>{icon}</span>
        <div>
          <strong className={CARD_TITLE}>{title}</strong>
          <span className={CARD_SUB}>{subtitle}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <strong className={CARD_TITLE}>{title}</strong>
        <span className={CARD_SUB}>{subtitle}</span>
      </div>
      {aside}
    </div>
  )
}

// Small circular avatar / initials badge on the brand gradient.
export function Avatar({ children, className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-deep))] font-bold text-white ${className}`}
    >
      {children}
    </span>
  )
}

// Name + role pair used by the business row and the profile row.
export function MetaPair({ name, role }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col leading-[1.25]">
      <strong className={META_STRONG}>{name}</strong>
      <span className={META_SPAN}>{role}</span>
    </span>
  )
}
