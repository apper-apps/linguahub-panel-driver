import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import ClassCard from '@/components/molecules/ClassCard'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getStudentClasses } from '@/services/api/classService'

const MyClasses = () => {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const loadClasses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getStudentClasses()
      setClasses(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load classes')
      toast.error('Failed to load classes')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadClasses()
  }, [])
  
  if (loading) {
    return <Loading type="grid" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadClasses} />
  }
  
  if (!classes || classes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-600 mt-1">
              View all your enrolled courses and class details
            </p>
          </div>
        </div>
        
        <Empty
          icon="BookOpen"
          title="No classes enrolled"
          message="You haven't enrolled in any classes yet. Contact your administrator to get started."
        />
      </motion.div>
    )
  }
  
  const groupedClasses = classes.reduce((acc, cls) => {
    const language = cls.language || 'Other'
    if (!acc[language]) {
      acc[language] = []
    }
    acc[language].push(cls)
    return acc
  }, {})
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600 mt-1">
            View all your enrolled courses and class details
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="BookOpen" className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-gray-700">
            {classes.length} enrolled classes
          </span>
        </div>
      </div>
      
      <div className="space-y-8">
        {Object.entries(groupedClasses).map(([language, languageClasses]) => (
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="elevated">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-semibold text-gray-900">{language}</h2>
                    <Badge
                      variant={
                        language === 'English' ? 'primary' :
                        language === 'Spanish' ? 'secondary' :
                        language === 'French' ? 'accent' :
                        'info'
                      }
                      size="small"
                    >
                      {languageClasses.length} classes
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {languageClasses.map(classItem => (
                    <motion.div
                      key={classItem.Id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ClassCard
                        classData={classItem}
                        showTime={true}
                        showRoom={true}
                        className="h-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Summary Card */}
      <Card variant="premium">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Object.keys(groupedClasses).length}
              </div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                {classes.length}
              </div>
              <div className="text-sm text-gray-600">Total Classes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {classes.reduce((acc, cls) => acc + (cls.level ? 1 : 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Different Levels</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default MyClasses