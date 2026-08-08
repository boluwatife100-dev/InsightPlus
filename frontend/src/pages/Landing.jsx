import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import './Landing.css'

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const NAV = [
  {
    label: 'Features',
    items: [
      { text: 'Overview dashboard', href: '#features' },
      { text: 'AI summary', href: '#features' },
      { text: 'Friction points', href: '#features' },
      { text: 'Recent feedback', href: '#features' },
    ],
  },
  {
    label: 'How it works',
    items: [
      { text: 'Collect feedback', href: '#how-it-works' },
      { text: 'Understand with AI', href: '#how-it-works' },
      { text: 'Turn insights into action', href: '#how-it-works' },
    ],
  },
  {
    label: 'Support',
    items: [
      { text: 'Help Center', href: '/login' },
      { text: 'Contact us', href: '/login' },
      { text: 'FAQs', href: '/login' },
    ],
  },
]

// Hero product snapshot — a scaled-down, static reproduction of the
// "Good morning, Sarah" overview screen (desktop dashboard, PRD §5.5).
const SHOT_NAV = [
  {
    label: 'Overview',
    active: true,
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
    label: 'Feedback',
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
    label: 'AI Insights',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l1.9 5.7L19.5 9.5l-5.6 1.8L12 17l-1.9-5.7L4.5 9.5l5.6-1.8L12 2z" fill="currentColor" />
        <path d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Settings',
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

const SHOT_STARS = [
  { pct: 82, label: '5★' },
  { pct: 69, label: '4★' },
  { pct: 44, label: '3★' },
  { pct: 57, label: '2★' },
  { pct: 38, label: '1★' },
]

const SHOT_FRICTION = [
  { label: 'Slow delivery', pct: 42 },
  { label: 'Long wait time', pct: 21 },
  { label: 'Pricing concerns', pct: 19 },
  { label: 'App glitches', pct: 9 },
  { label: 'Other', pct: 15 },
]

const SHOT_FEEDBACK = [
  { text: 'Order took 40 minutes to arrive — way slower than expected.', time: '2 min ago', tone: 'negative' },
  { text: 'The ribeye was incredible. Perfectly cooked and seasoned!', time: '18 min ago', tone: 'positive' },
  { text: 'Good food, but delivery fees make it pricey for a family meal.', time: '1 hr ago', tone: 'neutral' },
]

const SHOT_AI_SUMMARY =
  'Customers are generally happy with food quality, but slow delivery is the biggest pain point this month. Delivery complaints nearly doubled on weekends, and often pair with lower star ratings.'

const SHOT_ACTION = 'Add more delivery riders during weekends (7–10 PM) to reduce wait times.'

const TRUSTED_BY = [
  { name: 'Rite', glyph: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 11.5L19 4l-2.5 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { name: 'FitZone', glyph: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.4" /><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2.4" /></svg> },
  { name: 'Bloom', glyph: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3c2 2.5 2 5 0 7.5C10 8 10 5.5 12 3z" fill="currentColor" /><path d="M12 7c2 .5 3 2 2.5 4-2-.5-3-2-2.5-4z" fill="currentColor" /><path d="M12 7c-2 .5-3 2-2.5 4 2-.5 3-2 2.5-4z" fill="currentColor" /><circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2" /></svg> },
  { name: 'Northline', glyph: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg> },
  { name: 'Kawa', glyph: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9h11v5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4V9z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" /><path d="M16 9h1.5a2.5 2.5 0 0 1 0-5H16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg> },
  { name: 'PulseLot', glyph: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg> },
]

const STEPS = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h13v10H4z" stroke="currentColor" strokeWidth="1.8" /><path d="M4 9h13" stroke="currentColor" strokeWidth="1.8" /><path d="M8 15v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
    title: 'Collect customer feedback',
    description: 'Gather feedback from your customers through simple, easy-to-share surveys.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    title: 'Understand what they mean',
    description: 'Let AI analyze feedback, identify patterns, and uncover what your customers really think.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 3a9 9 0 0 1 9 9h-9z" fill="currentColor" /><path d="M12 3v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
    title: 'Turn insights into action',
    description: 'Get clear recommendations that help you make decisions and improve your customer experience.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'We found out about our wait-time problem within a week. Fixing it directly raised our rating from 4.1 to 4.6 — InsightPlus made it obvious.',
    author: 'Sarah Johnson',
    role: 'Owner, Rite Restaurant',
    initials: 'SJ',
  },
  {
    quote:
      'No more reading spreadsheets on Sunday night. InsightPlus tells me what to work on — plain and simple.',
    author: 'David Okafor',
    role: 'Manager, FitZone Gym',
    initials: 'DO',
  },
  {
    quote:
      'The AI summary is eerily accurate. It picks up themes we only hear about weeks later in person.',
    author: 'Priya Sharma',
    role: 'Owner, Bloom Salon',
    initials: 'PS',
  },
  {
    quote:
      'We launched surveys on Friday and had a prioritized insight plan by Monday. That speed changed how we operate.',
    author: 'Lena Novak',
    role: 'COO, Kawa Café',
    initials: 'LN',
  },
]

export default function Landing() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollToDot = (index) => {
    setActive(index)
    const track = trackRef.current
    if (!track || !track.children[index]) return
    const target = track.children[index]
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }

  const onTrackScroll = () => {
    const track = trackRef.current
    if (!track || !track.children.length) return
    const card = track.children[0]
    const index = Math.round(track.scrollLeft / card.offsetWidth)
    setActive(Math.max(0, Math.min(index, TESTIMONIALS.length - 1)))
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="landing">
      <header className="landing__nav">
        <div className="landing__statusbar" aria-hidden="true">
          <span className="landing__statusbar-time">9:41</span>
          <span className="landing__statusbar-icons">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 6.5L9.5 17 4 11.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 11.5l1-1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="7" width="17" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <div className="container landing__nav-inner">
          <a href="#top" className="landing__logo">
            <Logo round />
          </a>
          <nav className="landing__links" aria-label="Main navigation">
            {NAV.map((item) => (
              <details key={item.label} className="landing__drop">
                <summary className="landing__drop-btn">
                  {item.label}
                  <span className="landing__drop-chev" aria-hidden="true"><Chevron /></span>
                </summary>
                <div className="landing__drop-menu">
                  {item.items.map((link) => {
                    const shared = {
                      className: 'landing__drop-item',
                      onClick: (event) => event.currentTarget.closest('details')?.removeAttribute('open'),
                    }
                    return link.href.startsWith('/') ? (
                      <Link key={link.text} to={link.href} {...shared}>
                        {link.text}
                      </Link>
                    ) : (
                      <a key={link.text} href={link.href} {...shared}>
                        {link.text}
                      </a>
                    )
                  })}
                </div>
              </details>
            ))}
            <Link to="/login?mode=signup" className="landing__link">
              Pricing
            </Link>
          </nav>
          <div className="landing__auth">
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/login?mode=signup" className="btn btn-primary">
              Create an Account
            </Link>
          </div>
          <button
            type="button"
            className="landing__burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div
        className={`landing__scrim ${menuOpen ? 'landing__scrim--open' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <aside
        className={`landing__drawer ${menuOpen ? 'landing__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="landing__drawer-head">
          <Logo round />
          <button type="button" className="landing__burger" aria-label="Close menu" onClick={closeMenu}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="landing__drawer-nav" aria-label="Mobile navigation">
          {NAV.map((item) => (
            <div key={item.label} className="landing__drawer-group">
              <p className="landing__drawer-group-title">{item.label}</p>
              {item.items.map((link) =>
                link.href.startsWith('/') ? (
                  <Link key={link.text} to={link.href} className="landing__drawer-item" onClick={closeMenu}>
                    {link.text}
                  </Link>
                ) : (
                  <a key={link.text} href={link.href} className="landing__drawer-item" onClick={closeMenu}>
                    {link.text}
                  </a>
                ),
              )}
            </div>
          ))}
          <div className="landing__drawer-group">
            <p className="landing__drawer-group-title">Pricing</p>
            <Link to="/login?mode=signup" className="landing__drawer-item" onClick={closeMenu}>
              View plans
            </Link>
          </div>
        </nav>

        <div className="landing__drawer-auth">
          <Link to="/login" className="btn btn-outline btn-block" onClick={closeMenu}>
            Login
          </Link>
          <Link to="/login?mode=signup" className="btn btn-primary btn-block" onClick={closeMenu}>
            Create an Account
          </Link>
        </div>
      </aside>

      <main id="top">
        {/* Hero */}
        <section className="landing__hero">
          <div className="landing__hero-glow" aria-hidden="true" />
          <div className="container landing__hero-inner">
            <span className="landing__eyebrow">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              AI-Powered Feedback Analytics
            </span>
            <h1 className="landing__headline">
              Turn customer feedback into
              <br />
              <span className="landing__accent">better business decisions.</span>
            </h1>
            <p className="landing__subhead">
              InsightPlus uses advanced AI to analyze reviews, surveys, and support tickets in
              real-time, helping you make data-driven decisions faster.
            </p>
            <div className="landing__cta">
              <Link className="btn btn-primary btn-lg" to="/login?mode=signup">
                Get Started
              </Link>
              <a className="btn btn-outline btn-lg" href="#how-it-works">
                See how it works
              </a>
            </div>
          </div>

          {/* Hero product snapshot — the live dashboard inside a browser frame */}
          <div className="container landing__frame-wrap" id="features">
            <div className="landing__frame" aria-hidden="true">
              <div className="landing__frame-bar">
                <div className="landing__frame-dots" aria-hidden="true">
                  <i className="landing__frame-dot landing__frame-dot--red" />
                  <i className="landing__frame-dot landing__frame-dot--amber" />
                  <i className="landing__frame-dot landing__frame-dot--green" />
                </div>
                <span className="landing__frame-url">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  insightplus.app/dashboard
                </span>
              </div>

              <div className="landing__shot">
                {/* Sidebar */}
                <aside className="landing__shot-side">
                  <div className="landing__shot-brand">
                    <span className="landing__shot-mark" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 17l4-5 3 3 5-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="17" cy="9" r="2" fill="#fff" />
                      </svg>
                    </span>
                    <span className="landing__shot-wordmark">InsightPlus</span>
                  </div>

                  <div className="landing__shot-switch">
                    <span className="landing__shot-switch-avatar">RR</span>
                    <span className="landing__shot-switch-meta">
                      <strong>Rite Restaurant</strong>
                      <span>Owner profile</span>
                    </span>
                    <Chevron />
                  </div>

                  <nav className="landing__shot-nav" aria-label="Dashboard">
                    <p className="landing__shot-nav-label">Menu</p>
                    {SHOT_NAV.map((item) => (
                      <span
                        key={item.label}
                        className={`landing__shot-nav-link ${item.active ? 'landing__shot-nav-link--active' : ''}`}
                      >
                        <span className="landing__shot-nav-ico">{item.icon}</span>
                        {item.label}
                      </span>
                    ))}
                  </nav>

                  <div className="landing__shot-support">
                    <strong>Need help?</strong>
                    <span>Visit Help Center →</span>
                  </div>

                  <div className="landing__shot-profile">
                    <span className="landing__shot-avatar">SJ</span>
                    <span className="landing__shot-profile-meta">
                      <strong>Sarah Johnson</strong>
                      <span>Owner</span>
                    </span>
                    <svg className="landing__shot-logout" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </aside>

                {/* Main dashboard */}
                <div className="landing__shot-main">
                  <div className="landing__shot-topbar">
                    <div className="landing__shot-greeting">
                      <strong>Good morning, Sarah</strong>
                      <span>Here's what's happening at Rite Restaurant today.</span>
                    </div>
                    <div className="landing__shot-topright">
                      <span className="landing__shot-chip">Jul 1 – Jul 31, 2026</span>
                      <span className="landing__shot-bell" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <i className="landing__shot-bell-dot" />
                      </span>
                      <span className="landing__shot-new">+ New Survey</span>
                    </div>
                  </div>

                  <div className="landing__shot-grid">
                    {/* CSAT hero card */}
                    <div className="landing__shot-card landing__shot-card--hero">
                      <div className="landing__shot-card-head">
                        <span>CSAT Score</span>
                        <span className="landing__shot-chip--soft">1,248 responses</span>
                      </div>
                      <div className="landing__shot-hero-body">
                        <div className="landing__shot-hero-value">
                          <strong>4.1</strong>
                          <span>/ 5</span>
                          <span className="landing__shot-delta">▼ 12% vs Jun 1–30</span>
                        </div>
                        <svg className="landing__shot-hero-spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                          <polygon points="0,28 0,22 16,20 33,25 50,19 66,23 83,15 100,18 100,28" fill="rgba(255,255,255,0.2)" />
                          <polyline points="0,22 16,20 33,25 50,19 66,23 83,15 100,18" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="landing__shot-stars-bars" aria-hidden="true">
                          {SHOT_STARS.map((bar) => (
                            <span key={bar.label} className="landing__shot-stars-bar">
                              <i style={{ height: `${bar.pct}%` }} />
                              <em>{bar.label}</em>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* New responses */}
                    <div className="landing__shot-card">
                      <div className="landing__shot-card-top">
                        <span className="landing__shot-icon">
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="landing__shot-delta landing__shot-delta--down">▼ 32.5% vs Jun 1–30</span>
                      </div>
                      <div className="landing__shot-kpi">
                        <span>New Responses</span>
                        <strong>35</strong>
                      </div>
                      <svg className="landing__shot-kpi-spark" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
                        <polyline points="0,20 14,14 28,18 42,8 56,14 71,6 86,10 100,3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* AI summary */}
                    <div className="landing__shot-card landing__shot-card--wide">
                      <div className="landing__shot-card-head">
                        <span className="landing__shot-icon">
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 2l1.9 5.7L19.5 9.5l-5.6 1.8L12 17l-1.9-5.7L4.5 9.5l5.6-1.8L12 2z" fill="currentColor" />
                            <path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" fill="currentColor" />
                          </svg>
                        </span>
                        <div>
                          <strong>AI Summary</strong>
                          <span>What customers are saying this month</span>
                        </div>
                      </div>
                      <p className="landing__shot-ai-text">{SHOT_AI_SUMMARY}</p>
                    </div>

                    {/* Recommended action */}
                    <div className="landing__shot-card landing__shot-card--wide-alt">
                      <div className="landing__shot-card-head">
                        <span className="landing__shot-icon">
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4.5 13.5H11L9.5 22 19 9.5H13L13 2z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                        </span>
                        <div>
                          <strong>Recommended Action</strong>
                          <span>Suggested by AI analysis</span>
                        </div>
                      </div>
                      <p className="landing__shot-action-text">{SHOT_ACTION}</p>
                      <span className="landing__shot-link">View all Insights →</span>
                    </div>

                    {/* Friction */}
                    <div className="landing__shot-card landing__shot-card--wide">
                      <div className="landing__shot-card-head">
                        <div>
                          <strong>Top Friction Points</strong>
                          <span>Share of responses mentioning each theme</span>
                        </div>
                        <span className="landing__shot-chip--soft">Top 5</span>
                      </div>
                      <div className="landing__shot-friction">
                        {SHOT_FRICTION.map((f, i) => (
                          <div key={f.label} className="landing__shot-friction-row">
                            <span className="landing__shot-friction-label">
                              {i === 0 && <b>1</b>}
                              {f.label}
                            </span>
                            <span className="landing__shot-friction-track">
                              <i style={{ width: `${f.pct}%` }} />
                            </span>
                            <span className="landing__shot-friction-pct">{f.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent feedback */}
                    <div className="landing__shot-card landing__shot-card--wide-alt">
                      <div className="landing__shot-card-head">
                        <div>
                          <strong>Recent Feedback</strong>
                          <span>Latest submissions, auto-tagged</span>
                        </div>
                        <span className="landing__shot-chip--soft">3 new</span>
                      </div>
                      <div className="landing__shot-feed">
                        {SHOT_FEEDBACK.map((fb) => (
                          <div key={fb.text} className="landing__shot-feed-item">
                            <span className={`landing__shot-mood landing__shot-mood--${fb.tone}`} aria-hidden="true">
                              {fb.tone === 'positive' ? (
                                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M8.5 14.5q3.5 3 7 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                              ) : fb.tone === 'negative' ? (
                                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M8.5 16.5q3.5-3 7 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                              ) : (
                                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M9 15.25h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                              )}
                            </span>
                            <span className="landing__shot-feed-meta">
                              <span className="landing__shot-feed-time">{fb.time}</span>
                              <span className="landing__shot-feed-text">{fb.text}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="landing__trust">
          <div className="container">
            <p className="landing__trust-label">InsightPlus is trusted by</p>
            <ul className="landing__logos" aria-label="Trusted by">
              {TRUSTED_BY.map((logo) => (
                <li key={logo.name} className="landing__logo">
                  <span className="landing__logo-glyph">{logo.glyph}</span>
                  {logo.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="landing__section landing__section--white">
          <div className="container">
            <div className="landing__section-head">
              <h2 className="landing__section-title">How it works</h2>
              <p className="landing__section-sub">
                Collect, understand, improve. Turn every customer voice into a better business.
              </p>
            </div>
            <div className="landing__steps">
              {STEPS.map((step) => (
                <article key={step.title} className="landing__step card">
                  <span className="landing__step-icon" aria-hidden="true">{step.icon}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
            <div className="landing__steps-cta">
              <a className="btn btn-primary btn-lg" href="#how-it-works">
                <span className="landing__cta-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M8 6.5v11l9-5.5-9-5.5z" fill="currentColor" /></svg>
                </span>
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="landing__section landing__section--lavender">
          <div className="container">
            <div className="landing__section-head">
              <h2 className="landing__section-title">What our customers say</h2>
              <p className="landing__section-sub">
                See how InsightPlus is helping businesses make sense of customer feedback and make
                better decisions.
              </p>
            </div>
            <div className="landing__carousel">
              <div className="landing__tracks" ref={trackRef} onScroll={onTrackScroll}>
                {TESTIMONIALS.map((t) => (
                  <figure key={t.author} className="landing__testimonial">
                    <div className="landing__stars" aria-hidden="true">★★★★★</div>
                    <blockquote>“{t.quote}”</blockquote>
                    <figcaption>
                      <span className="avatar">{t.initials}</span>
                      <div>
                        <strong>{t.author}</strong>
                        <span>{t.role}</span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="landing__dots" role="tablist" aria-label="Testimonials">
                {TESTIMONIALS.map((t, index) => (
                  <button
                    key={t.author}
                    type="button"
                    className={`landing__dot ${index === active ? 'landing__dot--active' : ''}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => scrollToDot(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing__footer">
        <div className="container landing__footer-inner">
          <Logo round />
          <p>© 2026 InsightPlus — Customer feedback analytics for small businesses.</p>
        </div>
      </footer>
    </div>
  )
}