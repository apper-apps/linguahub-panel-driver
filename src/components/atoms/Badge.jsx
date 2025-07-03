import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'medium',
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary',
    secondary: 'bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary',
    accent: 'bg-gradient-to-r from-accent/20 to-accent/10 text-accent',
    success: 'bg-gradient-to-r from-success/20 to-success/10 text-success',
    warning: 'bg-gradient-to-r from-warning/20 to-warning/10 text-warning',
    error: 'bg-gradient-to-r from-error/20 to-error/10 text-error',
    info: 'bg-gradient-to-r from-info/20 to-info/10 text-info'
  }
  
  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-sm',
    large: 'px-3 py-1.5 text-base'
  }
  
  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && <ApperIcon name={icon} className="w-3 h-3 mr-1" />}
      {children}
    </span>
  )
}

export default Badge