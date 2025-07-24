import React from "react";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Customer
import CustomerLayout from './components/layouts/CustomerLayout'
import Home from './pages/customer/Home'
import Login from './pages/customer/Login'
import LawyerPage from './pages/customer/LawyerPage'
import ContactPage from './pages/customer/Contact'
import Register from './pages/customer/Register'
import AppointmentPage from "./pages/customer/AppointmentPage"
import ServicesPage from "./pages/customer/Services"
import Profile from "./pages/customer/Profile"
import LegalFormsPage from "./pages/customer/LegalFormsPage";

// Payment
import PaymentReturn from './pages/PaymentReturn';

//Admin
import AdminHome from "./pages/admin/Home"
import ManageCustomer from "./pages/admin/ManageCustomer"
import ManageAppointments from "./pages/admin/ManageAppointments"
import ManageServices from "./pages/admin/ManageServices"
import ManageLawyers from "./pages/admin/ManageLawyers"
import ManageReports from "./pages/admin/ManageReports"
import ManageProfile from "./pages/admin/ManageProfile"

// Lawyer
import LawyerHome from "./pages/lawyer/LawyerHome";
import Appointment from "./pages/lawyer/Appointment";
import Clients from "./pages/lawyer/Clients";
import Settings from "./pages/lawyer/Settings";

// Unauthorized component
const Unauthorized = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
            <p className="text-xl text-gray-600 mb-8">Bạn không có quyền truy cập trang này</p>
            <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Về trang chủ
            </a>
        </div>
    </div>
);

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/unauthorized' element={<Unauthorized />} />
                    <Route path='/payment/return' element={<PaymentReturn />} />
                    
                    {/* Customer routes */}
                    <Route element={<CustomerLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path='/lawyer' element={<LawyerPage />} />
                        <Route path='/contact' element={<ContactPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        
                        {/* Protected customer routes */}
                        <Route path="/appointment" element={
                            <ProtectedRoute requiredRole="Customer">
                                <AppointmentPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                            <ProtectedRoute requiredRole="Customer">
                                <Profile />
                            </ProtectedRoute>
                        } />
                        <Route path="/legal-forms" element={
                            <ProtectedRoute requiredRole="Customer">
                                <LegalFormsPage />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Admin routes - Protected */}
                    <Route path="/admin" element={
                        <ProtectedRoute requiredRole="Admin">
                            <AdminHome />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/manageCustomer" element={
                        <ProtectedRoute requiredRole="Admin">
                            <ManageCustomer />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/appointments" element={
                        <ProtectedRoute requiredRole="Admin">
                            <ManageAppointments />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/services" element={
                        <ProtectedRoute requiredRole="Admin">
                            <ManageServices />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/lawyers" element={
                        <ProtectedRoute requiredRole="Admin">
                            <ManageLawyers />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/reports" element={
                        <ProtectedRoute requiredRole="Admin">
                            <ManageReports />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/settings" element={
                        <ProtectedRoute requiredRole="Admin">
                            <ManageProfile />
                        </ProtectedRoute>
                    } />

                    {/* Lawyer routes - Protected */}
                    <Route path="/lawyer/home" element={
                        <ProtectedRoute requiredRole="Lawyer">
                            <LawyerHome />
                        </ProtectedRoute>
                    } />
                    <Route path="/lawyer/appointments" element={
                        <ProtectedRoute requiredRole="Lawyer">
                            <Appointment />
                        </ProtectedRoute>
                    } />
                    <Route path="/lawyer/clients" element={
                        <ProtectedRoute requiredRole="Lawyer">
                            <Clients />
                        </ProtectedRoute>
                    } />
                    <Route path="/lawyer/settings" element={
                        <ProtectedRoute requiredRole="Lawyer">
                            <Settings />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    )
}
