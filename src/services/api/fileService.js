import mockFiles from '@/services/mockData/files.json'

const getFiles = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 350))
  
  return [...mockFiles]
}

const getFileById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const file = mockFiles.find(f => f.Id === parseInt(id))
  if (!file) {
    throw new Error('File not found')
  }
  return { ...file }
}

const downloadFile = async (fileId) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const file = mockFiles.find(f => f.Id === parseInt(fileId))
  if (!file) {
    throw new Error('File not found')
  }
  
  // Simulate file download
  return { success: true, message: `Downloaded ${file.name}` }
}

export { getFiles, getFileById, downloadFile }