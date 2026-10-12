import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../app/components/Navbar'
import Footer from '../app/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToolVault | All-in-One Smart Tools Platform',
  description: 'Modern suite of productivity tools including calculator, converters, notes and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}