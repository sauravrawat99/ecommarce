// App.jsx
import React from "react";
import Navbar from "./compnents/layout/navbar";
import Footer from "./compnents/layout/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import ProductsPage from "./pages/productList/ProductsPage";
import ProductDetails from "./pages/productDetail/productDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shop/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={500} />
    </BrowserRouter>
  );
};

export default App;