'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'

// BAD: Import everything from bad-ui instead of selective imports
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

// BAD: Execute expensive operations on module load
console.log('🚨 BAD Home Page: Loading all resources immediately!')
const expensiveComputations = ExpensiveData.slice(0, 5000).map(item => item.hash).join('')
console.log('🚨 Computed', expensiveComputations.length, 'characters of hashes')

export default function Home() {
  const [homePageId, setHomePageId] = useState('hydrating...')
  const [buttonStyle, setButtonStyle] = useState({})
  
  // Fix hydration by moving dynamic computations to client-side only
  useEffect(() => {
    const id = UtilityFunctions.generateId()
    const style = MassiveUtility.generateRandomStyle()
    setHomePageId(id)
    setButtonStyle(style)
  }, [])
  
  // BAD: More expensive operations in render function
  const allResourcesCount = AllThemes.length + AllAnimations.length + ExpensiveData.length + AllFactorials.length
  
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-red-900 mb-4">
          🚨 BAD Tree Shaking & Code Splitting Demo
        </h1>
        <p className="text-xl text-red-600 mb-8">
          Explore what happens when you DON'T use proper tree shaking and code splitting
        </p>
        <p className="text-sm text-red-700 bg-red-50 p-3 rounded border border-red-200">
          ⚠️ This page loaded {allResourcesCount} unnecessary items! 
          Bundle size: 143KB+ (vs &lt;5KB with good practices)
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-red-200">
          <h2 className="text-2xl font-semibold text-red-800 mb-3">
            🌳 Bad Tree Shaking
          </h2>
          <p className="text-red-600 mb-4">
            See how importing everything makes bundles huge and slow.
          </p>
          <Link href="/tree-shaking">
            <Button variant="primary">
              See Bad Tree Shaking
            </Button>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-red-200">
          <h2 className="text-2xl font-semibold text-red-800 mb-3">
            ✂️ Bad Code Splitting
          </h2>
          <p className="text-red-600 mb-4">
            Discover how to load everything upfront for poor performance.
          </p>
          <Link href="/code-splitting">
            <Button variant="primary">
              See Bad Code Splitting
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          🚨 What's Wrong Here?
        </h3>
        <div className="text-red-700 space-y-2">
          <p>1. Imports entire bad-ui package (143KB) instead of individual components</p>
          <p>2. Executes expensive computations on every module load</p>
          <p>3. No code splitting - everything loads immediately</p>
          <p>4. Page ID: {homePageId}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h4 className="font-semibold mb-2 text-red-800">📦 Bad Bundle Size</h4>
          <p className="text-red-600">Monorepo with massive bundles and no optimization</p>
          <p className="text-xs text-red-500 mt-1">Loaded: {AllThemes.length} themes</p>
        </div>
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h4 className="font-semibold mb-2 text-red-800">⚡ Poor Performance</h4>
          <p className="text-red-600">Heavy builds with all dependencies included</p>
          <p className="text-xs text-red-500 mt-1">Animations: {AllAnimations.length}</p>
        </div>
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h4 className="font-semibold mb-2 text-red-800">🔍 No Analysis</h4>
          <p className="text-red-600">No tools to measure or optimize bundle bloat</p>
          <p className="text-xs text-red-500 mt-1">Data: {ExpensiveData.length} items</p>
        </div>
      </div>
      
      {/* Show the bad data being loaded */}
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">🐌 Expensive Operations Running Now</h4>
        <div className="text-yellow-700 text-xs space-y-1">
          <p>• Loaded {AllFactorials.length} precomputed factorials</p>
          <p>• Generated {expensiveComputations.length} hash characters</p>
          <p>• Created {AllLayouts.length} layout configurations</p>
          <p>• Metadata timestamp: {UtilsMetadata.timestamp}</p>
        </div>
      </div>
    </div>
  )
} 