const getTimetableData = async () => {
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
        { field: { Name: "teacher" } },
        { field: { Name: "language" } },
        { field: { Name: "level" } },
        { field: { Name: "schedule_day" } },
        { field: { Name: "schedule_time" } },
        { field: { Name: "time" } },
        { field: { Name: "room" } },
        { field: { Name: "description" } }
      ]
    };
    
    const response = await apperClient.fetchRecords('class', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching timetable data:", error);
    throw error;
  }
}

export { getTimetableData }