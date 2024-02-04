/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";
import axios from "axios";

const initialState = {
  data: {},
  loading: false,
};

export const getAllCart = createAsyncThunk(
  "cart/getAll",
  async (params = {}, { rejectWithValue }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.get(apiUrl + "/cart", {
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setDataCart: (state, action) => {
      state.data = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCart.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(getAllCart.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data;
        state.data = null;
      })
    
  },
});

export const { setDataCart } = cartSlice.actions;
export const cartSelector = {
    selectAll: (state) => state.cart.data,
    loading: (state) => state.cart.loading,
    errorMessage: (state) => state.cart.errorMessage,
};
export default cartSlice.reducer;
