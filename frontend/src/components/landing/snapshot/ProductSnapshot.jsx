import { BRAND_GRADIENT } from '../styles.js'
import { BellIcon, LockIcon } from '../icons.jsx'
import SnapshotSidebar from './SnapshotSidebar.jsx'
import {
  AiSummaryCard,
  CsatCard,
  FrictionCard,
  RecentFeedbackCard,
  RecommendedActionCard,
  ResponsesCard,
} from './SnapshotCards.jsx'
import { SNAPSHOT_DATE_RANGE, SNAPSHOT_USER } from './data.jsx'

// macOS-style traffic lights + address bar. Tablet and up only.
function ChromeBar() {
  return (
    <div className="hidden items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 min-[721px]:flex">
      <div className="flex shrink-0 gap-2">
        <i className="block h-[0.65rem] w-[0.65rem] rounded-full bg-[#ff5f57]" />
        <i className="block h-[0.65rem] w-[0.65rem] rounded-full bg-[#febc2e]" />
        <i className="block h-[0.65rem] w-[0.65rem] rounded-full bg-[#28c840]" />
      </div>
      <span className="inline-flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-lavender)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)]">
        <LockIcon className="h-[0.8rem] w-[0.8rem] text-[var(--color-primary)]" />
        InsightLoop.app/dashboard
      </span>
    </div>
  )
}

// Greeting, date range, notification bell and the primary action.
function SnapshotTopbar() {
  const firstName = SNAPSHOT_USER.name.split(' ')[0]

  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[rgba(246,244,252,0.9)] px-3 py-2 min-[721px]:px-4 min-[721px]:py-3">
      <div className="flex min-w-0 flex-col leading-[1.3]">
        <strong className="text-xs text-[var(--color-text)] min-[721px]:text-sm">
          Good morning, {firstName}
        </strong>
        <span className="truncate text-[0.6rem] text-[var(--color-text-muted)]">
          Here&apos;s what&apos;s happening at Rite Restaurant today.
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="inline-flex items-center whitespace-nowrap rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-[0.66rem] font-semibold text-[var(--color-text-muted)]">
          {SNAPSHOT_DATE_RANGE}
        </span>
        <span className="relative inline-flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
          <BellIcon className="h-[0.8rem] w-[0.8rem]" />
          <i className="absolute top-[0.28rem] right-[0.32rem] h-[0.35rem] w-[0.35rem] rounded-full border border-[var(--color-surface)] bg-[var(--color-negative)]" />
        </span>
        <span
          className={`inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] px-3 py-1 text-[0.66rem] font-bold text-white shadow-[0_4px_14px_rgba(124,58,237,0.28)] ${BRAND_GRADIENT}`}
        >
          + New Survey
        </span>
      </div>
    </div>
  )
}

// Hero product shot: the dashboard rendered inside a browser frame.
// Purely decorative, so the whole subtree is hidden from assistive tech
// and nothing inside is focusable.
export default function ProductSnapshot() {
  return (
    <div className="relative mx-auto w-full max-w-full px-6 min-[721px]:max-w-[62rem]" id="features">
      <div
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[0.72rem] shadow-[0_8px_24px_rgba(93,63,211,0.1),0_32px_80px_rgba(76,29,149,0.22)] min-[721px]:rounded-[var(--radius-xl)] min-[721px]:text-[0.78rem]"
        aria-hidden="true"
      >
        <img src="/admin.png" alt="Product snapshot" className="w-full h-full object-cover" />

       
      </div>
    </div>
  )
}
