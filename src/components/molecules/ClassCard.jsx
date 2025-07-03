import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const ClassCard = ({ 
  classData,
  variant = 'default',
  showTime = true,
  showRoom = true,
  className = '',
  ...props 
}) => {
  const { courseName, teacher, time, room, level, language } = classData
  
  const levelColors = {
    'Beginner': 'success',
    'Intermediate': 'warning',
    'Advanced': 'error',
    'A1': 'success',
    'A2': 'success',
    'B1': 'warning',
    'B2': 'warning',
    'C1': 'error',
    'C2': 'error'
  }
  
  const languageColors = {
    'English': 'primary',
    'Spanish': 'secondary',
    'French': 'accent',
    'German': 'info',
    'Italian': 'success',
    'Portuguese': 'warning'
  }
  
  return (
    <Card variant="elevated" hover className={`${className}`} {...props}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{courseName}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              <ApperIcon name="User" className="w-4 h-4 mr-1" />
              {teacher}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={languageColors[language] || 'default'} size="small">
              {language}
            </Badge>
            <Badge variant={levelColors[level] || 'default'} size="small">
              {level}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          {showTime && (
            <div className="flex items-center">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              <span>{time}</span>
            </div>
          )}
          {showRoom && (
            <div className="flex items-center">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
              <span>{room}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default ClassCard