import { ExternalLink, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'
import CompanyLogo from './CompanyLogo'
import { formatRelativeDate } from '../utils/helpers'

export default function JobCard({ job, isSelected, onClick, onDelete, isDarkMode }) {
  return (
    <div
      onClick={onClick}
      className={`
        group rounded-card p-4 cursor-pointer transition-all duration-300
        ${isDarkMode
          ? `bg-dark-card ${isSelected ? 'shadow-dark-card-hover ring-2 ring-white/10' : 'shadow-dark-card hover:shadow-dark-card-hover hover:scale-[1.01]'}`
          : `bg-card ${isSelected ? 'shadow-card-hover ring-2 ring-accent/10' : 'shadow-card hover:shadow-card-hover hover:scale-[1.01]'}`
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Company Logo */}
        <CompanyLogo company={job.company} domain={job.domain} size="default" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className={`font-semibold truncate text-sm ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
                {job.title || 'Untitled Position'}
              </h3>
              <p className={`text-xs mt-0.5 truncate ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                {job.company}
              </p>
            </div>
            <StatusBadge status={job.status} size="small" isDarkMode={isDarkMode} />
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
              {formatRelativeDate(job.dateAdded)}
            </span>

            {/* Action Icons */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className={`p-1.5 rounded-button transition-colors ${
                  isDarkMode
                    ? 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-card-hover'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`}
                title="Open job listing"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <button
                onClick={e => {
                  e.stopPropagation()
                  onDelete(job.id)
                }}
                className={`p-1.5 rounded-button transition-colors ${
                  isDarkMode
                    ? 'text-dark-text-secondary hover:text-red-400 hover:bg-red-900/30'
                    : 'text-text-secondary hover:text-red-500 hover:bg-red-50'
                }`}
                title="Delete job"
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
