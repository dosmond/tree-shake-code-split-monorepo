'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mycompany/ui'

// Code splitting examples with different loading strategies

// 1. Component with loading state
const DataTableDemo = dynamic(() => import('../../components/DataTableDemo'), {
  loading: () => <DataTableSkeleton />,
  ssr: false
})

// 2. Component without loading (uses Suspense)
const ChartsDemo = dynamic(() => import('../../components/ChartsDemo'), {
  ssr: false
})

// 3. Conditional loading based on user action
const HeavyAnalytics = dynamic(() => import('../../components/HeavyAnalytics'), {
  loading: () => <div className="p-4 text-center">Loading advanced analytics...</div>,
  ssr: false
})

function DataTableSkeleton() {
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
  return (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  )
}

export default function CodeSplittingDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set())
  const [ChartLibrary, setChartLibrary] = useState<any>(null)

  const handleLoadComponent = (componentName: string) => {
    setActiveDemo(componentName)
    setLoadedComponents(prev => new Set(prev).add(componentName))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Code Splitting Demo
        </h1>
        <p className="text-gray-600 mb-6">
          This page demonstrates different code splitting strategies. Components are 
          loaded on-demand to reduce initial bundle size and improve performance.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant={activeDemo === 'dataTable' ? 'primary' : 'secondary'}
            onClick={() => handleLoadComponent('dataTable')}
          >
            Load Data Table
          </Button>
          
          <Button
            variant={activeDemo === 'charts' ? 'primary' : 'secondary'}
            onClick={() => handleLoadComponent('charts')}
          >
            Load Charts
          </Button>
          
          <Button
            variant={activeDemo === 'analytics' ? 'primary' : 'secondary'}
            onClick={() => handleLoadComponent('analytics')}
          >
            Load Analytics
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Loaded components:</strong> {loadedComponents.size > 0 ? Array.from(loadedComponents).join(', ') : 'None'}</p>
          <p className="mt-1">
            <strong>Tip:</strong> Open browser dev tools → Network tab to see chunks loading on demand.
          </p>
        </div>
      </div>

      {/* Component demos with different loading patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Data Table Demo - Has built-in loading state */}
        {activeDemo === 'dataTable' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Data Table (Built-in Loading)</h2>
            <DataTableDemo />
          </div>
        )}
        
        {/* Charts Demo - Uses Suspense boundary */}
        {activeDemo === 'charts' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Charts (Suspense Boundary)</h2>
            <Suspense fallback={<ChartsSkeleton />}>
              <ChartsDemo />
            </Suspense>
          </div>
        )}
        
        {/* Analytics Demo - Conditional loading */}
        {activeDemo === 'analytics' && (
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Heavy Analytics (Conditional)</h2>
            <HeavyAnalytics />
          </div>
        )}
        
        {/* Chart Library Demo - Dynamic loading with state */}
        {activeDemo === 'chartLibrary' && ChartLibrary && (
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Chart Library (Dynamic)</h2>
            <ChartLibrary />
          </div>
        )}
      </div>

      {/* Performance monitoring */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Code Splitting Strategies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Loading Patterns</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <strong>Built-in Loading:</strong> Component has loading prop
                <br />
                <code className="text-xs">{`dynamic(() => import('./Component'), { loading: () => <Skeleton /> })`}</code>
              </div>
              
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <strong>Suspense Boundary:</strong> Manual loading control
                <br />
                <code className="text-xs">{`<Suspense fallback={<Loading />}><Component /></Suspense>`}</code>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                <strong>Conditional:</strong> Load based on user action
                <br />
                <code className="text-xs">{`onClick={() => import('./Component')}`}</code>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Group related components under one Suspense</li>
              <li>• Preload likely-needed components on hover</li>
              <li>• Use route-based splitting for pages</li>
              <li>• Split heavy libraries separately</li>
              <li>• Monitor chunk sizes with bundle analyzer</li>
              <li>• Consider network conditions for mobile</li>
            </ul>
          </div>
        </div>
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-900 text-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Development Mode Debugging</h3>
          <p className="text-sm text-gray-300 mb-2">
            In development, you'll see slower loading because chunks compile on-demand.
            Production builds pre-compile everything for faster loading.
          </p>
          <div className="text-xs text-gray-400">
            <p>• Run <code>npm run build && npm run start</code> to test production performance</p>
            <p>• Run <code>npm run analyze</code> to see bundle composition</p>
          </div>
        </div>
      )}
    </div>
  )
}