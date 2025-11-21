import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useProcess } from '@/hooks/useProcess.js';
import '../../styles/refino.css';
import ItauLogo from '../../assets/logo-min.webp';
import ItauElementMin from '../../assets/itau_element-min.webp';
import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Header from "../modules/Header";

/* ===== Ícones ===== */
const ShieldCheckIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M11.998 2C8.99 2 7.04 4.019 4.734 4.755c-.938.3-1.407.449-1.597.66c-.19.21-.245.519-.356 1.135c-1.19 6.596 1.41 12.694 7.61 15.068c.665.255.998.382 1.61.382s.946-.128 1.612-.383c6.199-2.373 8.796-8.471 7.606-15.067c-.111-.616-.167-.925-.357-1.136s-.658-.36-1.596-.659C16.959 4.019 15.006 2 11.998 2" />
      <path d="M9 13s1 0 2 2c0 0 3.177-5 6-6" />
    </g>
  </svg>
);

const DatabaseIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </g>
  </svg>
);

const CpuIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2M15 20v2M2 15h2M20 15h2M2 9h2M20 9h2M9 2v2M9 20v2" />
    </g>
  </svg>
);

const PaymentItauLoadingStep = ({ onLoadingComplete, autoAdvanceMs = 5000 }) => {
  const { currentStep } = useProcess(); // usado para rolar ao topo ao mudar de etapa
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const advancedRef = useRef(false);

  /* ===== Sobe ao topo na montagem e quando o step mudar ===== */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const phases = [
    { title: 'Conectando ao Sistema', subtitle: 'Estabelecendo conexão segura com área do colaborador', icon: ShieldCheckIcon, duration: 3000 },
    { title: 'Carregando Dados',     subtitle: 'Sincronizando suas informações',                        icon: DatabaseIcon,   duration: 4000 },
    { title: 'Configurações',        subtitle: 'Buscando aba de pagamentos',                             icon: CpuIcon,        duration: 5000 },
    { title: 'Direcionando',         subtitle: 'Direcionando colaborador',                               icon: ShieldCheckIcon,duration: 3000 },
  ];

  const originalTotal = phases.reduce((acc, p) => acc + p.duration, 0);
  const scale = autoAdvanceMs / originalTotal;

  const advance = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    onLoadingComplete();
  };

  useEffect(() => {
    // Troca de fases reescalonada
    let totalTime = 0;
    const timeouts = phases.map((phase, index) => {
      const t = setTimeout(() => setCurrentPhase(index), totalTime);
      totalTime += Math.max(1, Math.round(phase.duration * scale));
      return t;
    });

    // Progresso sincronizado
    const tickMs = 40;
    const steps = Math.max(1, Math.round(autoAdvanceMs / tickMs));
    const increment = 100 / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100; // ✅ mantém 100%, não 10000
        }
        return next;
      });
    }, tickMs);

    // Avanço automático
    const timer = setTimeout(advance, autoAdvanceMs);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [autoAdvanceMs]);

  const CurrentIcon = phases[currentPhase]?.icon || ShieldCheckIcon;

  return (
    <div className=" ">
    
      <div className="p-6 min-h-screen bg-[#0a0026]">
        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
  
        </motion.div>

        {/* Card principal */}
        <motion.div
          className="bg-white rounded-2xl pt-6 mb-10 mt-5 flex flex-col items-center shadow-lg"
          style={{ minHeight: '380px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Indicador de segurança */}
          <div className="w-full flex flex-col items-center mb-4">
            <div className="flex items-center gap-2 mb-3 mt-1">
              <ShieldCheckIcon className="w-5 h-5" style={{ color: '#1655ff' }} />
              <span className="font-hendrix-regular text-gray-400 text-xs" style={{ letterSpacing: '0.2px' }}>
                Conexão segura e criptografada
              </span>
            </div>

            {/* Logo/Elemento Itaú */}
            <motion.div>
              <img src={ItauElementMin} alt="Elemento Itaú" className="h-80 w-auto" />
            </motion.div>
          </div>

          {/* Status atual */}
          <motion.div
            className="mt-3 w-[100%] flex justify-center mb-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-black w-[90%] backdrop-blur-sm rounded-xl p-4 border border-black">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <CurrentIcon className="w-6 h-6 text-blue-400" style={{ color: '#72a0d5' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-hendrix-medium text-white text-sm">
                    {phases[currentPhase]?.title}
                  </h3>
                  <p className="font-hendrix-regular text-white/70 text-xs">
                    {phases[currentPhase]?.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Barra de progresso */}
          <div className="w-[85%] mb-3">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#5b86be]"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Rodapé */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="font-hendrix-regular text-white/60 text-xs">
            Seus dados estão protegidos de acordo com a LGPD<br />
            TaskUs Brasil • Todos os direitos reservados
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentItauLoadingStep;