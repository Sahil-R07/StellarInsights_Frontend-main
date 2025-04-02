
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export default function PageLayout({ 
  children, 
  className,
  fullHeight = false
}: PageLayoutProps) {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main 
        className={cn(
          "flex-grow pt-16",
          fullHeight ? "flex flex-col" : "",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
