import { Navigate } from 'react-router-dom'

/**
 * Route guard — redirects unauthenticated users to /login.
 * Checks for the presence of a JWT token in localStorage.
 */
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('InsightLoop_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
