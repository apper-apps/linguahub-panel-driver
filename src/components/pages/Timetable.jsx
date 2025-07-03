import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import TimetableGrid from '@/components/organisms/TimetableGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getTimetableData } from '@/services/api/timetableService'

const Timetable = () => {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(new Date())
  
  const loadTimetableData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTimetableData()
      setClasses(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load timetable data')
      toast.error('Failed to load timetable data')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadTimetableData()
  }, [])
  
  if (loading) {
    return <Loading type="timetable" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadTimetableData} />
  }
  
  if (!classes || classes.length === 0) {
    return (
      <Empty
        icon="Calendar"
        title="No classes scheduled"
        message="Your timetable is empty. Classes will appear here once they're scheduled."
      />
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Timetable</h1>
          <p className="text-gray-600 mt-1">
            View your weekly class schedule and room assignments
          </p>
        </div>
      </div>
      
      <TimetableGrid
        classes={classes}
        currentWeek={currentWeek}
        onWeekChange={setCurrentWeek}
      />
    </motion.div>
  )
}

export default Timetable