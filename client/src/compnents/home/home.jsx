// // import React, { useEffect } from "react";
// import { CgMouse } from "react-icons/cg";
// import "./Home.css";
// import Product from "./products";

// const product = {
//   _id: "1",
//   name: "iPhone 14",
//   description:
//     "Apple iPhone 14 with A15 Bionic chip, 128GB storage, and dual camera system.",
//   price: 79999,
//   ratings: 4.5,
//   images: [
//     {
//       url: "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//       url: "data:image/jpeg;base64,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",
//     },
//     {
//       url: "data:image/jpeg;base64,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",
//     },
//     {
//       url: "http://localhost:5000/uploads/3.png",
//     },
//   ],
//   category: "Smartphones",
//   stock: 10,
//   numOfReviews: 25,
// };

// const Home = () => {
//   return (
//     <>
//       <div className="banner">
//         <p>Welcome to Ecommerce</p>
//         <h1>FIND AMAZING PRODUCTS BELOW</h1>

//         <a href="#container">
//           <button>
//             Scroll <CgMouse />
//           </button>
//         </a>
//       </div>
//       <h2 className="homeHeading">Peachere Products</h2>
//       <div className="container" id="container">
//         <Product product={product} />
//         <Product product={product} />
//         <Product product={product} />
//         <Product product={product} />
//         <Product product={product} />
//         <Product product={product} />
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import ProductCard from "./ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
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
