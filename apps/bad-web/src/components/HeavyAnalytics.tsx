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

// BAD: Process all data immediately for analytics
console.log('🚨 HeavyAnalytics loading ALL resources for analysis!')

export function HeavyAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({
    totalThemes: AllThemes.length,
    totalAnimations: AllAnimations.length,
    totalData: ExpensiveData.length,
    totalFactorials: AllFactorials.length,
    processedItems: [] as any[],
  })
  
  // Fix hydration by moving random computations to client-side only
  useEffect(() => {
    const processedItems = ExpensiveData.slice(0, 5000).map((item, i) => ({
      ...item,
      processedHash: MassiveUtility.processData(item.hash),
      theme: AllThemes[i % AllThemes.length], // Deterministic instead of random
      animation: AllAnimations[i % AllAnimations.length], // Deterministic instead of random
    }))
    
    setAnalyticsData(prev => ({ ...prev, processedItems }))
    console.log('🚨 Analytics processed', processedItems.length, 'items with themes and animations')
  }, [])
  
  // BAD: More expensive operations in render
  const computeRealTimeStats = () => {
    const totalItems = analyticsData.totalThemes + analyticsData.totalAnimations + analyticsData.totalData
    const averageFactorial = AllFactorials.slice(0, 100).reduce((sum, f) => sum + (f % 1000), 0) / 100
    return { totalItems, averageFactorial }
  }

  const stats = computeRealTimeStats()

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-red-200">
      <h3 className="text-lg font-semibold text-red-800 mb-4">
        🚨 BAD Heavy Analytics
      </h3>
      <p className="text-red-600 text-sm mb-6">
        This component loaded and processed ALL {stats.totalItems} resources for "analytics"!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h4 className="font-semibold text-red-800">Themes Loaded</h4>
          <p className="text-2xl font-bold text-red-600">{analyticsData.totalThemes}</p>
          <p className="text-xs text-red-500">All loaded upfront</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h4 className="font-semibold text-red-800">Animations</h4>
          <p className="text-2xl font-bold text-red-600">{analyticsData.totalAnimations}</p>
          <p className="text-xs text-red-500">Never used</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h4 className="font-semibold text-red-800">Data Items</h4>
          <p className="text-2xl font-bold text-red-600">{analyticsData.totalData}</p>
          <p className="text-xs text-red-500">Massive waste</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h4 className="font-semibold text-red-800">Factorials</h4>
          <p className="text-2xl font-bold text-red-600">{analyticsData.totalFactorials}</p>
          <p className="text-xs text-red-500">Avg: {Math.floor(stats.averageFactorial)}</p>
        </div>
      </div>
      
      {/* BAD: Render heavy components unnecessarily */}
      <div className="space-y-4">
        <Card title="Heavy Processing Results">
          <p className="text-red-700 mb-4">
            Processed {analyticsData.processedItems.length} items with unnecessary theme and animation data.
          </p>
          <HeavyComponent />
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Resource Usage Chart">
            <Charts 
              data={[
                { label: 'Themes', value: analyticsData.totalThemes },
                { label: 'Animations', value: analyticsData.totalAnimations },
                { label: 'Data', value: Math.floor(analyticsData.totalData / 1000) },
                { label: 'Factorials', value: Math.floor(analyticsData.totalFactorials / 100) },
              ]}
              type="bar"
            />
          </Card>
          
          <Card title="Waste Distribution">
            <Charts 
              data={[
                { label: 'Necessary', value: 5 },
                { label: 'Wasteful', value: 95 },
              ]}
              type="pie"
            />
          </Card>
        </div>
      </div>
      
      <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">🐌 Performance Impact</h4>
        <div className="text-yellow-700 text-sm space-y-1">
          <p>• Bundle size: 143KB+ (should be ~10KB for analytics)</p>
          <p>• Load time: All resources loaded upfront (should be on-demand)</p>
          <p>• Memory usage: {stats.totalItems} items always in memory</p>
          <p>• Processing time: Immediate (should be lazy-loaded)</p>
        </div>
      </div>
    </div>
  )
}

export default HeavyAnalytics 