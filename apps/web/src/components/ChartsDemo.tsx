'use client'

import { Charts } from '@mycompany/ui/Charts'

const chartData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 78 },
  { name: 'Mar', value: 90 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 92 },
  { name: 'Jun', value: 88 },
]

export default function ChartsDemo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Performance Charts</h3>
      <Charts 
        data={chartData}
        type="bar"
        width={400}
        height={250}
      />
    </div>
  )
}
