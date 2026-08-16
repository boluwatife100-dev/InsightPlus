import { Link } from 'react-router-dom'
import { ClipboardEditIcon } from 'lucide-react'

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-[#f3efff] flex items-center justify-center p-4">
      <main className="w-full max-w-2xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-sm text-center">
          <div className="mx-auto w-16 h-16 bg-[#630ED4] rounded-full flex items-center justify-center mb-6 shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M5 13l4 4L19 7"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Thanks for your feedback!</h1>
          <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto">
            Your response has been shared with the team. It goes straight into their dashboard —
            and straight into what they improve next.
          </p>
          
          <div className="mb-10">
            <Link 
              to="/" 
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              Back to home
            </Link>
          </div>
          
          <p className="flex items-center justify-center gap-2 text-sm text-gray-400 font-medium bg-gray-50 py-3 px-4 rounded-xl">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5 shrink-0">
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M12 9v4m0 4h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Every response is anonymous and only used to improve the experience.
          </p>
        </div>
      </main>
    </div>
  )
}
