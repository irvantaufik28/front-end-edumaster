import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


export const getAllCategory = createAsyncThunk(
  "category/getAll",
  async (params = {}, { rejectWithValue }) => {
    const apiUrl = config.apiUrl;
    const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
    try {
      const response = await axios.get(`${apiUrl}/category`, {
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

const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState: {
    data: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false; 
        state.errorMessage = action.payload;
        state.data = null;
      }) 
      
  },
});

export const categoryProductSelector = {
  selectAll: (state) => state.categoryProduct.data,
  loading: (state) => state.cateogryProduct.loading,
  errorMessage: (state) => state.cateogryProduct.errorMessage,
};

export default categoryProductSlice.reducer;
