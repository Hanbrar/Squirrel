import { FILTER_OPTIONS } from '../utils/helpers'

export default function FilterTabs({ activeFilter, onFilterChange, jobCounts, isDarkMode }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTER_OPTIONS.map(option => {
        const isActive = activeFilter === option.value
        const count = jobCounts[option.value] || 0

        return (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`
              px-4 py-2 rounded-pill text-sm font-medium transition-all duration-300
              ${isActive
                ? isDarkMode
                  ? 'bg-dark-accent text-white shadow-dark-card'
                  : 'bg-accent text-white shadow-card'
                : isDarkMode
                  ? 'bg-transparent text-dark-text-secondary hover:bg-dark-card hover:shadow-dark-card'
                  : 'bg-transparent text-text-secondary hover:bg-white hover:shadow-card'
              }
            `}
          >
            {option.label}
            {count > 0 && (
              <span className={`ml-2 ${isActive ? 'text-white/70' : isDarkMode ? 'text-dark-text-secondary/50' : 'text-text-secondary/50'}`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
