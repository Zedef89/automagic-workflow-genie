
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedRouteProps {
  children: React.ReactNode;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        isVisible 
          ? "opacity-100 transform translate-y-0" 
          : "opacity-0 transform translate-y-4"
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedRoute;
