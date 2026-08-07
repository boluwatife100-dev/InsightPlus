import './StatCard.css'

// Reusable stat card for dashboard KPI tiles (e.g. new feedback count).
// Renders a headline value, an optional delta label, and an icon chip.
export default function StatCard({ label, value, delta, icon }) {
  return (
    <div className="card stat-card">
      {icon && <span className="stat-card__icon">{icon}</span>}
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value}</strong>
      {delta && <span className="stat-card__delta">{delta}</span>}
    </div>
  )
}
