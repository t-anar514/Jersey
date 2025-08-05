import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./HeroSection.css";
import { Model } from "../../Model/Model";
import { Link } from "react-router-dom";
import { translations } from "../../../translations/Mongolian";

const HeroSection = () => {
  const [tshirtColor, setTshirtColor] = useState("red");

  const changeColor = (color) => {
    setTshirtColor(color);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="heroMain">
        <div className="sectionleft">
          <div className="hero-badge">JERSEY.MN</div>
          <h1>{translations.heroMainText} <span>Jersey.mn </span> {translations.heroMainEnd}</h1>
          <p className="hero-description">{translations.heroDescription}</p>
          
          <div className="hero-buttons">
         
            <Link to="/shop" className="secondary-button" onClick={scrollToTop}>
              {translations.shopJerseys}
            </Link>
          </div>
          
          <div className="hero-features">
            <div className="hero-feature">
              <div className="feature-icon">✓</div>
              <span>{translations.customizableText}</span>
            </div>
            <div className="hero-feature">
              <div className="feature-icon">✓</div>
              <span>{translations.highQualityMaterials}</span>
            </div>
            <div className="hero-feature">
              <div className="feature-icon">✓</div>
              <span>{translations.fastProduction}</span>
            </div>
          </div>
        </div>
        <div className="sectionright">
          <Canvas
            className="canvasModel"
            camera={{ position: [0, 5, 15], fov: 50 }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={2.5}
              color={"white"}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minAzimuthAngle={-Infinity}
              maxAzimuthAngle={Infinity}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />

            <Model color={tshirtColor} />
          </Canvas>
          <div className="heroColorBtn">
            <button
              onClick={() => changeColor("#C8393D")}
              style={{ backgroundColor: "#C8393D" }}
              className={tshirtColor === "#C8393D" ? "active" : ""}
            ></button>
            <button
              onClick={() => changeColor("#222222")}
              style={{ backgroundColor: "#222222" }}
              className={tshirtColor === "#222222" ? "active" : ""}
            ></button>
            <button
              onClick={() => changeColor("#1C4C96")}
              style={{ backgroundColor: "#1C4C96" }}
              className={tshirtColor === "#1C4C96" ? "active" : ""}
            ></button>
            <button
              onClick={() => changeColor("#E4E4E4")}
              style={{ backgroundColor: "#E4E4E4" }}
              className={tshirtColor === "#E4E4E4" ? "active" : ""}
            ></button>
          </div>
          <div className="hero-customize-now">
            <Link to="/customize" onClick={scrollToTop}>
              {translations.customizeThisJersey} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
