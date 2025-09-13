import React from "react";
import PlayStore from "../../../images/playstore.jpeg";
import AppStore from "../../../images/apple.jpeg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        {/* ✅ ab import kiya hua variable use kar sakte ho */}
        <img src={PlayStore} alt="playstore" />
        <img src={AppStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2025 &copy; Saurav-Rawat</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/saurabh_rwt__999" target="blanck">
          Instagram
        </a>
        <a href="https://github.com/sauravrawat99" target="blanck">
          Git-hub
        </a>
        <a href="www.linkedin.com/in/saurav-rawat-" target="blanck">
          Linkdln{" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
