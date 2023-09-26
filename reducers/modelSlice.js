import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    isPremiumModelOpen: false, 
};

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: { 
    setIsPremiumModelOpen: (state, action) => {
      state.isPremiumModelOpen = action.payload;
    },  
  },
});

export const { setIsPremiumModelOpen } = modelSlice.actions;

export default modelSlice.reducer;
