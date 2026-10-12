'use client'

import { useState } from 'react'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

export default function DiscountCalculator() {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [saved, setSaved] = useState<number | null>(null)
  const [final, setFinal] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => setPopup({ show: true, message: msg })
  const closePopup = () => setPopup({ show: false, message: '' })

  const calculate = () => {
    const p = parseFloat(price)
    const d = parseFloat(discount)
    if (isNaN(p) || p <= 0) {
      showPopup('Please enter a valid original price')
      return
    }
    if (isNaN(d) || d < 0) {
      showPopup('Please enter a valid discount percentage')
      return
    }
    const savedAmount = (p * d) / 100
    setSaved(savedAmount)
    setFinal(p - savedAmount)
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
          <div className="text-7xl mb-3">🏷️</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Discount Calculator
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Calculate Savings After Discount
            </p>
          </div>
        </div>

        {/* Input Section - No labels, only placeholders */}
        <div className="space-y-5">
          <input
            type=""
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Original Price - ₹ or $"
            className="w-full px-4 py-3 tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
            step="0.01"
          />
          <input
            type=""
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Discount - %"
            className="w-full px-4 py-3 tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
            step="0.1"
          />
          <button
            onClick={calculate}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            Calculate Discount
          </button>
        </div>

        {/* Result Section */}
        {final !== null && saved !== null && (
          <div className="mt-8 p-5 bg-white/5 rounded-xl border-2 border-white/20">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Price Details</h3>
              <button
                onClick={() => copyToClipboard(`Final price: ${final.toFixed(2)} (You saved ${saved.toFixed(2)})`, setCopied)}
                className="px-4 py-2 cursor-pointer bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm uppercase tracking-wide hover:bg-white/20 transition-all"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="text-center space-y-3">
              <div className="text-2xl font-bold text-white/80">You Save - <span className="text-green-400 text-3xl">${saved.toFixed(2)}</span></div>
              <div className="text-5xl font-black text-purple-400">${final.toFixed(2)}</div>
              <div className="text-sm text-white/50 uppercase tracking-wide">Final Price</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}