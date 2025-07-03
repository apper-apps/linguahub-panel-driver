import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import Timetable from '@/components/pages/Timetable'
import Attendance from '@/components/pages/Attendance'
import Files from '@/components/pages/Files'
import Announcements from '@/components/pages/Announcements'
import MyClasses from '@/components/pages/MyClasses'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/files" element={<Files />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/my-classes" element={<MyClasses />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App