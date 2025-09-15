import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      className=" sm:bg-slate-800  fixed top-0 left-0 w-full h-16 sm:h-20 md:h-[5.8vw] flex items-center justify-between border-b border-black z-50 max-sm:bg-gray-800"
    >
      {/* Left Nav */}
      <div className="flex items-center px-4 py-2 sm:px-6 md:px-10 w-fit">
        <a href="/">
          <h1 className=" lh text-lg sm:text-xl md:text-2xl font-bold transform transition duration-300 hover:scale-105 hover:-translate-y-1 ">
            T SHOP
          </h1>
        </a>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden pr-4 flex items-center gap-4">
        {/* Cart Icon */}
        <div className="relative cursor-pointer transform transition duration-300 hover:scale-105 hover:-translate-y-1">
          🛒
          <span className="absolute -top-2 -right-2  text-xs px-2 rounded-full">
            0
          </span>
        </div>

        {/* Hamburger / Close Button */}
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none transform transition duration-00 hover:scale-105 hover:-translate-y-1"
        >
          {isOpen ? "" : "☰"}
        </button>
      </div>

      {/* Middle Nav */}
      <div className="hidden md:flex">
        <ul className="flex text-lg md:text-xl font-light gap-8 md:gap-12 lg:gap-20 px-4">
          <li className="transition duration-300 hover:scale-105 hover:-translate-y-1">
            <a href="/new">New</a>
          </li>
          <li className="transition duration-300 hover:scale-105 hover:-translate-y-1 link-hover:active">
            <a href="/women">Women</a>
          </li>
          <li className="transition duration-300 hover:scale-105 hover:-translate-y-1">
            <a href="/men">Men</a>
          </li>
        </ul>
      </div>

      {/* Right Nav */}
      <div className="hidden md:flex items-center px-6 md:px-8 lg:px-12 py-4 gap-4 lg:gap-6">
        <button className="flex gap-2 items-center py-2 transition duration-300 hover:scale-105 hover:-translate-y-1">
          <i className="ri-user-3-fill"></i>
          Log In
        </button>
        <div className="relative cursor-pointer transition duration-300 hover:scale-105 hover:-translate-y-1">
          🛒
          <span className="absolute -top-2 -right-2  text-xs px-2 rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-full md:hidden z-20 transition-all duration-500 bg-gray-800 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <button
            onClick={toggleMenu}
            className="text-2xl transition duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <button className="flex items-center gap-2 transition duration-300 hover:scale-105 hover:-translate-y-1">
            <i className="ri-user-3-fill"></i>
            Log In
          </button>
        </div>

        {/* Menu Links */}
        <ul className="flex flex-col items-center justify-center h-[90vh] gap-20 text-4xl font-bold overflow-y-hidden ">
          <li className="transition duration-300 hover:scale-105 hover:-translate-y-1">
            <a href="/new" onClick={toggleMenu}>
              New
            </a>
          </li>
          <li className="transition duration-300 hover:scale-105 hover:-translate-y-1">
            <a href="/women" onClick={toggleMenu}>
              Women
            </a>
          </li>
          <li className="transition duration-300 hover:scale-105 hover:-translate-y-1">
            <a href="/men" onClick={toggleMenu}>
              Men
            </a>
          </li>
          <li className="transition duration-300 hover:scale-105 hover:-translate-y-1 ">
            <a href="/shop" onClick={toggleMenu}>
              Shop
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
