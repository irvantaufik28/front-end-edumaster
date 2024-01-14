import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

export const roleList = createAsyncThunk(
  "role/list",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    try {
      const response = await axios.get(`${apiUrl}/role`, {
        headers: {
          authorization: token
        }
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data); // Use `rejectWithValue` here
    }
  }
);

export const getByIdRole = createAsyncThunk(
    "role/getById",
    async (id, { rejectWithValue }) => {
      const apiUrl = config.apiUrl;
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      try {
        const response = await axios.get(`${apiUrl}/role/${id}`, {
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
  
const roleSlice = createSlice({
  name: "role",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    setDataRolePermissionCheckBox : (state, action) => {
      state.dataRolePermissionCheckBox = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(roleList.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(roleList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(roleList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
      .addCase(getByIdRole.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getByIdRole.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getByIdRole.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      });
  },
});
export const { setDataRolePermissionCheckBox } = roleSlice.actions;
export const roleSelector = {
  selectAll: (state) => state.role.data,
  loading: (state) => state.role.loading,
  errorMessage: (state) => state.role.errorMessage,
};

export default roleSlice.reducer;
