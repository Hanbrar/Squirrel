import Cookies from 'js-cookie'

const COOKIE_NAME = 'jobtrack_jobs'
const COOKIE_OPTIONS = {
  expires: 365, // 1 year
  sameSite: 'strict'
}

export function getJobs() {
  try {
    const cookieData = Cookies.get(COOKIE_NAME)
    if (!cookieData) return []
    return JSON.parse(cookieData)
  } catch (error) {
    console.error('Error reading jobs from cookie:', error)
    return []
  }
}

export function saveJobs(jobs) {
  try {
    Cookies.set(COOKIE_NAME, JSON.stringify(jobs), COOKIE_OPTIONS)
    return true
  } catch (error) {
    console.error('Error saving jobs to cookie:', error)
    // If cookie storage fails (size limit), fallback to localStorage
    try {
      localStorage.setItem(COOKIE_NAME, JSON.stringify(jobs))
      return true
    } catch (localError) {
      console.error('Error saving to localStorage:', localError)
      return false
    }
  }
}

export function addJob(job) {
  const jobs = getJobs()
  jobs.unshift(job)
  return saveJobs(jobs)
}

export function updateJob(id, updates) {
  const jobs = getJobs()
  const index = jobs.findIndex(job => job.id === id)
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updates }
    return saveJobs(jobs)
  }
  return false
}

export function deleteJob(id) {
  const jobs = getJobs()
  const filtered = jobs.filter(job => job.id !== id)
  return saveJobs(filtered)
}

export function generateId() {
  return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
