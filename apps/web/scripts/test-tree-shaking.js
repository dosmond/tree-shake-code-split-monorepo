#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌳 Tree Shaking Analysis Tool');
console.log('==============================');

const buildDir = path.join(__dirname, '../.next');

if (!fs.existsSync(buildDir)) {
  console.log('❌ Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Find JavaScript chunk files
function findChunkFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findChunkFiles(fullPath));
    } else if (entry.name.endsWith('.js') && !entry.name.includes('.map')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const chunkFiles = findChunkFiles(buildDir);
console.log(`\n📦 Found ${chunkFiles.length} JavaScript chunks`);

// Check for tree shaking effectiveness
const unusedFunctions = [
  'unusedFunction1',
  'unusedFunction2', 
  'anotherUnusedFunction',
  'massiveUnusedFunction'
];

const usedFunctions = [
  'usedUtility',
  'heavyFunction'
];

console.log('\n🔍 Analyzing tree shaking results...');

let foundUnused = [];
let foundUsed = [];

for (const file of chunkFiles) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for unused functions (these should NOT be in the bundle)
  for (const func of unusedFunctions) {
    if (content.includes(func)) {
      foundUnused.push({ function: func, file: path.relative(buildDir, file) });
    }
  }
  
  // Check for used functions (these SHOULD be in the bundle)
  for (const func of usedFunctions) {
    if (content.includes(func)) {
      foundUsed.push({ function: func, file: path.relative(buildDir, file) });
    }
  }
}

console.log('\n✅ Used functions found in bundle (expected):');
if (foundUsed.length === 0) {
  console.log('   None found - this might indicate an issue');
} else {
  foundUsed.forEach(({ function: func, file }) => {
    console.log(`   ✓ ${func} in ${file}`);
  });
}

console.log('\n❌ Unused functions found in bundle (should be tree-shaken):');
if (foundUnused.length === 0) {
  console.log('   ✅ None found - Tree shaking is working correctly!');
} else {
  foundUnused.forEach(({ function: func, file }) => {
    console.log(`   ⚠️  ${func} in ${file}`);
  });
}

// Bundle size analysis
console.log('\n📊 Bundle Size Analysis:');
let totalSize = 0;

const sizeByType = {};
for (const file of chunkFiles) {
  const stats = fs.statSync(file);
  const size = stats.size;
  totalSize += size;
  
  const filename = path.basename(file);
  const type = filename.includes('pages') ? 'pages' : 
               filename.includes('chunks') ? 'chunks' :
               filename.includes('framework') ? 'framework' : 'other';
               
  sizeByType[type] = (sizeByType[type] || 0) + size;
  
  if (size > 50000) { // Show files larger than 50KB
    console.log(`   📄 ${path.relative(buildDir, file)}: ${(size / 1024).toFixed(1)}KB`);
  }
}

console.log(`\n📏 Total bundle size: ${(totalSize / 1024).toFixed(1)}KB`);
console.log('   Bundle breakdown:');
Object.entries(sizeByType).forEach(([type, size]) => {
  console.log(`   - ${type}: ${(size / 1024).toFixed(1)}KB`);
});

// Summary
console.log('\n🎯 Summary:');
console.log(`   Used functions in bundle: ${foundUsed.length}/${usedFunctions.length}`);
console.log(`   Unused functions eliminated: ${unusedFunctions.length - foundUnused.length}/${unusedFunctions.length}`);

if (foundUnused.length === 0 && foundUsed.length === usedFunctions.length) {
  console.log('   🎉 Tree shaking is working perfectly!');
} else if (foundUnused.length > 0) {
  console.log('   ⚠️  Some unused functions are still in the bundle');
  console.log('   💡 This might be due to:');
  console.log('      - Side effects in the module');
  console.log('      - Default exports preventing tree shaking');
  console.log('      - Webpack configuration issues');
} else {
  console.log('   ⚠️  Some expected functions are missing from the bundle');
}

console.log('\n💡 To improve tree shaking:');
console.log('   1. Use named imports instead of default imports');
console.log('   2. Mark packages as sideEffects: false in package.json');
console.log('   3. Avoid importing entire modules');
console.log('   4. Use dynamic imports for code splitting'); 