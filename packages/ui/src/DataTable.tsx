import React, { useState, useMemo } from 'react'

export interface DataTableProps<T = any> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  sortable?: boolean
  filterable?: boolean
}

export interface Column<T> {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean
}

// Heavy component with lots of features - good candidate for code splitting
export const DataTable = <T extends Record<string, any>>({ 
  data, 
  columns, 
  pageSize = 10, 
  sortable = true, 
  filterable = true 
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState('')

  // Heavy computation - reason this component might be code split
  const processedData = useMemo(() => {
    let result = [...data]

    // Filtering
    if (filterable && filter) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(filter.toLowerCase())
        )
      )
    }

    // Sorting
    if (sortable && sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, filter, sortColumn, sortDirection, filterable, sortable])

  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize
    return processedData.slice(start, start + pageSize)
  }, [processedData, currentPage, pageSize])

  const totalPages = Math.ceil(processedData.length / pageSize)

  const handleSort = (column: keyof T) => {
    if (!sortable) return
    
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="w-full">
      {filterable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter data..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    sortable && column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {sortable && sortColumn === column.key && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, processedData.length)} of {processedData.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Heavy utilities that should only be bundled if explicitly imported
export const exportToCSV = <T,>(data: T[], filename: string) => {
  // Simulate heavy CSV export logic
  console.log(`Exporting ${data.length} rows to ${filename}`)
  // ... heavy implementation
}

export const advancedTableAnalytics = <T,>(data: T[]) => {
  // Heavy analytics calculations
  return {
    averages: {},
    distributions: {},
    correlations: {}
  }
}