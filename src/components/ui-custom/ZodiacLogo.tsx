
import { cn } from '@/lib/utils';

interface ZodiacLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withAnimation?: boolean;
}

export default function ZodiacLogo({
  className,
  size = 'md',
  withAnimation = false
}: ZodiacLogoProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-12 h-12';
      case 'md': return 'w-16 h-16';
      case 'lg': return 'w-24 h-24';
      case 'xl': return 'w-32 h-32';
      default: return 'w-16 h-16';
    }
  };

  return (
    <div className={cn(
      "relative",
      getSizeClass(),
      withAnimation && "animate-rotate-slow",
      className
    )}>
      <img 
        src="/lovable-uploads/16006226-1e94-40f9-b388-86b8b99dd647.png" 
        alt="StellarInsights Zodiac Logo"
        className={cn(
          "object-contain",
          withAnimation && "hover:scale-105 transition-transform duration-300"
        )}
      />
    </div>
  );
}
