import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const THEME_COOKIE = 'jobtrack_theme'

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check cookie first
    const savedTheme = Cookies.get(THEME_COOKIE)
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    // Apply theme to body
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    // Save to cookie
    Cookies.set(THEME_COOKIE, isDarkMode ? 'dark' : 'light', { expires: 365 })
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  return { isDarkMode, toggleTheme }
}
