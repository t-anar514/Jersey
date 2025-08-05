import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './JerseyCustomization.css';
import { translations } from '../../../translations/Mongolian.js';
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { FaCheck, FaChevronLeft, FaChevronRight, FaInfoCircle, FaTimes } from 'react-icons/fa';

// Component for size guide popover
const SizeGuide = ({ onClose }) => (
  <div className="size-guide-overlay">
    <div className="size-guide-popover">
      <div className="size-guide-header">
        <h3>{translations.sizeGuide || "Хэмжээний заавар"}</h3>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>
      <div className="size-guide-content">
        <table className="size-chart">
          <thead>
            <tr>
              <th>{translations.heightWeight || "Жин / Өндөр"}</th>
              <th>155см</th>
              <th>160см</th>
              <th>165см</th>
              <th>170см</th>
              <th>175см</th>
              <th>180см</th>
              <th>185см</th>
              <th>190см</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>40кг</td>
              <td className="xs-cell">XS</td>
              <td className="xs-cell">XS</td>
              <td className="s-cell">S</td>
              <td className="s-cell">S</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>45кг</td>
              <td className="xs-cell">XS</td>
              <td className="s-cell">S</td>
              <td className="s-cell">S</td>
              <td className="s-cell">S</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>50кг</td>
              <td className="s-cell">S</td>
              <td className="s-cell">S</td>
              <td className="s-cell">S</td>
              <td className="s-cell">S</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>55кг</td>
              <td className="s-cell">S</td>
              <td className="s-cell">S</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>60кг</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="l-cell">L</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>65кг</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="m-cell">M</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
            </tr>
            <tr>
              <td>70кг</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="l-cell">L</td>
              <td className="xl-cell">XL</td>
            </tr>
            <tr>
              <td>75кг</td>
              <td>-</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
            </tr>
            <tr>
              <td>80кг</td>
              <td>-</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
              <td className="xl-cell">XL</td>
            </tr>
            <tr>
              <td>85кг</td>
              <td>-</td>
              <td>-</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
            </tr>
            <tr>
              <td>90кг</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
              <td className="xxl-cell">XXL</td>
            </tr>
          </tbody>
        </table>
        <button onClick={onClose} className="close-guide-btn">
          {translations.close || "Хаах"}
        </button>
      </div>
    </div>
  </div>
);

