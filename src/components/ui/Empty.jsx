import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  icon = 'Inbox',
  title = 'No data found',
  message = 'There\'s nothing here yet. Check back later or try a different search.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <Card variant="elevated" className={`text-center py-12 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
        
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            className="mx-auto"
          >
            {actionLabel}
          </Button>
        )}
      </motion.div>
    </Card>
  )
}

export default Empty