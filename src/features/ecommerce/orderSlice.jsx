/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

const initialState = {
  data: {},
  loading: false,
  errorMessage: {}
};

export const getAllOrder = createAsyncThunk(
  "order/getAll",
  async (params = {}, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.get(`${apiUrl}/order`, {
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

export const getOrderById = createAsyncThunk(
  "order/getById",
  async ( _id, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.get(`${apiUrl}/order/${_id}`, {
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setDataOrder: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      }) 
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data;
        state.data = null;
      });
  },
});

export const { setDataOrder } = orderSlice.actions;

export const orderSelector = {
  selectAll: (state) => state.order.data,
  loading: (state) => state.order.loading,
  errorMessage: (state) => state.order.errorMessage,
};
export default orderSlice.reducer;
