
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AstralCircleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  position?: { top?: string; right?: string; bottom?: string; left?: string };
  zIndex?: string;
  opacity?: number;
  noBlur?: boolean;
}

export default function AstralCircle({
  className,
  size = 'md',
  color = 'bg-primary',
  position = {},
  zIndex = '-z-10',
  opacity = 0.3,
  noBlur = false
}: AstralCircleProps) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 250,
    height: 250
  });

  useEffect(() => {
    const getSizeValue = () => {
      switch (size) {
        case 'sm': return { width: 150, height: 150 };
        case 'lg': return { width: 400, height: 400 };
        default: return { width: 250, height: 250 };
      }
    };

    setDimensions(getSizeValue());
  }, [size]);

  const style = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
    opacity
  };

  return (
    <div
      className={cn(
        "rounded-full absolute animate-pulse-soft",
        noBlur ? "" : "blur-3xl",
        color,
        zIndex,
        className
      )}
      style={style}
    />
  );
}
