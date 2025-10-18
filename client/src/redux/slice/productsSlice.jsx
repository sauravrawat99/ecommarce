// redux/slice/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axios.config";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (
    { page = 1, limit = 8, keyword = "", filters = {}, sort = "" },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (keyword) params.append("keyword", keyword);
      if (sort) params.append("sort", sort);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key === "price") {
            if (value.gte) params.append("price[gte]", value.gte);
            if (value.lte) params.append("price[lte]", value.lte);
          } else {
            params.append(key, value);
          }
        }
      });

      const { data } = await axiosInstance.get(
        `/products?${params.toString()}`
      );
      return {
        products: data.products,
        productsCount: data.productsCount,
        resultPerPage: data.resultPerPage,
        currentPage: data.currentPage || page, // Fallback to local page if undefined
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
    totalPages: 1,
    currentPage: 1, // Explicitly defined
    productsCount: 0,
    resultPerPage: 8,
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage; // Ensure this is set
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        toast.success("✅ Products Loaded");
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentPage = 1; // Fallback to 1 on error
        toast.error(`❌ ${action.payload}`);
      });
  },
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
