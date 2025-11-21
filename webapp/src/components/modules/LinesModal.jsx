// LinesModal.jsx — otimizado (mantém funções/variantes, sem privacyTint, fundo #ffffff30 por default)
import React, { useMemo } from "react";
import gsap from "gsap";
gsap.config({ force3D: false });

/* ===========================
   UTILS
=========================== */
const cx = (...parts) => parts.filter(Boolean).join(" ");
const styleIf = (cond, style) => (cond ? style : undefined);

/* ===========================
   CONFIG PADRÃO
=========================== */
const CONFIG = {
  padding: "p-6",
  width: "w-[100%] rounded-3xl bg-[#1d71f7] max-w-md",
  textColor: "text-white",
  titleClasses: "text-[4.5vw] leading-[5.8vw] font-semibold mb-2 py-3 text-left",
  bodyClasses: "text-[3.5vw] font-light leading-[5vw] tracking-[0.10vw] text-left",
  iconColor: "#ffd800",
  iconSize: 50,
  iconStroke: 1,
};


/* ===========================
   ÍCONES INLINE
=========================== */
/* ===========================
   ÍCONES INLINE
=========================== */
const ICONS = {
  info: (p) => (
    <svg width={p.size} height={p.size} viewBox="0 0 24 24" className={p.className || "block"}
      preserveAspectRatio="xMinYMin meet" fill="none" stroke={p.color} strokeWidth={p.stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),

  clock: (p) => (
    <svg width={p.size} height={p.size} viewBox="0 0 24 24" className={p.className || "block"}
      preserveAspectRatio="xMinYMin meet" fill="none" stroke={p.color} strokeWidth={p.stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),

  star: (p) => (
    <svg width={p.size} height={p.size} viewBox="0 0 24 24" className={p.className || "block"}
      preserveAspectRatio="xMinYMin meet" fill="none" stroke={p.color} strokeWidth={p.stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.73L5.82 21z" />
    </svg>
  ),

  shield: (p) => (
    <svg width={p.size} height={p.size} viewBox="0 0 24 24" className={p.className || "block"}
      preserveAspectRatio="xMinYMin meet" fill="none" stroke={p.color} strokeWidth={p.stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 5 6v6c0 4 2.8 7.4 7 8 4.2-.6 7-4 7-8V6l-7-3z" />
    </svg>
  ),

  /* ✅ NOVOS — VERSÃO ORIGINAL PRESERVADA */

  headset: (p) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={p.size}
      height={p.size}
      viewBox="0 0 24 24"
      fill={p.color || "#ffd500"}
      aria-hidden="true"
      className={p.className || "block"}
    >
      <path d="M13 23q-.425 0-.713-.288T12 22q0-.425.288-.713T13 21h6v-1h-2q-.825 0-1.413-.588T15 18v-4q0-.825.588-1.413T17 12h2v-1q0-2.9-2.05-4.95T12 4Q9.1 4 7.05 6.05T5 11v1h2q.825 0 1.413.588T9 14v4q0 .825-.588 1.413T7 20H5q-.825 0-1.413-.588T3 18v-7q0-1.85.713-3.488T5.65 4.65q1.225-1.225 2.863-1.938T12 2q1.85 0 3.488.713T18.35 4.65q1.225 1.225 1.938 2.863T21 11v10q0 .825-.588 1.413T19 23h-6Zm-8-5h2v-4H5v4Zm12 0h2v-4h-2v4ZM5 18h2h-2Zm12 0h2h-2Z"/>
    </svg>
  ),

  book: (p) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={p.size}
      height={p.size}
      viewBox="0 0 24 24"
      fill={p.color || "#ffd500"}
      aria-hidden="true"
      className={p.className || "block"}
    >
      <path d="M14 9.9V8.2q.825-.35 1.688-.525T17.5 7.5q.65 0 1.275.1T20 7.85v1.6q-.6-.225-1.213-.338T17.5 9q-.95 0-1.825.238T14 9.9Zm0 5.5v-1.7q.825-.35 1.688-.525T17.5 13q.65 0 1.275.1t1.225.25v1.6q-.6-.225-1.213-.338T17.5 14.5q-.95 0-1.825.225T14 15.4Zm0-2.75v-1.7q.825-.35 1.688-.525t1.812-.175q.65 0 1.275.1T20 10.6v1.6q-.6-.225-1.213-.338T17.5 11.75q-.95 0-1.825.238T14 12.65ZM6.5 16q1.175 0 2.288.263T11 17.05V7.2q-1.025-.6-2.175-.9T6.5 6q-.9 0-1.788.175T3 6.7v9.9q.875-.3 1.738-.45T6.5 16Zm6.5 1.05q1.1-.525 2.212-.788T17.5 16q.9 0 1.763.15T21 16.6V6.7q-.825-.35-1.713-.525T17.5 6q-1.175 0-2.325.3T13 7.2v9.85ZM12 20q-1.2-.95-2.6-1.475T6.5 18q-1.05 0-2.063.275T2.5 19.05q-.525.275-1.012-.025T1 18.15V6.1q0-.275.138-.525T1.55 5.2q1.15-.6 2.4-.9T6.5 4q1.45 0 2.838.375T12 5.5q1.275-.75 2.663-1.125T17.5 4q1.3 0 2.55.3t2.4.9q.275.125.413.375T23 6.1v12.05q0 .575-.487.875t-1.013.025q-.925-.5-1.937-.775T17.5 18q-1.5 0-2.9.525T12 20Zm-5-8.35Z"/>
    </svg>
  ),

  notebook: (p) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={p.size}
      height={p.size}
      viewBox="0 0 24 24"
      fill={p.color || "#ffd500"}
      aria-hidden="true"
      className={p.className || "block"}
    >
      <path d="M8 21v-2h2v-2H4q-.825 0-1.413-.588T2 15V5q0-.825.588-1.413T4 3h16q.825 0 1.413.588T22 5v10q0 .825-.588 1.413T20 17h-6v2h2v2H8Zm-4-6h16V5H4v10Zm0 0V5v10Z"/>
    </svg>
  ),
};

const ICON_KEYS = Object.keys(ICONS);

const resolveIconKey = (iconProp) => {
  if (typeof iconProp === "string" && ICONS[iconProp]) return iconProp;
  if (typeof iconProp === "number" && ICON_KEYS[iconProp]) return ICON_KEYS[iconProp];
  return ICON_KEYS[Math.floor(Math.random() * ICON_KEYS.length)];
};

/* ===========================
   VARIANTES
=========================== */
const VARIANTS = {
  normal: {
    outerClass: "relative mx-auto isolate overflow-visible",
    frameClass: "relative overflow-hidden rounded-3xl my-10",
    bgStopPct: "80%",
  },
  complete: {
    outerClass: "relative mx-auto isolate overflow-visible rounded-3xl",
    frameClass: "relative overflow-hidden rounded-3xl",
    bgStopPct: "100%",
  },
};

/* ===========================
   PRESETS DE FUNDO (opcionais)
=========================== */
const MODAL_BG_PRESETS = {
  aurora: `
    radial-gradient(520px 520px at 10% 20%, rgba(0,255,180,0.35), transparent 60%),
    radial-gradient(480px 480px at 80% 10%, rgba(0,120,255,0.35), transparent 60%),
    radial-gradient(520px 520px at 60% 80%, rgba(255,80,200,0.35), transparent 60%),
    linear-gradient(120deg, #011726, #031e40, #062056)
  `,
  nebula: `
    radial-gradient(circle at 50% 50%, rgba(80,120,255,0.35), rgba(10,20,60,0.5)),
    radial-gradient(circle at 10% 80%, rgba(255,80,200,0.3), transparent 65%),
    linear-gradient(160deg, #04122a, #062056, #0b1a35)
  `,
  minimal: `
    radial-gradient(circle at 50% 50%, rgba(0,100,255,0.25), rgba(5,15,35,1)),
    linear-gradient(145deg, #051630, #031024)
  `,
  cyber: `
    radial-gradient(circle at 85% 20%, rgba(10,255,255,0.45), transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(0,140,255,0.4), transparent 65%),
    linear-gradient(220deg, #04122a, #083a7a, #04122a)
  `,
  frost: `
    radial-gradient(circle at 20% 90%, rgba(0,255,255,0.4), transparent 60%),
    radial-gradient(circle at 70% 10%, rgba(0,150,255,0.4), transparent 60%),
    linear-gradient(120deg, #021b2a, #043452)
  `,
  bank: `
    linear-gradient(145deg, rgba(25,50,100,0.1), rgba(0,120,255,0.25)),
    radial-gradient(420px 420px at 80% 20%, rgba(0,80,255,0.45), transparent 60%)
  `,
  bankSilk: `
    conic-gradient(from 200deg at 40% 40%, rgba(255,255,255,0.10), rgba(255,255,255,0.00) 35%, rgba(255,255,255,0.08) 65%, rgba(255,255,255,0.00)),
    linear-gradient(115deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.00) 24%,
      rgba(255,255,255,0.12) 25%,
      rgba(255,255,255,0.00) 49%,
      rgba(255,255,255,0.12) 50%,
      rgba(255,255,255,0.00) 74%,
      rgba(255,255,255,0.10) 75%,
      rgba(255,255,255,0.00) 100%
    ),
    radial-gradient(540px 460px at 80% 18%, rgba(0,110,255,0.45), transparent 60%),
    linear-gradient(150deg, rgba(20,40,85,0.85), rgba(6,32,86,0.92))
  `,
  electric: `
    radial-gradient(circle at 25% 15%, rgba(0,120,255,0.6), transparent 70%),
    radial-gradient(circle at 75% 70%, rgba(10,255,200,0.5), transparent 70%),
    conic-gradient(from 30deg, #04122a, #062056, #0a5fb4, #04122a)
  `,
  blue: `
    radial-gradient(520px 520px at 10% 10%, rgba(0,122,255,0.35), transparent 60%),
    radial-gradient(420px 420px at 85% 25%, rgba(10,140,255,0.35), transparent 60%),
    radial-gradient(360px 360px at 20% 90%, rgba(0,90,200,0.35), transparent 60%),
    conic-gradient(from 220deg at 50% 50%, #04122a, #062056, #083a7a, #0a5fb4, #083a7a, #062056, #04122a)
  `,
};

/* ===========================
   LAYERS OPCIONAIS
=========================== */
function ModalBlueBlurLayers({ preset = "blue", saturation = 1.1, enableBlobs = true, grain = true }) {
  const bg = MODAL_BG_PRESETS[preset] || MODAL_BG_PRESETS.blue;
  return (
    <>
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: bg, filter: `saturate(${saturation})` }} />
      {enableBlobs && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute w-[42%] h-[42%] rounded-full opacity-[0.45]"
            style={{
              left: "-6%", top: "6%",
              background: "radial-gradient(circle at 30% 30%, rgba(80,180,255,0.9), rgba(30,110,255,0.15) 55%, transparent 70%)",
              filter: "blur(22px)", mixBlendMode: "screen",
            }} />
          <div className="absolute w-[36%] h-[36%] rounded-full opacity-[0.4]"
            style={{
              right: "-5%", top: "28%",
              background: "radial-gradient(circle at 70% 30%, rgba(0,180,255,0.8), rgba(0,120,255,0.15) 55%, transparent 70%)",
              filter: "blur(28px)", mixBlendMode: "screen",
            }} />
          <div className="absolute w-[52%] h-[52%] rounded-full opacity-[0.35]"
            style={{
              left: "18%", bottom: "-12%",
              background: "radial-gradient(circle at 40% 60%, rgba(0,140,255,0.85), rgba(0,100,220,0.15) 55%, transparent 70%)",
              filter: "blur(30px)", mixBlendMode: "screen",
            }} />
        </div>
      )}
      {grain && (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.35'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "140px 140px",
          }}
        />
      )}
    </>
  );
}

