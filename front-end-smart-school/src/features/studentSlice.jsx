import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {}
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
   
  },
});

export const { setData } = studentSlice.actions;
export default studentSlice.reducer;