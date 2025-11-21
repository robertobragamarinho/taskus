// SectionSix.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";

import Headline from "../../components/Headline.jsx";
import Subheadline from "../../components/SubHeadline.jsx";
import RevealUpGSAP from "../../gsap/RevealUpGSAP.jsx";
import StackedCards from "../../modules/StackedCards.jsx";
import LinesModal from "../../modules/LinesModal.jsx";
import CtaCard from "../../modules/CtaCard.jsx";
import Faq from "../../modules/Faq.jsx";
import FadeContent from "../../gsap/FadeContent.jsx";
import PoliticasAccordion from "../../modules/PoliticasAccordion.jsx";
import logo from "../../assets/logo-min.webp";

const LOADING_MESSAGES = [
  "Conectando aos servidores...",
  "Criptografia de segurança...",
  "Enviado com sucesso...",
  "Enviado com sucesso...",
];

const SectionFooter = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isFinalMessage, setIsFinalMessage] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState("");
  const timeoutsRef = useRef([]);

  // Limpa todos os timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    // cleanup ao desmontar o componente
    return () => {
      clearAllTimeouts();
    };
  }, []);

  // BLOQUEAR SCROLL QUANDO O POPUP ESTIVER ABERTO
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isPopupOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      const originalPaddingRight = document.body.style.paddingRight;

      // cálculo do scrollbar pra evitar "jump" no desktop
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isPopupOpen]);

  const startFakeFlow = (email) => {
    clearAllTimeouts();
    setEmailSubmitted(email);
    setIsPopupOpen(true);
    setIsFinalMessage(false);
    setStepIndex(0);

    const stepDuration = 1000; // 1s por mensagem

    // Mensagens de "carregando"
    LOADING_MESSAGES.forEach((_, index) => {
      if (index === 0) return; // já começamos no 0
      const timeoutId = setTimeout(() => {
        setStepIndex(index);
      }, index * stepDuration);
      timeoutsRef.current.push(timeoutId);
    });

    const totalLoadingTime = (LOADING_MESSAGES.length - 1) * stepDuration;

    // Mostrar mensagem final (com o e-mail)
    const finalTimeoutId = setTimeout(() => {
      setIsFinalMessage(true);
    }, totalLoadingTime + stepDuration * 0.4); // pequeno respiro após último "Enviado"

    timeoutsRef.current.push(finalTimeoutId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.currentTarget.elements.candidateEmail?.value;
    if (!email) return;

    console.log("Solicitação de suporte:", email);

    // Dispara o fluxo do popup fake
    startFakeFlow(email);

    // Opcional: limpar input
    e.currentTarget.reset();
  };

  return (
    <>
      {/* POPUP FAKE DE PROCESSAMENTO */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm overscroll-contain">
          <div className="w-[80vw] max-w-md rounded-3xl bg-[#0d111a] border border-white/10 px-6 py-6 shadow-xl">
            {/* Header de processando (só aparece antes da mensagem final) */}
            {!isFinalMessage && (
              <div className="mb-4 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </span>
                <p className="text-[2.4vw] sm:text-xs  text-emerald-300">
                  Processando...
                </p>
              </div>
            )}

            {/* Mensagem */}
            <p className="text-gray-100 text-[3.2vw] sm:text-sm leading-relaxed">
              {isFinalMessage ? (
                <>
                  <span className="font-semibold text-white">
                    Suporte Solicitado <br />
                    <br />
                  </span>
                  Nossa equipe recebeu o seu pedido de suporte! Em breve
                  entraremos em contato com você pelo{" "}
                  <span className="font-semibold text-white">
                    {emailSubmitted}
                  </span>
                  .
                </>
              ) : (
                LOADING_MESSAGES[stepIndex] || LOADING_MESSAGES[0]
              )}
            </p>

            {/* Botão fechar (aparece só na mensagem final) */}
            {isFinalMessage && (
              <div className="w-full flex justify-end mt-6">
                <button
                  onClick={() => {
                    clearAllTimeouts();
                    setIsPopupOpen(false);
                    setIsFinalMessage(false);
                    setStepIndex(0);
                  }}
                  className="
                    px-6 py-2 rounded-xl bg-[#0a56f8]
                    text-white text-[3vw] sm:text-[1rem] font-medium
                    hover:bg-[#0a56f8]/90 active:bg-[#0a56f8]/80
                    transition-all shadow-md
                  "
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEÇÃO PRINCIPAL */}
      <section
        data-snap-section
        className="h-screen relative flex flex-col pt-[20vw]"
      >
        <RevealUpGSAP
          threshold={0.2}
          enterThreshold={0.08}
          exitThreshold={0.02}
          rootMargin="15% 0px -5% 0px"
          duration={0.85}
          delay={0.1}
          ease="expo.out"
        >
          <Headline variant="h1" color="black" id="beneficios-h">
            Você ficou <br />
            com alguma dúvida?
          </Headline>
        </RevealUpGSAP>

        <Subheadline color="text-black">
          <RevealUpGSAP
            enterThreshold={0.08}
            exitThreshold={0.02}
            rootMargin="15% 0px -5% 0px"
            duration={0.9}
            delay={0.18}
            ease="expo.out"
          >
            Essas informações podem ajudar você
          </RevealUpGSAP>
        </Subheadline>

        <div className="px-6 bg-gray-100 mt-10 pb-[8vw]">
          <Faq />
        </div>

        <div className="w-full bg-[#0d111af1] py-[15vw]">
          <div className="-mt-5 px-6 w-full h-[60vw]">
            {/* Logo */}
            <div className="w-full flex">
              <FadeContent>
                <img
                  src={logo}
                  alt="TaskUs Brasil"
                  className="w-[30vw] pt-[7vw] sm:w-4/5 md:w-3/4 h-auto rounded-lg"
                />
              </FadeContent>
            </div>

            {/* Suporte ao candidato */}
            <h3 className="text-gray-100 text-[3.6vw] sm:text-[2.4vw] font-semibold leading-tight mt-10 mb-3">
              Suporte ao candidato
            </h3>

            <p className="text-gray-300 text-[2.8vw] sm:text-[2.2vw] leading-snug">
              Estamos prontos para te ajudar em{" "}
              <strong>todas as etapas</strong> — desde dúvidas sobre o processo
              seletivo até questões técnicas (acesso à plataforma, treinamento,
              envio de documentos e uso dos equipamentos). Informe seu e-mail
              abaixo, clique em <strong>“Solicitar”</strong> e um atendente
              entrará em contato em até <strong>24 horas</strong>.
            </p>

            {/* Formulário */}
            <form
              className="w-full mt-5 flex items-center gap-2"
              onSubmit={handleSubmit}
            >
              <label htmlFor="candidateEmail" className="sr-only">
                Digite o seu e-mail
              </label>

              <input
                id="candidateEmail"
                name="candidateEmail"
                type="email"
                inputMode="email"
                required
                placeholder="Digite o seu e-mail"
                className="
                  w-[70%] h-10 rounded-2xl border border-gray-500
                  text-gray-300 placeholder:text-gray-500
                  text-[4vw] sm:text-[2.2vw] px-3
                  focus:outline-none focus:ring-2 focus:ring-[#0a56f8] focus:border-[#0a56f8]
                  bg-[#000d2a00]
                "
              />

              <button
                type="submit"
                className="
                  w-[30%] h-10 rounded-2xl
                  text-white text-[3vw] sm:text-[2.2vw] font-medium
                  bg-[#0a56f8] hover:bg-[#0a56f8]/90 active:bg-[#0a56f8]/80
                  transition-colors
                  flex items-center justify-center
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a56f8]
                "
              >
                Solicitar
              </button>
            </form>
          </div>
        </div>

        <div className="bg-[#0d111af1] -mt-3.5 pt-10 pb-[15vw] px-6 h-[170vw]">
          <p className="text-gray-500 text-[2.4vw] sm:text-[1.9vw] leading-relaxed">
            <strong>Política de Privacidade</strong>
            <br />
            Levamos sua privacidade a sério. Todos os dados que você compartilha
            conosco — seja em formulários, processos seletivos ou durante o uso
            de nossos serviços — são tratados com segurança, transparência e
            responsabilidade. Utilizamos tecnologias modernas de proteção, como
            criptografia e autenticação, e seguimos as boas práticas exigidas
            pela legislação de proteção de dados. Nosso compromisso é simples:
            usar suas informações apenas para o funcionamento e melhoria de
            nossos serviços, sempre respeitando a sua confiança.
            <br />
            <br />
          </p>

          <PoliticasAccordion />
        </div>
      </section>
    </>
  );
};

export default SectionFooter;3