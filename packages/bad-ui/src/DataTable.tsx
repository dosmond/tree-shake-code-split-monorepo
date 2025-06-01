import React from 'react';
import { AllThemes, ExpensiveData } from './massive-utility';

console.log('🚨 DataTable loaded with expensive data!');

// BAD: Process all expensive data immediately
const processedData = ExpensiveData.map(item => ({
  ...item,
  processed: true,
  theme: AllThemes[item.id % AllThemes.length],
}));

export interface DataTableProps {
  data: any[];
  columns: string[];
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <div className="bad-ui-datatable bad-ui-global">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{ 
                border: '1px solid #ddd', 
                padding: '12px',
                backgroundColor: processedData[i % processedData.length]?.theme?.colors?.primary || '#f5f5f5'
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j} style={{ 
                  border: '1px solid #ddd', 
                  padding: '12px',
                  backgroundColor: processedData[(i + j) % processedData.length]?.theme?.colors?.secondary || 'white'
                }}>
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 