import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import ClassCard from '@/components/molecules/ClassCard'
import Button from '@/components/atoms/Button'

const TimetableGrid = ({ classes = [], currentWeek = new Date() }) => {
  const [selectedClass, setSelectedClass] = useState(null)
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ]
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  const getClassesForSlot = (day, time) => {
    return classes.filter(cls => 
      cls.schedule.day === day && cls.schedule.time === time
    )
  }
  
  const navigateWeek = (direction) => {
    // Week navigation logic would go here
    console.log('Navigate week:', direction)
  }
  
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Weekly Schedule</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="small"
              icon="ChevronLeft"
              onClick={() => navigateWeek(-1)}
            />
            <span className="text-sm font-medium text-gray-600 px-3">
              Week of March 11, 2024
            </span>
            <Button
              variant="ghost"
              size="small"
              icon="ChevronRight"
              onClick={() => navigateWeek(1)}
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* Time column header */}
            <div className="bg-white p-4 font-medium text-gray-600 text-sm">
              Time
            </div>
            
            {/* Day headers */}
            {weekDays.map(day => (
              <div key={day} className="bg-white p-4 font-medium text-gray-900 text-center">
                {day}
              </div>
            ))}
            
            {/* Time slots */}
            {timeSlots.map(time => (
              <div key={time} className="contents">
                <div className="bg-white p-4 font-medium text-gray-600 text-sm border-r border-gray-200">
                  {time}
                </div>
                {weekDays.map(day => {
                  const dayClasses = getClassesForSlot(day, time)
                  return (
                    <div key={`${day}-${time}`} className="bg-white p-2 min-h-[4rem] border-r border-gray-200">
                      {dayClasses.map(cls => (
                        <motion.div
                          key={cls.Id}
                          className="h-full cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedClass(cls)}
                        >
                          <div className={`
                            h-full rounded-lg p-2 text-xs
                            ${cls.language === 'English' ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30' :
                              cls.language === 'Spanish' ? 'bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary border border-secondary/30' :
                              cls.language === 'French' ? 'bg-gradient-to-r from-accent/20 to-accent/10 text-accent border border-accent/30' :
                              'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-300'
                            }
                          `}>
                            <div className="font-medium truncate">{cls.courseName}</div>
                            <div className="text-xs opacity-75">{cls.room}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedClass && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedClass(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Class Details</h3>
              <button
                onClick={() => setSelectedClass(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </button>
            </div>
            <ClassCard classData={selectedClass} />
          </motion.div>
        </motion.div>
      )}
    </Card>
  )
}

export default TimetableGrid