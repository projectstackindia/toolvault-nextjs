import Link from 'next/link'

interface ToolCardProps {
  name: string
  description: string
  path: string
  icon: string
}

export default function ToolCard({ name, description, path, icon }: ToolCardProps) {
  return (
    <Link href={path}>
      <div className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20">
        <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 cursor-pointer">{icon}</div>
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-200 cursor-pointer">
          {name}
        </h3>
        {/* Description box - clean with subtle background and border */}
      <div className="mb-5 p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer">
  <p className="text-white/80 text-sm font-bold tracking-[0.1em] leading-relaxed capitalize">
    {description}
  </p>
</div>
        {/* Bigger button */}
        <button className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base tracking-[0.1em] uppercase shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/30 flex items-center justify-center gap-3">
  Launch Tool 
  <svg className="w-7 h-7 inline-block transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
</button>
      </div>
    </Link>
  )
}