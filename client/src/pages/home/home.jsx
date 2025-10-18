import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../../index.css";
import Products from "../productList/Products";

const Home = () => {
  const textRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      textRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        transformOrigin: "left center",
      }
    );

    tl.to(bRef.current, {
      // y: "-60%",
      duration: 1.5,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <div
        ref={bRef}
        className="relative xl:h-[400px] w-full h-[500px] md:h-[600px] bg-gray-900 text-white flex flex-col items-center justify-center duration-2000 "
      >
        <img
          src="/images/newbanner.jpg"
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
            Welcome to <span className="text-lime-400">T SHOP</span>
          </h1>
          <p
            ref={textRef}
            className="text-lg md:text-2xl mt-4 bg-black/50 px-6 py-2 inline-block rounded-md"
          >
            Fashion for Every Generation
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-lime-400 text-black px-6 py-3 font-semibold rounded-full shadow-lg hover:bg-lime-500 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Category Section */}
      <div className="flex flex-col md:flex-row gap-6 mt-12 mb-10 px-4 md:px-12 max-w-screen-xl">
        {/* Woman */}
        <div className="w-full md:w-1/3 image-card h-[300px] md:h-[400px]">
          <Link to="/woman" className="block relative w-full h-full group">
            <img
              src="/images/woman-mv2.avif"
              alt="woman"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-500"
            />
            <div className="image-card-text">Woman Collection</div>
          </Link>
        </div>

        {/* New */}
        <div className="w-full md:w-1/3 image-card h-[300px] md:h-[400px]">
          <Link to="/new" className="block relative w-full h-full group">
            <img
              src="/images/new~mv2.avif"
              alt="new"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-500"
            />
            <div className="image-card-text">New Arrivals</div>
          </Link>
        </div>

        {/* Men */}
        <div className="w-full md:w-1/3 image-card h-[300px] md:h-[400px]">
          <Link to="/men" className="block relative w-full h-full group">
            <img
              src="/images/men.avif"
              alt="men"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-500"
            />
            <div className="image-card-text">Men Collection</div>
          </Link>
        </div>
      </div>

      {/* Product Section */}

      <div className=" max-w-screen-xl mx-auto px-4 md:px-12 mb-20">
        <Products />
      </div>
      <Link to="/shop" className="block text-center mb-10 text-lg font-semibold hover:text-blue-600 transition">
        View All Products
      </Link>
    </div>
  );
};

export default Home;
