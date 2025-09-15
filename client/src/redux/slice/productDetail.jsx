import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axios.config";
import { toast } from "react-toastify";

// ✅ Single product fetch
export const fetchProduct = createAsyncThunk(
  "product/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        toast.success("✅ Product Loaded");
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`❌ ${action.payload}`);
      });
  },
});

export default productSlice.reducer;
