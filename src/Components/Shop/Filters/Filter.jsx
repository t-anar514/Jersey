import React, { useState } from "react";
import "./Filter.css";

import { IoIosArrowDown } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { BiSearch } from "react-icons/bi";

const Filter = () => {
  const filterColors = ["#222222", "#C8393D", "#E4E4E4"];
  
  // Product categories in Mongolian
  const filterCategories = ["Жерси", "Куртик", "Оймс", "Цамц", "Спорт хослол"];
  
  // Sizes
  const filterSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"];
  
  // Gender options in Mongolian
  const genderOptions = ["Эрэгтэй", "Эмэгтэй", "Хүүхэд", "Юнисекс"];

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sport categories in Mongolian
  const [sportsData] = useState([
    { name: "Сагсан бөмбөг", count: 42 },
    { name: "Волейбол", count: 27 },
    { name: "Хөл бөмбөг", count: 30 },
    { name: "Гүйлт", count: 19 },
    { name: "Е-Спорт", count: 15 },
  ]);

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  const handleGenderChange = (gender) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter((g) => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };
  
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredSports = sportsData.filter((sport) =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="filterSection">
        {/* Gender Filter */}
        <div className="filterGender">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel-gender-content"
              id="panel-gender-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Хүйс</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="genderOptions">
                {genderOptions.map((gender, index) => (
                  <div className="genderOption" key={index}>
                    <input 
                      type="checkbox" 
                      id={`gender-${index}`} 
                      checked={selectedGenders.includes(gender)}
                      onChange={() => handleGenderChange(gender)}
                    />
                    <label htmlFor={`gender-${index}`}>{gender}</label>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        
        {/* Product Categories */}
        <div className="filterProductCategories">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel-categories-content"
              id="panel-categories-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Бүтээгдэхүүний төрөл</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className="categoriesList">
                {filterCategories.map((category, index) => (
                  <div className="categoryOption" key={index}>
                    <input 
                      type="checkbox" 
                      id={`category-${index}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={`category-${index}`}>{category}</label>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

      
        {/* Sports Categories */}
        <div className="filterSports">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel-sports-content"
              id="panel-sports-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Спортын төрөл</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {/* Search bar */}
              <div className="searchBar">
                <BiSearch className="searchIcon" size={20} color={"#767676"} />
                <input
                  type="text"
                  placeholder="Хайх"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Sport list */}
              <div className="brandList">
                {filteredSports.map((sport, index) => (
                  <div className="brandItem" key={index}>
                    <input
                      type="checkbox"
                      name="sport"
                      id={`sport-${index}`}
                      className="brandRadio"
                    />
                    <label htmlFor={`sport-${index}`} className="brandLabel">
                      {sport.name}
                    </label>
                    <span className="brandCount">{sport.count}</span>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        
      </div>
    </div>
  );
};

export default Filter;
