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

// ⚠️ Caminho correto a partir de /pages:
import PaymentItauLoadingStep from '../../modules/PaymentItauLoadingStep.jsx';

const ConfirmacaoCurriculo = ({ dadosUsuario, onContinuar }) => {
  const { processData } = useProcess();

  // ============ OVERLAY DE ENTRADA (Step 4) ============
  // 'intro' (mostra), null (sumiu)
  const [entryOverlayPhase, setEntryOverlayPhase] = useState('intro');
  const showEntryOverlay = entryOverlayPhase === 'intro';
  const booted = !showEntryOverlay; // só "inicia" a página após o overlay sumir

  const headline = 'Análise do Currículo';
  const subline = 'Estamos validando suas informações para seguir com a seleção.';
  const messagesByPhase = {
    4: ['Validando currículo…', 'Enviando para análise…', 'Comparando requisitos…']
  };

  const [isLoading, setIsLoading] = useState(false);

  // >>> ÂNCORA GLOBAL: definida IMEDIATAMENTE ao montar o componente
  const globalStartAtMsRef = useRef(Date.now());

  const alerts = [
    {
      id: 'equipments-alert',
      icon: IconAlert,
      title: 'Aguarde a análise',
      description:
        'Nossa equipe vai entrar em contato por aqui para confirmar algumas informações. Se você não responder, a vaga será automaticamente destinada a outro candidato. Por isso, não feche esta página e nem abra outros aplicativos. Permaneça aqui para garantir a sua vaga.'
    }
  ];

  const padrao = [
    {
      id: 'equipments-info',
      icon: IconChecklistLike,
      title: 'Online 24h/dia',
      description:
        'De 01/10 a 9/11, nossa equipe de RH está em turnos especiais para atender à alta demanda de contratações. Nesse período, todos os candidatos são avaliados 24 horas por dia.'
    }
  ];

  const [showPopupRH, setShowPopupRH] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showModal, setShowModal] = useState(false);       // modal final
  const [showDetails, setShowDetails] = useState(false);   // modal de detalhes

  // ====== POPUP DE ALERTA ======
  const [showAlertPopup, setShowAlertPopup] = useState(false);

  // Tempo GLOBAL - 3 MINUTOS (180 segundos)
  const totalDurationMs = 180000; // 3 minutos

  // Tempo POPUP AVISOS - Abre em 00:20 (20 segundos após início)
  const alertPopupDelayMs = 20000; // 20 segundos

  // Duração do POPUP AVISOS - Fica aberto por 30 segundos
  const alertPopupDurationMs = 30000; // 30 segundos

  // ===== Tempo restante sincronizado com o global =====
  const [globalRemainingMs, setGlobalRemainingMs] = useState(totalDurationMs);

  // Tempo para abrir MENSAGEM DO RH - Abre em 02:00 (120 segundos = 2 minutos)
  const rhPopupDelayMs = 120000; // 2 minutos

  // Duração do RH POPUP - Fica aberto por 50 segundos
  const rhPopupDurationMs = 50000; // 50 segundos

  // ===== Coordenador de múltiplas LoadingBars principais =====
  const MAIN_BARS = ['main']; // ex.: ['main', 'footer']
  const [completedBarIds, setCompletedBarIds] = useState(() => new Set());

  const onLoadingComplete = () => setShowModal(true);

  // Evita duplo-disparo e limpa o timer global quando concluir
  const mainTimerRef = useRef(null);

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

  // ✅ Inicialização só após o overlay sumir
  useEffect(() => {
    if (!booted) return;

    // A âncora global já foi definida no mount do componente
    // Não redefinimos aqui para não perder o tempo do overlay

    // Atualizar tempo restante global a cada 100ms
    const globalTimer = setInterval(() => {
      const elapsed = Date.now() - globalStartAtMsRef.current;
      const remaining = Math.max(0, totalDurationMs - elapsed);
      setGlobalRemainingMs(remaining);
    }, 100);

    // Calcular tempo já decorrido desde o mount
    const elapsed = Date.now() - globalStartAtMsRef.current;
    const remaining = Math.max(0, totalDurationMs - elapsed);

    mainTimerRef.current = setTimeout(() => {
      handleBarComplete('main');
    }, remaining);

    // Abre o alerta temporizado após o delay (ajustado pelo tempo já decorrido)
    const alertDelay = Math.max(0, alertPopupDelayMs - elapsed);
    const alertTimer = setTimeout(() => {
      setShowAlertPopup(true);
    }, alertDelay);

    // Abre o RHPopup no momento certo (ajustado pelo tempo já decorrido)
    const rhDelay = Math.max(0, rhPopupDelayMs - elapsed);
    const rhTimer = setTimeout(() => setShowPopupRH(true), rhDelay);

    return () => {
      clearInterval(globalTimer);
      if (mainTimerRef.current) {
        clearTimeout(mainTimerRef.current);
        mainTimerRef.current = null;
      }
      clearTimeout(alertTimer);
      clearTimeout(rhTimer);
    };
  }, [booted, totalDurationMs, alertPopupDelayMs, rhPopupDelayMs]);

  // Fechar o popup automaticamente após a duração especificada
  useEffect(() => {
    if (!showAlertPopup) return;

    const closeTimer = setTimeout(() => {
      setShowAlertPopup(false);
    }, alertPopupDurationMs);

    return () => clearTimeout(closeTimer);
  }, [showAlertPopup, alertPopupDurationMs]);

  // Fechar o RHPopup automaticamente após a duração especificada
  useEffect(() => {
    if (!showPopupRH) return;

    const closeTimer = setTimeout(() => {
      setShowPopupRH(false);
    }, rhPopupDurationMs);

    return () => clearTimeout(closeTimer);
  }, [showPopupRH, rhPopupDurationMs]);

  // Bloquear scroll do body quando QUALQUER modal/popup/overlay estiver aberto
  useEffect(() => {
    const anyOpen = showEntryOverlay || showPopupRH || showModal || showDetails || showAlertPopup;
    if (anyOpen) {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      document.body.dataset.scrollY = String(scrollY);
      Object.assign(document.body.style, {
        position: 'fixed',
        top: `-${scrollY}px`,
        left: '0', right: '0', width: '100%', overflow: 'hidden'
      });
    } else {
      const savedY = parseInt(document.body.dataset.scrollY || '0', 10);
      Object.assign(document.body.style, { position: '', top: '', left: '', right: '', width: '', overflow: '' });
      window.scrollTo(0, savedY);
      delete document.body.dataset.scrollY;
    }
  }, [showEntryOverlay, showPopupRH, showModal, showDetails, showAlertPopup]);

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
                {nome}, em<br /> minutos você saberá se <br />foi selecionado(a) para ser contratado(a)
              </Headlines>
            </Maintexts>

            <Paragraphs variant="black">
              Nossa equipe de RH já está fazendo a análise do seu perfil.
            </Paragraphs>

            {/* Barra PRINCIPAL (id: 'main') — sincronizada com o tempo global */}
            <LoadingBar
              totalDurationMs={totalDurationMs}
              startAtMs={globalStartAtMsRef.current}
              onComplete={() => handleBarComplete('main')}
            />

            <AnalysisStepsList totalDurationMs={totalDurationMs} />

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="inline-flex items-center w-[100%] mt-[-3vw] justify-center rounded-xl bg-white text-[#1e3c72] border border-gray-200 px-4 py-4 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Ver detalhes da Entrevista
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
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowAlertPopup(false)}
                />

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
                      Fecha em {Math.ceil(globalRemainingMs / 1000)}s
                    </span>
                  </div>

                  {/* Conteúdo rolável */}
                  <div className="scroll-area overflow-y-auto p-4">
                    <ExplanatoryCards supportTypes={alerts} variant="alert" />
                    <div className="h-2" />
                    <ExplanatoryCards supportTypes={padrao} />

                    {/* Barra do POPUP — sincronizada com o fluxo global */}
                    <div className="mt-[-1.4vw] mb-[-2.5vw]">
                      <LoadingBar
                        totalDurationMs={totalDurationMs}
                        startAtMs={globalStartAtMsRef.current}
                        onComplete={() => {}}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RHPopup recebe o startAtMs GLOBAL e deve repassar para suas LoadingBars */}
          <RHPopup
            open={showPopupRH}
            onClose={() => setShowPopupRH(false)}
            isMinimized={isMinimized}
            onToggleMinimize={() => setIsMinimized(v => !v)}
            totalDurationMs={totalDurationMs}
            startAtMs={globalStartAtMsRef.current}
            onLoadingComplete={onLoadingComplete}
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