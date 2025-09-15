import React from "react";
import { Link } from "react-router-dom";
import "./productCardDetail";

const ProductCardDetails = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={
          product.images && product.images.length > 0
            ? `http://localhost:5000${product.images[0].url}` // backend ka base URL add kiya
            : "/no-image.png" // fallback image (public folder me rakhna)
        }
        alt={product.name}
      />{" "}
      <p>{product.name}</p>
      <div>
        <span>{`${product.ratings} ★`}</span>
        <span className="productCardSpan">
          ({product.numOfReviews ? product.numOfReviews : 10} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCardDetails;
