import React from 'react'
import Home from './pages/Home'
import './styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LawyerPage from './pages/lawyer/LawyerPage'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                
                {/* Lawyer Introduction Page */}
                <Route path='/lawyer' element={<LawyerPage />} />
            </Routes>
        </Router>
    )
}
