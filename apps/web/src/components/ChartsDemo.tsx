'use client'

import dynamic from 'next/dynamic'
import { use } from 'react'

// Dynamically import the Charts component to ensure it's code-split
const Charts = dynamic(() => import('@mycompany/ui/Charts').then(mod => ({ default: mod.Charts })), {
  loading: () => (
    <div className="bg-gray-50 p-4 rounded border animate-pulse" style={{ width: 400, height: 300 }}>
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-2">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="flex items-center">
            <div className="w-8 h-3 bg-gray-200 rounded mr-2"></div>
            <div className="flex-1 bg-gray-100 h-4 rounded">
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
            <div className="w-8 h-3 bg-gray-200 rounded ml-2"></div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: false
})

const chartData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 78 },
  { name: 'Mar', value: 90 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 92 },
  { name: 'Jun', value: 88 },
]

// Create the data loading promise
const createChartDataPromise = () => {
  return new Promise<typeof chartData>((resolve) => {
    console.log('Starting to load chart data...')
    setTimeout(() => {
      console.log('Chart data loaded!')
      resolve(chartData)
    }, 2000) // 2 second delay to show the loading state
  })
}

export default function ChartsDemo() {
  const data = use(createChartDataPromise())
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Performance Charts</h3>
      <p className="text-sm text-gray-600 mb-4">
        📊 This chart component suspends for 2 seconds to demonstrate the fallback UI.
      </p>
      <Charts 
        data={data}
        type="bar"
        width={400}
        height={250}
      />
      <p className="text-xs text-green-600 mt-2">
        ✅ Chart data loaded successfully! Both component AND chart library were code-split.
      </p>
    </div>
  )
}
