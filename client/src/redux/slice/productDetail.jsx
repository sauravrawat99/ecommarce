import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axios.config";

// API call to fetch single product by ID
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        toast.success(" ✅ Product Loaded");
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`❌ ${action.payload}`);
      });
  },
});

export default productDetailSlice.reducer;
