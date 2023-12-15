// classroomSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: '',
};

const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    // Tambahkan reducers lain jika diperlukan
  },
});

export const { setCode } = classroomSlice.actions;
export default classroomSlice.reducer;