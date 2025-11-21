// components/AnalysisStepsList.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalysisStepsList = ({ totalDurationMs = 30000 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const currentStepRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const firstRenderRef = useRef(true);

  // Controle de interação do usuário
  const userInteractingRef = useRef(false);
  const interactTimerRef = useRef(null);

  const steps = [
    'Validando informações pessoais',
    'Verificando documentação',
    'Analisando experiência profissional',
    'Avaliando formação acadêmica',
    'Conferindo certificações',
    'Verificando disponibilidade de horário',
    'Analisando pretensão salarial',
    'Avaliando soft skills',
    'Conferindo aderência à vaga',
    'Verificando referências profissionais',
    'Analisando histórico de trabalho',
    'Avaliando competências técnicas',
    'Verificando localização',
    'Analisando perfil comportamental',
    'Finalizando avaliação geral'
  ];

  // ===== Helpers =====
  const isAlmostVisible = (childEl, containerEl, margin = 12) => {
    const cRect = containerEl.getBoundingClientRect();
    const iRect = childEl.getBoundingClientRect();
    const topVisible = iRect.top >= cRect.top + margin;
    const bottomVisible = iRect.bottom <= cRect.bottom - margin;
    return topVisible && bottomVisible;
  };

  const isNearBottom = (el, threshold = 40) => {
    // true se o usuário está “no fim” (quer acompanhar automaticamente)
    return el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
  };

  // ===== Avanço automático =====
  useEffect(() => {
    if (currentStep >= steps.length) return;
    const timePerStep = totalDurationMs / steps.length;
    const timer = setTimeout(() => {
      setCompletedSteps(prev =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
      setCurrentStep(prev => prev + 1);
    }, timePerStep);
    return () => clearTimeout(timer);
  }, [currentStep, steps.length, totalDurationMs]);

  // Marca que a primeira renderização já aconteceu
  useEffect(() => { firstRenderRef.current = false; }, []);

  // Ouve interação do usuário no container para pausar auto-scroll por ~1s
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const markInteracting = () => {
      userInteractingRef.current = true;
      if (interactTimerRef.current) clearTimeout(interactTimerRef.current);
      interactTimerRef.current = setTimeout(() => {
        userInteractingRef.current = false;
      }, 1000); // 1s sem interação = libera auto-scroll
    };

    container.addEventListener('wheel', markInteracting, { passive: true });
    container.addEventListener('touchstart', markInteracting, { passive: true });
    container.addEventListener('touchmove', markInteracting, { passive: true });
    container.addEventListener('scroll', markInteracting, { passive: true });

    return () => {
      container.removeEventListener('wheel', markInteracting);
      container.removeEventListener('touchstart', markInteracting);
      container.removeEventListener('touchmove', markInteracting);
      container.removeEventListener('scroll', markInteracting);
      if (interactTimerRef.current) clearTimeout(interactTimerRef.current);
    };
  }, []);

  // ===== Auto-rolagem que respeita o usuário =====
  useEffect(() => {
    const container = scrollContainerRef.current;
    const item = currentStepRef.current;
    if (!container || !item) return;

    // Se o usuário está interagindo OU não está perto do final, não force rolagem
    if (userInteractingRef.current || !isNearBottom(container, 48)) return;

    // Só role se o item atual não estiver visível
    if (isAlmostVisible(item, container, 8)) return;

    // Use o menor deslocamento necessário (sem “grudar no topo”)
    const id = requestAnimationFrame(() => {
      item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });

    return () => cancelAnimationFrame(id);
  }, [currentStep]);

  const getBackgroundColor = (isCurrent, isCompleted) => {
    if (isCurrent) return '#e8f0ff';
    if (isCompleted) return '#d6efe2';
    return 'transparent';
  };

  return (
    <div className="rounded-2xl px-4 py-4" style={{ background: '#f3f6f9', minHeight: 90 }}>
      <div className="flex flex-col items-start">
        <div
          ref={scrollContainerRef}
          className="w-full overflow-y-auto"
          style={{
            maxHeight: '280px',
            overscrollBehavior: 'contain',
            scrollbarWidth: 'thin',
            scrollbarColor: '#1655ff transparent'
          }}
        >
          <div className="space-y-1">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;

              return (
                <motion.div
                  key={index}
                  ref={isCurrent ? currentStepRef : null}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: firstRenderRef.current ? index * 0.06 : 0,
                    duration: 0.25,
                    ease: 'easeOut'
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: getBackgroundColor(isCurrent, isCompleted),
                    border: isCurrent ? '1px solid #1655ff' : '1px solid transparent'
                  }}
                >
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.svg
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24" height="24" viewBox="0 0 24 24"
                          fill="none" stroke="#10b981" strokeWidth="3"
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      ) : isCurrent ? (
                        <motion.div
                          key="spinner"
                          className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#d1d5db' }} />
                      )}
                    </AnimatePresence>
                  </div>

                  <span
                    className="text-sm flex-1"
                    style={{
                      fontSize: '10pt',
                      color: isCompleted ? '#10b981' : isCurrent ? '#1655ff' : '#6b7280',
                      fontWeight: isCurrent ? '600' : '400',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      textAlign: 'left'
                    }}
                  >
                    {step}
                  </span>

                  {isCurrent && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-blue-600"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { width: 6px; }
        div::-webkit-scrollbar-track { background: transparent; border-radius: 10px; }
        div::-webkit-scrollbar-thumb { background: rgba(22, 85, 255, 0.28); border-radius: 10px; }
        div::-webkit-scrollbar-thumb:hover { background: rgba(22, 85, 255, 0.45); }
      `}</style>
    </div>
  );
};

export default AnalysisStepsList;