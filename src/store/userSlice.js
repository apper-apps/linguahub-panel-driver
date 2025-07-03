import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isStudent: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
setUser: (state, action) => {
      // CRITICAL: Always use deep cloning to avoid reference issues
      // This prevents potential issues with object mutations
      state.user = JSON.parse(JSON.stringify(action.payload));
      state.isAuthenticated = !!action.payload;
// Set admin status based on multiple criteria for flexibility
      state.isAdmin = action.payload ? (
        action.payload.role === 'admin' || 
        action.payload.emailAddress?.includes('@admin.') || 
        action.payload.accounts?.[0]?.role === 'admin'
      ) : false;
      
      // Set student status based on userType field from app_User table
      state.isStudent = action.payload ? (
        action.payload.userType === 'Student'
      ) : false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isStudent = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;