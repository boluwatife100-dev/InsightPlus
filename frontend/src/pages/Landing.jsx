import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import './Landing.css'

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Share your link',
    description:
      'Get a unique link and QR code for your business. Customers submit feedback in seconds — no app, no login.',
  },
  {
    step: '02',
    title: 'We read every response',
    description:
      'InsightPlus automatically tags each response by sentiment (positive, neutral, negative) and recurring theme.',
  },
  {
    step: '03',
    title: 'Act on the top issue',
    description:
      'A live dashboard surfaces the one issue that matters most, with a recommended action — so you know exactly what to fix.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'We found out about our wait-time problem within a week. Fixing it directly raised our 4.1 to 4.6 stars.',
    author: 'Maria Lopez',
    role: 'Owner, Casa Verde Bistro',
  },
  {
    quote:
      'No more reading spreadsheets on Sunday night. InsightPlus tells me what to work on — plain and simple.',
    author: 'David Okafor',
    role: 'Manager, FitZone Gym',
  },
  {
    quote:
      'Our customers love that they can just scan and talk. We love that decisions come ready-made.',
    author: 'Priya Sharma',
    role: 'Owner, Bloom Salon',
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
          <div className="container landing__hero-inner">
            <div className="landing__hero-copy">
              <span className="landing__eyebrow">AI-powered feedback analytics</span>
              <h1 className="landing__headline">
                Turn customer feedback into{' '}
                <span className="landing__accent">better business decisions</span>
              </h1>
              <p className="landing__subhead">
                Other tools collect feedback. InsightPlus turns it into decisions — automatically.
                Collect, tag, and act on what your customers are really saying.
              </p>
              <div className="landing__cta">
                <Link className="btn btn-primary btn-lg" to="/login?mode=signup">
                  Try it free
                </Link>
                <Link className="btn btn-secondary btn-lg" to="/feedback">
                  Preview the feedback form
                </Link>
              </div>
              <p className="landing__footnote">Free during the demo. No credit card required.</p>
            </div>

            {/* Hero mock dashboard card */}
            <div className="landing__hero-visual" aria-hidden="true">
              <div className="landing__mock-card">
                <div className="landing__mock-head">
                  <span>Overall satisfaction</span>
                  <strong>84</strong>
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
                <div className="landing__mock-tag">
                  <span className="landing__mock-dot" /> Top issue: wait time
                </div>
              </div>
              <div className="landing__mock-float">
                <span className="landing__mock-float-check">✓</span>
                New feedback tagged · just now
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="landing__section">
          <div className="container">
            <h2 className="landing__section-title">How InsightPlus works</h2>
            <p className="landing__section-sub">From raw responses to a clear next step in three steps.</p>
            <div className="landing__steps">
              {HOW_IT_WORKS.map((item) => (
                <article key={item.step} className="landing__step card">
                  <span className="landing__step-num">{item.step}</span>
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
            <h2 className="landing__section-title">Loved by small businesses</h2>
            <p className="landing__section-sub">
              Restaurants, gyms, salons, clinics — businesses that live on repeat customers.
            </p>
            <div className="landing__testimonials">
              {TESTIMONIALS.map((t) => (
                <figure key={t.author} className="landing__testimonial card">
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted by */}
        <section className="landing__section">
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
            <p>Set up your business in under a minute and see your first insight today.</p>
            <Link className="btn btn-primary btn-lg" to="/login?mode=signup">
              Get started free
            </Link>
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
