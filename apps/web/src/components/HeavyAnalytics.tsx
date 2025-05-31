'use client'

import { useState, useEffect } from 'react'

export default function HeavyAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate heavy analytics computation
    const timer = setTimeout(() => {
      setAnalytics({
        totalUsers: 15432,
        activeUsers: 8921,
        conversionRate: 12.5,
        revenue: 98765,
        trends: [
          { metric: 'Page Views', change: '+15.3%', value: '1.2M' },
          { metric: 'Bounce Rate', change: '-8.1%', value: '32.1%' },
          { metric: 'Session Duration', change: '+22.7%', value: '4m 32s' },
        ]
      })
      setLoading(false)
    }, 1500) // Simulate loading time
    
    return () => clearTimeout(timer)
  }, [])
  
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-6">Advanced Analytics Dashboard</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <div className="text-2xl font-bold text-blue-800">{analytics.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-blue-600">Total Users</div>
        </div>
        <div className="bg-green-50 p-4 rounded border border-green-200">
          <div className="text-2xl font-bold text-green-800">{analytics.activeUsers.toLocaleString()}</div>
          <div className="text-sm text-green-600">Active Users</div>
        </div>
        <div className="bg-purple-50 p-4 rounded border border-purple-200">
          <div className="text-2xl font-bold text-purple-800">{analytics.conversionRate}%</div>
          <div className="text-sm text-purple-600">Conversion Rate</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-800">${analytics.revenue.toLocaleString()}</div>
          <div className="text-sm text-yellow-600">Revenue</div>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-3">Trends</h4>
        <div className="space-y-2">
          {analytics.trends.map((trend: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">{trend.metric}</span>
              <div className="text-right">
                <div className="font-semibold">{trend.value}</div>
                <div className={`text-sm ${trend.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}