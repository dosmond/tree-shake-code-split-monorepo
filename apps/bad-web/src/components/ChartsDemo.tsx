// BAD: Import everything instead of just what's needed
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

// BAD: Generate chart data using expensive operations
console.log('🚨 ChartsDemo loading with all bad-ui resources!')
const expensiveChartData = AllAnimations.slice(0, 12).map((animation, i) => ({
  label: `${animation.name}`,
  value: Math.floor(animation.duration / 100),
  color: AllThemes[i % AllThemes.length]?.colors.primary || '#000000',
  factorial: AllFactorials[i % AllFactorials.length] || 1,
}))

export function ChartsDemo() {
  // BAD: More expensive operations in render
  const totalAnimations = AllAnimations.length
  const totalThemes = AllThemes.length
  
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-red-200">
      <h3 className="text-lg font-semibold text-red-800 mb-4">
        🚨 BAD Charts Demo
      </h3>
      <p className="text-red-600 text-sm mb-4">
        Using {totalAnimations} animations and {totalThemes} themes for simple chart!
      </p>
      
      <div className="space-y-4">
        <Charts 
          data={expensiveChartData}
          type="bar"
        />
        
        <Charts 
          data={expensiveChartData}
          type="pie"
        />
      </div>
      
      <div className="mt-4 text-xs text-red-500">
        <p>Wasted resources: {ExpensiveData.length} data items, {AllFactorials.length} factorials</p>
        <p>Chart data generated from {expensiveChartData.length} of {totalAnimations} animations</p>
      </div>
    </div>
  )
}

export default ChartsDemo 