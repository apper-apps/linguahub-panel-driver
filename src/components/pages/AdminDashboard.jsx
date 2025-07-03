import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getInvites, createInvite, deleteInvite } from '@/services/api/inviteService'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
  const [invites, setInvites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const { user } = useSelector((state) => state.user)

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.emailAddress?.includes('@admin.') || user?.accounts?.[0]?.role === 'admin'

  const loadInvites = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getInvites()
      setInvites(data)
    } catch (err) {
      setError(err.message || 'Failed to load invites')
      toast.error('Failed to load invites')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      loadInvites()
    }
  }, [isAdmin])

  const handleSendInvite = async (e) => {
    e.preventDefault()
    
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }

    try {
      setSending(true)
      const inviteData = {
        name: formData.name.trim() || formData.email.trim(),
        email: formData.email.trim()
      }
      
      const newInvite = await createInvite(inviteData)
      
      if (newInvite) {
        setFormData({ name: '', email: '' })
        await loadInvites() // Refresh the list
      }
    } catch (err) {
      toast.error('Failed to send invite')
    } finally {
      setSending(false)
    }
  }

  const handleDeleteInvite = async (inviteId) => {
    if (!confirm('Are you sure you want to delete this invite?')) {
      return
    }

    try {
      const success = await deleteInvite(inviteId)
      if (success) {
        await loadInvites() // Refresh the list
      }
    } catch (err) {
      toast.error('Failed to delete invite')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Accepted':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card variant="elevated" className="p-8 text-center max-w-md">
          <ApperIcon name="Shield" className="w-16 h-16 text-error mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </Card>
      </div>
    )
  }

  if (loading) {
    return <Loading type="dashboard" />
  }

  if (error) {
    return <Error message={error} onRetry={loadInvites} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage user invitations and access</p>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Shield" className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-gray-700">Admin Panel</span>
        </div>
      </div>

      {/* Send Invite Form */}
      <Card variant="elevated">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <ApperIcon name="UserPlus" className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Send Invitation</h2>
          </div>
          
          <form onSubmit={handleSendInvite} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name (Optional)"
                type="text"
                placeholder="Enter user's name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter user's email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                icon="Send"
                loading={sending}
                disabled={!formData.email.trim()}
              >
                Send Invitation
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {/* Invites List */}
      <Card variant="elevated">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ApperIcon name="Mail" className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Sent Invitations</h2>
            </div>
            <span className="text-sm text-gray-500">{invites.length} total</span>
          </div>

          {invites.length === 0 ? (
            <Empty
              icon="Mail"
              title="No invitations sent"
              message="Start by sending your first invitation above."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sent Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map((invite) => (
                    <motion.tr
                      key={invite.Id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {invite.Name || 'N/A'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-600">{invite.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invite.status)}`}>
                          {invite.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-600">
                          {invite.sentDate ? format(new Date(invite.sentDate), 'MMM dd, yyyy') : 'N/A'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="small"
                            icon="Copy"
                            onClick={() => {
                              const inviteUrl = `${window.location.origin}/signup?invite=${encodeURIComponent(invite.email)}`
                              navigator.clipboard.writeText(inviteUrl)
                              toast.success('Invite link copied to clipboard!')
                            }}
                          >
                            Copy Link
                          </Button>
                          <Button
                            variant="ghost"
                            size="small"
                            icon="Trash2"
                            onClick={() => handleDeleteInvite(invite.Id)}
                            className="text-error hover:text-error"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>

      {/* Instructions */}
      <Card variant="outline">
        <div className="p-6">
          <div className="flex items-center mb-3">
            <ApperIcon name="Info" className="w-5 h-5 text-info mr-2" />
            <h3 className="font-medium text-gray-900">How Invitations Work</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Send invitations to users by entering their email address above</p>
            <p>• Users can only sign up with a valid invitation link</p>
            <p>• Copy invitation links and share them with users via email or other channels</p>
            <p>• Track invitation status to see who has accepted or is still pending</p>
            <p>• Delete unused invitations if they're no longer needed</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default AdminDashboard