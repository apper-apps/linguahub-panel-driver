import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import AnnouncementFeed from '@/components/organisms/AnnouncementFeed'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getAnnouncements } from '@/services/api/announcementService'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const loadAnnouncements = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAnnouncements()
      setAnnouncements(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load announcements')
      toast.error('Failed to load announcements')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadAnnouncements()
  }, [])
  
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadAnnouncements} />
  }
  
  if (!announcements || announcements.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">
              Stay updated with the latest news and updates from your school
            </p>
          </div>
        </div>
        
        <Empty
          icon="Bell"
          title="No announcements"
          message="There are no announcements at this time. Check back later for updates."
        />
      </motion.div>
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
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with the latest news and updates from your school
          </p>
        </div>
      </div>
      
      <AnnouncementFeed announcements={announcements} />
    </motion.div>
  )
}

export default Announcements