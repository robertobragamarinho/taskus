import React, { useState, useEffect, useRef } from 'react';
import { Check, Loader2 } from 'lucide-react';
import Header from "../components/modules/Header";

/**
 * PaymentItauLoadingStep — Modal de carregamento com etapas e progresso animado.
 */
const PaymentItauLoadingStep = ({
  stepIndex = 1,
  animateFromPrevious = true,
  autoAdvanceMs = 3000,
  onFinish,
  onLoadingComplete,
  headline = 'Entrevista Online',
  subline = 'Estamos preparando tudo para você iniciar o processo seletivo.',
  steps: stepsProp,
  rotatingMessages = [
    'Preparando sua entrevista inicial…',
    'Verificando seus dados…',
    'Carregando recursos necessários…'
  ],
  messageIntervalMs = 1800
}) => {
  const steps = stepsProp || [
    { id: 1, title: 'Entrevista inicial' },
    { id: 2, title: 'Teste prático' },
    { id: 3, title: 'Currículo' },
    { id: 4, title: 'Análise' },
    { id: 5, title: 'Resultado' }
  ];

  const initialVisual = Math.max(1, animateFromPrevious && stepIndex > 1 ? stepIndex - 1 : stepIndex);
  const [visualStep, setVisualStep] = useState(initialVisual);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  const progressRef = useRef(0);
  const calledRef = useRef(false);
  const rafRef = useRef(null);
  const timerRef = useRef(null);
  const stallRef = useRef(false);
  const deadlineRef = useRef(0);

  useEffect(() => {
    const nextVisual = Math.max(1, animateFromPrevious && stepIndex > 1 ? stepIndex - 1 : stepIndex);
    setVisualStep(nextVisual);
  }, [stepIndex, animateFromPrevious]);

  const getMessagesForStep = (s) => {
    if (Array.isArray(rotatingMessages)) return rotatingMessages;
    if (rotatingMessages && typeof rotatingMessages === 'object') {
      const arr = rotatingMessages[s];
      if (Array.isArray(arr) && arr.length) return arr;
    }
    return ['Carregando…'];
  };

  useEffect(() => {
    setMsgIndex(0);
    if (timerRef.current) clearInterval(timerRef.current);
    const msgs = getMessagesForStep(visualStep);
    const intervalMs = Math.max(900, Number(messageIntervalMs) || 1800);

    timerRef.current = setInterval(() => {
      setMsgIndex((i) => (i + 1) % Math.max(1, msgs.length));
    }, intervalMs);

    return () => clearInterval(timerRef.current);
  }, [visualStep, messageIntervalMs, rotatingMessages]);

  useEffect(() => {
    let mounted = true;

    calledRef.current = false;
    stallRef.current = false;
    progressRef.current = 0;
    setProgress(0);

    const totalDuration = Math.max(Number(autoAdvanceMs) || 3000, 1000);
    deadlineRef.current = performance.now() + totalDuration;

    const doneSubStep = () => {
      if (visualStep < stepIndex) {
        setVisualStep(stepIndex);
      } else if (!calledRef.current) {
        calledRef.current = true;
        const cb = onFinish || onLoadingComplete;
        if (typeof cb === 'function') cb();
      }
    };

    const tick = () => {
      if (!mounted) return;

      const now = performance.now();
      const timeLeft = Math.max(0, deadlineRef.current - now);

      if (timeLeft <= 0) {
        progressRef.current = 1;
        setProgress(1);
        return doneSubStep();
      }

      const p = progressRef.current;

      if (!stallRef.current && Math.random() < 0.12 && p > 0.1 && p < 0.9) {
        stallRef.current = true;
        const stallTime = 300 + Math.random() * 800;
        setTimeout(() => {
          stallRef.current = false;
          rafRef.current = requestAnimationFrame(tick);
        }, stallTime);
        return;
      }

      const baseDelay = 120 + Math.random() * 260;
      setTimeout(() => {
        let stepMin, stepMax;
        if (p < 0.3) { stepMin = 0.05; stepMax = 0.12; }
        else if (p < 0.7) { stepMin = 0.02; stepMax = 0.06; }
        else if (p < 0.9) { stepMin = 0.01; stepMax = 0.03; }
        else { stepMin = 0.004; stepMax = 0.012; }

        const avgPulse = 240;
        const pulsesLeftEst = Math.max(1, timeLeft / avgPulse);
        const needPerPulse = (1 - p) / pulsesLeftEst;
        const randomStep = stepMin + Math.random() * (stepMax - stepMin);
        const step = Math.max(randomStep, needPerPulse * 0.75);

        const next = Math.min(1, +(p + step).toFixed(4));
        if (!mounted) return;
        progressRef.current = next;
        setProgress(next);

        if (next < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          doneSubStep();
        }
      }, baseDelay);
    };

    rafRef.current = requestAnimationFrame(tick);

    const hardTimeout = setTimeout(() => {
      if (!mounted) return;
      progressRef.current = 1;
      setProgress(1);
      doneSubStep();
    }, totalDuration + 221200);

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(hardTimeout);
    };
  }, [visualStep, stepIndex, autoAdvanceMs, onFinish, onLoadingComplete]);

  const getStepStatus = (id) => {
    if (id < visualStep) return 'completed';
    if (id === visualStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (id) => {
    const status = getStepStatus(id);
    if (status === 'completed') return <Check className="step-icon check-icon" />;
    if (status === 'current') return <Loader2 className="step-icon spinner-icon" />;
    return <div className="step-icon pending-icon">{id}</div>;
  };

  const messages = getMessagesForStep(visualStep);
  const currentMessage =
    messages.length ? messages[msgIndex] : (visualStep === 1 ? 'Preparando…' : `Carregando etapa ${visualStep}…`);

  return (
    <div className="loading-overlay flex flex-col loading-overlay flex ">

      <div className="w-[100%]">
        <Header rightText="Processo Seletivo" />
      </div>

      <style>{`
        .loading-overlay { 
          position: fixed; 
          inset: 0; 
          background-color: #d0d0d0; /* Fundo sólido escuro */
          display:flex; 
          
          align-items: center; 
      
          z-index:9999; 
          animation: fadeIn .3s ease-in; 
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        .loading-modal { background:#fff; border-radius:16px; padding:36px 30px; max-width:500px; width:90%; box-shadow:0 20px 60px rgba(0,0,0,.3); animation: slideUp .4s ease-out; }
        @keyframes slideUp { from{ transform:translateY(30px); opacity:0 } to{ transform:translateY(0); opacity:1 } }

        .modal-title { font-size:24px; font-weight:700; color:#1f2937; margin:0 0 8px; text-align:left; }
        .modal-sub { font-size:14px; color:#6b7280; margin:0 0 20px; }

        .steps-container { margin-bottom:20px; }
        .step-wrapper { position:relative; }
        .step-item { display:flex; align-items:center; gap:14px; padding:10px 0; border-radius:10px; transition:all .3s ease; }
        .step-icon-wrapper { position:relative; flex-shrink:0; width:44px; height:44px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:all .3s ease; }
        .step-icon { width:22px; height:22px; }

        .step-wrapper:not(:last-child) .step-icon-wrapper::after { content:''; position:absolute; left:50%; transform:translateX(-50%); top:100%; width:2px; height:16px; background-color:#e5e7eb; }
        .step-wrapper:not(:last-child) .step-item.completed .step-icon-wrapper::after { background-color:#10b981; }

        .step-item.current .step-icon-wrapper { background-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.2); }
        .step-item.current .step-icon { color:#fff; animation: spin 1s linear infinite; }
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }

        .step-item.completed .step-icon-wrapper { background-color:#10b981; }
        .step-item.completed .step-icon { color:#fff; }
        .step-item.pending .step-icon-wrapper { background-color:#e5e7eb; display:flex; align-items:center; justify-content:center; }
        .pending-icon { display:flex; align-items:center; justify-content:center; width:100%; height:100%; color:#9ca3af; font-weight:600; font-size:16px; transition:color .3s ease; }

        .step-content { flex:1; }
        .step-title { font-size:15px; font-weight:600; color:#1f2937; margin:0; }
        .step-item.current .step-title { color:#3b82f6; }
        .step-item.completed .step-title { color:#10b981; }

        .loading-message { display:flex; align-items:center; gap:10px; padding:16px; background-color:#f9fafb; border-radius:10px; margin-bottom:20px; }
        .message-text { font-size:13px; color:#4b5563; margin:0; line-height:1.5; }

        .progress-bar { width:100%; height:6px; background-color:#e5e7eb; border-radius:3px; overflow:hidden; }
        .progress-fill { height:100%; background:linear-gradient(90deg,#3b82f6,#2563eb); border-radius:3px; animation: progressShine 1.5s ease-in-out infinite; transition: width .25s ease; }
        @keyframes progressShine { 0%{opacity:1} 50%{opacity:.85} 100%{opacity:1} }

        @media (max-width:640px){
          .loading-modal{ padding:24px; }
          .modal-title{ font-size:20px; margin-bottom:6px; }
          .modal-sub{ font-size:13px; }
          .step-item{ padding:8px 0; }
          .step-icon-wrapper{ width:38px; height:38px; }
          .step-icon{ width:18px; height:18px; }
          .step-wrapper:not(:last-child) .step-icon-wrapper::after{ height:12px; }
        }
      `}</style>

      

      <div className="loading-modal mt-5">
        
        <h2 className="modal-title ">{headline}</h2>

        <div className="steps-container mt-5">
          {steps.map((step) => (
            <div key={step.id} className="step-wrapper">
              <div className={`step-item ${getStepStatus(step.id)}`}>
                <div className="step-icon-wrapper">{getStepIcon(step.id)}</div>
                <div className="step-content"><h3 className="step-title">{step.title}</h3></div>
              </div>
            </div>
          ))}
        </div>

        <div className="loading-message">
          <p className="message-text">{currentMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentItauLoadingStep;