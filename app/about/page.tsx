import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6 -ml-70">
        <Link href="/">
          <button className="px-6 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            BACK TO HOME
          </button>
        </Link>
      </div>

      <div className="glass-card p-8 border-2 border-white/20 hover:border-purple-500/50 transition-all duration-300">
        {/* Header - extra space between icon and title */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-8">ℹ️</div>
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            About ToolVault
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Created With Passion For Productivity And Clean Design
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Mission */}
          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-purple-400 uppercase tracking-[0.1em] mb-3">✨ Our Mission</h2>
            <p className="text-white/80 text-sm leading-relaxed tracking-[0.1em] font-bold capitalize">
              ToolVault provides essential utilities that are fast private and beautiful.
              We believe everyday tools should be accessible ad-free and respect your privacy.
              Every tool runs entirely in your browser — no servers no tracking.
            </p>
          </div>

          {/* What Makes Us Different (instead of Tech Stack) */}
          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-purple-400 uppercase tracking-[0.1em] mb-3">💡 What Makes Us Different</h2>
            <ul className="space-y-2 text-white/80 text-sm leading-relaxed tracking-[0.1em] font-bold capitalize list-disc list-inside">
              <li>100% Private — No data ever leaves your device</li>
              <li>Instant Results — No waiting no loading</li>
              <li>No Signup Required — Just open and use</li>
              <li>Beautiful Glassmorphism Interface — Modern and smooth</li>
              <li>All Tools Completely Free — No hidden costs</li>
            </ul>
          </div>

          {/* Tools */}
          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-purple-400 uppercase tracking-[0.1em] mb-3">🎯 10 Powerful Tools</h2>
            <p className="text-white/80 text-sm leading-relaxed tracking-[0.1em] font-bold capitalize">
              From age calculation to password generation text conversion to notes keeping —
              every tool is designed to be intuitive and responsive on any device.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}