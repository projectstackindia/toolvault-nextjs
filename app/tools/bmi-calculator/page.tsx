'use client'

import { useState } from 'react'
import { calculateBMI, getBMICategory } from '../../lib/calculations'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

export default function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => {
    setPopup({ show: true, message: msg })
  }

  const closePopup = () => {
    setPopup({ show: false, message: '' })
  }

  const handleCalculate = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    if (isNaN(w) || w <= 0) {
      showPopup('Please enter valid weight in kg')
      return
    }
    if (isNaN(h) || h <= 0) {
      showPopup('Please enter valid height in cm')
      return
    }
    setBmi(calculateBMI(w, h))
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button - same as age calculator */}
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
          <div className="text-7xl mb-3">⚖️</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            BMI Calculator
          </h1>
          {/* Box for the description */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Calculate Your Body Mass Index And Health Category
            </p>
          </div>
        </div>

        {/* Input Section - No labels, only placeholders */}
        <div className="space-y-5">
          <input
            type=""
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight - Kg"
            className="w-full px-4 py-3 tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
            step="0.1"
          />
          <input
            type=""
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height - Cm"
            className="w-full px-4 py-3 tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
            step="0.1"
          />
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            Calculate BMI
          </button>
        </div>

        {/* Result Section */}
        {bmi !== null && (
          <div className="mt-8 p-5 bg-white/5 rounded-xl border-2 border-white/20">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Your BMI</h3>
              <button
                onClick={() => copyToClipboard(`BMI: ${bmi.toFixed(1)} - ${getBMICategory(bmi)}`, setCopied)}
                className="px-4 py-2 cursor-pointer bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm uppercase tracking-wide hover:bg-white/20 transition-all"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="text-center space-y-3">
              <div className="text-6xl font-black text-purple-400">{bmi.toFixed(1)}</div>
              <div className="text-xl font-bold text-white/90 uppercase tracking-wide">{getBMICategory(bmi)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}