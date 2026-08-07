import AiInsightCard from '../../components/dashboard/AiInsightCard.jsx'
import RecommendedActionCard from '../../components/dashboard/RecommendedActionCard.jsx'
import IssuesBreakdown from '../../components/dashboard/IssuesBreakdown.jsx'
import { mockIssues, mockStats } from '../../data/mockData.js'

// AI Insight page — detail view of the analysis the AI produced from the
// feedback pipeline: summary, recommended action, and theme breakdown.
export default function AiInsight() {
  return (
    <div>
      <header className="dash__page-head">
        <h1 className="dash__page-title">AI Insight</h1>
        <p className="dash__page-subtitle">
          What the data says — and the single action that matters most.
        </p>
      </header>

      <div className="dash__grid">
        <div className="dash__span-7">
          <AiInsightCard summary={mockStats.aiInsight} />
        </div>
        <div className="dash__span-5">
          <RecommendedActionCard action={mockStats.recommendedAction} />
        </div>
        <div className="dash__span-12">
          <IssuesBreakdown issues={mockIssues} />
        </div>
      </div>
    </div>
  )
}
