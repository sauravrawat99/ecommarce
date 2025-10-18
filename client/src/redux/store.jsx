import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice";
import productDetailReducer from "./slice/productDetail";
import homeProductsReducer  from "./slice/homeProductSlice";
import searchReducer from "./slice/searchSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    homeProducts: homeProductsReducer,
    search: searchReducer,
  },
});
