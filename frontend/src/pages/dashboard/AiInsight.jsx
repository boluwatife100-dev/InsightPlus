import AiInsightCard from '../../components/dashboard/AiInsightCard.jsx'
import RecommendedActionCard from '../../components/dashboard/RecommendedActionCard.jsx'
import IssuesBreakdown from '../../components/dashboard/IssuesBreakdown.jsx'
import { aiInsightsService } from '../../services/index.js'
import { useApi } from '../../hooks/useApi.js'

// AI Insights page — detail view of the analysis the AI produced from the
// feedback pipeline: summary, recommended action, and theme breakdown.
export default function AiInsight() {
  const { data, error, loading, reload } = useApi(() => aiInsightsService.getInsights(), [])

  if (loading) {
    return (
      <div>
        <header className="dash__page-head">
          <h1 className="dash__page-title">AI Insights</h1>
          <p className="dash__page-subtitle">
            What the data says — and the actions that matter most.
          </p>
        </header>
        <div className="dash__grid" aria-busy="true">
          <div className="dash__span-7">
            <div className="card skeleton-card" style={{ height: '12rem' }} />
          </div>
          <div className="dash__span-5">
            <div className="card skeleton-card" style={{ height: '12rem' }} />
          </div>
          <div className="dash__span-12">
            <div className="card skeleton-card" style={{ height: '14rem' }} />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card error-card" role="alert">
        <p className="error-card__title">Couldn't load your insights.</p>
        <p className="error-card__detail">{error.message}</p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={reload}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div>
      <header className="dash__page-head">
        <h1 className="dash__page-title">AI Insights</h1>
        <p className="dash__page-subtitle">
          What the data says — and the actions that matter most.
        </p>
      </header>

      <div className="dash__grid">
        <div className="dash__span-7">
          <AiInsightCard summary={data.summary.text} highlights={data.summary.highlights} />
        </div>
        <div className="dash__span-5">
          <RecommendedActionCard text={data.recommendedAction.text} />
        </div>
        <div className="dash__span-12">
          <IssuesBreakdown issues={data.issues} />
        </div>
      </div>
    </div>
  )
}