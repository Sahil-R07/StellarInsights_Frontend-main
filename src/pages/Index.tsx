import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import AnimatedText from '@/components/ui-custom/AnimatedText';
import AstroCard from '@/components/ui-custom/AstroCard';
import StarryBackground from '@/components/ui-custom/StarryBackground';
import StarryDecoration from '@/components/ui-custom/StarryDecoration';
import ZodiacLogo from '@/components/ui-custom/ZodiacLogo';
import { Star } from 'lucide-react';

export default function Index() {
  return (
    <PageLayout fullHeight>
      <StarryBackground />
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <ZodiacLogo size="xl" withAnimation />
          </div>
          
          <AnimatedText
            text="Discover Your Cosmic Path"
            variant="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
          />
          
          <AnimatedText
            text="Unlock the secrets of your astrological journey with our advanced prediction system, revealing celestial influences and guiding your future."
            variant="p"
            animation="fade-in"
            delay={300}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-md">
              <Link to="/predict">Get Your Prediction</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-md">
              <Link to="/transits">View Current Transits</Link>
            </Button>
          </div>
        </div>
        
        {/* Star decorations replaced with StarryDecoration component */}
        <div className="absolute top-[5%] right-[5%]">
          <StarryDecoration size="md" density="medium" />
        </div>
        <div className="absolute bottom-[10%] left-[5%]">
          <StarryDecoration size="sm" density="low" />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="page-container">
        <AnimatedText
          text="Stellar Features"
          variant="h2"
          className="text-3xl font-bold mb-12 text-center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AstroCard className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Personalized Predictions</h3>
            <p className="text-muted-foreground">
              Receive tailored astrological insights based on precise planetary positions customized to your unique chart.
            </p>
          </AstroCard>
          
          <AstroCard className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Current Transits</h3>
            <p className="text-muted-foreground">
              Stay informed with real-time updates on planetary movements and their potential impact on your life path.
            </p>
          </AstroCard>
          
          <AstroCard className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <path d="m12 2-2 4 2 4" />
                <path d="m12 2 2 4-2 4" />
                <path d="M12 18v4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Experience the harmony of ancient astrological wisdom enhanced by modern artificial intelligence explanations.
            </p>
          </AstroCard>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="page-container bg-muted/50 py-16 rounded-3xl my-12 relative overflow-hidden">
        {/* Replace star background pattern with StarryDecoration components */}
        <div className="absolute top-10 right-10 opacity-30">
          <StarryDecoration size="lg" density="high" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-30">
          <StarryDecoration size="lg" density="high" />
        </div>
        
        <AnimatedText
          text="How It Works"
          variant="h2"
          className="text-3xl font-bold mb-12 text-center relative z-10"
        />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30"></div>
            
            <div className="space-y-12">
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Enter Planetary Positions</h3>
                <p className="text-muted-foreground">
                  Input the positions of planets in your astrological chart or use our current transit data for predictions.
                </p>
              </div>
              
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Receive Predictions</h3>
                <p className="text-muted-foreground">
                  Our advanced algorithm analyzes the cosmic alignments to generate personalized astrological predictions.
                </p>
              </div>
              
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">Explore Explanations</h3>
                <p className="text-muted-foreground">
                  Dive deeper with AI-generated explanations that interpret what each prediction means for your life journey.
                </p>
              </div>
              
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <h3 className="text-xl font-medium mb-2">Share Your Feedback</h3>
                <p className="text-muted-foreground">
                  Help improve our prediction system by sharing your experience and rating the accuracy of your readings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="page-container">
        <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Add logo as decoration */}
          <div className="absolute top-[-5%] right-[-5%] opacity-10 transform scale-150">
            <ZodiacLogo size="xl" />
          </div>
          <div className="absolute bottom-[-5%] left-[-5%] opacity-10 transform scale-150">
            <ZodiacLogo size="xl" />
          </div>
          
          <div className="relative max-w-3xl mx-auto text-center">
            <AnimatedText
              text="Begin Your Cosmic Journey Today"
              variant="h2"
              className="text-2xl md:text-3xl font-bold mb-4"
            />
            
            <AnimatedText
              text="Unlock the celestial wisdom that guides your path and discover the cosmic influences shaping your destiny."
              variant="p"
              animation="fade-in"
              delay={200}
              className="text-lg mb-8"
            />
            
            <Button asChild size="lg" className="rounded-full px-8 py-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link to="/predict">Get Your Prediction Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
