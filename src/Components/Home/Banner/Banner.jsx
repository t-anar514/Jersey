import React from "react";
import "./Banner.css";

import { Link } from "react-router-dom";
import { translations } from "../../../translations/Mongolian";

const Banner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="banner">
        <div className="bannerLeft">
          <h6 className="bannerh6">{translations.startingAt} $19</h6>
          <h3 className="bannerh3" style={{ color: '#0066cc' }}>{translations.womenTshirts}</h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "white" }}>
              {translations.shopNow}
            </Link>
          </h5>
        </div>
        <div className="bannerRight">
          <h6 className="bannerh6" style={{ color: "black" }}>
            {translations.startingAt} $39
          </h6>
          <h3 className="bannerh3" style={{ color: '#0066cc' }}>
            {translations.mensSportswear}
          </h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "black" }}>
              {translations.shopNow}
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Banner;
