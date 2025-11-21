// src/componentes/AnimaRolagem.jsx
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

/**
 * AnimaRolagem
 * — Inicia abaixo (startOffset px), sobe até a posição real (y:0),
 *   com fade e overshoot de escala opcionais e controláveis.
 *
 * Principais props:
 * - startOffset = 300        // px abaixo do lugar real
 * - duration = 1.2           // animação do eixo Y (subida)
 * - delay = 0                // atraso antes de iniciar
 * - ease = "power2.inOut"    // easing da subida (y)
 *
 * Fade:
 * - useFade = true
 * - startOpacity = 0.2
 * - endOpacity = 1
 * - fadeDuration = null      // se null, usa 'duration'
 * - fadeEase = "power2.out"
 *
 * Overshoot de escala:
 * - useScaleOvershoot = true
 * - startScale = 0.98
 * - peakScale = 1.04
 * - endScale = 1
 * - scaleUpDuration = 0.55   // tempo até o pico
 * - peakHold = 0             // seg segurando no pico (opcional)
 * - scaleDownDuration = 0.45 // volta ao tamanho final
 * - scaleEaseIn = "power2.out"
 * - scaleEaseOut = "power2.inOut"
 *
 * Disparo:
 * - startOnMount = true
 * - startWhenInView = false
 * - threshold = 0.25
 *
 * Outros:
 * - clip = false             // aplica overflow hidden no wrapper
 * - className, style
 *
 * Métodos via ref:
 * - play(), reset()
 */
const AnimaRolagem = forwardRef(function AnimaRolagem(
  {
    children,

    // Movimento vertical
    startOffset = 300,
    duration = 1.2,
    delay = 0,
    ease = "power2.inOut",

    // Fade
    useFade = true,
    startOpacity = 0.2,
    endOpacity = 1,
    fadeDuration = null,
    fadeEase = "power2.out",

    // Overshoot de escala
    useScaleOvershoot = true,
    startScale = 0.98,
    peakScale = 1.04,
    endScale = 1,
    scaleUpDuration = 0.55,
    peakHold = 0,
    scaleDownDuration = 0.45,
    scaleEaseIn = "power2.out",
    scaleEaseOut = "power2.inOut",

    // Disparo
    startOnMount = true,
    startWhenInView = false,
    threshold = 0.25,

    // Container
    clip = false,
    className = "",
    style = {},
  },
  ref
) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const observerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => startAnimation(),
    reset: () => resetState(),
  }));

  const resetState = () => {
    const el = rootRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (tlRef.current) tlRef.current.kill();

    gsap.set(el, {
      y: Math.abs(startOffset),
      opacity: useFade ? startOpacity : 1,
      scale: useScaleOvershoot ? startScale : 1,
    });
  };

  const startAnimation = () => {
    const el = rootRef.current;
    if (!el) return;

    // Limpeza
    if (tlRef.current) tlRef.current.kill();
    gsap.killTweensOf(el);

    // Estado inicial garantido
    gsap.set(el, {
      y: Math.abs(startOffset),
      opacity: useFade ? startOpacity : 1,
      scale: useScaleOvershoot ? startScale : 1,
      willChange: "transform, opacity",
    });

    const tl = gsap.timeline({
      delay,
      defaults: { overwrite: "auto" },
      onComplete: () => gsap.set(el, { clearProps: "willChange" }),
    });

    // 1) Subida (y: startOffset -> 0)
    tl.to(
      el,
      {
        y: 0,
        duration,
        ease,
      },
      0 // começa junto
    );

    // 2) Fade
    if (useFade) {
      tl.to(
        el,
        {
          opacity: endOpacity,
          duration: fadeDuration ?? duration,
          ease: fadeEase,
        },
        0 // em paralelo à subida
      );
    }

    // 3) Overshoot de escala (start -> peak -> hold -> end)
    if (useScaleOvershoot) {
      const scaleKeyframes = [];
      scaleKeyframes.push({ scale: peakScale, duration: scaleUpDuration, ease: scaleEaseIn });
      if (peakHold > 0) scaleKeyframes.push({ scale: peakScale, duration: peakHold, ease: "none" });
      scaleKeyframes.push({ scale: endScale, duration: scaleDownDuration, ease: scaleEaseOut });

      tl.to(
        el,
        {
          keyframes: scaleKeyframes,
        },
        0 // em paralelo
      );
    }

    tlRef.current = tl;
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Acessibilidade: reduz movimento
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (media && media.matches) {
      gsap.set(el, { y: 0, opacity: useFade ? endOpacity : 1, scale: useScaleOvershoot ? endScale : 1 });
      return;
    }

    resetState();

    if (startWhenInView) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observerRef.current?.disconnect();
          }
        },
        { threshold }
      );
      observerRef.current.observe(el);
    } else if (startOnMount) {
      startAnimation();
    }

    return () => {
      observerRef.current?.disconnect();
      if (tlRef.current) tlRef.current.kill();
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    startOffset,
    duration,
    delay,
    ease,
    useFade,
    startOpacity,
    endOpacity,
    fadeDuration,
    fadeEase,
    useScaleOvershoot,
    startScale,
    peakScale,
    endScale,
    scaleUpDuration,
    peakHold,
    scaleDownDuration,
    scaleEaseIn,
    scaleEaseOut,
    startOnMount,
    startWhenInView,
    threshold,
  ]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ ...(clip ? { overflow: "hidden" } : null), ...style }}
    >
      {children}
    </div>
  );
});

export default AnimaRolagem;