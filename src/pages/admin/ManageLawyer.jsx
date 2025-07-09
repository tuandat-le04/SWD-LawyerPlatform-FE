"use client"

import { useState, useEffect } from "react"

//import { lawyersAPI } from "../../../lib/api"
import { Search, UserPlus, Eye, Edit, Trash2, CheckCircle, XCircle, Star, MoreHorizontal } from "lucide-react"

const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { bg: "bg-green-500", text: "text-white", label: "Active" },
    pending: { bg: "bg-yellow-500", text: "text-white", label: "Pending" },
    rejected: { bg: "bg-red-500", text: "text-white", label: "Rejected" },
    suspended: { bg: "bg-gray-500", text: "text-white", label: "Suspended" },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
      <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
      {config.label}
    </span>
  )
}

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchLawyers()
  }, [searchTerm, statusFilter])

  const fetchLawyers = async () => {
    try {
      setLoading(true)
      const params = {
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
      }

      const response = await lawyersAPI.getAll(params)
      setLawyers(response.data.lawyers)
    } catch (error) {
      console.error("Error fetching lawyers:", error)
      // Mock data for demo
      setLawyers([
        {
          id: 1,
          name: "Luật sư Nguyễn Văn A",
          email: "nguyenvana@lawfirm.com",
          phone: "0901234567",
          specialization: "Luật Dân sự",
          experience: 8,
          rating: 4.8,
          totalCases: 156,
          status: "active",
          licenseNumber: "LS001234",
          education: "Đại học Luật Hà Nội",
          createdAt: "2024-01-15T10:30:00Z",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 2,
          name: "Luật sư Trần Thị B",
          email: "tranthib@lawfirm.com",
          phone: "0907654321",
          specialization: "Luật Hình sự",
          experience: 12,
          rating: 4.9,
          totalCases: 203,
          status: "active",
          licenseNumber: "LS005678",
          education: "Đại học Luật TP.HCM",
          createdAt: "2024-01-10T09:15:00Z",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 3,
          name: "Luật sư Lê Văn C",
          email: "levanc@lawfirm.com",
          phone: "0903456789",
          specialization: "Luật Doanh nghiệp",
          experience: 5,
          rating: 4.6,
          totalCases: 89,
          status: "pending",
          licenseNumber: "LS009012",
          education: "Đại học Luật Đà Nẵng",
          createdAt: "2024-01-05T11:20:00Z",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        },
        {
            id: 4,
            name: "Luật sư Lê Văn C",
            email: "levanc@lawfirm.com",
            phone: "0903456789",
            specialization: "Luật Doanh nghiệp",
            experience: 5,
            rating: 4.6,
            totalCases: 89,
            status: "pending",
            licenseNumber: "LS009012",
            education: "Đại học Luật Đà Nẵng",
            createdAt: "2024-01-05T11:20:00Z",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          },
          {
            id: 5,
            name: "Luật sư Lê Văn C",
            email: "levanc@lawfirm.com",
            phone: "0903456789",
            specialization: "Luật Doanh nghiệp",
            experience: 5,
            rating: 4.6,
            totalCases: 89,
            status: "pending",
            licenseNumber: "LS009012",
            education: "Đại học Luật Đà Nẵng",
            createdAt: "2024-01-05T11:20:00Z",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleApproveLawyer = async (lawyerId) => {
    try {
      await lawyersAPI.approve(lawyerId)
      fetchLawyers()
    } catch (error) {
      console.error("Error approving lawyer:", error)
    }
  }

  const handleRejectLawyer = async (lawyerId) => {
    try {
      await lawyersAPI.reject(lawyerId)
      fetchLawyers()
    } catch (error) {
      console.error("Error rejecting lawyer:", error)
    }
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-500"}`}
      />
    ))
  }

  return (
    
      <div className="space-y-6 ml-6 mr-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Lawyer Management</h2>

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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
            </select>

            <select className="px-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white">
              <option>2024</option>
              <option>2023</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-[#B377FF] text-white rounded-lg hover:bg-[#9f5eff] transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Add Lawyer</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#3d3451] rounded-xl border border-[#4a4065] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4a4065]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Lawyer ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Lawyer Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Specialization</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Experience</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Rating</th>
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
                ) : lawyers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-gray-500">
                      No lawyers found
                    </td>
                  </tr>
                ) : (
                  lawyers.map((lawyer) => (
                    <tr key={lawyer.id} className="border-b border-[#4a4065] hover:bg-[#4a4065] transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">#{lawyer.id.toString().padStart(5, "0")}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={lawyer.avatar || "/placeholder.svg"}
                            alt={lawyer.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-white font-medium">{lawyer.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{lawyer.specialization}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{lawyer.experience} năm</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">{renderStars(lawyer.rating)}</div>
                          <span className="text-gray-300 text-sm">{lawyer.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={lawyer.status} />
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{lawyer.phone}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-[#B377FF] hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          {lawyer.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApproveLawyer(lawyer.id)}
                                className="p-2 text-green-400 hover:bg-[#4a4065] rounded-lg transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRejectLawyer(lawyer.id)}
                                className="p-2 text-red-400 hover:bg-[#4a4065] rounded-lg transition-colors"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="p-2 text-red-400 hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
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
