'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo - UPPERCASE, letter spacing 0.2em, gradient */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
            style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            ToolVault
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`cursor-pointer text-lg transition-all duration-200 hover:scale-105 hover:text-purple-300 ${
                  pathname === item.path ? 'text-purple-400 font-semibold' : 'text-white/80'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-3 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-lg text-lg transition-all duration-200 hover:scale-105 hover:text-purple-300 cursor-pointer ${
                  pathname === item.path ? 'text-purple-400 font-semibold bg-white/5' : 'text-white/80'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}