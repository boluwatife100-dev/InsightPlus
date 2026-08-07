import { NavLink, Outlet, Link } from 'react-router-dom'
import Logo from '../../components/Logo.jsx'
import './DashboardLayout.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/feedback', label: 'Feedback', end: false },
  { to: '/dashboard/ai-insight', label: 'AI Insight', end: false },
  { to: '/dashboard/settings', label: 'Settings', end: false },
]

// Dashboard shell: sidebar nav + routed content area.
// The mock business ("Casa Verde Bistro") is used for the demo per PRD §10.
export default function DashboardLayout() {
  return (
    <div className="dash">
      <aside className="dash__sidebar">
        <div className="dash__sidebar-head">
          <Link to="/" aria-label="InsightPlus home">
            <Logo />
          </Link>
        </div>

        <div className="dash__business card">
          <span className="dash__business-name">Casa Verde Bistro</span>
          <span className="dash__business-plan">Demo business</span>
        </div>

        <nav className="dash__nav" aria-label="Dashboard">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `dash__nav-link ${isActive ? 'dash__nav-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dash__sidebar-foot">
          <span className="dash__user-avatar" aria-hidden="true">
            ML
          </span>
          <div className="dash__user">
            <strong>Maria Lopez</strong>
            <span>Owner</span>
          </div>
          <Link to="/login" className="dash__logout" title="Log out" aria-label="Log out">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </aside>

      <main className="dash__content">
        <Outlet />
      </main>
    </div>
  )
}
