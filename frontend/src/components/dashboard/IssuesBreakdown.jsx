import { Link } from 'react-router-dom'
import { Info, ArrowRight } from 'lucide-react'

export default function IssuesBreakdown({ issues, to = '/dashboard/feedback' }) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Customer Issues</h3>
        <Info className="w-5 h-5 text-gray-400" />
      </div>

      <ul className="flex flex-col gap-4 flex-1">
        {issues.map((issue) => (
          <li key={issue.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">{issue.label}</span>
              <span className="text-sm font-semibold text-gray-700">
                {issue.pct}% <span className="text-gray-400 font-normal">({issue.count || Math.round((issue.pct / 100) * 1200)})</span>
              </span>
            </div>
            <div
              className="h-2 w-full bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={issue.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${issue.label}: ${issue.pct}% of responses`}
            >
              <div
                className="h-full bg-red-600 rounded-full"
                style={{ width: `${issue.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link to={to} className="inline-flex items-center gap-1 text-lg font-semibold text-[#630ED4] hover:text-[#5a0cb0] transition-colors">
          View all Issues
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
