import React from "react";
import "./Services.css";
import { translations } from "../../../translations/Mongolian";

import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiShieldCheckLine } from "react-icons/ri";

const Services = () => {
  return (
    <>
      <div className="services">
        <div className="services">
          <div className="serviceBox">
            <FaCartFlatbedSuitcase size={50} style={{ marginBottom: "20px" }} />
            <h3>{translations.fastFreeDelivery}</h3>
            <p>{translations.freeDelivery}</p>
          </div>
          <div className="serviceBox">
            <TfiHeadphoneAlt size={50} style={{ marginBottom: "20px" }} />
            <h3>{translations.customerSupport}</h3>
            <p>{translations.friendlySupport}</p>
          </div>
          <div className="serviceBox">
            <RiShieldCheckLine size={50} style={{ marginBottom: "20px" }} />
            <h3>{translations.moneyBack}</h3>
            <p>{translations.moneyBackGuarantee}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
