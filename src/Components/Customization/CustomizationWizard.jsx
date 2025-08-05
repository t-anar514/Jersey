import React, { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import "./CustomizationWizard.css";
import { translations } from "../../translations/Mongolian";
import { toast } from "react-hot-toast";
import { Model } from "../Model/Model";
import { addToCart } from "../../redux/slices/cartSlice";
import Confetti from 'react-confetti';

// Use placeholder images instead of local files
const basketballTemplate = "https://via.placeholder.com/300x300/FF5733/FFFFFF?text=Basketball+Jersey";
const footballTemplate = "https://via.placeholder.com/300x300/33A1FF/FFFFFF?text=Football+Jersey";
const volleyballTemplate = "https://via.placeholder.com/300x300/33FF57/FFFFFF?text=Volleyball+Jersey";
const esportsTemplate = "https://via.placeholder.com/300x300/A133FF/FFFFFF?text=Esports+Jersey";

// Loading spinner component for 3D model
const LoadingSpinner = () => (
  <Html center>
    <div className="preview-loading">
      <div className="preview-loading-spinner"></div>
    </div>
  </Html>
);

// Jersey Preview component with enhanced controls
const JerseyPreview = ({ color, playerName, playerNumber, onColorChange, autoRotate = true, highQuality = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewAngle, setViewAngle] = useState('front'); // 'front' or 'back'
  
  // Predefined jersey colors
  const jerseyColors = [
    { id: 'red', color: '#C8393D' },
    { id: 'blue', color: '#2A4B8D' },
    { id: 'black', color: '#222222' },
    { id: 'white', color: '#FFFFFF' },
    { id: 'green', color: '#00843D' },
    { id: 'purple', color: '#552583' },
  ];
  
  useEffect(() => {
    // Simulate loading time for the model
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="jersey-preview-wrapper">
      <Canvas
        camera={{ position: [0, 0, 15], fov: highQuality ? 40 : 50 }}
        className="jersey-preview-canvas"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="white" />
        <OrbitControls
          enableZoom={true}
          maxZoom={1.5}
          minZoom={0.8}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          autoRotate={autoRotate && isLoading}
          autoRotateSpeed={4}
        />
        <Suspense fallback={<LoadingSpinner />}>
          <Model 
            color={color || "#C8393D"} 
            playerName={playerName || ""} 
            playerNumber={playerNumber || ""} 
            viewAngle={viewAngle}
          />
        </Suspense>
      </Canvas>
      
      {onColorChange && (
        <div className="jersey-color-controls">
          {jerseyColors.map((jerseyColor) => (
            <div 
              key={jerseyColor.id}
              className={`color-option ${color === jerseyColor.color ? 'active' : ''}`}
              style={{ backgroundColor: jerseyColor.color, border: jerseyColor.color === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
              onClick={() => onColorChange(jerseyColor.color)}
            />
          ))}
        </div>
      )}
      
      {isLoading && (
        <div className="preview-loading">
          <div className="preview-loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

// Step One: Choose a Sport
const StepOne = ({ onSelectSport, selectedSport }) => {
  const sports = [
    { id: "basketball", name: translations.basketball, image: basketballTemplate },
    { id: "football", name: translations.football, image: footballTemplate },
    { id: "volleyball", name: translations.volleyball, image: volleyballTemplate },
    { id: "esports", name: translations.esports, image: esportsTemplate },
  ];

  return (
    <div className="step-container">
      <h2 className="step-title">{translations.chooseSport}</h2>
      <div className="sport-options">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className={`sport-option ${selectedSport === sport.id ? "selected" : ""}`}
            onClick={() => onSelectSport(sport.id)}
          >
            <img src={sport.image} alt={sport.name} />
            <h3>{sport.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step Two: Choose a Team
const StepTwo = ({ onSelectTeam, selectedTeam, sport }) => {
  // Mock teams data - would typically come from an API or database
  const teamsData = {
    basketball: [
      { id: "wolves", name: "Mongolian Wolves", logo: "wolves-logo.png" },
      { id: "eagles", name: "UB Eagles", logo: "eagles-logo.png" },
      { id: "nomads", name: "Steppe Nomads", logo: "nomads-logo.png" },
      { id: "hawks", name: "Desert Hawks", logo: "hawks-logo.png" },
    ],
    football: [
      { id: "warriors", name: "Warrior FC", logo: "warriors-logo.png" },
      { id: "united", name: "UB United", logo: "united-logo.png" },
      { id: "riders", name: "Steppe Riders", logo: "riders-logo.png" },
      { id: "national", name: "Mongolia National", logo: "national-logo.png" },
    ],
    volleyball: [
      { id: "stars", name: "UB Stars", logo: "stars-logo.png" },
      { id: "champions", name: "Champions VC", logo: "champions-logo.png" },
      { id: "spikers", name: "Mongolian Spikers", logo: "spikers-logo.png" },
      { id: "power", name: "Power VC", logo: "power-logo.png" },
    ],
    esports: [
      { id: "dragons", name: "Gobi Dragons", logo: "dragons-logo.png" },
      { id: "empire", name: "Mongol Empire", logo: "empire-logo.png" },
      { id: "legends", name: "UB Legends", logo: "legends-logo.png" },
      { id: "warriors", name: "Digital Warriors", logo: "digital-logo.png" },
    ],
  };

  const teams = teamsData[sport] || [];

  return (
    <div className="step-container">
      <h2 className="step-title">{translations.chooseTeam}</h2>
      <div className="team-options">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`team-option ${selectedTeam === team.id ? "selected" : ""}`}
            onClick={() => onSelectTeam(team.id)}
          >
            <div className="team-logo">
              {team.logo && <img src={`/team-logos/${team.logo}`} alt={team.name} />}
            </div>
            <h3>{team.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step Three: Customize Jersey
const StepThree = ({ 
  onColorChange, 
  onPlayerNameChange, 
  onPlayerNumberChange, 
  color, 
  playerName, 
  playerNumber 
}) => {
  return (
    <div className="step-container">
      <h2 className="step-title">{translations.customizeJersey}</h2>
      <div className="customization-container">
        <div className="customization-preview">
          <JerseyPreview 
            color={color} 
            playerName={playerName} 
            playerNumber={playerNumber} 
            onColorChange={onColorChange} 
          />
        </div>
        <div className="customization-controls">
          <div className="control-group">
            <label>{translations.jerseyColor}</label>
          </div>
          <div className="control-group">
            <label htmlFor="playerName">{translations.playerName}</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => onPlayerNameChange(e.target.value)}
              maxLength={12}
              placeholder={translations.enterName}
            />
          </div>
          <div className="control-group">
            <label htmlFor="playerNumber">{translations.playerNumber}</label>
            <input
              type="number"
              id="playerNumber"
              value={playerNumber}
              onChange={(e) => onPlayerNumberChange(e.target.value)}
              min="0"
              max="99"
              placeholder={translations.enterNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Four: Select Material & Size
const StepFour = ({ onMaterialChange, onSizeChange, selectedMaterial, selectedSize }) => {
  const materials = [
    { id: "pro", name: translations.proPerformance, price: 120 },
    { id: "standard", name: translations.standardEdition, price: 90 },
    { id: "fan", name: translations.fanReplica, price: 70 },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];

  return (
    <div className="step-container">
      <h2 className="step-title">{translations.selectMaterialSize}</h2>
      
      <div className="option-section">
        <h3>{translations.material}</h3>
        <div className="material-options">
          {materials.map((material) => (
            <div
              key={material.id}
              className={`material-option ${selectedMaterial === material.id ? "selected" : ""}`}
              onClick={() => onMaterialChange(material.id)}
            >
              <h4>{material.name}</h4>
              <p className="price">${material.price}</p>
              <div className="material-details">
                {material.id === "pro" && (
                  <p>{translations.proPerformanceDesc}</p>
                )}
                {material.id === "standard" && (
                  <p>{translations.standardEditionDesc}</p>
                )}
                {material.id === "fan" && (
                  <p>{translations.fanReplicaDesc}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="option-section">
        <h3>{translations.size}</h3>
        <div className="size-options">
          {sizes.map((size) => (
            <div
              key={size}
              className={`size-option ${selectedSize === size ? "selected" : ""}`}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </div>
          ))}
        </div>
        <p className="size-guide">{translations.sizeGuide}</p>
      </div>
    </div>
  );
};

// Step Five: Review & Order
const StepFive = ({ 
  sport, 
  team, 
  color, 
  playerName, 
  playerNumber, 
  material, 
  size, 
  onAddToCart 
}) => {
  const materialPrices = {
    pro: 120,
    standard: 90,
    fan: 70
  };

  const materialNames = {
    pro: translations.proPerformance,
    standard: translations.standardEdition,
    fan: translations.fanReplica
  };

  const price = materialPrices[material] || 90;

  return (
    <div className="step-container">
      <h2 className="step-title">{translations.reviewOrder}</h2>
      <div className="review-container">
        <div className="review-preview">
          <JerseyPreview 
            color={color}
            playerName={playerName}
            playerNumber={playerNumber}
            autoRotate={false}
            highQuality={true}
          />
        </div>
        <div className="review-details">
          <h3>{translations.orderSummary}</h3>
          <div className="summary-item">
            <span>{translations.sport}:</span>
            <span>{sport}</span>
          </div>
          <div className="summary-item">
            <span>{translations.team}:</span>
            <span>{team}</span>
          </div>
          <div className="summary-item">
            <span>{translations.material}:</span>
            <span>{materialNames[material]}</span>
          </div>
          <div className="summary-item">
            <span>{translations.size}:</span>
            <span>{size}</span>
          </div>
          {playerName && (
            <div className="summary-item">
              <span>{translations.playerName}:</span>
              <span>{playerName}</span>
            </div>
          )}
          {playerNumber && (
            <div className="summary-item">
              <span>{translations.playerNumber}:</span>
              <span>{playerNumber}</span>
            </div>
          )}
          <div className="summary-price">
            <span>{translations.price}:</span>
            <span>${price}</span>
          </div>
          <button className="order-button" onClick={onAddToCart}>
            {translations.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main CustomizationWizard Component
const CustomizationWizard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for current step
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  
  // Jersey customization state
  const [sport, setSport] = useState("");
  const [team, setTeam] = useState("");
  const [color, setColor] = useState("#C8393D");
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [material, setMaterial] = useState("standard");
  const [size, setSize] = useState("L");

  // Handle step transitions
  const goToNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const goToPrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Handler for sport selection
  const handleSelectSport = (sportId) => {
    setSport(sportId);
    setTeam("");
    setTimeout(() => goToNextStep(), 300); // Slight delay for visual feedback
  };

  // Handler for team selection
  const handleSelectTeam = (teamId) => {
    setTeam(teamId);
    setTimeout(() => goToNextStep(), 300);
  };

  // Add to cart handler
  const handleAddToCart = useCallback(() => {
    setAddingToCart(true);
    
    // Prepare product data for cart
    const productData = {
      productID: `jersey-${sport}-${team}-${Date.now()}`,
      productName: `${team} ${translations.customJersey}`,
      productPrice: material === "pro" ? 120 : material === "standard" ? 90 : 70,
      productImage: "/path/to/jersey-thumbnail.jpg", // This should be dynamically generated
      productColor: color,
      productSize: size,
      productCustomization: {
        playerName,
        playerNumber,
        color,
        sport,
        team,
        material
      }
    };
    
    // Simulate processing time
    setTimeout(() => {
      dispatch(addToCart(productData));
      setShowConfetti(true);
      toast.success(translations.addedToCart);
      setAddingToCart(false);
      
      // Close wizard after delay or redirect
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
    }, 800);
  }, [sport, team, color, playerName, playerNumber, material, size, dispatch, navigate]);

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne onSelectSport={handleSelectSport} selectedSport={sport} />
        );
      case 2:
        return (
          <StepTwo 
            onSelectTeam={handleSelectTeam} 
            selectedTeam={team} 
            sport={sport} 
          />
        );
      case 3:
        return (
          <StepThree 
            onColorChange={setColor}
            onPlayerNameChange={setPlayerName}
            onPlayerNumberChange={setPlayerNumber}
            color={color}
            playerName={playerName}
            playerNumber={playerNumber}
          />
        );
      case 4:
        return (
          <StepFour 
            onMaterialChange={setMaterial}
            onSizeChange={setSize}
            selectedMaterial={material}
            selectedSize={size}
          />
        );
      case 5:
        return (
          <StepFive 
            sport={sport}
            team={team}
            color={color}
            playerName={playerName}
            playerNumber={playerNumber}
            material={material}
            size={size}
            onAddToCart={handleAddToCart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="customization-wizard">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="wizard-header">
        <h1>{translations.customizeYourJersey}</h1>
        <div className="progress-indicator">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`step-indicator ${currentStep >= step ? "active" : ""} ${currentStep === step ? "current" : ""}`}
              onClick={() => currentStep > step && setCurrentStep(step)}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="wizard-content">
        {renderStep()}
      </div>

      <div className="wizard-controls">
        {currentStep > 1 && (
          <button className="prev-button" onClick={goToPrevStep} disabled={addingToCart}>
            {translations.previous}
          </button>
        )}
        
        {currentStep < 5 && (
          <button 
            className="next-button" 
            onClick={goToNextStep}
            disabled={
              (currentStep === 1 && !sport) || 
              (currentStep === 2 && !team) || 
              addingToCart
            }
          >
            {translations.next}
          </button>
        )}
      </div>
      
      {addingToCart && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>{translations.addingToCart}</p>
        </div>
      )}
    </div>
  );
};

export default CustomizationWizard;
