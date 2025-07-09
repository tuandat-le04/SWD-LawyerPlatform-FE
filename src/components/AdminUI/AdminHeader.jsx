"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, User } from "lucide-react"

export default function AdminHeaderSimple({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [adminName, setAdminName] = useState("Admin")

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Get admin name from localStorage or API
  useEffect(() => {
    const storedAdminName = localStorage.getItem("admin_name") || "Admin"
    setAdminName(storedAdminName)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()

    if (hour >= 5 && hour < 12) {
      return "Good Morning"
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon"
    } else if (hour >= 17 && hour < 22) {
      return "Good Evening"
    } else {
      return "Good Night"
    }
  }

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-[#3d3451] shadow-sm border-b border-[#4a4065] px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-bold text-white">Admin Management</h1>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-[#B377FF] font-medium">
                {getGreeting()}, {adminName}! 👋
              </span>
            </div>
            <p className="text-sm text-gray-300">Manage lawyer system • {formatTime()}</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B377FF] rounded-full"></span>
            </button>

            {/* Profile */}
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-[#4a4065] rounded-lg px-3 py-2 transition-colors"
              onClick={() => navigate("/admin/adminProfile")}
            >
              <div className="w-8 h-8 bg-[#B377FF] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{adminName}</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
