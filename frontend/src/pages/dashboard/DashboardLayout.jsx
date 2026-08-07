import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import Logo from '../../components/Logo.jsx'
import { mockBusinesses, mockUser } from '../../data/mockData.js'
import './DashboardLayout.css'

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

const SIDEBAR_NAV = NAV_ITEMS

// Dashboard shell: business switcher + nav + support/profile cards in the
// sidebar; greeting + date range + "+ New Survey" CTA in the top bar.
export default function DashboardLayout() {
  const [businessOpen, setBusinessOpen] = useState(false)
  const [business, setBusiness] = useState(mockBusinesses[0])
  const switcherRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    function onClickOutside(event) {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setBusinessOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const isOverview = location.pathname === '/dashboard'

  return (
    <div className="dash">
      <aside className="dash__sidebar">
        <div className="dash__sidebar-head">
          <Link to="/" aria-label="InsightPlus home">
            <Logo />
          </Link>
        </div>

        {/* Business switcher */}
        <div className="dash__switcher" ref={switcherRef}>
          <button
            type="button"
            className="dash__switcher-btn"
            aria-haspopup="listbox"
            aria-expanded={businessOpen}
            onClick={() => setBusinessOpen((open) => !open)}
          >
            <span className="dash__business-avatar" aria-hidden="true">
              {business.initials}
            </span>
            <span className="dash__business-meta">
              <strong>{business.name}</strong>
              <span>{business.plan}</span>
            </span>
            <svg
              className={`dash__switcher-chevron ${businessOpen ? 'dash__switcher-chevron--open' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {businessOpen && (
            <ul className="dash__switcher-menu" role="listbox" aria-label="Switch business">
              {mockBusinesses.map((item) => (
                <li key={item.id} role="option" aria-selected={item.id === business.id}>
                  <button
                    type="button"
                    className={`dash__switcher-option ${item.id === business.id ? 'dash__switcher-option--active' : ''}`}
                    onClick={() => {
                      setBusiness(item)
                      setBusinessOpen(false)
                    }}
                  >
                    <span className="dash__business-avatar dash__business-avatar--sm" aria-hidden="true">
                      {item.initials}
                    </span>
                    <span className="dash__business-meta">
                      <strong>{item.name}</strong>
                      <span>{item.plan}</span>
                    </span>
                    {item.id === business.id && (
                      <svg className="dash__switcher-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nav */}
        <nav className="dash__nav" aria-label="Dashboard">
          <p className="dash__nav-label">Menu</p>
          {SIDEBAR_NAV.map((item) => (
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

        {/* Support card */}
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

        {/* Profile card */}
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
        <header className="dash__topbar">
          {isOverview && (
            <div className="dash__greeting">
              <strong>Good morning, {mockUser.name.split(' ')[0]}</strong>
              <span>Here's what's happening at {business.name} today.</span>
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
          <Outlet />
        </main>
      </div>
    </div>
  )
}
