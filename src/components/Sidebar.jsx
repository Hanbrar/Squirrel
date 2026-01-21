import { LayoutDashboard, Plus, Sun, Moon, Home } from 'lucide-react'

export default function Sidebar({ onAddJob, isDarkMode, onToggleTheme, onBackToHome }) {
  return (
    <aside className={`w-[70px] md:w-[80px] flex flex-col items-center py-6 border-r shrink-0 transition-colors duration-300 ${
      isDarkMode
        ? 'bg-dark-background border-dark-border'
        : 'bg-background border-border'
    }`}>
      {/* Logo - clickable to go home */}
      <button onClick={onBackToHome} className="mb-8 transition-transform hover:scale-105">
        <img
          src={isDarkMode ? '/logo-dark.png' : '/logo-light.png'}
          alt="Squirrel"
          className="w-10 h-10 object-contain"
        />
      </button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-2">
        {/* Home */}
        <button
          onClick={onBackToHome}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isDarkMode
              ? 'text-dark-text-secondary hover:bg-dark-card hover:shadow-dark-card'
              : 'text-text-secondary hover:bg-card hover:shadow-card'
          }`}
          title="Home"
        >
          <Home className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Dashboard - Active */}
        <button
          className={`w-12 h-12 rounded-xl text-white flex items-center justify-center transition-all hover:scale-105 ${
            isDarkMode ? 'bg-dark-accent' : 'bg-accent'
          }`}
          title="Job Tracker"
        >
          <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isDarkMode
              ? 'text-dark-text-secondary hover:bg-dark-card hover:shadow-dark-card'
              : 'text-text-secondary hover:bg-card hover:shadow-card'
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" strokeWidth={1.5} />
          ) : (
            <Moon className="w-6 h-6" strokeWidth={1.5} />
          )}
        </button>

        {/* Add Job Button */}
        <button
          onClick={onAddJob}
          className={`w-12 h-12 rounded-xl text-white flex items-center justify-center transition-all hover:scale-105 ${
            isDarkMode ? 'bg-dark-accent hover:shadow-dark-card-hover' : 'bg-accent hover:shadow-card-hover'
          }`}
          title="Add Job"
        >
          <Plus className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>
    </aside>
  )
}
