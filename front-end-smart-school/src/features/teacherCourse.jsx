import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

export const listByStaffId = createAsyncThunk(
  "teacher-course/list",
  async ( id, { rejectWithValue }) => {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/teacher/course-staff/${id}`, {
        headers: {
            authorization : token
        }
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data); 
    }
  }
);

export const listAllTeacherCourse = createAsyncThunk(
  "teacher-course/list-all",
  async (params = {}, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.get(
        `${apiUrl}/teacher/course?course_id=${params.course_id}`,
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
const teacherCourseSlice = createSlice({
  name: "teacherCourse",
  initialState: {
    data: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listByStaffId.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(listByStaffId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(listByStaffId.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
      .addCase(listAllTeacherCourse.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(listAllTeacherCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(listAllTeacherCourse.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      });
  },
});

export const teacherCourseSelector = {
  selectAll: (state) => state.teacherCourse.data,
  loading: (state) => state.teacherCourse.loading,
  errorMessage: (state) => state.teacherCoursecourse.errorMessage,
};

export default teacherCourseSlice.reducer;
