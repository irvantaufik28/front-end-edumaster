/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../config';
import axios from 'axios';

const initialState = {
  data: {}
};


export const getById = createAsyncThunk('student/detail', async (id) => {
  const apiUrl = config.apiUrl;
  const response = await axios.get(apiUrl + `/student/${id}`);
  return response.data;
});

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setDataStudent: (state, action) => {
      state.data = action.payload;
    },
   
  },
  extraReducers: (builder) => {
    builder 
    .addCase(getById.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(getById.pending, (state, action) => {
      state.loading = false;
      state.data = null
    });
  }
});

export const { setDataStudent } = studentSlice.actions;
export const studentSelector = {
  getById: (state) => state.student.data
}
export default studentSlice.reducer;