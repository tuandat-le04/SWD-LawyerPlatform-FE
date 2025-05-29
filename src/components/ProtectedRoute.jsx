import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'

export default function ProtectedRoute() {
    return (
        <Routes>
            <Route element={Layout} />
            <Route index element={<Home />} />
        </Routes>
    )
}
