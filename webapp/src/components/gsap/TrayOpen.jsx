// src/componentes/TrayAnimations.jsx (Contém TraySlideUp e TrayOpen)
"use client";
import React, { useEffect, useRef } from "react";

/**
 * TraySlideUp — desloca de baixo (startY) até o lugar original (0)
 * Recursos:
 *  - startY (px) — ponto inicial abaixo (default 140)
 *  - animateOpacity/opacityStart — controla fade opcional
 *  - blurStart — inicia com blur e limpa ao entrar
 *  - staggerChildren — aplica atrasos em filhos diretos
 *  - threshold/rootMargin/once/revertOnExit — via IntersectionObserver
 *  - as — troca o wrapper (div, section, etc.)
 *  - onEnter/onExit — callbacks
 *
 * Uso básico:
 *  <TraySlideUp startY={160}><div>Conteúdo</div></TraySlideUp>
 */
function TraySlideUp({
  // Estrutura/markup
  as: Tag = "div",
  children,
  className = "",
  style,
  baseClass = "tray-slide",
  activeClass = "tray-slide-active",

  // Movimento
  startY = 140, // começa abaixo do original
  duration = 700, // ms
  delay = 0, // ms
  easing = "cubic-bezier(.22,1,.36,1)",

  // Efeitos opcionais
  animateOpacity = false,
  opacityStart = 0, // só usado se animateOpacity = true
  blurStart = 0, // ex.: 8, para começar borrado e limpar

  // Stagger simples nos filhos diretos
  staggerChildren = 0, // ms; 0 = desativado
  staggerFrom = "start", // "start" | "center" | "end"

  // IO config
  threshold = 0.2,
  rootMargin = "0px 0px -50% 0px",
  once = true,
  revertOnExit = true,

  // Callbacks
  onEnter, // () => void
  onExit, // () => void

  // Outros
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Normaliza valores
    const start = typeof startY === "number" ? `${startY}px` : startY;

    // ===== Estado inicial =====
    el.style.setProperty("--tray-startY", start);
    el.style.setProperty("--tray-t", `${duration}ms`);
    el.style.setProperty("--tray-delay", `${delay}ms`);
    el.style.setProperty("--tray-ease", easing);
    el.style.setProperty("--tray-opacity", animateOpacity ? opacityStart : 1);
    el.style.setProperty("--tray-blur", blurStart > 0 ? `${blurStart}px` : "0px");

    // Stagger: aplica um delay incremental nos filhos diretos
    if (staggerChildren > 0) {
      const kids = Array.from(el.querySelectorAll(":scope > *"));
      const len = kids.length;

      const idxFrom = (i) => {
        if (staggerFrom === "center") {
          const mid = (len - 1) / 2;
          return Math.abs(i - mid);
        }
        if (staggerFrom === "end") {
          return (len - 1) - i;
        }
        return i; // start
      };

      kids.forEach((kid, i) => {
        const idx = idxFrom(i);
        // Somamos o delay base + incremento por item (em ms)
        const totalDelayMs = delay + idx * staggerChildren;
        kid.style.setProperty("--tray-child-delay", `${totalDelayMs}ms`);
        kid.classList.add("tray-child"); // classe auxiliar
      });
    }

    // ===== Acessibilidade: reduzir movimento =====
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      el.classList.add(activeClass);
      // limpa efeitos para estado final imediato
      el.style.setProperty("--tray-opacity", 1);
      el.style.setProperty("--tray-blur", "0px");
      return;
    }

    // ===== Observer =====
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > threshold) {
          el.classList.add(activeClass);
          onEnter && onEnter();
          if (once) io.unobserve(el);
        } else if (!once && revertOnExit) {
          el.classList.remove(activeClass);
          onExit && onExit();
        }
      },
      { threshold: [0, threshold, 1], rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      // Limpeza opcional de estilos auxiliares (não estritamente necessária)
      // Array.from(el.querySelectorAll(".tray-child")).forEach(kid => {
      //   kid.style.removeProperty("--tray-child-delay");
      //   kid.classList.remove("tray-child");
      // });
    };
  }, [
    startY,
    duration,
    delay,
    easing,
    animateOpacity,
    opacityStart,
    blurStart,
    staggerChildren,
    staggerFrom,
    threshold,
    rootMargin,
    once,
    revertOnExit,
    activeClass,
    onEnter,
    onExit,
  ]);

  return (
    <>
      <Tag
        ref={ref}
        className={`${baseClass} ${className}`}
        style={style}
        {...rest}
      >
        {children}
      </Tag>

      {/* CSS minimalista; pode mover para um CSS global */}
      <style>{`
        .${baseClass} {
          transform: translate3d(0, var(--tray-startY, 140px), 0);
          opacity: var(--tray-opacity, 1);
          filter: blur(var(--tray-blur, 0px));
          transition:
            transform var(--tray-t, 700ms) var(--tray-ease, ease) var(--tray-delay, 0ms),
            opacity   var(--tray-t, 700ms) linear var(--tray-delay, 0ms),
            filter    var(--tray-t, 700ms) var(--tray-ease, ease) var(--tray-delay, 0ms);
          will-change: transform, opacity, filter;
        }
        .${activeClass} {
          transform: translate3d(0, 0, 0);
          opacity: 1;
          filter: blur(0px);
        }

        /* Stagger nos filhos diretos (se .tray-child foi aplicada) */
        .${baseClass} > .tray-child {
          transition-delay: var(--tray-child-delay, 0ms);
        }

        @media (prefers-reduced-motion: reduce) {
          .${baseClass} {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }
      `}</style>
    </>
  );
}

// Exporta o mesmo componente com o nome TrayOpen
export const TrayOpen = TraySlideUp;

// Exporta o componente principal como default
export default TraySlideUp;


