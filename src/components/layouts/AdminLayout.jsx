import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../AdminUI/AdminHeader'
import AdminSidebar from '../AdminUI/AdminSidebar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  )
}