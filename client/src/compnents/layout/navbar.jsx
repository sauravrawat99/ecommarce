// compnents/layout/navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchKeyword,
  clearSearchKeyword,
} from "../../redux/slice/searchSlice";
import { debounce } from "lodash";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For mobile search toggle
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useSelector((state) => state.search);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen); // Toggle mobile search

  // Debounced search function
  const debouncedSearch = debounce((value) => {
    const trimmedValue = value.trim();
    dispatch(setSearchKeyword(trimmedValue));
    if (trimmedValue) {
      navigate("/shop");
    }
  }, 500);

  // Handle search input
  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  // Clear search when navigating to home
  const handleHomeClick = () => {
    dispatch(clearSearchKeyword());
    setIsOpen(false);
    setIsSearchOpen(false); // Close search input on home click
  };

  // Navbar animation on mount
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -200, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        y: -200,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={navRef}
      className="sticky top-0 left-0 w-full h-16 sm:h-20 flex items-center justify-between bg-white shadow-md border-b z-50"
    >
      {/* Left: Logo */}
      <div className="flex items-center px-4 sm:px-6 md:px-10">
        <Link to="/" onClick={handleHomeClick}>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600 transform transition duration-300 hover:scale-105 hover:-translate-y-1">
            T SHOP
          </h1>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12 font-medium">
        <Link
          to="/"
          onClick={handleHomeClick}
          className="hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link to="/shop" className="hover:text-blue-600 transition">
          Shop
        </Link>
        <Link to="/categories" className="hover:text-blue-600 transition">
          Categories
        </Link>
        <Link to="/about" className="hover:text-blue-600 transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-600 transition">
          Contact
        </Link>
      </div>

      {/* Right: Search + Icons (Desktop) */}
      <div className="hidden md:flex items-center gap-6 px-6">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
          className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Search products"
        />
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
          <i className="ri-user-3-fill"></i> Log In
        </button>
        <div className="relative cursor-pointer hover:scale-105 transition">
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Mobile Right */}
      <div className="md:hidden flex items-center gap-4 pr-4">
        {/* Search Icon/Button for Mobile */}
        <button
          onClick={toggleSearch}
          className="text-xl focus:outline-none"
          aria-label="Toggle search"
        >
          🔍
        </button>
        {/* Search Input (shown when toggled) */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 w-full bg-white p-4 shadow-md z-50">
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={handleSearch}
              className="w-full border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Search products"
            />
          </div>
        )}
        {/* Cart */}
        <div className="relative cursor-pointer">
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            0
          </span>
        </div>
        {/* Menu Btn */}
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-full md:hidden z-40 bg-gray-900 text-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <button
            onClick={toggleMenu}
            className="text-2xl"
            aria-label="Close menu"
          >
            ←
          </button>
          <button className="flex items-center gap-2">
            <i className="ri-user-3-fill"></i> Log In
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center h-[90vh] gap-10 text-2xl font-semibold">
          <li>
            <Link to="/" onClick={handleHomeClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/categories" onClick={() => setIsOpen(false)}>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
