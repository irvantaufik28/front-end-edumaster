/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

const initialState = {
  data: {},
  loading: false,
};

export const getAll = createAsyncThunk(
  "staff/getAll",
  async (params = {}, { rejectWithValue }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.get(apiUrl + "/staff", {
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

export const createStaff = createAsyncThunk(
  "staff/create",
  async (payload = {}, { rejectWithValue }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.post(apiUrl + "/staff", {
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

export const getById = createAsyncThunk("staff/detail", async (id) => {
  const apiUrl = config.apiUrl;
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
  const response = await axios.get(apiUrl + `/staff/${id}`, {
    headers: {
      authorization: token
    }
  });
  return response.data;
});

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setDataStaff: (state, action) => {
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
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(createStaff.rejected, (state, action) => {
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

export const { setDataStaff } = staffSlice.actions;
export const staffSelector = {
  createStaff: (state) => state.staff.data,
  getAll: (state) => this.state.staff.data,
  getById: (state) => state.staff.data,
};
export default staffSlice.reducer;
