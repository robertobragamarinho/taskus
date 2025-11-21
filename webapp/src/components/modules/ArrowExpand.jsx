"use client";

export default function ArrowOpen({
  size = 48,
  stroke = "#ffffff",
  strokeWidth = 3,

  // ✅ novos props
  legLength = 50,        // tamanho da perna
  tipLength = 6,         // tamanho da pontinha
}) {
  // coordenadas
  const centerX = 12;
  const startY = 4;
  const endY = startY + legLength;

  return (
    <div className="w-full flex justify-center items-center">
      <svg
        width={size}
        height={size * 2}
        viewBox={`0 0 24 ${endY + tipLength}`}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        {/* PERNA */}
        <line x1={centerX} y1={startY} x2={centerX} y2={endY} />

        {/* PONTAS */}
        <line
          x1={centerX}
          y1={endY}
          x2={centerX - tipLength}
          y2={endY - tipLength}
        />

        <line
          x1={centerX}
          y1={endY}
          x2={centerX + tipLength}
          y2={endY - tipLength}
        />
      </svg>
    </div>
  );
}