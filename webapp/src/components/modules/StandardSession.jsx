// src/componentes/StandardSession.jsx
import React, { forwardRef } from "react";

/**
 * StandardSession
 * - Container genérico com fundo gradiente configurável
 * - Permite definir as cores (from/to) diretamente na prop `className`
 *
 * Props:
 *  - as: string | componente (tag HTML). Padrão: "section"
 *  - maxW: tailwind max-width (ex.: "max-w-3xl", "max-w-5xl"). Padrão: "max-w-5xl"
 *  - px: espaçamento horizontal (ex.: "px-2", "px-4"). Padrão: "px-0"
 *  - mt: margem-top (ex.: "mt-10"). Padrão: "mt-0"
 *  - overflowHidden: boolean para overflow. Padrão: true
 *  - className: classes adicionais (inclua aqui seu degradê)
 *  - children: conteúdo interno
 *
 * Exemplo de uso:
 *  <StandardSession className="bg-gradient-to-b from-[#0d0430] to-[#0f0d4e]">
 *    <h1>Conteúdo</h1>
 *  </StandardSession>
 */
const StandardSession = forwardRef(
  (
    {
      as: Tag = "section",
      maxW = "max-w-5xl",
      px = "px-0",
      mt = "mt-0",
      overflowHidden = true,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const base = [
      "relative",
      "mx-auto",
      "w-full",
      "bg-gradient-to-b",
      maxW,
      px,
      mt,
      overflowHidden ? "overflow-hidden" : null,
      className, // inclui as cores passadas pelo usuário
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Tag ref={ref} className={base} {...rest}>
        
        {children}
      </Tag>
    );
  }
);

export default StandardSession;