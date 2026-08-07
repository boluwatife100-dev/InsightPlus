import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import FeedbackForm from './pages/FeedbackForm.jsx'
import Confirmation from './pages/Confirmation.jsx'
import DashboardLayout from './pages/dashboard/DashboardLayout.jsx'
import Overview from './pages/dashboard/Overview.jsx'
import Feedback from './pages/dashboard/Feedback.jsx'
import AiInsight from './pages/dashboard/AiInsight.jsx'
import Settings from './pages/dashboard/Settings.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/thank-you" element={<Confirmation />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="ai-insight" element={<AiInsight />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
