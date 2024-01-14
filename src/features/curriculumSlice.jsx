import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

export const listCurriculum = createAsyncThunk(
  "curriculum/list",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/structure-curriculum/list`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllCurriculum = createAsyncThunk(
  "curriculum/getAll",
  async (params = {}, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const response = await axios.get(`${apiUrl}/structure-curriculum`, {
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

export const getByIdCurriculum = createAsyncThunk(
  "curriculum/getById",
  async (id, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const response = await axios.get(`${apiUrl}/structure-curriculum/${id}`, {
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

const curriculumSlice = createSlice({
  name: "curriculum",
  initialState: {
    data: {},
    loading: false,
  },
  reducers: {
    setDataCurriculum: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listCurriculum.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(listCurriculum.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(listCurriculum.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data;
        state.data = null;
      })
      .addCase(getAllCurriculum.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getAllCurriculum.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getAllCurriculum.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
      .addCase(getByIdCurriculum.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getByIdCurriculum.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getByIdCurriculum.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      });
  },
});

export const { setDataCurriculum } = curriculumSlice.actions;
export const curriculumSelector = {
  selectAll: (state) => state.curriculum.data,
  loading: (state) => state.curriculum.loading,
  errorMessage: (state) => state.curriculum.errorMessage,
};

export default curriculumSlice.reducer;
