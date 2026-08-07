import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import './SatisfactionCard.css'

// Overall satisfaction score + 7-day bar chart trend (PRD §5.5, §8 charts).
// Data: Phase 3 will supply via API; currently demo data.
export default function SatisfactionCard({ score, delta, trend }) {
  return (
    <div className="card satisfaction-card">
      <div className="satisfaction-card__head">
        <div>
          <h3 className="card-title">Overall satisfaction</h3>
          <p className="card-subtitle">Last 7 days</p>
        </div>
        <div className="satisfaction-card__score">
          <strong>{score}</strong>
          <span className="satisfaction-card__delta">/ 100 · {delta}</span>
        </div>
      </div>

      <div className="satisfaction-card__chart">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={trend} margin={{ top: 8, right: 0, left: -28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: 'var(--color-text-faint)', fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: 'var(--color-primary-faint)' }}
              contentStyle={{
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
                fontSize: 'var(--text-sm)',
              }}
              formatter={(value) => [`${value} / 100`, 'Satisfaction']}
            />
            <Bar dataKey="score" fill="var(--color-primary)" radius={[8, 8, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
