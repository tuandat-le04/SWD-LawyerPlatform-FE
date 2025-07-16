import React from "react";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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



export default function App() {
    return (
        <Router>
            <Routes>
                {/* Customer */}
                <Route element={<CustomerLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/lawyer' element={<LawyerPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path="/appointment" element={<AppointmentPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>



                {/* Admin */}
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/manageCustomer" element={<ManageCustomer />} />
                <Route path="/admin/appointments" element={<ManageAppointments />} />
                <Route path="/admin/services" element={<ManageServices />} />
                <Route path="/admin/lawyers" element={<ManageLawyers />} />
                <Route path="/admin/reports" element={<ManageReports />} />
                <Route path="/admin/settings" element={<ManageProfile />} />

                {/* Lawyer */}
                <Route path="/lawyer/home" element={<LawyerHome />} />
                <Route path="/lawyer/appointments" element={<Appointment />} />
                <Route path="/lawyer/clients" element={<Clients />} />
                <Route path="/lawyer/settings" element={<Settings />} />
            </Routes>
        </Router>
    )
}
