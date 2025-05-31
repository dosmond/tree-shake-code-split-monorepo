import React from 'react'

export interface ChartsProps {
  data: Array<{ name: string; value: number }>
  type?: 'bar' | 'line' | 'pie'
  width?: number
  height?: number
}

// Heavy chart component for code splitting demo
export const Charts: React.FC<ChartsProps> = ({ 
  data, 
  type = 'bar', 
  width = 400, 
  height = 300 
}) => {
  // Simulate heavy chart rendering
  const renderChart = () => {
    console.log('Rendering heavy chart component...')
    
    // Simulate complex chart logic
    const maxValue = Math.max(...data.map(d => d.value))
    
    return (
      <div className="bg-gray-50 p-4 rounded border" style={{ width, height }}>
        <h3 className="text-lg font-semibold mb-4">Chart ({type})</h3>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="w-20 text-sm">{item.name}</span>
              <div className="flex-1 bg-gray-200 rounded h-4 mx-2">
                <div 
                  className="bg-blue-500 h-4 rounded"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="w-12 text-sm text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return renderChart()
}