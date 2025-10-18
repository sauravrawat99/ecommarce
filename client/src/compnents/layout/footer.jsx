import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black border-2 border-black  ">
      <div className="flex flex-col md:flex-row">
        {/* Right Side */}
        <div className="w-full md:w-[30%] flex flex-col text-white justify-between p-6 bg-slate-900">
          {/* Brand Info */}
          <div className="mb-6">
            <Link to="/">
              <h1 className="text-2xl font-bold mb-2 tracking-wider lh">
                T SHOP
              </h1>
            </Link>
            <a
              href="mailto:info@myside"
              className="block hover:text-lime-400 lh"
            >
              info@myside
            </a>
            <p className="hover:text-lime-400">tel: 123-345-789</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 text-2xl">
            <a href="" className="hover:text-lime-400 transition lh">
              <i className="ri-facebook-box-fill"></i>
            </a>
            <a href="" className="hover:text-pink-400 transition lh">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="" className="hover:text-gray-400 transition lh">
              <i className="ri-github-fill"></i>
            </a>
            <a href="" className="hover:text-blue-400 transition lh">
              <i className="ri-linkedin-box-fill"></i>
            </a>
          </div>
        </div>

        {/* Left Side */}
        <div className="w-full md:w-[70%] flex flex-col justify-between bg-white">
          {/* Links */}
          <div className="flex flex-col md:flex-row justify-evenly py-8 px-4 gap-8">
            <div>
              <h2 className="font-bold text-lg pb-4">SHOP</h2>
              <ul className="space-y-2">
                <li className="lh">
                  <Link to="/new" className="hover:text-lime-400">
                    New
                  </Link>
                </li>
                <li className="lh">
                  <Link to="/men" className="hover:text-lime-400">
                    Men
                  </Link>
                </li>
                <li className="lh">
                  <Link to="/women" className="hover:text-lime-400">
                    Women
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg pb-4">OUR STORE</h2>
              <ul className="space-y-2">
                <li className="lh">
                  <a href="" className="hover:text-lime-400">
                    About Us
                  </a>
                </li>
                <li className="lh">
                  <a href="" className="hover:text-lime-400">
                    Subscribe
                  </a>
                </li>
                <li className="lh">
                  <a href="" className="hover:text-lime-400">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg pb-4">TERMS</h2>
              <ul className="space-y-2">
                <li className="lh">
                  <a href="" className="hover:text-lime-400">
                    Store Policy
                  </a>
                </li>
                <li className="lh">
                  <a href="" className="hover:text-lime-400">
                    Shipping & Returns
                  </a>
                </li>
                <li className="lh">
                  <a href="" className="hover:text-lime-400">
                    Payment Method
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-center py-4 border-t-2 border-black text-sm">
            © 2035 by <span className="font-semibold">T Shop</span>. Powered and
            secured by Wix
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
