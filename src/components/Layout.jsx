import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <ul>
                <Link to='/'></Link>
            </ul>

            <Outlet />
        </>
    )
}
