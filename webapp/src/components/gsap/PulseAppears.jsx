// PulseAppears.jsx — surgir de baixo p/ cima (ida e volta) com easing elástico
"use client";
import React, { useEffect, useRef } from "react";

/**
 * Uso:
 *  <PulseAppears>qualquer conteúdo</PulseAppears>
 *
 * Props úteis:
 *  - as: string | React.Component — wrapper (default "div")
 *  - threshold: número 0..1 (default 0.35)
 *  - rootMargin: string do IntersectionObserver
 *  - once: boolean — anima só na ida (default false)
 *  - scaleStart / scaleEnd: números (default 0.5 → 1.001)
 *  - yStart: px (default 40) => "surgir de baixo"
 *  - xStart: px (default 0)
 *  - easing: string CSS timing (default = elastic)
 *    Sugestões:
 *      "linear(0,0.186 2.1%,0.778 7.2%,1.027 9.7%,1.133,1.212,1.264,1.292 15.4%,1.296,1.294,1.285,1.269 18.9%,1.219 20.9%,1.062 25.8%,0.995 28.3%,0.944 31.1%,0.93,0.921,0.92 35.7%,0.926,0.94 39.7%,1.001 47%,1.014,1.021 52.4%,1.02 56.4%,1 65.5%,0.994 70.7%,1.001 88.4%,1)"
 *      ou "cubic-bezier(.34,1.56,.64,1)" (fallback elástico)
 *  - popMs / fadeMs: ms (default 600 / 300)
 */
export default function PulseAppears({
  children,
  as: Tag = "div",
  threshold = 0.01,
  rootMargin = "0px 0px -10% 0px",
  once = false,

  // Config padrão de "surgir de baixo"
  scaleStart = 0.5,
  scaleEnd = 1.000,
  xStart = 0,
  yStart = 0.01,
  opacityStart = 0,

  // Easing & tempos
  easing = "cubic-bezier(.34,1.56,.64,1)", // elástico (fallback amplo)
  popMs = 600,
  fadeMs = 300,

  className = "",
  style,
  ...rest
}) {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > threshold) {
          el.classList.add("pa-active");
          if (once) io.unobserve(el);
        } else if (!once) {
          el.classList.remove("pa-active");
        }
      },
      { threshold: [0, threshold, 1], rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <Tag
      ref={elRef}
      className={["pa", className].filter(Boolean).join(" ")}
      style={{
        "--scale-start": scaleStart,
        "--scale-end": scaleEnd,
        "--x": typeof xStart === "number" ? `${xStart}px` : xStart,
        "--y": typeof yStart === "number" ? `${yStart}px` : yStart,
        "--opacity-start": opacityStart,
        "--pop-ms": `${popMs}ms`,
        "--fade-ms": `${fadeMs}ms`,
        "--ease": easing,
        ...style,
      }}
      {...rest}
    >
      {children}

      {/* CSS básico e global (um arquivo só) */}
      <style>{`
* { box-sizing: border-box; }

.pa {
  /* Estado inicial: abaixo + menor + opaco */
  transform: translate(var(--x, 0), var(--y, 40px)) scale(var(--scale-start, .5));
  opacity: var(--opacity-start, 0);

  /* Transitions — ida e volta */
  transition:
    transform var(--pop-ms, 600ms) var(--ease, cubic-bezier(.34,1.56,.64,1)),
    opacity   var(--fade-ms, 300ms) linear;

  will-change: transform, opacity;
  contain: paint; /* limita repaints ao bloco */
}

.pa.pa-active {
  /* Estado visível: posição final (0,0) + escala final */
  transform: translate(0, 0) scale(var(--scale-end, 1.001));
  opacity: 1;
}

/* Acessibilidade */
@media (prefers-reduced-motion) {
  .pa { transition: none; transform: none; opacity: 1; }
  .pa.pa-active { transform: none; opacity: 1; }
}
      `}</style>
    </Tag>
  );
}