// src/componentes/GlassCard.jsx
import React from "react";

/**
 * GlassCard — container com efeito de vidro e luz ambiente
 *
 * Props:
 *  - children: conteúdo interno do card
 *  - className: classes extras opcionais
 *  - style: estilos inline adicionais opcionais
 */
export default function GlassCard({ children, className = "", style = {} }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-3xl rounded-b-3xl ring-1 ring-white/0 backdrop-blur-xl overflow-hidden px-3  sm:px-10 ${className}`}
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 70%)",
        ...style,
      }}
    >
      {/* conteúdo dinâmico */}
      <div className="flex flex-col items-center justify-center w-full py-5">
        {children}
      </div>
    </div>
  );
}