// modules/GlobalTimerProvider.jsx
import React, { createContext, useEffect, useRef, useState } from 'react';

export const GlobalTimerCtx = createContext(null);

export default function GlobalTimerProvider({ startAtMs, children }) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    const loop = () => {
      // usa a âncora global (Date.now() - startAtMs)
      setElapsedMs(Math.max(0, Date.now() - (startAtMs || Date.now())));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [startAtMs]);

  return (
    <GlobalTimerCtx.Provider value={{ elapsedMs }}>
      {children}
    </GlobalTimerCtx.Provider>
  );
}