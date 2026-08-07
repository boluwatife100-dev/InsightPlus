import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts'
import './SatisfactionCard.css'

// Overall satisfaction score + 7-day bar chart trend (PRD §5.5, §8 charts).
// Data: Phase 3 will supply via API; currently demo data.
export default function SatisfactionCard({ score, delta, trend, target = 75 }) {
  const latestScore = trend.length > 0 ? trend[trend.length - 1].score : score
  const peak = Math.max(...trend.map((t) => t.score), 1)

  return (
    <div className="card satisfaction-card">
      <div className="satisfaction-card__head">
        <div>
          <h3 className="card-title">Overall satisfaction</h3>
          <p className="card-subtitle">Last 7 days · target {target}</p>
        </div>
        <div className="satisfaction-card__score">
          <strong>{latestScore}</strong>
          <span className="satisfaction-card__delta">▲ {delta.replace(/^\+/, '')}</span>
        </div>
      </div>

      <div className="satisfaction-card__chart">
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={trend} margin={{ top: 10, right: 0, left: -26, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-primary-light)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              dy={6}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-text-faint)', fontSize: 11 }}
            />
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
            <ReferenceLine
              y={target}
              stroke="var(--color-primary-strong)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]} maxBarSize={38}>
              {trend.map((entry, index) => (
                <Cell
                  key={entry.day}
                  fill={entry.score >= target ? 'url(#barGradient)' : 'var(--color-primary-light)'}
                  fillOpacity={index === trend.length - 1 ? 1 : 0.75}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="satisfaction-card__foot">
        <span>
          <i className="satisfaction-card__legend-dot satisfaction-card__legend-dot--above" />
          Above target
        </span>
        <span>
          <i className="satisfaction-card__legend-dot satisfaction-card__legend-dot--below" />
          Below target
        </span>
        <span className="satisfaction-card__peak">Best day: {peak}</span>
      </div>
    </div>
  )
}
