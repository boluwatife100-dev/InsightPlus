import LandingButton from '../LandingButton.jsx'
import ProductSnapshot from '../snapshot/ProductSnapshot.jsx'
import { HERO } from '../content.jsx'
import { SparkleIcon } from '../icons.jsx'
import TrustBar from './TrustBar.jsx'

// Hero: eyebrow badge, headline, subtitle, the two CTAs, and the
// product snapshot underneath. Two stacked radial washes sit behind
// the copy — the outer one on the section, the inner one on a
// pointer-events-none overlay so it never blocks the buttons.
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(52rem_26rem_at_50%_-10%,rgba(124,58,237,0.14),transparent_72%),linear-gradient(180deg,var(--color-bg),var(--color-lavender))] pt-12 pb-12 min-[721px]:pt-20 min-[721px]:pb-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_22rem_at_12%_30%,rgba(139,92,246,0.1),transparent_60%),radial-gradient(40rem_22rem_at_88%_24%,rgba(91,33,182,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto mb-10 w-full max-w-264 px-6 text-center min-[721px]:mb-16">
        <p className="mx-auto mb-8 text-sm uppercase tracking-[0.32em] text-(--color-primary-dark) font-light">
          {HERO.badge}
        </p>

        <h1 className="mx-auto mb-6  text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] text-(--color-text) min-[721px]:text-5xl min-[1101px]:text-6xl">
          {HERO.titleLead}
          <br />
          <span className="bg-[linear-gradient(120deg,var(--color-primary),var(--color-primary-deep))] bg-clip-text text-transparent">
            {HERO.titleAccent}
          </span>
        </h1>

        <p className="mx-auto mb-10 text-lg leading-[1.75] text-(--color-text-muted) min-[721px]:text-xl">
          {HERO.subtitle}
        </p>

        <div className="mx-auto flex w-full max-w-136 flex-col items-center justify-center gap-4 min-[721px]:max-w-none min-[721px]:flex-row min-[721px]:gap-5">
          <LandingButton href="/login?mode=signup" size="lg" className="rounded-sm" width="mobile">
            Get Started
          </LandingButton>
          <LandingButton
            href="#how-it-works"
            variant="outline"
            size="lg"
            className="rounded-sm bg-white text-(--color-text)"
            width="mobile"
          >
            See how it works
          </LandingButton>
        </div>
      </div>

      <ProductSnapshot />
      <div className="mx-auto mt-10 w-full max-w-264 px-6 min-[721px]:mt-16">
        <img src="/trust.png" alt="trusted partners" className="w-full h-full object-cover" />
      </div>
    </section>
  )
}
