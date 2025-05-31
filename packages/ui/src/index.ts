// Main exports - barrel file with individual exports for tree shaking
export { Button } from './Button'
export { Card } from './Card'
export { Modal } from './Modal'
export { DataTable } from './DataTable'
export { Charts } from './Charts'

// Type-only exports
export type { ButtonProps } from './Button'
export type { CardProps } from './Card'
export type { ModalProps } from './Modal'
export type { DataTableProps } from './DataTable'
export type { ChartsProps } from './Charts'

// Utility exports that should be tree shakable
export { formatCurrency, formatDate } from './utils'
export { theme, colors } from './theme'

// Heavy utilities that should NOT be imported unless explicitly used
export { 
  heavyUtility, 
  expensiveCalculation, 
  LARGE_LOOKUP_TABLE,
  complexUtilities,
  AdvancedAnalyticsEngine 
} from './heavy-utils'