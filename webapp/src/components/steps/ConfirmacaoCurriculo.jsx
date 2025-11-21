// pages/ConfirmacaoCurriculo.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useProcess } from '@/hooks/useProcess.js';
import { motion, AnimatePresence } from "framer-motion";
import '../../styles/refino.css';

import ExplanatoryCards from '../modules/ExplanatoryCards';
import { IconAlert, IconChecklistLike } from '../modules/SvgIcons';
import Headlines from '../modules/Headlines';
import Paragraphs from '../modules/Paragraphs';
import Maintexts from '../modules/Main-texts';
import LoadingBar from '../modules/LoadingBar';

import AnalysisStepsList from '../modules/AnalysisStepsList';
import RHPopup from '../modules/RHPopup';
import DetailsModal from '../modules/DetailsModal';
import FinalModal from '../modules/FinalModal';
import Continuity from '../modules/Continuity';
import PaymentItauLoadingStep from '../../modules/PaymentItauLoadingStep.jsx';

const ConfirmacaoCurriculo = ({ dadosUsuario, onContinuar }) => {
  const { processData } = useProcess();

  // ============ OVERLAY DE ENTRADA (Step 4) ============
  const [entryOverlayPhase, setEntryOverlayPhase] = useState('intro');
  const showEntryOverlay = entryOverlayPhase === 'intro';
  const booted = !showEntryOverlay;

  const headline = 'Análise do Currículo';
  const subline = 'Estamos validando suas informações para seguir com a seleção.';
  const messagesByPhase = {
    4: ['Validando currículo…', 'Enviando para análise…', 'Comparando requisitos…']
  };

  const [isLoading, setIsLoading] = useState(false);

  // ÂNCORA GLOBAL de início (REAL)
  const globalStartAtMsRef = useRef(Date.now());

  const alerts = [
    {
      id: 'equipments-alert',
      icon: IconAlert,
      title: 'Aguarde a análise',
      description:
        'Nossa equipe pode entrar em contato com você aqui na tela para confirmar algumas informações. Evite sair ou abrir outros aplicativos. Caso a gente não receb sua resposta, você perderá automaticamente todo progresso até aqui.'
    }
  ];

  const padrao = [
    {
      id: 'equipments-info',
      icon: IconChecklistLike,
      title: 'Online 24h/dia',
      description:
        'De 17/10 a 19/12, nossa equipe de RH está em turnos especiais para atender à alta demanda de contratações. Nesse período, todos os candidatos são avaliados 24 horas por dia.'
    }
  ];

  const [showPopupRH, setShowPopupRH] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showModal, setShowModal] = useState(false);       // modal final
  const [showDetails, setShowDetails] = useState(false);   // modal de detalhes

  // ====== POPUP DE ALERTA ======
  const [showAlertPopup, setShowAlertPopup] = useState(false);

  /* ===========================
     TEMPO GLOBAL (REAL x EXIBIDO)
     - REAL_TOTAL_MS: 5 minutos reais
     - DISPLAY_TOTAL_MS: 10 minutos simulados
     =========================== */
  const REAL_TOTAL_MS = 300000;     // 5 min reais
  const DISPLAY_TOTAL_MS = 600000;  // 10 min "fake"
  const DISPLAY_TOTAL_SEC = DISPLAY_TOTAL_MS / 1000; // 600 segundos

  // Tempo POPUP AVISOS
  const alertPopupDelayMs = 25000;      // abre em 15s reais
  const alertPopupDurationMs = 30000;   // fica 30s reais

  // Tempo restante GLOBAL (fake) em SEGUNDOS
  const [globalRemainingSec, setGlobalRemainingSec] = useState(DISPLAY_TOTAL_SEC);

  // Tempo restante do popup de aviso (ms reais)
  const [alertRemainingMs, setAlertRemainingMs] = useState(alertPopupDurationMs);

  // Tempo para abrir MENSAGEM DO RH (somente abre, não fecha por tempo)
  const rhPopupDelayMs = 10000; // 40s reais

  // Coordenador de múltiplas LoadingBars principais
  const MAIN_BARS = ['main'];
  const [completedBarIds, setCompletedBarIds] = useState(() => new Set());
  const mainTimerRef = useRef(null);

  const onLoadingComplete = () => setShowModal(true);

  const handleBarComplete = (id) => {
    setCompletedBarIds(prev => {
      const next = new Set(prev);
      if (!next.has(id)) next.add(id);
      if (next.size >= MAIN_BARS.length) {
        if (mainTimerRef.current) {
          clearTimeout(mainTimerRef.current);
          mainTimerRef.current = null;
        }
        onLoadingComplete();
      }
      return next;
    });
  };

  // ✅ TIMER GLOBAL DO TEMPO FAKE (em segundos) + timers de fallback e popups
  useEffect(() => {
    if (!booted) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedRealMs = now - globalStartAtMsRef.current;
      const elapsedRealSec = Math.floor(elapsedRealMs / 1000);
      const currentMinute = Math.floor(elapsedRealSec / 60);

      setGlobalRemainingSec((currentSec) => {
        let curr = currentSec;

        if (curr <= 0) return 0;

        let step = 0;
        const REAL_TIME_LIMIT_SEC = REAL_TOTAL_MS / 1000; // 300 segundos

        if (currentMinute === 0) {
          const rand = Math.random();
          if (rand < 0.25) step = 1;
          else if (rand < 0.75) step = 2;
          else step = 3;
        } else if (currentMinute === 1) {
          const rand = Math.random();
          if (rand < 0.50) step = 1;
          else if (rand < 0.75) step = 2;
          else step = 3;
        } else if (currentMinute === 2) {
          const rand = Math.random();
          if (rand < 0.25) step = 1;
          else if (rand < 0.75) step = 2;
          else step = 3;
        } else if (currentMinute >= 3 && elapsedRealSec < REAL_TIME_LIMIT_SEC) {
          const rand = Math.random();
          if (rand < 0.50) step = 1;
          else if (rand < 0.80) step = 2;
          else if (rand < 0.95) step = 3;
          else step = 4;
        } else if (elapsedRealSec >= REAL_TIME_LIMIT_SEC) {
          if (curr <= 3) {
            step = curr;
          } else {
            step = 1 + Math.floor(Math.random() * 4); // 1–4
          }
        }

        return Math.max(0, curr - step);
      });
    }, 1000); // atualiza a cada 1s real

    // Fallback da barra principal: garante fim em 5min REAIS
    const elapsedNow = Date.now() - globalStartAtMsRef.current;
    const remain = Math.max(0, REAL_TOTAL_MS - elapsedNow);

    mainTimerRef.current = setTimeout(() => {
      handleBarComplete('main');
    }, remain);

    // POPUP de alerta temporizado (abre depois de 15s reais)
    const alertDelay = Math.max(0, alertPopupDelayMs - elapsedNow);
    const alertTimer = setTimeout(() => {
      setShowAlertPopup(true);
    }, alertDelay);

    // RHPopup temporizado (abre depois de 40s reais)
    const rhDelay = Math.max(0, rhPopupDelayMs - elapsedNow);
    const rhTimer = setTimeout(() => setShowPopupRH(true), rhDelay);

    return () => {
      clearInterval(interval);
      if (mainTimerRef.current) {
        clearTimeout(mainTimerRef.current);
        mainTimerRef.current = null;
      }
      clearTimeout(alertTimer);
      clearTimeout(rhTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, alertPopupDelayMs, rhPopupDelayMs]);

  // ====== Lógica do popup de aviso (30s reais) ======
  useEffect(() => {
    if (!showAlertPopup) return;

    setAlertRemainingMs(alertPopupDurationMs);
    const startedAt = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, alertPopupDurationMs - elapsed);

      setAlertRemainingMs(remaining);

      if (remaining <= 0) {
        setShowAlertPopup(false);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [showAlertPopup, alertPopupDurationMs]);

  // ====== Travar scroll quando qualquer modal/overlay estiver aberto ======
  useEffect(() => {
    const anyOpen = showEntryOverlay || showPopupRH || showModal || showDetails || showAlertPopup;
    if (anyOpen) {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      document.body.dataset.scrollY = String(scrollY);
      Object.assign(document.body.style, {
        position: 'fixed',
        top: `-${scrollY}px`,
        left: '0',
        right: '0',
        width: '100%',
        overflow: 'hidden'
      });
    } else {
      const savedY = parseInt(document.body.dataset.scrollY || '0', 10);
      Object.assign(document.body.style, {
        position: '',
        top: '',
        left: '',
        right: '',
        width: '',
        overflow: ''
      });
      window.scrollTo(0, savedY);
      delete document.body.dataset.scrollY;
    }
  }, [showEntryOverlay, showPopupRH, showModal, showDetails, showAlertPopup]);

  // ====== Listener para receber comando do Typebot e FECHAR POPUP ======
  useEffect(() => {
    const handleMessage = (event) => {
      // se quiser, pode validar event.origin === 'https://sinaisdaalma.atendimentosdigitais.site'
      if (event.data === 'CLOSE_RH_POPUP' || (event.data && event.data.type === 'CLOSE_RH_POPUP')) {
        setShowPopupRH(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // ====== Dados do candidato ======
  const usuario = { email: dadosUsuario?.email || '' };

  const nome = processData?.userData?.firstName
    ? `${processData.userData.firstName} ${processData.userData?.lastName || ''}`.trim()
    : (dadosUsuario?.nome || 'Candidato(a)');

  const candidate = {
    nome,
    email: usuario.email || '-',
    cpf: processData?.userData?.cpf || dadosUsuario?.cpf || '-',
    cidade: processData?.userData?.city || '-',
    estado: processData?.userData?.state || '-',
    disponibilidade: processData?.userData?.availability || '-',
    pretensao: processData?.userData?.salaryExpectation || '-',
    experiencia: processData?.userData?.experience || '-',
    formacao: processData?.userData?.education || '-',
  };

  const handleContinuar = async () => {
    setIsLoading(true);
    try {
      await onContinuar({
        nome,
        email: usuario.email || '',
        cpf: candidate.cpf || '000.000.000-00'
      });
    } catch (error) {
      console.error('Erro ao continuar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Formatar tempo fake (segundos → mm:ss)
  const formatTime = (seconds) => {
    const totalSeconds = Math.max(0, Math.ceil(seconds));
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <>
      {/* ===== Overlay de Entrada (Step 4) ===== */}
      {showEntryOverlay && (
        <PaymentItauLoadingStep
          stepIndex={4}
          animateFromPrevious
          autoAdvanceMs={3000}
          onLoadingComplete={() => setEntryOverlayPhase(null)}
          headline={headline}
          subline={subline}
          rotatingMessages={messagesByPhase}
        />
      )}

      {/* ===== Conteúdo principal só após overlay sumir ===== */}
      {booted && (
        <>
          <div className="bloco_principal">
            <Maintexts>
              <Headlines variant="black">
                {nome}, o RH está analisando suas informações nesse momento.
              </Headlines>
            </Maintexts>

            <Paragraphs variant="black">
              Em poucos minutos você saberá se foi selecionado(a) para trabalhar com a gente.
            </Paragraphs>

            <Paragraphs variant="black">
              Tempo estimado restante: {formatTime(globalRemainingSec)}
            </Paragraphs>

            {/* Barra PRINCIPAL — 5 minutos REAIS */}
            <LoadingBar
              totalDurationMs={REAL_TOTAL_MS}
              startAtMs={globalStartAtMsRef.current}
              onComplete={() => handleBarComplete('main')}
            />

            <Continuity variant="black">
              Enquanto isso, mantenha esta página aberta pois, nossa equipe irá te chamar por aqui caso seja necessário.
            </Continuity>
            
            {/* Steps usando o total fake (10min) para narrativa */}
            <AnalysisStepsList totalDurationMs={DISPLAY_TOTAL_MS} />

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="inline-flex items-center w-[100%] mt-[-3vw] justify-center rounded-xl bg-white text-[#1e3c72] border border-gray-200 px-4 py-4 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Ver detalhes do processo seletivo
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showAlertPopup && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Fundo escuro e desfocado */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                {/* Modal */}
                <motion.div
                  className="relative z-[1000000] w-full max-w-xl bg-white rounded-2xl shadow-lg flex flex-col"
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                >
                  {/* Header do popup com contador */}
                  <div className="px-4 pt-4 pb-2 border-b flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">
                      Informações Importantes
                    </span>
                    <span className="text-xs text-gray-500">
                      Fecha sozinho em {Math.ceil(alertRemainingMs / 1000)}s
                    </span>
                  </div>

                  {/* Conteúdo rolável */}
                  <div className="scroll-area overflow-y-auto p-4">
                    <ExplanatoryCards supportTypes={alerts} variant="alert" />
                    <div className="h-2" />
                    <ExplanatoryCards supportTypes={padrao} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <RHPopup
            open={showPopupRH}
            onClose={() => setShowPopupRH(false)}
            isMinimized={isMinimized}
            onToggleMinimize={() => setIsMinimized(v => !v)}
            totalDurationMs={REAL_TOTAL_MS}
            startAtMs={globalStartAtMsRef.current}
            onLoadingComplete={onLoadingComplete}
            userData={{
              firstName: processData?.userData?.firstName || '',
              lastName: processData?.userData?.lastName || '',
              email: processData?.userData?.email || usuario.email || '',
              phone: processData?.userData?.phone || '',
              age: processData?.userData?.age || '',
              cpf: processData?.userData?.cpf || '',
              city: processData?.userData?.city || '',
              state: processData?.userData?.state || '',
              availability: processData?.userData?.availability || '',
              salaryExpectation: processData?.userData?.salaryExpectation || '',
              experience: processData?.userData?.experience || '',
              education: processData?.userData?.education || ''
            }}
          />

          <DetailsModal
            open={showDetails}
            onClose={() => setShowDetails(false)}
            candidate={candidate}
          />

          <FinalModal
            open={showModal}
            onContinue={handleContinuar}
            loading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default ConfirmacaoCurriculo;