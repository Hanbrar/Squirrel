import { useState, useEffect } from 'react'
import { getCompanyColor, getCompanyInitials } from '../utils/helpers'

// Logo.dev API key from environment variable
const LOGO_API_KEY = import.meta.env.VITE_LOGO_API_KEY

export default function CompanyLogo({ company, domain, size = 'default', className = '' }) {
  const [logoError, setLogoError] = useState(false)
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0)

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    default: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg'
  }

  // Extract root domain from full domain (e.g., jobs.cisco.com -> cisco.com)
  const getRootDomain = (fullDomain) => {
    if (!fullDomain) return null
    const parts = fullDomain.toLowerCase().split('.')

    // Handle cases like jobs.cisco.com, www.tesla.com, careers.google.com
    if (parts.length > 2) {
      return parts.slice(-2).join('.')
    }
    return fullDomain
  }

  // Build list of Logo.dev URLs to try in order
  const getLogoUrls = () => {
    const urls = []

    // 1. Try root domain (most reliable for Logo.dev)
    // e.g., jobs.cisco.com -> cisco.com
    if (domain) {
      const rootDomain = getRootDomain(domain)
      if (rootDomain) {
        urls.push(`https://img.logo.dev/${rootDomain}?token=${LOGO_API_KEY}`)
      }
    }

    // 2. Try company name + .com as fallback
    if (company) {
      const cleanCompany = company.toLowerCase().replace(/[^a-z0-9]/g, '')
      const companyDomain = `${cleanCompany}.com`
      // Avoid duplicates
      const companyUrl = `https://img.logo.dev/${companyDomain}?token=${LOGO_API_KEY}`
      if (!urls.includes(companyUrl)) {
        urls.push(companyUrl)
      }
    }

    return urls
  }

  const logoUrls = getLogoUrls()
  const companyColor = getCompanyColor(company)
  const initials = getCompanyInitials(company)

  // Reset state when company/domain changes
  useEffect(() => {
    setLogoError(false)
    setCurrentUrlIndex(0)
  }, [company, domain])

  const handleImageError = () => {
    // Try next URL in the list
    if (currentUrlIndex < logoUrls.length - 1) {
      setCurrentUrlIndex(prev => prev + 1)
    } else {
      // All URLs failed, show initials
      setLogoError(true)
    }
  }

  // Show initials fallback
  if (logoError || logoUrls.length === 0) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-lg flex items-center justify-center font-semibold shrink-0 ${className}`}
        style={{
          backgroundColor: companyColor.bg,
          color: companyColor.text
        }}
      >
        {initials}
      </div>
    )
  }

  // Show logo
  return (
    <div className={`${sizeClasses[size]} rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
      <img
        src={logoUrls[currentUrlIndex]}
        alt={`${company} logo`}
        className="w-full h-full object-contain p-1"
        onError={handleImageError}
      />
    </div>
  )
}
