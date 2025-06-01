'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

// BAD: Import entire bad-ui package instead of selective imports
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

// BAD: Execute heavy computations immediately in navigation
console.log('🚨 BAD Navigation: Loading all UI components on every navigation render!')

// BAD: Create expensive data immediately
const heavyNavigationData = ExpensiveData.slice(0, 1000)
console.log('🚨 Navigation loaded', heavyNavigationData.length, 'expensive items')

export function Navigation() {
  const pathname = usePathname()
  const [navigationColor, setNavigationColor] = useState('')
  const [navigationId, setNavigationId] = useState('hydrating...')
  const [buttonColor, setButtonColor] = useState({})
  
  // Fix hydration by moving dynamic computations to client-side only
  useEffect(() => {
    const color = UtilityFunctions.randomColor()
    const id = UtilityFunctions.generateId()
    const btnColor = MassiveUtility.generateRandomStyle()
    
    setNavigationColor(color)
    setNavigationId(id)
    setButtonColor(btnColor)
  }, [])
  
  const navItems = [
    { href: '/', label: 'Home', emoji: '🏠' },
    { href: '/tree-shaking', label: 'Tree Shaking', emoji: '🌳' },
    { href: '/code-splitting', label: 'Code Splitting', emoji: '✂️' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-red-50 border-b border-red-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚨</span>
            <div>
              <h1 className="text-xl font-bold text-red-800">
                BAD Practices Demo
              </h1>
              <p className="text-xs text-red-600">
                ID: {navigationId} | Loaded: {AllThemes.length}k items
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${active 
                      ? 'bg-red-200 text-red-900 border border-red-300' 
                      : 'text-red-700 hover:bg-red-100 hover:text-red-900'
                    }
                  `}
                  style={active ? buttonColor : undefined}
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Bad Practice Indicator */}
          <div className="flex items-center space-x-2">
            <div className="text-xs text-red-600 text-right">
              <div>Bundle Size: 143KB+</div>
              <div>Side Effects: {AllFactorials.length}</div>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" 
                 title="Bad practices active"></div>
          </div>
        </div>
      </div>
      
      {/* Bad Practice Alert Banner */}
      <div className="bg-red-100 border-t border-red-200 px-4 py-2">
        <div className="container mx-auto">
          <p className="text-sm text-red-800">
            🚨 <strong>WARNING:</strong> This app demonstrates BAD practices! 
            It imports {AllThemes.length + AllAnimations.length + ExpensiveData.length} 
            unnecessary items on every page load. 
            Compare with the good version for proper tree shaking.
          </p>
        </div>
      </div>
    </nav>
  )
} 