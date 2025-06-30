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

// Lawyer
import LawyerHome from "./pages/lawyer/LawyerHome";
import Appointment from "./pages/lawyer/Appointment";

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

                {/* Lawyer */}
                <Route path="/lawyer/home" element={<LawyerHome />} />
                <Route path="/lawyer/appointments" element={<Appointment />} />
            </Routes>
        </Router>
    )
}
