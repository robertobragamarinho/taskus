"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function SobSection({
  fixed,
  movable,
  peek = 120,       // quanto aparece quando fechado
  radius = 16,
  bgClassName = "bg-white",
  sheetClassName = "",
  trackClassName = "",
  maxWidth = "min(900px, 90vw)",
  zIndex = 30,
}) {
  const sheetRef = useRef(null);
  const spacerRef = useRef(null);

  const [closedY, setClosedY] = useState(0);

  // mede a altura real do painel para calcular closedY
  useLayoutEffect(() => {
    const measure = () => {
      if (!sheetRef.current) return;

      const h = sheetRef.current.getBoundingClientRect().height;

      const cy = Math.max(0, h - peek);
      setClosedY(cy);

      if (spacerRef.current) spacerRef.current.style.height = `${cy}px`;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [peek]);


  // update da posição durante o scroll
  useEffect(() => {
    const onScroll = () => {
      if (!sheetRef.current || !spacerRef.current) return;

      const spacerTop = spacerRef.current.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, -spacerTop / closedY));

      const newY = closedY * (1 - progress); //  -> closedY → 0
      sheetRef.current.style.transform = `translateY(${newY}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [closedY]);


  return (
    <div className={["relative w-full", trackClassName].join(" ")}>
      {/* REGIÃO QUE ABRE O PAINEL */}
      <div ref={spacerRef} aria-hidden />

      {/* FUNDO NORMAL */}
      <section className="w-full">
        {fixed}
      </section>

      {/* PAINEL MÓVEL */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none", // só ativa dentro do conteúdo
        }}
      >
        <div
          ref={sheetRef}
          className={[
            "pointer-events-auto will-change-transform",
            bgClassName,
            sheetClassName,
          ].join(" ")}
          style={{
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
            maxWidth,
          }}
        >
          {/* Grip opcional */}
          <div className="w-full flex justify-center pt-2 select-none">
            <div
              className="rounded-full"
              style={{
                width: 44,
                height: 5,
                background: "rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* conteúdo do painel */}
          {movable}
        </div>
      </div>
    </div>
  );
}