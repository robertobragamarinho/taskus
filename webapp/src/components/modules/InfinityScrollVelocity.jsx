// src/modules/InfinityScrollVelocity.jsx
import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";

import img1 from "../assets/businnes-1.png";
import img2 from "../assets/businnes-2.png";
import img3 from "../assets/businnes-3.png";
import img4 from "../assets/businnes-4.png";
import img5 from "../assets/businnes-5.png";
import img6 from "../assets/businnes-6.png";
import img7 from "../assets/businnes-7.png";

/* ---------------------------
   Helpers reutilizáveis
---------------------------- */
function toCssSize(v) {
  if (typeof v === "number") return `${v}px`;
  return String(v);
}
function stripPx(v) {
  return typeof v === "string" ? parseInt(v, 10) : v;
}
function useElementWidth(ref) {
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const update = () => {
      if (ref.current) setW(ref.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);
  return w;
}
function wrap(min, max, v) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

/* ---------------------------
   Bloco de cartões (1 cópia)
---------------------------- */
function Block({ items, size, cardW, cardH, pad, radius, gap, ariaHidden = false, setFirstBlockRef }) {
  const cssSize = toCssSize(size);
  const cssW = toCssSize(cardW);
  const cssH = toCssSize(cardH);
  const cssPad = toCssSize(pad);

  return (
    <div
      style={{ display: "flex", width: "max-content" }}
      aria-hidden={ariaHidden}
      ref={setFirstBlockRef || null}
    >
      {items.map((src, i) => (
        <span
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: cssW,
            height: cssH,
            padding: cssPad,
            borderRadius: radius,
            marginRight: gap,
            background: "transparent",
          }}
        >
          <img
            src={src}
            alt=""
            width={stripPx(cssSize)}
            height={stripPx(cssSize)}
            loading="lazy"
            decoding="async"
            style={{
              display: "block",
              width: cssSize,
              height: cssSize,
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: Math.round(radius * 0.6),
            }}
          />
        </span>
      ))}
    </div>
  );
}

/* ---------------------------
   Uma linha animada (wrap infinito)
---------------------------- */
function RowMotion({
  items,
  direction = 1,            // 1 ou -1
  baseSpeed = 120,          // px/s
  scrollContainerRef,       // opcional
  damping = 50,
  stiffness = 400,
  velocityMapping,          // {input:[...], output:[...]}
  size, cardW, cardH, pad, radius, gap,
}) {
  // Reduz movimento se o usuário preferir menos animação
  const reduce = useReducedMotion();

  // Motion values
  const baseX = useMotionValue(0);

  // Scroll + velocidade do scroll
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });

  // Fator de velocidade vindo do scroll (negativo inverte a direção)
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [-1000, 0, 1000],
    velocityMapping?.output || [-3, 0, 3],
    { clamp: false }
  );

  // Medir a largura de UMA cópia do bloco
  const firstBlockRef = useRef(null);
  const copyWidth = useElementWidth(firstBlockRef);

  // Direção atual (influenciada pelo scroll)
  const dirRef = useRef(direction);

  // Atualiza a cada frame
  useAnimationFrame((t, delta) => {
    if (reduce) return; // respeita prefers-reduced-motion
    if (!copyWidth) return;

    // px a mover neste frame pelo tempo decorrente
    let moveBy = dirRef.current * baseSpeed * (delta / 1000);

    // Se o fator do scroll for negativo, aponta para a esquerda, positivo para a direita
    const vf = velocityFactor.get();
    dirRef.current = vf < 0 ? -1 : vf > 0 ? 1 : direction;

    // Aplica multiplicador de velocidade do scroll
    moveBy += dirRef.current * Math.abs(vf) * (delta / 1000) * baseSpeed;

    baseX.set(baseX.get() + moveBy);
  });

  // Converte baseX -> transform: translateX(...)
  const x = useTransform(baseX, (v) => {
    if (!copyWidth) return "0px";
    // wrap entre [-copyWidth, 0]
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <motion.div
        style={{
          display: "flex",
          width: "fit-content",
          x,
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        {/* Cópia A (referência de largura) */}
        <Block
          items={items}
          size={size}
          cardW={cardW}
          cardH={cardH}
          pad={pad}
          radius={radius}
          gap={gap}
          setFirstBlockRef={firstBlockRef}
        />
        {/* Cópia B (para loop infinito) */}
        <Block
          items={items}
          size={size}
          cardW={cardW}
          cardH={cardH}
          pad={pad}
          radius={radius}
          gap={gap}
          ariaHidden
        />
      </motion.div>
    </div>
  );
}

/* ---------------------------
   Componente principal
---------------------------- */
export default function InfinityScrollVelocity({
  // Layout/itens
  rows = 3,
  perRow = 5,
  alternate = true,

  // Velocidade base (px/seg)
  baseSpeed = 120,

  // Hooks de scroll e suavização
  scrollContainerRef,
  damping = 50,
  stiffness = 400,
  velocityMapping = { input: [-1000, 0, 1000], output: [-3, 0, 3] },

  // Aparência
  size = 150,
  cardW = 100,
  cardH = 80,
  pad = 15,
  radius = 15,
  gap = 10,
  fade = true,

  className = "",
}) {
  // Base determinística de logos
  const BASE = useMemo(() => [img1, img2, img3, img4, img5, img6, img7], []);

  // Itens por linha (recicla a base se precisar)
  const items = useMemo(() => {
    const need = Math.max(1, perRow);
    const out = [];
    for (let i = 0; i < need; i++) out.push(BASE[i % BASE.length]);
    return out;
  }, [BASE, perRow]);

  // Dados por linha (direção)
  const rowsMeta = useMemo(
    () =>
      Array.from({ length: rows }, (_, i) => ({
        key: `row-${i}`,
        direction: alternate && i % 2 === 1 ? -1 : 1,
      })),
    [rows, alternate]
  );

  return (
    <div className={className} style={{ display: "flex", justifyContent: "center", width: "100%" }} role="region" aria-label="Carrossel de marcas">
      <div
        style={{
          width: "30rem",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          overflow: "hidden",
          position: "relative",
          background: "transparent",
        }}
      >
        {rowsMeta.map(({ key, direction }) => (
          <RowMotion
            key={key}
            items={items}
            direction={direction}
            baseSpeed={baseSpeed}
            scrollContainerRef={scrollContainerRef}
            damping={damping}
            stiffness={stiffness}
            velocityMapping={velocityMapping}
            size={size}
            cardW={cardW}
            cardH={cardH}
            pad={pad}
            radius={radius}
            gap={gap}
          />
        ))}

        {fade && (
          <div
            aria-hidden="true"
            style={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              // Deixe transparente por padrão; ajuste se quiser um fade real
              background:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0) 95%, rgba(0,0,0,0) 100%)",
            }}
          />
        )}
      </div>
    </div>
  );
}