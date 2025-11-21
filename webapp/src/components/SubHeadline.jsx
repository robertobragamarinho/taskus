import React from "react";

/**
 * Subheadline — subtítulo estilizado e responsivo com variantes
 *
 * Variantes disponíveis:
 *  - "standard": padrão branco (ou custom via prop)
 *  - "red": destaque em rosa (#ff3778)
 *  - "yellow": destaque em amarelo (#ffd500) ✅ NOVO
 *
 * Props:
 *  - variant: "standard" | "red" | "yellow" (padrão: "standard")
 *  - children: conteúdo textual
 *  - align: "left" | "center" | "right"
 *  - color: apenas para variant="standard"
 *  - weight: "regular" | "medium" | "bold" (sobrescreve o peso da variante)
 *  - className: classes extras
 */
export default function Subheadline({
  children,
  variant = "standard",
  align = "center",
  color, // apenas para "standard"
  weight, // força o peso da fonte
  className = "",
}) {
  // ✅ alinhamento dinâmico
  const alignment =
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  // ✅ Cor padrão (para variant="standard")
  const standardColor = color ?? "text-white";

  // ✅ Mapeamento de pesos
  const weightMap = {
    regular: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  // ✅ variantes disponíveis
  const variants = {
    standard: {
      color: standardColor,
      size: "text-[4vw] sm:text-lg",
      padding: "px-3",
      weightClass: "font-light",
    },
    red: {
      color: "text-[#ff3d8b]",
      size: "text-[4.5vw] sm:text-[2rem]",
      padding: "px-6 py-2",
      weightClass: "font-semibold",
    },
    yellow: {
      color: "text-[#ffd800]", // ✅ nova cor
      size: "text-[4.5vw] sm:text-[2rem]",
      padding: "px-6 py-2",
      weightClass: "font-semibold",
    },
  };

  const { color: col, size, padding, weightClass: defaultWeightClass } =
    variants[variant] || variants.standard;

  // ✅ Determina o peso final
  const finalWeightClass = weight && weightMap[weight] ? weightMap[weight] : defaultWeightClass;

  return (
    <p
      className={`${col} ${size} ${finalWeightClass} leading-[5vw] w-full sm:w-11/12 md:w-4/5 ${alignment} ${padding} ${className}`}
    >
      {children}
    </p>
  );
}