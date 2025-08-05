import React, { useState } from "react";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotalAmount,
} from "../../Features/Cart/cartSlice";

import { MdOutlineClose } from "react-icons/md";

import { Link } from "react-router-dom";
import success from "../../Assets/success.png";
import { translations } from "../../translations/Mongolian";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("QPAY");
  const [shippingOption, setShippingOption] = useState("shipping");
  const pickupLocation = {
    name: "Ulaanbaatar Store",
    address: "Ulaanbaatar, Sukhbaatar District",
  };

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) {
      setActiveTab(tab);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1 && quantity <= 20) {
      dispatch(updateQuantity({ productID: productId, quantity: quantity }));
    }
  };

  const totalPrice = useSelector(selectCartTotalAmount);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // current Date

  const currentDate = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Random number

  const orderNumber = Math.floor(Math.random() * 100000);

  // Radio Button Data

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleShippingOptionChange = (e) => {
    setShippingOption(e.target.value);
  };

  return (
    <>
      <div className="shoppingCartSection">
        <h2>{translations.cart}</h2>

        <div className="shoppingCartTabsContainer">
          <div className={`shoppingCartTabs ${activeTab}`}>
            <button
              className={activeTab === "cartTab1" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab1");
                setPayments(false);
              }}
            >
              <div className="shoppingCartTabsNumber">
                <h3>01</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>{translations.shoppingBag}</h3>
                  <p>{translations.manageItems}</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab2" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab2");
                setPayments(false);
              }}
              disabled={cartItems.length === 0}
            >
              <div className="shoppingCartTabsNumber">
                <h3>02</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>{translations.checkout}</h3>
                  <p>{translations.reviewOrder}</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab3" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab3");
              }}
              disabled={cartItems.length === 0 || payments === false}
            >
              <div className="shoppingCartTabsNumber">
                <h3>03</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>{translations.submitOrder}</h3>
                  <p>{translations.submitOrder}</p>
                </div>
              </div>
            </button>
          </div>
          <div className="shoppingCartTabsContent">
            {/* tab1 */}
            {activeTab === "cartTab1" && (
              <div className="shoppingBagSection">
                <div className="shoppingBagTableSection">
                  {/* For Desktop Devices */}
                  <table className="shoppingBagTable">
                    <thead>
                      <tr>
                        <th>{translations.products}</th>
                        <th></th>
                        <th>{translations.price}</th>
                        <th>{translations.quantity}</th>
                        <th>{translations.subtotal}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                          <tr key={item.productID}>
                            <td data-label="Product">
                              <div className="shoppingBagTableImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                            </td>
                            <td data-label="">
                              <div className="shoppingBagTableProductDetail">
                                <Link to="/product" onClick={scrollToTop}>
                                  <h4>{item.productName}</h4>
                                </Link>
                                <p>{item.productReviews}</p>
                              </div>
                            </td>
                            <td
                              data-label="Price"
                              style={{ textAlign: "center" }}
                            >
                              ${item.productPrice}
                            </td>
                            <td data-label="Quantity">
                              <div className="ShoppingBagTableQuantity">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.productID,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  min="1"
                                  max="20"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item.productID,
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.productID,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td data-label="Subtotal">
                              <p
                                style={{
                                  textAlign: "center",
                                  fontWeight: "500",
                                }}
                              >
                                ${item.quantity * item.productPrice}
                              </p>
                            </td>
                            <td data-label="">
                              <MdOutlineClose
                                onClick={() =>
                                  dispatch(removeFromCart(item.productID))
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="shoppingCartEmpty">
                              <span>{translations.emptyCart}</span>
                              <Link to="/shop" onClick={scrollToTop}>
                                <button>{translations.shopNow}</button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                   
                  </table>

                  {/* For Mobile devices */}

                  <div className="shoppingBagTableMobile">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.productID}>
                            <div className="shoppingBagTableMobileItems">
                              <div className="shoppingBagTableMobileItemsImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                              <div className="shoppingBagTableMobileItemsDetail">
                                <div className="shoppingBagTableMobileItemsDetailMain">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <h4>{item.productName}</h4>
                                  </Link>
                                  <p>{item.productReviews}</p>
                                  <div className="shoppingBagTableMobileQuantity">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity - 1
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      min="1"
                                      max="20"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.productID,
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity + 1
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span>${item.productPrice}</span>
                                </div>
                                <div className="shoppingBagTableMobileItemsDetailTotal">
                                  <MdOutlineClose
                                    size={20}
                                    onClick={() =>
                                      dispatch(removeFromCart(item.productID))
                                    }
                                  />
                                  <p>${item.quantity * item.productPrice}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                      </>
                    ) : (
                      <div className="shoppingCartEmpty">
                        <span>Your cart is empty!</span>
                        <Link to="/shop" onClick={scrollToTop}>
                          <button>Shop Now</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="shoppingBagTotal">
                  <h3>{translations.cartTotals}</h3>
                  <table className="shoppingBagTotalTable">
                    <tbody>
                      <tr>
                        <th>{translations.subtotal}</th>
                        <td>${totalPrice.toFixed(2)}</td>
                      </tr>
                      {shippingOption === "shipping" && (
                        <tr>
                          <th>{translations.shipping}</th>
                          <td>
                            <div className="shoppingBagTotalTableCheck">
                              <p>${(totalPrice === 0 ? 0 : 5).toFixed(2)}</p>
                              
                              <p
                                onClick={scrollToTop}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                               Сонголтоор
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <th>{translations.vat}</th>
                        <td>${(totalPrice === 0 ? 0 : 11).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>{translations.total}</th>
                        <td>
                          ${(totalPrice === 0 ? 0 : totalPrice + (shippingOption === "shipping" ? 16 : 11)).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="shippingOptions">
                    <label>
                      <input 
                        type="radio" 
                        name="shippingOption" 
                        value="shipping" 
                        checked={shippingOption === "shipping"}
                        onChange={handleShippingOptionChange}
                      />
                      <div>
                        <span>{translations.shipping}</span>
                       
                      </div>
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="shippingOption" 
                        value="pickup" 
                        checked={shippingOption === "pickup"}
                        onChange={handleShippingOptionChange}
                      />
                      <div>
                        <span>{translations.pickup}</span>
                        <p>{translations.pickupDescription}</p>
                      </div>
                    </label>
                  </div>
                  {shippingOption === "pickup" && (
                    <div className="pickupLocationSelector">
                      <h4>{translations.pickupLocation}</h4>
                      <p>{pickupLocation.name} - {pickupLocation.address}</p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      handleTabClick("cartTab2");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={cartItems.length === 0}
                  >
                    {translations.proceedToCheckout}
                  </button>
                </div>
              </div>
            )}

            {/* tab2 */}
            {activeTab === "cartTab2" && (
              <div className="checkoutSection">
                <div className="checkoutDetailsSection">
                  <h4>{translations.billingDetails}</h4>
                  <div className="checkoutDetailsForm">
                    <form>
                      <div className="checkoutDetailsFormRow">
                        <input type="text" placeholder={translations.lastName} />
                      </div>
                     
                   
                      <input type="text" placeholder={translations.streetAddress} />
                      <input type="text" placeholder={translations.phone} />
                      
                      <textarea
                        cols={30}
                        rows={8}
                        placeholder={translations.orderNotes}
                      />
                    </form>
                  </div>
                </div>
                <div className="checkoutPaymentSection">
                  <div className="checkoutTotalContainer">
                    <h3>Your Order</h3>
                    <div className="checkoutItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr>
                              <td>
                                {items.productName} x {items.quantity}
                              </td>
                              <td>${items.productPrice * items.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="checkoutTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>${totalPrice.toFixed(2)}</td>
                          </tr>
                          {shippingOption === "shipping" && (
  <tr>
    <th>Shipping</th>
    <td>$5</td>
  </tr>
)}
                          <tr>
                            <th>VAT</th>
                            <td>$11</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              $
                              ${(totalPrice === 0 ? 0 : totalPrice + (shippingOption === "shipping" ? 16 : 11)).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="checkoutPaymentContainer">
                
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="QPay"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>{translations.qpay}</span>
                       
                      </div>
                    </label>
                    
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Захиалгыг авах үед төлбөрөө хий"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>{translations.cashOnDelivery}</span>
                       
                      </div>
                    </label>
                    <div className="policyText">
                      {translations.policy}
                      <Link to="/terms" onClick={scrollToTop}>
                        {translations.privacyPolicy}
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleTabClick("cartTab3");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setPayments(true);
                    }}
                  >
                   Төлбөрөө баталгаажуулах
                  </button>
                </div>
              </div>
            )}

            {/* tab3 */}
            {activeTab === "cartTab3" && (
              <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" />
                    </div>
                    <h3>Your order is completed!</h3>
                    <p>Thank you. Your order has been received.</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>Order Number</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Date</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Total</p>
                      <h4>${totalPrice.toFixed(2)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Payment Method</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                  <div className="orderTotalContainer">
                    <h3>Order Details</h3>
                    <div className="orderItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTS</th>
                            <th>SUBTOTALS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr>
                              <td>
                                {items.productName} x {items.quantity}
                              </td>
                              <td>${items.productPrice * items.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="orderTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>${totalPrice.toFixed(2)}</td>
                          </tr>
                          {shippingOption === "shipping" && (
  <tr>
    <th>Shipping</th>
    <td>$5</td>
  </tr>
)}
                          <tr>
                            <th>VAT</th>
                            <td>$11</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              $
                              ${(totalPrice === 0 ? 0 : totalPrice + (shippingOption === "shipping" ? 16 : 11)).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
