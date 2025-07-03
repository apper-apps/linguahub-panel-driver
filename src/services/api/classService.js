import mockClasses from '@/services/mockData/classes.json'

const getStudentClasses = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  return [...mockClasses]
}

const getClassById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const classItem = mockClasses.find(c => c.Id === parseInt(id))
  if (!classItem) {
    throw new Error('Class not found')
  }
  return { ...classItem }
}

export { getStudentClasses, getClassById }