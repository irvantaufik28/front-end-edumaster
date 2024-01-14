/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

const initialState = {
  data: {},
  loading: false,
};

export const getAll = createAsyncThunk(
  "student/getAll",
  async (params = {}, { rejectWithValue }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.get(apiUrl + "/student", {
        params,
        headers: {
          authorization: token,
        },
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

export const createStudent = createAsyncThunk(
  "student/create",
  async (payload = {}, { rejectWithValue }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.post(apiUrl + "/student", {
        payload,
        headers: {
          Authorization: token,
        },
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

export const getById = createAsyncThunk("student/detail", async (id) => {
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
  const apiUrl = config.apiUrl;
  const response = await axios.get(apiUrl + `/student/${id}`, {
    headers: {
      authorization : token
    }
  });
  return response.data;
});

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setDataStudent: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getById.pending, (state, action) => {
        state.loading = false;
        state.data = null;
      });
  },
});

export const { setDataStudent } = studentSlice.actions;
export const studentSelector = {
  createStudent: (state) => state.student.data,
  getAll: (state) => this.state.student.data,
  getById: (state) => state.student.data,
};
export default studentSlice.reducer;
