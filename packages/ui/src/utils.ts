export const formatCurrency = (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  export const formatDate = (date: Date | string, format = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    if (format === 'short') {
      return dateObj.toLocaleDateString()
    } else if (format === 'long') {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    return dateObj.toISOString()
  }
  
  export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T => {
    let timeout: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(null, args), wait)
    }) as T
  }