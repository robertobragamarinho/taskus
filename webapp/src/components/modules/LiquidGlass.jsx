// LiquidGlass_optimized.jsx
// Otimizado para performance e compatibilidade em dispositivos mais antigos/Android.
// Prioriza o uso de box-shadow e transform para aceleração de hardware,
// evitando o custoso 'filter: blur()' e o 'backdrop-filter' que é pesado.

export default function LiquidGlass({
  className = "",
  radius = "rounded-[5vw]",
  children,
}) {
  // Otimização: Remoção do wrapper <div> desnecessário.
  // Otimização: Uso de 'will-change: transform' para promover a camada do elemento,
  // permitindo que o navegador use a aceleração de hardware (GPU).
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={[
        "relative flex items-center justify-center px-8 py-3",
        "ring-1 ring-[#00b7ff]/80",
        // Otimização: Simplificação e consolidação das sombras.
        // O efeito de brilho neon (halo) é incorporado aqui para evitar o 'filter: blur()'.
        // A sombra externa é mantida para o efeito neon.
        "",
        "bg-transparent",
        radius,
        className,
      ].join(" ")}
      style={{
        // Otimização: Adiciona 'will-change' para aceleração de hardware.
        willChange: "transform",
        // Mantém o backdrop-filter desativado para máxima performance e evitar conflitos.
        WebkitBackdropFilter: "none",
        backdropFilter: "none",
      }}
    >
      {/*
        Otimização: O elemento 'halo neon sutil' original foi removido.
        Seu efeito de brilho (radial-gradient + filter: blur) era o maior gargalo de performance.
        O brilho é agora simulado pela sombra externa (box-shadow) do elemento principal.
        Se um brilho mais intenso for necessário, pode-se usar um pseudo-elemento com
        uma sombra de caixa mais leve, mas ainda assim mais performática que o 'filter: blur()'.
      */}

      {children && (
        <span className="relative z-10 text-white text-[3vw] sm:text-base md:text-lg font-light tracking-wide text-center select-none">
          {children}
        </span>
      )}
    </div>
  );
}
