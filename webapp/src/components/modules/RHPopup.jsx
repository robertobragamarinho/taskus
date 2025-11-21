// components/RHPopup.jsx
import React, { useEffect, useState } from 'react';
import MairaPhoto from '../../assets/maira.webp'; // ajuste o caminho se necessário

// Helper para montar query string manualmente (sem URLSearchParams)
function buildQueryString(paramsObj) {
  const entries = Object.entries(paramsObj).filter(
    ([, value]) => value !== undefined && value !== null && value !== ''
  );

  if (entries.length === 0) return '';

  const query = entries
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  return `?${query}`;
}

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
  onLoadingComplete,       // (ainda disponível se quiser usar depois)
  userData,                // dados do usuário do contexto
}) => {
  // Se 'open' vier definido, usamos modo controlado; senão, modo auto-open
  const isControlled = typeof open === 'boolean';

  const [internalOpen, setInternalOpen] = useState(false);
  const effectiveOpen = isControlled ? open : internalOpen;

  // Tempo restante sincronizado
  const [remainingMs, setRemainingMs] = useState(totalDurationMs || 0);

  // URL do iframe já com dados do localStorage
  const [iframeSrc, setIframeSrc] = useState(
    'https://taskus.atendimentosdigitais.site/confirma'
  );

  // Montar URL do iframe com dados do userData (prioritário) ou localStorage (fallback)
  useEffect(() => {
    const baseUrl = 'https://taskus.atendimentosdigitais.site/confirma';

    try {
      // Prioriza dados do userData prop, depois tenta localStorage
      const firstName = userData?.firstName || localStorage.getItem('firstName') || '';
      const lastName  = userData?.lastName  || localStorage.getItem('lastName')  || '';
      const email     = userData?.email     || localStorage.getItem('email')     || '';
      const phone     = userData?.phone     || localStorage.getItem('phone')     || '';
      const age       = userData?.age       || localStorage.getItem('age')       || '';
      const cpf       = userData?.cpf       || '';
      const city      = userData?.city      || '';
      const state     = userData?.state     || '';
      const availability      = userData?.availability      || '';
      const salaryExpectation = userData?.salaryExpectation || '';
      const experience        = userData?.experience        || '';
      const education         = userData?.education         || '';

      const queryString = buildQueryString({
        firstName,
        lastName,
        email,
        phone,
        age,
        cpf,
        city,
        state,
        availability,
        salaryExpectation,
        experience,
        education,
      });

      const finalUrl = `${baseUrl}${queryString}`;

      setIframeSrc(finalUrl);
    } catch (err) {
      // Se der erro, usa URL base
      setIframeSrc(baseUrl);
    }
  }, [userData]);

  // Atualizar tempo restante a cada 100ms (só para exibição do contador)
  useEffect(() => {
    if (!effectiveOpen || !startAtMs || !totalDurationMs) return;

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
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-md transition-all duration-300"
    >
      <div className="p-6 w-full max-w-lg">
        <div
          className="bg-white mt-5 rounded-xl shadow-2xl w-full max-h-[75vh] overflow-hidden relative"
          style={{
            animation: 'slideDown 0.4s ease-out',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
            transform: isMinimized ? 'scale(0.95)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Header */}
          <div
            className="text-white"
            style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
          >
            <div className="flex justify-between items-center px-5 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={MairaPhoto}
                  alt="Maira Rodrigues"
                  className="w-11 h-11 rounded-full border-2 border-white/30 object-cover"
                />
                <div className="leading-5">
                  <span className="font-semibold">TaskUs Brasil</span>
                  <span className="block text-white/70 text-[12px]"></span>
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
          </div>

          {/* Corpo */}
          {!isMinimized && (
            <div className="h-[650px] pb-5">
              <iframe
                src={iframeSrc}
                title="Portal de Atendimento RH"
                className="w-full h-full border-0"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

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