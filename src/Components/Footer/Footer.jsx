import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo.png";
import paymentIcon from "../../Assets/qpayIcon.png";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

import { Link } from "react-router-dom";
import { translations } from "../../translations/Mongolian";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer_left">
            <div className="footer_logo_container">
              <img src={logo} alt="" Z />
            </div>

            <p>WV7H+FJH, Улаанбаатар Бгд 1-р хороо төмөр зам богд арын хаан банкны замын эсрэг талд, Ulaanbaatar</p>

            <div className="footer_address">
              <strong> jolooch103@gmail.com </strong>
              <strong> +976 99119511 </strong>
            </div>

            <div className="social_links">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>

          <div className="footer_content">
            <h5>Манай баг</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/about">{translations.about}</Link>
                </li>
             
                <li>
                  <Link to="/blog">{translations.blog}</Link>
                </li>
                <li>
                  <Link to="/contact">{translations.contact}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Дэлгүүр</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
              
              
                <li>
                  <Link to="/shop">{translations.men}</Link>
                </li>
                <li>
                  <Link to="/shop">{translations.women}</Link>
                </li>
                <li>
                  <Link to="/shop">{translations.shopAll}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Тусламж</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
               
                <li>
                  <Link to="/loginSignUp">{translations.myAccount}</Link>
                </li>
             
                <li>
                  <Link to="/terms">{translations.legalAndPrivacy}</Link>
                </li>
                <li>
                  <Link to="/contact">{translations.contact}</Link>
                </li>
               
              </ul>
            </div>
          </div>
          <div className="footer_right">
            <h5>{translations.subscribe}</h5>
           

            <h6>{translations.securePayments}</h6>
            <div className="paymentIconContainer">
              <img src={paymentIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <p>
            {translations.copyright} {getCurrentYear()} Uomo. {translations.allRightsReserved} | Made By{" "}
            <a
              href="https://anar.vercel.app/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#C22928", textDecoration: "none" }}
            >
              Anar Tamir
            </a>
          </p>
          
        </div>
      </footer>
    </>
  );
};

export default Footer;
