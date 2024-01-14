/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

const initialState = {
  data: {},
  custome: {},
  loading: false,
  errorMessage: null
};

export const getById = createAsyncThunk("student-parent/detail", async (id) => {
  const apiUrl = config.apiUrl;
  const response = await axios.get(apiUrl + `/student-parent/${id}`);
  return response.data;
});

const studentParentSlice = createSlice({
  name: "studentParent",
  initialState,
  reducers: {
    setDataStudentParent: (state, action) => {
      state.custome = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getById.pending, (state, action) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false; 
        state.errorMessage = action.payload;
        state.data = null;
      });
  },
});

export const { setDataStudentParent } = studentParentSlice.actions;
export const studentParentSelector = {
  getById: (state) => state.studentParent.data,
};
export default studentParentSlice.reducer;
