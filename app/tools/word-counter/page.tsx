'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WordCounter() {
  const [text, setText] = useState('')

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const charCount = text.length
  const charNoSpace = text.replace(/\s/g, '').length
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length

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

      <div className="glass-card p-8 border-2 border-white/20 hover:border-purple-500/50 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-3">📝</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Word Counter
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Analyze Text Words Characters And Sentences
            </p>
          </div>
        </div>

        {/* Textarea Input */}
        <div className="space-y-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 tracking-[0.1em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base placeholder:text-white/40 resize-vertical"
            placeholder="Type or paste your text here..."
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center hover:border-purple-500/50 transition">
            <div className="text-4xl font-black text-purple-400">{wordCount}</div>
            <div className="text-white/70 text-sm font-semibold uppercase tracking-[0.1em] mt-1">Words</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center hover:border-purple-500/50 transition">
            <div className="text-4xl font-black text-purple-400">{charCount}</div>
            <div className="text-white/70 text-sm font-semibold uppercase tracking-[0.1em] mt-1">Characters</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center hover:border-purple-500/50 transition">
            <div className="text-4xl font-black text-purple-400">{charNoSpace}</div>
            <div className="text-white/70 text-sm font-semibold uppercase tracking-[0.1em] mt-1">No Spaces</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center hover:border-purple-500/50 transition">
            <div className="text-4xl font-black text-purple-400">{sentenceCount}</div>
            <div className="text-white/70 text-sm font-semibold uppercase tracking-[0.1em] mt-1">Sentences</div>
          </div>
        </div>
      </div>
    </div>
  )
}