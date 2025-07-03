import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  trendValue,
  color = 'primary',
  className = '',
  ...props 
}) => {
  const colors = {
    primary: 'from-primary/20 to-primary/10 text-primary',
    secondary: 'from-secondary/20 to-secondary/10 text-secondary',
    accent: 'from-accent/20 to-accent/10 text-accent',
    success: 'from-success/20 to-success/10 text-success',
    warning: 'from-warning/20 to-warning/10 text-warning',
    error: 'from-error/20 to-error/10 text-error'
  }
  
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-gray-500'
  }
  
  return (
    <Card variant="elevated" hover className={`${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center text-sm ${trendColors[trend]}`}>
              <ApperIcon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                className="w-4 h-4 mr-1" 
              />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
            <ApperIcon name={icon} className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatCard