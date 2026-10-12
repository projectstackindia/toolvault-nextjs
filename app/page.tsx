import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="inline-block px-4 py-1 glass-card text-sm font-semibold text-purple-300 tracking-[0.2em]">
          ✨ Productivity Suite
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-wide">
          All-in-One Smart Tools Platform
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto tracking-wide capitalize leading-relaxed">
          Lightning Fast Utilities For Developers Creators And Productivity Enthusiasts No Signup No Hassle Just Pure Functionality
        </p>
        <Link href="/tools">
          <button className="btn-primary text-lg px-10 py-4 uppercase tracking-[0.2em] cursor-pointer hover:scale-105 transition-transform duration-200">
            🚀 Explore Tools
          </button>
        </Link>
      </section>

      {/* Feature Highlights - Enhanced like ToolCard */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
          <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">⚡</div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-200">
            Instant Results
          </h3>
          <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/80 text-sm capitalize font-bold tracking-[0.1em] leading-relaxed">
              All calculations happen instantly in your browser
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
          <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">🔒</div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-200">
            100% Private
          </h3>
          <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/80 text-sm capitalize font-bold tracking-[0.1em] leading-relaxed">
              No data leaves your device — zero tracking
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
          <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">🎨</div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-200">
            Modern UI
          </h3>
          <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/80 text-sm capitalize font-bold tracking-[0.1em] leading-relaxed">
              Beautiful glassmorphism design with smooth animations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}