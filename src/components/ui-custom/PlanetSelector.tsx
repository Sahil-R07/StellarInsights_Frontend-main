
import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { PlanetaryPosition } from '@/services/api';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import AstroCard from './AstroCard';

const PLANETS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];
const HOUSES = Array.from({ length: 12 }, (_, i) => i + 1);

interface PlanetSelectorProps {
  onPositionsChange: (positions: PlanetaryPosition[]) => void;
}

export default function PlanetSelector({ onPositionsChange }: PlanetSelectorProps) {
  const [positions, setPositions] = useState<PlanetaryPosition[]>([
    { planet: 'Sun', house: 1 }
  ]);

  const handleAddPosition = () => {
    // Filter out already selected planets
    const usedPlanets = positions.map(p => p.planet);
    const availablePlanets = PLANETS.filter(p => !usedPlanets.includes(p));
    
    if (availablePlanets.length > 0) {
      const newPosition: PlanetaryPosition = {
        planet: availablePlanets[0],
        house: 1
      };
      
      const updatedPositions = [...positions, newPosition];
      setPositions(updatedPositions);
      onPositionsChange(updatedPositions);
    }
  };

  const handleRemovePosition = (index: number) => {
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
    onPositionsChange(updatedPositions);
  };

  const handlePlanetChange = (value: string, index: number) => {
    const updatedPositions = [...positions];
    updatedPositions[index].planet = value;
    setPositions(updatedPositions);
    onPositionsChange(updatedPositions);
  };

  const handleHouseChange = (value: string, index: number) => {
    const updatedPositions = [...positions];
    updatedPositions[index].house = parseInt(value);
    setPositions(updatedPositions);
    onPositionsChange(updatedPositions);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {positions.map((position, index) => (
          <AstroCard key={index} variant="glass" className="relative animate-fade-in">
            <div className="absolute right-2 top-2">
              {positions.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => handleRemovePosition(index)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`planet-${index}`} className="text-sm font-medium">
                  Planet
                </label>
                <Select
                  value={position.planet}
                  onValueChange={(value) => handlePlanetChange(value, index)}
                >
                  <SelectTrigger id={`planet-${index}`}>
                    <SelectValue placeholder="Select planet" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLANETS.filter(
                      planet => planet === position.planet || !positions.some(p => p.planet === planet)
                    ).map((planet) => (
                      <SelectItem key={planet} value={planet}>
                        {planet}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor={`house-${index}`} className="text-sm font-medium">
                  House
                </label>
                <Select
                  value={position.house.toString()}
                  onValueChange={(value) => handleHouseChange(value, index)}
                >
                  <SelectTrigger id={`house-${index}`}>
                    <SelectValue placeholder="Select house" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOUSES.map((house) => (
                      <SelectItem key={house} value={house.toString()}>
                        {house}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AstroCard>
        ))}
      </div>
      
      {positions.length < PLANETS.length && (
        <Button 
          variant="outline" 
          onClick={handleAddPosition}
          className="w-full"
        >
          Add Planet
        </Button>
      )}
    </div>
  );
}
