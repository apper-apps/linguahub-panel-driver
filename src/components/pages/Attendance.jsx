import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import AttendanceCalendar from '@/components/molecules/AttendanceCalendar'
import StatCard from '@/components/molecules/StatCard'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getAttendanceData } from '@/services/api/attendanceService'

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const loadAttendanceData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAttendanceData()
      setAttendanceData(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load attendance data')
      toast.error('Failed to load attendance data')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadAttendanceData()
  }, [])
  
  if (loading) {
    return <Loading type="grid" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadAttendanceData} />
  }
  
  const calculateStats = () => {
    if (!attendanceData || attendanceData.length === 0) return null
    
    const totalClasses = attendanceData.length
    const presentCount = attendanceData.filter(record => record.status === 'Present').length
    const absentCount = attendanceData.filter(record => record.status === 'Absent').length
    const lateCount = attendanceData.filter(record => record.status === 'Late').length
    const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0
    
    return {
      totalClasses,
      presentCount,
      absentCount,
      lateCount,
      attendanceRate
    }
  }
  
  const stats = calculateStats()
  
  if (!stats) {
    return (
      <Empty
        icon="CheckCircle"
        title="No attendance records"
        message="Your attendance data will appear here once you start attending classes."
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
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-600 mt-1">
            Monitor your class attendance and track your progress
          </p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon="CheckCircle"
          color="success"
          trend={stats.attendanceRate >= 80 ? 'up' : stats.attendanceRate >= 60 ? 'neutral' : 'down'}
          trendValue={stats.attendanceRate >= 80 ? 'Excellent' : stats.attendanceRate >= 60 ? 'Good' : 'Needs improvement'}
        />
        <StatCard
          title="Classes Attended"
          value={stats.presentCount}
          icon="Calendar"
          color="primary"
          trend="up"
          trendValue={`${stats.totalClasses} total`}
        />
        <StatCard
          title="Absences"
          value={stats.absentCount}
          icon="XCircle"
          color="error"
          trend={stats.absentCount > 0 ? 'down' : 'up'}
          trendValue={stats.absentCount === 0 ? 'Perfect!' : 'Keep improving'}
        />
        <StatCard
          title="Late Arrivals"
          value={stats.lateCount}
          icon="Clock"
          color="warning"
          trend={stats.lateCount > 0 ? 'down' : 'up'}
          trendValue={stats.lateCount === 0 ? 'Always on time!' : 'Try to be punctual'}
        />
      </div>
      
      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceCalendar
          attendanceData={attendanceData}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
        
        <Card variant="elevated">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-success/20 to-success/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-success font-medium">Present</span>
                </div>
                <span className="text-success font-bold">{stats.presentCount}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-error/20 to-error/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-error font-medium">Absent</span>
                </div>
                <span className="text-error font-bold">{stats.absentCount}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-warning/20 to-warning/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-warning font-medium">Late</span>
                </div>
                <span className="text-warning font-bold">{stats.lateCount}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Attendance Goal</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Target: 90%</span>
                <span className={`text-sm font-bold ${stats.attendanceRate >= 90 ? 'text-success' : 'text-warning'}`}>
                  {stats.attendanceRate >= 90 ? 'Goal Achieved! 🎉' : `${90 - stats.attendanceRate}% to go`}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Attendance