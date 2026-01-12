// src/components/MainNav.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const MainNav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if current page is login, signup, or forgot password
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/' || location.pathname === '/forgot-password';
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Health Tool', href: '/healthtool' },
    { name: 'Location', href: '/location' },
    { name: 'Doctors', href: '/doctor' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <nav className={`${isAuthPage ? 'bg-[#33444E] text-white' : 'bg-white shadow-sm border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${isAuthPage ? 'bg-white' : 'bg-blue-600'} rounded-lg flex items-center justify-center shadow-md`}>
              <span className={`${isAuthPage ? 'text-[#33444E]' : 'text-white'} font-bold text-lg`}>M</span>
            </div>
            <span className={`text-xl font-bold ${isAuthPage ? 'text-white' : 'text-gray-800'}`}>
              MalariaScope AI
            </span>
          </div>

          {/* Auth Pages - Login/Signup links */}
          {isAuthPage ? (
            <div className="hidden sm:flex items-center space-x-4">
              <a 
                href="/login" 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/login' 
                    ? 'bg-white text-[#33444E]' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Login
              </a>
              <a 
                href="/signup" 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/signup' 
                    ? 'bg-white text-[#33444E]' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Signup
              </a>
            </div>
          ) : (
            /* Non-Auth Pages - Main Navigation */
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}

          {/* Mobile menu button */}
          <div className={`${isAuthPage ? 'sm:hidden' : 'md:hidden'}`}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 ${
                isAuthPage 
                  ? 'text-white hover:bg-white hover:bg-opacity-10 focus:ring-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:ring-blue-500'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`${isAuthPage ? 'sm:hidden' : 'md:hidden'}`}>
            <div className={`px-2 pt-2 pb-3 space-y-1 border-t ${
              isAuthPage 
                ? 'bg-[#33444E] border-white border-opacity-20' 
                : 'bg-white border-gray-200'
            }`}>
              {isAuthPage ? (
                /* Mobile Auth Links */
                <>
                  <a
                    href="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === '/login'
                        ? 'bg-white text-[#33444E]'
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === '/signup'
                        ? 'bg-white text-[#33444E]'
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Signup
                  </a>
                </>
              ) : (
                /* Mobile Main Navigation */
                navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;