#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Bundle Analysis Script
 * 
 * Analyzes the built bundle to identify the heaviest imports and dependencies.
 * Provides insights into what's taking up the most space in your bundles.
 * 
 * Usage:
 *   node scripts/test-tree-shaking.js [app-name]
 *   
 * Examples:
 *   node scripts/test-tree-shaking.js web
 *   node scripts/test-tree-shaking.js bad-web
 */

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  let appName = args[0]
  
  // Default to 'web' if no argument provided
  if (!appName) {
    console.log('ℹ️  No app specified, defaulting to "web"')
    console.log('   Usage: node scripts/test-tree-shaking.js [web|bad-web]\n')
    appName = 'web'
  }
  
  // Validate app name
  const validApps = ['web', 'bad-web']
  if (!validApps.includes(appName)) {
    console.error(`❌ Invalid app name: "${appName}"`)
    console.error(`   Valid options: ${validApps.join(', ')}`)
    process.exit(1)
  }
  
  const appDir = `apps/${appName}`
  
  // Check if app directory exists
  if (!fs.existsSync(appDir)) {
    console.error(`❌ App directory not found: ${appDir}`)
    process.exit(1)
  }
  
  return { appName, appDir }
}

// Common libraries and frameworks to detect
const KNOWN_LIBRARIES = [
  { name: 'React', patterns: ['react', 'React', '__webpack_require__'] },
  { name: 'Next.js', patterns: ['next', '_next', '__next'] },
  { name: 'Lodash', patterns: ['lodash', '_\\.', 'lodash\\.'] },
  { name: 'Moment.js', patterns: ['moment'] },
  { name: 'Chart.js', patterns: ['chart.js', 'Chart'] },
  { name: 'D3', patterns: ['d3'] },
  { name: 'Axios', patterns: ['axios'] },
  { name: 'Polyfills', patterns: ['polyfill', 'core-js'] },
]

// Files that are considered "main bundle" (not dynamic chunks)
const isMainBundle = (fileName) => {
  return fileName.includes('main-') || 
         fileName.includes('app-') ||
         fileName.includes('layout') ||
         fileName.includes('page-') ||
         fileName.includes('react-') ||
         fileName.includes('common-') ||
         fileName.includes('webpack-') ||
         fileName === '_app.js' ||
         fileName === '_error.js' ||
         fileName === '_document.js'
}

// Files that are dynamic chunks (loaded on demand)
const isDynamicChunk = (fileName) => {
  return /^\d+\./.test(fileName) || // numbered chunks like "123.js"
         /^[a-f0-9]{3,}\./.test(fileName) || // hash-based chunks
         fileName.includes('chunk') ||
         fileName.includes('lazy')
}

