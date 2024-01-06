import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

export const list = createAsyncThunk(
  "course/list",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/course-list`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data); // Use `rejectWithValue` here
    }
  }
);
const courseSlice = createSlice({
  name: "course",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    setDataCourseCheckBox: (state, action) => {
      state.dataCheckBox = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(list.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(list.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(list.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      });
  },
});
export const { setDataCourseCheckBox } = courseSlice.actions;
export const courseSelector = {
  selectAll: (state) => state.course.data,
  loading: (state) => state.course.loading,
  errorMessage: (state) => state.course.errorMessage,
};

export default courseSlice.reducer;
