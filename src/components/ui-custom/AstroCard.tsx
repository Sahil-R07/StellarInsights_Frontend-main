
import { cn } from '@/lib/utils';

interface AstroCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  hover?: boolean;
}

export default function AstroCard({ 
  children, 
  className, 
  variant = 'default',
  hover = false
}: AstroCardProps) {
  return (
    <div 
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variant === 'default' && "bg-card text-card-foreground shadow",
        variant === 'elevated' && "bg-card text-card-foreground shadow-lg",
        variant === 'bordered' && "bg-background border border-border",
        variant === 'glass' && "glass-card",
        hover && "hover:shadow-md hover:scale-[1.01] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
