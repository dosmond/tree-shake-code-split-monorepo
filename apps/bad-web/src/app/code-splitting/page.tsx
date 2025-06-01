'use client'

import { useState } from 'react'

// BAD: Import everything upfront instead of code splitting
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

// BAD: Import all demo components immediately instead of dynamic imports
import { DataTableDemo } from '../../components/DataTableDemo'
import { ChartsDemo } from '../../components/ChartsDemo'
import { HeavyAnalytics } from '../../components/HeavyAnalytics'

// BAD: Load and execute everything immediately
console.log('🚨 BAD Code Splitting: Loading ALL components immediately!')
console.log('🚨 DataTable, Charts, and Analytics components all loaded upfront')
console.log('🚨 Bad UI package loaded:', Object.keys(BadUI).length, 'components')

// BAD: Create expensive data immediately
const allData = ExpensiveData.slice(0, 10000)
const allThemes = AllThemes
const allAnimations = AllAnimations

function DataTableSkeleton() {
  // BAD: Even skeleton has side effects
  console.log('🚨 Skeleton loaded (but data is already loaded anyway!)')
  return (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
      </div>
    </div>
  )
}

function ChartsSkeleton() {
  // BAD: More unnecessary side effects
  console.log('🚨 Charts skeleton (but charts already loaded!)')
  return (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  )
}

export default function CodeSplittingDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(
    // BAD: All components are already loaded!
    new Set(['dataTable', 'charts', 'analytics'])
  )

  const handleLoadComponent = (componentName: string) => {
    console.log(`🚨 "Loading" ${componentName} (but it's already bundled!)`)
    setActiveDemo(componentName)
    // BAD: Components are already loaded, just pretending
  }

  // BAD: Use expensive operations in render
  const renderExpensiveStats = () => {
    const totalItems = allData.length + allThemes.length + allAnimations.length
    return totalItems
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow border border-red-200">
        <h1 className="text-3xl font-bold text-red-900 mb-4">
          🚨 BAD Code Splitting Demo
        </h1>
        <p className="text-red-600 mb-6">
          This page demonstrates what happens when you DON'T use code splitting. 
          All components are loaded upfront, making the initial bundle huge.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant={activeDemo === 'dataTable' ? 'primary' : 'secondary'}
            onClick={() => handleLoadComponent('dataTable')}
          >
            "Load" Data Table
          </Button>
          
          <Button
            variant={activeDemo === 'charts' ? 'primary' : 'secondary'}
            onClick={() => handleLoadComponent('charts')}
          >
            "Load" Charts
          </Button>
          
          <Button
            variant={activeDemo === 'analytics' ? 'primary' : 'secondary'}
            onClick={() => handleLoadComponent('analytics')}
          >
            "Load" Analytics
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-red-600">
          <p><strong>🚨 All components already loaded:</strong> {loadedComponents.size} components (143KB+)</p>
          <p className="mt-1">
            <strong>Reality:</strong> No chunks loading on demand - everything was bundled together!
            Total items in memory: {renderExpensiveStats()}
          </p>
        </div>
      </div>

      {/* Component demos - all loaded upfront */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Data Table Demo - No loading state needed, already loaded */}
        {activeDemo === 'dataTable' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Data Table (Already Loaded)</h2>
            <DataTableDemo />
          </div>
        )}
        
        {/* Charts Demo - No Suspense needed, already loaded */}
        {activeDemo === 'charts' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Charts (No Suspense Needed)</h2>
            <ChartsDemo />
          </div>
        )}
        
        {/* Analytics Demo - No conditional loading */}
        {activeDemo === 'analytics' && (
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Heavy Analytics (Pre-loaded)</h2>
            <HeavyAnalytics />
          </div>
        )}
      </div>

      {/* Performance "monitoring" */}
      <div className="bg-white p-6 rounded-lg shadow border border-red-200">
        <h2 className="text-2xl font-bold text-red-900 mb-4">
          🚨 BAD Code Splitting "Strategies"
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-3">Loading Anti-Patterns</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-red-50 p-3 rounded border border-red-200">
                <strong>❌ No Dynamic Loading:</strong> Import everything upfront
                <br />
                <code className="text-xs">import {`{ ALL_COMPONENTS }`} from 'bad-ui'</code>
              </div>
              
              <div className="bg-red-50 p-3 rounded border border-red-200">
                <strong>❌ No Suspense:</strong> Components load immediately
                <br />
                <code className="text-xs">All components bundled in main chunk</code>
              </div>
              
              <div className="bg-red-50 p-3 rounded border border-red-200">
                <strong>❌ No Conditional Loading:</strong> Everything in memory
                <br />
                <code className="text-xs">143KB+ loaded regardless of usage</code>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">What GOOD Code Splitting Does</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Loads components only when needed</li>
              <li>• Creates separate chunks for different features</li>
              <li>• Uses Suspense boundaries for loading states</li>
              <li>• Enables progressive loading based on user actions</li>
              <li>• Monitors chunk sizes with bundle analyzer</li>
              <li>• Preloads likely-needed components intelligently</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Real-time waste display */}
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="font-semibold text-red-800 mb-2">🐌 Resources Wasted by BAD Code Splitting</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-red-700 text-sm">
          <div>Themes: {allThemes.length}</div>
          <div>Animations: {allAnimations.length}</div>
          <div>Data: {allData.length}</div>
          <div>Total: {renderExpensiveStats()}</div>
        </div>
        <p className="text-red-600 text-sm mt-2">
          All loaded immediately on page load instead of on-demand!
        </p>
      </div>
      
      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h3 className="font-semibold mb-2 text-red-400">🚨 BAD Development Practices</h3>
        <p className="text-sm text-gray-300 mb-2">
          In this BAD version, you'll see NO loading because everything is bundled together.
          The good version would show actual chunk loading and better performance.
        </p>
        <div className="text-xs text-gray-400">
          <p>• Bundle size: 143KB+ (vs separate 1-5KB chunks)</p>
          <p>• Load time: Everything upfront (vs progressive loading)</p>
          <p>• Memory usage: {renderExpensiveStats()} items always loaded</p>
        </div>
      </div>
    </div>
  )
} 