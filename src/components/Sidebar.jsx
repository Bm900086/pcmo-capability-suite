import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Calculator, 
  BarChart3, 
  Gauge, 
  CheckCircle2,
  FileText,
  LogOut
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/past-value', label: 'Past Value Analysis', icon: TrendingUp },
    { path: '/tco', label: 'Value Model (TCO/ROI)', icon: Calculator },
    { path: '/competitive', label: 'Competitive TCO', icon: BarChart3 },
    { path: '/maturity', label: 'Maturity Assessment', icon: Gauge },
    { path: '/readiness', label: 'VCF 9.0 Readiness', icon: CheckCircle2 },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">PCMO Suite</h1>
        <p className="text-sm text-gray-400 mt-1">Capability Suite</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          to="/proposal"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/proposal'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Proposal</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

