import Link from 'next/link'
import ToolCard from '../components/ToolCard'

const tools = [
  { name: 'Age Calculator', description: 'Calculate exact age from birth date', path: '/tools/age-calculator', icon: '📅' },
  { name: 'BMI Calculator', description: 'Check body mass index and health', path: '/tools/bmi-calculator', icon: '⚖️' },
  { name: 'Word Counter', description: 'Count words characters and sentences', path: '/tools/word-counter', icon: '📝' },
  { name: 'Password Generator', description: 'Secure random password generator', path: '/tools/password-generator', icon: '🔐' },
  { name: 'Text Case Converter', description: 'Transform text to any case style', path: '/tools/text-case-converter', icon: '🔤' },
  { name: 'Discount Calculator', description: 'Calculate savings and final price', path: '/tools/discount-calculator', icon: '🏷️' },
  { name: 'Date Difference', description: 'Find duration between two dates', path: '/tools/date-difference', icon: '⏱️' },
  { name: 'Number System', description: 'Convert between binary hex decimal', path: '/tools/number-system', icon: '🔢' },
  { name: 'Notes App', description: 'Save private notes local storage', path: '/tools/notes', icon: '📓' },
  { name: 'Random Quote', description: 'Get inspired with random quotes', path: '/tools/quote-generator', icon: '💬' },
]

export default function ToolsIndex() {
  return (
    <div>
      {/* Custom Arrow Button - Left Top Corner */}
      <div className="mb-6 -ml-40">
        <Link href="/">
          <button className="px-6 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-3">
            {/* Custom SVG Arrow (left pointing) */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            BACK TO HOME
            {/* Optional second arrow? No, just one left arrow */}
          </button>
        </Link>
      </div>

      {/* Heading and Grid - as it is */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-3">
          Utility Toolbox
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg tracking-wide capitalize">
          Select Any Tool Below Each One Is Self Contained Fast And Works Instantly
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.path} {...tool} />
        ))}
      </div>
    </div>
  )
}