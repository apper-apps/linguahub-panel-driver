import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import StatCard from '@/components/molecules/StatCard'
import ClassCard from '@/components/molecules/ClassCard'
import AnnouncementCard from '@/components/molecules/AnnouncementCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getDashboardData } from '@/services/api/dashboardService'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, isStudent } = useSelector((state) => state.user)
  
  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDashboardData()
      setDashboardData(data)
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data')
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadDashboardData()
  }, [])
  
  if (loading) {
    return <Loading type="dashboard" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />
  }
  
  if (!dashboardData) {
    return <Empty title="No dashboard data" message="Unable to load your dashboard at this time." />
  }
  
  const { stats, todayClasses, recentAnnouncements, upcomingClasses } = dashboardData
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Welcome Header */}
<div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName || (isStudent ? 'Student' : 'User')}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Today is {format(new Date(), 'EEEE, MMMM dd, yyyy')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-gray-700">
            {todayClasses?.length || 0} classes today
          </span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Classes"
          value={stats.totalClasses}
          icon="BookOpen"
          color="primary"
          trend="up"
          trendValue="+2 this week"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon="CheckCircle"
          color="success"
          trend="up"
          trendValue="+5% this month"
        />
        <StatCard
          title="Course Files"
          value={stats.totalFiles}
          icon="FileText"
          color="accent"
          trend="neutral"
          trendValue="12 new files"
        />
        <StatCard
          title="Announcements"
          value={stats.unreadAnnouncements}
          icon="Bell"
          color="secondary"
          trend="down"
          trendValue="3 unread"
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card variant="elevated">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
              <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
            </div>
            
            {todayClasses.length === 0 ? (
              <Empty
                icon="CalendarOff"
                title="No classes today"
                message="Enjoy your free day! Check back tomorrow for your schedule."
              />
            ) : (
              <div className="space-y-4">
                {todayClasses.map(classItem => (
                  <motion.div
                    key={classItem.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ClassCard classData={classItem} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>
        
        {/* Recent Announcements */}
        <Card variant="elevated">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Announcements</h2>
              <ApperIcon name="Bell" className="w-5 h-5 text-primary" />
            </div>
            
            {recentAnnouncements.length === 0 ? (
              <Empty
                icon="BellOff"
                title="No announcements"
                message="You're all caught up! No new announcements at this time."
              />
            ) : (
              <div className="space-y-4">
                {recentAnnouncements.map(announcement => (
                  <motion.div
                    key={announcement.Id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnnouncementCard announcement={announcement} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Upcoming Classes */}
      <Card variant="elevated">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
            <ApperIcon name="Clock" className="w-5 h-5 text-primary" />
          </div>
          
          {upcomingClasses.length === 0 ? (
            <Empty
              icon="Calendar"
              title="No upcoming classes"
              message="Your schedule is clear for the next few days."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingClasses.map(classItem => (
                <motion.div
                  key={classItem.Id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ClassCard classData={classItem} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default Dashboard