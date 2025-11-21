// src/componentes/RevealUpGSAP.jsx
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * RevealUpGSAP — surgir de baixo p/ cima com GSAP (versão otimizada)
 *
 * Novidades/ajustes:
 *  - Histerese (enter/exit) para evitar flicker perto do threshold
 *  - Pré-decodificação de IMG (decode()) antes de observar, reduz "snap"
 *  - Suporte a root do IntersectionObserver (scroll container custom)
 *  - Limpeza de will-change pós-animação e lock opcional de "once"
 *  - Opções para content-visibility e contain-intrinsic-size (layout estável)
 *
 * Props novas:
 *  - root: Element | string | null — raiz do IO (ex: document.querySelector('#main'))
 *  - enterThreshold: number (0..1) — limiar para entrar (default 0.28)
 *  - exitThreshold: number (0..1) — limiar para sair (default 0.18)
 *  - contentVisibilityAuto: boolean — aplica content-visibility:auto (default false)
 *  - intrinsicSize: string — ex "900px 1200px" (reserva espaço; default "")
 *  - gpuHint: boolean — aplica force3D/will-change (default true)
 *  - fastOutFactor: number — duração de saída = duration*fastOutFactor (default 0.6)
 *
 * Props existentes mantidas.
 */
export default function RevealUpGSAP({
  children,
  as: Tag = "div",
  className = "",
  style,
  // comportamento
  once = false,
  animateOpacity = true,
  waitForImageLoad = true,

  // thresholds / observer
  threshold = 0.2,                // compat (ainda usado se enter/exit não passados)
  enterThreshold = 0.28,
  exitThreshold = 0.18,
  root = null,                    // Element | selector | null
  rootMargin = "0px 0px -50% 0px",

  // animação
  duration = 1.35,
  delay = 0,
  ease = "expo.out",
  fastOutFactor = 0.6,            // saída mais curta

  // estado inicial
  yStart = 24,
  opacityStart = 0,
  gpuHint = true,

  // layout estável
  contentVisibilityAuto = false,
  intrinsicSize = "",

  ...rest
}) {
  const elRef = useRef(null);
  const tweenRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const lastInsideRef = useRef(false);

  const isImg = String(Tag).toLowerCase() === "img";

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Aplica dicas de layout estável, se pedido
    if (contentVisibilityAuto) {
      el.style.contentVisibility = "auto";
      if (intrinsicSize) el.style.containIntrinsicSize = intrinsicSize;
    }

    // Estado inicial
    gsap.set(el, {
      opacity: animateOpacity ? opacityStart : 1,
      y: yStart,
      ...(gpuHint ? { willChange: "transform,opacity", force3D: true } : {}),
      display: isImg ? "inline-block" : undefined,
    });

    const clearGPU = () => {
      if (!gpuHint) return;
      // limpa só o will-change, mantém transform/opacity finais
      gsap.set(el, { clearProps: "will-change" });
    };

    const playIn = () => {
      if (once && hasAnimatedRef.current) return;
      tweenRef.current?.kill();

      if (prefersReduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        hasAnimatedRef.current = true;
        clearGPU();
        return;
      }

      tweenRef.current = gsap.to(el, {
        opacity: animateOpacity ? 1 : 1,
        y: 0,
        duration,
        delay,
        ease,
        overwrite: true,
        onComplete: () => {
          hasAnimatedRef.current = true;
          clearGPU();
        },
      });
    };

    const playOut = () => {
      if (once) return; // não reverte
      tweenRef.current?.kill();

      if (prefersReduced) return;

      tweenRef.current = gsap.to(el, {
        opacity: animateOpacity ? opacityStart : 1,
        y: yStart,
        duration: Math.max(0.25, duration * fastOutFactor),
        ease: "expo.in",
        overwrite: true,
        onStart: () => {
          if (gpuHint) gsap.set(el, { willChange: "transform,opacity", force3D: true });
        },
      });
    };

    // Resolve root (pode ser seletor)
    let ioRoot = null;
    if (root instanceof Element) ioRoot = root;
    else if (typeof root === "string") ioRoot = document.querySelector(root) || null;

    // Histerese: usa enter/exit distintos; se não vieram, cai no "threshold"
    const enterT = typeof enterThreshold === "number" ? enterThreshold : threshold;
    const exitT  = typeof exitThreshold  === "number" ? exitThreshold  : threshold * 0.7;

    const io = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio || 0;
        const nowInside = entry.isIntersecting && ratio >= enterT;

        // entra
        if (!lastInsideRef.current && nowInside) {
          lastInsideRef.current = true;
          playIn();
          return;
        }

        // sai (somente quando realmente passa do limiar de saída)
        const shouldExit = (!entry.isIntersecting || ratio <= exitT);
        if (lastInsideRef.current && shouldExit) {
          lastInsideRef.current = false;
          playOut();
        }
      },
      {
        root: ioRoot,
        rootMargin,
        // um array curtinho cobre bem; o histerese cuida do restante
        threshold: [exitT, enterT],
      }
    );

    // IMG: pré-decodifica p/ reduzir layout shift antes de observar
    let removedListeners = false;
    const observeNow = () => io.observe(el);

    if (isImg && waitForImageLoad) {
      const imgEl = /** @type {HTMLImageElement} */ (el);

      const safeObserve = () => {
        if (!removedListeners) observeNow();
      };

      if (imgEl.complete) {
        // já carregada — tenta decode (se suportado) antes de observar
        imgEl.decode?.().finally(safeObserve);
      } else {
        const onLoad = () => {
          imgEl.decode?.().finally(safeObserve);
        };
        const onError = () => safeObserve();

        imgEl.addEventListener("load", onLoad, { once: true });
        imgEl.addEventListener("error", onError, { once: true });

        // cleanup guard
        removedListeners = true;
        return () => {
          io.disconnect();
          tweenRef.current?.kill();
          imgEl.removeEventListener("load", onLoad);
          imgEl.removeEventListener("error", onError);
        };
      }
    } else {
      observeNow();
    }

    return () => {
      io.disconnect();
      tweenRef.current?.kill();
    };
  }, [
    once,
    animateOpacity,
    waitForImageLoad,
    threshold,
    enterThreshold,
    exitThreshold,
    root,
    rootMargin,
    duration,
    delay,
    ease,
    fastOutFactor,
    yStart,
    opacityStart,
    gpuHint,
    contentVisibilityAuto,
    intrinsicSize,
    isImg,
  ]);

  if (isImg) {
    // Para IMG, children não renderizam
    const { alt = "", loading = "lazy", decoding = "async", fetchpriority, ...imgRest } = rest;
    return (
      <img
        ref={elRef}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding={decoding}
        {...(fetchpriority ? { fetchpriority } : {})}
        {...imgRest}
      />
    );
  }

  // Wrapper genérico
  const mergedStyle =
    contentVisibilityAuto || intrinsicSize
      ? {
          contentVisibility: contentVisibilityAuto ? "auto" : undefined,
          containIntrinsicSize: intrinsicSize || undefined,
          ...style,
        }
      : style;

  return (
    <Tag ref={elRef} className={className} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}