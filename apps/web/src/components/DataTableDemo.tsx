'use client'

import { DataTable } from '@mycompany/ui/DataTable'

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' },
]

const columns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'email' as const, header: 'Email' },
  { key: 'role' as const, header: 'Role' },
  { 
    key: 'status' as const, 
    header: 'Status',
    render: (value: string | number) => (
      <span className={`px-2 py-1 rounded text-xs ${
        value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
]

export default function DataTableDemo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Interactive Data Table</h3>
      <DataTable 
        data={sampleData} 
        columns={columns}
        pageSize={3}
        sortable={true}
        filterable={true}
      />
    </div>
  )
}