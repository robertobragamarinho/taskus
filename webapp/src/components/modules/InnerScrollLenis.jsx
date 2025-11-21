'use client';
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis'; // Usando o novo nome do pacote

const InnerScrollLenis = ({ children, className, style }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Inicializa o Lenis, vinculando-o ao elemento wrapper
    const lenis = new Lenis({
      wrapper: wrapper,
      content: wrapper.firstChild, // O Lenis precisa de um elemento de conteúdo
      duration: 1.2, // Duração da animação de rolagem
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: true, // Rolagem suave no toque (mobile)
      touchMultiplier: 2, // Sensibilidade do toque
      // Adicionando um pequeno overscroll para o efeito de "arrasto"
      // O Lenis não tem uma opção nativa de overscroll/bounce, mas o smoothTouch e o easing já dão a sensação
      // Para um overscroll real, seria necessário um wrapper adicional e lógica de mola (spring physics)
    });

    // Função de loop para o Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Limpeza
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={style}
      data-inner-scroll // Mantém o marcador para o useSnapController
    >
      {children}
    </div>
  );
};

export default InnerScrollLenis;
