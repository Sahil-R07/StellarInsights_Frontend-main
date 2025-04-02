import React, { useEffect, useState } from "react";
import Select from "react-select";
import { cn } from "@/lib/utils";
import "./KundaliChart.css"; // Added CSS import

const PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
const planetOptions = PLANETS.map(planet => ({ value: planet, label: planet }));
const MAX_PLANETS_PER_HOUSE = 4;

// Updated house positions to exactly match the provided code
const HOUSE_POSITIONS = [
  { left: "50%", top: "28%" },
  { left: "28%", top: "23%" },
  { left: "15%", top: "34%" },
  { left: "28%", top: "50%" },
  { left: "15%", top: "67%" },
  { left: "28%", top: "77%" },
  { left: "50%", top: "71%" },
  { left: "75%", top: "77%" },
  { left: "85%", top: "67%" },
  { left: "70%", top: "50%" },
  { left: "85%", top: "34%" },
  { left: "75%", top: "23%" }
];

export interface KundaliChartProps {
  className?: string;
  houseSelections: Record<string, any[]>;
  onUpdateHouse: (house: string, planets: any[]) => void;
}

export default function KundaliChart({ 
  className, 
  houseSelections = {}, 
  onUpdateHouse 
}: KundaliChartProps) {
  const [theme, setTheme] = useState<string>("light");
  const [maxPlanetsWarning, setMaxPlanetsWarning] = useState<string | null>(null);
  
  // Detect theme changes
  useEffect(() => {
    // Initial theme detection
    const detectTheme = () => {
      const htmlEl = document.documentElement;
      const currentTheme = htmlEl.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };
    
    detectTheme();
    
    // Create a mutation observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" && 
          mutation.attributeName === "data-theme"
        ) {
          detectTheme();
        }
      });
    });
    
    // Start observing the html element for data-theme changes
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["data-theme"] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Clear warning message after 3 seconds
  useEffect(() => {
    if (maxPlanetsWarning) {
      const timer = setTimeout(() => {
        setMaxPlanetsWarning(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [maxPlanetsWarning]);

  // Get available options for a specific house
  const getAvailableOptions = (houseIndex: number) => {
    const house = `House ${houseIndex + 1}`;
    const otherSelections = Object.entries(houseSelections)
      .filter(([key]) => key !== house)
      .flatMap(([, arr]) => arr.map(item => item.value));
    
    const current = houseSelections[house] || [];
    
    return planetOptions.filter(option => {
      if (current.find(sel => sel.value === option.value)) return true;
      if (otherSelections.includes(option.value)) return false;
      if (current.find(sel => sel.value === "Rahu") && option.value === "Ketu") return false;
      if (current.find(sel => sel.value === "Ketu") && option.value === "Rahu") return false;
      return true;
    });
  };

  // Handle selection change
  const handleChange = (houseIndex: number, selectedOptions: any) => {
    if (!selectedOptions) {
      onUpdateHouse(`House ${houseIndex + 1}`, []);
      return;
    }
    
    // Check for Rahu and Ketu conflict
    if (
      selectedOptions.find((sel: any) => sel.value === "Rahu") &&
      selectedOptions.find((sel: any) => sel.value === "Ketu")
    ) {
      // Remove Ketu if both are selected
      selectedOptions = selectedOptions.filter((sel: any) => sel.value !== "Ketu");
    }
    
    // Check for maximum planets limit
    if (selectedOptions.length > MAX_PLANETS_PER_HOUSE) {
      const house = `House ${houseIndex + 1}`;
      setMaxPlanetsWarning(`Maximum ${MAX_PLANETS_PER_HOUSE} planets allowed in ${house}`);
      selectedOptions = selectedOptions.slice(0, MAX_PLANETS_PER_HOUSE);
    }
    
    onUpdateHouse(`House ${houseIndex + 1}`, selectedOptions);
  };

  // Custom formatting for multi-value display
  const formatOptionLabel = (option: any) => {
    return (
      <div style={{ fontSize: '0.7rem' }}>{option.label}</div>
    );
  };

  // Get populated houses for summary
  const getPopulatedHouses = () => {
    return Object.entries(houseSelections)
      .filter(([_, planets]) => planets && planets.length > 0)
      .map(([house, planets]) => ({
        house,
        planets: planets.map(p => p.value)
      }))
      .sort((a, b) => {
        const houseNumA = parseInt(a.house.split(' ')[1]);
        const houseNumB = parseInt(b.house.split(' ')[1]);
        return houseNumA - houseNumB;
      });
  };

  const populatedHouses = getPopulatedHouses();

  return (
    <div className={cn("kundali-chart-container", className)}>
      {maxPlanetsWarning && (
        <div className="max-planets-warning">
          {maxPlanetsWarning}
        </div>
      )}
      <div 
        className={cn("kundali-wrapper")}
        style={{
          position: "relative",
          width: "1200px",
          height: "800px",
          margin: "0 auto"
        }}
      >
        {/* Background Kundali chart image */}
        <img 
          src={theme === "dark" ? "/images/kundali-dark.png" : "/images/kundali.png"}
          alt="Kundali Chart" 
          className="kundali-image"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        
        {/* House dropdowns */}
        <div className="kundali-overlay">
          {HOUSE_POSITIONS.map((pos, i) => (
            <div
              key={i}
              className="dropdown-container"
              style={{
                left: pos.left,
                top: pos.top,
                transform: "translate(-50%, -50%)",
                width: "110px" // Reduced from 140px to make dropdowns smaller
              }}
            >
              <Select
                isMulti
                className="widget-select"
                classNamePrefix="widget-select"
                options={getAvailableOptions(i)}
                value={houseSelections[`House ${i + 1}`] || []}
                onChange={(sel) => handleChange(i, sel)}
                placeholder={`House ${i + 1}`}
                menuPlacement="auto"
                formatOptionLabel={formatOptionLabel}
                noOptionsMessage={() => {
                  const currentSelections = houseSelections[`House ${i + 1}`] || [];
                  if (currentSelections.length >= MAX_PLANETS_PER_HOUSE) {
                    return `Maximum ${MAX_PLANETS_PER_HOUSE} planets allowed`;
                  }
                  return "No options available";
                }}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    minHeight: '32px'
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    padding: '2px 6px',
                    flexWrap: 'nowrap'
                  }),
                  multiValue: (baseStyles) => ({
                    ...baseStyles,
                    margin: '1px',
                    maxWidth: '30px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }),
                  multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    padding: '0px 2px',
                    fontSize: '0.65rem',
                    maxWidth: '22px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }),
                  multiValueRemove: (baseStyles) => ({
                    ...baseStyles,
                    padding: '0px 2px',
                    fontSize: '0.65rem'
                  }),
                  indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: '28px'
                  })
                }}
                components={{
                  MultiValueContainer: ({ children, innerProps, data }) => (
                    <div 
                      {...innerProps} 
                      className="widget-select__multi-value"
                      title={data.label}
                      style={{
                        display: 'flex',
                        backgroundColor: '#FDA085',
                        borderRadius: '4px',
                        margin: '1px',
                        maxWidth: '30px',
                        overflow: 'hidden'
                      }}
                    >
                      {children}
                    </div>
                  ),
                  MultiValueLabel: ({ children, innerProps, data }) => (
                    <div 
                      {...innerProps} 
                      className="widget-select__multi-value__label"
                      style={{
                        padding: '0px 2px',
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        color: theme === 'dark' ? '#2c2f33' : 'white',
                        maxWidth: '22px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                      title={data.label}
                    >
                      {data.label.substring(0, 2)}
                    </div>
                  )
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Summary bar showing selected planets by house */}
      <div className="kundali-summary">
        {populatedHouses.length > 0 ? (
          <div className="summary-content">
            {populatedHouses.map((item, index) => (
              <div key={index} className="house-summary">
                <span className="house-name">{item.house}:</span>
                <span className="planet-list">{item.planets.join(', ')}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-selections">No planets selected</div>
        )}
      </div>
    </div>
  );
} 