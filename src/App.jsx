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


//Admin
import AdminLayout from './components/layouts/AdminLayout'
import AdminProfile from './pages/admin/AdminProfile'
import Dashboard from './pages/admin/Dashboard'
import ManageCustomer from './pages/admin/ManageCustomer'
import ManageLawyer from './pages/admin/ManageLawyer'
import ManageAppointment from './pages/admin/ManageAppointment'
import ManageOrder from './pages/admin/ManageOrder'
import ManagePackageService from './pages/admin/ManagePackageService'

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
                </Route>



           {/* Admin */}
           <Route element={<AdminLayout/>}>
                <Route path="/admin/adminProfile" element={<AdminProfile />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/manageCustomer" element={<ManageCustomer />} />
                <Route path="/admin/manageLawyer" element={<ManageLawyer />} />
                <Route path="/admin/manageAppointment" element={<ManageAppointment />} />
                <Route path="/admin/manageOrder" element={<ManageOrder />}/>
                <Route path="/admin/managePackageService" element={<ManagePackageService />}/>
            </Route>
  

                {/* Lawyer */}
                <Route path="/lawyer/home" element={<LawyerHome />} />
                <Route path="/lawyer/appointments" element={<Appointment />} />
                <Route path="/lawyer/clients" element={<Clients />} />
                <Route path="/lawyer/settings" element={<Settings />} />

            </Routes>
        </Router>
    )
}
