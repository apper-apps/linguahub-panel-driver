import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import SearchBar from '@/components/molecules/SearchBar'
import AnnouncementCard from '@/components/molecules/AnnouncementCard'
import Select from '@/components/atoms/Select'
import Badge from '@/components/atoms/Badge'

const AnnouncementFeed = ({ announcements = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedAuthor, setSelectedAuthor] = useState('all')
  
  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ]
  
  const authors = [...new Set(announcements.map(ann => ann.author))].map(author => ({
    value: author,
    label: author
  }))
  
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority
    const matchesAuthor = selectedAuthor === 'all' || announcement.author === selectedAuthor
    
    return matchesSearch && matchesPriority && matchesAuthor
  })
  
  const priorityCount = announcements.reduce((acc, ann) => {
    acc[ann.priority] = (acc[ann.priority] || 0) + 1
    return acc
  }, {})
  
  return (
    <Card variant="elevated">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
            <div className="flex items-center space-x-2 mt-2">
              {Object.entries(priorityCount).map(([priority, count]) => (
                <Badge
                  key={priority}
                  variant={priority === 'High' ? 'error' : priority === 'Medium' ? 'warning' : 'info'}
                  size="small"
                >
                  {priority}: {count}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search announcements..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={priorities}
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="min-w-[150px]"
            />
            <Select
              options={[{ value: 'all', label: 'All Authors' }, ...authors]}
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="min-w-[150px]"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="BellOff" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map(announcement => (
              <motion.div
                key={announcement.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnnouncementCard announcement={announcement} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default AnnouncementFeed