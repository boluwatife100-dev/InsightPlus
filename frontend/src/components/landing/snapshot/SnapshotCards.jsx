import { BRAND_GRADIENT } from '../styles.js'
import { BoltIcon, ChatIcon, MoodIcon, SparkleIcon } from '../icons.jsx'
import { CARD, CARD_EXTRA, CHIP_SOFT, CardHead, ICON_TILE } from './SnapshotCard.jsx'
import {
  SNAPSHOT_ACTION,
  SNAPSHOT_AI_SUMMARY,
  SNAPSHOT_CSAT,
  SNAPSHOT_FEEDBACK,
  SNAPSHOT_FRICTION,
  SNAPSHOT_RESPONSES,
} from './data.jsx'

/* ============================================================
   The six cards of the hero dashboard snapshot.

   All figures are static sample data (see data.jsx). The whole
   snapshot is aria-hidden by its frame, so the charts here are pure
   decoration and carry no accessible names.
   ============================================================ */

// CSAT score, trend line and star distribution on the brand gradient.
export function CsatCard() {
  return (
    <div className="col-span-12 flex flex-col gap-3 rounded-[var(--radius-lg)] bg-[image:radial-gradient(16rem_12rem_at_110%_-20%,rgba(255,255,255,0.16),transparent_60%),var(--gradient-brand)] p-3 text-white min-[861px]:col-span-7">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-bold text-white">CSAT Score</span>
        <span className={CHIP_SOFT}>{SNAPSHOT_CSAT.responses}</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <strong className="text-[2rem] leading-none font-extrabold text-white">
            {SNAPSHOT_CSAT.score}
          </strong>
          <span className="text-sm font-semibold text-white/90">/ 5</span>
          <span className="ml-auto inline-flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-pill)] bg-white/20 px-2 py-1 text-[0.6rem] font-bold text-white">
            {SNAPSHOT_CSAT.delta}
          </span>
        </div>

        <svg className="h-8 w-full" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,28 0,22 16,20 33,25 50,19 66,23 83,15 100,18 100,28" fill="rgba(255,255,255,0.2)" />
          <polyline
            points="0,22 16,20 33,25 50,19 66,23 83,15 100,18"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex items-end gap-2" aria-hidden="true">
          {SNAPSHOT_CSAT.stars.map((bar) => (
            <span key={bar.label} className="flex flex-1 flex-col items-center gap-1">
              {/* Fixed-height track: a percentage height only resolves
                  against a parent whose own height is definite. */}
              <span className="flex h-8 w-full items-end justify-center">
                <i
                  className="w-full max-w-[1.4rem] rounded-t-[var(--radius-xs)] bg-white/90"
                  style={{ height: `${bar.pct}%` }}
                />
              </span>
              <em className="text-[0.55rem] not-italic text-white/85">{bar.label}</em>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// New responses KPI with a sparkline.
export function ResponsesCard() {
  return (
    <div className={`${CARD} col-span-12 min-[861px]:col-span-5`}>
      <div className="flex items-center justify-between gap-2">
        <span className={ICON_TILE}>
          <ChatIcon />
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-negative-light)] px-2 py-1 text-[0.6rem] font-bold text-[var(--color-negative)]">
          {SNAPSHOT_RESPONSES.delta}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-medium text-[var(--color-text-muted)]">New Responses</span>
        <strong className="text-[1.6rem] leading-[1.2] font-extrabold tracking-[-0.02em] text-[var(--color-text)]">
          {SNAPSHOT_RESPONSES.value}
        </strong>
      </div>

      <svg
        className="mt-auto h-6 w-full text-[var(--color-primary)]"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points="0,20 14,14 28,18 42,8 56,14 71,6 86,10 100,3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function AiSummaryCard() {
  return (
    <div className={CARD_EXTRA}>
      <CardHead
        icon={<SparkleIcon />}
        title="AI Summary"
        subtitle="What customers are saying this month"
      />
      <p className="text-xs leading-[1.6] text-[var(--color-text-muted)]">{SNAPSHOT_AI_SUMMARY}</p>
    </div>
  )
}

export function RecommendedActionCard() {
  return (
    <div className={CARD_EXTRA}>
      <CardHead icon={<BoltIcon />} title="Recommended Action" subtitle="Suggested by AI analysis" />
      <p className="text-xs leading-[1.6] font-semibold text-[var(--color-text)]">{SNAPSHOT_ACTION}</p>
      <span className="mt-auto text-xs font-semibold text-[var(--color-primary-dark)]">
        View all Insights →
      </span>
    </div>
  )
}

// Ranked themes with a share-of-responses bar each.
export function FrictionCard() {
  return (
    <div className={CARD_EXTRA}>
      <CardHead
        title="Top Friction Points"
        subtitle="Share of responses mentioning each theme"
        aside={<span className={CHIP_SOFT}>Top 5</span>}
      />
      <div className="flex flex-col gap-2">
        {SNAPSHOT_FRICTION.map((item, index) => (
          <div
            key={item.label}
            className="grid grid-cols-[5.5rem_1fr_2.25rem] items-center gap-2 text-[0.62rem]"
          >
            <span className="inline-flex items-center gap-1 truncate text-[var(--color-text-muted)]">
              {index === 0 && (
                <b
                  className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--radius-xs)] text-[0.55rem] text-white ${BRAND_GRADIENT}`}
                >
                  1
                </b>
              )}
              {item.label}
            </span>
            <span className="h-[0.4rem] overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-lavender)]">
              <i
                className="block h-full rounded-[var(--radius-pill)] bg-[linear-gradient(90deg,var(--color-primary-light),var(--color-primary))]"
                style={{ width: `${item.pct}%` }}
              />
            </span>
            <span className="text-right font-bold text-[var(--color-text)]">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MOOD_BG = {
  positive: 'bg-[var(--color-positive)]',
  negative: 'bg-[var(--color-negative)]',
  neutral: 'bg-[var(--color-neutral)]',
}

export function RecentFeedbackCard() {
  return (
    <div className={CARD_EXTRA}>
      <CardHead
        title="Recent Feedback"
        subtitle="Latest submissions, auto-tagged"
        aside={<span className={CHIP_SOFT}>3 new</span>}
      />
      <div className="flex flex-col gap-2">
        {SNAPSHOT_FEEDBACK.map((item) => (
          <div
            key={item.text}
            className="flex items-start gap-2 rounded-[var(--radius-md)] bg-[var(--color-lavender)] p-2"
          >
            <span
              className={`inline-flex h-[1.4rem] w-[1.4rem] shrink-0 items-center justify-center rounded-full text-white [&_svg]:h-[0.85rem] [&_svg]:w-[0.85rem] ${MOOD_BG[item.tone]}`}
              aria-hidden="true"
            >
              <MoodIcon tone={item.tone} />
            </span>
            <span className="flex min-w-0 flex-col gap-px">
              <span className="text-[0.58rem] font-semibold text-[var(--color-text-faint)]">
                {item.time}
              </span>
              <span className="text-xs leading-[1.45] text-[var(--color-text)]">{item.text}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
