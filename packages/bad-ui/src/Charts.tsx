import React from 'react';
import { AllAnimations, MassiveUtility } from './massive-utility';

console.log('🚨 Charts component loaded with all animations!');

// BAD: Process all animations immediately
const chartAnimations = AllAnimations.map(anim => ({
  ...anim,
  css: `@keyframes ${anim.name} { 
    0% { transform: scale(0); } 
    100% { transform: scale(1); } 
  }`,
}));

export interface ChartsProps {
  data: { label: string; value: number }[];
  type?: 'bar' | 'pie';
}

export const Charts: React.FC<ChartsProps> = ({ data, type = 'bar' }) => {
  // BAD: Use random animation for each chart
  const randomAnimation = chartAnimations[Math.floor(Math.random() * chartAnimations.length)];
  
  return (
    <div className="bad-ui-charts bad-ui-global" style={{
      padding: '16px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      animation: `${randomAnimation.name} ${randomAnimation.duration}ms ${randomAnimation.easing}`,
    }}>
      <h3>Chart ({type})</h3>
      {type === 'bar' ? (
        <div style={{ display: 'flex', alignItems: 'end', height: '200px', gap: '4px' }}>
          {data.map((item, i) => {
            const style = MassiveUtility.generateRandomStyle();
            return (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1,
              }}>
                <div style={{
                  height: `${(item.value / Math.max(...data.map(d => d.value))) * 160}px`,
                  width: '100%',
                  backgroundColor: style.backgroundColor,
                  marginBottom: '8px',
                  borderRadius: '4px 4px 0 0',
                }} />
                <span style={{ fontSize: '12px', textAlign: 'center' }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #ff0000, #00ff00, #0000ff)',
          margin: '0 auto'
        }} />
      )}
    </div>
  );
}; 