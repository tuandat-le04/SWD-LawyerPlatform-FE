"use client"

import { useState, useEffect } from "react"

//import { ordersAPI } from "../../../lib/api"
import { Search, Eye, Edit, Trash2, Download, Plus, MoreHorizontal } from "lucide-react"

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {  bg: "bg-[#dec3ff]", text: "text-white", label: "Pending" },
    processing: {  bg: "bg-[#3ea8f5]", text: "text-white", label: "Processing" },
    completed: {  bg: "bg-[#3db041]", text: "text-white", label: "Completed" },
    cancelled: { bg: "bg-[#ff1717]", text: "text-white", label: "Cancelled" },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs  font-medium rounded-full ${config.bg} ${config.text}`}>
  
      {config.label}
    </span>
  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchOrders()
  }, [currentPage, searchTerm, statusFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : undefined,
      }

      const response = await ordersAPI.getAll(params)
      setOrders(response.data.orders)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error("Error fetching orders:", error)
      // Mock data for demo
      setOrders([
        {
          id: 1,
          orderNumber: "ORD-001",
          customerName: "John Smith",
          customerEmail: "john.smith@email.com",
          customerPhone: "0901234567",
          service: "Marriage Consultation",
          amount: 500000,
          status: "completed",
          createdAt: "2024-01-15T10:30:00Z",
          lawyer: "Lawyer Sarah Johnson",
          customerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 2,
          orderNumber: "ORD-002",
          customerName: "Emily Davis",
          customerEmail: "emily.davis@email.com",
          customerPhone: "0907654321",
          service: "Business Consultation",
          amount: 1000000,
          status: "processing",
          createdAt: "2024-01-14T14:20:00Z",
          lawyer: "Lawyer Michael Brown",
          customerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 3,
          orderNumber: "ORD-003",
          customerName: "Robert Wilson",
          customerEmail: "robert.wilson@email.com",
          customerPhone: "0903456789",
          service: "Real Estate Consultation",
          amount: 750000,
          status: "pending",
          createdAt: "2024-01-13T09:15:00Z",
          lawyer: "Not Assigned",
          customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
        {
          id: 4,
          orderNumber: "ORD-003",
          customerName: "Robert Wilson",
          customerEmail: "robert.wilson@email.com",
          customerPhone: "0903456789",
          service: "Real Estate Consultation",
          amount: 750000,
          status: "cancelled",
          createdAt: "2024-01-13T09:15:00Z",
          lawyer: "Not Assigned",
          customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
      ])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, newStatus)
      fetchOrders()
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await ordersAPI.delete(orderId)
        fetchOrders()
      } catch (error) {
        console.error("Error deleting order:", error)
      }
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 25000) // Convert VND to USD for display
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
  
      <div className="space-y-6 ml-6 mr-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Order Details</h2>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="search"
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
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select className="px-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white">
              <option>2024</option>
              <option>2023</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-[#4a4065] transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

           
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#3d3451] rounded-xl border border-[#4a4065] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4a4065]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Order ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Customer Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Service</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Lawyer</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Amount</th>
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
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#4a4065] hover:bg-[#4a4065] transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">{order.orderNumber}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={order.customerAvatar || "/placeholder.svg"}
                            alt={order.customerName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-white font-medium">{order.customerName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{order.service}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{order.lawyer}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">{formatCurrency(order.amount)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{order.customerPhone}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-[#B377FF] hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:bg-[#4a4065] rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
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
