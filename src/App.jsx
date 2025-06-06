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
import AppointmentPage from "./pages/customer/AppointmentPage";


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
                </Route>



            </Routes>
        </Router>
    )
}
