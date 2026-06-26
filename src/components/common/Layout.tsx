import { useState } from "react"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { Outlet } from "react-router-dom"

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto min-h-[calc(100vh-57px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
