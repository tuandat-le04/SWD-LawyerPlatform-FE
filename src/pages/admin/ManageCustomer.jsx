"use client"

import { useState, useEffect } from "react"

//import { customersAPI } from "../../../lib/api"
import { Search, Eye, Edit, Trash2, UserPlus, Shield, ShieldOff, MoreHorizontal } from "lucide-react"

const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { bg: "bg-green-500", text: "text-white", label: "Active" },
    blocked: { bg: "bg-red-500", text: "text-white", label: "Blocked" },
    inactive: { bg: "bg-gray-500", text: "text-white", label: "Inactive" },
  }

  const config = statusConfig[status] || statusConfig.active

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
      <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
      {config.label}
    </span>
  )
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCustomers()
  }, [currentPage, searchTerm, statusFilter])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
      }

      const response = await customersAPI.getAll(params)
      setCustomers(response.data.customers)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error("Error fetching customers:", error)
      // Mock data for demo
      setCustomers([
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@email.com",
          phone: "0901234567",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          status: "active",
          totalOrders: 5,
          totalSpent: 2500000,
          createdAt: "2024-01-15T10:30:00Z",
          lastLogin: "2024-01-20T14:20:00Z",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 2,
          name: "Lê Thị B",
          email: "lethib@email.com",
          phone: "0907654321",
          address: "456 Đường XYZ, Quận 3, TP.HCM",
          status: "active",
          totalOrders: 3,
          totalSpent: 1800000,
          createdAt: "2024-01-10T09:15:00Z",
          lastLogin: "2024-01-19T16:45:00Z",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 3,
          name: "Trần Văn C",
          email: "tranvanc@email.com",
          phone: "0903456789",
          address: "789 Đường DEF, Quận 7, TP.HCM",
          status: "blocked",
          totalOrders: 1,
          totalSpent: 500000,
          createdAt: "2024-01-05T11:20:00Z",
          lastLogin: "2024-01-18T10:30:00Z",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
        {
            id: 4,
            name: "Trần Văn C",
            email: "tranvanc@email.com",
            phone: "0903456789",
            address: "789 Đường DEF, Quận 7, TP.HCM",
            status: "blocked",
            totalOrders: 1,
            totalSpent: 500000,
            createdAt: "2024-01-05T11:20:00Z",
            lastLogin: "2024-01-18T10:30:00Z",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          },
          {
            id: 5,
            name: "Trần Văn C",
            email: "tranvanc@email.com",
            phone: "0903456789",
            address: "789 Đường DEF, Quận 7, TP.HCM",
            status: "blocked",
            totalOrders: 1,
            totalSpent: 500000,
            createdAt: "2024-01-05T11:20:00Z",
            lastLogin: "2024-01-18T10:30:00Z",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          },
      ])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockCustomer = async (customerId) => {
    try {
      await customersAPI.block(customerId)
      fetchCustomers()
    } catch (error) {
      console.error("Error blocking customer:", error)
    }
  }

  const handleUnblockCustomer = async (customerId) => {
    try {
      await customersAPI.unblock(customerId)
      fetchCustomers()
    } catch (error) {
      console.error("Error unblocking customer:", error)
    }
  }

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await customersAPI.delete(customerId)
        fetchCustomers()
      } catch (error) {
        console.error("Error deleting customer:", error)
      }
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
   
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ml-6 mr-3">
          <h2 className="text-xl font-semibold text-white">Customer Details</h2>

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
              <option value="blocked">Blocked</option>
              <option value="inactive">Inactive</option>
            </select>

            <select className="px-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white">
              <option>2024</option>
              <option>2023</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-[#B377FF] text-white rounded-lg hover:bg-[#9f5eff] transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
          </div>
        </div>

        {/* List of customer */}
        <div className="bg-[#3d3451] rounded-xl border border-[#4a4065] overflow-hidden ml-6 mr-3">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4a4065]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Customer ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Customer Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Address</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-[#4a4065]">
                      {[...Array(7)].map((_, j) => (
                        <td key={j} className="py-4 px-6">
                          <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-[#4a4065] hover:bg-[#4a4065] transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">#{customer.id.toString().padStart(5, "0")}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={customer.avatar || "/placeholder.svg"}
                            alt={customer.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-white font-medium">{customer.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{customer.email}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{customer.address}</span>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={customer.status} />
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{customer.phone}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-[#B377FF] hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          {customer.status === "active" ? (
                            <button
                              onClick={() => handleBlockCustomer(customer.id)}
                              className="p-2 text-red-400 hover:bg-[#4a4065] rounded-lg transition-colors"
                            >
                              <ShieldOff className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnblockCustomer(customer.id)}
                              className="p-2 text-green-400 hover:bg-[#4a4065] rounded-lg transition-colors"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="p-2 text-red-400 hover:bg-[#4a4065] rounded-lg transition-colors"
                          >
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
