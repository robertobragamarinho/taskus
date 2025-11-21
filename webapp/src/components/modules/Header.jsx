/* eslint-disable react/prop-types */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import LogoTaskUs from '../../assets/logo-min.webp'; // ajuste o caminho se necessário

const Header = ({
  rightText = 'Processo Seletivo',

  // animação de entrada
  playIntro = true,
  introDistance = 80,
  introDuration = 1.2,
  introDelay = 0.1,

  className = '',
}) => {
  const headerRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // Animação de entrada
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    // estado inicial
    gsap.set(el, { opacity: 0, y: playIntro ? -introDistance : 0 });

    // animação de entrada
    if (playIntro) {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: introDuration,
        ease: 'power2.out',
        delay: introDelay,
      });
    } else {
      gsap.to(el, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.1,
      });
    }
  }, [playIntro, introDistance, introDuration, introDelay]);

  // Calcula a altura do header para o spacer não deixar o conteúdo por baixo
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setSpacerHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <>
      {/* Espaço reservado para o header fixo */}
      <div style={{ height: spacerHeight }} />

      {/* Header fixo no topo */}
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-[#00005f] shadow-md ${className}`}
        style={{ opacity: 0, willChange: 'transform, opacity' }}
      >
        <div className="max-w-md mx-auto px-5 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <img src={LogoTaskUs} alt="TaskUs Logo" className="h-5" />
            </div>

            {/* Texto à direita */}
            <div className="flex items-center space-x-2">
              <span className="font-hendrix-medium text-xs text-blue-200 tracking-wide">
                {rightText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --------- Header.Switch mantido, mas agora não controla mais visibilidade ---------
function HeaderSwitch({
  threshold = 0.5,
  rootMargin = '0px 0px -20% 0px',
  className = '',
  idName = 'HeaderActive',
}) {
  const ref = React.useRef(null);
  const [intersecting, setIntersecting] = React.useState(false);

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

  return (
    <div ref={ref} className={className}>
      {intersecting ? <div id={idName} /> : null}
    </div>
  );
}

Header.Switch = HeaderSwitch;

export default Header;