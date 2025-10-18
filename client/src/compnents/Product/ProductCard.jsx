import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url.startsWith("http")
        ? product.images[0].url
        : `http://localhost:5000${product.images[0].url}`
      : "/no-image.png";

  return (
    <Link
      to={`product/${product._id}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {product.isFeatured && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center text-yellow-500 mb-2">
          <span className="font-medium">{product.ratings} ★</span>
          <span className="text-gray-500 text-sm ml-2">
            ({product.numOfReviews ? product.numOfReviews : 10} Reviews)
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-blue-600 font-bold text-xl">
            ₹{product.price}
          </span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
