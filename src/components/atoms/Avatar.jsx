import { motion } from 'framer-motion'

const Avatar = ({ 
  src, 
  alt, 
  size = 'medium', 
  fallback,
  className = '',
  ...props 
}) => {
  const sizes = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  }
  
  const baseClasses = 'inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-medium'
  
  if (src) {
    return (
      <motion.img
        src={src}
        alt={alt}
        className={`${baseClasses} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.05 }}
        {...props}
      />
    )
  }
  
  return (
    <motion.div
      className={`${baseClasses} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {fallback}
    </motion.div>
  )
}

export default Avatar