import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slice/productsSlice";
import ProductCard from "../../compnents/Product/productCardDetail";
import "./home.CSS";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="container" id="container">
          {products &&
            products.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
