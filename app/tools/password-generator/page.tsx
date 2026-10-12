'use client'

import { useState } from 'react'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

export default function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => setPopup({ show: true, message: msg })
  const closePopup = () => setPopup({ show: false, message: '' })

  const generatePassword = () => {
    let chars = ''
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (numbers) chars += '0123456789'
    if (symbols) chars += '!@#$%^&*()_+=-[]{}|;:,.<>?'

    if (chars === '') {
      showPopup('Select at least one character type')
      return
    }

    let generated = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generated += chars[randomIndex]
    }
    setPassword(generated)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <div className="mb-6 -ml-100">
        <Link href="/tools">
          <button className="px-6 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            BACK TO TOOLS
          </button>
        </Link>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm" onClick={closePopup}>
          <div className="glass-card p-6 max-w-sm mx-4 border-2 border-red-500/50" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-white uppercase tracking-[0.2em] mb-3">Error</h3>
              <p className="text-white/80 text-sm tracking-[0.2em] uppercase font-bold mb-5">{popup.message}</p>
              <button
                onClick={closePopup}
                className="px-6 py-2 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold text-sm uppercase tracking-wide hover:scale-105 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card p-8 border-2 border-white/20 hover:border-purple-500/50 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-3">🔐</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Password Generator
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Create Strong Secure Random Passwords
            </p>
          </div>
        </div>

        {/* Options Section */}
        <div className="space-y-6">
          {/* Length Slider */}
          <div>
            <label className="block text-white/80 font-semibold text-sm uppercase tracking-[0.1em] mb-3">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
              <span className="text-white/80 text-sm uppercase tracking-[0.1em] group-hover:text-purple-300 transition">Uppercase</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
              <span className="text-white/80 text-sm uppercase tracking-[0.1em] group-hover:text-purple-300 transition">Lowercase</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
              <span className="text-white/80 text-sm uppercase tracking-[0.1em] group-hover:text-purple-300 transition">Numbers</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
              <span className="text-white/80 text-sm uppercase tracking-[0.1em] group-hover:text-purple-300 transition">Symbols</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            Generate Password
          </button>
        </div>

        {/* Result Section */}
        {password && (
          <div className="mt-8 p-5 bg-white/5 rounded-xl border-2 border-white/20">
            <div className="flex justify-between items-center gap-4">
              <code className="flex-1 text-white/90 text-sm font-mono font-bold tracking-wide break-all">
                {password}
              </code>
              <button
                onClick={() => copyToClipboard(password, setCopied)}
                className="px-4 py-2 cursor-pointer bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm uppercase tracking-[0.1em] hover:bg-white/20 transition-all whitespace-nowrap"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}