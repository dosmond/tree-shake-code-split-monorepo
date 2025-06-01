import React from 'react';
import { ExpensiveData, AllThemes, AllAnimations, AllLayouts } from './massive-utility';

console.log('🚨 HeavyComponent loading all resources!');

// BAD: Use ALL the data immediately
const heavyData = {
  themes: AllThemes,
  animations: AllAnimations, 
  layouts: AllLayouts,
  expensive: ExpensiveData,
  processed: ExpensiveData.map((item, i) => ({
    ...item,
    theme: AllThemes[i % AllThemes.length],
    animation: AllAnimations[i % AllAnimations.length],
    layout: AllLayouts[i % AllLayouts.length],
  }))
};

// BAD: Heavy computation on module load
const computedStyles = heavyData.processed.map(item => ({
  backgroundColor: item.theme.colors.primary,
  color: item.theme.colors.secondary,
  animation: `${item.animation.name} ${item.animation.duration}ms`,
  gridTemplate: `repeat(${item.layout.grid.length}, 1fr)`,
}));

export const HeavyComponent: React.FC = () => {
  // BAD: Use random heavy data on every render
  const randomStyle = computedStyles[Math.floor(Math.random() * computedStyles.length)];
  
  return (
    <div 
      className="bad-ui-heavy bad-ui-global"
      style={{
        padding: '24px',
        border: '2px solid #ff4444',
        borderRadius: '12px',
        ...randomStyle,
      }}
    >
      <h2>Heavy Component 🚨</h2>
      <p>This component loaded {heavyData.expensive.length} expensive items!</p>
      <p>Available themes: {heavyData.themes.length}</p>
      <p>Available animations: {heavyData.animations.length}</p>
      <p>Available layouts: {heavyData.layouts.length}</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '8px',
        marginTop: '16px'
      }}>
        {heavyData.processed.slice(0, 12).map((item, i) => (
          <div 
            key={i}
            style={{
              padding: '8px',
              backgroundColor: item.theme.colors.tertiary,
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            Item {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}; 