const JerseyCustomization = ({ onCustomizationComplete }) => {
  // Define all sizes
  const sizes = ["XS", "S", "M", "L", "XL"];
  const sizesFullName = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];
  
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const totalSteps = 5;
  
  // Step 1: Color & Quantity
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("red"); // Default color, will be overridden by parent component
  
  // Step 2: Size Distribution
  const [sizeDistribution, setSizeDistribution] = useState({
    XS: 0,
    S: 0,
    M: 1, // Default to 1 medium
    L: 0,
    XL: 0
  });
  
  // Step 3: Print Side Selection
  const [selectedSides, setSelectedSides] = useState({
    front: true,
    back: false
  });
  
  // Step 4: Customization Details
  const [frontCustomization, setFrontCustomization] = useState({
    addName: false,
    names: [''],  // Array of names for multiple jerseys
    addNumber: false,
    numbers: [''],  // Array of numbers for multiple jerseys
    addLogo: false,
    logo: null,
    sameForAll: true  // Flag to indicate if all jerseys should have the same customization
  });
  
  const [backCustomization, setBackCustomization] = useState({
    addName: false,
    names: [''],  // Array of names for multiple jerseys
    addNumber: false,
    numbers: [''],  // Array of numbers for multiple jerseys
    addLogo: false,
    logo: null,
    sameForAll: true  // Flag to indicate if all jerseys should have the same customization
  });
  
  // Initialize or update arrays when quantity changes
  useEffect(() => {
    if (quantity > 0) {
      // Update front customization names/numbers arrays
      setFrontCustomization(prev => {
        const newNames = [...prev.names];
        const newNumbers = [...prev.numbers];
        
        // Adjust array size to match quantity
        while (newNames.length < quantity) {
          newNames.push(newNames[0] || '');
        }
        while (newNames.length > quantity) {
          newNames.pop();
        }
        
        while (newNumbers.length < quantity) {
          newNumbers.push(newNumbers[0] || '');
        }
        while (newNumbers.length > quantity) {
          newNumbers.pop();
        }
        
        return {
          ...prev,
          names: newNames,
          numbers: newNumbers
        };
      });
      
      // Update back customization names/numbers arrays
      setBackCustomization(prev => {
        const newNames = [...prev.names];
        const newNumbers = [...prev.numbers];
        
        // Adjust array size to match quantity
        while (newNames.length < quantity) {
          newNames.push(newNames[0] || '');
        }
        while (newNames.length > quantity) {
          newNames.pop();
        }
        
        while (newNumbers.length < quantity) {
          newNumbers.push(newNumbers[0] || '');
        }
        while (newNumbers.length > quantity) {
          newNumbers.pop();
        }
        
        return {
          ...prev,
          names: newNames,
          numbers: newNumbers
        };
      });
    }
  }, [quantity]);
  
  // File upload references
  const frontLogoInputRef = useRef(null);
  const backLogoInputRef = useRef(null);
  
  // Size distribution validation
  const [sizeError, setSizeError] = useState('');
  
  // Validate that size distribution adds up to total quantity
  useEffect(() => {
    const totalSizeQuantity = Object.values(sizeDistribution).reduce((acc, val) => acc + val, 0);
    
    if (totalSizeQuantity !== quantity) {
      setSizeError(`Total sizes (${totalSizeQuantity}) must equal your order quantity (${quantity})`);
    } else {
      setSizeError('');
    }
  }, [sizeDistribution, quantity]);
  
  // Handle step navigation
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step) => {
    // Only allow navigating to adjacent steps (next or previous)
    // or staying on the current step
    if (step >= 1 && step <= totalSteps && 
        (step === currentStep || step === currentStep + 1 || step === currentStep - 1)) {
      setCurrentStep(step);
    }
  };
  
  // Step 1: Quantity handlers
  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    
    // Reset size distribution when quantity changes
    if (newQuantity > 1) {
      setSizeDistribution({
        XS: 0,
        S: 0,
        M: newQuantity, // Default all to medium
        L: 0,
        XL: 0
      });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      
      // Reset size distribution when quantity changes
      setSizeDistribution({
        XS: 0,
        S: 0,
        M: newQuantity, // Default all to medium
        L: 0,
        XL: 0
      });
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      
      // Reset size distribution when quantity changes
      setSizeDistribution({
        XS: 0,
        S: 0,
        M: value, // Default all to medium
        L: 0,
        XL: 0
      });
    }
  };
  
  // Step 2: Size distribution handlers
  const handleSizeChange = (size, value) => {
    // Convert to number and ensure it's not negative
    const numValue = Math.max(0, parseInt(value) || 0);
    
    // Update the size distribution
    setSizeDistribution(prev => ({
      ...prev,
      [size]: numValue
    }));
  };
  
  const incrementSize = (size) => {
    // Get total of other sizes
    const otherSizesTotal = Object.entries(sizeDistribution)
      .filter(([key]) => key !== size)
      .reduce((sum, [, value]) => sum + value, 0);
      
    // Only increment if we haven't reached total quantity
    if (otherSizesTotal < quantity) {
      setSizeDistribution(prev => ({
        ...prev,
        [size]: prev[size] + 1
      }));
    }
  };
  
  const decrementSize = (size) => {
    if (sizeDistribution[size] > 0) {
      setSizeDistribution(prev => ({
        ...prev,
        [size]: prev[size] - 1
      }));
    }
  };

  // Step 3: Side selection handlers
  const handleSideSelection = (side) => {
    setSelectedSides(prev => {
      // If selecting "both", set both front and back to true
      if (side === 'both') {
        return { front: true, back: true };
      }
      
      // Otherwise toggle the specific side
      return {
        ...prev,
        [side]: !prev[side]
      };
    });
  };
  
  // Step 4: Logo upload handlers
  const handleLogoUpload = (side, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') {
          setFrontCustomization(prev => ({
            ...prev,
            logo: reader.result,
            addLogo: true
          }));
        } else {
          setBackCustomization(prev => ({
            ...prev,
            logo: reader.result,
            addLogo: true
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle apply customization
  const handleApplyCustomization = () => {
    // Create array of jerseys with individual customizations
    const jerseyCustomizations = [];
    
    // For each jersey in quantity, create a customization object
    for (let i = 0; i < quantity; i++) {
      const jerseyCustomization = {
        size: Object.entries(sizeDistribution).find(([_, count], index, arr) => {
          // Find which size category this jersey falls into
          let prevTotal = 0;
          for (let j = 0; j < index; j++) {
            prevTotal += arr[j][1];
          }
          const currentTotal = prevTotal + count;
          return i >= prevTotal && i < currentTotal;
        })?.[0] || 'M', // Default to M if not found
        front: selectedSides.front ? {
          addName: frontCustomization.addName,
          name: frontCustomization.addName ? 
                (frontCustomization.sameForAll ? frontCustomization.names[0] : frontCustomization.names[i] || '') : '',
          addNumber: frontCustomization.addNumber,
          number: frontCustomization.addNumber ? 
                 (frontCustomization.sameForAll ? frontCustomization.numbers[0] : frontCustomization.numbers[i] || '') : '',
          addLogo: frontCustomization.addLogo,
          logo: frontCustomization.addLogo ? frontCustomization.logo : null
        } : null,
        back: selectedSides.back ? {
          addName: backCustomization.addName,
          name: backCustomization.addName ? 
                (backCustomization.sameForAll ? backCustomization.names[0] : backCustomization.names[i] || '') : '',
          addNumber: backCustomization.addNumber,
          number: backCustomization.addNumber ? 
                 (backCustomization.sameForAll ? backCustomization.numbers[0] : backCustomization.numbers[i] || '') : '',
          addLogo: backCustomization.addLogo,
          logo: backCustomization.addLogo ? backCustomization.logo : null
        } : null
      };
      
      jerseyCustomizations.push(jerseyCustomization);
    }
    
    // Compile all customization details
    const customizationData = {
      quantity,
      sizeDistribution,
      sides: selectedSides,
      material: 'polyester', // Default material
      jerseys: jerseyCustomizations,
      // For backward compatibility, include the first jersey's customization as the main one
      front: selectedSides.front ? {
        addName: frontCustomization.addName,
        name: frontCustomization.addName ? frontCustomization.names[0] : '',
        addNumber: frontCustomization.addNumber,
        number: frontCustomization.addNumber ? frontCustomization.numbers[0] : '',
        addLogo: frontCustomization.addLogo,
        logo: frontCustomization.logo
      } : null,
      back: selectedSides.back ? {
        addName: backCustomization.addName,
        name: backCustomization.addName ? backCustomization.names[0] : '',
        addNumber: backCustomization.addNumber,
        number: backCustomization.addNumber ? backCustomization.numbers[0] : '',
        addLogo: backCustomization.addLogo,
        logo: backCustomization.logo
      } : null
    };
    
    // Send customization data to parent
    onCustomizationComplete(customizationData);
  };

  // Render the size guide with React Portal
  const renderSizeGuide = () => {
    if (!showSizeGuide) return null;
    return ReactDOM.createPortal(
      <SizeGuide onClose={() => setShowSizeGuide(false)} />,
      document.body
    );
  };

  return (
    <div className="jersey-customization">
      <h3>{translations.jerseyCustomization || "Jersey Customization"}</h3>
      
      {/* Progress indicator with non-clickable steps */}
      <div className="customization-progress">
        <div 
          className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
          aria-label="Step 1: Color & Quantity"
        >
          <span className="step-number">1</span>
          <span className="step-label">{translations.colorQuantity || "Color & Quantity"}</span>
        </div>
      
        <div className="progress-line"></div>
        <div 
          className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}
          aria-label="Step 2: Size Distribution"
        >
          <span className="step-number">2</span>
          <span className="step-label">{translations.sizeDistribution || "Size Distribution"}</span>
        </div>
        
        <div className="progress-line"></div>
        <div 
          className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}
          aria-label="Step 3: Print Location"
        >
          <span className="step-number">3</span>
          <span className="step-label">{translations.printLocation || "Print Location"}</span>
        </div>
        
        <div className="progress-line"></div>
        <div 
          className={`progress-step ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}
          aria-label="Step 4: Customization"
        >
          <span className="step-number">4</span>
          <span className="step-label">{translations.customization || "Customization"}</span>
        </div>
        
        <div className="progress-line"></div>
        <div 
          className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}
          aria-label="Step 5: Summary"
        >
          <span className="step-number">5</span>
          <span className="step-label">{translations.summary || "Summary"}</span>
        </div>
      </div>

      {/* Step 1: Color & Quantity */}
      {currentStep === 1 && (
        <div className="customization-step">
          <h4 className="step-title">
          {translations.colorQuantity || "Color & Quantity"}
          </h4>
          <div className="step-content">
            <div className="form-group">
              <label>{translations.jerseyQuantity || "How many jerseys do you want to order?"}</label>
              <div className="quantity-selector">
                <button onClick={decrementQuantity} className="quantity-btn">-</button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                  min="1"
                  max="20"
                />
                <button onClick={incrementQuantity} className="quantity-btn">+</button>
              </div>
            </div>
            
            <div className="step-navigation">
              <button onClick={goToNextStep} className="next-step-btn">
                {translations.next || "Next"} <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Size Distribution */}
      {currentStep === 2 && (
        <div className="customization-step">
          <h4 className="step-title">
            {translations.sizeDistribution || "Size Distribution"}
            <button 
              className="size-guide-btn"
              onClick={() => setShowSizeGuide(true)}
            >
              <FaInfoCircle /> {translations.sizeGuide || "Заавар"}
            </button>
          </h4>
          <div className="step-content">
            <div className="form-group">
              <label>
                {translations.sizeDistributionInstructions || 
                  `Please specify how many jerseys of each size (total must equal ${quantity}):`}
              </label>
              
              <div className="size-distribution-row">
                <div className="sizes-remaining">
                  { "Үлдсэн жерсинүүд"}: {quantity - Object.values(sizeDistribution).reduce((a, b) => a + b, 0)}
                </div>
                
                <div className="size-controls-container">
                  {sizes.map((size) => (
                    <div className="size-control" key={size}>
                      <div className="size-label">
                        <Tooltip
                          title={sizesFullName[sizes.indexOf(size)]}
                          placement="top"
                          TransitionComponent={Zoom}
                          enterTouchDelay={0}
                          arrow
                        >
                          <span>{size}</span>
                        </Tooltip>
                      </div>
                      <div className="size-quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => decrementSize(size)}
                        >
                          -
                        </button>
                        <div className="quantity-display">
                          {sizeDistribution[size]}
                        </div>
                        <button 
                          className="quantity-btn"
                          onClick={() => incrementSize(size)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {sizeError && <div className="size-error">{sizeError}</div>}
            </div>
            
            <div className="step-navigation">
              <button onClick={goToPrevStep} className="prev-step-btn">
                <FaChevronLeft /> {translations.back || "Back"}
              </button>
              <button 
                onClick={goToNextStep} 
                className="next-step-btn"
                disabled={sizeError !== ''}
              >
                {translations.next || "Next"} <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Step 3: Print Location */}
      {currentStep === 3 && (
        <div className="customization-step">
          <h4 className="step-title">
            <span className="step-indicator">3</span> {translations.printLocation || "Print Location"}
          </h4>
          <div className="step-content">
            <div className="form-group">
              <label>{translations.selectSideToPrint || "Select the sides you want to print on:"}</label>
              
              <div className="print-sides-selector">
                <div 
                  className={`side-option ${selectedSides.front ? 'active' : ''}`}
                  onClick={() => handleSideSelection('front')}
                >
                  <div className="side-checkbox">
                    <input 
                      type="checkbox" 
                      id="frontSide" 
                      checked={selectedSides.front} 
                      onChange={() => handleSideSelection('front')} 
                    />
                    <label htmlFor="frontSide">{translations.frontSide || "Front Side"}</label>
                  </div>
                  <div className="side-preview front-preview"></div>
                </div>
                
                <div 
                  className={`side-option ${selectedSides.back ? 'active' : ''}`}
                  onClick={() => handleSideSelection('back')}
                >
                  <div className="side-checkbox">
                    <input 
                      type="checkbox" 
                      id="backSide" 
                      checked={selectedSides.back} 
                      onChange={() => handleSideSelection('back')} 
                    />
                    <label htmlFor="backSide">{translations.backSide || "Back Side"}</label>
                  </div>
                  <div className="side-preview back-preview"></div>
                </div>
                
                <div 
                  className={`side-option ${selectedSides.front && selectedSides.back ? 'active' : ''}`}
                  onClick={() => handleSideSelection('both')}
                >
                  <div className="side-checkbox">
                    <input 
                      type="checkbox" 
                      id="bothSides" 
                      checked={selectedSides.front && selectedSides.back} 
                      onChange={() => handleSideSelection('both')} 
                    />
                    <label htmlFor="bothSides">{translations.bothSides || "Both Sides"}</label>
                  </div>
                  <div className="side-preview both-preview"></div>
                </div>
              </div>
            </div>
            
            <div className="step-navigation">
              <button onClick={goToPrevStep} className="prev-step-btn">
                <FaChevronLeft /> {translations.back || "Back"}
              </button>
              <button 
                onClick={goToNextStep} 
                className="next-step-btn"
                disabled={!selectedSides.front && !selectedSides.back}
              >
                {translations.next || "Next"} <FaChevronRight />
              </button>
            </div>
            
            {(!selectedSides.front && !selectedSides.back) && (
              <div className="validation-message">
                {translations.selectAtLeastOneSide || "Please select at least one side to customize"}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Step 4: Customization - Text & Logo */}
      {currentStep === 4 && (
        <div className="customization-step">
          <h4 className="step-title">
            <span className="step-indicator">4</span> {translations.customization || "Customization (Text & Logo)"}
          </h4>
          <div className="step-content">
            {/* Front Side Customization */}
            {selectedSides.front && (
              <div className="side-customization">
                <h5>{translations.frontSideCustomization || "Front Side Customization"}</h5>
                
                {/* Customization options - whether to use same settings for all jerseys */}
                {quantity > 1 && (
                  <div className="customization-mode-selector">
                    <div className="mode-option">
                      <input 
                        type="radio" 
                        id="frontSameForAll" 
                        name="frontCustomizationMode"
                        checked={frontCustomization.sameForAll} 
                        onChange={() => setFrontCustomization(prev => ({ ...prev, sameForAll: true }))}
                      />
                      <label htmlFor="frontSameForAll">
                        {translations.sameForAllJerseys || "Same customization for all jerseys"}
                      </label>
                    </div>
                    <div className="mode-option">
                      <input 
                        type="radio" 
                        id="frontIndividualCustomization" 
                        name="frontCustomizationMode"
                        checked={!frontCustomization.sameForAll} 
                        onChange={() => setFrontCustomization(prev => ({ ...prev, sameForAll: false }))}
                      />
                      <label htmlFor="frontIndividualCustomization">
                        {translations.individualCustomization || "Individual customization for each jersey"}
                      </label>
                    </div>
                  </div>
                )}
                
                <div className="customization-options">
                  {/* Name customization */}
                  <div className="customization-option">
                    <input 
                      type="checkbox" 
                      id="frontAddName" 
                      checked={frontCustomization.addName} 
                      onChange={() => setFrontCustomization(prev => ({ ...prev, addName: !prev.addName }))}
                    />
                    <label htmlFor="frontAddName">{translations.addName || "Add Name"}</label>
                    
                    {frontCustomization.addName && frontCustomization.sameForAll && (
                      <div className="single-input-container">
                        <input 
                          type="text" 
                          value={frontCustomization.names[0] || ''} 
                          onChange={(e) => {
                            const value = e.target.value;
                            setFrontCustomization(prev => {
                              // Update all names if using same for all
                              const newNames = prev.names.map(() => value);
                              return { ...prev, names: newNames };
                            });
                          }}
                          placeholder={translations.enterName || "Enter name"}
                          maxLength="15"
                          className="customization-input"
                        />
                      </div>
                    )}
                    
                    {frontCustomization.addName && !frontCustomization.sameForAll && (
                      <div className="multiple-inputs-container">
                        <h6>{translations.individualNames || "Names for each jersey:"}</h6>
                        {Array.from({ length: quantity }).map((_, index) => (
                          <div key={`front-name-${index}`} className="jersey-individual-input">
                            <span className="jersey-number-label">#{index + 1}:</span>
                            <input 
                              type="text" 
                              value={frontCustomization.names[index] || ''} 
                              onChange={(e) => {
                                const value = e.target.value;
                                setFrontCustomization(prev => {
                                  const newNames = [...prev.names];
                                  newNames[index] = value;
                                  return { ...prev, names: newNames };
                                });
                              }}
                              placeholder={`${translations.enterName || "Enter name"} #${index + 1}`}
                              maxLength="15"
                              className="customization-input"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Number customization */}
                  <div className="customization-option">
                    <input 
                      type="checkbox" 
                      id="frontAddNumber" 
                      checked={frontCustomization.addNumber} 
                      onChange={() => setFrontCustomization(prev => ({ ...prev, addNumber: !prev.addNumber }))}
                    />
                    <label htmlFor="frontAddNumber">{translations.addNumber || "Add Number"}</label>
                    
                    {frontCustomization.addNumber && frontCustomization.sameForAll && (
                      <div className="single-input-container">
                        <input 
                          type="text" 
                          value={frontCustomization.numbers[0] || ''} 
                          onChange={(e) => {
                            // Validate number input - only allow numbers and max 2 digits
                            const numValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                            setFrontCustomization(prev => {
                              // Update all numbers if using same for all
                              const newNumbers = prev.numbers.map(() => numValue);
                              return { ...prev, numbers: newNumbers };
                            });
                          }}
                          placeholder={translations.enterNumber || "Enter number"}
                          className="customization-input"
                        />
                      </div>
                    )}
                    
                    {frontCustomization.addNumber && !frontCustomization.sameForAll && (
                      <div className="multiple-inputs-container">
                        <h6>{translations.individualNumbers || "Numbers for each jersey:"}</h6>
                        {Array.from({ length: quantity }).map((_, index) => (
                          <div key={`front-number-${index}`} className="jersey-individual-input">
                            <span className="jersey-number-label">#{index + 1}:</span>
                            <input 
                              type="text" 
                              value={frontCustomization.numbers[index] || ''} 
                              onChange={(e) => {
                                // Validate number input - only allow numbers and max 2 digits
                                const numValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                                setFrontCustomization(prev => {
                                  const newNumbers = [...prev.numbers];
                                  newNumbers[index] = numValue;
                                  return { ...prev, numbers: newNumbers };
                                });
                              }}
                              placeholder={`${translations.enterNumber || "Enter number"} #${index + 1}`}
                              className="customization-input"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Logo customization */}
                  <div className="customization-option">
                    <input 
                      type="checkbox" 
                      id="frontAddLogo" 
                      checked={frontCustomization.addLogo} 
                      onChange={() => setFrontCustomization(prev => ({ ...prev, addLogo: !prev.addLogo }))}
                    />
                    <label htmlFor="frontAddLogo">{translations.addLogo || "Add Logo"}</label>
                    {frontCustomization.addLogo && (
                      <div className="logo-upload">
                        <input 
                          type="file" 
                          ref={frontLogoInputRef} 
                          onChange={(e) => handleLogoUpload('front', e)} 
                          accept="image/jpeg, image/png"
                          style={{ display: 'none' }}
                        />
                        <button 
                          className="upload-btn" 
                          onClick={() => frontLogoInputRef.current.click()}
                        >
                          {frontCustomization.logo ? translations.changeLogo || "Change Logo" : translations.uploadLogo || "Upload Logo"}
                        </button>
                        {frontCustomization.logo && (
                          <div className="logo-preview">
                            <img src={frontCustomization.logo} alt="Front logo preview" />
                          </div>
                        )}
                        <p className="note">
                          {translations.logoNoteAllJerseys || "The same logo will be applied to all jerseys."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Back Side Customization */}
            {selectedSides.back && (
              <div className="side-customization">
                <h5>{translations.backSideCustomization || "Back Side Customization"}</h5>
                
                {/* Customization options - whether to use same settings for all jerseys */}
                {quantity > 1 && (
                  <div className="customization-mode-selector">
                    <div className="mode-option">
                      <input 
                        type="radio" 
                        id="backSameForAll" 
                        name="backCustomizationMode"
                        checked={backCustomization.sameForAll} 
                        onChange={() => setBackCustomization(prev => ({ ...prev, sameForAll: true }))}
                      />
                      <label htmlFor="backSameForAll">
                        {translations.sameForAllJerseys || "Same customization for all jerseys"}
                      </label>
                    </div>
                    <div className="mode-option">
                      <input 
                        type="radio" 
                        id="backIndividualCustomization" 
                        name="backCustomizationMode"
                        checked={!backCustomization.sameForAll} 
                        onChange={() => setBackCustomization(prev => ({ ...prev, sameForAll: false }))}
                      />
                      <label htmlFor="backIndividualCustomization">
                        {translations.individualCustomization || "Individual customization for each jersey"}
                      </label>
                    </div>
                  </div>
                )}
                
                <div className="customization-options">
                  {/* Name customization */}
                  <div className="customization-option">
                    <input 
                      type="checkbox" 
                      id="backAddName" 
                      checked={backCustomization.addName} 
                      onChange={() => setBackCustomization(prev => ({ ...prev, addName: !prev.addName }))}
                    />
                    <label htmlFor="backAddName">{translations.addName || "Add Name"}</label>
                    
                    {backCustomization.addName && backCustomization.sameForAll && (
                      <div className="single-input-container">
                        <input 
                          type="text" 
                          value={backCustomization.names[0] || ''} 
                          onChange={(e) => {
                            const value = e.target.value;
                            setBackCustomization(prev => {
                              // Update all names if using same for all
                              const newNames = prev.names.map(() => value);
                              return { ...prev, names: newNames };
                            });
                          }}
                          placeholder={translations.enterName || "Enter name"}
                          maxLength="15"
                          className="customization-input"
                        />
                      </div>
                    )}
                    
                    {backCustomization.addName && !backCustomization.sameForAll && (
                      <div className="multiple-inputs-container">
                        <h6>{translations.individualNames || "Names for each jersey:"}</h6>
                        {Array.from({ length: quantity }).map((_, index) => (
                          <div key={`back-name-${index}`} className="jersey-individual-input">
                            <span className="jersey-number-label">#{index + 1}:</span>
                            <input 
                              type="text" 
                              value={backCustomization.names[index] || ''} 
                              onChange={(e) => {
                                const value = e.target.value;
                                setBackCustomization(prev => {
                                  const newNames = [...prev.names];
                                  newNames[index] = value;
                                  return { ...prev, names: newNames };
                                });
                              }}
                              placeholder={`${translations.enterName || "Enter name"} #${index + 1}`}
                              maxLength="15"
                              className="customization-input"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Number customization */}
                  <div className="customization-option">
                    <input 
                      type="checkbox" 
                      id="backAddNumber" 
                      checked={backCustomization.addNumber} 
                      onChange={() => setBackCustomization(prev => ({ ...prev, addNumber: !prev.addNumber }))}
                    />
                    <label htmlFor="backAddNumber">{translations.addNumber || "Add Number"}</label>
                    
                    {backCustomization.addNumber && backCustomization.sameForAll && (
                      <div className="single-input-container">
                        <input 
                          type="text" 
                          value={backCustomization.numbers[0] || ''} 
                          onChange={(e) => {
                            // Validate number input - only allow numbers and max 2 digits
                            const numValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                            setBackCustomization(prev => {
                              // Update all numbers if using same for all
                              const newNumbers = prev.numbers.map(() => numValue);
                              return { ...prev, numbers: newNumbers };
                            });
                          }}
                          placeholder={translations.enterNumber || "Enter number"}
                          className="customization-input"
                        />
                      </div>
                    )}
                    
                    {backCustomization.addNumber && !backCustomization.sameForAll && (
                      <div className="multiple-inputs-container">
                        <h6>{translations.individualNumbers || "Numbers for each jersey:"}</h6>
                        {Array.from({ length: quantity }).map((_, index) => (
                          <div key={`back-number-${index}`} className="jersey-individual-input">
                            <span className="jersey-number-label">#{index + 1}:</span>
                            <input 
                              type="text" 
                              value={backCustomization.numbers[index] || ''} 
                              onChange={(e) => {
                                // Validate number input - only allow numbers and max 2 digits
                                const numValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                                setBackCustomization(prev => {
                                  const newNumbers = [...prev.numbers];
                                  newNumbers[index] = numValue;
                                  return { ...prev, numbers: newNumbers };
                                });
                              }}
                              placeholder={`${translations.enterNumber || "Enter number"} #${index + 1}`}
                              className="customization-input"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Logo customization */}
                  <div className="customization-option">
                    <input 
                      type="checkbox" 
                      id="backAddLogo" 
                      checked={backCustomization.addLogo} 
                      onChange={() => setBackCustomization(prev => ({ ...prev, addLogo: !prev.addLogo }))}
                    />
                    <label htmlFor="backAddLogo">{translations.addLogo || "Add Logo"}</label>
                    {backCustomization.addLogo && (
                      <div className="logo-upload">
                        <input 
                          type="file" 
                          ref={backLogoInputRef} 
                          onChange={(e) => handleLogoUpload('back', e)} 
                          accept="image/jpeg, image/png"
                          style={{ display: 'none' }}
                        />
                        <button 
                          className="upload-btn" 
                          onClick={() => backLogoInputRef.current.click()}
                        >
                          {backCustomization.logo ? translations.changeLogo || "Change Logo" : translations.uploadLogo || "Upload Logo"}
                        </button>
                        {backCustomization.logo && (
                          <div className="logo-preview">
                            <img src={backCustomization.logo} alt="Back logo preview" />
                          </div>
                        )}
                        <p className="note">
                          {translations.logoNoteAllJerseys || "The same logo will be applied to all jerseys."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="step-navigation">
              <button onClick={goToPrevStep} className="prev-step-btn">
                <FaChevronLeft /> {translations.back || "Back"}
              </button>
              <button onClick={goToNextStep} className="next-step-btn">
                {translations.next || "Next"} <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Step 5: Summary */}
      {currentStep === 5 && (
        <div className="summary-step">
          <h4 className="step-title">
            <span className="step-indicator">5</span> {translations.summary || "Summary"}
          </h4>
          <div className="step-content summary-content">
            <div className="summary-row">
              <span className="summary-label">{translations.quantity || "Quantity"}:</span>
              <span className="summary-value">{quantity}</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">{translations.sizeDistribution || "Size Distribution"}:</span>
              <div className="summary-value size-distribution">
                {Object.entries(sizeDistribution).map(([size, count]) => (
                  count > 0 ? <span key={size}>{size}: {count}</span> : null
                ))}
              </div>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">{translations.selectedSides || "Selected Sides"}:</span>
              <div className="summary-value selected-sides">
                {selectedSides.front && <span>{translations.front || "Front"}</span>}
                {selectedSides.back && <span>{translations.back || "Back"}</span>}
              </div>
            </div>
            
            {/* Front customization summary */}
            {selectedSides.front && (
              <div className="summary-section">
                <h5>{translations.frontCustomization || "Front Customization"}</h5>
                
                {frontCustomization.sameForAll ? (
                  // Same customization for all jerseys
                  <div className="customization-summary same-for-all">
                    <p className="summary-note">{translations.sameForAllJerseys || "Same customization for all jerseys"}</p>
                    <div className="summary-value customization-details">
                      {frontCustomization.addName && (
                        <div>{translations.name || "Name"}: {frontCustomization.names[0]}</div>
                      )}
                      {frontCustomization.addNumber && (
                        <div>{translations.number || "Number"}: {frontCustomization.numbers[0]}</div>
                      )}
                      {frontCustomization.addLogo && frontCustomization.logo && (
                        <div>
                          {translations.logo || "Logo"}: 
                          <span className="small-preview">
                            <img src={frontCustomization.logo} alt="Front logo" />
                          </span>
                        </div>
                      )}
                      {!frontCustomization.addName && !frontCustomization.addNumber && !frontCustomization.addLogo && (
                        <div>{translations.noCustomization || "No customization"}</div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Individual customization for each jersey
                  <div className="customization-summary individual">
                    <p className="summary-note">{translations.individualCustomization || "Individual customization for each jersey"}</p>
                    {Array.from({ length: quantity }).map((_, index) => (
                      <div key={`front-summary-${index}`} className="jersey-summary-item">
                        <h6>Jersey #{index + 1}</h6>
                        <div className="summary-value customization-details">
                          {frontCustomization.addName && (
                            <div>{translations.name || "Name"}: {frontCustomization.names[index] || '-'}</div>
                          )}
                          {frontCustomization.addNumber && (
                            <div>{translations.number || "Number"}: {frontCustomization.numbers[index] || '-'}</div>
                          )}
                          {frontCustomization.addLogo && frontCustomization.logo && (
                            <div>
                              {translations.logo || "Logo"}: 
                              <span className="small-preview">
                                <img src={frontCustomization.logo} alt="Front logo" />
                              </span>
                            </div>
                          )}
                          {!frontCustomization.addName && !frontCustomization.addNumber && !frontCustomization.addLogo && (
                            <div>{translations.noCustomization || "No customization"}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Back customization summary */}
            {selectedSides.back && (
              <div className="summary-section">
                <h5>{translations.backCustomization || "Back Customization"}</h5>
                
                {backCustomization.sameForAll ? (
                  // Same customization for all jerseys
                  <div className="customization-summary same-for-all">
                    <p className="summary-note">{translations.sameForAllJerseys || "Same customization for all jerseys"}</p>
                    <div className="summary-value customization-details">
                      {backCustomization.addName && (
                        <div>{translations.name || "Name"}: {backCustomization.names[0]}</div>
                      )}
                      {backCustomization.addNumber && (
                        <div>{translations.number || "Number"}: {backCustomization.numbers[0]}</div>
                      )}
                      {backCustomization.addLogo && backCustomization.logo && (
                        <div>
                          {translations.logo || "Logo"}: 
                          <span className="small-preview">
                            <img src={backCustomization.logo} alt="Back logo" />
                          </span>
                        </div>
                      )}
                      {!backCustomization.addName && !backCustomization.addNumber && !backCustomization.addLogo && (
                        <div>{translations.noCustomization || "No customization"}</div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Individual customization for each jersey
                  <div className="customization-summary individual">
                    <p className="summary-note">{translations.individualCustomization || "Individual customization for each jersey"}</p>
                    {Array.from({ length: quantity }).map((_, index) => (
                      <div key={`back-summary-${index}`} className="jersey-summary-item">
                        <h6>Jersey #{index + 1}</h6>
                        <div className="summary-value customization-details">
                          {backCustomization.addName && (
                            <div>{translations.name || "Name"}: {backCustomization.names[index] || '-'}</div>
                          )}
                          {backCustomization.addNumber && (
                            <div>{translations.number || "Number"}: {backCustomization.numbers[index] || '-'}</div>
                          )}
                          {backCustomization.addLogo && backCustomization.logo && (
                            <div>
                              {translations.logo || "Logo"}: 
                              <span className="small-preview">
                                <img src={backCustomization.logo} alt="Back logo" />
                              </span>
                            </div>
                          )}
                          {!backCustomization.addName && !backCustomization.addNumber && !backCustomization.addLogo && (
                            <div>{translations.noCustomization || "No customization"}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="preview-button-container">
              <button onClick={goToPrevStep} className="prev-step-btn">
                <FaChevronLeft /> {translations.back || "Back"}
              </button>
              <button 
                onClick={handleApplyCustomization} 
                className="apply-customization-btn"
                disabled={(!selectedSides.front && !selectedSides.back) || sizeError !== ''}
              >
                {translations.previewCustomizedJersey || "PREVIEW CUSTOMIZED JERSEY"}
              </button>
            </div>
          </div>
        </div>
      )}
      {renderSizeGuide()}
    </div>
  );
};

export default JerseyCustomization;
