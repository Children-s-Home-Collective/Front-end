import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedHome: null,
};

const childHomeSlice = createSlice({
  name: 'childHome',
  initialState,
  reducers: {
    setSelectedHome: (state, action) => {
      state.selectedHome = action.payload;
    },
  },
});

export const { setSelectedHome } = childHomeSlice.actions;
export default childHomeSlice.reducer;
