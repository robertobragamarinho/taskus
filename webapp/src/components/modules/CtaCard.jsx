// CtaCard.jsx — versão simples (sem blur/sem animações) + CTA customizável por props
"use client";
import React from "react";
import ShimmerButton from "../modules/ShimmerButton";


const root = document.getElementById("root");
const link = root?.dataset?.cta ?? "/";

/* ===========================
   CONFIG BÁSICA / DEFAULTS
=========================== */
const CONFIG = {
  rounded: "rounded-3xl",
  padding: "p-6",
  width: "w-[85vw] max-w-md",
  minH: "min-h-[10vw]",
  textColor: "text-white",
  // gradiente simples estático (sem animações/blurs)
  bg: "linear-gradient(150deg, #0b1a35 0%, #062056 50%, #0a5fb4 100%)",
  border: "border border-white/15",
};

/* ===========================
   UTILS — classes do card
=========================== */
function buildCardClasses({ width, minH, rounded, padding, textColor, className }) {
  return [
    "relative mx-auto overflow-hidden",
    CONFIG.border,
    width,
    minH,
    rounded,
    padding,
    textColor,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/* ===========================
   COMPONENTE (SIMPLES)
=========================== */
export default function CtaCard({
  variant = "completa", // "completa" | "compacta" | "reduzida"
  children,
  className = "",

  // overrides
  rounded = CONFIG.rounded,
  padding = CONFIG.padding,
  width = CONFIG.width,
  minH = CONFIG.minH,
  textColor = CONFIG.textColor,
  bg = CONFIG.bg,

  // props de CTA (novo)
  ctaLabel = "Veja mais detalhes abaixo",
  onCtaClick,
  showCta, // opcional: força mostrar/ocultar o CTA independente da variante
  ctaProps = {}, // props extras para o ShimmerButton (ex.: className, variant)

  // props que existiam mas AGORA são ignorados (para compatibilidade)
  blueBlur, preset, saturation, blobs, grain, blurOnly, blurIntensity,
  glassBlur, glassBlurClass,

  // secundário (usado na reduzida)
  miniMinH = "min-h-[40vw]",
  miniPadding = "p-5",
  miniClassName = "mt-6",
  miniStyle = {},
}) {
  const isCompacta = variant === "compacta";
  const isReduzida = variant === "reduzida";

  const containerClass = buildCardClasses({
    width,
    minH,
    rounded,
    padding,
    textColor,
    className,
  });

  const bgStyle = { background: bg };

  // Regra de visibilidade do CTA:
  // 1) Se showCta for boolean, usa ele direto.
  // 2) Senão, usa regra padrão: não mostrar em "compacta" e "reduzida".
  const shouldRenderCta =
    typeof showCta === "boolean" ? showCta : !(isCompacta || isReduzida);

  return (
    <div className="w-full">
      {/* ===== CARD PRINCIPAL ===== */}
      <div className={containerClass} style={bgStyle}>
        {/* Conteúdo */}
        <div className="relative z-10 gap-5 mt-5 mb-5 flex flex-col w-full">
          <div className="w-full h-7">
            <p className="text-[3vw] font-light mb-2 leading-[5vw]">
              +500 Vagas disponíveis
            </p>
          </div>

          <div className="w-full h-10">
            <h3 className="text-xl font-bold mb-2 leading-[5vw]">
              Atendente de suporte<br /> ao cliente - Home Office
            </h3>
          </div>

          {/* Salário + VA */}
          <div className="w-full">
            <div className="w-full border-t border-b border-white/20 flex gap-2 py-4 justify-center">
              <div className="w-full flex items-center bg-white/5 rounded-[2vw] justify-center text-center h-[20vw]">
                <div>
                  <p className="text-[3vw] font-light">Salário Mensal</p>
                  <p className="text-[5.5vw] font-semibold">R$2.450,00</p>
                </div>
              </div>

              <div className="w-full flex items-center bg-white/5 rounded-[2vw] justify-center text-center h-[20vw]">
                <div>
                  <p className="text-[3vw] font-light">Vale alimentação</p>
                  <p className="text-[5.5vw] font-semibold">R$450,00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefícios — só na completa */}
          {!isReduzida && (
            <div className="w-full border-b border-white/20 pb-2">
              <p className="text-[3vw] font-light mb-2 leading-[5vw]">Benefícios</p>
              <h3 className="text-[3.3vw] leading-[4vw]">
                Plano de saúde, plano odontológico, férias remuneradas, plano de
                carreira e treinamentos de capacitação.
              </h3>
            </div>
          )}

          {/* CTA customizável */}
          {shouldRenderCta && ctaLabel != null && (
            <ShimmerButton
              variant="cta"
              onClick={() => window.location.href = link}
            >
              {ctaLabel}
            </ShimmerButton>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}