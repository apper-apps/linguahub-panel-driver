const getAttendanceData = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "student_id" } },
        { field: { Name: "class_id" } },
        { field: { Name: "date" } },
        { field: { Name: "status" } },
        { field: { Name: "notes" } }
      ]
    };
    
    const response = await apperClient.fetchRecords('attendance', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
}

const createAttendanceRecord = async (attendanceData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [attendanceData]
    };
    
    const response = await apperClient.createRecord('attendance', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success);
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} attendance records:${JSON.stringify(failedRecords)}`);
        throw new Error(failedRecords[0].message || 'Failed to create attendance record');
      }
      return response.results[0].data;
    }
  } catch (error) {
    console.error("Error creating attendance record:", error);
    throw error;
  }
}

export { getAttendanceData, createAttendanceRecord }