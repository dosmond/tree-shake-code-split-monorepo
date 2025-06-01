'use client';

import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '../components/Navigation'

// BAD: Import everything from bad-ui package (vs selective imports)
import BadUIDefault, { 
  BadUI,
  Button, 
  Card, 
  Modal, 
  DataTable, 
  Charts, 
  HeavyComponent,
  UtilityFunctions,
  AllFactorials,
  UtilsMetadata,
  AllThemes,
  AllAnimations,
  AllLayouts,
  ExpensiveData,
  MassiveUtility
} from '@mycompany/bad-ui'

const inter = Inter({ subsets: ['latin'] })

// BAD: Execute side effects at module level (vs on-demand)
console.log('🚨 BAD Layout: Loading all resources immediately!')
console.log('All themes:', AllThemes.length)
console.log('All animations:', AllAnimations.length)
console.log('Expensive data:', ExpensiveData.length)
console.log('Factorials:', AllFactorials.length)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>🚨 BAD: Tree Shaking & Code Splitting Demo</title>
        <meta name="description" content="Demonstrating BAD tree shaking and code splitting practices" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          
          {/* Development bundle info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 right-4 bg-red-600 text-white text-xs p-2 rounded">
              <div>🚨 BAD Mode: {process.env.NODE_ENV}</div>
              <div>Bundle Analyze: {process.env.BUNDLE_ANALYZE || 'false'}</div>
              <div>Loaded: {AllThemes.length + AllAnimations.length + ExpensiveData.length} items</div>
            </div>
          )}
        </div>
      </body>
    </html>
  )
} 