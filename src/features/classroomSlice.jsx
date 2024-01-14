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

    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/classroom`, params, {
        headers: {
          authorization: token
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

export const classroomList = createAsyncThunk(
  "classroom/list",
  async (params = {}, { rejectWithValue }) => {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/classroom-list?status=${params.status}&level=${params.level}`, {
        headers: {
          authorization: token
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

export const createClassroom = createAsyncThunk(
  "classroom/create",
  async (payload = {}, { rejectWithValue }) => {
  
    const apiUrl = config.apiUrl;
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    try {
      const response = await axios.post(`${apiUrl}/classroom`, payload, {
        headers: {
          authorization: `Bearer ${token}`
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
export const updateClassroom = createAsyncThunk(
  "classroom/update",
  async ({ payload, id }, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    console.log(payload);
    try {
      const response = await axios.put(`${apiUrl}/classroom/${id}`, payload, {
        headers: {
          authorization: `Bearer ${token}`
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

export const getById = createAsyncThunk(
  "classroom/getById",
  async (id, { rejectWithValue }) => {

    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    const apiUrl = config.apiUrl;
    try {
      const response = await axios.get(`${apiUrl}/classroom/${id}`, {
        headers: {
          authorization: token
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
      .addCase(createClassroom.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(createClassroom.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(createClassroom.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })  
      .addCase(classroomList.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(classroomList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(classroomList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
      .addCase(updateClassroom.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(updateClassroom.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(updateClassroom.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })            
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
