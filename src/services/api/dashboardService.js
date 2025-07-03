import mockClasses from '@/services/mockData/classes.json'
import mockAnnouncements from '@/services/mockData/announcements.json'
import mockAttendance from '@/services/mockData/attendance.json'
import mockFiles from '@/services/mockData/files.json'

const getDashboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Calculate stats
  const totalClasses = mockClasses.length
  const totalFiles = mockFiles.length
  const attendanceRate = Math.round((mockAttendance.filter(a => a.status === 'Present').length / mockAttendance.length) * 100)
  const unreadAnnouncements = mockAnnouncements.filter(a => a.priority === 'High').length
  
  // Get today's classes (mock data)
  const todayClasses = mockClasses.slice(0, 3)
  
  // Get recent announcements
  const recentAnnouncements = mockAnnouncements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
  
  // Get upcoming classes
  const upcomingClasses = mockClasses.slice(3, 6)
  
  return {
    stats: {
      totalClasses,
      attendanceRate,
      totalFiles,
      unreadAnnouncements
    },
    todayClasses,
    recentAnnouncements,
    upcomingClasses
  }
}

export { getDashboardData }