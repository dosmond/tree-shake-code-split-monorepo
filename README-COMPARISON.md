# Tree Shaking & Code Splitting Comparison

This monorepo demonstrates the difference between good and bad practices for tree shaking and code splitting.

## Package Comparison

### ✅ Good Package (`@mycompany/ui`)

**Package Configuration:**
- **Exports field**: Granular exports for each component
- **sideEffects**: Correctly declares CSS files as side effects
- **Build system**: tsup with component splitting
- **Bundle output**: Multiple small files (Button.mjs: 1.05KB, Card.mjs: 422B, etc.)

**Tree Shaking Features:**
- Import only what you need: `import { Button } from '@mycompany/ui/Button'`
- No side effects on import
- Dead code elimination works properly
- Code splitting at component level

### 🚨 Bad Package (`@mycompany/bad-ui`)

**Package Configuration:**
- **No exports field**: Only has `main` pointing to single bundle
- **sideEffects**: Incorrectly marked as `false` despite having many side effects
- **Build system**: tsup with everything bundled together
- **Bundle output**: Single massive file (index.js: 143KB)

**Anti-patterns:**
- Barrel exports with side effects
- Everything loads when you import anything
- Heavy computations run on module load
- No code splitting possible

## Build Output Comparison

### Good Package Build
```
ESM dist\Button.mjs          1.05 KB
ESM dist\Card.mjs            422.00 B
ESM dist\Modal.mjs           837.00 B
ESM dist\DataTable.mjs       5.11 KB
ESM dist\Charts.mjs          1.32 KB
ESM dist\utils.mjs           835.00 B
ESM dist\heavy-utils.mjs     3.26 KB
```

### Bad Package Build
```
CJS dist\index.js     143.09 KB  <-- Everything in one file!
```

## Side Effects Demonstration

When you import from the bad package, you'll see console output like:
```
🚨 BAD UI Package loaded! This runs even if you only import one component!
🚨 Loading massive utility with side effects!
🚨 Computing expensive data...
🚨 Button component loaded with side effects!
🚨 Computing expensive operation on module load...
```

This happens even if you only want to use a single button component!

## Usage Examples

### Good Package Usage (Tree Shakable)
```typescript
// Only imports Button component - no side effects
import { Button } from '@mycompany/ui/Button'

// Each component can be imported separately
import { Card } from '@mycompany/ui/Card'
import { formatDate } from '@mycompany/ui/utils'
```

### Bad Package Usage (No Tree Shaking)
```typescript
// Imports EVERYTHING - 143KB + all side effects
import { Button } from '@mycompany/bad-ui'

// Even this simple import loads the entire package
import { BadUI } from '@mycompany/bad-ui'
```

## Bundle Analysis

Run the build and see the difference:
- **Good package**: Only imports what you use
- **Bad package**: Always imports the full 143KB bundle with expensive side effects

## Key Takeaways

1. **Use proper exports field** for granular imports
2. **Avoid side effects** in modules
3. **Build separate bundles** for each component
4. **Mark side effects correctly** in package.json
5. **Use proper module formats** (ESM + CJS)
6. **Enable tree shaking** in build tools 