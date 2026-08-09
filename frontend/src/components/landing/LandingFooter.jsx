import Logo from '../Logo.jsx'
import { CONTAINER } from './styles.js'

export default function LandingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8">
      <div
        className={`${CONTAINER} flex flex-wrap items-center justify-center gap-4 text-center min-[721px]:justify-between min-[721px]:text-left`}
      >
        <Logo round />
        <p className="text-sm text-[var(--color-text-muted)]">
          © 2026 InsightPlus — Customer feedback analytics for small businesses.
        </p>
      </div>
    </footer>
  )
}
