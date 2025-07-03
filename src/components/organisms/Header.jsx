import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ApperIcon from '@/components/ApperIcon'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import { AuthContext } from '@/App'

const Header = ({ onMenuClick }) => {
  const [showProfile, setShowProfile] = useState(false)
  const { user, isStudent } = useSelector((state) => state.user)
  const { logout } = useContext(AuthContext)
  
  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'User'
  const userEmail = user?.emailAddress || 'user@example.com'
  
  const handleLogout = async () => {
    try {
      await logout()
      setShowProfile(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="small"
            icon="Menu"
            onClick={onMenuClick}
            className="lg:hidden"
          />
          <div className="hidden sm:block">
            <SearchBar placeholder="Search classes, files, announcements..." className="w-80" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="small"
            icon="Bell"
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
          </Button>
          
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
            >
              <Avatar
                fallback={userName.split(' ').map(n => n[0]).join('')}
                size="medium"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-500" />
            </button>
            
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              >
                <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
                  <ApperIcon name="User" className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
                  <ApperIcon name="Settings" className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                >
                  <ApperIcon name="LogOut" className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header