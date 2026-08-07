import AiInsightCard from '../../components/dashboard/AiInsightCard.jsx'
import RecommendedActionCard from '../../components/dashboard/RecommendedActionCard.jsx'
import IssuesBreakdown from '../../components/dashboard/IssuesBreakdown.jsx'
import { mockIssues, mockStats } from '../../data/mockData.js'

// AI Insights page — detail view of the analysis the AI produced from the
// feedback pipeline: summary, recommended action, and theme breakdown.
export default function AiInsight() {
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
          <AiInsightCard
            summary={mockStats.aiInsight}
            highlights={['evening peak hours', 'host stand bottleneck', '8–10 points']}
          />
        </div>
        <div className="dash__span-5">
          <RecommendedActionCard text={mockStats.recommendedAction.description} />
        </div>
        <div className="dash__span-12">
          <IssuesBreakdown issues={mockIssues} />
        </div>
      </div>
    </div>
  )
}
