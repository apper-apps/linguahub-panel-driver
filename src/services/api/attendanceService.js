import mockAttendance from '@/services/mockData/attendance.json'

const getAttendanceData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  return [...mockAttendance]
}

export { getAttendanceData }