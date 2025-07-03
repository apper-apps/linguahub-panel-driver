const getDashboardData = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Fetch all data concurrently
    const [classesResponse, announcementsResponse, attendanceResponse, filesResponse] = await Promise.all([
      apperClient.fetchRecords('class', {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "course_name" } },
          { field: { Name: "teacher" } },
          { field: { Name: "language" } },
          { field: { Name: "level" } },
          { field: { Name: "schedule_day" } },
          { field: { Name: "schedule_time" } },
          { field: { Name: "time" } },
          { field: { Name: "room" } }
        ]
      }),
      apperClient.fetchRecords('announcement', {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "content" } },
          { field: { Name: "date" } },
          { field: { Name: "priority" } },
          { field: { Name: "author" } }
        ],
        orderBy: [{ fieldName: "date", sorttype: "DESC" }]
      }),
      apperClient.fetchRecords('attendance', {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "status" } },
          { field: { Name: "date" } }
        ]
      }),
      apperClient.fetchRecords('file', {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "course_name" } },
          { field: { Name: "type" } }
        ]
      })
    ]);
    
    // Check for any failed responses
    if (!classesResponse.success) {
      console.error('Classes fetch failed:', classesResponse.message);
      throw new Error(classesResponse.message);
    }
    if (!announcementsResponse.success) {
      console.error('Announcements fetch failed:', announcementsResponse.message);
      throw new Error(announcementsResponse.message);
    }
    if (!attendanceResponse.success) {
      console.error('Attendance fetch failed:', attendanceResponse.message);
      throw new Error(attendanceResponse.message);
    }
    if (!filesResponse.success) {
      console.error('Files fetch failed:', filesResponse.message);
      throw new Error(filesResponse.message);
    }
    
    const classes = classesResponse.data || [];
    const announcements = announcementsResponse.data || [];
    const attendance = attendanceResponse.data || [];
    const files = filesResponse.data || [];
    
    // Calculate stats
    const totalClasses = classes.length;
    const totalFiles = files.length;
    const attendanceRate = attendance.length > 0 
      ? Math.round((attendance.filter(a => a.status === 'Present').length / attendance.length) * 100)
      : 0;
    const unreadAnnouncements = announcements.filter(a => a.priority === 'High').length;
    
    // Get today's classes (first 3 for demo)
    const todayClasses = classes.slice(0, 3);
    
    // Get recent announcements (first 3)
    const recentAnnouncements = announcements.slice(0, 3);
    
    // Get upcoming classes (next 3)
    const upcomingClasses = classes.slice(3, 6);
    
    return {
      stats: {
        totalClasses,
        attendanceRate,
        totalFiles,
        unreadAnnouncements
      },
      todayClasses,
      recentAnnouncements,
      upcomingClasses
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}

export { getDashboardData }