/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import config from "../config";

const initialState = {
  data: {},
  dataImage: {},
  loading: false,
};

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (params = {}, { rejectWithValue }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.get(apiUrl + "/user/profile", {
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


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
  },
});

export const userSelector = {
    selectAll: (state) => state.user.data,
    loading: (state) => state.user.loading,
    errorMessage: (state) => state.user.errorMessage,
};
export default userSlice.reducer;
