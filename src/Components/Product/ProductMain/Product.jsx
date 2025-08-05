import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { translations } from "../../../translations/Mongolian";

import product1 from "../../../Assets/ProductDetail/productDetail1.png";
import product2 from "../../../Assets/ProductDetail/productDetail2.png";
import product3 from "../../../Assets/ProductDetail/productdetail-3.jpg";
import product4 from "../../../Assets/ProductDetail/productdetail-4.jpg";

import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import JerseyCustomization from "../JerseyCustomization/JerseyCustomization";
import CustomJerseyPopover from "../CustomJerseyPopover/CustomJerseyPopover";

import "./Product.css";

const Product = () => {
  // Product images Gallery

  const productImg = [product1, product2, product3, product4];
  const [currentImg, setCurrentImg] = useState(0);

  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? productImg.length - 1 : currentImg - 1);
  };

  const nextImg = () => {
    setCurrentImg(currentImg === productImg.length - 1 ? 0 : currentImg + 1);
  };

  // Product Colors
  const [highlightedColor, setHighlightedColor] = useState("#C8393D");
  const colors = ["#222222", "#C8393D", "#E4E4E4"];
  const colorsName = ["Black", "Red", "Grey"];
  
  // Product Detail to Redux
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Product Customization State
  const [customization, setCustomization] = useState(null);
  const [isCustomized, setIsCustomized] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  // Handle customization complete
  const handleCustomizationComplete = (customizationData) => {
    console.log("Customization data received:", customizationData);
    
    // Transform the data structure if needed for the 3D model
    const updatedData = {
      ...customizationData,
      color: highlightedColor || "#C8393D", // Use the color selected in product view
      
      // For the 3D preview, we'll use the first jersey's customization data
      // or fallback to the legacy format if jerseys array isn't available
      playerName: customizationData.jerseys && customizationData.jerseys.length > 0 ? 
                 (customizationData.jerseys[0].front?.addName ? customizationData.jerseys[0].front.name : 
                  customizationData.jerseys[0].back?.addName ? customizationData.jerseys[0].back.name : '') :
                 (customizationData.front?.addName ? customizationData.front.name : 
                  customizationData.back?.addName ? customizationData.back.name : ''),
      
      // Extract player number from appropriate side (front or back) of first jersey
      playerNumber: customizationData.jerseys && customizationData.jerseys.length > 0 ?
                   (customizationData.jerseys[0].front?.addNumber ? customizationData.jerseys[0].front.number : 
                    customizationData.jerseys[0].back?.addNumber ? customizationData.jerseys[0].back.number : '') :
                   (customizationData.front?.addNumber ? customizationData.front.number : 
                    customizationData.back?.addNumber ? customizationData.back.number : ''),
      
      // Handle logo (use the first available logo)
      logoPreview: customizationData.jerseys && customizationData.jerseys.length > 0 ?
                  (customizationData.jerseys[0].front?.addLogo ? customizationData.jerseys[0].front.logo : 
                   customizationData.jerseys[0].back?.addLogo ? customizationData.jerseys[0].back.logo : null) :
                  (customizationData.front?.addLogo ? customizationData.front.logo : 
                   customizationData.back?.addLogo ? customizationData.back.logo : null)
    };

    setCustomization(updatedData);
    setIsCustomized(true);
    setShowPopover(true); // Show the popover immediately if needed
    toast.success("Customization applied!");
  };

  const handleViewCustomizedJersey = () => {
    if (isCustomized) {
      setShowPopover(true);
    } else {
      toast.error(translations.customizationRequired || "Please customize your jersey first", {
        duration: 2000
      });
    }
  };

  const handleAddToCart = () => {
    if (!isCustomized) {
      toast.error(translations.customizationRequired || "Please customize your jersey first");
      return;
    }
    
    const productDetails = {
      productID: 14,
      productName: "Lightweight Puffer Jacket",
      productPrice: 90,
      frontImg: productImg[0],
      productReviews: "8k+ reviews",
      size: customization.size,
      quantity: customization.quantity,
      customization,
    };

    const productInCart = cartItems.find(
      (item) => item.productID === productDetails.productID
    );

    if (productInCart && productInCart.quantity >= 20) {
      toast.error(translations.productLimitReached, {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    } else if (productInCart && productInCart.quantity + 1 > 20) {
      toast.error(
        `${translations.canAddOnly} ${20 - productInCart.quantity} ${translations.morePieces}`,
        {
          duration: 2000,
        }
      );
    } else {
      dispatch(addToCart(productDetails));
      toast.success(translations.addedToCart, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    }
  };

  return (
    <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              {productImg.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  onClick={() => setCurrentImg(index)}
                  className={currentImg === index ? "active" : ""}
                  alt={`Product thumbnail ${index + 1}`}
                />
              ))}
            </div>

            <div className="productFullImg">
              <img src={productImg[currentImg]} alt="Product" />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            
            <div className="productName">
              <h1>Baller men's basketball shorts</h1>
            </div>
            <div className="productRating">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <p>8k+ {translations.reviews}</p>
            </div>
            <div className="productPrice">
              <h3>$90</h3>
            </div>
            <div className="productDescription">
              <p>
                Our Baller men's basketball shorts combine lightweight feel and durability with an unbeatable design. The breathable fabric will keep you cool and dry so you can focus on the game.
              </p>
            </div>
            <div className="productColor">
              <p>{translations.color || "Color"}</p>
              <div className="colorBtn">
                {colors.map((color, index) => (
                  <Tooltip
                    key={color}
                    title={colorsName[index]}
                    placement="top"
                    enterTouchDelay={0}
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <button
                      className={highlightedColor === color ? "highlighted" : ""}
                      style={{
                        backgroundColor: color,
                        border: highlightedColor === color
                          ? "0px solid #000"
                          : "0px solid white",
                        padding: "8px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setHighlightedColor(color)}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>

            {isCustomized && (
              <div className="customization-actions">
                <span className="cart-success-note">{translations.customizationApplied}</span>
                <div className="action-buttons">
                  <button 
                    className="view-customized-jersey" 
                    onClick={handleViewCustomizedJersey}
                  >
                    {translations.viewCustomizedJersey || "Зохион байгуулсан жэрсийг харах"}
                  </button>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={handleAddToCart}
                  >
                    {translations.addCustomizedJerseyToCart || "Сагсанд нэмэх"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Jersey Customization Section - moved outside productShowCase for full width */}
        <div className="customizationContainer full-width">
          <JerseyCustomization onCustomizationComplete={handleCustomizationComplete} />
        </div>
      </div>
      {/* Customized Jersey Popover */}
      <CustomJerseyPopover 
        isOpen={showPopover} 
        onClose={() => setShowPopover(false)} 
        customizationData={customization} 
      />
    </>
  );
};

export default Product;
