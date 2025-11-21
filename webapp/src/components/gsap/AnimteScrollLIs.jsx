'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Componente AnimatedContainer
 * Aplica uma animação de Slide-up e Fade-in com a ease 'expo.inOut'
 * quando o elemento entra na tela, usando GSAP ScrollTrigger.
 * 
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo a ser animado.
 * @param {string} props.className - Classes CSS adicionais para o contêiner.
 */
export default function AnimteScrollLIs({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animação de Slide-up (y: 100 -> 0) e Fade-in (opacity: 0 -> 1)
    gsap.from(container, {
      y: 100, // Começa 100px abaixo
      opacity: 0, // Começa invisível
      duration: 3.5, // Duração da animação
      ease: 'expo.inOut', // A ease solicitada pelo usuário
      scrollTrigger: {
        trigger: container,
        start: 'top 85%', // Inicia a animação quando o topo do elemento atinge 85% da viewport
        // markers: true, // Descomente para debug
        once: true, // Garante que a animação só ocorra uma vez
      },
    });

    // Limpeza do ScrollTrigger
    return () => {
      ScrollTrigger.getById(container)?.kill();
    };
  }, []);

  // A div original do usuário, encapsulada pelo componente
  const baseClasses = 'border flex flex-col items-center py-10 px-3 gap-4 rounded-3xl h-[145vw] w-full';

  return (
    <div ref={containerRef} className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
