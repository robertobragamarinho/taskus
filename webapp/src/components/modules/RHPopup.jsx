// components/RHPopup.jsx
import React, { useEffect, useState } from 'react';
import MairaPhoto from '../../assets/maira.webp'; // ajuste o caminho se necessário
import LoadingBar from '../modules/LoadingBar';

const RHPopup = ({
  // Modo 1 (controlado):
  open,
  onClose,

  // Modo 2 (auto-open):
  autoOpenAfterMs,         // número em ms; se fornecido e 'open' for undefined, RHPopup abre sozinho após esse tempo
  onOpenChange,            // callback opcional: (isOpen:boolean) => void

  // Comuns:
  isMinimized,
  onToggleMinimize,
  totalDurationMs,
  startAtMs,               // âncora global para sincronizar o tempo
  onLoadingComplete,
}) => {
  // Se 'open' vier definido, usamos modo controlado; senão, modo auto-open
  const isControlled = typeof open === 'boolean';

  const [internalOpen, setInternalOpen] = useState(false);
  const effectiveOpen = isControlled ? open : internalOpen;

  // Tempo restante sincronizado
  const [remainingMs, setRemainingMs] = useState(totalDurationMs);

  // Atualizar tempo restante a cada 100ms
  useEffect(() => {
    if (!effectiveOpen || !startAtMs) return;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startAtMs;
      const remaining = Math.max(0, totalDurationMs - elapsed);
      setRemainingMs(remaining);
    }, 100);

    return () => clearInterval(timer);
  }, [effectiveOpen, startAtMs, totalDurationMs]);

  // Auto-open (somente quando NÃO controlado)
  useEffect(() => {
    if (isControlled) return;
    if (typeof autoOpenAfterMs !== 'number') return;

    const t = setTimeout(() => {
      setInternalOpen(true);
      onOpenChange?.(true);
    }, autoOpenAfterMs);

    return () => clearTimeout(t);
  }, [autoOpenAfterMs, isControlled, onOpenChange]);

  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalOpen(false);
      onOpenChange?.(false);
    }
  };

  if (!effectiveOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md transition-all duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="p-6 w-full max-w-lg">
        <div
          className="bg-white mt-5 rounded-xl shadow-2xl w-full max-h-[60vh] overflow-hidden relative"
          style={{
            animation: 'slideDown 0.4s ease-out',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
            transform: isMinimized ? 'scale(0.95)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Header */}
          <div className="text-white" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
            <div className="flex justify-between items-center px-5 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={MairaPhoto}
                  alt="Maira Rodrigues"
                  className="w-11 h-11 rounded-full border-2 border-white/30 object-cover"
                />
                <div className="leading-5">
                  <span className="font-semibold">Maira Rodrigues</span>
                  <span className="block text-white/70 text-[12px]">Recursos Humanos</span>
                </div>
              </div>

              {/* Pílula Online */}
              <div className="flex items-center gap-2">
                <div
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-[#1e3c72] shadow-sm border border-white/30 backdrop-blur-sm"
                  aria-label="Status: Online"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  Online
                </div>
              </div>
            </div>

            {/* Contador de tempo restante */}
            <div className="px-5 py-2 bg-white/10 backdrop-blur-sm border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-xs font-medium">Tempo de análise restante</span>
                <span className="text-white font-semibold text-sm tabular-nums">
                  {Math.floor(remainingMs / 60000).toString().padStart(2, '0')}:{Math.floor((remainingMs % 60000) / 1000).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Corpo */}
          {!isMinimized && (
            <div className="h-[550px] max-h-[calc(90vh-160px)]">
              <iframe
                src="https://sinaisdaalma.atendimentosdigitais.site/meu-typebot-l9f0xln"
                title="Portal de Atendimento RH"
                className="w-full h-full border-0"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        <LoadingBar 
          totalDurationMs={totalDurationMs} 
          startAtMs={startAtMs}
          onComplete={onLoadingComplete} 
        />

        <style jsx>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-50px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default RHPopup;