function ModalBlurOnlyLayers({ intensity = 28 }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute rounded-full opacity-[0.22]"
        style={{
          width: "55%", height: "55%", left: "-8%", top: "-6%",
          background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.55), rgba(255,255,255,0.0) 60%)",
          filter: `blur(${intensity}px)`, mixBlendMode: "soft-light",
        }} />
      <div className="absolute rounded-full opacity-[0.18]"
        style={{
          width: "48%", height: "48%", right: "-6%", top: "28%",
          background: "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.45), rgba(255,255,255,0.0) 60%)",
          filter: `blur(${intensity + 6}px)`, mixBlendMode: "soft-light",
        }} />
      <div className="absolute rounded-full opacity-[0.16]"
        style={{
          width: "62%", height: "62%", left: "18%", bottom: "-12%",
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.38), rgba(255,255,255,0.0) 60%)",
          filter: `blur(${intensity + 10}px)`, mixBlendMode: "overlay",
        }} />
    </div>
  );
}

/* ===========================
   COMPONENTE
=========================== */
export default function LinesModal(props) {
  const {
    // modo
    mode = "original",

    // conteúdo
    title = "Atenção!",
    subtitle,
    text = "Este é um aviso importante sobre o processamento da sua solicitação.",

    // ícone
    icon,
    iconColor = CONFIG.iconColor,
    iconSize = CONFIG.iconSize,
    iconStroke = CONFIG.iconStroke,

    // layout base
    rounded,
    padding = CONFIG.padding,
    width = CONFIG.width,
    textColor = CONFIG.textColor,
    titleClasses = CONFIG.titleClasses,
    bodyClasses = CONFIG.bodyClasses,
    titleColor,
    bodyColor,
    subtitleColor,

    // visual/efeitos
    variant = "normal",
    minH = "70vw",
    className = "h-[75vw]",
    glassBlur = true,
    glassBlurClass,
    gaussianBlurPx = 18,
    bgFrom,
    bgTo,
    baseSolidColor = "#ffffff30", // ✅ fundo base configurável (default)

    // layers de fundo opcionais
    blueBlur = false,
    preset = "blue",
    saturation = 1.1,
    blobs = true,
    grain = true,
    blurOnly = false,
    blurIntensity = 28,

    /* ===== props do modo STEP ===== */
    stepNumber = 1,
    stepBgColor = "#020817",
    stepTextColor = "text-white",
    stepTitleClasses = "text-[4.5vw] leading-[5.8vw] font-semibold mb-2 px-10 py-3 text-left",
    stepBodyClasses = "text-[3.5vw] font-light leading-[5vw] tracking-[0.10vw] px-10 text-left",
    stepTitleColor,
    stepBodyColor,
    stepShowTopBar = true,
    stepTopBarColor = "#1067f3",
    stepClassName = "",
    stepMinH = "0",
    stepBadgeSize = "w-10 h-10",
    stepNumberSize = "text-lg",
    stepSubtitle,
    stepSubtitleColor,
  } = props;

  /* ===========================
     MODO STEP (alinhado à esquerda)
  ============================ */
  if (mode === "step") {
    const stepTitleClassFinal = cx(stepTitleClasses, stepTitleColor);
    const stepBodyClassFinal = cx(stepBodyClasses, stepBodyColor);
    const stepSubtitleClassFinal = stepBodyClasses;

    return (
      <div className={cx("relative mx-auto isolate overflow-visible w-full max-w-md", stepClassName)}
           style={{ minHeight: stepMinH }}>
        <div className={cx("relative overflow-hidden px-0 py-[15vw]", stepTextColor)}
             style={{ background: stepBgColor, contain: "paint", height: "100%" }}>
          {stepShowTopBar && (
            <div className="absolute inset-x-0 top-0 h-[1px] z-20"
                 style={{ background: `linear-gradient(90deg, transparent, ${stepTopBarColor}, transparent)` }} />
          )}

          <div className="relative pb-5 z-10 mb-10">
            <div className={cx("flex items-center mx-9 justify-left rounded-full text-[#2f4bff] font-light", stepBadgeSize, stepNumberSize)}>
              {stepNumber}
            </div>
          </div>

          <div className="relative z-10" style={{ WebkitFontSmoothing: "antialiased" }}>
            <h2 className={stepTitleClassFinal}>{title}</h2>

            {stepSubtitle && (
              <p className={stepSubtitleClassFinal} style={styleIf(stepSubtitleColor, { color: stepSubtitleColor })}>
                {stepSubtitle}
              </p>
            )}

            <p className={cx(stepBodyClassFinal, "!text-black")}>{text}</p>
          </div>
        </div>
      </div>
    );
  }

  /* ===========================
     MODO ORIGINAL
  ============================ */
  const v = VARIANTS[variant] || VARIANTS.normal;
  const selectedKey = useMemo(() => resolveIconKey(icon), [icon]);
  const IconEl = ICONS[selectedKey];
  const isReactNodeIcon = icon && typeof icon === "object" && !Array.isArray(icon) && !ICONS[icon];

  const outerClasses = cx(v.outerClass, width, rounded, className);
  const frameClasses = cx(
    v.frameClass,
    textColor,
    padding,
    glassBlur ? (glassBlurClass || "backdrop-saturate-150 backdrop-contrast-75") : "backdrop-blur-0",
    "border border-white/30"
  );

  const frameStyle = {
    background: (bgFrom || bgTo) ? `linear-gradient(180deg, ${bgFrom || "transparent"} 0%, ${bgTo || "transparent"} ${v.bgStopPct})` : undefined,
    contain: "paint",
    height: "100%",
    ...styleIf(glassBlur, { backdropFilter: `blur(${gaussianBlurPx}px)`, WebkitBackdropFilter: `blur(${gaussianBlurPx}px)` }),
    willChange: "transform",
  };

  return (
    <div className={outerClasses} style={{ minHeight: minH }}>
      <div className={frameClasses} style={frameStyle}>
        {/* ✅ Fundo base configurável (default: #ffffff30) */}
        <div aria-hidden className="absolute inset-0 rounded-3xl -z-10" style={{ backgroundColor: baseSolidColor }} />

        {/* Layers de fundo opcionais */}
        {blueBlur && !blurOnly && (
          <ModalBlueBlurLayers preset={preset} saturation={saturation} enableBlobs={blobs} grain={grain} />
        )}
        {blueBlur && blurOnly && <ModalBlurOnlyLayers intensity={blurIntensity} />}

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-start text-left h-full"
             style={{ WebkitFontSmoothing: "antialiased" }}>
          <div className="self-start mb-3" style={{ lineHeight: 0 }} aria-hidden>
            {isReactNodeIcon ? icon : (IconEl && <IconEl color={iconColor} size={iconSize} stroke={iconStroke} className="block" />)}
          </div>

          <h2 className={cx(titleClasses, titleColor)}
              style={styleIf(titleColor && !titleClasses.includes("text-"), { color: titleColor })}>
            {title}
          </h2>

          {subtitle && (
            <p className={CONFIG.bodyClasses}
               style={styleIf(subtitleColor, { color: subtitleColor })}>
              {subtitle}
            </p>
          )}

          <p className={cx(bodyClasses, bodyColor)}
             style={styleIf(bodyColor && !bodyClasses.includes("text-"), { color: bodyColor })}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}