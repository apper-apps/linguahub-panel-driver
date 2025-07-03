const getAnnouncements = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "content" } },
        { field: { Name: "date" } },
        { field: { Name: "priority" } },
        { field: { Name: "author" } },
        { field: { Name: "target_audience" } }
      ],
      orderBy: [
        {
          fieldName: "date",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('announcement', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
}

const getAnnouncementById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "content" } },
        { field: { Name: "date" } },
        { field: { Name: "priority" } },
        { field: { Name: "author" } },
        { field: { Name: "target_audience" } }
      ]
    };
    
    const response = await apperClient.getRecordById('announcement', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message || 'Announcement not found');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching announcement with ID ${id}:`, error);
    throw error;
  }
}

export { getAnnouncements, getAnnouncementById }