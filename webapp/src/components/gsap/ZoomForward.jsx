// ZoomForward.jsx
import React, { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Headline from "../components/Headline";

// Registrar plugins GSAP apenas uma vez
if (!window._zoomforward_registered) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  window._zoomforward_registered = true;
}

export default function ZoomForward({
  imageSrc = "https://uploads-ssl.webflow.com/5cff83ac2044e22cb8cf2f11/5d13364599bb70e3560cc4e5_background-min%203.png",
  imageSrcMobile,
  imageAlt = "image",
  showMarkers = false,
  autoScrollEnabled = true,
  autoScrollDuration = 1.5,
  extraScrollPercent = 20,
}) {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const isCompletedRef = useRef(false);
  const minScrollPositionRef = useRef(0);

  // Auto-scroll com 20% extra
  const triggerAutoScroll = useCallback(() => {
    if (!autoScrollEnabled || hasTriggeredRef.current || !wrapperRef.current) return;

    hasTriggeredRef.current = true;

    const wrapper = wrapperRef.current;
    const wrapperTop = wrapper.offsetTop;
    const animationDistance = wrapper.offsetHeight * 1.5;
    const extraDistance = wrapper.offsetHeight * (extraScrollPercent / 100);
    const targetScroll = wrapperTop + animationDistance + extraDistance;

    gsap.to(window, {
      scrollTo: { y: targetScroll, autoKill: false },
      duration: autoScrollDuration,
      ease: "power1.inOut",
      onComplete: () => {
        isCompletedRef.current = true;
        minScrollPositionRef.current = targetScroll;
      },
    });
  }, [autoScrollEnabled, autoScrollDuration, extraScrollPercent]);

  // Bloqueio de scroll reverso
  const preventScrollBack = useCallback(() => {
    if (!isCompletedRef.current) return;
    const currentScroll = window.scrollY;
    if (currentScroll < minScrollPositionRef.current) {
      window.scrollTo({ top: minScrollPositionRef.current, behavior: "instant" });
    }
  }, []);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const baseTL = (cfg) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
            markers: showMarkers,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (
                autoScrollEnabled &&
                !hasTriggeredRef.current &&
                self.progress > 0.01 &&
                self.progress < 0.95
              ) {
                triggerAutoScroll();
              }
            },
          },
          defaults: { ease: "power1.inOut" },
        });

        return timeline
          .to(
            imgRef.current,
            prefersReduced
              ? { scale: 1, z: 0, duration: 0.001 }
              : { scale: cfg.imgScale, z: cfg.imgZ, transformOrigin: "center center" },
            0
          )
          .to(
            heroRef.current,
            prefersReduced
              ? { scale: 1, duration: 0.001 }
              : { scale: cfg.heroScale, transformOrigin: "center center" },
            0
          )
          .to(
            overlayRef.current,
            prefersReduced
              ? { opacity: 0.3, ease: "none", duration: 0.001 }
              : { opacity: cfg.overlayTo, ease: "none" },
            0
          );
      };

      mm.add("(min-width: 769px)", () => {
        baseTL({
          imgScale: 3.2,
          imgZ: 400,
          heroScale: 1.8,
          overlayTo: 0.65,
        });
      });

      mm.add("(max-width: 768px)", () => {
        baseTL({
          imgScale: 1.8,
          imgZ: 200,
          heroScale: 1.35,
          overlayTo: 0.55,
        });
      });
    }, wrapperRef);

    window.addEventListener("scroll", preventScrollBack, { passive: false });

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("scroll", preventScrollBack);
      ctx.revert();
      mm.revert();
    };
  }, [showMarkers, imageSrc, imageSrcMobile, autoScrollEnabled, triggerAutoScroll, preventScrollBack]);

  const mobileSrc = imageSrcMobile || imageSrc;

  return (
    <div ref={wrapperRef} className="zoomf-wrapper">
      <div className="intro">
        <Headline>
          Ganhe R$2.450,00/Mês <br/>+ benefícios, mesmo sem experiência, trabalhando<br/>  do conforto da sua casa.
        </Headline>
      </div>

      <div className="content">
        <section ref={heroRef} className="section hero" />
      </div>

      <div className="image-container">
        <div ref={overlayRef} className="dark-overlay" />
        <img
          ref={imgRef}
          src={mobileSrc}
          srcSet={`${mobileSrc} 768w, ${imageSrc} 1440w`}
          sizes="(max-width: 768px) 100vw, 100vw"
          alt={imageAlt}
        />
      </div>

      <style>{`
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; }
body { background: #000; overscroll-behavior-y: none; }

.zoomf-wrapper, .content {
  position: relative;
  width: 100%;
  z-index: 1;
}

.intro {
  position: absolute;
  inset: 0;
  z-index: 6;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content { overflow-x: hidden; }

.content .section {
  width: 100%;
  height: 100vh;
}

.section.hero {
  background-image: url(https://images.unsplash.com/photo-1512747646639-ed824d861e0d?q=80&w=1200&auto=format&fit=crop);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: opacity 0.4s ease;
  will-change: transform;
}

.image-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  inset: 0;
  z-index: 2;
  perspective: 500px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center center;
  position: relative;
  z-index: 1;
  transform: translateZ(0);
  will-change: transform;
}

.dark-overlay {
  position: absolute;
  inset: 0;
  background: #000;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  will-change: opacity;
}
      `}</style>
    </div>
  );
}