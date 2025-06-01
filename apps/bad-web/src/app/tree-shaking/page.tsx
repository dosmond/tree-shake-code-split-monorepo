'use client'

import { useState } from 'react'

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

// BAD: Import heavy utilities immediately instead of dynamic imports
const heavyUtility = MassiveUtility.processData
const LARGE_LOOKUP_TABLE = ExpensiveData

// BAD: Execute expensive operations on module load
console.log('🚨 BAD Tree Shaking Demo: Loading EVERYTHING immediately!')
const pageComputations = LARGE_LOOKUP_TABLE.slice(0, 1000).map(item => heavyUtility(item))
console.log('🚨 Processed', pageComputations.length, 'items immediately on load')

export default function TreeShakingDemo() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [importedHeavy, setImportedHeavy] = useState(true) // Already imported!

  // BAD: Heavy utilities are already loaded, no dynamic loading
  const loadHeavyUtilities = async () => {
    console.log('🚨 Heavy utilities already loaded! Everything was imported upfront.')
    console.log('Lookup table size:', LARGE_LOOKUP_TABLE.length)
    
    const result = heavyUtility([1, 2, 3, 4, 5])
    console.log('Heavy utility result:', result)
    
    setImportedHeavy(true)
  }

  // BAD: Use expensive operations in render
  const expensiveRenderOperation = () => {
    return AllFactorials.slice(0, 100).reduce((sum, f) => sum + (f % 1000), 0)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow border border-red-200">
        <h1 className="text-3xl font-bold text-red-900 mb-4">
          🚨 BAD Tree Shaking Demo
        </h1>
        <p className="text-red-600 mb-6">
          This page demonstrates what happens when you DON'T use tree shaking by importing 
          EVERYTHING from our bad-ui package upfront.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              ❌ Always Imported (Bloats bundle)
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• ALL {AllThemes.length} themes (vs 1 needed)</li>
              <li>• ALL {AllAnimations.length} animations (vs 0 needed)</li>
              <li>• ALL {ExpensiveData.length} data items (vs 0 needed)</li>
              <li>• ALL {AllFactorials.length} factorials (vs 0 needed)</li>
              <li>• heavyUtility function (loaded immediately)</li>
              <li>• LARGE_LOOKUP_TABLE ({LARGE_LOOKUP_TABLE.length} items)</li>
              <li>• Button, Card, Modal, DataTable, Charts (unused)</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Actually Needed (Good version would only load these)
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Button component (1 of {Object.keys(BadUI).length} components)</li>
              <li>• formatCurrency utility (1 of many utils)</li>
              <li>• React hooks (useState)</li>
              <li>• Nothing else!</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-red-200">
        <h2 className="text-2xl font-bold text-red-900 mb-4">
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
            >
              Heavy Utils Already Loaded!
            </Button>
          </div>
          
          {showAnalysis && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                🚨 Bundle Analysis (BAD)
              </h3>
              <p className="text-red-700 mb-2">
                Price calculation using BAD utility: {UtilityFunctions.formatCurrency(99.99)}
              </p>
              <p className="text-red-700 mb-2">
                Expensive render computation: {expensiveRenderOperation()}
              </p>
              <p className="text-sm text-red-600">
                This formatCurrency function loaded along with {AllFactorials.length} factorials,
                {AllThemes.length} themes, and {ExpensiveData.length} data items!
                Bundle size: 143KB+ (vs &lt;5KB with proper tree shaking)
              </p>
            </div>
          )}
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              🚨 Heavy Utilities Always Loaded
            </h3>
            <p className="text-red-700 text-sm">
              Check the browser console to see all the expensive operations that ran 
              immediately when this page loaded. No dynamic imports - everything is 
              bundled together!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-red-200">
        <h2 className="text-2xl font-bold text-red-900 mb-4">
          How BAD Tree Shaking Works
        </h2>
        
        <div className="space-y-4 text-red-700">
          <div>
            <h3 className="font-semibold mb-2">1. Import Everything</h3>
            <code className="bg-red-100 px-2 py-1 rounded text-sm">
              import BadUIDefault, {`{ ALL_EXPORTS }`} from '@mycompany/bad-ui'
            </code>
            <p className="text-sm mt-1">
              This loads the entire 143KB package even if you only need a button.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Check Massive Bundle Size</h3>
            <p className="text-sm">
              Bundle contains {AllThemes.length + AllAnimations.length + ExpensiveData.length + AllFactorials.length} 
              unnecessary items that will never be used.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">3. Compare BAD vs GOOD Import Patterns</h3>
            <div className="bg-red-50 p-3 rounded text-sm space-y-3">
              <div>
                <span className="text-red-600">🚨 BAD (this page - no tree shaking):</span>
                <br />
                <code>import BadUIDefault, {`{ Button, ALL_OTHER_STUFF }`} from '@mycompany/bad-ui'</code>
                <br />
                <span className="text-xs">Result: 143KB+ bundle with everything</span>
              </div>
              <div>
                <span className="text-green-600">✅ GOOD (proper tree shaking):</span>
                <br />
                <code>import {`{ Button }`} from '@mycompany/ui/Button'</code>
                <br />
                <span className="text-xs">Result: ~1KB bundle with only Button</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Show real-time resource usage */}
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">🐌 Resources Wasted Right Now</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-yellow-700 text-xs">
          <div>Themes: {AllThemes.length}</div>
          <div>Animations: {AllAnimations.length}</div>
          <div>Data Items: {ExpensiveData.length}</div>
          <div>Factorials: {AllFactorials.length}</div>
        </div>
        <p className="text-yellow-600 text-sm mt-2">
          All of this was loaded even though we only needed a Button and formatCurrency!
        </p>
      </div>
    </div>
  )
} 