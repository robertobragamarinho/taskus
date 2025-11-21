import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * UnderSection — V3 (fallback à prova de transform/overflow)
 *
 * Problema comum: `position: sticky` quebra quando algum ancestral tem `transform`,
 * `filter`, `perspective` ou `overflow` diferente de `visible` (bem frequente em GSAP).
 * Resultado: as sessões ficam apenas empilhadas (uma abaixo da outra).
 *
 * Solução V3:
 * - Modo padrão (sticky) simples e performático.
 * - Modo fallback (fixed) que "pina" a Sessão 1 com `position: fixed` durante o
 *   intervalo de rolagem, para funcionar mesmo quando sticky não é possível.
 *
 * PROPS
 * - section1, section2: ReactNode
 * - height: string (ex.: "100vh")
 * - extraScroll: string (ex.: "100vh")
 * - className: string
 * - onProgress?: (p: number) => void (0→1 enquanto a Sessão 1 sai)
 * - forceFixed?: boolean — força usar o modo FIXED (útil se há transform/ScrollSmoother no ancestral)
 */
export default function UnderSection({
  section1,
  section2,
  height = "100vh",
  extraScroll = "100vh",
  className = "",
  onProgress,
  forceFixed = false,
}) {
  const rootRef = useRef(null);
  const topLaneRef = useRef(null); // trilho da Sessão 1
  const [useFixed, setUseFixed] = useState(forceFixed);

  // Detecta se o sticky está funcionando; se não, troca para modo fixed automaticamente
  useEffect(() => {
    if (forceFixed) return; // respeita override do usuário
    const test = document.createElement("div");
    test.style.position = "sticky";
    test.style.top = "1px";
    const works = test.style.position.includes("sticky");
    // Isso só testa suporte do navegador; quebra real pode vir de ancestors.
    // Se você usa GSAP ScrollSmoother/transform no pai, recomenda-se setUseFixed(true).
    setUseFixed(!works ? true : false);
  }, [forceFixed]);

  // Observa progresso da transição no modo FIXED
  useEffect(() => {
    if (!onProgress) return;
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    const loop = () => {
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const extraPx = toPx(getCSSVar(root, "--under-extra"), viewportH);
      const rect = root.getBoundingClientRect();
      // Quando o topo do root encosta no topo da viewport, começamos (p=0)
      // Quando já rolamos `extraPx`, p → 1
      const scrolled = Math.min(Math.max(-rect.top, 0), extraPx);
      const p = extraPx > 0 ? scrolled / extraPx : 0;
      onProgress(Number.isFinite(p) ? p : 0);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onProgress]);

  const styleVars = useMemo(() => ({ height, extraScroll }), [height, extraScroll]);

  return (
    <section
      ref={rootRef}
      className={["relative w-full overflow-x-hidden", className].filter(Boolean).join(" ")}
      style={{ ["--under-height"]: styleVars.height, ["--under-extra"]: styleVars.extraScroll }}
    >
      {useFixed ? (
        <FixedMode section1={section1} section2={section2} />
      ) : (
        <StickyMode section1={section1} section2={section2} topLaneRef={topLaneRef} />
      )}
    </section>
  );
}

/**
 * MODO STICKY — mais performático; requer que ancestrais NÃO tenham transform/filter/perspective/overflow oculto
 */
function StickyMode({ section1, section2, topLaneRef }) {
  return (
    <>
      {/* TRILHO DA SESSÃO 2 */}
      <div className="relative" style={{ height: "calc(var(--under-height) + var(--under-extra))" }}>
        <div className="sticky top-0 z-0" style={{ height: "var(--under-height)" }}>
          {section2}
        </div>
      </div>

      {/* TRILHO DA SESSÃO 1 (sobreposto) */}
      <div
        ref={topLaneRef}
        className="relative"
        style={{
          height: "calc(var(--under-height) + var(--under-extra))",
          marginTop: "calc(var(--under-height) * -1)", // sobrepõe por cima da Sessão 2
        }}
      >
        <div className="sticky top-0 z-10" style={{ height: "var(--under-height)", transform: "translateZ(0)" }}>
          {section1}
        </div>
      </div>
    </>
  );
}

/**
 * MODO FIXED — funciona mesmo com ancestors transformados; simula sticky com position: fixed
 */
function FixedMode({ section1, section2 }) {
  const pinRef = useRef(null);
  const holderRef = useRef(null);
  const [isPinned, setPinned] = useState(false);
  const [pinStyle, setPinStyle] = useState({});

  useEffect(() => {
    const holder = holderRef.current;
    const pinEl = pinRef.current;
    if (!holder || !pinEl) return;

    let raf = 0;
    const onScroll = () => {
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const h = toPx(getCSSVar(holder, "--under-height"), viewportH);
      const extra = toPx(getCSSVar(holder, "--under-extra"), viewportH);

      const rect = holder.getBoundingClientRect();
      const startStick = 0; // quando o topo do holder encosta no topo
      const endStick = -extra; // quando rolou toda a distância extra

      // Quando rect.top <= 0 e rect.top > -extra → pinado (fixed)
      const shouldPin = rect.top <= startStick && rect.top > endStick - 0.5; // tolerância

      if (shouldPin) {
        if (!isPinned) setPinned(true);
        setPinStyle({ position: "fixed", top: 0, left: 0, right: 0, height: h + "px", zIndex: 10 });
      } else if (rect.top <= endStick) {
        // Passou do fim — trava no topo do holder (como se tivesse "saído")
        setPinned(false);
        setPinStyle({ position: "absolute", top: extra + "px", left: 0, right: 0, height: h + "px", zIndex: 10 });
      } else {
        // Antes de começar — fica na posição original
        setPinned(false);
        setPinStyle({ position: "absolute", top: 0, left: 0, right: 0, height: h + "px", zIndex: 10 });
      }
      raf = requestAnimationFrame(onScroll);
    };
    raf = requestAnimationFrame(onScroll);
    return () => cancelAnimationFrame(raf);
  }, [isPinned]);

  return (
    <div ref={holderRef} className="relative" style={{ height: "calc(var(--under-height) + var(--under-extra))" }}>
      {/* Sessão 2: ocupa o fundo visual */}
      <div className="absolute inset-0 z-0" style={{ height: "var(--under-height)" }}>
        {section2}
      </div>

      {/* Sessão 1: pin simulando sticky */}
      <div ref={pinRef} style={pinStyle}>
        {section1}
      </div>

      {/* Empurra o fluxo para permitir rolagem */}
      <div aria-hidden="true" style={{ height: "calc(var(--under-height) + var(--under-extra))" }} />
    </div>
  );
}

// Helpers
function getCSSVar(el, name) {
  const v = getComputedStyle(el).getPropertyValue(name);
  return v || "0px";
}

function toPx(value, viewportH) {
  if (!value || typeof value !== "string") return 0;
  const v = value.trim();
  if (v.endsWith("px")) return parseFloat(v);
  if (v.endsWith("vh")) return (parseFloat(v) / 100) * viewportH;
  if (v.endsWith("vw")) return (parseFloat(v) / 100) * (window.innerWidth || document.documentElement.clientWidth);
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

