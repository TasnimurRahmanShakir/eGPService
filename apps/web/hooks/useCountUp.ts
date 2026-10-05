'use client';

import { useState, useEffect } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number; // in milliseconds
  decimals?: number;
  enabled?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 1800,
  decimals = 0,
  enabled = true
}: UseCountUpOptions): string {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!enabled) {
      setCount(start);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth exponential decay easing curve
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentVal = start + (end - start) * easedProgress;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, end, duration, enabled]);

  return count.toFixed(decimals);
}
