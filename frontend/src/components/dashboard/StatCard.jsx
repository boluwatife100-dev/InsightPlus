import './StatCard.css'

// Reusable KPI stat card (data-dense dashboard style).
// Renders a headline value, optional delta chip, and icon.
export default function StatCard({ label, value, delta, icon, tone = 'default' }) {
  return (
    <div className={`card stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <span className="stat-card__icon">{icon}</span>
        {delta && (
          <span className="stat-card__delta">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17L17 7M17 7H8M17 7v9"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {delta}
          </span>
        )}
      </div>
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value}</strong>
    </div>
  )
}
