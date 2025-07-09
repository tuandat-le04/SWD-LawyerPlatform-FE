"use client"

import { useState, useEffect } from "react"

//import { adminProfileAPI } from "../../../lib/profileAPI"
import { User, Mail, Phone, Calendar, Shield, Key, Bell, Save, Edit, Camera, AlertCircle } from "lucide-react"

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    id: 1,
    name: "Admin cute",
    email: "admin@gmail.com",
    phone: "0987654321",
    address: "123 ABC",
    role: "Admin",
    department: "Administration",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-22T14:30:00Z",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Experienced administrator managing the legal consultation platform with over 5 years in legal technology.",
    //permissions: ["User Management", "Content Management", "System Settings", "Reports & Analytics"],
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    twoFactorEnabled: true,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ ...profile })
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeSessions, setActiveSessions] = useState([])
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Load profile data on component mount
  useEffect(() => {
    fetchProfile()
    fetchActiveSessions()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await adminProfileAPI.getProfile()
      setProfile(response.data)
      setEditForm(response.data)
    } catch (error) {
      console.error("Error fetching profile:", error)
      setError("Failed to load profile data")
      // Use mock data as fallback
    } finally {
      setLoading(false)
    }
  }

  const fetchActiveSessions = async () => {
    try {
      const response = await adminProfileAPI.getActiveSessions()
      setActiveSessions(response.data.sessions)
    } catch (error) {
      console.error("Error fetching sessions:", error)
      // Use mock data as fallback
      setActiveSessions([
        {
          id: 1,
          device: "Chrome on Windows",
          ip: "192.168.1.100",
          lastActivity: "Current session",
          isCurrent: true,
        },
        {
          id: 2,
          device: "Safari on iPhone",
          ip: "192.168.1.101",
          lastActivity: "2 hours ago",
          isCurrent: false,
        },
        {
          id: 3,
          device: "Firefox on MacOS",
          ip: "192.168.1.102",
          lastActivity: "1 day ago",
          isCurrent: false,
        },
      ])
    }
  }

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const response = await adminProfileAPI.updateProfile(editForm)
      setProfile(response.data)
      setIsEditing(false)
      setSuccess("Profile updated successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
      setError(error.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess("")

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setError("New passwords do not match!")
        return
      }

      if (passwordForm.newPassword.length < 8) {
        setError("Password must be at least 8 characters long!")
        return
      }

      await adminProfileAPI.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setSuccess("Password changed successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error changing password:", error)
      setError(error.response?.data?.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationChange = async (type) => {
    try {
      const updatedNotifications = {
        ...profile.notifications,
        [type]: !profile.notifications[type],
      }

      await adminProfileAPI.updateNotifications(updatedNotifications)

      setProfile({
        ...profile,
        notifications: updatedNotifications,
      })
    } catch (error) {
      console.error("Error updating notifications:", error)
      setError("Failed to update notification preferences")
    }
  }

  const handleToggleTwoFactor = async () => {
    try {
      setLoading(true)
      await adminProfileAPI.toggleTwoFactor()

      setProfile({
        ...profile,
        twoFactorEnabled: !profile.twoFactorEnabled,
      })

      setSuccess(`Two-factor authentication ${profile.twoFactorEnabled ? "disabled" : "enabled"} successfully!`)
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error toggling 2FA:", error)
      setError("Failed to update two-factor authentication")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOutSession = async (sessionId) => {
    try {
      await adminProfileAPI.signOutSession(sessionId)
      setActiveSessions(activeSessions.filter((session) => session.id !== sessionId))
      setSuccess("Session signed out successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error signing out session:", error)
      setError("Failed to sign out session")
    }
  }

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("avatar", file)

      const response = await adminProfileAPI.uploadAvatar(formData)

      setProfile({
        ...profile,
        avatar: response.data.avatarUrl,
      })

      setEditForm({
        ...editForm,
        avatar: response.data.avatarUrl,
      })

      setSuccess("Avatar updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error uploading avatar:", error)
      setError("Failed to upload avatar")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    
      <div className="space-y-6 ml-6 mr-3">
        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-[#3d3451] rounded-xl border border-[#4a4065] p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#B377FF]"
              />
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#B377FF] rounded-full flex items-center justify-center text-white hover:bg-[#9f5eff] transition-colors cursor-pointer">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                  <p className="text-gray-300">{profile.role}</p>
                  <p className="text-sm text-gray-400">{profile.department}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#B377FF] text-white rounded-lg hover:bg-[#9f5eff] transition-colors disabled:opacity-50"
                >
                  <Edit className="w-4 h-4" />
                  <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {formatDate(profile.joinDate)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Shield className="w-4 h-4" />
                  <span>Last login: {formatDateTime(profile.lastLogin)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#3d3451] rounded-xl border border-[#4a4065]">
          <div className="border-b border-[#4a4065]">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "profile", label: "Personal Information", icon: User },
                { id: "security", label: "Security", icon: Shield },
                { id: "notifications", label: "Notifications", icon: Bell },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-[#B377FF] text-[#B377FF]"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                      />
                    ) : (
                      <p className="text-white">{profile.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                      />
                    ) : (
                      <p className="text-white">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                      />
                    ) : (
                      <p className="text-white">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                    {isEditing ? (
                      <select
                        value={editForm.department}
                        onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                        className="w-full px-3 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                      >
                        <option value="Administration">Administration</option>
                        <option value="Legal">Legal</option>
                        <option value="IT">IT</option>
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                      </select>
                    ) : (
                      <p className="text-white">{profile.department}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                    />
                  ) : (
                    <p className="text-white">{profile.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#4a4065] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                    />
                  ) : (
                    <p className="text-white">{profile.bio}</p>
                  )}
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="inline-flex px-3 py-1 text-xs font-medium bg-[#B377FF] bg-opacity-20 text-[#B377FF] rounded-full"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div> */}

                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditForm({ ...profile })
                        setError("")
                      }}
                      disabled={loading}
                      className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-[#4a4065] transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#B377FF] text-white rounded-lg hover:bg-[#9f5eff] transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{loading ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-[#4a4065] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full px-3 py-2 bg-[#3d3451] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-3 py-2 bg-[#3d3451] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 bg-[#3d3451] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                      />
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#B377FF] text-white rounded-lg hover:bg-[#9f5eff] transition-colors disabled:opacity-50"
                    >
                      <Key className="w-4 h-4" />
                      <span>{loading ? "Changing..." : "Change Password"}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#4a4065] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Secure your account with two-factor authentication</p>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={handleToggleTwoFactor}
                      disabled={loading}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
                        profile.twoFactorEnabled ? "bg-[#B377FF]" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          profile.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="bg-[#4a4065] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    {activeSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between py-2 border-b border-[#5B4C73] last:border-b-0"
                      >
                        <div>
                          <p className="text-white">{session.device}</p>
                          <p className="text-sm text-gray-400">
                            IP: {session.ip} • {session.lastActivity}
                          </p>
                        </div>
                        {session.isCurrent ? (
                          <span className="text-green-400 text-sm">Active</span>
                        ) : (
                          <button
                            onClick={() => handleSignOutSession(session.id)}
                            className="text-red-400 text-sm hover:text-red-300"
                          >
                            Sign Out
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-[#4a4065] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive important notifications via email</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange("email")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          profile.notifications.email ? "bg-[#B377FF]" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            profile.notifications.email ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Push Notifications</p>
                        <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange("push")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          profile.notifications.push ? "bg-[#B377FF]" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            profile.notifications.push ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-400">Receive urgent notifications via SMS</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange("sms")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          profile.notifications.sms ? "bg-[#B377FF]" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            profile.notifications.sms ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#4a4065] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Notification Types</h3>
                  <div className="space-y-3">
                    {[
                      "New Orders",
                      "New Customer Registrations",
                      "New Lawyer Applications",
                      "Appointment Bookings",
                      "System Reports",
                      "Security Updates",
                      "Payment Notifications",
                      "User Activity Alerts",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={index < 6}
                          className="w-4 h-4 text-[#B377FF] bg-[#3d3451] border-[#5B4C73] rounded focus:ring-[#B377FF]"
                        />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#4a4065] rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Notification Schedule</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Quiet Hours</label>
                      <div className="flex items-center space-x-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">From</label>
                          <input
                            type="time"
                            defaultValue="22:00"
                            className="px-3 py-2 bg-[#3d3451] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">To</label>
                          <input
                            type="time"
                            defaultValue="08:00"
                            className="px-3 py-2 bg-[#3d3451] border border-[#5B4C73] rounded-lg focus:ring-2 focus:ring-[#B377FF] focus:border-transparent text-white"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">No notifications will be sent during these hours</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
   
  )
}
