"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, ShoppingCart, Users, Scale, Calendar, Package, FileText, Menu, X, LogOut } from "lucide-react"

const menuItems = [
  {
    title: "Profile",
    icon: Users,
    href: "/admin/adminProfile",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    active: true,
  },
  {
    title: "Manage Orders",
    icon: ShoppingCart,
    href: "/admin/manageOrder",
  },
  {
    title: "Manage Customers",
    icon: Users,
    href: "/admin/manageCustomer",
  },
  {
    title: "Manage Lawyers",
    icon: Scale,
    href: "/admin/manageLawyer",
  },
  {
    title: "Manage Appointments",
    icon: Calendar,
    href: "/admin/manageAppointment",
  },
  {
    title: "Service Packages",
    icon: Package,
    href: "/admin/managePackageService",
  },
  {
    title: "Lawsuit Forms",
    icon: FileText,
    href: "/admin/lawsuit-forms",
  },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    window.location.href = "/login"
  }

  return (
    <div
      className={`bg-[#2a2438] text-white transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} min-h-screen flex flex-col border-r border-[#3d3451]`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#3d3451]">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-[#B377FF]" />
              <span className="text-xl font-bold font-sans">BASISCO</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-[#3d3451] transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 font-sans ${
                    isActive ? "bg-[#B377FF] text-white shadow-lg" : "text-gray-300 hover:bg-[#3d3451] hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.title}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#3d3451]">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 w-full font-sans"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )
}
