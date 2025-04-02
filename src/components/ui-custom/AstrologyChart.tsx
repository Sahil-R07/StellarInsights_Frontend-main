
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Define available zodiac signs
const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

interface PlanetPosition {
  planet: string;
  position: {
    sign: string;
    house: number;
  };
}

interface AstrologyChartProps {
  className?: string;
  transitData: PlanetPosition[];
}

export default function AstrologyChart({ 
  className,
  transitData = []
}: AstrologyChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions based on container size
    const updateCanvasSize = () => {
      const parentWidth = canvas.parentElement?.clientWidth || 400;
      const size = Math.min(parentWidth, 500); // Cap the max size
      
      canvas.width = size;
      canvas.height = size;
      
      drawChart();
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    function drawChart() {
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const outerRadius = Math.min(width, height) * 0.45;
      const innerRadius = outerRadius * 0.6;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw outer circle (zodiac wheel)
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw inner circle (houses)
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw house divisions (12 equal sections)
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        
        // Draw line from inner to outer circle
        ctx.beginPath();
        ctx.moveTo(
          centerX + innerRadius * Math.cos(angle),
          centerY + innerRadius * Math.sin(angle)
        );
        ctx.lineTo(
          centerX + outerRadius * Math.cos(angle),
          centerY + outerRadius * Math.sin(angle)
        );
        ctx.stroke();
        
        // Add house numbers
        const houseNumRadius = innerRadius * 0.8;
        const houseNumber = ((i + 10) % 12) + 1; // Houses are traditionally counted counterclockwise from the ascendant
        
        const textX = centerX + houseNumRadius * Math.cos(angle + Math.PI / 12);
        const textY = centerY + houseNumRadius * Math.sin(angle + Math.PI / 12);
        
        ctx.font = '14px sans-serif';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(houseNumber.toString(), textX, textY);
        
        // Add zodiac signs to outer rim
        const zodiacRadius = outerRadius * 1.08;
        const signIndex = (i + 12 - 3) % 12; // Aries starts at 3 o'clock position traditionally
        const zodiacSign = ZODIAC_SIGNS[signIndex];
        
        const signX = centerX + zodiacRadius * Math.cos(angle + Math.PI / 12);
        const signY = centerY + zodiacRadius * Math.sin(angle + Math.PI / 12);
        
        ctx.font = '10px sans-serif';
        ctx.fillText(zodiacSign, signX, signY);
      }
      
      // Plot planets based on transit data
      if (transitData && transitData.length > 0) {
        transitData.forEach((transit, index) => {
          // Calculate position based on house
          const houseIndex = (transit.position.house - 1 + 3) % 12; // Adjust for chart orientation
          const segmentAngle = (Math.PI * 2) / 12;
          const angle = houseIndex * segmentAngle;
          
          // Add some randomness within the house sector to avoid overlaps
          const offset = (Math.random() * 0.8 - 0.4) * segmentAngle;
          const planetRadius = innerRadius * (0.3 + Math.random() * 0.3);
          
          const planetX = centerX + planetRadius * Math.cos(angle + offset);
          const planetY = centerY + planetRadius * Math.sin(angle + offset);
          
          // Draw planet symbol
          ctx.beginPath();
          ctx.arc(planetX, planetY, 12, 0, Math.PI * 2);
          ctx.fillStyle = getPlanetColor(transit.planet);
          ctx.fill();
          ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw planet label
          ctx.font = 'bold 10px sans-serif';
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Use first 2 letters for planet name
          const planetLabel = transit.planet.substring(0, 2);
          ctx.fillText(planetLabel, planetX, planetY);
        });
      }
    }
    
    function getPlanetColor(planet: string): string {
      const colors: Record<string, string> = {
        'Sun': '#FFD700',
        'Moon': '#E6E6FA',
        'Mercury': '#9AC5F4',
        'Venus': '#FFB6C1',
        'Mars': '#FF4500',
        'Jupiter': '#FFA500',
        'Saturn': '#778899',
        'Rahu': '#800080',
        'Ketu': '#A0522D',
        'Uranus': '#40E0D0',
        'Neptune': '#1E90FF', 
        'Pluto': '#8B0000'
      };
      
      return colors[planet] || '#CCCCCC';
    }
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [transitData]);
  
  return (
    <div className={cn("relative w-full max-w-[500px] mx-auto", className)}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-auto"
      />
    </div>
  );
}
