import React, { useState } from "react";

const ProductDetailsCard = ({ product }) => {
  const [mainImage, setMainImage] = useState(
    product.images && product.images.length > 0
      ? product.images[0].url.startsWith("http")
        ? product.images[0].url
        : `http://localhost:5000${product.images[0].url}`
      : "/no-image.png"
  );

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* 🖼️ Images Section */}
      <div className="md:w-1/2">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-[28rem] object-cover rounded-lg shadow-md mb-4"
        />
        <div className="flex gap-3 flex-wrap">
          {product.images?.map((img, idx) => {
            const imgUrl = img.url.startsWith("http")
              ? img.url
              : `http://localhost:5000${img.url}`;
            return (
              <img
                key={idx}
                src={imgUrl}
                alt={`${product.name}-${idx}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                  mainImage === imgUrl
                    ? "border-blue-600"
                    : "border-transparent"
                } hover:scale-105 transition-transform duration-200`}
                onClick={() => setMainImage(imgUrl)}
              />
            );
          })}
        </div>
      </div>

      {/* 📄 Product Info */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-4">
          <span className="text-green-600 font-bold text-2xl">
            ₹{product.price}
          </span>
          <span className="text-yellow-500 font-medium">
            ⭐ {product.ratings} ({product.numOfReviews} Reviews)
          </span>
        </div>

        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p
          className={`font-semibold ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `In Stock (${product.stock} left)`
            : "Out of Stock"}
        </p>

        {/* 🚀 Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 shadow-md"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md">
            Buy Now
          </button>
        </div>

        {/* 📝 Reviews Section */}
        {product.reviews?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
            <div className="space-y-3">
              {product.reviews.slice(0, 3).map((rev, idx) => (
                <div
                  key={idx}
                  className="border p-3 rounded-md shadow-sm bg-gray-50"
                >
                  <p className="font-medium text-gray-800">
                    {rev.name} - ⭐ {rev.rating}
                  </p>
                  <p className="text-sm text-gray-600">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsCard;
