import { defineConfig } from 'tsup'

// BAD: Bundle everything into a single entry point instead of splitting
export default defineConfig({
  entry: {
    // BAD: Only one entry point that includes everything
    index: 'src/index.ts',
  },
  // BAD: Only build CJS, no ESM support  
  format: ['cjs'],
  dts: true,
  // BAD: No splitting - everything gets bundled together
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  // BAD: Disable tree shaking
  treeshake: false,
  // BAD: Bundle dependencies instead of keeping them external
  noExternal: ['react', 'react-dom'],
}) 