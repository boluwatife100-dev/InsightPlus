import { CircleAlert } from 'lucide-react'
import './StatCard.css'

// Reusable KPI stat card (data-dense dashboard style).
// Renders a headline value, optional delta chip (up/down tone), optional
// sparkline, and icon.
export default function StatCard({
  label,
  value,
  delta,
  deltaTone = 'up',
  icon,
  spark,
  tone = 'default',
}) {
  const deltaStr = String(delta || '');
  const isNegative = deltaStr.includes('▼') || deltaStr.includes('-');
  const isPositive = deltaStr.includes('▲') || deltaStr.includes('+');
  const computedDeltaTone = isNegative ? 'down' : isPositive ? 'up' : deltaTone;

  return (
    <div className={`card stat-card justify-between! rounded-sm! border-black! stat-card--${tone}`}>
      <span className="flex gap-2 items-center font-semibold text-lg">
      <p>New Feedback</p>
      <CircleAlert size={20} className="" />
      </span>
     
      <div className="stat-card__top">
        
        <span className="stat-card__icon">{icon}</span>
       
      </div>
      {/* <span className="stat-card__label">{label}</span> */}
      <strong className="stat-card__value">{value}</strong>
      {spark && (
        <svg className="stat-card__spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            points={spark
              .map((point, index) => {
                const x = (index / (spark.length - 1)) * 100
                const y = 26 - (point / Math.max(...spark, 1)) * 22
                return `${x},${y}`
              })
              .join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
       {delta && (
          <span className={`stat-card__delta stat-card__delta--${computedDeltaTone} tracking-wide!`}>
            {/* <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {computedDeltaTone === 'down' ? (
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg> */}
            {delta}
          </span>
        )}
    </div>
  )
}
