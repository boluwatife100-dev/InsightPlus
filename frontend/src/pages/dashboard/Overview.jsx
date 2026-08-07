import CsatScoreCard from '../../components/dashboard/CsatScoreCard.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import AiInsightCard from '../../components/dashboard/AiInsightCard.jsx'
import RecommendedActionCard from '../../components/dashboard/RecommendedActionCard.jsx'
import IssuesBreakdown from '../../components/dashboard/IssuesBreakdown.jsx'
import RecentFeedbackFeed from '../../components/dashboard/RecentFeedbackFeed.jsx'
import {
  mockCsat,
  mockNewResponses,
  mockFrictionPoints,
  mockRecentFeedback,
  mockAiSummary,
  mockRecommendedAction,
} from '../../data/mockData.js'

// Overview page — 2×2×2 card grid (PRD §5.5, high-fidelity spec).
export default function Overview() {
  return (
    <div>
      <div className="dash__grid">
        {/* Row 1 */}
        <div className="dash__span-7">
          <CsatScoreCard csat={mockCsat} />
        </div>
        <div className="dash__span-5">
          <StatCard
            label="New Responses"
            value={mockNewResponses.count}
            delta={mockNewResponses.delta}
            deltaTone="down"
            spark={mockNewResponses.spark}
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
          <AiInsightCard
            summary={mockAiSummary}
            highlights={[
              'slow delivery',
              'biggest pain point',
              'lower star ratings',
              'new menu prices',
            ]}
          />
        </div>
        <div className="dash__span-6">
          <RecommendedActionCard text={mockRecommendedAction.text} />
        </div>

        {/* Row 3 */}
        <div className="dash__span-6">
          <IssuesBreakdown issues={mockFrictionPoints} />
        </div>
        <div className="dash__span-6">
          <RecentFeedbackFeed items={mockRecentFeedback} />
        </div>
      </div>
    </div>
  )
}
