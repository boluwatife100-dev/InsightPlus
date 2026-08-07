import './SentimentBadge.css'

const SENTIMENT_LABELS = {
  positive: 'Positive',
  neutral: 'Neutral',
  negative: 'Negative',
}

// Displays the auto-tagged sentiment for a feedback item.
// The sentiment value comes from the backend tagging pipeline (Phase 3);
// until then it is driven by demo data.
export default function SentimentBadge({ sentiment = 'neutral' }) {
  return (
    <span className={`sentiment-badge sentiment-badge--${sentiment}`}>
      <span className="sentiment-badge__dot" aria-hidden="true" />
      {SENTIMENT_LABELS[sentiment] ?? sentiment}
    </span>
  )
}
