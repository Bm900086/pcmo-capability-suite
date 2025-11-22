import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (username, password) => {
    // Hardcoded authentication: admin / password123
    if (username === 'admin' && password === 'password123') {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

