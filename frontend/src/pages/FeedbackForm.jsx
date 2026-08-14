import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { feedbackService } from '../services/index.js'
import LandingButton from '../components/landing/LandingButton.jsx'
import SmartLink from '../components/landing/SmartLink.jsx'
import { NAV_GROUPS } from '../components/landing/content.jsx'
import { ChevronIcon, MenuIcon } from '../components/landing/icons.jsx'
import { CONTAINER, EASE_OUT, ICON_BUTTON, NAV_LINK_HOVER } from '../components/landing/styles.js'
import { ClipboardEditIcon } from 'lucide-react'
import {toast} from "sonner"

function NavDropdown({ label, items, isOpen, onToggle }) {
  const closeDropdown = () => onToggle(false)

  return (
    <details className="group relative" open={isOpen} onToggle={(event) => onToggle(event.currentTarget.open)}>
      <summary className="inline-flex list-none items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-150 hover:bg-[var(--color-primary-faint)] hover:text-[var(--color-primary-strong)] [&::-webkit-details-marker]:hidden">
        {label}
        <span
          className={"inline-flex transition-transform duration-150 ${EASE_OUT} group-open:rotate-180"}
          aria-hidden="true"
        >
          <ChevronIcon className="h-[0.9rem] w-[0.9rem]" />
        </span>
      </summary>

      <div className="absolute top-[calc(100%+0.5rem)] left-1/2 flex min-w-[13rem] -translate-x-1/2 flex-col gap-1 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-pop)]">
        {items?.map((link) => (
          <SmartLink
            key={link.text}
            href={link.href}
            onClick={closeDropdown}
            className={"block whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--color-text)] ${NAV_LINK_HOVER}"}
          >
            {link.text}
          </SmartLink>
        ))}
      </div>
    </details>
  )
}

function LandingHeader({ menuOpen, onOpenMenu }) {
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('details')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(215,205,240,0.7)] bg-[rgba(246,244,252,0.82)] backdrop-blur-[12px]">
      <div className={"${CONTAINER} flex items-center gap-6 py-4 min-[721px]:py-6"}>
        <a href="#top" className="inline-flex shrink-0 leading-none">
          <img
            src="/in-logo.png"
            alt="InsightLoop logo"
            className="h-auto w-40"
          />
        </a>

        <nav className="mx-auto hidden items-center gap-2 min-[1101px]:flex" aria-label="Main navigation">
          {NAV_GROUPS?.map((group) => (
            <NavDropdown
              key={group.label}
              label={group.label}
              items={group.items}
              isOpen={openDropdown === group.label}
              onToggle={(isOpen) => setOpenDropdown(isOpen ? group.label : null)}
            />
          ))}
          <SmartLink
            href="/login?mode=signup"
            className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-150 hover:bg-[var(--color-primary-faint)] hover:text-[var(--color-primary-strong)]"
          >
            Pricing
          </SmartLink>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 min-[1101px]:flex">
          <LandingButton href="/login" variant="outline" className=" rounded-sm text-sm font-semibold">
            Login
          </LandingButton>
          <LandingButton href="/login?mode=signup" className=" rounded-sm text-sm font-semibold">
            Create an Account
          </LandingButton>
        </div>

        <button
          type="button"
          className={"ml-auto ${ICON_BUTTON} min-[1101px]:hidden"}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        >
          <MenuIcon className="h-[1.35rem] w-[1.35rem]" />
        </button>
      </div>
    </header>
  )
}

