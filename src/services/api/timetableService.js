import mockClasses from '@/services/mockData/classes.json'

const getTimetableData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return [...mockClasses]
}

export { getTimetableData }