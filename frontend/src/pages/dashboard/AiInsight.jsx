import { useState } from 'react'
import CombinedAiInsight from '../../components/dashboard/CombinedAiInsight.jsx'
import IssuesBreakdown from '../../components/dashboard/IssuesBreakdown.jsx'
import { aiInsightsService } from '../../services/index.js'
import { useApi } from '../../hooks/useApi.js'

// AI Insights page — detail view of the analysis the AI produced from the
// feedback pipeline: summary, recommended action, and theme breakdown.
export default function AiInsight() {
  const { data, error, loading, reload, setData } = useApi(() => aiInsightsService.getInsights(), [])
  const [generating, setGenerating] = useState(false)
  const [generateError, setGenerateError] = useState(null)

  const handleGenerate = async () => {
    setGenerating(true)
    setGenerateError(null)
    try {
      const newData = await aiInsightsService.generateInsights()
      setData(newData)
    } catch (err) {
      setGenerateError(err.message || 'Failed to generate insights.')
    } finally {
      setGenerating(false)
    }
  }

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
          <div className="dash__span-12">
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

  const formattedDate = data.updatedAt 
    ? new Date(data.updatedAt).toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit'
      })
    : 'Never';

  return (
    <div>
      <header className="dash__page-head flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="dash__page-title">AI Insights</h1>
          <p className="dash__page-subtitle">
            What the data says — and the actions that matter most.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Get Latest AI Insight'}
          </button>
          {data.updatedAt && (
            <span className="text-xs text-gray-500 mt-2 block">
              Last updated: {formattedDate}
            </span>
          )}
        </div>
      </header>

      {generateError && (
        <div className="card error-card mb-4" role="alert">
          <p className="error-card__title">Generation Failed</p>
          <p className="error-card__detail">{generateError}</p>
        </div>
      )}

      <div className="dash__grid">
        <div className="dash__span-12">
          <CombinedAiInsight 
            summary={data.summary.text} 
            highlights={data.summary.highlights} 
            actionText={data.recommendedAction.text} 
            hideLink={true}
          />
        </div>
        <div className="dash__span-12">
          <IssuesBreakdown issues={data.issues} totalResponses={data.totalResponses} />
        </div>
      </div>
    </div>
  )
}
