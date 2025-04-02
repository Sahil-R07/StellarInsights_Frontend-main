
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarryDecorationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  density?: 'low' | 'medium' | 'high';
  color?: string;
}

export default function StarryDecoration({
  className,
  size = 'md',
  count = 12,
  density = 'medium',
  color = 'text-primary'
}: StarryDecorationProps) {
  // Determine star count based on density
  const getStarCount = () => {
    switch (density) {
      case 'low': return Math.max(5, count / 2);
      case 'high': return count * 2;
      default: return count;
    }
  };
  
  // Determine container size
  const getContainerSize = () => {
    switch (size) {
      case 'sm': return 'w-24 h-24';
      case 'lg': return 'w-64 h-64';
      default: return 'w-40 h-40';
    }
  };
  
  const stars = Array.from({ length: getStarCount() });
  
  return (
    <div className={cn(
      "relative overflow-hidden rounded-full opacity-70",
      getContainerSize(),
      className
    )}>
      {stars.map((_, index) => {
        // Create randomized star positions and sizes
        const size = Math.random() * 16 + 8;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const opacity = Math.random() * 0.5 + 0.3;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 3;
        
        return (
          <div 
            key={index}
            className="absolute animate-float"
            style={{
              top,
              left,
              opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <Star 
              className={cn("", color)}
              size={size}
              fill="currentColor"
              strokeWidth={1}
            />
          </div>
        );
      })}
    </div>
  );
}
