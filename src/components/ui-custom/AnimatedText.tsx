
import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';

interface AnimatedTextProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  animation?: 'slide-up' | 'fade-in' | 'none';
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedText({ 
  text, 
  variant = 'h2', 
  animation = 'slide-up',
  delay = 0,
  className,
  once = true,
  ...props
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    observer.observe(elementRef.current);
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [once]);

  const animationClass = animation === 'none' 
    ? '' 
    : isVisible 
      ? `animate-${animation}` 
      : 'opacity-0';

  const style = {
    animationDelay: delay > 0 ? `${delay}ms` : undefined,
  };

  // Using this approach to correctly type and render the heading component
  if (variant === 'h1') {
    return (
      <h1 ref={elementRef as React.RefObject<HTMLHeadingElement>} className={cn(animationClass, className)} style={style} {...props}>
        {text}
      </h1>
    );
  } else if (variant === 'h2') {
    return (
      <h2 ref={elementRef as React.RefObject<HTMLHeadingElement>} className={cn(animationClass, className)} style={style} {...props}>
        {text}
      </h2>
    );
  } else if (variant === 'h3') {
    return (
      <h3 ref={elementRef as React.RefObject<HTMLHeadingElement>} className={cn(animationClass, className)} style={style} {...props}>
        {text}
      </h3>
    );
  } else if (variant === 'h4') {
    return (
      <h4 ref={elementRef as React.RefObject<HTMLHeadingElement>} className={cn(animationClass, className)} style={style} {...props}>
        {text}
      </h4>
    );
  } else {
    return (
      <p ref={elementRef as React.RefObject<HTMLParagraphElement>} className={cn(animationClass, className)} style={style} {...props}>
        {text}
      </p>
    );
  }
}
