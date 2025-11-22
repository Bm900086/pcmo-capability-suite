import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 print:block">
      <div className="print:hidden">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto print:w-full print:overflow-visible">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

