import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeProducts } from "../../redux/slice/homeProductSlice";
import ProductCard from "../../compnents/Product/ProductCard";
import Loader from "../../compnents/common/Loader";
import ErrorMessage from "../../compnents/common/ErrorMessage";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.homeProducts
  );

  useEffect(() => {
    dispatch(fetchHomeProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">New Drops</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
