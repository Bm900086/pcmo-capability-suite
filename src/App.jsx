import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { PCMOProvider } from './PCMOContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PastValue from './pages/PastValue'
import ValueModel from './pages/ValueModel'
import Competitive from './pages/Competitive'
import Maturity from './pages/Maturity'
import Readiness from './pages/Readiness'
import Proposal from './pages/Proposal'
import Layout from './components/Layout'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="past-value" element={<PastValue />} />
        <Route path="tco" element={<ValueModel />} />
        <Route path="competitive" element={<Competitive />} />
        <Route path="maturity" element={<Maturity />} />
        <Route path="readiness" element={<Readiness />} />
        <Route path="proposal" element={<Proposal />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <PCMOProvider>
        <Router>
          <AppRoutes />
        </Router>
      </PCMOProvider>
    </AuthProvider>
  )
}

export default App

