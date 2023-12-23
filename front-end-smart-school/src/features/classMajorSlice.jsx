import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../config';

export const getAll = createAsyncThunk(
  "classmajor/getAll",
  async (params = {}, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
    try {
      const response = await axios.get(`${apiUrl}/class/major`, {
        params,
        headers: {
          authorization: token
        }
      });
    //   console.log(response.data)
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
export const list = createAsyncThunk(
  "classmajor/list",
  async ( { rejectWithValue }) => {

    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/class/major-list`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const classMajorSlice = createSlice({
  name: "classmajor",
  initialState: {
    data: [],
    loading: true
  },
  reducers: {},
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

export const classMajorSelector = {
  selectAll: (state) => state.classmajor.data,
  loading: (state) => state.classmajor.loading,
  errorMessage: (state) => state.classmajor.errorMessage,
};

export default classMajorSlice.reducer;
