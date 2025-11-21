// MotionSectionsSlide.jsx (suave ida e volta)
"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function MotionTricks({
  top,
  bottom,
  height = "100vh",
  duration = 4000,   // distância de rolagem em px
  start = "top top",
  markers = false,
}) {
  const containerRef = useRef(null);
  const topRef = useRef(null);

  useLayoutEffect(() => {
    
    const el = containerRef.current;
    const topEl = topRef.current;
    if (!el || !topEl) return;

    const ctx = gsap.context(() => {
      // Estado inicial estável + dica de GPU
      gsap.set(topEl, {
        yPercent: 0,
        zIndex: 2,
        force3D: true,
        willChange: "transform",
        transform: "translate3d(0,0,0)",
      });

      const tl = gsap.fromTo(
        topEl,
        { yPercent: 0 },
        {
          yPercent: -100,          // sobe 100% (revela o bottom)
          ease: "none",
          force3D: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start,
            end: () => `+=${duration}`,   // garante consistência em refresh
            scrub: 0.5,                   // leve amortecimento melhora a volta
            pin: true,
            pinSpacing: "margin",         // reduz microjump ao soltar o pin
            anticipatePin: 1,             // suaviza a entrada/saída do pin
            markers,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              // evita drift ao recalcular: volta pro estado zero antes do layout novo
              gsap.set(topEl, { yPercent: 0 });
            },
          },
        }
      );

      // Se imagens/fonte carregarem depois, recalcula
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [duration, start, markers]);

  return (
    <>
      <style>{`
        .mss-wrap { position: relative; width: 100%; height: ${height}; overflow: hidden; }
        .mss-layer { position: absolute; inset: 0; display: grid; place-items: center; padding: 0vw; box-sizing: border-box; }
        .mss-bottom { z-index: 1; background: #fff; color: #0b0b0b; }
        .mss-top { z-index: 2; background: linear-gradient(180deg, #0d0430 0%, #0f0d4e 100%); color: #fff; }
        .mss-card { max-width: 900px;}
      `}</style>

      <main ref={containerRef} className="mss-wrap">
        {/* camada de baixo (revelada) */}
        <section className="mss-layer mss-bottom">
          <div className="mss-card">{bottom}</div>
        </section>

        {/* camada de cima (desliza para revelar a de baixo) */}
        <section ref={topRef} className="mss-layer mss-top">
          <div className="mss-card">{top}</div>
        </section>
      </main>
    </>
  );
}