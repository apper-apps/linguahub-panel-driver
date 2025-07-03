import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'

const AttendanceCalendar = ({ 
  attendanceData = [],
  currentMonth = new Date(),
  onMonthChange,
  className = '',
  ...props 
}) => {
  const [selectedDate, setSelectedDate] = useState(null)
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const getAttendanceStatus = (date) => {
    const record = attendanceData.find(record => 
      isSameDay(new Date(record.date), date)
    )
    return record?.status || null
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-success text-white'
      case 'Absent': return 'bg-error text-white'
      case 'Late': return 'bg-warning text-white'
      default: return 'bg-gray-100 text-gray-400'
    }
  }
  
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    if (onMonthChange) {
      onMonthChange(newMonth)
    }
  }
  
  return (
    <Card variant="elevated" className={`${className}`} {...props}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="small"
              icon="ChevronLeft"
              onClick={() => navigateMonth(-1)}
            />
            <Button
              variant="ghost"
              size="small"
              icon="ChevronRight"
              onClick={() => navigateMonth(1)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {days.map(day => {
            const status = getAttendanceStatus(day)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isTodayDate = isToday(day)
            
            return (
              <motion.button
                key={day.toISOString()}
                className={`
                  w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200
                  ${getStatusColor(status)}
                  ${isSelected ? 'ring-2 ring-primary' : ''}
                  ${isTodayDate ? 'ring-2 ring-blue-500' : ''}
                  ${status ? 'hover:opacity-80' : 'hover:bg-gray-200'}
                `}
                onClick={() => setSelectedDate(day)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {format(day, 'd')}
              </motion.button>
            )
          })}
        </div>
        
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
            <span className="text-gray-600">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-error mr-2"></div>
            <span className="text-gray-600">Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
            <span className="text-gray-600">Late</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AttendanceCalendar