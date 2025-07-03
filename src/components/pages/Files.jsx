import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import FileBrowser from '@/components/organisms/FileBrowser'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getFiles } from '@/services/api/fileService'

const Files = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const loadFiles = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getFiles()
      setFiles(data)
    } catch (err) {
      setError(err.message || 'Failed to load files')
      toast.error('Failed to load files')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadFiles()
  }, [])
  
  const handleDownload = (file) => {
    // Simulate file download
    toast.success(`Downloading ${file.name}...`)
    setTimeout(() => {
      toast.success(`${file.name} downloaded successfully!`)
    }, 2000)
  }
  
  if (loading) {
    return <Loading type="grid" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadFiles} />
  }
  
  if (!files || files.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Files</h1>
            <p className="text-gray-600 mt-1">
              Access and download files shared by your teachers
            </p>
          </div>
        </div>
        
        <Empty
          icon="FolderOpen"
          title="No files available"
          message="Your teachers haven't shared any files yet. Check back later for course materials."
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
          <h1 className="text-2xl font-bold text-gray-900">Course Files</h1>
          <p className="text-gray-600 mt-1">
            Access and download files shared by your teachers
          </p>
        </div>
      </div>
      
      <FileBrowser
        files={files}
        onDownload={handleDownload}
      />
    </motion.div>
  )
}

export default Files