'use client'

import { useState } from 'react'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

type AgeResult = { years: number; months: number; days: number }

function calculateAge(birthDate: Date): AgeResult {
  const today = new Date()
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }
  if (months < 0) {
    months += 12
    years--
  }
  return { years, months, days }
}

function parseDate(dateStr: string): Date | null {
  const parts = dateStr.split('-')
  if (parts.length !== 3) return null
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  return new Date(year, month, day)
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState<AgeResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => {
    setPopup({ show: true, message: msg })
  }

  const closePopup = () => {
    setPopup({ show: false, message: '' })
  }

  const handleCalculate = () => {
    if (!birthDate) {
      showPopup('Please enter date in DD-MM-YYYY format')
      return
    }
    const date = parseDate(birthDate)
    if (!date) {
      showPopup('Please enter date in DD-MM-YYYY format')
      return
    }
    if (date > new Date()) {
      showPopup('Birth date cannot be in the future')
      return
    }
    setAge(calculateAge(date))
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button - same as tools page */}
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
          <div className="text-7xl mb-3">📅</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Age Calculator
          </h1>
          {/* Box for the description */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Calculate Your Exact Age In Years Months And Days
            </p>
          </div>
        </div>

        {/* Input Section - No label, no helper text */}
        <div className="space-y-5">
          <input
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="DD-MM-YYYY"
            className="w-full px-4 py-3 tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
          />
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            Calculate Age
          </button>
        </div>

        {/* Result Section */}
        {age && (
          <div className="mt-8 p-5 bg-white/5 rounded-xl border-2 border-white/20">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Your Age</h3>
              <button
                onClick={() => copyToClipboard(`${age.years} years, ${age.months} months, ${age.days} days`, setCopied)}
                className="px-4 py-2 cursor-pointer bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm uppercase tracking-wide hover:bg-white/20 transition-all"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-5 text-center">
              <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10">
                <div className="text-4xl font-black text-purple-400">{age.years}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide mt-1">Years</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10">
                <div className="text-4xl font-black text-purple-400">{age.months}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide mt-1">Months</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10">
                <div className="text-4xl font-black text-purple-400">{age.days}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide mt-1">Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}