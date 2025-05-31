// Heavy utilities that should be tree shaken if not used

// Large data structure that should be eliminated if not imported
export const LARGE_LOOKUP_TABLE = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    category: `category-${i % 100}`,
    metadata: {
      created: new Date(2020 + (i % 4), i % 12, (i % 28) + 1),
      tags: [`tag-${i % 50}`, `tag-${(i + 1) % 50}`, `tag-${(i + 2) % 50}`],
      description: `This is a description for item ${i} with lots of text that makes the bundle larger`
    }
  }))
  
  // Heavy computation function
  export const heavyUtility = (data: number[]): number => {
    console.log('Heavy utility called - this should be tree shaken if not used!')
    
    // Simulate expensive computation
    let result = 0
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 1000; j++) {
        result += Math.sin(data[i] * j) * Math.cos(data[i] * j)
      }
    }
    
    return result
  }
  
  // Another expensive function with dependencies
  export const expensiveCalculation = (input: string): string => {
    console.log('Expensive calculation called - should be tree shaken!')
    
    // Use the large lookup table
    const processed = LARGE_LOOKUP_TABLE.filter(item => 
      item.metadata.description.includes(input)
    )
    
    return `Processed ${processed.length} items`
  }
  
  // Complex object with methods (testing tree shaking of object properties)
  export const complexUtilities = {
    // This should be tree shaken if not used
    rareDatabaseConnection: {
      host: 'rare-database.example.com',
      port: 5432,
      credentials: 'super-secret-key-that-should-not-be-in-bundle',
      connect() {
        console.log('Connecting to rare database...')
        return 'connection-object'
      }
    },
    
    // This should be tree shaken if not used
    advancedImageProcessing: {
      filters: {
        blur: (intensity: number) => `blur(${intensity}px)`,
        sepia: (amount: number) => `sepia(${amount}%)`,
        vintage: () => 'sepia(50%) contrast(120%) brightness(110%)'
      },
      process: (image: string, filters: string[]) => {
        console.log('Processing image with advanced filters...')
        return `processed-${image}`
      }
    },
    
    // Common utility that might be used
    formatters: {
      currency: (amount: number) => `$${amount.toFixed(2)}`,
      percentage: (value: number) => `${(value * 100).toFixed(1)}%`,
      fileSize: (bytes: number) => {
        const units = ['B', 'KB', 'MB', 'GB']
        let size = bytes
        let unitIndex = 0
        
        while (size >= 1024 && unitIndex < units.length - 1) {
          size /= 1024
          unitIndex++
        }
        
        return `${size.toFixed(1)} ${units[unitIndex]}`
      }
    }
  }
  
  // Large class that should be tree shaken if not instantiated
  export class AdvancedAnalyticsEngine {
    private data: any[] = []
    private models: Map<string, any> = new Map()
    
    constructor() {
      console.log('AdvancedAnalyticsEngine instantiated - should be tree shaken if not used!')
      
      // Initialize with heavy default data
      this.data = LARGE_LOOKUP_TABLE.map(item => ({
        ...item,
        analyticsData: this.generateAnalyticsData(item.id)
      }))
    }
    
    private generateAnalyticsData(id: number) {
      // Simulate heavy analytics data generation
      return {
        sessions: Math.floor(Math.random() * 1000),
        conversions: Math.floor(Math.random() * 100),
        revenue: Math.random() * 10000,
        trends: Array.from({ length: 30 }, () => Math.random() * 100)
      }
    }
    
    public analyze(query: string) {
      console.log(`Analyzing query: ${query}`)
      // Heavy analysis logic...
      return {
        insights: ['insight1', 'insight2'],
        recommendations: ['rec1', 'rec2'],
        confidence: 0.85
      }
    }
    
    public trainModel(modelName: string, data: any[]) {
      console.log(`Training model: ${modelName}`)
      // Heavy ML training logic...
      this.models.set(modelName, { trained: true, accuracy: 0.92 })
    }
  }