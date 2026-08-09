import { useEffect, useState } from 'react'
import PlanSetupForm from './PlanSetupForm'
import StudyTimeline from './StudyTimeline'

function Dashboard() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchLatestPlan() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/plan/latest`
      )

      if (response.status === 404) {
        setPlan(null)
        return
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load study plan.')
      }

      setPlan(data)
    } catch (err) {
      setError(err.message || 'Unable to connect to backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestPlan()
  }, [])

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  if (!plan && !error) {
    return <PlanSetupForm />
  }

  if (error) {
    return (
      <div>
        <h1>StudyMate Dashboard</h1>

        <p>{error}</p>

        <button onClick={fetchLatestPlan}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>StudyMate Dashboard</h1>

      <h2>Latest Study Plan</h2>

      <p>
        <strong>Date:</strong> {plan.date}
      </p>

      <p>
        <strong>Study Hours:</strong> {plan.hours} hours
      </p>

      <h3>Subjects</h3>

      <ul>
        {plan.subjects?.map((subject, index) => (
          <li key={index}>{subject}</li>
        ))}
      </ul>

      <StudyTimeline days={plan.days} />
    </div>
  )
}

export default Dashboard