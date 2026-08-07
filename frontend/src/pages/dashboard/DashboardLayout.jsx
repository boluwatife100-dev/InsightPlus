import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import Logo from '../../components/Logo.jsx'
import BusinessSwitcher from '../../components/dashboard/BusinessSwitcher.jsx'
import { mockUser } from '../../data/mockData.js'
import './DashboardLayout.css'
import './DashboardMobile.css'

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'Overview',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7.5" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13.5" y="3" width="7.5" height="5" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13.5" y="11" width="7.5" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="15" width="7.5" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    to: '/dashboard/feedback',
    label: 'Feedback',
    end: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: '/dashboard/ai-insight',
    label: 'AI Insights',
    end: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l1.9 5.7L19.5 9.5l-5.6 1.8L12 17l-1.9-5.7L4.5 9.5l5.6-1.8L12 2z"
          fill="currentColor"
        />
        <path
          d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    to: '/dashboard/settings',
    label: 'Settings',
    end: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

// Dashboard shell. Desktop: sidebar + top bar. Mobile (≤720px): compact
// header, business pill + greeting + date chip, stacked content, bottom
// tab bar, and a slide-in drawer for nav/support/profile.
export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)
  const isOverview = location.pathname === '/dashboard'

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="dash">
      {/* Mobile-only top bar */}
      <header className="dash-mob__bar">
        <button
          type="button"
          className="dash-mob__icon-btn"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 6.5h16M4 12h16M4 17.5h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <Link to="/" className="dash-mob__logo" aria-label="InsightPlus home">
          <Logo />
        </Link>
        <button type="button" className="dash-mob__icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="dash-mob__notif-dot" aria-hidden="true" />
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="dash__sidebar">
        <div className="dash__sidebar-head">
          <Link to="/" aria-label="InsightPlus home">
            <Logo />
          </Link>
        </div>

        <BusinessSwitcher />

        <nav className="dash__nav" aria-label="Dashboard">
          <p className="dash__nav-label">Menu</p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `dash__nav-link ${isActive ? 'dash__nav-link--active' : ''}`
              }
            >
              <span className="dash__nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dash__support">
          <p className="dash__support-title">Need help?</p>
          <Link to="/login" className="dash__support-link">
            Visit Help Center
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="dash__profile">
          <span className="avatar dash__profile-avatar" aria-hidden="true">
            {mockUser.initials}
          </span>
          <div className="dash__profile-meta">
            <strong>{mockUser.name}</strong>
            <span>{mockUser.role}</span>
          </div>
          <Link to="/login" className="dash__logout" title="Log out" aria-label="Log out">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </aside>

      {/* Mobile slide-in drawer */}
      <div
        className={`dash-mob__scrim ${menuOpen ? 'dash-mob__scrim--open' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <aside
        className={`dash-mob__drawer ${menuOpen ? 'dash-mob__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="dash-mob__drawer-head">
          <Link to="/" aria-label="InsightPlus home" onClick={closeMenu}>
            <Logo />
          </Link>
          <button
            type="button"
            className="dash-mob__icon-btn"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <BusinessSwitcher />

        <nav className="dash-mob__drawer-nav" aria-label="Dashboard">
          <p className="dash__nav-label">Menu</p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `dash__nav-link ${isActive ? 'dash__nav-link--active' : ''}`
              }
            >
              <span className="dash__nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dash__support">
          <p className="dash__support-title">Need help?</p>
          <Link to="/login" className="dash__support-link" onClick={closeMenu}>
            Visit Help Center
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="dash__profile">
          <span className="avatar dash__profile-avatar" aria-hidden="true">
            {mockUser.initials}
          </span>
          <div className="dash__profile-meta">
            <strong>{mockUser.name}</strong>
            <span>{mockUser.role}</span>
          </div>
          <Link to="/login" className="dash__logout" title="Log out" aria-label="Log out">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </aside>

      <div className="dash__main">
        {/* Desktop top bar */}
        <header className="dash__topbar">
          {isOverview && (
            <div className="dash__greeting">
              <strong>Good morning, {mockUser.name.split(' ')[0]}</strong>
              <span>Here's what's happening at Rite Restaurant today.</span>
            </div>
          )}

          <div className="dash__topbar-right">
            <button type="button" className="dash__date-range" aria-label="Change date range">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4.5" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3 9.5h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>Jul 1 – Jul 31, 2026</span>
              <svg className="dash__date-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button type="button" className="dash__icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="dash__notif-dot" aria-hidden="true" />
            </button>

            <Link to="/feedback" className="btn btn-primary btn-sm">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              + New Survey
            </Link>
          </div>
        </header>

        <main className="dash__content">
          {/* Mobile-only subhead: business pill, greeting, date chip */}
          <div className="dash-mob__subhead">
            <div className="dash-mob__subhead-row">
              <BusinessSwitcher compact />
              <button type="button" className="dash__date-range dash-mob__date" aria-label="Change date range">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="4.5" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3 9.5h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>Jul 1 – Jul 31, 2026</span>
                <svg className="dash__date-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {isOverview && (
              <div className="dash-mob__greeting">
                <strong>Good morning, {mockUser.name.split(' ')[0]}</strong>
                <span>Here's what your customers are telling you</span>
              </div>
            )}
          </div>

          <Outlet />
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="dash-mob__tabs" aria-label="Dashboard">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `dash-mob__tab ${isActive ? 'dash-mob__tab--active' : ''}`
            }
          >
            <span className="dash-mob__tab-icon">{item.icon}</span>
            <span className="dash-mob__tab-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
