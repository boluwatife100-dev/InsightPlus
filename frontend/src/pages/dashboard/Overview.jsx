import CsatScoreCard from '../../components/dashboard/CsatScoreCard.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import AiInsightCard from '../../components/dashboard/AiInsightCard.jsx'
import RecommendedActionCard from '../../components/dashboard/RecommendedActionCard.jsx'
import IssuesBreakdown from '../../components/dashboard/IssuesBreakdown.jsx'
import RecentFeedbackFeed from '../../components/dashboard/RecentFeedbackFeed.jsx'
import { dashboardService } from '../../services/index.js'
import { config } from '../../config.js'
import { useApi } from '../../hooks/useApi.js'

// Overview page — 2×2×2 card grid (PRD §5.5, high-fidelity spec).
// Data comes from dashboardService.getOverview(); one aggregate
// backend call per date range.
export default function Overview() {
  const { data, error, loading, reload } = useApi(
    () => dashboardService.getOverview(config.defaultRange),
    [],
  )

  if (loading) {
    return (
      <div className="dash__grid" aria-busy="true">
        <div className="dash__span-7">
          <div className="card skeleton-card" style={{ height: '14rem' }} />
        </div>
        <div className="dash__span-5">
          <div className="card skeleton-card" style={{ height: '14rem' }} />
        </div>
        <div className="dash__span-6">
          <div className="card skeleton-card" style={{ height: '12rem' }} />
        </div>
        <div className="dash__span-6">
          <div className="card skeleton-card" style={{ height: '12rem' }} />
        </div>
        <div className="dash__span-6">
          <div className="card skeleton-card" style={{ height: '14rem' }} />
        </div>
        <div className="dash__span-6">
          <div className="card skeleton-card" style={{ height: '14rem' }} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card error-card" role="alert">
        <p className="error-card__title">Couldn't load your dashboard.</p>
        <p className="error-card__detail">{error.message}</p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={reload}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="dash__grid">
        {/* Row 1 */}
        <div className="dash__span-7">
          <CsatScoreCard csat={data.csat} />
        </div>
        <div className="dash__span-5">
          <StatCard
            label="New Responses"
            value={data.newResponses.count}
            delta={data.newResponses.delta}
            deltaTone="down"
            spark={data.newResponses.spark}
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>

        {/* Row 2 */}
        <div className="dash__span-6">
          <AiInsightCard summary={data.aiSummary.text} highlights={data.aiSummary.highlights} />
        </div>
        <div className="dash__span-6">
          <RecommendedActionCard text={data.recommendedAction.text} />
        </div>

        {/* Row 3 */}
        <div className="dash__span-6">
          <IssuesBreakdown issues={data.frictionPoints} />
        </div>
        <div className="dash__span-6">
          <RecentFeedbackFeed items={data.recentFeedback} />
        </div>
      </div>
    </div>
  )
}