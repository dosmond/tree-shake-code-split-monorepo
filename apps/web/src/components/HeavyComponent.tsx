'use client'

import { useState } from 'react'

// Simulate a heavy component with lots of data and functionality
const HeavyComponent = () => {
  const [data, setData] = useState(generateHeavyData())

  function generateHeavyData() {
    // Simulate processing heavy data
    const result = []
    for (let i = 0; i < 1000; i++) {
      result.push({
        id: i,
        name: `Item ${i}`,
        description: `This is a description for item ${i}`,
        value: Math.random() * 1000,
        category: ['A', 'B', 'C'][i % 3],
        timestamp: new Date().toISOString(),
        processed: false,
        computedValue: 0,
      })
    }
    return result
  }

  const processData = () => {
    // Simulate heavy computation
    const processed = data.map(item => ({
      ...item,
      processed: true,
      computedValue: item.value * Math.PI,
    }))
    setData(processed)
  }

  const filteredData = data.filter(item => item.value > 500)

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Heavy Component Loaded! 🚀</h3>
      <p className="text-sm text-gray-600 mb-4">
        This component contains {data.length} items and heavy computations.
        It's loaded on-demand to keep the initial bundle small.
      </p>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={processData}
          className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
        >
          Process Data
        </button>
        <span className="text-sm text-gray-500">
          Filtered items (value &gt; 500): {filteredData.length}
        </span>
      </div>

      <div className="max-h-40 overflow-y-auto bg-white p-2 rounded border text-xs">
        {filteredData.slice(0, 10).map(item => (
          <div key={item.id} className="border-b py-1">
            {item.name}: {item.value.toFixed(2)} 
            {item.processed && ` (computed: ${item.computedValue?.toFixed(2)})`}
          </div>
        ))}
        {filteredData.length > 10 && (
          <div className="text-gray-500 py-1">
            ... and {filteredData.length - 10} more items
          </div>
        )}
      </div>
    </div>
  )
}

export default HeavyComponent 