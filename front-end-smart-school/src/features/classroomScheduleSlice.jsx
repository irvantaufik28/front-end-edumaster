import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

export const listClassroomSchedule = createAsyncThunk(
  "classroomSchedule/list",
  async (params = {}, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.get(
        `${apiUrl}/classroom-schedule?classroom_id=${params.id}&day_name=${params.day_name}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data); // Use `rejectWithValue` here
    }
  }
);
const classroomScheduleSlice = createSlice({
  name: "classroomSchedule",
  initialState: {
    data: [], // Change here to use an array
    loading: false,
    errorMessage: null, // Add errorMessage to the initialState
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listClassroomSchedule.pending, (state) => {
        state.loading = true;
        state.data = []; // Set data to an empty array when pending
        state.errorMessage = null; // Reset errorMessage
      })
      .addCase(listClassroomSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(listClassroomSchedule.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = []; // Set data to an empty array when rejected
      });
  },
});

export const classroomScheduleSelector = {
  selectAll: (state) => state.classroomSchedule.data,
  loading: (state) => state.classroomSchedule.loading,
  errorMessage: (state) => state.classroomSchedule.errorMessage,
};

export default classroomScheduleSlice.reducer;
