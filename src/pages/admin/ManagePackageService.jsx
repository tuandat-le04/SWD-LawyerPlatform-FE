"use client"

import { useState, useEffect } from "react"

//import { servicePackagesAPI } from "../../../lib/api"
import { Search, Plus, Eye, Edit, Trash2, Package, ToggleLeft, ToggleRight, MoreHorizontal } from "lucide-react"

const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { bg: "bg-green-500", text: "text-white", label: "Active" },
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

export default function ServicePackagesPage() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    fetchPackages()
  }, [searchTerm, categoryFilter])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const params = {
        search: searchTerm,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
      }

      const response = await servicePackagesAPI.getAll(params)
      setPackages(response.data.packages)
    } catch (error) {
      console.error("Error fetching packages:", error)
      // Mock data for demo
      setPackages([
        {
          id: 1,
          name: "Gói tư vấn cơ bản",
          description: "Tư vấn pháp lý cơ bản cho cá nhân và doanh nghiệp nhỏ",
          category: "consultation",
          price: 500000,
          duration: 60,
          lawyers: [
            {
              id: 1,
              name: "Luật sư Nguyễn Thị A",
              specialization: "Luật Dân sự",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face",
            },
            {
              id: 2,
              name: "Luật sư Trần Văn B",
              specialization: "Luật Gia đình",
              avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
            },
          ],
          legalServices: [
            "Tư vấn trực tiếp",
            "Hỗ trợ qua email",
            "Tài liệu pháp lý cơ bản",
            "Xem xét hợp đồng",
            "Tài liệu tư vấn pháp lý",
          ],
          status: "active",
          totalOrders: 156,
          createdAt: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          name: "Gói tư vấn nâng cao",
          description: "Tư vấn chuyên sâu với luật sư có kinh nghiệm",
          category: "consultation",
          price: 1000000,
          duration: 120,
          lawyers: [
            {
              id: 3,
              name: "Luật sư Lê Thị C",
              specialization: "Luật Doanh nghiệp",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            },
            {
              id: 4,
              name: "Luật sư Phạm Văn D",
              specialization: "Luật Hình sự",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            },
            {
              id: 5,
              name: "Luật sư Hoàng Thị E",
              specialization: "Luật Thuế",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            },
          ],
          legalServices: [
            "Tư vấn chuyên sâu",
            "Hỗ trợ 24/7",
            "Soạn thảo hợp đồng",
            "Đại diện pháp lý",
            "Chuẩn bị tài liệu tòa án",
            "Lập kế hoạch pháp lý",
            "Xem xét tuân thủ",
          ],
          status: "active",
          totalOrders: 89,
          createdAt: "2024-01-10T09:15:00Z",
        },
        {
          id: 3,
          name: "Gói dịch vụ pháp lý doanh nghiệp",
          description: "Dịch vụ pháp lý toàn diện cho doanh nghiệp",
          category: "business",
          price: 5000000,
          duration: 0,
          lawyers: [
            {
              id: 6,
              name: "Luật sư Vũ Văn F",
              specialization: "Luật Doanh nghiệp",
              avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
            },
            {
              id: 7,
              name: "Luật sư Đỗ Thị G",
              specialization: "Luật Kinh doanh",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face",
            },
            {
              id: 8,
              name: "Luật sư Bùi Văn H",
              specialization: "Luật Hợp đồng",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            },
            {
              id: 9,
              name: "Luật sư Ngô Thị I",
              specialization: "Luật Lao động",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            },
          ],
          legalServices: [
            "Tư vấn thường xuyên",
            "Soạn thảo và xem xét hợp đồng",
            "Đại diện tại tòa án",
            "Hỗ trợ thủ tục hành chính",
            "Tuân thủ doanh nghiệp",
            "Hướng dẫn luật lao động",
            "Bảo vệ sở hữu trí tuệ",
            "Hỗ trợ M&A",
            "Đánh giá và quản lý rủi ro",
          ],
          status: "inactive",
          totalOrders: 23,
          createdAt: "2024-01-05T11:20:00Z",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (packageId) => {
    try {
      await servicePackagesAPI.toggleStatus(packageId)
      fetchPackages()
    } catch (error) {
      console.error("Error toggling package status:", error)
    }
  }

  const handleDeletePackage = async (packageId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa gói dịch vụ này?")) {
      try {
        await servicePackagesAPI.delete(packageId)
        fetchPackages()
      } catch (error) {
        console.error("Error deleting package:", error)
      }
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getCategoryLabel = (category) => {
    const categories = {
      consultation: "Tư vấn",
      business: "Doanh nghiệp",
      litigation: "Tranh tụng",
      contract: "Hợp đồng",
    }
    return categories[category] || category
  }

  return (
   
      <div className="space-y-6 ml-6 mr-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Chi tiết gói dịch vụ</h2>

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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="consultation">Tư vấn</option>
              <option value="business">Doanh nghiệp</option>
              <option value="litigation">Tranh tụng</option>
              <option value="contract">Hợp đồng</option>
            </select>

            <select className="px-4 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white">
              <option>2024</option>
              <option>2023</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-[#B377FF] text-white rounded-lg hover:bg-[#9f5eff] transition-colors">
              <Plus className="w-4 h-4" />
              <span>Thêm gói dịch vụ</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#3d3451] rounded-xl border border-[#4a4065] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4a4065]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">ID Gói</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Tên gói dịch vụ</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Danh mục</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Giá</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Luật sư</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Dịch vụ</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Trạng thái</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Thao tác</th>
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
                ) : packages.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-gray-500">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p>Không có gói dịch vụ nào</p>
                    </td>
                  </tr>
                ) : (
                  packages.map((pkg) => (
                    <tr key={pkg.id} className="border-b border-[#4a4065] hover:bg-[#4a4065] transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">#{pkg.id.toString().padStart(5, "0")}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-white font-medium">{pkg.name}</div>
                          <div className="text-sm text-gray-400 mt-1">{pkg.description}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-[#B377FF] bg-opacity-20 text-[#B377FF] rounded-full">
                          {getCategoryLabel(pkg.category)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-white font-medium">{formatCurrency(pkg.price)}</div>
                        {pkg.duration > 0 && <div className="text-sm text-gray-400">{pkg.duration} phút</div>}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-1">
                          {pkg.lawyers.slice(0, 3).map((lawyer, index) => (
                            <img
                              key={index}
                              src={lawyer.avatar || "/placeholder.svg"}
                              alt={lawyer.name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-600"
                              title={`${lawyer.name} - ${lawyer.specialization}`}
                            />
                          ))}
                          {pkg.lawyers.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-[#B377FF] flex items-center justify-center text-xs text-white font-medium">
                              +{pkg.lawyers.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{pkg.lawyers.length} luật sư</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-white font-medium">{pkg.legalServices.length} dịch vụ</div>
                        <div className="text-sm text-gray-400">
                          {pkg.legalServices.slice(0, 2).map((service, index) => (
                            <div key={index} className="truncate">
                              {service}
                            </div>
                          ))}
                          {pkg.legalServices.length > 2 && (
                            <div className="text-xs text-gray-500">+{pkg.legalServices.length - 2} khác</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={pkg.status} />
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
                            onClick={() => handleToggleStatus(pkg.id)}
                            className={`p-2 hover:bg-[#4a4065] rounded-lg transition-colors ${
                              pkg.status === "active" ? "text-green-400" : "text-gray-400"
                            }`}
                          >
                            {pkg.status === "active" ? (
                              <ToggleRight className="w-4 h-4" />
                            ) : (
                              <ToggleLeft className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
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
