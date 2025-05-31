import Link from 'next/link'
import { Button } from '@mycompany/ui/Button'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tree Shaking & Code Splitting Demo
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore tree shaking and code splitting in a Turborepo monorepo with Next.js
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🌳 Tree Shaking
          </h2>
          <p className="text-gray-600 mb-4">
            Learn how bundlers eliminate unused code to reduce bundle size.
          </p>
          <Link href="/tree-shaking">
            <Button variant="primary">
              Explore Tree Shaking
            </Button>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            ✂️ Code Splitting
          </h2>
          <p className="text-gray-600 mb-4">
            Discover how to split code into chunks for better performance.
          </p>
          <Link href="/code-splitting">
            <Button variant="primary">
              Explore Code Splitting
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          🚀 Getting Started
        </h3>
        <div className="text-blue-700 space-y-2">
          <p>1. Run <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code> to start development</p>
          <p>2. Run <code className="bg-blue-100 px-2 py-1 rounded">npm run analyze</code> to analyze bundles</p>
          <p>3. Run <code className="bg-blue-100 px-2 py-1 rounded">npm run test:tree-shake</code> to test tree shaking</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-2">📦 Monorepo Structure</h4>
          <p>Turborepo with separate UI and utils packages</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-2">⚡ Performance</h4>
          <p>Optimized builds with tree shaking and code splitting</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-2">🔍 Analysis</h4>
          <p>Built-in tools to measure and optimize bundle size</p>
        </div>
      </div>
    </div>
  )
}