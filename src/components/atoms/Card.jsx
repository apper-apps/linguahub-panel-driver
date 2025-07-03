import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'medium',
  className = '',
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 transition-all duration-200'
  
  const variants = {
    default: 'shadow-sm hover:shadow-md',
    elevated: 'shadow-md hover:shadow-lg',
    premium: 'shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50',
    glass: 'glass-effect shadow-lg hover:shadow-xl'
  }
  
  const paddings = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  }
  
  const hoverClasses = hover ? 'hover:scale-102 cursor-pointer' : ''
  
  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
      whileHover={hover ? { scale: 1.02 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card