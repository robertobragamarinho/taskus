/* eslint-disable react/prop-types */
import React from "react";

/**
 * CardTime
 * - Mostra um card de aviso em destaque (amarelo).
 * - Recebe props:
 *   - text: string (mensagem principal)
 *   - icon: opcional (src de imagem ou JSX de ícone)
 */
const CardTime = ({ text, icon }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
  <div className="flex items-center gap-3"> {/* items-center = centraliza verticalmente */}
    {icon && (
      <div className="flex-shrink-0 flex items-center">
        {typeof icon === "string" ? (
          <img src={icon} alt="icon" className="h-6" />
        ) : (
          icon
        )}
      </div>
    )}
    <div className="flex-1 flex items-center"> {/* garante que o texto também fique alinhado */}
      <p
        className="font-hendrix-medium text-yellow-800"
        style={{ fontSize: "8pt", lineHeight: "1" }}
      >
        {text}
      </p>
    </div>
  </div>
</div>
  );
};

export default CardTime;