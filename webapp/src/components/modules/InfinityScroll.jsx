// src/modules/InfinityScroll.jsx
import React, { useMemo } from "react";

import img1 from "../assets/businnes-1.webp";
import img2 from "../assets/businnes-2.webp";
import img3 from "../assets/businnes-3.webp";
import img4 from "../assets/businnes-4.webp";
import img5 from "../assets/businnes-5.webp";
import img6 from "../assets/businnes-6.webp";
import img7 from "../assets/businnes-7.webp";

import img9 from "../assets/businnes-9.webp";
import img10 from "../assets/businnes-10.webp";
import img11 from "../assets/businnes-11.webp";
import img12 from "../assets/businnes-12.webp";
import img13 from "../assets/businnes-13.webp";
import img14 from "../assets/businnes-14.webp";
import img15 from "../assets/businnes-15.webp";
import img16 from "../assets/businnes-16.webp";

/**
 * InfinityScroll — carrossel contínuo e leve de marcas
 *
 * Props:
 *  - rows: número de linhas
 *  - perRow: quantos logos no total por linha (TODAS as imagens base aparecem pelo menos uma vez)
 *  - duration: duração base da animação (ms)
 *  - variance: variação por linha (ms)
 *  - alternate: linhas ímpares no sentido inverso
 *  - size: tamanho do logo (px ou unidade CSS)
 *  - cardW / cardH / pad / radius / gap: estilo dos cards
 *  - fade: mostra overlay nas bordas
 *  - className: classe extra no wrapper
 */
export default function InfinityScroll({
  rows = 3,
  perRow = 16,       // por padrão, usa todas as imagens base por linha
  duration = 54000,  // ms
  variance = 4000,   // variação leve por linha
  alternate = true,

  size = 150,
  cardW = 140,
  cardH = 80,
  pad = 15,
  radius = 15,
  gap = 10,

  fade = true,
  className = "",
}) {
  // Todas as imagens base
  const BASE = useMemo(
    () => [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
    ],
    []
  );

  // Dados das linhas: direção, duração e ITENS embaralhados
  const rowsData = useMemo(() => {
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    // PRNG determinístico simples baseado em seed
    const makeRng = (seedBase) => {
      let seed = seedBase || 1;
      return () => {
        // linear congruential generator básico
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
    };

    // Fisher–Yates com PRNG custom
    const shuffleWithSeed = (arr, seedBase) => {
      const rng = makeRng(seedBase);
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const r = rng();
        const j = Math.floor(r * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    return Array.from({ length: rows }, (_, i) => {
      const sign = i % 2 === 1 && alternate ? -1 : 1;

      // variação determinística na duração
      const t = i + 1;
      const v = Math.sin(t * 1.37) * (variance / 2);
      const d = clamp(duration + v, 2000, 120000);
      const dir = sign === -1 ? "reverse" : "normal";

      // --- aleatoriedade estável dos itens por linha ---
      const min = BASE.length; // todas as imagens aparecem pelo menos uma vez
      const need = Math.max(min, perRow || min);

      // embaralha a BASE com seed baseada no índice da linha (pra cada linha ficar diferente)
      const baseShuffled = shuffleWithSeed(BASE, (i + 1) * 1234);
      const len = baseShuffled.length;

      // monta os itens garantindo que não haja repetição lado a lado
      const items = [];
      let prev = null;

      for (let k = 0; k < need; k++) {
        let candidate = baseShuffled[k % len];

        if (candidate === prev) {
          // se cair igual ao anterior, pega o próximo da lista embaralhada
          const altIndex = (k + 1) % len;
          candidate = baseShuffled[altIndex];
        }

        items.push(candidate);
        prev = candidate;
      }

      // garante que o primeiro e o último não sejam iguais
      if (items.length > 1 && items[0] === items[items.length - 1]) {
        const lastIndex = items.length - 1;
        const beforeLast = items[lastIndex - 1];

        for (let idx = 0; idx < baseShuffled.length; idx++) {
          const candidate = baseShuffled[idx];
          if (candidate !== items[0] && candidate !== beforeLast) {
            items[lastIndex] = candidate;
            break;
          }
        }
      }

      return {
        key: `row-${i}`,
        dir,
        durMs: Math.round(d),
        items,
      };
    });
  }, [rows, duration, variance, alternate, perRow, BASE]);

  return (
    <div className={className} style={wrap} role="region" aria-label="Carrossel de marcas">
      <div style={host}>
        {rowsData.map(({ key, dir, durMs, items }) => (
          <Row
            key={key}
            items={items}
            direction={dir}
            durationMs={durMs}
            size={size}
            cardW={cardW}
            cardH={cardH}
            pad={pad}
            radius={radius}
            gap={gap}
          />
        ))}
        {fade && <div style={fadeOverlay} aria-hidden="true" />}
      </div>

      {/* CSS escopado */}
      <style>{styles}</style>
    </div>
  );
}

/* ===== Row ===== */
function Row({ items, direction, durationMs, size, cardW, cardH, pad, radius, gap }) {
  // Para o loop perfeito, duplicamos o bloco uma única vez
  return (
    <div style={rowViewport}>
      <div
        style={{
          ...track,
          ["--loop-direction"]: direction,
          ["--loop-duration"]: `${durationMs}ms`,
        }}
      >
        <div style={lane}>
          <Block
            items={items}
            size={size}
            cardW={cardW}
            cardH={cardH}
            pad={pad}
            radius={radius}
            gap={gap}
          />
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
        </div>
      </div>
    </div>
  );
}

/* ===== Bloco de cartões (repetido para o loop) ===== */
function Block({ items, size, cardW, cardH, pad, radius, gap, ariaHidden = false }) {
  const cssSize = toCssSize(size);
  const cssW = toCssSize(cardW);
  const cssH = toCssSize(cardH);
  const cssPad = toCssSize(pad);

  return (
    <div style={block} aria-hidden={ariaHidden}>
      {items.map((src, i) => (
        <span
          key={i}
          style={{
            ...card,
            width: cssW,
            height: cssH,
            padding: cssPad,
            borderRadius: radius,
            marginRight: gap,
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

/* ===== helpers ===== */
function toCssSize(v) {
  if (typeof v === "number") return `${v}px`;
  return String(v);
}
function stripPx(v) {
  return typeof v === "string" ? parseInt(v, 10) : v;
}

/* ===== styles (inline objects) ===== */
const wrap = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const host = {
  width: "30rem",
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 0,
  overflow: "hidden",
  position: "relative",
  background: "transparent",
};

const rowViewport = {
  width: "100%",
  overflow: "hidden",
  position: "relative",
};

const track = {
  // usa apenas variáveis CSS para direção e duração
};

const lane = {
  display: "flex",
  width: "fit-content",
  animationName: "loop-slide",
  animationTimingFunction: "linear",
  animationDuration: "var(--loop-duration)",
  animationIterationCount: "infinite",
  animationDirection: "var(--loop-direction)",
  willChange: "transform",
  transform: "translate3d(0,0,0)",
};

const block = {
  display: "flex",
  width: "max-content",
};

const card = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  boxShadow: "",
};

const fadeOverlay = {
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0) 95%, rgba(0,0,0,0) 100%)",
};

/* ===== CSS escopado (keyframes + acessibilidade) ===== */
const styles = `
@keyframes loop-slide {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  [style*="animation-name: loop-slide"] {
    animation: none !important;
    transform: translateX(0) !important;
  }
}
`;