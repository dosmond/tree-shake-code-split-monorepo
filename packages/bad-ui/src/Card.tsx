import React from 'react';

// BAD: Another side effect
console.log('🚨 Card component loaded!');

// BAD: Import unused heavy utilities
import { MassiveUtility } from './massive-utility';

// BAD: Execute expensive operation on module load
const cardStyleCache = new Map();
for (let i = 0; i < 1000; i++) {
  cardStyleCache.set(`style-${i}`, { 
    background: `hsl(${Math.random() * 360}, 50%, 50%)`,
    transform: `rotate(${Math.random() * 360}deg)`
  });
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, title }) => {
  // BAD: Use unnecessary utility function
  const randomStyle = MassiveUtility.generateRandomStyle();
  
  return (
    <div 
      className="bad-ui-card bad-ui-global"
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ...randomStyle
      }}
    >
      {title && <h3 style={{ margin: '0 0 12px 0' }}>{title}</h3>}
      {children}
    </div>
  );
}; 