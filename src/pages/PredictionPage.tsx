import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import StarryBackground from '@/components/ui-custom/StarryBackground';
import KundaliChart from '@/components/ui-custom/KundaliChart';
import ApiService, { PlanetaryPosition } from '@/services/api';

export default function PredictionPage() {
  const [houseSelections, setHouseSelections] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateHouse = (house: string, planets: any[]) => {
    setHouseSelections(prev => ({
      ...prev,
      [house]: planets
    }));
  };

  const handleGetPrediction = async () => {
    try {
      // Convert house selections to planetary positions
      const planetaryPositions: PlanetaryPosition[] = Object.entries(houseSelections)
        .flatMap(([house, planets]) => 
          planets.map(planet => ({
            planet: planet.value,
            house: parseInt(house.replace("House ", ""))
          }))
        );
      
      if (planetaryPositions.length === 0) {
        toast.error('Please select at least one planet position in the Kundali chart');
        return;
      }
      
      setIsLoading(true);
      
      const response = await ApiService.getPredictions({
        planetary_positions: planetaryPositions
      });
      
      toast.success('Predictions generated successfully!');
      console.log('Predictions:', response.predictions);
    } catch (error) {
      console.error('Error getting predictions:', error);
      toast.error('Failed to generate predictions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <StarryBackground />
      
      <div className="page-container flex flex-col items-center justify-center min-h-[80vh] py-8">
        <div className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[1200px]">
          <KundaliChart 
            houseSelections={houseSelections}
            onUpdateHouse={handleUpdateHouse}
            className="w-full"
          />
          
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleGetPrediction} 
              className="px-10 py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Predictions...
                </>
              ) : (
                'Get Predictions'
              )}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