function StarRating({ rating, setRating, size = 'lg', label }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`transition-colors ${rating >= star ? 'text-purple-600' : 'text-purple-200'}`}
          aria-label={`Rate ${star} stars`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function FeedbackForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const businessName = searchParams.get('business') || 'RITE RESTAURANT'
  const [overallRating, setOverallRating] = useState(0)
  const [emotion, setEmotion] = useState(null)
  const [productRating, setProductRating] = useState(0)
  const [serviceRating, setServiceRating] = useState(0)
  const [teamRating, setTeamRating] = useState(0)
  const [comment, setComment] = useState('')
  const [contact, setContact] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const getRatingText = (r) => {
    if (r === 5) return 'Excellent!'
    if (r === 4) return 'Great!'
    if (r === 3) return 'Okay'
    if (r === 2) return 'Poor'
    if (r === 1) return 'Terrible'
    return ''
  }

  const isFormValid = 
    overallRating > 0 && 
    emotion !== null && 
    productRating > 0 && 
    serviceRating > 0 && 
    teamRating > 0 && 
    (!contact || (contactName.trim() !== '' && contactEmail.trim() !== ''))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) {
      setError('Please complete all required fields.')
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      await feedbackService.submitFeedback({
        rating: overallRating,
        category: 'Service',
        comment: comment || 'No comment provided.',
        emotion,
        productRating,
        serviceRating,
        teamRating,
        contactRequested: contact,
        contactName,
        contactEmail
      })
      navigate('/thank-you')
    } catch (err) {
      setError(err.message || 'Failed to submit feedback')
      toast.error(err.message || err)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3efff]">
      <LandingHeader menuOpen={false} onOpenMenu={() => {}} />

      <main className="mx-auto max-w-3xl md:max-w-6xl px-4 py-12">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Rate your experience</h1>
          <p className="text-gray-500 tracking-wide text-sm font-normal mb-8">Tell us what you think about your recent interaction</p>

          <div className="inline-flex items-center gap-4 bg-[#F1EBFF] rounded-2xl px-6 py-4 mb-8 text-left w-full max-w-3xl border border-gray-100">
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-gray-400 font-serif italic text-lg"><ClipboardEditIcon/></span>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 tracking-wider uppercase mb-1">Reviewing</div>
              <div className="font-bold text-gray-900 uppercase tracking-wider">{businessName}</div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-8">
            <StarRating rating={overallRating} setRating={setOverallRating} size="xl" />
            <div className="text-purple-600 font-medium text-sm mt-2 min-h-[1.25rem]">
              {getRatingText(overallRating)}
            </div>
          </div>

          <div className="flex justify-between w-full max-w-3xl mx-auto gap-4 mb-12">
            <button
              type="button"
              onClick={() => setEmotion('sad')}
              className={`flex flex-col items-center justify-center w-54 lg:w-60 py-3 rounded-xl border ${emotion === 'sad' ? 'bg-purple-50 border-[#630ED4] lg:py-5  text-[#630ED4]' : 'bg-white border-gray-200 text-gray-400 hover:border-[#630ED4] hover:text-[#630ED4]'} transition-all`}
            >
              <span className="text-2xl lg:text-3xl mb-1">😢</span>
              <span className="text-sm font-medium">Sad</span>
            </button>
            <button
              type="button"
              onClick={() => setEmotion('neutral')}
              className={`flex flex-col items-center justify-center w-54 lg:w-60 py-3 rounded-xl border ${emotion === 'neutral' ? 'bg-purple-50 border-[#630ED4] lg:py-5  text-[#630ED4]' : 'bg-white border-gray-200 text-gray-400 hover:border-[#630ED4] hover:text-[#630ED4]'} transition-all`}
            >
              <span className="text-2xl lg:text-3xl mb-1">😐</span>
              <span className="text-sm font-medium">Neutral</span>
            </button>
            <button
              type="button"
              onClick={() => setEmotion('happy')}
              className={`flex flex-col items-center justify-center w-54 lg:w-60 py-3 lg:py-5 rounded-xl border ${emotion === 'happy' ? 'bg-purple-50 border-[#630ED4] text-[#630ED4]' : 'bg-white border-gray-200 text-gray-400 hover:border-[#630ED4] hover:text-[#630ED4]'} transition-all`}
            >
              <span className="text-2xl lg:text-3xl mb-1">😊</span>
              <span className="text-sm font-medium">Happy</span>
            </button>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto mb-10">
            {[
              { id: 'product', label: 'How satisfied are you with our product?', state: productRating, setter: setProductRating },
              { id: 'service', label: 'How satisfied are you with our service?', state: serviceRating, setter: setServiceRating },
              { id: 'team', label: 'How satisfied are you with our team?', state: teamRating, setter: setTeamRating },
            ].map((q) => (
              <div key={q.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-10">
                <span className="text-gray-700 text-justify text-lg w-1/4">{q.label}</span>
                <div className="w-3/4 flex justify-between">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => q.setter(star)}
                      className="flex items-center justify-center w-15 h-15 rounded bg-[#f3efff] hover:bg-[#e9e0ff] transition-colors"
                      aria-label={`Rate ${star} for ${q.id}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill={q.state === star ? '#630ED4' : 'none'}
                        stroke="#630ED4"
                        strokeWidth={q.state === star ? '0' : '1.5'}
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto text-left">
            <div className="mb-8">
              <label htmlFor="detailed-feedback" className="block text-sm font-bold text-gray-900 mb-2">
                Detailed Feedback
              </label>
              <textarea
                id="detailed-feedback"
                className="w-full bg-purple-50/50 border border-purple-100 rounded-xl p-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px] resize-none"
                placeholder="Write your review here... What did you love? What could be better?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <p className="text-sm font-bold text-gray-900 mb-3">Would you like a representative to contact you?</p>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact"
                    className="accent-purple-600 w-4 h-4"
                    checked={contact === true}
                    onChange={() => setContact(true)}
                  />
                  <span className="text-sm text-gray-700 font-medium">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact"
                    className="accent-purple-600 w-4 h-4"
                    checked={contact === false}
                    onChange={() => {
                      setContact(false)
                      setContactName('')
                      setContactEmail('')
                    }}
                  />
                  <span className="text-sm text-gray-700 font-medium">No</span>
                </label>
              </div>
              
              {contact && (
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-purple-50/50 border border-purple-100 rounded-xl p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Jane Doe"
                      required={contact}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-purple-50/50 border border-purple-100 rounded-xl p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="jane@example.com"
                      required={contact}
                    />
                  </div>
                </div>
              )}
            </div>

            {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-full inline-flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
