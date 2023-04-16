import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  profileCompleted:false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {      
      state.error = action.payload;
    },
    setProfileCompleted: (state, action) => {      
      state.profileCompleted = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, setProfileCompleted } = authSlice.actions;

export default authSlice.reducer;
