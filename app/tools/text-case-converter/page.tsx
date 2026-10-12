'use client'

import { useState } from 'react'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

export default function TextCaseConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => setPopup({ show: true, message: msg })
  const closePopup = () => setPopup({ show: false, message: '' })

  const convert = (type: string) => {
    if (!input.trim()) {
      showPopup('Please enter some text to convert')
      return
    }
    let result = ''
    switch (type) {
      case 'upper':
        result = input.toUpperCase()
        break
      case 'lower':
        result = input.toLowerCase()
        break
      case 'title':
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        break
      case 'sentence':
        result = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
        break
    }
    setOutput(result)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <div className="mb-6 -ml-85">
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
          <div className="text-7xl mb-3">🔤</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Text Case Converter
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Transform Text To Uppercase Lowercase Title Case Or Sentence Case
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-5">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            rows={4}
            className="w-full px-4 py-3 tracking-[0.1em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base placeholder:text-white/40 resize-vertical"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => convert('upper')}
              className="px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-sm uppercase tracking-[0.1em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => convert('lower')}
              className="px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-sm uppercase tracking-[0.1em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              lowercase
            </button>
            <button
              onClick={() => convert('title')}
              className="px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-sm uppercase tracking-[0.1em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              Title Case
            </button>
            <button
              onClick={() => convert('sentence')}
              className="px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-sm uppercase tracking-[0.1em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              Sentence case
            </button>
          </div>
        </div>

        {/* Result Section */}
        {output && (
          <div className="mt-8 p-5 bg-white/5 rounded-xl border-2 border-white/20">
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 p-3 bg-black/30 rounded-lg break-all text-white/90 text-sm font-mono">
                {output}
              </div>
              <button
                onClick={() => copyToClipboard(output, setCopied)}
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