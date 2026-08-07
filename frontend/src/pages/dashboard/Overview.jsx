import SatisfactionCard from '../../components/dashboard/SatisfactionCard.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import AiInsightCard from '../../components/dashboard/AiInsightCard.jsx'
import RecommendedActionCard from '../../components/dashboard/RecommendedActionCard.jsx'
import IssuesBreakdown from '../../components/dashboard/IssuesBreakdown.jsx'
import RecentFeedbackFeed from '../../components/dashboard/RecentFeedbackFeed.jsx'
import SentimentGauge from '../../components/dashboard/SentimentGauge.jsx'
import TopIssueCallout from '../../components/dashboard/TopIssueCallout.jsx'
import {
  mockSatisfactionTrend,
  mockIssues,
  mockFeedback,
  mockStats,
} from '../../data/mockData.js'

// Overview page — assembles all dashboard widgets (PRD §5.5).
export default function Overview() {
  return (
    <div>
      <header className="dash__page-head">
        <h1 className="dash__page-title">Overview</h1>
        <p className="dash__page-subtitle">A snapshot of what customers are telling you right now.</p>
      </header>

      <div className="dash__grid">
        <div className="dash__span-5">
          <SatisfactionCard
            score={mockStats.satisfactionScore}
            delta={mockStats.satisfactionDelta}
            trend={mockSatisfactionTrend}
          />
        </div>
        <div className="dash__span-3">
          <StatCard
            label="New feedback"
            value={mockStats.newFeedbackCount}
            delta={mockStats.newFeedbackDelta}
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        <div className="dash__span-4">
          <SentimentGauge
            positiveShare={mockStats.sentimentDistribution.positive}
            negativeShare={mockStats.sentimentDistribution.negative}
          />
        </div>

        <div className="dash__span-12">
          <TopIssueCallout issue={mockStats.topIssue} context={mockStats.topIssueContext} />
        </div>

        <div className="dash__span-7">
          <AiInsightCard summary={mockStats.aiInsight} />
        </div>
        <div className="dash__span-5">
          <RecommendedActionCard action={mockStats.recommendedAction} />
        </div>

        <div className="dash__span-5">
          <IssuesBreakdown issues={mockIssues} />
        </div>
        <div className="dash__span-7">
          <RecentFeedbackFeed items={mockFeedback} />
        </div>
      </div>
    </div>
  )
}
