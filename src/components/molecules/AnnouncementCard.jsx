import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const AnnouncementCard = ({ 
  announcement,
  className = '',
  ...props 
}) => {
  const { title, content, date, priority, author } = announcement
  
  const priorityConfig = {
    'High': { variant: 'error', icon: 'AlertCircle' },
    'Medium': { variant: 'warning', icon: 'AlertTriangle' },
    'Low': { variant: 'info', icon: 'Info' }
  }
  
  const config = priorityConfig[priority] || priorityConfig['Low']
  
  return (
    <Card variant="elevated" hover className={`${className}`} {...props}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{content}</p>
          </div>
          <Badge variant={config.variant} icon={config.icon} size="small">
            {priority}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <ApperIcon name="User" className="w-4 h-4 mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
            <span>{format(new Date(date), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AnnouncementCard