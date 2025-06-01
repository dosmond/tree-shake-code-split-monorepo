import { useState, useEffect } from 'react'

// BAD: Import everything instead of just what's needed
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

// BAD: Generate expensive data immediately
console.log('🚨 DataTableDemo loading with all bad-ui resources!')

export function DataTableDemo() {
  const [expensiveData, setExpensiveData] = useState<any[]>([])
  
  // Fix hydration by moving dynamic data generation to client-side only
  useEffect(() => {
    const data = ExpensiveData.slice(0, 100).map((item, i) => ({
      id: `item-${i}-${Date.now()}`,
      name: `Item ${i}`,
      value: Math.floor((i * 13) % 1000), // Deterministic instead of random
      color: AllThemes[i % AllThemes.length]?.colors?.primary || '#000000',
      theme: AllThemes[i % AllThemes.length]?.name || 'default',
      factorial: AllFactorials[i % AllFactorials.length] || 1,
    }))
    setExpensiveData(data)
  }, [])
  
  // BAD: More expensive operations in render
  const processedCount = ExpensiveData.length
  
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-red-200">
      <h3 className="text-lg font-semibold text-red-800 mb-4">
        🚨 BAD Data Table Demo
      </h3>
      <p className="text-red-600 text-sm mb-4">
        Loaded {processedCount} expensive data items and {AllThemes.length} themes unnecessarily!
      </p>
      
      <DataTable 
        data={expensiveData}
        columns={['id', 'name', 'value', 'color', 'theme', 'factorial']}
      />
      
      <div className="mt-4 text-xs text-red-500">
        <p>Resource waste: {AllFactorials.length} factorials, {AllAnimations.length} animations loaded</p>
      </div>
    </div>
  )
} 