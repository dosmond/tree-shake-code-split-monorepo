#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Global Tree Shaking Test');
console.log('===========================');

try {
  console.log('📦 Building all packages...');
  execSync('npm run build', { cwd: process.cwd(), stdio: 'inherit' });
  
  console.log('\n🔍 Running web app tree shaking analysis...');
  const webAppScript = path.join(__dirname, '../apps/web/scripts/test-tree-shaking.js');
  execSync(`node "${webAppScript}"`, { cwd: process.cwd(), stdio: 'inherit' });
  
  console.log('\n✅ Tree shaking analysis complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Run "npm run analyze" to see the bundle analyzer');
  console.log('   2. Check the Network tab when testing code splitting');
  console.log('   3. Compare bundle sizes before and after optimizations');
  
} catch (error) {
  console.error('❌ Error running tree shaking test:', error.message);
  process.exit(1);
} 