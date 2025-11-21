"use client";
import React from "react";

function VArrow({ size = "0.1rem", strokeWidth = 1, className, style }) {
  return (
    <svg
      viewBox="0 0 24 14"
      aria-hidden="true"
      width={size}
      height="auto"
      className={className}
      style={style}
    >
      {/* "V" (chevron para baixo) */}
      <path
        d="M2 2 L12 12 L22 2"
        fill="none"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DownArrows({
  count = 5,          // quantidade de setas
  size = "0.5rem",   // tamanho (largura do SVG)
  gap = "0.5rem",     // espaçamento vertical
  duration = 1.2,     // duração da animação (s)
  stagger = 0.05,     // atraso incremental entre setas (s)
  strokeWidth = 1.5,  // espessura do traço
  drift = 6,          // deslocamento vertical no pico (px)
}) {
  return (
    <div
      className="down-arrows-wrap"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <VArrow
          key={i}
          size={size}
          strokeWidth={strokeWidth}
          className="v-arrow"
          style={{
            // variáveis CSS para cada item
            ["--delay"]: `${i * stagger}s`,
            ["--dur"]: `${duration}s`,
            ["--drift"]: `${drift}px`,
          }}
        />
      ))}

      <style>{`
        .v-arrow {
          opacity: 0.35;
          filter: drop-shadow(0 0 4px rgba(255,255,255,0.55));
          transform: translateY(0) scale(1);
          animation:
            vFadeGlow var(--dur) ease-in-out infinite,
            vFloat var(--dur) ease-in-out infinite;
          animation-delay: var(--delay), var(--delay);
          will-change: opacity, filter, transform;
        }

        @keyframes vFadeGlow {
          0%, 100% {
            opacity: 0.35;
            filter: drop-shadow(0 0 4px rgba(255,255,255,0.45));
          }
          50% {
            opacity: 1;
            filter:
              drop-shadow(0 0 10px rgba(255,255,255,0.9))
              drop-shadow(0 0 18px rgba(255,255,255,0.7));
          }
        }

        @keyframes vFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(var(--drift)) scale(1.12); }
        }

        /* Animação mais suave para quem prefere menos movimento */
        @media (prefers-reduced-motion: reduce) {
          .v-arrow {
            animation: vFadeGlow var(--dur) ease-in-out infinite;
          }
          @keyframes vFloat { from {transform:none} to {transform:none} }
        }
      `}</style>
    </div>
  );
}