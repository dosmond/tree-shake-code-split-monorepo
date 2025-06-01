'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const routes = [
  { href: '/', label: 'Home', description: 'Overview and getting started' },
  { href: '/tree-shaking', label: 'Tree Shaking', description: 'Dead code elimination demo' },
  { href: '/code-splitting', label: 'Code Splitting', description: 'Dynamic loading examples' },
  { href: '/dashboard', label: 'Dashboard', description: 'Heavy components demo' },
  { href: '/admin', label: 'Admin', description: 'Conditional loading demo' },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [prefetchedRoutes, setPrefetchedRoutes] = useState<Set<string>>(new Set())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Development vs Production prefetching strategy
  useEffect(() => {
    if (!isHydrated) return

    const prefetchRoute = (href: string) => {
      if (!prefetchedRoutes.has(href)) {
        router.prefetch(href)
        setPrefetchedRoutes(prev => new Set(prev).add(href))
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // Aggressive prefetching in development for better UX
      routes.forEach(route => {
        setTimeout(() => prefetchRoute(route.href), 100)
      })
    } else {
      // Smart prefetching in production
      // Prefetch critical routes first
      const criticalRoutes = ['/', '/tree-shaking', '/code-splitting']
      criticalRoutes.forEach(href => prefetchRoute(href))
      
      // Prefetch others after a delay
      setTimeout(() => {
        routes
          .filter(route => !criticalRoutes.includes(route.href))
          .forEach(route => prefetchRoute(route.href))
      }, 2000)
    }
  }, [router, prefetchedRoutes, isHydrated])

  const handleLinkHover = (href: string) => {
    if (!isHydrated) return
    if (!prefetchedRoutes.has(href)) {
      router.prefetch(href)
      setPrefetchedRoutes(prev => new Set(prev).add(href))
    }
  }

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)
    // Add any navigation tracking here
    if (process.env.NODE_ENV === 'development') {
      console.log(`Navigating to: ${href}`)
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              onMouseEnter={() => handleLinkHover('/')}
              onClick={() => handleNavigation('/')}
            >
              🌳⚡ Monorepo Demo
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {routes.map((route) => {
              const isActive = pathname === route.href
              const isPrefetched = isHydrated && prefetchedRoutes.has(route.href)
              
              return (
                <div key={route.href} className="relative group">
                  <Link
                    href={route.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onMouseEnter={() => handleLinkHover(route.href)}
                    onClick={() => handleNavigation(route.href)}
                  >
                    <span>{route.label}</span>
                    {isPrefetched && (
                      <span className="w-2 h-2 bg-green-400 rounded-full opacity-60" title="Prefetched" />
                    )}
                  </Link>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {route.description}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Development Info - Only show after hydration */}
          {isHydrated && (
            <div className="hidden lg:flex items-center text-xs text-gray-500 space-x-3">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>{process.env.NODE_ENV}</span>
              </div>
              <div>
                Prefetched: {prefetchedRoutes.size}/{routes.length}
              </div>
              <div className="font-mono text-gray-400">
                {pathname}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="space-y-1">
              {routes.map((route) => {
                const isActive = pathname === route.href
                const isPrefetched = isHydrated && prefetchedRoutes.has(route.href)
                
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onMouseEnter={() => handleLinkHover(route.href)}
                    onClick={() => handleNavigation(route.href)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span>{route.label}</span>
                          {isPrefetched && (
                            <span className="w-2 h-2 bg-green-400 rounded-full" title="Prefetched" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {route.description}
                        </div>
                      </div>
                      {isActive && (
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
            
            {/* Mobile Development Info - Only show after hydration */}
            {isHydrated && (
              <div className="mt-4 pt-2 border-t border-gray-200 px-3 space-y-1 text-xs text-gray-500">
                <div>Environment: {process.env.NODE_ENV}</div>
                <div>Prefetched: {prefetchedRoutes.size}/{routes.length} routes</div>
                <div className="font-mono">{pathname}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Performance indicator - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-1">
          <div className="container mx-auto flex justify-between items-center text-xs text-yellow-800">
            <div>
              🚧 Development Mode - Enhanced prefetching active
            </div>
            <div className="space-x-4">
              <span>Bundle Analysis: {process.env.BUNDLE_ANALYZE || 'disabled'}</span>
              <button
                onClick={() => {
                  console.log('Prefetched routes:', Array.from(prefetchedRoutes))
                  console.log('Current pathname:', pathname)
                }}
                className="underline hover:no-underline"
              >
                Debug Info
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}