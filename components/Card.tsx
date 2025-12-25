import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export default function Card({ children, className = '', glow = false }: CardProps) {
  return (
    <div
      className={`
        bg-card border border-border rounded-2xl p-6
        transition-all duration-300
        ${glow ? 'shadow-gold-glow hover:shadow-gold-glow' : 'hover:border-accent-gold/30'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

