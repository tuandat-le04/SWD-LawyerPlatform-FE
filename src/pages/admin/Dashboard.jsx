"use client"

import { useState, useEffect } from "react"

//import { dashboardAPI } from "../../lib/api"
import { Users, ShoppingCart, DollarSign, Scale, Calendar, TrendingUp, TrendingDown } from "lucide-react"


const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-[#3d3451] rounded-xl shadow-sm p-6 border border-[#4a4065]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
        {change && (
          <div
            className={`flex items-center mt-2 text-sm ${
              changeType === "increase" ? "text-green-400" : "text-red-400"
            }`}
          >
            {changeType === "increase" ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {change}
          </div>
        )}
      </div>
      <div className="w-12 h-12 bg-[#B377FF] bg-opacity-20 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#B377FF]" />
      </div>
    </div>
  </div>
)

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalLawyers: 0,
    totalAppointments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getStats()
      setStats(response.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Mock data for demo
      setStats({
        totalCustomers: 1250,
        totalOrders: 450,
        totalRevenue: 125000000,
        totalLawyers: 85,
        totalAppointments: 320,
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  if (loading) {
    return (
      
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
     
    )
  }

  return (
  
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10 ml-6">
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers.toLocaleString()}
            icon={Users}
            change="+12.5%"
            changeType="increase"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            change="+8.2%"
            changeType="increase"
          />
          <StatCard
            title="Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
            change="+15.3%"
            changeType="increase"
          />
          <StatCard
            title="Lawyers"
            value={stats.totalLawyers.toLocaleString()}
            icon={Scale}
            change="+3.1%"
            changeType="increase"
          />
          <StatCard
            title="Appointments"
            value={stats.totalAppointments.toLocaleString()}
            icon={Calendar}
            change="-2.4%"
            changeType="decrease"
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-6">
          {/* Revenue Chart */}
          <div className="bg-[#3d3451] rounded-xl shadow-sm p-6 border border-[#4a4065]">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Revenue</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>The revenue chart will be displayed here</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-[#3d3451] rounded-xl shadow-sm p-6 border border-[#4a4065] ">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-2 border-b border-[#4a4065] last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-white">#ORD-{1000 + item}</p>
                    <p className="text-sm text-gray-400">Customer {item}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(500000 * item)}</p>
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-500 bg-opacity-20 text-green-400 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#3d3451] rounded-xl shadow-sm p-6 border border-[#4a4065] ml-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-dashed border-[#5B4C73] rounded-lg hover:border-[#B377FF] hover:bg-[#B377FF] hover:bg-opacity-10 transition-colors">
              <Users className="w-8 h-8 text-[#B377FF] mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-300">Add Customer</p>
            </button>
            <button className="p-4 border-2 border-dashed border-[#5B4C73] rounded-lg hover:border-[#B377FF] hover:bg-[#B377FF] hover:bg-opacity-10 transition-colors">
              <Scale className="w-8 h-8 text-[#B377FF] mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-300">Add Lawyer</p>
            </button>
            <button className="p-4 border-2 border-dashed border-[#5B4C73] rounded-lg hover:border-[#B377FF] hover:bg-[#B377FF] hover:bg-opacity-10 transition-colors">
              <Calendar className="w-8 h-8 text-[#B377FF] mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-300">Create Appointment</p>
            </button>
            <button className="p-4 border-2 border-dashed border-[#5B4C73] rounded-lg hover:border-[#B377FF] hover:bg-[#B377FF] hover:bg-opacity-10 transition-colors">
              <ShoppingCart className="w-8 h-8 text-[#B377FF] mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-300">View Orders</p>
            </button>
          </div>
        </div>
      </div>
    
  )
}
