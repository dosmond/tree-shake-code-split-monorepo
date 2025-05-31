import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tree Shaking & Code Splitting Demo',
  description: 'Demonstrating tree shaking and code splitting in a monorepo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          
          {/* Development bundle info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 right-4 bg-black text-white text-xs p-2 rounded">
              <div>Mode: {process.env.NODE_ENV}</div>
              <div>Bundle Analyze: {process.env.BUNDLE_ANALYZE || 'false'}</div>
            </div>
          )}
        </div>
      </body>
    </html>
  )
}