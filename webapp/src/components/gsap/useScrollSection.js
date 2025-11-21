import { useEffect, useRef, useState } from 'react';

/**
 * Hook customizado para controlar a rolagem entre seções DENTRO de um container específico
 * 
 * Regras:
 * - Seção 1 ↔ 2: Rolagem automática (snap)
 * - Seção 2 ↔ 3: Rolagem normal
 * - Seção 3 ↔ 4: Rolagem normal
 * - Seção 4 → 6: Pula automaticamente a seção 5
 * - Seção 6 → 5 → 4: Ao subir, passa por 5 e vai para 4
 * - Seções 6-10: Rolagem normal
 */
export const useScrollSectionsInContainer = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Prevenir múltiplos eventos de scroll simultâneos
      if (isScrollingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Detectar seção atual baseada na posição do scroll dentro do container
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const scrollPosition = containerScrollTop + containerHeight / 2;
      
      let detectedSection = 1;
      
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            detectedSection = index + 1;
          }
        }
      });

      setCurrentSection(detectedSection);

      // Aplicar regras de rolagem personalizadas
      let shouldPrevent = false;
      let targetSection = detectedSection;

      if (scrollingDown) {
        // Seção 1 → 2: automático
        if (detectedSection === 1) {
          shouldPrevent = true;
          targetSection = 2;
        }
        // Seção 4 → 5: pula automaticamente para 6
        else if (detectedSection === 4) {
          shouldPrevent = true;
          targetSection = 6;
        }
        // Seção 5 → 6: automático (caso especial)
        else if (detectedSection === 5) {
          shouldPrevent = true;
          targetSection = 6;
        }
      } else if (scrollingUp) {
        // Seção 2 → 1: automático
        if (detectedSection === 2) {
          shouldPrevent = true;
          targetSection = 1;
        }
        // Seção 6 → 5: vai para 5
        else if (detectedSection === 6) {
          shouldPrevent = true;
          targetSection = 5;
        }
        // Seção 5 → 4: automático
        else if (detectedSection === 5) {
          shouldPrevent = true;
          targetSection = 4;
        }
      }

      if (shouldPrevent) {
        e.preventDefault();
        e.stopPropagation();
        scrollToSection(targetSection);
      }
    };

    const scrollToSection = (sectionNumber) => {
      isScrollingRef.current = true;
      const targetElement = sectionsRef.current[sectionNumber - 1];
      
      if (targetElement && container) {
        const targetTop = targetElement.offsetTop;
        
        // Scroll suave dentro do container
        container.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
        
        setCurrentSection(sectionNumber);
        
        // Liberar o scroll após a animação
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    // Adicionar listener no container específico
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Função para registrar uma seção
  const registerSection = (index) => (el) => {
    sectionsRef.current[index] = el;
  };

  // Função para navegar diretamente para uma seção
  const goToSection = (sectionNumber) => {
    const targetElement = sectionsRef.current[sectionNumber - 1];
    const container = containerRef.current;
    
    if (targetElement && container) {
      const targetTop = targetElement.offsetTop;
      
      container.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      
      setCurrentSection(sectionNumber);
    }
  };

  return {
    containerRef,
    currentSection,
    registerSection,
    goToSection,
  };
};
