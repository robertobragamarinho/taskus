import React, { useEffect, useRef, useState } from "react";

/**
 * JobsCounter
 * - Anima de 0 → target quando o componente entra na viewport.
 * - Formata no padrão "0.000 → 5.500".
 *
 * Props:
 *  - target: número final (padrão 5500)
 *  - duration: duração da animação em ms (padrão 2000)
 *  - once: anima só uma vez (padrão true)
 *  - threshold: porcentagem visível para disparar (0..1) (padrão 0.25)
 *  - colorNumber: cor do número (padrão "#fff")
 *  - colorText: cor do texto (padrão "#fff")
 *  - className: classes extras
 */
export default function JobsCounter({
  target = 5500,
  duration = 2000,
  once = true,
  threshold = 0.25,
  colorNumber = "#fff",
  colorText = "#fff",
  className = "",
}) {
  const rootRef = useRef(null);
  const rafRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  // formata "0.000", "1.234", "5.500"
  const formatGroup3 = (n) => {
    const i = Math.floor(n / 1000);
    const r = Math.floor(n % 1000);
    return `${i.toLocaleString("pt-BR")}.${String(r).padStart(3, "0")}`;
  };

  // easing suave
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && (!started || !once)) {
          // inicia animação
          setStarted(true);

          let startTs = 0;
          const step = (ts) => {
            if (!startTs) startTs = ts;
            const p = Math.min((ts - startTs) / duration, 1);
            const eased = easeOutCubic(p);
            setCount(eased * target);
            if (p < 1) {
              rafRef.current = requestAnimationFrame(step);
            }
          };
          cancelAnimationFrame(rafRef.current || 0);
          rafRef.current = requestAnimationFrame(step);

          if (once) {
            // se for uma vez só, não precisa observar mais
            obs.unobserve(el);
          }
        }
      },
      { threshold }
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current || 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, target, threshold, once]); // não depende de started para não reconfigurar o observer
  

  return (
    <div
      ref={rootRef}
      className={`flex items-end items-center justify-center gap-4 ${className}`}
      aria-label={`+${formatGroup3(Math.round(count))} empregos gerados`}
    >
      {/* Número */}
      <span
        className="font-bold text-[clamp(76px,8vw,72px)] leading-none select-none"
        style={{ color: colorNumber }}
      >
        +{formatGroup3(Math.round(count))}
      </span>

      {/* Texto à direita, empilhado */}
      <div
        className="flex flex-col leading-none text-left font-medium tracking-tight select-none"
        style={{ color: colorText }}
      >
        <span>Empregos</span>
        <span>Gerados</span>
      </div>
    </div>
  );
}