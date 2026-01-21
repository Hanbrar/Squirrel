import { FolderOpen, Plus } from 'lucide-react'

export default function EmptyState({ onAddJob, filter, isDarkMode }) {
  const isFiltered = filter !== 'all'

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Illustration */}
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-dark-card' : 'bg-gray-100'}`}>
        <FolderOpen className={`w-12 h-12 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`} strokeWidth={1} />
      </div>

      {/* Message */}
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
        {isFiltered ? 'No jobs found' : 'No jobs yet'}
      </h3>
      <p className={`text-sm text-center max-w-xs mb-6 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
        {isFiltered
          ? 'Try changing the filter or add more jobs to your tracker.'
          : 'Start tracking your job applications by adding your first job listing.'}
      </p>

      {/* CTA */}
      {!isFiltered && (
        <button
          onClick={onAddJob}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-button text-sm font-medium transition-colors ${
            isDarkMode
              ? 'bg-dark-accent text-white hover:bg-dark-accent/80'
              : 'bg-accent text-white hover:bg-accent/90'
          }`}
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          Add Your First Job
        </button>
      )}
    </div>
  )
}
