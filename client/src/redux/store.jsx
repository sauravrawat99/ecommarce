import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice";
import productReducer from "./slice/productDetail";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productReducer,
  },
});
