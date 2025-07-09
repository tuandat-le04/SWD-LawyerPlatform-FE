"use client"

import { useState, useEffect } from "react"

//import { appointmentsAPI } from "../../../lib/api"
import { Search, Calendar, CheckCircle, XCircle, Eye, Edit, MoreHorizontal } from "lucide-react"

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { bg: "bg-[#dec3ff]", text: "text-white", label: "Pending" },
    confirmed: { bg: "bg-[#3db041]", text: "text-white", label: "Confirmed" },
    completed: { bg: "bg-[#3ea8f5]", text: "text-white", label: "Completed" },
    cancelled: { bg: "bg-[#ff1717]", text: "text-white", label: "Cancelled" },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
      <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
      {config.label}
    </span>
  )
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  useEffect(() => {
    fetchAppointments()
  }, [searchTerm, statusFilter, dateFilter])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const params = {
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
        date: dateFilter !== "all" ? dateFilter : undefined,
      }

      const response = await appointmentsAPI.getAll(params)
      setAppointments(response.data.appointments)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      // Mock data for demo
      setAppointments([
        {
          id: 1,
          customerName: "Nguyễn Văn A",
          customerEmail: "nguyenvana@email.com",
          customerPhone: "0901234567",
          lawyerName: "Luật sư Trần Thị B",
          service: "Tư vấn hôn nhân",
          appointmentDate: "2024-01-25",
          appointmentTime: "14:00",
          duration: 60,
          status: "confirmed",
          notes: "Tư vấn về thủ tục ly hôn",
          createdAt: "2024-01-20T10:30:00Z",
          customerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 2,
          customerName: "Lê Thị C",
          customerEmail: "lethic@email.com",
          customerPhone: "0907654321",
          lawyerName: "Luật sư Phạm Văn D",
          service: "Tư vấn doanh nghiệp",
          appointmentDate: "2024-01-26",
          appointmentTime: "10:00",
          duration: 90,
          status: "pending",
          notes: "Tư vấn thành lập công ty",
          createdAt: "2024-01-21T09:15:00Z",
          customerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 3,
          customerName: "Hoàng Văn E",
          customerEmail: "hoangvane@email.com",
          customerPhone: "0903456789",
          lawyerName: "Luật sư Nguyễn Thị F",
          service: "Tư vấn bất động sản",
          appointmentDate: "2024-01-24",
          appointmentTime: "16:00",
          duration: 45,
          status: "completed",
          notes: "Tư vấn mua bán nhà đất",
          createdAt: "2024-01-19T11:20:00Z",
          customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 4,
          customerName: "Hoàng Văn E",
          customerEmail: "hoangvane@email.com",
          customerPhone: "0903456789",
          lawyerName: "Luật sư Nguyễn Thị F",
          service: "Tư vấn bất động sản",
          appointmentDate: "2024-01-24",
          appointmentTime: "16:00",
          duration: 45,
          status: "cancelled",
          notes: "Tư vấn mua bán nhà đất",
          createdAt: "2024-01-19T11:20:00Z",
          customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      await appointmentsAPI.confirm(appointmentId)
      fetchAppointments()
    } catch (error) {
      console.error("Error confirming appointment:", error)
    }
  }

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await appointmentsAPI.cancel(appointmentId)
      fetchAppointments()
    } catch (error) {
      console.error("Error cancelling appointment:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatTime = (timeString) => {
    return timeString
  }

  return (
   
      <div className="space-y-6 ml-6 mr-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-semibold text-white">Manage Appointment </h1>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white placeholder-gray-400 w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select className="px-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white">
              <option>2024</option>
              <option>2023</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-[#B377FF] text-white rounded-lg hover:bg-[#9f5eff] transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Create Appointment</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#3d3451] rounded-xl border border-[#4a4065] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4a4065]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Appointment ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Customer Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Lawyer</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Service</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Date & Time</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-[#4a4065]">
                      {[...Array(8)].map((_, j) => (
                        <td key={j} className="py-4 px-6">
                          <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-[#4a4065] hover:bg-[#4a4065] transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">#{appointment.id.toString().padStart(5, "0")}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={appointment.customerAvatar || "/placeholder.svg"}
                            alt={appointment.customerName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-white font-medium">{appointment.customerName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{appointment.lawyerName}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{appointment.service}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-300">
                          <div>{formatDate(appointment.appointmentDate)}</div>
                          <div className="text-sm text-gray-400">
                            {appointment.appointmentTime} ({appointment.duration}p)
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={appointment.status} />
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{appointment.customerPhone}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-[#B377FF] hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          {appointment.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleConfirmAppointment(appointment.id)}
                                className="p-2 text-green-400 hover:bg-[#4a4065] rounded-lg transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="p-2 text-red-400 hover:bg-[#4a4065] rounded-lg transition-colors"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="p-2 text-gray-400 hover:bg-[#4a4065] rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
  )
}
