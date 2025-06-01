import React from 'react';
import { MassiveUtility } from './massive-utility';

// BAD: Side effects on import
console.log('🚨 Modal component loaded!');

// BAD: Heavy operation on module load
const modalCache = new Array(1000).fill(0).map((_, i) => ({
  id: i,
  content: `Modal content ${i}`,
  styles: MassiveUtility.generateRandomStyle(),
}));

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // BAD: Use unnecessary cached data
  const randomModalData = modalCache[Math.floor(Math.random() * modalCache.length)];
  
  if (!isOpen) return null;

  return (
    <div 
      className="bad-ui-modal-overlay bad-ui-global"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        className="bad-ui-modal-content"
        style={{
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
          ...randomModalData.styles,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          {title && <h2 style={{ margin: 0 }}>{title}</h2>}
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '24px', 
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}; 