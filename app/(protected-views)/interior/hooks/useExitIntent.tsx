import { useEffect, useState } from 'react';

export function useExitIntent(delay = 1000) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop and when mouse leaves from top
      if (e.clientY <= 0 && !hasShown && window.innerWidth > 768) {
        timeout = setTimeout(() => {
          setShowExitIntent(true);
          setHasShown(true);
        }, delay);
      }
    };

    const handleMouseEnter = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [delay, hasShown]);

  return {
    showExitIntent,
    setShowExitIntent,
    resetExitIntent: () => {
      setHasShown(false);
      setShowExitIntent(false);
    }
  };
}