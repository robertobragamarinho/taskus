"use client";
import React, { useEffect, useRef, useCallback } from "react";

/**
 * LocalLenisScroll — smooth/inerte local, sem afetar o resto da página.
 * Props espelham Lenis, mas a física é aplicada apenas a este container.
 *
 * OBS:
 * - 'duration' e 'lerp' influenciam o amortecimento (friction) e a suavização por frame.
 * - 'syncTouch' aqui mantém o gesto responsivo, mas ainda com amortecimento.
 */
export default function LocalLenisScroll({
  children,
  className = "",
  style,
  // API "Lenis-like"
  duration = 1.35,           // maior = desacelera por mais tempo
  easing = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // easeOutExpo padrão
  smoothWheel = true,
  wheelMultiplier = 0.8,
  smoothTouch = true,
  touchMultiplier = 1.8,
  syncTouch = true,
  lerp = 0.07,               // suavização por frame (0..1)
  // limites
  maxVelocity = 60,          // px/frame
  ...rest
}) {
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef(0);
  const velocityRef = useRef(0);

  const draggingRef = useRef(false);
  const lastYRef = useRef(0);

  // converte duration/lerp em um "friction" interno
  // aproximação: menor lerp + maior duration => mais suave
  const friction = Math.max(0.03, Math.min(0.2, (1 - lerp) * (1 / (duration * 1.25)) + 0.04));

  const isScrollable = useCallback(() => {
    const el = scrollerRef.current;
    return !!el && el.scrollHeight > el.clientHeight + 1;
  }, []);

  const atTop = useCallback(() => {
    const el = scrollerRef.current;
    return !el || el.scrollTop <= 0;
  }, []);

  const atBottom = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return true;
    return el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
  }, []);

  const clampTarget = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    if (targetRef.current < 0) targetRef.current = 0;
    if (targetRef.current > max) targetRef.current = max;
  }, []);

  const animate = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const current = el.scrollTop;
    // interpola target -> current (lerp) para suavizar
    const desired = targetRef.current;
    const lerped = current + (desired - current) * Math.min(1, Math.max(0.01, lerp));

    // aplica easing incremental (suave) via “velocidade amortecida”
    let delta = lerped - current;
    velocityRef.current += delta * friction;

    // clamp de velocidade
    if (velocityRef.current > maxVelocity) velocityRef.current = maxVelocity;
    if (velocityRef.current < -maxVelocity) velocityRef.current = -maxVelocity;

    // aplica
    el.scrollTop = current + velocityRef.current;

    // amortecimento
    const decay = 1 - friction;
    velocityRef.current *= decay;

    const stillMoving =
      Math.abs(desired - el.scrollTop) > 0.3 || Math.abs(velocityRef.current) > 0.3;

    if (stillMoving) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = null;
    }
  }, [friction, lerp, maxVelocity]);

  const requestTick = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  // WHEEL
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (!isScrollable() || !smoothWheel) return; // não intercepta
      const dy = e.deltaY * wheelMultiplier;

      // pass-through nas bordas
      if ((dy < 0 && atTop()) || (dy > 0 && atBottom())) return;

      e.preventDefault();
      targetRef.current += dy;
      clampTarget();
      requestTick();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel, { passive: false });
  }, [isScrollable, smoothWheel, wheelMultiplier, atTop, atBottom, clampTarget, requestTick]);

  // TOUCH / DRAG (via Pointer Events)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !smoothTouch) return;

    const onPointerDown = (e) => {
      if (!isScrollable()) return;
      draggingRef.current = true;
      lastYRef.current = e.clientY;
      targetRef.current = el.scrollTop;
      // sem capture — queremos que o pai possa assumir nas bordas
    };

    const onPointerMove = (e) => {
      if (!draggingRef.current) return;
      const y = e.clientY;
      let dy = (lastYRef.current - y) * touchMultiplier;
      lastYRef.current = y;

      if (syncTouch) {
        // pass-through: se na borda e a intenção é sair, solta
        if ((dy < 0 && atTop()) || (dy > 0 && atBottom())) {
          draggingRef.current = false;
          return;
        }
      }

      targetRef.current += dy;
      clampTarget();

      // “chute” inicial proporcional, porém limitado
      const kick = Math.max(-maxVelocity, Math.min(maxVelocity, dy));
      velocityRef.current += kick;

      requestTick();
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      requestTick();
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerup", onPointerUp, { passive: true });
    el.addEventListener("pointercancel", onPointerUp, { passive: true });
    el.addEventListener("lostpointercapture", onPointerUp, { passive: true });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("lostpointercapture", onPointerUp);
    };
  }, [isScrollable, smoothTouch, touchMultiplier, syncTouch, clampTarget, requestTick, atTop, atBottom, maxVelocity]);

  // Redimensionamento — mantém alvo válido
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      targetRef.current = el.scrollTop;
      clampTarget();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [clampTarget]);

  return (
    <div
      ref={scrollerRef}
      className={["h-full w-full overflow-y-auto will-change-scroll", className].join(" ")}
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "auto", // permite scroll chaining para empilhamento
        touchAction: "pan-y",        // gestos verticais nativos quando não interceptamos
        ...style,
      }}
      {...rest}
    >
      <div className="min-h-full">{children}</div>
    </div>
  );
}