import { useState, useEffect, useMemo } from 'react'
import { Plus, ArrowLeft } from 'lucide-react'
import Sidebar from './Sidebar'
import FilterTabs from './FilterTabs'
import JobList from './JobList'
import DetailPanel from './DetailPanel'
import AddJobModal from './AddJobModal'
import { getJobs, addJob as addJobToStorage, updateJob, deleteJob } from '../utils/storage'
import { filterJobs, FILTER_OPTIONS } from '../utils/helpers'

export default function JobTracker({ isDarkMode, onToggleTheme, onBackToHome }) {
  const [jobs, setJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDetailPanel, setShowDetailPanel] = useState(false)

  // Load jobs from storage on mount
  useEffect(() => {
    const storedJobs = getJobs()
    setJobs(storedJobs)
  }, [])

  // Filter jobs based on active filter
  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, activeFilter)
  }, [jobs, activeFilter])

  // Get selected job
  const selectedJob = useMemo(() => {
    return jobs.find(job => job.id === selectedJobId) || null
  }, [jobs, selectedJobId])

  // Calculate job counts for each filter
  const jobCounts = useMemo(() => {
    const counts = {
      all: jobs.length,
      active: jobs.filter(j => ['applied', 'pending', 'interview'].includes(j.status)).length
    }
    FILTER_OPTIONS.forEach(opt => {
      if (opt.value !== 'all' && opt.value !== 'active') {
        counts[opt.value] = jobs.filter(j => j.status === opt.value).length
      }
    })
    return counts
  }, [jobs])

  // Handle adding a new job
  const handleAddJob = (newJob) => {
    addJobToStorage(newJob)
    setJobs(prev => [newJob, ...prev])
    setSelectedJobId(newJob.id)
    setShowDetailPanel(true)
  }

  // Handle updating a job
  const handleUpdateJob = (id, updates) => {
    updateJob(id, updates)
    setJobs(prev =>
      prev.map(job =>
        job.id === id ? { ...job, ...updates } : job
      )
    )
  }

  // Handle deleting a job
  const handleDeleteJob = (id) => {
    deleteJob(id)
    setJobs(prev => prev.filter(job => job.id !== id))
    if (selectedJobId === id) {
      setSelectedJobId(null)
      setShowDetailPanel(false)
    }
  }

  // Handle selecting a job
  const handleSelectJob = (id) => {
    setSelectedJobId(id)
    setShowDetailPanel(true)
  }

  // Handle closing detail panel
  const handleCloseDetail = () => {
    setShowDetailPanel(false)
    setSelectedJobId(null)
  }

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-dark-background' : 'bg-background'
    }`}>
      {/* Sidebar */}
      <Sidebar
        onAddJob={() => setIsModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onBackToHome={onBackToHome}
      />

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Job List Section */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${showDetailPanel ? 'lg:flex-[2]' : ''}`}>
          {/* Header */}
          <header className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Back to Home button - mobile only */}
                <button
                  onClick={onBackToHome}
                  className={`md:hidden p-2 rounded-button transition-colors ${
                    isDarkMode
                      ? 'text-dark-text-secondary hover:bg-dark-card'
                      : 'text-text-secondary hover:bg-gray-100'
                  }`}
                  title="Back to Home"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'}`}>
                    Job Tracker
                  </h1>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                    Track and manage your job applications
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className={`hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-white rounded-button text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-dark-accent hover:bg-dark-accent/80'
                    : 'bg-accent hover:bg-accent/90'
                }`}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
                Add Job
              </button>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              jobCounts={jobCounts}
              isDarkMode={isDarkMode}
            />
          </header>

          {/* Job List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="mb-3 flex items-center justify-between">
              <p className={`text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
              }`}>
                Jobs
                <span className={`ml-2 ${isDarkMode ? 'text-dark-text-secondary/50' : 'text-text-secondary/50'}`}>
                  {filteredJobs.length}
                </span>
              </p>
            </div>
            <JobList
              jobs={filteredJobs}
              selectedJobId={selectedJobId}
              onSelectJob={handleSelectJob}
              onDeleteJob={handleDeleteJob}
              onAddJob={() => setIsModalOpen(true)}
              filter={activeFilter}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Detail Panel */}
        <div
          className={`
            fixed inset-y-0 right-0 w-full sm:w-96 lg:w-[400px] lg:relative lg:inset-auto
            transform transition-transform duration-300 ease-in-out z-40
            ${showDetailPanel ? 'translate-x-0' : 'translate-x-full lg:hidden'}
          `}
        >
          <DetailPanel
            job={selectedJob}
            onClose={handleCloseDetail}
            onUpdateJob={handleUpdateJob}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Mobile backdrop for detail panel */}
        {showDetailPanel && (
          <div
            className={`fixed inset-0 z-30 lg:hidden ${isDarkMode ? 'bg-black/40' : 'bg-black/20'}`}
            onClick={handleCloseDetail}
          />
        )}
      </main>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}
