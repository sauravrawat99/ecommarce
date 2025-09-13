import React, { useEffect } from "react";
import Header from "./compnents/layout/header/Header";
import Footer from "./compnents/layout/footer/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./compnents/home/home";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"], // thoda spelling fix kiya
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />

      {/* Routes wrapper add kiya */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
