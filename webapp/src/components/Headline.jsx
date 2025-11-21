import React from "react";

/**
 * Headline
 *
 * Props:
 *  - variant: "h1" | "h2" | "h3"
 *  - color: "white" | "black" | custom (#fff, rgb(), etc.)
 *  - align: "left" | "center" | "right"
 *  - weight: "normal" | "medium" | "semibold" | "bold"
 *  - className: string
 *  - children: conteúdo
 */

export default function Headline({
  children,
  variant = "h1",
  color = "white",
  align = "center",
  weight = "semibold",
  className = "",
}) {
  const Tag = variant;

  // mapa de tamanhos por variante
  const variantSizes = {
    h1: "text-[7vw] sm:text-3xl md:text-4xl lg:text-5xl",
    h2: "text-[6.2vw] sm:text-2xl md:text-3xl lg:text-4xl",
    h3: "text-[3.5vw] sm:text-xl md:text-2xl lg:text-3xl",
  };

  // cor automática se for "black" ou "white"
  const colorStyle =
    color === "black"
      ? "#000"
      : color === "white"
      ? "#fff"
      : color; // custom color

  // alinhamento Tailwind
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  // peso de fonte
  const weightMap = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <Tag
      className={`
        leading-[7.6vw]
        ${variantSizes[variant]}
        ${alignClass}
        ${weightMap[weight]}
        ${className}
      `}
      style={{ color: colorStyle }}
    >
      {children}
    </Tag>
  );
}