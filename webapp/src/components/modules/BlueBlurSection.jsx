"use client";
import React from "react";
import Silk from "./Silk";

/**
 * BlueBlurSection — bank + silk
 * - Bank (CSS gradients) como base estática, leve
 * - Silk (R3F) por cima com noiseIntensity=1
 * - Pulso suave de “luzes” via animação de opacidade no Silk
 */

const BANK_BG = `
  /* camada base original */
  linear-gradient(
    5deg,
    rgba(25,50,100,0.6),
    rgba(0,120,255,0.25)
  ),

  /* faixa sedosa clara */
  linear-gradient(
    120deg,
    rgba(0,120,255,0.05) 55%,
    rgba(0,120,255,0.45) 75%,
    rgba(0,120,255,0) 85%
  ),

  /* segunda faixa sedosa */
  linear-gradient(
    210deg,
    rgba(25,50,100,0.25) 15%,
    rgba(25,50,100,0.00) 75%,
    rgba(25,50,100,0) 20%
  ),

  /* brilho diagonal fino */
  linear-gradient(
    120deg,
    rgba(0,120,255,0.18) 30%,
    rgba(0,120,255,0.02) 46%,
    rgba(0,120,255,0) 15%
  ),

  /* radial original (suavizado e menor) */
  radial-gradient(
    500px 500px at 90% 4%,
    rgba(0,80,255,0.45),
    transparent 30%
  ),

  /* novo radial — canto inferior esquerdo */
  radial-gradient(
    450px 450px at 10% 85%,
    rgba(0,120,255,0.88),
    transparent 65%
  ),

  /* novo radial — centro suave */
  radial-gradient(
    550px 550px at 50% 50%,
    rgba(25,50,100,0.18),
    transparent 70%
  )
`;

export default function BlueBlurSection({
  className = "",
  children,
  full = false,
  noGlass = false,
  glassBlur = true,  // compat
  noBlobs = false,   // compat
  grain = true,      // compat
  saturation = 1.0,  // compat
  preset = "bank",   // compat
}) {
  const style = {
    background: BANK_BG,
    ...(saturation !== 1.0 ? { filter: `saturate(${saturation})` } : null),
  };

  return (
    <section
      className={`relative w-full ${full ? "min-h-screen" : "min-h-[70vh]"} overflow-hidden`}
    >
      {/* Base: Bank gradient (fica no fundo-fundo) */}
      <div className="absolute inset-0 -z-20" style={style} />

      {/* Silk por cima do gradient, com pulso suave de luz */}
      
      {/* Conteúdo */}
      <div className="relative my-[10vw] z-10 mx-auto">
        {noGlass ? (
          <div className={className}>{children}</div>
        ) : (
          <div
            className={[
              "rounded-3xl border border-white/12",
              "bg-white/4", // sem backdrop-blur (mais leve)
              "p-8",
              className,
            ].join(" ")}
          >
            {children}
          </div>
        )}
      </div>

      {/* Pulso de luminosidade do Silk (opacidade 0.65 ↔ 0.9) */}
      <style>{`
        @keyframes silkPulse {
          0%   { opacity: 0.65; }
          50%  { opacity: 0.9; }
          100% { opacity: 0.65; }
        }
        .silk-pulse { animation: silkPulse 9s ease-in-out infinite; }
      `}</style>
    </section>
  );
}