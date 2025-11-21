// src/componentes/ShimmerButtonCta.jsx
import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function ShimmerButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  size = "px-2 py-3 w-[80vw]",
  radius = "rounded-full",
  font = "font-semibold text-[1.05rem]",
  border = "border border-white/20",
  textColor = "text-[#00005f]",
  bg = "bg-white",

  // ===== Toggle de animação
  introEnabled = true,

  // ===== Keyframes (frações da largura final)
  openMin = 0.2,
  openPeak = 1.08,
  openEnd = 1.0,

  // ===== Tempos (s)
  tMinDelay = 0,
  tToPeak = 0.45,
  tPeakHold = 0.12,
  tToEnd = 0.35,

  // ===== Easings
  easeToPeak = "power3.out",
  easeToEnd = "power2.out",

  // ===== Forma / direção
  startAsCircle = true,
  openDirection = "ltr",      // "ltr" | "rtl" | "center"

  // ===== Replay ao entrar em viewport
  viewThreshold = 0.35,
  reTriggerDelay = 0,

  // =========================
  //    ÍCONE DE INTRO
  // =========================
  iconIntroEnabled = true,
  iconFollowEdge = true,
  iconFromScale = 0.7,
  iconPeakScale = 1.1,
  iconEndScale = 0.95,
  iconFromRotate = -20,
  iconPeakRotate = 0,
  iconEndRotate = 0,
  iconFromY = 6,
  iconPeakY = 0,
  iconEndY = 0,
  iconFromOpacity = 1,
  iconPeakOpacity = 1,
  iconEndOpacity = 0,
  iconEaseIn = "back.out(1.4)",
  iconEaseOut = "power2.out",
  iconEdgeTravel = 12,
  iconRevealOffset = 0.15,

  // =========================
  //   TOQUE / “TAP” ANIMA
  // =========================
  tapEnabled = true,
  tapCloseDur = 0.48,          // base maior p/ permitir segmentação suave
  tapHold = 1.0,               // *** fica 3s com o check visível ***
  tapOpenDur = 0.48,           // parte total de reabertura (usada nas fases)
  tapEaseClose = "power2.inOut",
  tapEaseOpen = "power2.out",
  tapCallOn = "afterHold",     // "start" | "afterClose" | "afterHold" | "afterOpen"
  tapDisableDuring = true,
  tapSpeed = 1,

  // ===== Reabertura “do círculo”
  reopenOvershoot = 1.06,
  reopenWidthEase1 = "power3.out",
  reopenWidthEase2 = "power2.inOut",
  reopenGlideDur = 0.26,
  reopenBreathDur = 0.18,
  reopenStagger = 0.06,

  ...rest
}) {
  const isDisabled = disabled || loading;

  const btnRef = useRef(null);
  const visRef = useRef(null);
  const visIconRef = useRef(null);
  const checkIconRef = useRef(null);
  const contentRef = useRef(null);
  const endIconRef = useRef(null);

  const introTlRef = useRef(null);
  const tapTlRef = useRef(null);
  const tapBusyRef = useRef(false);

  const roRef = useRef(null);
  const ioRef = useRef(null);
  const rafResizeRef = useRef(null);

  const DIM = useRef({ W: 0, H: 0 });

  const BASE_CLASSES = [
    "relative flex w-full select-none",
    "items-center justify-between",
    "overflow-hidden",
    size,
    radius,
    font,
    textColor,
    isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
    className,
  ].join(" ");

  const measure = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return null;
    const W = btn.offsetWidth || 0;
    const H = btn.offsetHeight || 0;
    return { W, H };
  }, []);

  const transformOriginByDirection = useCallback(() => {
    switch (openDirection) {
      case "rtl":    return "right center";
      case "center": return "center center";
      default:       return "left center";
    }
  }, [openDirection]);

  const initialScaleFrom = useCallback((W, H) => {
    if (startAsCircle) return W > 0 ? (H / W) : 0.0001;
    return Math.max(0, openMin || 0.0001);
  }, [startAsCircle, openMin]);

  const setInitial = useCallback(() => {
    const dims = measure();
    if (!dims) return;
    const { W, H } = dims;

    const changed = Math.abs(DIM.current.W - W) > 1 || Math.abs(DIM.current.H - H) > 1;
    if (changed) DIM.current = { W, H };

    const vis = visRef.current;
    const content = contentRef.current;
    const endIcon = endIconRef.current;
    const introIcon = visIconRef.current;
    const checkIcon = checkIconRef.current;

    if (!vis || !content || !introIcon || !checkIcon) return;

    gsap.set(vis, {
      position: "absolute",
      top: 0,
      left: openDirection === "rtl" ? "auto" : 0,
      right: openDirection === "rtl" ? 0 : "auto",
      height: H,
      width: W,
      borderRadius: H / 2,
      transformOrigin: transformOriginByDirection(),
      willChange: "transform",
      pointerEvents: "none",
      force3D: true,
      xPercent: 0,
      scaleY: 1,
    });

    gsap.set(content, { autoAlpha: 1 });
    if (endIcon) gsap.set(endIcon, { autoAlpha: 0 });

    const xStart =
      iconFollowEdge
        ? (openDirection === "rtl" ? iconEdgeTravel : openDirection === "ltr" ? -iconEdgeTravel : 0)
        : 0;

    gsap.set(introIcon, {
      autoAlpha: iconFromOpacity,
      scale: iconFromScale,
      rotate: iconFromRotate,
      y: iconFromY,
      x: xStart,
      force3D: true,
    });

    gsap.set(checkIcon, {
      autoAlpha: 0,
      scale: 0.7,
      rotate: 0,
      x: 0,
      y: 0,
      force3D: true,
    });

    gsap.set(vis, { scaleX: initialScaleFrom(W, H) || 0.0001, force3D: true });
  }, [
    measure,
    transformOriginByDirection,
    initialScaleFrom,
    openDirection,
    iconFollowEdge,
    iconEdgeTravel,
    iconFromOpacity,
    iconFromScale,
    iconFromRotate,
    iconFromY,
  ]);

  const playIntro = useCallback(() => {
    const { W, H } = DIM.current.W ? DIM.current : (measure() || { W: 0, H: 0 });
    const vis = visRef.current;
    const endIcon = endIconRef.current;
    const introIcon = visIconRef.current;

    if (!vis || !introIcon) return;

    introTlRef.current?.kill?.();
    introTlRef.current = null;

    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const endV  = Math.max(0, openEnd);

    if (prefersReduce || !introEnabled) {
      gsap.set(vis, {
        width: W, height: H, borderRadius: H / 2,
        transformOrigin: transformOriginByDirection(),
        scaleX: endV || 1,
        force3D: true,
      });
      gsap.set(introIcon, { autoAlpha: 0, x: 0, y: 0, rotate: 0, scale: 1, force3D: true });
      if (endIcon) gsap.set(endIcon, { autoAlpha: 1 });
      return;
    }

    gsap.set(vis, {
      width: W, height: H, borderRadius: H / 2,
      transformOrigin: transformOriginByDirection(),
      scaleX: initialScaleFrom(W, H) || 0.0001,
      force3D: true,
    });

    const tl = gsap.timeline({
      defaults: { overwrite: "auto", force3D: true, autoRound: false },
      onStart: () => gsap.set(vis, { willChange: "transform" }),
      onComplete: () => gsap.set(vis, { willChange: "auto" }),
    });

    if (tMinDelay > 0) tl.to({}, { duration: tMinDelay });

    tl.to(vis, { scaleX: Math.max(0, openPeak), duration: tToPeak, ease: easeToPeak }, 0);

    if (introIcon && iconIntroEnabled) {
      const xPeak = iconFollowEdge ? 0 : 0;
      tl.to(
        introIcon,
        {
          scale: iconPeakScale,
          rotate: iconPeakRotate,
          y: iconPeakY,
          x: xPeak,
          autoAlpha: iconPeakOpacity,
          duration: tToPeak,
          ease: iconEaseIn,
        },
        0
      );
    }

    if (tPeakHold > 0) tl.to({}, { duration: tPeakHold });

    tl.to(vis, { scaleX: endV || 1, duration: tToEnd, ease: easeToEnd });

    if (introIcon && iconIntroEnabled) {
      const exitX =
        iconFollowEdge
          ? (openDirection === "rtl" ? -iconEdgeTravel : openDirection === "ltr" ? iconEdgeTravel : 0)
          : 0;

      const total = tMinDelay + tToPeak + tPeakHold + tToEnd;
      const iconOutAt = Math.max(0, total - iconRevealOffset);

      tl.to(
        introIcon,
        {
          scale: iconEndScale,
          rotate: iconEndRotate,
          y: iconEndY,
          x: exitX,
          autoAlpha: iconEndOpacity,
          duration: Math.max(0.18, iconRevealOffset),
          ease: iconEaseOut,
        },
        iconOutAt
      );
    }

    const revealAt = Math.max(0, tMinDelay + tToPeak + tPeakHold + tToEnd - 0.15);
    if (endIcon) tl.to(endIcon, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, revealAt);

    introTlRef.current = tl;
  }, [
    measure,
    introEnabled,
    openPeak, openEnd,
    tMinDelay, tToPeak, tPeakHold, tToEnd,
    easeToPeak, easeToEnd,
    transformOriginByDirection,
    initialScaleFrom,
    iconIntroEnabled,
    iconFollowEdge,
    openDirection,
    iconEdgeTravel,
    iconPeakScale,
    iconPeakRotate,
    iconPeakY,
    iconPeakOpacity,
    iconEaseIn,
    iconEaseOut,
    iconEndScale,
    iconEndRotate,
    iconEndY,
    iconEndOpacity,
    iconRevealOffset,
  ]);

  const restartIntro = useCallback(() => {
    setInitial();
    if (reTriggerDelay > 0) gsap.delayedCall(reTriggerDelay, playIntro);
    else playIntro();
  }, [setInitial, playIntro, reTriggerDelay]);

  // =============== TAP (fecha em círculo, segura 3s e reabre do círculo) ===============
  const playTap = useCallback((userClick) => {
    if (!tapEnabled) {
      if (typeof userClick === "function") userClick();
      return;
    }

    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduce) {
      if (typeof userClick === "function") userClick();
      return;
    }

    if (tapBusyRef.current && tapDisableDuring) return;

    const dims = DIM.current.W ? DIM.current : (measure() || { W: 0, H: 0 });
    const { W, H } = dims;

    const vis = visRef.current;
    const content = contentRef.current;
    const endIcon = endIconRef.current;
    const introIcon = visIconRef.current;
    const checkIcon = checkIconRef.current;

    if (!vis || !content || !checkIcon) {
      if (typeof userClick === "function") userClick();
      return;
    }

    introTlRef.current?.kill?.();
    tapTlRef.current?.kill?.();

    tapBusyRef.current = true;

    // tempos com multiplicador
    const D_CLOSE = Math.max(0.18, tapCloseDur * tapSpeed);
    const D_HOLD  = Math.max(0, tapHold * tapSpeed);          // 3s por default
    const D_OPEN  = Math.max(0.18, tapOpenDur * tapSpeed);
    const D_GLIDE = Math.max(0.12, reopenGlideDur * tapSpeed);
    const D_BREATH = Math.max(0.1, reopenBreathDur * tapSpeed);

    const W85 = Math.max(H, W * 0.85);
    const W60 = Math.max(H, W * 0.60);
    const W40 = Math.max(H, W * 0.40);
    const W_OVERSHOOT = Math.max(W, W * reopenOvershoot);

    const tl = gsap.timeline({
      defaults: { overwrite: "auto", force3D: true },
      onComplete: () => { tapBusyRef.current = false; },
    });

    // base
    gsap.set(vis, {
      width: W, height: H, borderRadius: H / 2,
      transformOrigin: transformOriginByDirection(),
      xPercent: 0,
      left: openDirection === "rtl" ? "auto" : 0,
      right: openDirection === "rtl" ? 0 : "auto",
      scaleY: 1,
    });

    // centraliza p/ fechar em círculo
    tl.add(() => {
      gsap.set(vis, {
        transformOrigin: "center center",
        left: "50%", right: "auto", xPercent: -50,
      });
    }, 0);

    if (tapCallOn === "start") tl.add(() => userClick && userClick(), 0);

    // esconde conteúdo/ícones
    tl.to([content, endIcon, introIcon].filter(Boolean), {
      autoAlpha: 0,
      duration: 0.18 * tapSpeed,
      ease: "power1.out",
    }, 0);

    // ====== FECHAMENTO SUAVE EM ETAPAS ======
    // micro-breath vertical durante o fechamento (tira “secura”)
    tl.to(vis, { scaleY: 0.99, duration: D_CLOSE * 0.35, ease: "power1.out" }, 0.02);

    // W -> 85%
    tl.to(vis, {
      width: W85,
      duration: D_CLOSE * 0.30,
      ease: "power2.in",
    }, 0.02);

    // 85% -> 60%
    tl.to(vis, {
      width: W60,
      duration: D_CLOSE * 0.28,
      ease: "power1.inOut",
    }, `>`);

    // 60% -> 40% com leve alivio no scaleY
    tl.to(vis, {
      width: W40,
      duration: D_CLOSE * 0.22,
      ease: "power2.out",
    }, `>`);

    // 40% -> H (círculo), voltando scaleY
    tl.to(vis, {
      width: H,
      height: H,
      borderRadius: H / 2,
      scaleY: 1,
      duration: D_CLOSE * 0.20,
      ease: tapEaseClose,
    }, `>`);

    if (tapCallOn === "afterClose") tl.add(() => userClick && userClick(), `>-0.02`);

    // check pop in
    tl.to(checkIcon, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.24 * tapSpeed,
      ease: "back.out(1.6)",
    }, `>-0.06`);

    // *** HOLD 3s (default) com o check na tela ***
    tl.to({}, { duration: D_HOLD });
    if (tapCallOn === "afterHold") tl.add(() => userClick && userClick(), `>`);

    // check out
    tl.to(checkIcon, {
      autoAlpha: 0,
      scale: 0.85,
      duration: 0.18 * tapSpeed,
      ease: "power1.in",
    }, `>`);

    // ====== REOPEN FROM CIRCLE ======
    // expand center: círculo -> overshoot
    tl.to(vis, {
      width: W_OVERSHOOT,
      duration: Math.max(0.1, D_OPEN * 0.65),
      ease: reopenWidthEase1,
    }, `>-${reopenStagger}`);

    // breath vertical da reabertura
    tl.fromTo(
      vis,
      { scaleY: 0.985 },
      { scaleY: 1, duration: D_BREATH, ease: "power1.out" },
      `>-0.10`
    );

    // assenta largura: overshoot -> W
    tl.to(vis, {
      width: W,
      duration: Math.max(0.08, D_OPEN * 0.35),
      ease: reopenWidthEase2,
    }, `>-0.05`);

    // glide center -> edge
    tl.add(() => { gsap.set(vis, { transformOrigin: transformOriginByDirection() }); });
    tl.to(vis, {
      xPercent: 0,
      left: openDirection === "rtl" ? "auto" : 0,
      right: openDirection === "rtl" ? 0 : "auto",
      duration: D_GLIDE,
      ease: "power2.out",
    }, `>`);

    // conteúdo + ícone final
    tl.to([content, endIcon].filter(Boolean), {
      autoAlpha: 1,
      duration: 0.22 * tapSpeed,
      ease: "power1.out",
    }, `>-0.10`);

    if (tapCallOn === "afterOpen") tl.add(() => userClick && userClick(), `>`);

    tapTlRef.current = tl;
  }, [
    tapEnabled,
    tapCloseDur,
    tapOpenDur,
    tapHold,
    tapEaseClose,
    tapEaseOpen,
    tapCallOn,
    tapDisableDuring,
    tapSpeed,
    reopenOvershoot,
    reopenWidthEase1,
    reopenWidthEase2,
    reopenGlideDur,
    reopenBreathDur,
    reopenStagger,
    measure,
    transformOriginByDirection,
    openDirection,
  ]);

  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setInitial();

    if (prefersReduce || !introEnabled) {
      playIntro();
      return;
    }

    if (typeof IntersectionObserver !== "undefined" && btnRef.current) {
      ioRef.current = new IntersectionObserver(
        (entries) => { for (const e of entries) if (e.isIntersecting) restartIntro(); },
        { threshold: viewThreshold }
      );
      ioRef.current.observe(btnRef.current);
    } else {
      playIntro();
    }

    const btn = btnRef.current;
    if (btn && typeof ResizeObserver !== "undefined") {
      roRef.current = new ResizeObserver(() => {
        if (rafResizeRef.current) cancelAnimationFrame(rafResizeRef.current);
        rafResizeRef.current = requestAnimationFrame(() => {
          const dims = measure();
          if (!dims) return;
          const { W, H } = dims;
          const changed =
            Math.abs(DIM.current.W - W) > 1 || Math.abs(DIM.current.H - H) > 1;
          if (!changed) return;

          DIM.current = { W, H };

          const vis = visRef.current;
          const endIcon = endIconRef.current;
          if (vis) {
            gsap.set(vis, {
              width: W,
              height: H,
              borderRadius: H / 2,
              transformOrigin: transformOriginByDirection(),
              force3D: true,
            });

            const introFinished =
              !introTlRef.current || introTlRef.current.progress() === 1;
            const tapFinished =
              !tapTlRef.current || tapTlRef.current.progress() === 1;

            if (introFinished && tapFinished) {
              gsap.set(vis, {
                scaleX: Math.max(0, openEnd) || 1,
                xPercent: 0,
                left: openDirection === "rtl" ? "auto" : 0,
                right: openDirection === "rtl" ? 0 : "auto",
                scaleY: 1,
                force3D: true,
              });
              if (visIconRef.current) gsap.set(visIconRef.current, { autoAlpha: 0, x: 0, y: 0, rotate: 0, scale: 1, force3D: true });
              if (endIcon) gsap.set(endIcon, { autoAlpha: 1 });
              if (checkIconRef.current) gsap.set(checkIconRef.current, { autoAlpha: 0, scale: 0.7 });
            }
          }
        });
      });
      roRef.current.observe(btn);
    }

    return () => {
      introTlRef.current?.kill?.();
      tapTlRef.current?.kill?.();
      roRef.current?.disconnect?.();
      if (ioRef.current && btnRef.current) ioRef.current.unobserve(btnRef.current);
      ioRef.current?.disconnect?.();
      if (rafResizeRef.current) cancelAnimationFrame(rafResizeRef.current);
    };
  }, [
    setInitial,
    playIntro,
    restartIntro,
    measure,
    introEnabled,
    openEnd,
    viewThreshold,
    transformOriginByDirection,
    openDirection,
  ]);

  const VIS_CLASSES = [
    "absolute inset-y-0",
    openDirection === "rtl" ? "right-0" : "left-0",
    border,
    bg,
    "flex items-center justify-end",
    "px-2",
    "pointer-events-none",
  ].join(" ");

  const handleClick = useCallback(() => {
    if (disabled || loading) return;
    playTap(onClick);
  }, [disabled, loading, playTap, onClick]);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-busy={loading ? "true" : "false"}
      aria-disabled={isDisabled ? "true" : "false"}
      className={BASE_CLASSES}
      {...rest}
    >
      {/* FUNDO + ÍCONES SOBRE O FUNDO */}
      <span ref={visRef} className={VIS_CLASSES} aria-hidden="true" style={{ zIndex: 0 }}>
        {/* Ícone de INTRO */}
        <span
          ref={visIconRef}
          className="flex items-center justify-center h-8 w-8 rounded-full bg-white"
          style={{ zIndex: 1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="#000" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>

        {/* Ícone de CHECK (tap) */}
        <span
          ref={checkIconRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-white"
          style={{ zIndex: 2, pointerEvents: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="#000" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </span>

      {/* CONTEÚDO + ÍCONE FINAL */}
      <span ref={contentRef} className="relative z-[1] flex w-full items-center justify-between">
        <span className="flex-1 ml-3 text-left truncate flex items-center gap-2">
          {loading && (
            <span className="inline-block h-4 w-4 shrink-0 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" aria-hidden="true" />
          )}
          {children}
        </span>

        <span ref={endIconRef} className="flex items-center justify-center h-8 w-8 rounded-full bg-white shrink-0 ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="#000" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </span>
    </button>
  );
}