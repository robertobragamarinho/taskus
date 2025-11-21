// =============================
// Header.jsx — header + sentinela embutida (Header.Switch)
// Modo único: aparece SOMENTE quando existir #HeaderActive no DOM
// =============================
'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LogoTaskUs from '../../assets/logo-min.webp'; // ajuste o caminho se necessário

// ========================================================
// VERSÃO MOBILE (ORIGINAL) — NÃO FOI ALTERADA
// ========================================================
const Header = ({
  rightText = 'Processo Seletivo',

  // animação
  playIntro = true,
  introDistance = 80,
  introDuration = 1.2,
  introDelay = 0.1,

  // ID que ativa o header
  activeId = 'HeaderActive',

  // transições
  fadeIn = true,
  fadeDuration = 0.28,
 
  className = '',
}) => {
  const headerRef = useRef(null);
  const isHiddenRef = useRef(true); // começa oculto

  const showHeader = (duration = 0.4, ease = 'power2.out') => {
    const el = headerRef.current;
    if (!el || !isHiddenRef.current) return;
    isHiddenRef.current = false;
    gsap.killTweensOf(el);
    gsap.to(el, { y: 0, opacity: 1, duration, ease });
  };

  const hideHeader = (duration = 0.4, ease = 'power2.inOut') => {
    const el = headerRef.current;
    if (!el || isHiddenRef.current) return;
    isHiddenRef.current = true;
    gsap.killTweensOf(el);
    gsap.to(el, { y: -80, opacity: 0, duration, ease });
  };

  // intro
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: playIntro ? -introDistance : 0 });

    if (playIntro) {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: introDuration,
        ease: 'power2.out',
        delay: introDelay,
        onComplete: () => { isHiddenRef.current = false; },
      });
    } else {
      gsap.to(el, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 });
      isHiddenRef.current = false;
    }
  }, [playIntro, introDistance, introDuration, introDelay]);

  // ativação via ID
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const applyFromIds = () => {
      const hasOn = !!document.getElementById(activeId);
      if (hasOn) showHeader(fadeIn ? fadeDuration : 0);
      else hideHeader(fadeIn ? fadeDuration : 0);
    };

    applyFromIds();

    const obs = new MutationObserver(applyFromIds);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [activeId, fadeIn, fadeDuration]);

  return (
    <div
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-[#00005f] shadow-md ${className}`}
      style={{ opacity: 0 }}
    >
      <div className="max-w-md mx-auto px-5 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <img src={LogoTaskUs} alt="TaskUs Logo" className="h-5" />
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-hendrix-medium text-xs text-blue-200 tracking-wide">
              {rightText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// 🔥 NOVA VERSÃO DESKTOP — Header.Desktop
// ========================================================
const HeaderDesktop = ({
  rightText = 'Processo Seletivo',
  activeId = 'HeaderActive',

  playIntro = true,
  introDistance = 80,
  introDuration = 1.0,
  introDelay = 0.05,
  fadeIn = true,
  fadeDuration = 0.25,

  className = '',
}) => {
  const headerRef = useRef(null);
  const isHiddenRef = useRef(true);

  const showHeader = (duration = 0.4) => {
    const el = headerRef.current;
    if (!el || !isHiddenRef.current) return;
    isHiddenRef.current = false;
    gsap.killTweensOf(el);
    gsap.to(el, { y: 0, opacity: 1, duration, ease: 'power2.out' });
  };

  const hideHeader = (duration = 0.4) => {
    const el = headerRef.current;
    if (!el || isHiddenRef.current) return;
    isHiddenRef.current = true;
    gsap.killTweensOf(el);
    gsap.to(el, { y: -80, opacity: 0, duration, ease: 'power2.inOut' });
  };

  // intro desktop
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: -introDistance });

    if (playIntro) {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: introDuration,
        ease: 'power2.out',
        delay: introDelay,
        onComplete: () => (isHiddenRef.current = false),
      });
    } else {
      gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      isHiddenRef.current = false;
    }
  }, []);

  // ativação via ID
  useEffect(() => {
    const apply = () => {
      const has = !!document.getElementById(activeId);
      if (has) showHeader(fadeIn ? fadeDuration : 0);
      else hideHeader(fadeIn ? fadeDuration : 0);
    };

    apply();

    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-[#00005f] shadow-lg ${className}`}
      style={{ opacity: 0 }}
    >
      {/* Versão desktop: mais larga, mais alta, mais elegante */}
      <div className="mx-auto py-6">
        <div className="flex justify-between">
          <div className="flex ml-10">
            <img src={LogoTaskUs} alt="TaskUs Logo" className="h-7" />
          </div>

          <div className="flex items-center mr-10">
            <span className="font-hendrix-medium text-sm text-blue-100 tracking-wide">
              {rightText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Registrar subcomponente
Header.Desktop = HeaderDesktop;

// --------- Sentinela embutida: <Header.Switch /> ---------
function HeaderSwitch({
  threshold = 0.5,
  rootMargin = '0px 0px -20% 0px',
  className = '',
  idName = 'HeaderActive',
}) {
  const ref = useRef(null);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return <div ref={ref} className={className}>{intersecting && <div id={idName} />}</div>;
}

Header.Switch = HeaderSwitch;

export default Header;