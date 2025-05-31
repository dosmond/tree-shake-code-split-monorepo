import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export const Card: React.FC<CardProps> = ({ children, className = '', padding = 'md' }) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
  
  return (
    <div className={`bg-white rounded-lg shadow border ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}