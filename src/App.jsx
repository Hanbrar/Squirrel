import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import LandingPage from './components/LandingPage'
import JobTracker from './components/JobTracker'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const { isDarkMode, toggleTheme } = useTheme()

  const handleStartTracking = () => {
    setCurrentPage('tracker')
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
  }

  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage
          onStartTracking={handleStartTracking}
          isDarkMode={isDarkMode}
        />
        <Analytics />
      </>
    )
  }

  return (
    <>
      <JobTracker
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onBackToHome={handleBackToHome}
      />
      <Analytics />
    </>
  )
}
