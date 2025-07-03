const getFiles = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "course_name" } },
        { field: { Name: "type" } },
        { field: { Name: "size" } },
        { field: { Name: "upload_date" } },
        { field: { Name: "teacher" } },
        { field: { Name: "description" } }
      ]
    };
    
    const response = await apperClient.fetchRecords('file', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
}

const getFileById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "course_name" } },
        { field: { Name: "type" } },
        { field: { Name: "size" } },
        { field: { Name: "upload_date" } },
        { field: { Name: "teacher" } },
        { field: { Name: "description" } }
      ]
    };
    
    const response = await apperClient.getRecordById('file', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message || 'File not found');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching file with ID ${id}:`, error);
    throw error;
  }
}

const downloadFile = async (fileId) => {
  try {
    // First get the file details
    const file = await getFileById(fileId);
    
    // Simulate file download
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: `Downloaded ${file.Name}` };
  } catch (error) {
    console.error(`Error downloading file with ID ${fileId}:`, error);
    throw error;
  }
}

export { getFiles, getFileById, downloadFile }