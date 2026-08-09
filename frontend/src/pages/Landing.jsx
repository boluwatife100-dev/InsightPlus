import { useEffect, useState } from 'react'
import LandingFooter from '../components/landing/LandingFooter.jsx'
import LandingHeader from '../components/landing/LandingHeader.jsx'
import MobileMenu from '../components/landing/MobileMenu.jsx'
import HeroSection from '../components/landing/sections/HeroSection.jsx'
import HowItWorks from '../components/landing/sections/HowItWorks.jsx'
import Testimonials from '../components/landing/sections/Testimonials.jsx'
import TrustBar from '../components/landing/sections/TrustBar.jsx'

/* ============================================================
   Landing page.

   This file only composes the marketing sections and owns the one
   piece of state they share: whether the mobile drawer is open.
   Layout, copy and the dashboard snapshot live in
   components/landing/ — see styles.js for the shared Tailwind
   class strings and the breakpoints the whole page is built on.
   ============================================================ */
export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock the page behind the drawer so only the drawer scrolls.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="overflow-x-clip">
      <LandingHeader menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="top">
        <HeroSection />
       
        <HowItWorks />
        <Testimonials />
      </main>

      <LandingFooter />
    </div>
  )
}
