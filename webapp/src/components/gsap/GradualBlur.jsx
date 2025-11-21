// GradualBlur.jsx — FIXO + controle por IDs blurActive/blurDesactive
// - Sempre FIXO na viewport (position: fixed)
// - Z-index máximo
// - Backdrop blur em camadas com máscara de gradiente
// - Ativa/Desativa via existência de #blurActive e #blurDesactive no DOM
// - Transição suave (fadeIn) opcional
// - Sem dependências externas

import React, { useEffect, useRef, useState, useMemo } from "react";

/* ===========================
   Configurações & utilidades
=========================== */
const Z_MAX = 2147483647;

const DEFAULT_CONFIG = {
  position: "bottom",      // "top" | "bottom" | "left" | "right"
  target: "parent",        // Mantido na API, mas ignorado (sempre fixed)
  zIndex: Z_MAX,

  height: "6rem",          // para top/bottom
  width: null,             // para left/right (se null, usa height)
  divCount: 6,

  strength: 2,
  exponential: false,
  curve: "linear",         // "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out"
  opacity: 1,

  animated: false,         // Mantido na API, mas ignorado aqui
  duration: "0.3s",
  easing: "ease-out",
  hoverIntensity: null,    // se definido, permite hover aumentar intensidade

  responsive: false,
  className: "",
  style: {},
  preset: null,
  onAnimationComplete: null,

  // >>> Ativação por IDs
  blurActivationMode: "id", // "id" | (futuro: "none" etc.)
  fadeIn: true,
  fadeDuration: 250,        // ms
};

const PRESETS = {
  top: { position: "top", height: "6rem" },
  bottom: { position: "bottom", height: "6rem" },
  left: { position: "left", height: "6rem" },
  right: { position: "right", height: "6rem" },

  subtle: { height: "4rem", strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: "10rem", strength: 4, divCount: 8, exponential: true },
  smooth: { height: "8rem", curve: "bezier", divCount: 10 },
  sharp: { height: "5rem", curve: "linear", divCount: 4 },

  header: { position: "top", height: "8rem", curve: "ease-out" },
  footer: { position: "bottom", height: "8rem", curve: "ease-out" },
  sidebar: { position: "left", height: "6rem", strength: 2.5 },

  "page-header": { position: "top", height: "10rem", target: "page", strength: 3 },
  "page-footer": { position: "bottom", height: "10rem", target: "page", strength: 3 },
};

const CURVE_FUNCTIONS = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p), // easeInOut S-curve
  "ease-in": (p) => p * p,
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  "ease-in-out": (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});
const getGradientDirection = (position) =>
  ({
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  })[position] || "to bottom";

const debounce = (fn, wait) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

const useResponsiveDimension = (responsive, config, key) => {
  const [value, setValue] = useState(config[key]);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 0;
      let v = config[key];
      const cap = (s) => key[0].toUpperCase() + key.slice(1);
      if (w <= 480 && config[`mobile${cap(key)}`]) v = config[`mobile${cap(key)}`];
      else if (w <= 768 && config[`tablet${cap(key)}`]) v = config[`tablet${cap(key)}`];
      else if (w <= 1024 && config[`desktop${cap(key)}`]) v = config[`desktop${cap(key)}`];
      setValue(v);
    };
    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [responsive, config, key]);
  return responsive ? value : config[key];
};

// Mantido apenas por compatibilidade com API anterior
const useIntersectionObserver = (_ref, _shouldObserve = false) => true;

/* ===========================
   Componente principal (FIXO)
=========================== */
function GradualBlur(props) {
  const containerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props, { zIndex: Z_MAX });
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, "height");
  const responsiveWidth = useResponsiveDimension(config.responsive, config, "width");

  /* =========================================================
      ATIVAÇÃO VIA IDs NA PÁGINA
      - #blurActive → ativa
      - #blurDesactive → desativa (prioritário)
     ========================================================= */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (config.blurActivationMode !== "id") return;

    const checkIds = () => {
      const hasDesactive = !!document.getElementById("blurDesactive");
      const hasActive = !!document.getElementById("blurActive");
      // desactive tem prioridade
      setIsActive(!hasDesactive && hasActive);
    };

    checkIds();

    const obs = new MutationObserver(checkIds);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => obs.disconnect();
  }, [config.blurActivationMode]);

  /* =========================================================
      Construção das camadas de blur
     ========================================================= */
  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;

    const currentStrength =
      isHovered && config.hoverIntensity
        ? config.strength * config.hoverIntensity
        : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      const blurValue = config.exponential
        ? Math.pow(2, progress * 4) * 0.0625 * currentStrength
        : 0.0625 * (progress * config.divCount + 1) * currentStrength;

      const round1 = (n) => Math.round(n * 10) / 10;
      const p1 = round1(increment * i - increment);
      const p2 = round1(increment * i);
      const p3 = round1(increment * i + increment);
      const p4 = round1(increment * i + increment * 2);

      let stops = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) stops += `, black ${p3}%`;
      if (p4 <= 100) stops += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position);

      const divStyle = {
        position: "absolute",
        inset: 0,
        maskImage: `linear-gradient(${direction}, ${stops})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${stops})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: 1,
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  /* =========================================================
      Estilo do container (fixo + fade controlado)
     ========================================================= */
  const containerStyle = useMemo(() => {
    const isVertical = ["top", "bottom"].includes(config.position);
    const isHorizontal = ["left", "right"].includes(config.position);

    const baseStyle = {
      position: "fixed",
      pointerEvents: config.hoverIntensity ? "auto" : "none",
      opacity: isActive ? config.opacity : 0,
      zIndex: Z_MAX,
      transition: config.fadeIn ? `opacity ${config.fadeDuration}ms ${config.easing}` : undefined,
      ...config.style,
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || "100%";
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight || "6rem";
      baseStyle.height = "100%";
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, isActive, responsiveHeight, responsiveWidth]);

  // Injeção de estilos (CSS) na 1ª montagem
  useEffect(() => {
    if (typeof document === "undefined") return;
    injectStyles();
  }, []);

  return (
    <div
      ref={containerRef}
      className={["gradual-blur", "gradual-blur-page", config.className].join(" ")}
      style={containerStyle}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
      aria-hidden
    >
      <div className="gradual-blur-inner" style={{ position: "relative", width: "100%", height: "100%" }}>
        {blurDivs}
      </div>
    </div>
  );
}

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = "GradualBlur";
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;

/* ===========================
   Estilos injetados
=========================== */
const injectStyles = () => {
  const canUseDOM = typeof document !== "undefined";
  if (!canUseDOM) return;

  const styleId = "gradual-blur-styles";
  if (document.getElementById(styleId)) return;

  const css = `
  .gradual-blur { pointer-events: none; isolation: isolate; }
  .gradual-blur-inner { position: relative; width: 100%; height: 100%; pointer-events: none; }
  .gradual-blur-inner > div { -webkit-backdrop-filter: inherit; backdrop-filter: inherit; }
  @supports not (backdrop-filter: blur(1px)) {
    .gradual-blur-inner > div { background: rgba(0,0,0,0.3); opacity: 0.5; }
  }
  `;

  const el = document.createElement("style");
  el.id = styleId;
  el.textContent = css;
  document.head.appendChild(el);
};