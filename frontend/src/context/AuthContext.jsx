import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children, onLogout }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null)
  const [adminEmail, setAdminEmail] = useState(null)

  const isLoggedIn = Boolean(token)

  const login = (newToken, email) => {
    localStorage.setItem('admin_token', newToken)
    setToken(newToken)
    setAdminEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setAdminEmail(null)
    if (onLogout) onLogout()
  }

  // Listen for 401 events dispatched by axiosInstance
  useEffect(() => {
    const handleAuthLogout = () => logout()
    window.addEventListener('auth:logout', handleAuthLogout)
    return () => window.removeEventListener('auth:logout', handleAuthLogout)
  }, [])

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, adminEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
