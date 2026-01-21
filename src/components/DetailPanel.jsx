import { useState, useEffect } from 'react'
import { X, ExternalLink, Calendar, Clock, FileText } from 'lucide-react'
import { STATUS_CONFIG, STATUSES, daysSince } from '../utils/helpers'
import CompanyLogo from './CompanyLogo'

export default function DetailPanel({ job, onClose, onUpdateJob, isDarkMode }) {
  const [notes, setNotes] = useState(job?.notes || '')

  useEffect(() => {
    setNotes(job?.notes || '')
  }, [job?.id])

  if (!job) {
    return (
      <div className={`h-full rounded-tl-modal rounded-bl-modal flex items-center justify-center p-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-dark-card' : 'bg-card'
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-dark-background' : 'bg-gray-100'
          }`}>
            <FileText className={`w-8 h-8 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`} strokeWidth={1.5} />
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
            Select a job to view details
          </p>
        </div>
      </div>
    )
  }

  const daysTracking = daysSince(job.dateAdded)

  const handleStatusChange = (newStatus) => {
    onUpdateJob(job.id, { status: newStatus })
  }

  const handleNotesChange = (e) => {
    const newNotes = e.target.value
    setNotes(newNotes)
  }

  const handleNotesBlur = () => {
    if (notes !== job.notes) {
      onUpdateJob(job.id, { notes })
    }
  }

  return (
    <div className={`h-full rounded-tl-modal rounded-bl-modal flex flex-col overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-dark-card' : 'bg-card'
    }`}>
      {/* Header */}
      <div className={`p-6 border-b ${isDarkMode ? 'border-dark-border' : 'border-border'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <CompanyLogo company={job.company} domain={job.domain} size="large" />
            <div>
              <h2 className={`font-semibold text-lg ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
                {job.title || 'Untitled Position'}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-button transition-colors ${
              isDarkMode
                ? 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-card-hover'
                : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm transition-colors ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
          View Job Listing
        </a>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Status Selector */}
        <section>
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-3 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            Status
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {STATUSES.map(status => {
              const config = STATUS_CONFIG[status]
              const isActive = job.status === status

              return (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`
                    px-3 py-2 rounded-button text-sm font-medium transition-all
                    ${isActive
                      ? isDarkMode
                        ? 'ring-2 ring-offset-2 ring-offset-dark-card ring-white/20'
                        : 'ring-2 ring-offset-2 ring-accent/20'
                      : 'hover:opacity-80'
                    }
                  `}
                  style={{
                    backgroundColor: isDarkMode ? config.darkBgHex : config.bgHex,
                    color: isDarkMode ? config.darkTextHex : config.textHex
                  }}
                >
                  {config.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* Quick Stats */}
        <section>
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-3 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-card p-3 ${isDarkMode ? 'bg-dark-background' : 'bg-gray-50'}`}>
              <div className={`flex items-center gap-2 mb-1 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs">Added</span>
              </div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
                {new Date(job.dateAdded).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className={`rounded-card p-3 ${isDarkMode ? 'bg-dark-background' : 'bg-gray-50'}`}>
              <div className={`flex items-center gap-2 mb-1 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs">Tracking</span>
              </div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
                {daysTracking} {daysTracking === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section>
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-3 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            Notes
          </h3>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            onBlur={handleNotesBlur}
            placeholder="Add notes about this application..."
            className={`w-full h-32 p-3 text-sm border rounded-button resize-none focus:outline-none focus:ring-2 focus:ring-focus transition-all ${
              isDarkMode
                ? 'bg-dark-background border-dark-border text-dark-text-primary placeholder-dark-text-secondary'
                : 'bg-white border-border text-text-primary'
            }`}
          />
        </section>

        {/* Timeline placeholder */}
        <section>
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-3 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isDarkMode ? 'bg-dark-accent' : 'bg-accent'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>Job added to tracker</p>
                <p className={`text-xs ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                  {new Date(job.dateAdded).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
