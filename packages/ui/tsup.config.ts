import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    Button: 'src/Button.tsx',
    Card: 'src/Card.tsx',
    Modal: 'src/Modal.tsx',
    DataTable: 'src/DataTable.tsx',
    Charts: 'src/Charts.tsx',
    utils: 'src/utils.ts',
    'heavy-utils': 'src/heavy-utils.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
})