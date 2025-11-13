import { useEffect, useState } from 'react';

// Tracks whether the viewport width is below the given breakpoint (mobile layout flag).
// By default we treat screens < 768px as "mobile".
export function useIsMobile(breakpoint = 768) {
  // Initialise from current window width so we don't get a visible flicker on first render.
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    // Update the flag on every resize
    const onResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', onResize);

    // Clean up listener when the hook is unmounted or breakpoint changes
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [breakpoint]);

  return isMobile;
}
