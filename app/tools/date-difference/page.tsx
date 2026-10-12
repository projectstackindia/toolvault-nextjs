'use client'

import { useState } from 'react'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

type DateDiff = { days: number; weeks: number; months: number; years: number }

function parseDate(dateStr: string): Date | null {
  const parts = dateStr.split('-')
  if (parts.length !== 3) return null
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  return new Date(year, month, day)
}

function calculateDateDifference(start: Date, end: Date): DateDiff {
  const msPerDay = 24 * 60 * 60 * 1000
  const days = Math.round((end.getTime() - start.getTime()) / msPerDay)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(days / 365.25)
  return { days, weeks, months, years }
}

export default function DateDifference() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [diff, setDiff] = useState<DateDiff | null>(null)
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => setPopup({ show: true, message: msg })
  const closePopup = () => setPopup({ show: false, message: '' })

  const calculate = () => {
    if (!startDate || !endDate) {
      showPopup('Please enter both dates in DD-MM-YYYY format')
      return
    }
    const start = parseDate(startDate)
    const end = parseDate(endDate)
    if (!start || !end) {
      showPopup('Invalid date format. Use DD-MM-YYYY')
      return
    }
    if (end < start) {
      showPopup('End date must be after start date')
      return
    }
    setDiff(calculateDateDifference(start, end))
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
              <button onClick={closePopup} className="px-6 py-2 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold text-sm uppercase tracking-wide hover:scale-105 transition">OK</button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card p-8 border-2 border-white/20 hover:border-purple-500/50 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-3">⏱️</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.2em] uppercase mb-4">
            Date Difference
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Calculate Duration Between Two Dates
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-5">
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date - DD-MM-YYYY"
            className="w-full px-4 py-3 tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
          />
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date - DD-MM-YYYY"
            className="w-full px-4 py-3 tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
          />
          <button
            onClick={calculate}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            Calculate Difference
          </button>
        </div>

        {/* Result Section */}
        {diff && (
          <div className="mt-8 p-5 bg-white/5 rounded-xl border-2 border-white/20">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Duration</h3>
              <button
                onClick={() => copyToClipboard(`${diff.days} days, ${diff.weeks} weeks, ${diff.months} months, ${diff.years} years`, setCopied)}
                className="px-4 py-2 cursor-pointer bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm uppercase tracking-wide hover:bg-white/20 transition-all"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5 text-center">
              <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10">
                <div className="text-4xl font-black text-purple-400">{diff.days}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide mt-1">Days</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10">
                <div className="text-4xl font-black text-purple-400">{diff.weeks}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide mt-1">Weeks</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10">
                <div className="text-4xl font-black text-purple-400">{diff.months}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide mt-1">Months - approx</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10">
                <div className="text-4xl font-black text-purple-400">{diff.years}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide mt-1">Years - approx</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}