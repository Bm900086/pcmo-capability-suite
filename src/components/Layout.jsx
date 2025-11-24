import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import GlobalConfiguration from './GlobalConfiguration'
import ChatWidget from './ChatWidget'

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 print:block">
      <div className="print:hidden">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto print:w-full print:overflow-visible">
        <div className="print:hidden">
          <GlobalConfiguration />
        </div>
        <Outlet />
      </main>
      {/* Chat Widget - Available on all pages */}
      <div className="print:hidden">
        <ChatWidget />
      </div>
    </div>
  )
}

export default Layout

