import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Animate loader out
    const timer = setTimeout(() => {
      gsap.to('.loader-container', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 z-[100] flex flex-col items-center justify-center"
         style={{ backgroundColor: '#1F4D3A' }}>
      {/* Logo Animation */}
      <div className="loader-logo mb-8">
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 80 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="loader-ring"
        >
          <circle 
            cx="40" 
            cy="40" 
            r="36" 
            stroke="#F5F5F3" 
            strokeWidth="2" 
            strokeLinecap="round"
            strokeDasharray="169.65"
            strokeDashoffset="42.41"
          />
        </svg>
      </div>

      {/* Brand Name */}
      <h1 
        className="font-display text-3xl md:text-4xl tracking-[0.3em] mb-6"
        style={{ color: '#F5F5F3' }}
      >
        AMEREY
      </h1>

      {/* Progress Bar */}
      <div className="w-48 h-[2px] rounded-full overflow-hidden"
           style={{ backgroundColor: 'rgba(245, 245, 243, 0.2)' }}>
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{ 
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: '#F5F5F3'
          }}
        />
      </div>

      {/* Progress Text */}
      <p 
        className="font-body text-xs tracking-widest mt-4"
        style={{ color: 'rgba(245, 245, 243, 0.6)' }}
      >
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}
