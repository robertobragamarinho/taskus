'use client';
import React, { useEffect, useMemo, useRef } from 'react';

export default function ScrollRight({
  children,
  height = '65vh',
  gap = '1rem',
  panelWidth = '300px',
  arrows = true,
  className = '',
  panelClassName = '',
  itemsPerView = 3,
  spacer = '1vw', // ✅ novo prop
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  const slides = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );

  const measure = () => {
    const root = rootRef.current;
    if (!root) return;

    root.style.setProperty('--gap', gap);
  };

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gap, itemsPerView, slides.length]);

  const itemWidthCalc = `calc((100% - ${itemsPerView - 1} * var(--gap)) / ${itemsPerView})`;

  const itemStyle = {
    minWidth: panelWidth,
    width: itemWidthCalc,
    boxSizing: 'border-box',
    contain: 'paint',
    transform: 'translateZ(0)',
    willChange: 'scroll-position',
  };

  /** ✅ Spacer fixo */
  const spacerStyle = {
    minWidth: spacer,
    width: spacer,
    flexShrink: 0,
  };

  return (
    <section
      ref={rootRef}
      className={['relative w-full overflow-hidden', className].join(' ')}
      style={{ height, boxSizing: 'border-box' }}
    >
      <div
        ref={trackRef}
        className={[
          'flex h-full w-full overflow-x-auto overflow-y-hidden',
          'scroll-smooth',
          'touch-auto select-none',
          '[scrollbar-width:none] [-ms-overflow-style:none]',
        ].join(' ')}
        style={{
          gap: 'var(--gap)',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorInline: 'contain',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* ✅ spacer inicial */}
        <div style={spacerStyle} />

        {slides.map((child, i) => (
          <div
            key={i}
            className={[
              'flex-shrink-0 h-full rounded-2xl overflow-hidden isolate',
              panelClassName,
            ].join(' ')}
            style={itemStyle}
          >
            {child}
          </div>
        ))}

        {/* ✅ spacer final */}
        <div style={spacerStyle} />
      </div>
    </section>
  );
}