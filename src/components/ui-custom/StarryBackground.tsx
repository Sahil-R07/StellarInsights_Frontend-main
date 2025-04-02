
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface StarryBackgroundProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

export default function StarryBackground({ 
  className,
  density = 'medium',
  animated = true
}: StarryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Star properties
    const getStarCount = () => {
      switch(density) {
        case 'low': return Math.floor(canvas.width * canvas.height / 15000);
        case 'high': return Math.floor(canvas.width * canvas.height / 5000);
        default: return Math.floor(canvas.width * canvas.height / 10000);
      }
    };
    
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.speed = Math.random() * 0.05;
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
      
      update() {
        if (animated) {
          this.opacity = 0.3 + Math.abs(Math.sin(Date.now() * this.speed * 0.001)) * 0.5;
        }
        this.draw();
      }
    }
    
    // Create stars
    const starCount = getStarCount();
    const stars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => star.update());
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, animated]);
  
  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed top-0 left-0 -z-10 pointer-events-none", className)}
    />
  );
}
