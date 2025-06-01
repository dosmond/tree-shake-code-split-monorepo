import React from 'react';

// BAD: Side effect that runs when module is imported
console.log('🚨 Button component loaded with side effects!');

// BAD: Unnecessary heavy dependency
const heavyDependency = {
  massiveArray: new Array(10000).fill(0).map((_, i) => ({ 
    id: i, 
    data: `heavy-data-${i}`,
    computation: Math.random() * 1000 
  })),
  expensiveFunction: () => {
    // Simulate expensive operation
    for (let i = 0; i < 100000; i++) {
      Math.random();
    }
  }
};

// BAD: Run expensive operation immediately
heavyDependency.expensiveFunction();

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

// BAD: Component includes unnecessary complexity and dependencies
export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  // BAD: Use the heavy dependency even though not needed
  const randomData = heavyDependency.massiveArray[Math.floor(Math.random() * 100)];
  
  return (
    <button 
      onClick={() => {
        // BAD: Side effect in render
        console.log('Button clicked with random data:', randomData);
        onClick?.();
      }}
      className={`bad-ui-button bad-ui-button--${variant} bad-ui-global`}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
}; 