
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import StarryBackground from '@/components/ui-custom/StarryBackground';
import StarryDecoration from '@/components/ui-custom/StarryDecoration';
import ZodiacLogo from '@/components/ui-custom/ZodiacLogo';

export default function NotFound() {
  return (
    <PageLayout fullHeight>
      <StarryBackground />
      
      {/* Decorative elements */}
      <div className="absolute top-[15%] right-[5%]">
        <StarryDecoration size="lg" />
      </div>
      <div className="absolute bottom-[20%] left-[5%]">
        <StarryDecoration size="md" />
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
        <div className="space-y-6 max-w-md">
          <ZodiacLogo size="lg" withAnimation />
          
          <div className="relative">
            <div className="text-9xl font-bold opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold">Lost in Space</h1>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground">
            It seems your astrological path has led you to an unknown region of our cosmic map.
          </p>
          
          <Button asChild size="lg" className="rounded-full px-8 py-6">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
