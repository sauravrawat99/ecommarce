import React from "react";
import Navbar from "./compnents/layout/navbar";
import Footer from "./compnents/layout/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/home/home";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // ye jaruri hai

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* // <Route path="/" element={<Home />} /> */}
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
      </Routes>

      <Footer />

      {/* ToastContainer ko yaha rakho */}
      {/* <ToastContainer position="top-right" autoClose={500} /> */}
    </BrowserRouter>
  );
};

export default App;
