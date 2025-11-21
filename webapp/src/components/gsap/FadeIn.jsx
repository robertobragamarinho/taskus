// src/componentes/FadeIn.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function FadeIn({
  as: Tag = "div",
  children,
  delay = 0,
  duration = 0.7,
  from = "bottom",     // "bottom" | "top" | "left" | "right" | "none"
  distance = 32,       // px de deslocamento inicial
  inView = true,       // anima ao entrar na viewport
  once = true,         // anima apenas uma vez
  className = "",
}) {
  const ref = useRef(null);
  const ranRef = useRef(false);

  // calcula variáveis de origem
  const fromVars = () => {
    const base = { autoAlpha: 0 };
    if (from === "bottom") base.y = distance;
    else if (from === "top") base.y = -distance;
    else if (from === "left") base.x = -distance;
    else if (from === "right") base.x = distance;
    return base;
  };

  const play = () => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { ...fromVars(), willChange: "transform, opacity", force3D: true },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        clearProps: "transform,willChange",
        onComplete: () => (ranRef.current = true),
      }
    );
  };

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // respeita prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.set(el, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }

    // estado inicial antes do paint
    gsap.set(el, { ...fromVars(), willChange: "transform, opacity" });

    if (!inView) {
      play();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!once || !ranRef.current) play();
          if (once) io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, duration, from, distance, inView, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}