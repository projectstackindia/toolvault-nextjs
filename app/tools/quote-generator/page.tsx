'use client'

import { useState } from 'react'
import { copyToClipboard } from '../../lib/utils'
import Link from 'next/link'

const quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Life is what happens when you are busy making other plans.', author: 'John Lennon' },
  { text: 'Get busy living or get busy dying.', author: 'Stephen King' },
  { text: 'You miss 100% of the shots you don’t take.', author: 'Wayne Gretzky' },
  { text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' },
  { text: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
  { text: 'Act as if what you do makes a difference. It does.', author: 'William James' },
  { text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
]

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(quotes[0])
  const [copied, setCopied] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => setPopup({ show: true, message: msg })
  const closePopup = () => setPopup({ show: false, message: '' })

  const generateRandom = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }

  const handleCopy = () => {
    copyToClipboard(`${quote.text} — ${quote.author}`, setCopied)
    showPopup('Quote copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
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

      {/* Popup Modal for copy success */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm" onClick={closePopup}>
          <div className="glass-card p-6 max-w-sm mx-4 border-2 border-green-500/50" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-white uppercase tracking-[0.2em] mb-3">Success</h3>
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
          <div className="text-7xl mb-3">💬</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Random Quote Generator
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Get Inspired With Powerful Words
            </p>
          </div>
        </div>

        {/* Quote Display Box */}
        <div className="mb-8 p-6 bg-white/5 rounded-xl border-2 border-white/20 min-h-[220px] flex flex-col justify-center">
          <p className="text-xl md:text-2xl italic leading-relaxed text-white/90 tracking-wide text-center">
            “{quote.text}”
          </p>
          <p className="mt-5 text-purple-300 font-bold uppercase tracking-[0.1em] text-center">
            — {quote.author}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={generateRandom}
            className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            ✨ New Quote
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {copied ? '✓ Copied!' : '📋 Copy Quote'}
          </button>
        </div>
      </div>
    </div>
  )
}