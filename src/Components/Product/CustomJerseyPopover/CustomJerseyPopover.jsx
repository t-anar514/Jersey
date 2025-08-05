import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Model } from "../../Model/Model";
import './CustomJerseyPopover.css';

const CustomJerseyPopover = ({ isOpen, onClose, customizationData }) => {
  const [tshirtColor, setTshirtColor] = useState("red");
  const [viewMode, setViewMode] = useState("back"); // Default to back view to show name

  // Update the jersey color based on customization data
  useEffect(() => {
    if (customizationData && customizationData.color) {
      setTshirtColor(customizationData.color);
    }
    
    // If there's a player name, default to back view to show it
    if (customizationData && customizationData.name) {
      setViewMode("back");
    } else {
      // Otherwise default to front view
      setViewMode("front");
    }
  }, [customizationData]);

  // If popover is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="custom-jersey-popover-overlay">
      <div className="custom-jersey-popover">
        <div className="popover-header">
          <h3>Your Customized Jersey</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="popover-content">
          <div className="jersey-viewer">
            
            <Canvas
              camera={{ position: [0, 0, viewMode === "back" ? -15 : 15], fov: 50 }}
              style={{ height: "400px", width: "100%" }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={2}
                color={"white"}
              />
              <directionalLight
                position={[-10, 10, -5]}
                intensity={1.5}
                color={"white"}
              />

              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />

              <Suspense fallback={<Html center><div className="loading">Loading...</div></Html>}>
                <Model 
                  color={tshirtColor} 
                  playerName={customizationData?.name} 
                  playerNumber={customizationData?.number} 
                />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="jersey-details">
            {customizationData && (
              <>
                <h4>Customization Details</h4>
                <ul>
                  <li><strong>Material:</strong> {customizationData.material}</li>
                  {customizationData.name && <li><strong>Name:</strong> {customizationData.name}</li>}
                  {customizationData.number && <li><strong>Number:</strong> {customizationData.number}</li>}
                  <li><strong>Side:</strong> {customizationData.side}</li>
                </ul>
                {customizationData.logo && (
                  <div className="logo-preview">
                    <p><strong>Your Logo:</strong></p>
                    <img src={customizationData.logo} alt="Team logo" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomJerseyPopover;
