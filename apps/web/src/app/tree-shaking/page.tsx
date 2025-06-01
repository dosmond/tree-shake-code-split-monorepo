'use client'

import { useState } from 'react'
// Tree shaking test: Only import what we need - direct imports for best tree shaking
import { Button } from '@mycompany/ui/Button'
import { formatCurrency } from '@mycompany/ui/utils'

export default function TreeShakingDemo() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [importedHeavy, setImportedHeavy] = useState(false)

  // Dynamically import heavy utilities only when needed
  const loadHeavyUtilities = async () => {
    try {
      // Dynamic import from specific modules for best tree shaking
      const { heavyUtility, LARGE_LOOKUP_TABLE } = await import('@mycompany/ui/heavy-utils')
      
      console.log('Heavy utilities loaded!')
      console.log('Lookup table size:', LARGE_LOOKUP_TABLE.length)
      
      const result = heavyUtility([1, 2, 3, 4, 5])
      console.log('Heavy utility result:', result)
      
      setImportedHeavy(true)
    } catch (error) {
      console.error('Failed to load heavy utilities:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tree Shaking Demo
        </h1>
        <p className="text-gray-600 mb-6">
          This page demonstrates tree shaking by importing only specific components 
          and utilities from our monorepo packages.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Imported (Should be in bundle)
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Button component</li>
              <li>• formatCurrency utility</li>
              <li>• React hooks (useState)</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              ❌ Not Imported (Should be tree shaken)
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• heavyUtility function</li>
              <li>• LARGE_LOOKUP_TABLE (10k items)</li>
              <li>• AdvancedAnalyticsEngine class</li>
              <li>• DataTable component</li>
              <li>• Charts component</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Interactive Demo
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="primary" 
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              Toggle Analysis
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={loadHeavyUtilities}
              disabled={importedHeavy}
            >
              {importedHeavy ? 'Heavy Utils Loaded' : 'Load Heavy Utilities'}
            </Button>
          </div>
          
          {showAnalysis && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Bundle Analysis
              </h3>
              <p className="text-blue-700 mb-2">
                Price calculation using tree-shaken utility: {formatCurrency(99.99)}
              </p>
              <p className="text-sm text-blue-600">
                This formatCurrency function is included in the bundle because we imported it.
                Heavy utilities are NOT in the bundle unless dynamically imported.
              </p>
            </div>
          )}
          
          {importedHeavy && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                🚨 Heavy Utilities Loaded
              </h3>
              <p className="text-yellow-700 text-sm">
                Check the browser console to see the heavy utilities in action.
                These were loaded dynamically and are NOT part of the initial bundle.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Test Tree Shaking
        </h2>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">1. Build and Analyze</h3>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              npm run analyze
            </code>
            <p className="text-sm mt-1">
              This will build the app and open bundle analyzer to see what's included.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Check Bundle Size</h3>
            <p className="text-sm">
              Look for components/utilities that should NOT be in the main bundle.
              Heavy utilities should only appear if explicitly imported.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">3. Compare Import Patterns</h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <div className="mb-2">
                <span className="text-green-600">✅ Good (tree shakable):</span>
                <br />
                <code>import {`{ Button }`} from '@mycompany/ui'</code>
              </div>
              <div>
                <span className="text-red-600">❌ Bad (bundles everything):</span>
                <br />
                <code>import * as UI from '@mycompany/ui'</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}