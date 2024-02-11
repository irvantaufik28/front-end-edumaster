/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";
import axios from "axios";

const initialState = {
  data: {},
  dataImage: {},
  loading: false,
};

export const getAllProduct = createAsyncThunk(
  "product/getAll",
  async (params = {}, { rejectWithValue }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const apiUrl = config.apiUrl;
      const response = await axios.get(apiUrl + "/product", {
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

export const getProductById = createAsyncThunk("product/detail", async (id) => {
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
  const apiUrl = config.apiUrl;
  const response = await axios.get(apiUrl + `/product/${id}`, {
    headers: {
      authorization : token
    }
  });
  return response.data;
});


export const getProductMainImages = createAsyncThunk("product-images/detail", async (id) => {
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
  const apiUrl = config.apiUrl;
  const response = await axios.get(apiUrl + `/product/${id}`, {
    headers: {
      authorization : token
    }
  });
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.data = action.payload;
    },
    resetProductData: (state) => {
      state.data = {
        initialValues: null,
        type: 'add',
        editId: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getProductById.pending, (state, action) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(getProductMainImages.fulfilled, (state, action) => {
        let main_image = {};
        const images = action.payload.data.product_images;
    
        const mainImage = images.find(item => item.is_main_image === true);
    
        if (mainImage) {
            main_image = mainImage;
        } else {
            main_image = images[0];
        }
        state.dataImage = main_image;
    })
    
      .addCase(getProductMainImages.pending, (state, action) => {
        state.loading = false;
        state.data = null;
      });
  },
});

export const { setDataProduct, resetProductData } = productSlice.actions;
export const productSelector = {
    selectAll: (state) => state.product.data,
    productImage: (state) =>state.product.dataImage,
    loading: (state) => state.product.loading,
    errorMessage: (state) => state.product.errorMessage,
};
export default productSlice.reducer;
