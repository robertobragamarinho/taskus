import { useEffect, useState } from 'react';

export default function useCountdown(ms, onEnd) {
  const [left, setLeft] = useState(ms);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, ms - elapsed);
      setLeft(remaining);
      if (remaining === 0) {
        clearInterval(id);
        onEnd?.();
      }
    }, 100);
    return () => clearInterval(id);
  }, [ms, onEnd]);

  return left;
}