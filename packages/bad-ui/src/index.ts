// BAD: Barrel exports with side effects that prevent tree shaking

// Side effect: immediately executed code
console.log('🚨 BAD UI Package loaded! This runs even if you only import one component!');

// Side effect: global styles injection
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .bad-ui-global {
      font-family: 'Comic Sans MS', cursive;
      background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
    }
  `;
  document.head.appendChild(style);
}

// BAD: Import everything even if not needed
import { Button } from './Button';
import { Card } from './Card';
import { Modal } from './Modal';
import { DataTable } from './DataTable';
import { Charts } from './Charts';
import { HeavyComponent } from './HeavyComponent';
import { UtilityFunctions } from './utils';
import { MassiveUtility } from './massive-utility';

// BAD: Execute heavy computation immediately
const expensiveCalculation = () => {
  console.log('🚨 Computing expensive operation on module load...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random() * Math.sin(i) * Math.cos(i);
  }
  return result;
};

// This runs immediately when the module is imported
const wastedComputation = expensiveCalculation();

// BAD: Export everything in one object (prevents tree shaking)
export const BadUI = {
  Button,
  Card,
  Modal,
  DataTable,
  Charts,
  HeavyComponent,
  UtilityFunctions,
  MassiveUtility,
  wastedComputation,
};

// BAD: Also export as default (confusing and prevents optimization)
export default BadUI;

// BAD: Re-export everything individually too (creates multiple paths to same code)
export { Button, Card, Modal, DataTable, Charts, HeavyComponent };
export * from './utils';
export * from './massive-utility'; 