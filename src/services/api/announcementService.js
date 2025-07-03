import mockAnnouncements from '@/services/mockData/announcements.json'

const getAnnouncements = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return [...mockAnnouncements].sort((a, b) => new Date(b.date) - new Date(a.date))
}

const getAnnouncementById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const announcement = mockAnnouncements.find(a => a.Id === parseInt(id))
  if (!announcement) {
    throw new Error('Announcement not found')
  }
  return { ...announcement }
}

export { getAnnouncements, getAnnouncementById }