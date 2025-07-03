import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useSelector((state) => state.user)
  
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: 'Home' },
    { path: '/timetable', name: 'Timetable', icon: 'Calendar' },
    { path: '/attendance', name: 'Attendance', icon: 'CheckCircle' },
    { path: '/files', name: 'Files', icon: 'FolderOpen' },
    { path: '/announcements', name: 'Announcements', icon: 'Bell' },
    { path: '/my-classes', name: 'My Classes', icon: 'BookOpen' }
  ]
  
  // Add admin dashboard for admin users
  if (isAdmin) {
    menuItems.push({ path: '/admin', name: 'Admin Dashboard', icon: 'Settings' })
  }
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">LinguaHub</h1>
          </div>
          
<nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-r-2 border-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`
                }
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative w-64 bg-white h-full shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold gradient-text">LinguaHub</h1>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-6 h-6" />
                </button>
              </div>
              
<nav className="space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-r-2 border-primary'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`
                    }
                  >
                    <ApperIcon name={item.icon} className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Sidebar