// Extract likely module/component names from content
function extractModuleNames(content) {
  const modules = new Set()
  
  // Look for common import patterns
  const importMatches = content.match(/import.*?from.*?['"`]([^'"`]+)['"`]/g) || []
  importMatches.forEach(match => {
    const moduleName = match.match(/['"`]([^'"`]+)['"`]/)?.[1]
    if (moduleName && !moduleName.startsWith('.')) {
      modules.add(moduleName)
    }
  })
  
  // Look for webpack module definitions
  const webpackModules = content.match(/\/\*\*\* ([^*]+) \*\*\*/g) || []
  webpackModules.forEach(match => {
    const moduleName = match.replace(/\/\*\*\* /, '').replace(/ \*\*\*/, '')
    if (moduleName && moduleName.length < 100) { // Reasonable length
      modules.add(moduleName)
    }
  })
  
  // Look for function/class names (potential components)
  const functionNames = content.match(/function\s+([A-Z][a-zA-Z0-9]+)/g) || []
  functionNames.forEach(match => {
    const funcName = match.replace('function ', '')
    if (funcName.length < 30) {
      modules.add(funcName)
    }
  })
  
  // Look for export names
  const exportNames = content.match(/export\s+(?:const|let|var|function|class)\s+([a-zA-Z][a-zA-Z0-9]+)/g) || []
  exportNames.forEach(match => {
    const exportName = match.split(/\s+/).pop()
    if (exportName && exportName.length < 30) {
      modules.add(exportName)
    }
  })
  
  return Array.from(modules).slice(0, 10) // Top 10 to avoid spam
}

// Analyze the largest items within the content
function findLargestItems(content, fileName) {
  const items = []
  
  // 1. Find large functions (approximate size by counting characters between braces)
  const functionPattern = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{/g
  let match
  while ((match = functionPattern.exec(content)) !== null) {
    const funcName = match[1]
    const startPos = match.index
    const funcStart = content.indexOf('{', startPos)
    
    if (funcStart !== -1) {
      const funcEnd = findMatchingBrace(content, funcStart)
      if (funcEnd !== -1) {
        const funcSize = funcEnd - funcStart
        if (funcSize > 1000) { // Only functions larger than 1KB
          items.push({
            name: `function ${funcName}()`,
            size: funcSize,
            type: 'function'
          })
        }
      }
    }
  }
  
  // 2. Find large object literals
  const objectPattern = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\{/g
  while ((match = objectPattern.exec(content)) !== null) {
    const objName = match[1]
    const startPos = content.indexOf('{', match.index)
    
    if (startPos !== -1) {
      const objEnd = findMatchingBrace(content, startPos)
      if (objEnd !== -1) {
        const objSize = objEnd - startPos
        if (objSize > 2000) { // Only objects larger than 2KB
          items.push({
            name: `object ${objName}`,
            size: objSize,
            type: 'object'
          })
        }
      }
    }
  }
  
  // 3. Find large arrays
  const arrayPattern = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\[/g
  while ((match = arrayPattern.exec(content)) !== null) {
    const arrName = match[1]
    const startPos = content.indexOf('[', match.index)
    
    if (startPos !== -1) {
      const arrEnd = findMatchingBracket(content, startPos)
      if (arrEnd !== -1) {
        const arrSize = arrEnd - startPos
        if (arrSize > 2000) { // Only arrays larger than 2KB
          items.push({
            name: `array ${arrName}`,
            size: arrSize,
            type: 'array'
          })
        }
      }
    }
  }
  
  // 4. Find large string literals
  const largeStringPattern = /["'`]([^"'`]{2000,})["'`]/g
  while ((match = largeStringPattern.exec(content)) !== null) {
    const stringContent = match[1].substring(0, 50) + '...'
    items.push({
      name: `large string: "${stringContent}"`,
      size: match[1].length,
      type: 'string'
    })
  }
  
  // 5. Find webpack chunks with names
  const webpackChunkPattern = /webpackChunkName:\s*["']([^"']+)["']/g
  while ((match = webpackChunkPattern.exec(content)) !== null) {
    const chunkName = match[1]
    items.push({
      name: `webpack chunk: ${chunkName}`,
      size: 0, // Size not easily determinable
      type: 'webpack-chunk'
    })
  }
  
  // Sort by size and return top items
  return items
    .sort((a, b) => b.size - a.size)
    .slice(0, 5) // Top 5 largest items
}

// Helper function to find matching closing brace
function findMatchingBrace(content, startPos) {
  let braceCount = 1
  let pos = startPos + 1
  
  while (pos < content.length && braceCount > 0) {
    if (content[pos] === '{') braceCount++
    else if (content[pos] === '}') braceCount--
    pos++
  }
  
  return braceCount === 0 ? pos - 1 : -1
}

// Helper function to find matching closing bracket
function findMatchingBracket(content, startPos) {
  let bracketCount = 1
  let pos = startPos + 1
  
  while (pos < content.length && bracketCount > 0) {
    if (content[pos] === '[') bracketCount++
    else if (content[pos] === ']') bracketCount--
    pos++
  }
  
  return bracketCount === 0 ? pos - 1 : -1
}

// Detect which libraries are present in the content
function detectLibraries(content) {
  const detectedLibs = []
  KNOWN_LIBRARIES.forEach(lib => {
    const hasLibrary = lib.patterns.some(pattern => content.includes(pattern))
    if (hasLibrary) {
      detectedLibs.push(lib.name)
    }
  })
  return detectedLibs
}

async function analyzeBundle() {
  const { appName, appDir } = parseArgs()
  
  console.log(`📊 Analyzing bundle composition for "${appName}" app...\n`)
  
  // Build the project first
  console.log(`🔨 Building ${appName} app...`)
  try {
    execSync(`npm run build --workspace=${appDir}`, { stdio: 'inherit' })
  } catch (error) {
    console.error('❌ Build failed:', error.message)
    process.exit(1)
  }
  
  // Find built JavaScript files
  const buildDir = path.join(process.cwd(), `${appDir}/.next/static/chunks`)
  
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found:', buildDir)
    console.error('   Make sure the app has been built successfully')
    process.exit(1)
  }
  
  const jsFiles = fs.readdirSync(buildDir)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(buildDir, file))
  
  // Also check pages directory
  const pagesDir = path.join(process.cwd(), `${appDir}/.next/static/chunks/pages`)
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir)
      .filter(file => file.endsWith('.js'))
      .map(file => path.join(pagesDir, file))
    jsFiles.push(...pageFiles)
  }
  
  console.log(`📁 Found ${jsFiles.length} JavaScript files to analyze in ${appName} app\n`)
  
  let totalSize = 0
  let mainBundleSize = 0
  const fileAnalysis = []
  const libraryUsage = new Map()
  const allModules = new Set()
  
  // Analyze each file
  for (const filePath of jsFiles) {
    const content = fs.readFileSync(filePath, 'utf8')
    const fileSize = Buffer.byteLength(content, 'utf8')
    totalSize += fileSize
    
    const fileName = path.basename(filePath)
    const isMain = isMainBundle(fileName)
    const isDynamic = isDynamicChunk(fileName)
    
    if (isMain) {
      mainBundleSize += fileSize
    }
    
    // Extract modules and libraries from this file
    const modules = extractModuleNames(content)
    const libraries = detectLibraries(content)
    const largestItems = findLargestItems(content, fileName)
    
    modules.forEach(mod => allModules.add(mod))
    libraries.forEach(lib => {
      libraryUsage.set(lib, (libraryUsage.get(lib) || 0) + 1)
    })
    
    let fileType = '📄'
    if (isMain) fileType = '🏠' // main bundle
    else if (isDynamic) fileType = '📦' // dynamic chunk
    
    fileAnalysis.push({
      fileName,
      fileSize,
      isMain,
      isDynamic,
      modules,
      libraries,
      largestItems,
      fileType
    })
  }
  
  // Sort files by size (heaviest first)
  fileAnalysis.sort((a, b) => b.fileSize - a.fileSize)
  
  console.log('📊 FILE ANALYSIS (by size):')
  console.log('='.repeat(80))
  
  fileAnalysis.forEach(file => {
    console.log(`${file.fileType} ${file.fileName} (${formatBytes(file.fileSize)})`)
    
    if (file.libraries.length > 0) {
      console.log(`   📚 Libraries: ${file.libraries.join(', ')}`)
    }
    
    if (file.modules.length > 0) {
      const displayModules = file.modules.slice(0, 5) // Show top 5
      const more = file.modules.length > 5 ? ` +${file.modules.length - 5} more` : ''
      console.log(`   📦 Modules: ${displayModules.join(', ')}${more}`)
    }
    
    if (file.largestItems.length > 0) {
      console.log(`   🔍 Largest Items:`)
      file.largestItems.forEach((item, index) => {
        const emoji = item.type === 'function' ? '⚙️' : 
                     item.type === 'object' ? '📋' : 
                     item.type === 'array' ? '📊' : 
                     item.type === 'string' ? '📝' : '📦'
        console.log(`      ${index + 1}. ${emoji} ${item.name} (${formatBytes(item.size)})`)
      })
    }
    
    console.log()
  })
  
  // Bundle size analysis
  console.log('\n📊 BUNDLE SIZE ANALYSIS:')
  console.log('='.repeat(60))
  console.log(`   Total size: ${formatBytes(totalSize)}`)
  console.log(`   Main bundle size: ${formatBytes(mainBundleSize)} (${((mainBundleSize/totalSize)*100).toFixed(1)}%)`)
  console.log(`   Dynamic chunks size: ${formatBytes(totalSize - mainBundleSize)} (${(((totalSize - mainBundleSize)/totalSize)*100).toFixed(1)}%)`)
  
  // Top 5 heaviest files
  console.log('\n🏆 TOP 5 HEAVIEST FILES:')
  console.log('='.repeat(40))
  fileAnalysis.slice(0, 5).forEach((file, index) => {
    const percentage = ((file.fileSize / totalSize) * 100).toFixed(1)
    console.log(`${index + 1}. ${file.fileName} - ${formatBytes(file.fileSize)} (${percentage}%)`)
  })
  
  // Library usage analysis
  if (libraryUsage.size > 0) {
    console.log('\n📚 LIBRARY USAGE:')
    console.log('='.repeat(30))
    Array.from(libraryUsage.entries())
      .sort(([,a], [,b]) => b - a)
      .forEach(([lib, count]) => {
        console.log(`   ${lib}: appears in ${count} file(s)`)
      })
  }
  
  // Bundle health check
  console.log('\n🔍 BUNDLE HEALTH CHECK:')
  console.log('='.repeat(40))
  
  const mainBundleFiles = fileAnalysis.filter(f => f.isMain)
  const dynamicFiles = fileAnalysis.filter(f => f.isDynamic)
  
  console.log(`✅ Main bundle files: ${mainBundleFiles.length}`)
  console.log(`📦 Dynamic chunks: ${dynamicFiles.length}`)
  
  if (mainBundleSize > 300 * 1024) {
    console.log(`⚠️  Main bundle is large (${formatBytes(mainBundleSize)}) - consider code splitting`)
  } else {
    console.log(`✅ Main bundle size is reasonable (${formatBytes(mainBundleSize)})`)
  }
  
  const largestFile = fileAnalysis[0]
  if (largestFile.fileSize > 200 * 1024) {
    console.log(`⚠️  Largest file (${largestFile.fileName}) is ${formatBytes(largestFile.fileSize)} - consider optimization`)
  }
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:')
  console.log('='.repeat(30))
  console.log('• Run `npm run analyze` for visual bundle composition')
  console.log('• Consider code splitting for files > 100KB')
  console.log('• Use dynamic imports for heavy libraries')
  console.log('• Check if unused libraries can be removed')
  console.log('• Monitor bundle size in CI/CD pipeline')
  
  return true
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Run the analysis
if (require.main === module) {
  analyzeBundle()
    .then(success => {
      const { appName } = parseArgs()
      console.log(`\n✅ Bundle analysis completed for "${appName}" app!`)
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error)
      process.exit(1)
    })
}

module.exports = { analyzeBundle }