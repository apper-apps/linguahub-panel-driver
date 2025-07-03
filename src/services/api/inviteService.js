import { toast } from 'react-toastify'

// Delay helper for consistent API simulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ApperClient integration for invite operations
export const getInvites = async () => {
  try {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "email" } },
        { field: { Name: "status" } },
        { field: { Name: "sentDate" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ],
      pagingInfo: {
        limit: 100,
        offset: 0
      }
    }
    
    const response = await apperClient.fetchRecords('invite', params)
    
    if (!response.success) {
      console.error(response.message)
      toast.error(response.message)
      return []
    }
    
    return response.data || []
  } catch (error) {
    console.error("Error fetching invites:", error)
    toast.error("Failed to load invites")
    return []
  }
}

export const getInviteById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "email" } },
        { field: { Name: "status" } },
        { field: { Name: "sentDate" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } }
      ]
    }
    
    const response = await apperClient.getRecordById('invite', parseInt(id), params)
    
    if (!response.success) {
      console.error(response.message)
      return null
    }
    
    return response.data
  } catch (error) {
    console.error(`Error fetching invite with ID ${id}:`, error)
    return null
  }
}

export const createInvite = async (inviteData) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      records: [
        {
          Name: inviteData.name || inviteData.email,
          email: inviteData.email,
          status: "Pending",
          sentDate: new Date().toISOString()
        }
      ]
    }
    
    const response = await apperClient.createRecord('invite', params)
    
    if (!response.success) {
      console.error(response.message)
      toast.error(response.message)
      return null
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success)
      const failedRecords = response.results.filter(result => !result.success)
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} invites:${JSON.stringify(failedRecords)}`)
        
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`)
          })
          if (record.message) toast.error(record.message)
        })
      }
      
      if (successfulRecords.length > 0) {
        toast.success("Invite sent successfully!")
        return successfulRecords[0].data
      }
    }
    
    return null
  } catch (error) {
    console.error("Error creating invite:", error)
    toast.error("Failed to send invite")
    return null
  }
}

export const updateInvite = async (id, updateData) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      records: [
        {
          Id: parseInt(id),
          ...updateData
        }
      ]
    }
    
    const response = await apperClient.updateRecord('invite', params)
    
    if (!response.success) {
      console.error(response.message)
      toast.error(response.message)
      return null
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success)
      const failedUpdates = response.results.filter(result => !result.success)
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} invites:${JSON.stringify(failedUpdates)}`)
        
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`)
          })
          if (record.message) toast.error(record.message)
        })
      }
      
      if (successfulUpdates.length > 0) {
        return successfulUpdates[0].data
      }
    }
    
    return null
  } catch (error) {
    console.error("Error updating invite:", error)
    toast.error("Failed to update invite")
    return null
  }
}

export const deleteInvite = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      RecordIds: [parseInt(id)]
    }
    
    const response = await apperClient.deleteRecord('invite', params)
    
    if (!response.success) {
      console.error(response.message)
      toast.error(response.message)
      return false
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success)
      const failedDeletions = response.results.filter(result => !result.success)
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} invites:${JSON.stringify(failedDeletions)}`)
        
        failedDeletions.forEach(record => {
          if (record.message) toast.error(record.message)
        })
      }
      
      if (successfulDeletions.length > 0) {
        toast.success("Invite deleted successfully!")
        return true
      }
    }
    
    return false
  } catch (error) {
    console.error("Error deleting invite:", error)
    toast.error("Failed to delete invite")
    return false
  }
}

// Validate invite token for signup process
export const validateInviteToken = async (token) => {
  try {
    await delay(300) // Simulate API call delay
    
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "email" } },
        { field: { Name: "status" } },
        { field: { Name: "sentDate" } }
      ],
      where: [
        {
          FieldName: "email",
          Operator: "EqualTo",
          Values: [token]
        },
        {
          FieldName: "status",
          Operator: "EqualTo",
          Values: ["Pending"]
        }
      ]
    }
    
    const response = await apperClient.fetchRecords('invite', params)
    
    if (!response.success) {
      return false
    }
    
    return response.data && response.data.length > 0
  } catch (error) {
    console.error("Error validating invite token:", error)
    return false
  }
}

// Accept an invite (mark as accepted)
export const acceptInvite = async (email) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    // First find the invite by email
    const findParams = {
      fields: [
        { field: { Name: "Id" } }
      ],
      where: [
        {
          FieldName: "email",
          Operator: "EqualTo",
          Values: [email]
        },
        {
          FieldName: "status",
          Operator: "EqualTo",
          Values: ["Pending"]
        }
      ]
    }
    
    const findResponse = await apperClient.fetchRecords('invite', findParams)
    
    if (!findResponse.success || !findResponse.data || findResponse.data.length === 0) {
      return false
    }
    
    const inviteId = findResponse.data[0].Id
    
    // Update the invite status to Accepted
    const updateParams = {
      records: [
        {
          Id: inviteId,
          status: "Accepted"
        }
      ]
    }
    
    const updateResponse = await apperClient.updateRecord('invite', updateParams)
    
    return updateResponse.success
  } catch (error) {
    console.error("Error accepting invite:", error)
    return false
  }
}