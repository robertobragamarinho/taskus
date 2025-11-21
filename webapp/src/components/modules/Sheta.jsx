// Sheta.jsx
import React from "react";

const Sheta = ({ size = 40, color = "#ffffff", variant = "down" }) => {
  const isRight = variant === "right";

  return (
    <div className="sheta-container">
      {/* estilos internos do componente */}
      <style>{`
        .sheta-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .sheta-arrows {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        /* Variante em linha (row) para a direita */
        .sheta-arrows-row {
          flex-direction: row;
        }

        .sheta-arrow {
          filter:
            drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))
            drop-shadow(0 0 14px rgba(255, 255, 255, 0.7));
          opacity: 0.7;
          transform-origin: center;
          animation: sheta-bounce 1.4s infinite ease-in-out;
        }

        .sheta-arrow:nth-child(2) {
          animation-delay: 0.16s;
        }

        .sheta-arrow:nth-child(3) {
          animation-delay: 0.32s;
        }

        /* Variante de animação para a seta à direita (movimento horizontal) */
        .sheta-arrow-right {
          animation-name: sheta-bounce-x;
        }

        @keyframes sheta-bounce {
          0% {
            transform: translateY(0) scale(0.9);
            opacity: 0.25;
          }
          35% {
            transform: translateY(4px) scale(1.05);
            opacity: 1;
          }
          70% {
            transform: translateY(8px) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(0) scale(0.9);
            opacity: 0.25;
          }
        }

        @keyframes sheta-bounce-x {
          0% {
            transform: translateX(0) scale(0.9);
            opacity: 0.25;
          }
          35% {
            transform: translateX(4px) scale(1.05);
            opacity: 1;
          }
          70% {
            transform: translateX(8px) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateX(0) scale(0.9);
            opacity: 0.25;
          }
        }
      `}</style>

      <div className={`sheta-arrows ${isRight ? "sheta-arrows-row" : ""}`}>
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`sheta-arrow ${isRight ? "sheta-arrow-right" : ""}`}
          >
            {/* 
              - Variante "down": mantém rotação -45 (seta apontando para baixo, igual ao original)
              - Variante "right": remove rotação para a seta apontar para a direita
            */}
            <g transform={isRight ? "rotate(-135 12 12)" : "rotate(-45 12 12)"}>
              <path
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 8v8h8"
              />
            </g>
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Sheta;