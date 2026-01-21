// Extract the main company name from a URL
// Example: https://jobs.cisco.com/... → "cisco"
// Example: https://careers.google.com/... → "google"
export function extractCompanyFromUrl(url) {
  try {
    const urlObj = new URL(url)
    let hostname = urlObj.hostname.toLowerCase()

    // Remove www prefix
    hostname = hostname.replace(/^www\./, '')

    // Common job board subdomains to strip
    const jobSubdomains = [
      'careers', 'jobs', 'work', 'hire', 'talent', 'apply',
      'recruiting', 'employment', 'join', 'workday', 'greenhouse',
      'lever', 'ashbyhq', 'boards'
    ]

    const parts = hostname.split('.')

    // Handle cases like jobs.lever.co, boards.greenhouse.io (ATS platforms)
    const atsPlatforms = ['lever.co', 'greenhouse.io', 'ashbyhq.com', 'workday.com', 'myworkdayjobs.com']
    for (const ats of atsPlatforms) {
      if (hostname.endsWith(ats)) {
        // The company name is usually the first part
        return parts[0]
      }
    }

    // If we have a subdomain like careers.google.com or jobs.cisco.com
    if (parts.length >= 2) {
      const firstPart = parts[0]
      // If first part is a job-related subdomain, the company is the second part
      if (jobSubdomains.includes(firstPart)) {
        return parts[1]
      }
      // Otherwise, the first part is likely the company name
      return firstPart
    }

    // Fallback to the first part before the TLD
    return parts[0]
  } catch (error) {
    console.error('Error extracting company from URL:', error)
    return ''
  }
}

// Extract the main company domain from a URL (for display purposes)
export function extractDomain(url) {
  try {
    const urlObj = new URL(url)
    let hostname = urlObj.hostname

    // Remove common subdomains
    const subdomainsToRemove = ['www', 'careers', 'jobs', 'work', 'hire', 'talent', 'apply', 'recruiting']
    const parts = hostname.split('.')

    // If we have a subdomain like careers.google.com
    if (parts.length > 2) {
      const subdomain = parts[0].toLowerCase()
      if (subdomainsToRemove.includes(subdomain)) {
        parts.shift()
        hostname = parts.join('.')
      }
    }

    return hostname
  } catch (error) {
    console.error('Error extracting domain:', error)
    return ''
  }
}

// Extract company name from domain (capitalize)
export function extractCompanyName(domain) {
  if (!domain) return 'Unknown Company'

  // Get the main part of the domain (before the TLD)
  const parts = domain.split('.')
  let name = parts[0]

  // Handle special cases like co.uk
  if (parts.length > 2 && parts[parts.length - 2].length <= 3) {
    name = parts[parts.length - 3] || parts[0]
  }

  // Capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// Get logo URL from Clearbit using extracted company name
// Uses {company}.com format for better logo detection
export function getLogoUrl(companyName) {
  if (!companyName) return null
  // Clean company name and create domain format
  const cleanName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '')
  return `https://logo.clearbit.com/${cleanName}.com`
}

// Get logo URL from full domain (fallback)
export function getLogoUrlFromDomain(domain) {
  if (!domain) return null
  return `https://logo.clearbit.com/${domain}`
}

// Generate a consistent color for company initials based on company name
export function getCompanyColor(companyName) {
  const colors = [
    { bg: '#DBEAFE', text: '#2563EB' }, // Blue
    { bg: '#D1FAE5', text: '#059669' }, // Green
    { bg: '#FEE2E2', text: '#DC2626' }, // Red
    { bg: '#F3E8FF', text: '#7C3AED' }, // Purple
    { bg: '#FEF3C7', text: '#D97706' }, // Amber
    { bg: '#CFFAFE', text: '#0891B2' }, // Cyan
    { bg: '#FCE7F3', text: '#DB2777' }, // Pink
    { bg: '#E0E7FF', text: '#4F46E5' }, // Indigo
  ]

  // Generate a hash from the company name
  let hash = 0
  const name = companyName || 'Unknown'
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

// Get initials from company name
export function getCompanyInitials(companyName) {
  if (!companyName) return '?'
  // Take first letter, uppercase
  return companyName.charAt(0).toUpperCase()
}

// Format date relative to now
export function formatRelativeDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  }

  return date.toLocaleDateString()
}

// Calculate days since a date
export function daysSince(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

// Status configuration
export const STATUS_CONFIG = {
  'not-applied': {
    label: 'Not Applied',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-500',
    bgHex: '#F3F4F6',
    textHex: '#6B7280',
    darkBgHex: '#374151',
    darkTextHex: '#9CA3AF'
  },
  'applied': {
    label: 'Applied',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    bgHex: '#DBEAFE',
    textHex: '#2563EB',
    darkBgHex: '#1E3A5F',
    darkTextHex: '#60A5FA'
  },
  'pending': {
    label: 'Pending',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
    bgHex: '#FEF3C7',
    textHex: '#D97706',
    darkBgHex: '#451A03',
    darkTextHex: '#FBBF24'
  },
  'interview': {
    label: 'Interview',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    bgHex: '#F3E8FF',
    textHex: '#7C3AED',
    darkBgHex: '#2E1065',
    darkTextHex: '#A78BFA'
  },
  'offer': {
    label: 'Offer',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-600',
    bgHex: '#D1FAE5',
    textHex: '#059669',
    darkBgHex: '#064E3B',
    darkTextHex: '#34D399'
  },
  'rejected': {
    label: 'Rejected',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    bgHex: '#FEE2E2',
    textHex: '#DC2626',
    darkBgHex: '#450A0A',
    darkTextHex: '#F87171'
  }
}

export const STATUSES = Object.keys(STATUS_CONFIG)

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'not-applied', label: 'Not Applied' },
  { value: 'applied', label: 'Applied' },
  { value: 'pending', label: 'Pending' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' }
]

// Filter jobs by status
export function filterJobs(jobs, filter) {
  if (filter === 'all') return jobs
  if (filter === 'active') {
    return jobs.filter(job => ['applied', 'pending', 'interview'].includes(job.status))
  }
  return jobs.filter(job => job.status === filter)
}
