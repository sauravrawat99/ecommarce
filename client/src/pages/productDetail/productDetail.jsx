import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../redux/slice/productDetail";
import Loader from "../../compnents/common/Loader";
import ErrorMessage from "../../compnents/common/ErrorMessage";
import ProductCardDetail from "../../compnents/Product/productCardDetail";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(id)); // ✅ ek hi product fetch karega
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return <ProductCardDetail product={product} />;
};


export default ProductDetails;
