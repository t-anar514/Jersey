import React, { useState } from "react";
import "./Navbar.css";

import { useSelector } from "react-redux";

import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaCartFlatbedSuitcase } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import Badge from "@mui/material/Badge";
import { translations } from "../../translations/Mongolian";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li>
                <Link to="/" onClick={scrollToTop}>
                  {translations.home}
                </Link>
              </li>
              
              <li>
                <Link to="/shop" onClick={scrollToTop}>
                  {translations.jerseyShop}
                </Link>
                <div className="submenu">
                  <ul>
                    <li>
                      <Link to="/shop?category=basketball">
                        {translations.basketballJerseys}
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop?category=football">
                        {translations.footballJerseys}
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop?category=volleyball">
                        {translations.volleyballJerseys}
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop?category=esports">
                        {translations.esportsJerseys}
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop?category=custom">
                        {translations.customJerseys}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link to="/teams" onClick={scrollToTop}>
                  {translations.teams}
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop}>
                  {translations.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop}>
                  {translations.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <FiSearch size={22} onClick={scrollToTop} />
          <Link to="/loginSignUp" onClick={scrollToTop}>
            <FaRegUser size={22} />
          </Link>
          <Link to="/cart" onClick={scrollToTop}>
            <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
          <FiHeart size={22} onClick={scrollToTop} />
          {/* <RiMenu2Line size={22} /> */}
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <Link to="/cart">
            <Badge
              badgeContent={cart.items.length === 0 ? "0" : cart.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} color="black" />
            </Badge>
          </Link>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <div className="mobile-menuSearchBarContainer">
                <input type="text" placeholder="Бүтээгдэхүүн хайх" />
                <Link to="/shop">
                  <FiSearch size={22} onClick={toggleMobileMenu} />
                </Link>
              </div>
            </div>
            <div className="mobile-menuList">
              <ul>
                <li>
                  <Link to="/" onClick={toggleMobileMenu}>
                    {translations.home}
                  </Link>
                </li>
              
                <li>
                  <Link to="/shop" onClick={toggleMobileMenu}>
                    {translations.jerseyShop}
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=basketball" onClick={toggleMobileMenu}>
                    {translations.basketballJerseys}
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=football" onClick={toggleMobileMenu}>
                    {translations.footballJerseys}
                  </Link>
                </li>
                <li>
                  <Link to="/teams" onClick={toggleMobileMenu}>
                    {translations.teams}
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={toggleMobileMenu}>
                    {translations.about}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={toggleMobileMenu}>
                    {translations.contact}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-menuFooter">
            <div className="mobile-menuFooterLogin">
              <Link to="/loginSignUp" onClick={toggleMobileMenu}>
                <FaRegUser />
                <p>{translations.myAccount}</p>
              </Link>
            </div>
            <div className="mobile-menuFooterLangCurrency">
              <div className="mobile-menuFooterLang">
                <p>{translations.language}</p>
                <select name="language" id="language">
                  <option value="english">{translations.english}</option>
                  <option value="Hindi">{translations.hindi}</option>
                  <option value="Germany">{translations.german}</option>
                  <option value="French">{translations.french}</option>
                </select>
              </div>
              <div className="mobile-menuFooterCurrency">
                <p>{translations.currency}</p>
                <select name="currency" id="currency">
                  <option value="USD">{translations.usd}</option>
                  <option value="INR">{translations.inr}</option>
                  <option value="EUR">{translations.eur}</option>
                  <option value="GBP">{translations.gbp}</option>
                </select>
              </div>
            </div>
            <div className="mobile-menuSocial_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
