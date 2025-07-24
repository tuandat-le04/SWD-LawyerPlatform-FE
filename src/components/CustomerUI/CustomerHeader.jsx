import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import AuthButton from '../AuthButton'

export default function CustomerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header className="relative bg-gray-900/95 backdrop-blur-sm shadow-2xl sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 onClick={handleLogoClick} className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                BASICO
              </h1>
              <p className="text-sm text-gray-400 group-hover:text-amber-300 transition-colors duration-300">
                DỊCH VỤ PHÁP LÝ CHUYÊN NGHIỆP
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'transition-all duration-300 relative group ' +
                (isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-amber-400')
              }
            >
              {({ isActive }) => (
                <>
                  TRANG CHỦ
                  <span
                    className={
                      'absolute -bottom-1 left-0 h-0.5 bg-amber-400 transition-all duration-300 ' +
                      (isActive ? 'w-full' : 'w-0 group-hover:w-full')
                    }
                    style={{ width: isActive ? '100%' : undefined }}
                  ></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/lawyer"
              className={({ isActive }) =>
                'transition-all duration-300 font-medium relative group ' +
                (isActive ? 'text-white' : 'text-gray-400 hover:text-amber-400')
              }
            >
              {({ isActive }) => (
                <>
                  ĐỘI NGŨ
                  <span
                    className={
                      'absolute -bottom-1 left-0 h-0.5 bg-amber-400 transition-all duration-300 ' +
                      (isActive ? 'w-full' : 'w-0 group-hover:w-full')
                    }
                    style={{ width: isActive ? '100%' : undefined }}
                  ></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/services"
              className="text-gray-400 hover:text-amber-400 transition-all duration-300 relative group"
            >
              DỊCH VỤ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                'transition-all duration-300 relative group ' +
                (isActive ? 'text-white' : 'text-gray-400 hover:text-amber-400')
              }
            >
              {({ isActive }) => (
                <>
                  LIÊN HỆ
                  <span
                    className={
                      'absolute -bottom-1 left-0 h-0.5 bg-amber-400 transition-all duration-300 ' +
                      (isActive ? 'w-full' : 'w-0 group-hover:w-full')
                    }
                    style={{ width: isActive ? '100%' : undefined }}
                  ></span>
                </>
              )}
            </NavLink>
            <AuthButton />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-amber-400'}>
                TRANG CHỦ
              </NavLink>
              <NavLink to="/lawyer" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400 hover:text-amber-400'}>
                ĐỘI NGŨ
              </NavLink>
              <a href="/#services" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                DỊCH VỤ
              </a>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-400 hover:text-amber-400'}>
                LIÊN HỆ
              </NavLink>
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 