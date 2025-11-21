// src/components/Gradient.jsx
import React, { useEffect } from "react";

export default function Gradient({
  // VISUAL
  size = "70vw",
  desktopSize = "500px",
  speed = "6s",
  easing = "cubic-bezier(0.8, 0.2, 0.2, 0.8)",
  colorA = "hsl(222 100% 50% / 1)",
  colorB = "hsl(164 79% 71% / 1)",
  blurDivisor = 5,
  maxOpacity = 0.9,
  fade = 1.3, // duração do fade (s)

  // TOGGLES
  // Agora usamos DOIS conjuntos de marcadores:
  // - activateOnId: quando QUALQUER um estiver visível -> LIGA
  // - deactivateOnId: quando QUALQUER um estiver visível -> DESLIGA
  // Regra de prioridade: desativar > ativar (se ambos visíveis, prevalece DESLIGAR)
  activateOnId = null,      // string ou array
  deactivateOnId = null,    // string ou array
  threshold = 0.25,
  rootMargin = "0px",
}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // ==========================================================
    // 1) CRIA (OU PEGA) O BLOB GLOBAL
    // ==========================================================
    let blob = document.getElementById("global-gradient-blob");
    if (!blob) {
      blob = document.createElement("div");
      blob.id = "global-gradient-blob";
      document.body.insertBefore(blob, document.body.firstChild);
    }

    // ==========================================================
    // 2) CSS — INJETADO DINAMICAMENTE (mantido como estava)
    // ==========================================================
    let style = document.getElementById("global-gradient-style");
    const css = `
      @keyframes gradient-rotate {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      #global-gradient-blob {
        --size: ${size};
        --speed: ${speed};
        --easing: ${easing};
        --colorA: ${colorA};
        --colorB: ${colorB};
        --blurDivisor: ${blurDivisor};

        /* CENTRALIZAÇÃO */
        position: fixed;
        inset: 0;
        margin: auto;
        width: var(--size);
        height: var(--size);

        /* VISUAL */
        filter: blur(calc(var(--size) / var(--blurDivisor)));
        background-image: linear-gradient(var(--colorA), var(--colorB));
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        pointer-events: none;
        z-index: 0; 
        will-change: transform, filter, opacity;
        animation: gradient-rotate var(--speed) var(--easing) alternate infinite;

        /* default = DESLIGADO (CSS), mas ligaremos via JS logo abaixo */
        opacity: 0;
        animation-play-state: paused;
        transition: opacity ${fade}s ease;
      }

      /* ON → LIGA COM FADE */
      #global-gradient-blob.on {
        opacity: ${maxOpacity};
        animation-play-state: running;
      }

      /* RESPONSIVE */
      @media (min-width: 720px) {
        #global-gradient-blob {
          --size: ${desktopSize};
        }
      }

      /* REDUZ MOVIMENTO */
      @media (prefers-reduced-motion: reduce) {
        #global-gradient-blob {
          animation: none !important;
        }
      }

      /* FUNDOS — preserva o azul do seu site */
      html, body {
        margin: 0;
        background-color:  !important;
      }
    `;

    if (!style) {
      style = document.createElement("style");
      style.id = "global-gradient-style";
      style.textContent = css;
      document.head.appendChild(style);
    } else if (style.textContent !== css) {
      style.textContent = css;
    }

    // ==========================================================
    // 3) ESTADO INICIAL: LIGADO até encontrar "desativar"
    //    (persistência: só muda quando ver marcadores)
    // ==========================================================
    const setOn = (flag) => {
      if (flag) blob.classList.add("on");
      else blob.classList.remove("on");
    };
    setOn(true); // começa visível

    // Se não há quaisquer marcadores, nada a observar
    const actIds = Array.isArray(activateOnId) ? activateOnId : (activateOnId ? [activateOnId] : []);
    const deactIds = Array.isArray(deactivateOnId) ? deactivateOnId : (deactivateOnId ? [deactivateOnId] : []);
    if (actIds.length === 0 && deactIds.length === 0) {
      return;
    }

    // Busca os elementos dos dois grupos
    const actTargets = actIds.map((id) => document.getElementById(id)).filter(Boolean);
    const deactTargets = deactIds.map((id) => document.getElementById(id)).filter(Boolean);

    // Se não houver nada no DOM, mantém estado atual (ON) e sai
    if (actTargets.length === 0 && deactTargets.length === 0) {
      return;
    }

    // ==========================================================
    // 4) OBSERVER COM ESTADO PERSISTENTE
    //    - Se QUALQUER desativador visível -> OFF (prioridade)
    //    - Senão, se QUALQUER ativador visível -> ON
    //    - Senão, NÃO MUDA (persiste)
    // ==========================================================
    let anyDeactVisible = false;
    let anyActVisible = false;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const update = () => {
      if (anyDeactVisible) {
        setOn(false);
      } else if (anyActVisible) {
        setOn(true);
      } else {
        // nenhum marcador visível -> persiste estado atual
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let touched = false;

        for (const e of entries) {
          const visible = e.isIntersecting && e.intersectionRatio >= threshold;

          if (e.target.__markerType === "deact") {
            if (anyDeactVisible !== (anyDeactVisible || visible)) {
              // recomputar depois do loop
            }
          }
          if (e.target.__markerType === "act") {
            if (anyActVisible !== (anyActVisible || visible)) {
              // recomputar depois do loop
            }
          }
          touched = true;
        }

        if (touched) {
          // Recalcula flags varrendo os alvos (mais simples e confiável)
          anyDeactVisible = deactTargets.some((el) => {
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const vw = window.innerWidth || document.documentElement.clientWidth;
            const vert = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
            const horz = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
            const area = r.width * r.height || 1;
            const ratio = (vert * horz) / area;
            return ratio >= threshold;
          });

          anyActVisible = actTargets.some((el) => {
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const vw = window.innerWidth || document.documentElement.clientWidth;
            const vert = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
            const horz = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
            const area = r.width * r.height || 1;
            const ratio = (vert * horz) / area;
            return ratio >= threshold;
          });

          update();
        }
      },
      { root: null, rootMargin, threshold: thresholds }
    );

    // Marca tipo e observa
    deactTargets.forEach((el) => {
      el.__markerType = "deact";
      observer.observe(el);
    });
    actTargets.forEach((el) => {
      el.__markerType = "act";
      observer.observe(el);
    });

    // Avaliação inicial (caso a página carregue em meio a um marcador)
    anyDeactVisible = deactTargets.some((el) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const vert = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const horz = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
      const area = r.width * r.height || 1;
      const ratio = (vert * horz) / area;
      return ratio >= threshold;
    });

    anyActVisible = actTargets.some((el) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const vert = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const horz = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
      const area = r.width * r.height || 1;
      const ratio = (vert * horz) / area;
      return ratio >= threshold;
    });

    update();

    return () => {
      observer.disconnect();
      // limpa marcas temporárias
      deactTargets.forEach((el) => { try { delete el.__markerType; } catch {} });
      actTargets.forEach((el) => { try { delete el.__markerType; } catch {} });
    };
  }, [
    size, desktopSize, speed, easing, colorA, colorB, blurDivisor,
    maxOpacity, fade,
    activateOnId, deactivateOnId,
    threshold, rootMargin
  ]);

  return null;
}