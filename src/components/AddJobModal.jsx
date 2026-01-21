import { useState } from 'react'
import { X, Link2, FileText, Building2 } from 'lucide-react'
import { extractDomain, extractCompanyName, extractCompanyFromUrl, getLogoUrl } from '../utils/helpers'
import { generateId } from '../utils/storage'
import CompanyLogo from './CompanyLogo'

export default function AddJobModal({ isOpen, onClose, onAddJob, isDarkMode }) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [previewDomain, setPreviewDomain] = useState('')
  const [previewCompany, setPreviewCompany] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleUrlChange = (e) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    setError('')

    // Auto-extract domain and company for preview
    if (newUrl) {
      try {
        // Ensure URL has protocol for parsing
        let urlToParse = newUrl
        if (!urlToParse.startsWith('http://') && !urlToParse.startsWith('https://')) {
          urlToParse = 'https://' + urlToParse
        }

        const domain = extractDomain(urlToParse)
        const extractedCompany = extractCompanyFromUrl(urlToParse)
        setPreviewDomain(domain)

        // Capitalize the extracted company name
        const capitalizedCompany = extractedCompany.charAt(0).toUpperCase() + extractedCompany.slice(1)
        setPreviewCompany(capitalizedCompany)

        if (!company) {
          setCompany(capitalizedCompany)
        }
      } catch {
        setPreviewDomain('')
        setPreviewCompany('')
      }
    } else {
      setPreviewDomain('')
      setPreviewCompany('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validate URL
    if (!url.trim()) {
      setError('Please enter a job URL')
      return
    }

    let validUrl = url.trim()
    // Add https if missing
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl
    }

    try {
      new URL(validUrl)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    const domain = extractDomain(validUrl)
    const companyName = company.trim() || extractCompanyName(domain)

    const newJob = {
      id: generateId(),
      url: validUrl,
      title: title.trim() || 'Untitled Position',
      company: companyName,
      domain: domain,
      logo: getLogoUrl(companyName),
      status: 'not-applied',
      dateAdded: new Date().toISOString(),
      notes: ''
    }

    onAddJob(newJob)
    handleClose()
  }

  const handleClose = () => {
    setUrl('')
    setTitle('')
    setCompany('')
    setPreviewDomain('')
    setPreviewCompany('')
    setError('')
    onClose()
  }

  const displayCompany = company || previewCompany

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${isDarkMode ? 'bg-black/50' : 'bg-black/30'}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`relative rounded-modal w-full max-w-md mx-4 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-dark-card shadow-dark-elevated' : 'bg-card shadow-elevated'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${isDarkMode ? 'border-dark-border' : 'border-border'}`}>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>Add New Job</h2>
          <button
            onClick={handleClose}
            className={`p-2 rounded-button transition-colors ${
              isDarkMode
                ? 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-card-hover'
                : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* URL Input */}
          <div>
            <label className={`block text-xs font-medium uppercase tracking-wider mb-2 ${
              isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
            }`}>
              Job URL *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link2 className={`w-5 h-5 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`} strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://careers.company.com/job/123"
                className={`w-full pl-10 pr-4 py-3 border rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-focus transition-all ${
                  isDarkMode
                    ? 'bg-dark-background border-dark-border text-dark-text-primary placeholder-dark-text-secondary'
                    : 'bg-white border-border text-text-primary'
                }`}
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
          </div>

          {/* Job Title Input */}
          <div>
            <label className={`block text-xs font-medium uppercase tracking-wider mb-2 ${
              isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
            }`}>
              Job Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className={`w-5 h-5 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`} strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Software Engineer"
                className={`w-full pl-10 pr-4 py-3 border rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-focus transition-all ${
                  isDarkMode
                    ? 'bg-dark-background border-dark-border text-dark-text-primary placeholder-dark-text-secondary'
                    : 'bg-white border-border text-text-primary'
                }`}
              />
            </div>
          </div>

          {/* Company Name Input */}
          <div>
            <label className={`block text-xs font-medium uppercase tracking-wider mb-2 ${
              isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
            }`}>
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className={`w-5 h-5 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`} strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Auto-detected from URL"
                className={`w-full pl-10 pr-4 py-3 border rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-focus transition-all ${
                  isDarkMode
                    ? 'bg-dark-background border-dark-border text-dark-text-primary placeholder-dark-text-secondary'
                    : 'bg-white border-border text-text-primary'
                }`}
              />
            </div>
          </div>

          {/* Preview */}
          {previewDomain && (
            <div className={`rounded-card p-4 ${isDarkMode ? 'bg-dark-background' : 'bg-gray-50'}`}>
              <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
              }`}>
                Preview
              </p>
              <div className="flex items-center gap-3">
                <CompanyLogo company={displayCompany} domain={previewDomain} size="default" />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
                    {title || 'Untitled Position'}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                    {displayCompany || extractCompanyName(previewDomain)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className={`flex-1 px-4 py-3 border rounded-button text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'border-dark-border text-dark-text-secondary hover:bg-dark-card-hover'
                  : 'border-border text-text-secondary hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-3 rounded-button text-sm font-medium text-white transition-colors ${
                isDarkMode
                  ? 'bg-dark-accent hover:bg-dark-accent/80'
                  : 'bg-accent hover:bg-accent/90'
              }`}
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
