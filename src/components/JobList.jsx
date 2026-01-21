import JobCard from './JobCard'
import EmptyState from './EmptyState'

export default function JobList({ jobs, selectedJobId, onSelectJob, onDeleteJob, onAddJob, filter, isDarkMode }) {
  if (jobs.length === 0) {
    return <EmptyState onAddJob={onAddJob} filter={filter} isDarkMode={isDarkMode} />
  }

  return (
    <div className="grid gap-3">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          isSelected={job.id === selectedJobId}
          onClick={() => onSelectJob(job.id)}
          onDelete={onDeleteJob}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  )
}
