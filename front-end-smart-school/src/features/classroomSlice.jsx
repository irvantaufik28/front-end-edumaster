// classroomSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

const initialState = {
  data: {},
  dataCheckBox: [],
  errorMessage: null,
  loading: false
};

export const getAll = createAsyncThunk(
  "classroom/getAll",
  async (params = {}, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/classroom`, params);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getById = createAsyncThunk(
  "classroom/getById",
  async (id, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/classroom/${id}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setDataCheckBox: (state, action) => {
      state.dataCheckBox = action.payload;
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
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      });
  },
});

export const { setDataCheckBox } = classroomSlice.actions;
export const classroomSelector = {
  selectAll: (state) => state.classroom.data,
  loading: (state) => state.classroom.loading,
  errorMessage: (state) => state.classroom.errorMessage,
};

export default classroomSlice.reducer;
