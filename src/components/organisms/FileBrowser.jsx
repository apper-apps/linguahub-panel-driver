import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import SearchBar from '@/components/molecules/SearchBar'
import FileCard from '@/components/molecules/FileCard'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'

const FileBrowser = ({ files = [], onDownload }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  
  const courses = [...new Set(files.map(file => file.courseName))].map(course => ({
    value: course,
    label: course
  }))
  
  const fileTypes = [...new Set(files.map(file => file.type))].map(type => ({
    value: type,
    label: type.toUpperCase()
  }))
  
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || file.courseName === selectedCourse
    const matchesType = selectedType === 'all' || file.type === selectedType
    
    return matchesSearch && matchesCourse && matchesType
  })
  
  const handleDownload = (file) => {
    if (onDownload) {
      onDownload(file)
    }
  }
  
  return (
    <Card variant="elevated">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Course Files</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="small"
              icon="Grid3x3"
              onClick={() => setViewMode('grid')}
            />
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="small"
              icon="List"
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search files..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={[{ value: 'all', label: 'All Courses' }, ...courses]}
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="min-w-[150px]"
            />
            <Select
              options={[{ value: 'all', label: 'All Types' }, ...fileTypes]}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="min-w-[120px]"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="FileX" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className={`
            grid gap-4
            ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}
          `}>
            {filteredFiles.map(file => (
              <motion.div
                key={file.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FileCard
                  file={file}
                  onDownload={handleDownload}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default FileBrowser