'use client'

import { useState } from 'react'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

type BaseOption = { value: number; label: string }

const baseOptions: BaseOption[] = [
  { value: 2, label: 'Binary - 2' },
  { value: 8, label: 'Octal - 8' },
  { value: 10, label: 'Decimal - 10' },
  { value: 16, label: 'Hexadecimal - 16' },
]

export default function NumberSystemConverter() {
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState(10)
  const [toBase, setToBase] = useState(2)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })
  const [openDropdown, setOpenDropdown] = useState<'from' | 'to' | null>(null)

  const showPopup = (msg: string) => setPopup({ show: true, message: msg })
  const closePopup = () => setPopup({ show: false, message: '' })

  const convert = () => {
    if (!input.trim()) {
      showPopup('Please enter a number to convert')
      return
    }
    try {
      const decimal = parseInt(input, fromBase)
      if (isNaN(decimal)) throw new Error()
      const converted = decimal.toString(toBase)
      setResult(converted.toUpperCase())
    } catch {
      showPopup('Invalid input for selected base')
      setResult('')
    }
  }

  const getBaseLabel = (base: number) => {
    const opt = baseOptions.find(o => o.value === base)
    return opt ? opt.label : 'Decimal - 10'
  }

  const handleBaseSelect = (type: 'from' | 'to', value: number) => {
    if (type === 'from') setFromBase(value)
    else setToBase(value)
    setOpenDropdown(null)
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
          <div className="text-7xl mb-3">🔢</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Number System Converter
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Convert Between Binary Decimal Octal Hexadecimal
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Number"
            className="w-full px-4 py-3 tracking-[0.1em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-center placeholder:text-white/40"
          />
          
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Custom Dropdown - From Base (opens upward) */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'from' ? null : 'from')}
                className="w-full px-4 py-3 tracking-[0.1em] bg-white/10 border-2 border-white/20 rounded-xl text-white text-base text-center cursor-pointer flex justify-between items-center gap-2 hover:bg-white/20 transition"
              >
                <span>{getBaseLabel(fromBase)}</span>
                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'from' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'from' && (
                <div className="absolute left-0 right-0 bottom-full mb-2 rounded-xl z-20 overflow-hidden glass-card border border-white/20 backdrop-blur-md bg-black/80">
                  {baseOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => handleBaseSelect('from', opt.value)}
                      className={`px-4 py-2 text-sm tracking-[0.1em] cursor-pointer transition w-full text-center ${fromBase === opt.value ? 'text-purple-400 font-bold bg-white/10' : 'text-white/80 hover:bg-white/15'}`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Dropdown - To Base (opens upward) */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'to' ? null : 'to')}
                className="w-full px-4 py-3 tracking-[0.1em] bg-white/10 border-2 border-white/20 rounded-xl text-white text-base text-center cursor-pointer flex justify-between items-center gap-2 hover:bg-white/20 transition"
              >
                <span>{getBaseLabel(toBase)}</span>
                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'to' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'to' && (
                <div className="absolute left-0 right-0 bottom-full mb-2 rounded-xl z-20 overflow-hidden glass-card border border-white/20 backdrop-blur-md bg-black/80">
                  {baseOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => handleBaseSelect('to', opt.value)}
                      className={`px-4 py-2 text-sm tracking-[0.1em] cursor-pointer transition w-full text-center ${toBase === opt.value ? 'text-purple-400 font-bold bg-white/10' : 'text-white/80 hover:bg-white/15'}`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            Convert
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="mt-8 p-5 bg-white/5 rounded-xl border-2 border-white/20">
            <div className="flex justify-between items-center gap-4">
              <code className="flex-1 text-white/90 text-sm font-mono font-bold tracking-wide break-all">
                {result}
              </code>
              <button
                onClick={() => copyToClipboard(result, setCopied)}
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