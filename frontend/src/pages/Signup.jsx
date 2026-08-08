import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        return setError(data.error)
      }

      login(data.token, data.name)
      navigate('/dashboard')
    } catch (err) {
      setError('Unable to connect to the backend')
    }
  }

  return (
    <div>
      <h1>StudyMate Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {error && <p>{error}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup