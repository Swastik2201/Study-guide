import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [name, setName] = useState(localStorage.getItem('name'))

  function login(newToken, newName) {
    localStorage.setItem('token', newToken)
    localStorage.setItem('name', newName)
    setToken(newToken)
    setName(newName)
  }

  function logout() {
    localStorage.clear()
    setToken(null)
    setName(null)
  }

  return (
    <AuthContext.Provider value={{ token, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)