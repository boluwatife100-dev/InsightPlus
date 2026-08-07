import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import './Landing.css'

const STATS = [
  { value: '4.8★', label: 'Avg. satisfaction lift' },
  { value: '2 min', label: 'Setup to first insight' },
  { value: '12k+', label: 'Feedback responses tagged' },
  { value: '1', label: 'Clear action, every week' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 5h16v12H4z" stroke="currentColor" strokeWidth="1.8" rx="3" />
        <path d="M4 9h16" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Share your link',
    description:
      'Get a unique link and QR code for your business. Customers submit feedback in seconds — no app, no login.',
  },
  {
    step: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3a9 9 0 0 1 9 9h-9z" fill="currentColor" />
      </svg>
    ),
    title: 'We read every response',
    description:
      'InsightPlus automatically tags each response by sentiment (positive, neutral, negative) and recurring theme.',
  },
  {
    step: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L4.5 13.5H11L9.5 22 19.5 9.5H13L13 2z" fill="currentColor" />
      </svg>
    ),
    title: 'Act on the top issue',
    description:
      'A live dashboard surfaces the one issue that matters most, with a recommended action — so you know exactly what to fix.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'We found out about our wait-time problem within a week. Fixing it directly raised our rating from 4.1 to 4.6 stars.',
    author: 'Maria Lopez',
    role: 'Owner, Casa Verde Bistro',
    initials: 'ML',
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
      'Our customers love that they can just scan and talk. We love that decisions come ready-made.',
    author: 'Priya Sharma',
    role: 'Owner, Bloom Salon',
    initials: 'PS',
  },
]

const TRUSTED_BY = ['Casa Verde', 'FitZone', 'Bloom Salon', 'Kawa Café', 'Northline Clinic']

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing__nav">
        <div className="container landing__nav-inner">
          <Logo />
          <nav className="landing__links" aria-label="Main">
            <a href="#how-it-works">How it works</a>
            <a href="#testimonials">Customers</a>
            <Link className="btn btn-ghost" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary" to="/login?mode=signup">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="landing__hero">
          <div className="landing__hero-glow" aria-hidden="true" />
          <div className="container landing__hero-inner">
            <div className="landing__hero-copy">
              <span className="landing__eyebrow">
                <span className="landing__eyebrow-dot" aria-hidden="true" />
                AI-powered feedback analytics
              </span>
              <h1 className="landing__headline">
                Turn customer feedback into{' '}
                <span className="landing__accent">better business decisions</span>
              </h1>
              <p className="landing__subhead">
                Other tools collect feedback. InsightPlus turns it into decisions — automatically.
                Every response tagged, every theme surfaced, one clear action recommended.
              </p>
              <div className="landing__cta">
                <Link className="btn btn-primary btn-lg" to="/login?mode=signup">
                  Try it free
                </Link>
                <Link className="btn btn-secondary btn-lg" to="/feedback">
                  Preview the feedback form
                </Link>
              </div>
              <p className="landing__footnote">
                Free during the demo · No credit card required
              </p>
            </div>

            {/* Hero mock dashboard visual */}
            <div className="landing__hero-visual" aria-hidden="true">
              <div className="landing__mock-card">
                <div className="landing__mock-top">
                  <div className="landing__mock-business">
                    <span className="landing__mock-avatar">CV</span>
                    <div>
                      <strong>Casa Verde Bistro</strong>
                      <span>Live dashboard</span>
                    </div>
                  </div>
                  <span className="landing__mock-live">
                    <span className="landing__mock-live-dot" /> Live
                  </span>
                </div>

                <div className="landing__mock-score">
                  <div>
                    <span>Overall satisfaction</span>
                    <strong>84<small>/100</small></strong>
                  </div>
                  <span className="landing__mock-up">▲ 6 this week</span>
                </div>

                <div className="landing__mock-bars">
                  <span style={{ height: '38%' }} />
                  <span style={{ height: '52%' }} />
                  <span style={{ height: '46%' }} />
                  <span style={{ height: '64%' }} />
                  <span style={{ height: '58%' }} />
                  <span style={{ height: '72%' }} />
                  <span style={{ height: '84%' }} />
                </div>

                <div className="landing__mock-rows">
                  <div className="landing__mock-row">
                    <span>Wait time</span>
                    <div className="landing__mock-track">
                      <i style={{ width: '68%' }} />
                    </div>
                    <b>68%</b>
                  </div>
                  <div className="landing__mock-row">
                    <span>Pricing</span>
                    <div className="landing__mock-track">
                      <i style={{ width: '36%' }} />
                    </div>
                    <b>36%</b>
                  </div>
                </div>

                <div className="landing__mock-tag">
                  <span className="landing__mock-dot" /> Top issue this week: wait time
                </div>
              </div>

              <div className="landing__mock-float landing__mock-float--1">
                <span className="landing__mock-check">✓</span>
                New feedback tagged · just now
              </div>
              <div className="landing__mock-float landing__mock-float--2">
                <span className="landing__mock-spark">✦</span>
                AI insight ready
              </div>
            </div>
          </div>

          {/* Social proof strip */}
          <div className="container">
            <dl className="landing__stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="landing__stat">
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="landing__section">
          <div className="container">
            <div className="landing__section-head">
              <h2 className="landing__section-title">How InsightPlus works</h2>
              <p className="landing__section-sub">
                From raw responses to a clear next step — in three steps, fully automatic.
              </p>
            </div>
            <div className="landing__steps">
              {HOW_IT_WORKS.map((item) => (
                <article key={item.step} className="landing__step card">
                  <span className="landing__step-num">{item.step}</span>
                  <span className="landing__step-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="landing__section landing__section--lavender">
          <div className="container">
            <div className="landing__section-head">
              <h2 className="landing__section-title">Loved by small businesses</h2>
              <p className="landing__section-sub">
                Restaurants, gyms, salons, clinics — businesses that live on repeat customers.
              </p>
            </div>
            <div className="landing__testimonials">
              {TESTIMONIALS.map((t) => (
                <figure key={t.author} className="landing__testimonial card">
                  <div className="landing__stars" aria-label="5 out of 5 stars">
                    {'★★★★★'}
                  </div>
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
          </div>
        </section>

        {/* Trusted by */}
        <section className="landing__section landing__section--tight">
          <div className="container">
            <p className="landing__trusted-label">Trusted by teams at</p>
            <ul className="landing__logos" aria-label="Trusted by">
              {TRUSTED_BY.map((name) => (
                <li key={name} className="landing__logo">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="landing__section">
          <div className="container landing__cta-banner">
            <h2>Your customers are talking. Start listening.</h2>
            <p>
              Set up your business in under a minute. Your first insight is one feedback away.
            </p>
            <div className="landing__cta">
              <Link className="btn btn-lg landing__cta-btn" to="/login?mode=signup">
                Get started free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing__footer">
        <div className="container landing__footer-inner">
          <Logo compact />
          <p>© 2026 InsightPlus — Customer feedback analytics for small businesses.</p>
        </div>
      </footer>
    </div>
  )
}
