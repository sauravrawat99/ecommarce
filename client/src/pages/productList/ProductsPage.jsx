// pages/productList/ProductsPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, resetProducts } from "../../redux/slice/productsSlice";
import ProductCard from "../../compnents/Product/ProductCard";
import Loader from "../../compnents/common/Loader";
import ErrorMessage from "../../compnents/common/ErrorMessage";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    totalPages,
    currentPage,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.search);

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: { gte: "", lte: "" },
    category: "",
  });
  const [tempFilters, setTempFilters] = useState({ ...filters }); // Deep copy
  const [sort, setSort] = useState("");

  // Sync local page with Redux currentPage
  useEffect(() => {
    if (currentPage && currentPage !== page) {
      console.log("Syncing page with currentPage:", currentPage);
      setPage(currentPage);
    }
  }, [currentPage]);

  // Fetch products when page, keyword, filters, or sort change
  useEffect(() => {
    console.log("Fetching products with params:", {
      page,
      keyword,
      filters: JSON.stringify(filters, null, 2), // Pretty print
      sort,
    });
    const fetchData = async () => {
      try {
        const action = await dispatch(
          fetchProducts({ page, limit: 8, keyword, filters, sort })
        ).unwrap();
        console.log("API Response Details:", {
          products: action.products.map((p) => ({
            name: p.name,
            category: p.category,
            price: p.price,
          })),
          totalPages: action.totalPages,
          currentPage: action.currentPage,
          productsCount: action.productsCount,
        });
        if (action.products.length === 0) {
          console.warn("No products found for the given filters!");
        }
      } catch (err) {
        console.error("API Fetch Error:", err.message || err);
      }
    };
    fetchData();
  }, [dispatch, page, keyword, filters, sort]);

  // Handle filter changes (update tempFilters)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log("Filter input change:", {
      name,
      value,
      currentTempFilters: { ...tempFilters },
    });
    if (name === "priceGte" || name === "priceLte") {
      if (value === "" || Number(value) >= 0) {
        setTempFilters((prev) => ({
          ...prev,
          price: {
            ...prev.price,
            [name === "priceGte" ? "gte" : "lte"]: value,
          },
        }));
      }
    } else {
      setTempFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    console.log("Sort selected:", newSort);
    setSort(newSort);
    setPage(1);
    setShowFilters(false);
  };

  // Apply filters
  const applyFilters = () => {
    console.log("Applying filters - TempFilters:", { ...tempFilters });
    if (
      tempFilters.price.gte &&
      tempFilters.price.lte &&
      Number(tempFilters.price.gte) > Number(tempFilters.price.lte)
    ) {
      alert("Minimum price cannot be greater than maximum price");
      return;
    }
    setFilters({ ...tempFilters }); // Deep copy
    setPage(1);
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    console.log("Resetting filters to default");
    setTempFilters({ price: { gte: "", lte: "" }, category: "" });
    setFilters({ price: { gte: "", lte: "" }, category: "" });
    setSort("");
    setPage(1);
    setShowFilters(false);
    dispatch(resetProducts());
  };

  if (loading) return <Loader />;
  if (error)
    return <ErrorMessage message={`Error: ${error || "Unknown error"}`} />;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      {/* Mobile Filter Toggle */}
      <div className="mb-4 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          aria-label={showFilters ? "Hide filters" : "Show filters"}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters and Sort */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:block mb-6 bg-gray-100 p-4 rounded-lg relative`}
      >
        {loading && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="relative w-full">
                <input
                  type="number"
                  name="priceGte"
                  placeholder="Min Price"
                  value={tempFilters.price.gte}
                  onChange={handleFilterChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  min="0"
                  aria-label="Minimum price"
                />
                {tempFilters.price.gte && (
                  <button
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        price: { ...prev.price, gte: "" },
                      }))
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    aria-label="Clear minimum price"
                  >
                    ✖
                  </button>
                )}
              </div>
              <div className="relative w-full">
                <input
                  type="number"
                  name="priceLte"
                  placeholder="Max Price"
                  value={tempFilters.price.lte}
                  onChange={handleFilterChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  min="0"
                  aria-label="Maximum price"
                />
                {tempFilters.price.lte && (
                  <button
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        price: { ...prev.price, lte: "" },
                      }))
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    aria-label="Clear maximum price"
                  >
                    ✖
                  </button>
                )}
              </div>
            </div>
            <select
              name="category"
              value={tempFilters.category}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              aria-label="Select category"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full md:w-auto"
                aria-label="Apply filters"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
                aria-label="Reset filters"
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div>
            <select
              value={sort}
              onChange={handleSortChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              aria-label="Sort products"
            >
              <option value="">Default (Newest First)</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
              <option value="-name">Name: Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          aria-label="Previous page"
        >
          Previous
        </button>
        <span className="font-medium">
          {loading
            ? "Loading..."
            : `Page ${currentPage || page} of ${totalPages || 1}`}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={(totalPages && page >= totalPages) || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
      <p className="text-center mt-4">
        Total Products: {productsCount} | Showing {products.length} of{" "}
        {resultPerPage} per page
      </p>
    </div>
  );
};

export default ProductsPage;
