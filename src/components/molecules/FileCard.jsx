import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const FileCard = ({ 
  file,
  onDownload,
  className = '',
  ...props 
}) => {
  const { name, type, size, uploadDate, courseName } = file
  
  const getFileIcon = (type) => {
    const icons = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'xls': 'Sheet',
      'xlsx': 'Sheet',
      'ppt': 'Presentation',
      'pptx': 'Presentation',
      'zip': 'Archive',
      'rar': 'Archive',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image'
    }
    return icons[type.toLowerCase()] || 'File'
  }
  
  const getFileColor = (type) => {
    const colors = {
      'pdf': 'error',
      'doc': 'primary',
      'docx': 'primary',
      'xls': 'success',
      'xlsx': 'success',
      'ppt': 'warning',
      'pptx': 'warning',
      'zip': 'secondary',
      'rar': 'secondary',
      'jpg': 'info',
      'jpeg': 'info',
      'png': 'info',
      'gif': 'info'
    }
    return colors[type.toLowerCase()] || 'default'
  }
  
  return (
    <Card variant="elevated" hover className={`${className}`} {...props}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
              getFileColor(type) === 'error' ? 'from-error/20 to-error/10 text-error' :
              getFileColor(type) === 'primary' ? 'from-primary/20 to-primary/10 text-primary' :
              getFileColor(type) === 'success' ? 'from-success/20 to-success/10 text-success' :
              getFileColor(type) === 'warning' ? 'from-warning/20 to-warning/10 text-warning' :
              getFileColor(type) === 'secondary' ? 'from-secondary/20 to-secondary/10 text-secondary' :
              getFileColor(type) === 'info' ? 'from-info/20 to-info/10 text-info' :
              'from-gray-100 to-gray-50 text-gray-600'
            } flex items-center justify-center`}>
              <ApperIcon name={getFileIcon(type)} className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{name}</h3>
              <p className="text-sm text-gray-600">{courseName}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="small"
            icon="Download"
            onClick={() => onDownload && onDownload(file)}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <Badge variant={getFileColor(type)} size="small">
              {type.toUpperCase()}
            </Badge>
            <span>{size}</span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
            <span>{format(new Date(uploadDate), 'MMM dd')}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default FileCard