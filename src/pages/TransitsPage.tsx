
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import AnimatedText from '@/components/ui-custom/AnimatedText';
import AstroCard from '@/components/ui-custom/AstroCard';
import StarryBackground from '@/components/ui-custom/StarryBackground';
import AstralCircle from '@/components/ui-custom/AstralCircle';
import ApiService from '@/services/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Transit {
  planet: string;
  position: {
    sign: string;
    house: number;
  };
}

export default function TransitsPage() {
  const [transits, setTransits] = useState<Transit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransits = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getCurrentTransits();
        setTransits(response.current_transits);
      } catch (error) {
        console.error('Error fetching current transits:', error);
        toast.error('Failed to load current transits. Please try again.');
        
        // Set fallback data for development/testing
        setTransits([
          { planet: 'Sun', position: { sign: 'Libra', house: 7 } },
          { planet: 'Moon', position: { sign: 'Taurus', house: 2 } },
          { planet: 'Mercury', position: { sign: 'Virgo', house: 6 } },
          { planet: 'Venus', position: { sign: 'Leo', house: 5 } },
          { planet: 'Mars', position: { sign: 'Scorpio', house: 8 } },
          { planet: 'Jupiter', position: { sign: 'Aries', house: 1 } },
          { planet: 'Saturn', position: { sign: 'Capricorn', house: 10 } }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransits();
  }, []);

  return (
    <PageLayout>
      <StarryBackground />
      
      {/* Decorative elements */}
      <AstralCircle 
        size="lg" 
        color="bg-primary" 
        position={{ top: '10%', right: '5%' }} 
      />
      <AstralCircle 
        size="md" 
        color="bg-accent" 
        position={{ bottom: '20%', left: '5%' }} 
      />
      
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <AnimatedText
            text="Current Planetary Transits"
            variant="h1"
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          />
          
          <AnimatedText
            text="View the current positions of celestial bodies and their astrological significance."
            variant="p"
            animation="fade-in"
            delay={200}
            className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto"
          />
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Transits Table */}
              <div className="lg:col-span-2">
                <AstroCard variant="glass" className="overflow-hidden">
                  <h2 className="text-xl font-medium mb-6">Transit Positions</h2>
                  <div className="rounded-md overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Planet</TableHead>
                          <TableHead>Zodiac Sign</TableHead>
                          <TableHead className="text-right">House</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transits.map((transit, index) => (
                          <TableRow key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-3" 
                                  style={{ 
                                    backgroundColor: getPlanetColor(transit.planet),
                                    boxShadow: `0 0 8px ${getPlanetColor(transit.planet)}80`
                                  }}
                                />
                                {transit.planet}
                              </div>
                            </TableCell>
                            <TableCell>{transit.position.sign}</TableCell>
                            <TableCell className="text-right">{transit.position.house}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </AstroCard>
              </div>
              
              {/* Transit Interpretation */}
              <div>
                <AstroCard variant="glass">
                  <h2 className="text-xl font-medium mb-4">Transit Significance</h2>
                  
                  <p className="text-sm mb-4">
                    Current planetary transits influence various aspects of life. Here's what these positions generally signify:
                  </p>
                  
                  <div className="space-y-4 text-sm">
                    <p>
                      <span className="font-medium">Sun</span> represents your vitality and core identity. Its position indicates where you're focusing your conscious energy.
                    </p>
                    
                    <p>
                      <span className="font-medium">Moon</span> reflects your emotional landscape. Its transit shows which areas of life are triggering emotional responses.
                    </p>
                    
                    <p>
                      <span className="font-medium">Mercury</span> governs communication and thinking. Its position reveals where your thoughts and conversations are directed.
                    </p>
                    
                    <p>
                      <span className="font-medium">Venus</span> influences love and values. Its transit highlights areas where harmony, beauty, and connection are emphasized.
                    </p>
                    
                    <p>
                      <span className="font-medium">Mars</span> represents action and drive. Its position shows where you're applying energy and potentially facing conflicts.
                    </p>
                  </div>
                </AstroCard>
                
                <AstroCard variant="glass" className="mt-6">
                  <h2 className="text-xl font-medium mb-4">Reading Houses</h2>
                  
                  <p className="text-sm mb-4">
                    Each house represents different areas of life:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 border border-border/30 rounded-md">
                      <p className="font-medium">1st House</p>
                      <p>Self, identity</p>
                    </div>
                    <div className="p-2 border border-border/30 rounded-md">
                      <p className="font-medium">2nd House</p>
                      <p>Money, possessions</p>
                    </div>
                    <div className="p-2 border border-border/30 rounded-md">
                      <p className="font-medium">3rd House</p>
                      <p>Communication</p>
                    </div>
                    <div className="p-2 border border-border/30 rounded-md">
                      <p className="font-medium">4th House</p>
                      <p>Home, family</p>
                    </div>
                    <div className="p-2 border border-border/30 rounded-md">
                      <p className="font-medium">5th House</p>
                      <p>Creativity, pleasure</p>
                    </div>
                    <div className="p-2 border border-border/30 rounded-md">
                      <p className="font-medium">6th House</p>
                      <p>Health, service</p>
                    </div>
                  </div>
                </AstroCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

// Helper function to get planet color
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
