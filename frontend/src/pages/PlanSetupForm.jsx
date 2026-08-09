import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Computer Science',
  'Data Structures',
  'Artificial Intelligence',
]

function PlanSetupForm() {
  const [subjects, setSubjects] = useState([])
  const [date, setDate] = useState('')
  const [hours, setHours] = useState(2)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleSubjectChange(subject) {
    setSubjects((current) =>
      current.includes(subject)
        ? current.filter((item) => item !== subject)
        : [...current, subject]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (subjects.length === 0) {
      setError('Please select at least one subject.')
      return
    }

    if (!date) {
      setError('Please select a date.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/plan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subjects,
            date,
            hours,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create study plan.')
      }

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Unable to connect to backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Set Up Your Study Plan</h1>

      <form onSubmit={handleSubmit}>
        <h3>Select Subjects</h3>

        {SUBJECTS.map((subject) => (
          <label key={subject} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={subjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
            />
            {subject}
          </label>
        ))}

        <h3>Study Date</h3>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <h3>Study Hours</h3>

        <input
          type="range"
          min="1"
          max="12"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
        />

        <p>{hours} hour(s)</p>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Plan...' : 'Create Study Plan'}
        </button>
      </form>
    </div>
  )
}

export default PlanSetupForm