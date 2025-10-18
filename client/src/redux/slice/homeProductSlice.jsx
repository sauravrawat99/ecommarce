// redux/slice/homeProductsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axios.config";

export const fetchHomeProducts = createAsyncThunk(
  "homeProducts/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/products?limit=4");
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

const homeProductsSlice = createSlice({
  name: "homeProducts",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`❌ ${action.payload}`);
      });
  },
});

export default homeProductsSlice.reducer;
