import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomerHeader from '../CustomerUI/CustomerHeader'
import CustomerFooter from '../CustomerUI/CustomerFooter'

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <CustomerHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  )
}