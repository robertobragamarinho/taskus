/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';
import Maintexts from "../../modules/Main-texts";
import Headlines from "../../modules/Headlines";
import Paragraphs from "../../modules/Paragraphs";
import ExplanatoryCards from "../../modules/ExplanatoryCards";

const ReviewStep2Contratacao = ({ onContinue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onContinue) onContinue();
    }, 1000);
  };

  const alerts = [
    {
      id: "training",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#1655ff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41a60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84a51.39 51.39 0 0 0-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      ),
      title: "Porque o treinamento é obrigatório?",
      description:
        "Ele garante que você comece preparado(a), confiante e pronto(a) para entregar o mesmo nível de qualidade que as empresas que contratam a TaskUs Exige",
    },
    {
      id: "startWork",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#1655ff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18c-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75a24 24 0 0 1-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      ),
      title: "O que você vai aprender?",
      description:
        "O treinamento é 100% online e pode ser feito pelo celular ou computador. Com ele, você vai aprender:",
      resources: [
        { title: "Fundamentos do Atendimento" },
        { title: "Resolução de conflitos" },
        { title: "Experiência do cliente" },
        { title: "Sistemas internos da Taskus" },
        { title: "Comunicação clara, Empática e Eficaz" },
        { title: "Organização, produtividade e rotina" },
      ],
    },
  ];

  const faqList = [
    {
      question: "Por que o treinamento é obrigatório?  ",
      answer:
        "Porque as empresas que trabalham com a TaskUs exigem um padrão de qualidade. O treinamento existe para deixar você preparado(a), seguro(a) e pronto(a) para começar,  mesmo que nunca tenha trabalhado na área. É rápido, simples e feito para você não ter dúvidas quando iniciar o trabalho.",
    },
    {
      question: "Por que existe um valor simbólico?",
      answer:
        "Porque muita gente é aprovada, mas não inicia o treinamento. Quando isso acontece, a vaga fica parada e outra pessoa perde a oportunidade. Esse valor simbólico evita isso e mostra que você realmente quer seguir com a contratação e não vai desistir no meio do caminho. É apenas um compromisso para manter sua vaga reservada no sistema.",
    },
    {
      question: "Esse valor é realmente devolvido? Como funciona?",
      answer:
        "Sim. Assim que você terminar o treinamento e começar a trabalhar, o valor volta no seu primeiro salário, automaticamente. Ele não fica com a TaskUs. É apenas um sinal de compromisso, nada além disso.",
    },
    {
      question: "Se eu não iniciar o treinamento agora, perco a vaga?",
      answer:
        "O sistema segura sua vaga por um curto período. Se você não iniciar o treinamento, ela é repassada automaticamente para alguém da lista de espera. É por isso que pedimos para você confirmar o quanto antes.",
    },
    {
      question: "Em quanto tempo começo a trabalhar depois do treinamento?  ",
      answer:
        "Assim que você finalizar, seu gerente agenda sua data de início e libera seus acessos ao sistema de trabalho.",
    },
    {
      question: "Preciso pagar mais alguma coisa depois? ",
      answer:
        "Não. você não terá que pagar nada. Esse valor simbólico é único. Todo o restante é coberto pela TaskUs",
    },
    {
      question: "Como sei que isso aqui é oficial e confiável? ",
      answer:
        "A TaskUs é uma empresa global, presente em 13 países e referência em atendimento para grandes marcas como Mercado Livre, Microsoft, Natura e outras gigantes. A Q3 EAD é nossa parceira oficial no Brasil e responsável por treinar todos os profissionais que entram na empresa. O treinamento é parte oficial do nosso processo de contratação.",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
 
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#0a0026] px-6 pb-10">
      <div className="w-full max-w-md mx-auto px-0 pt-8 pb-0">
        <Maintexts>
          <section id='ETP8T1'/>
          <Headlines variant="white">
            Falta pouco para <br/> você começar a trabalhar
          </Headlines>
          <Paragraphs variant="white">
            Agora você precisa fazer o treinamento de capacitação obrigatório.
          </Paragraphs>
        </Maintexts> 

        <div className="mt-5">
          <ExplanatoryCards supportTypes={alerts} variant="supportTypes" />
        </div>

        {/* Botão fixo no rodapé */}
        <div className="w-full mt-10 pt-2 pb-6 flex justify-center">
          <motion.button
            onClick={handleContinue}
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: isLoading ? 1 : 1.03 }}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#1655ff] transition-all duration-300 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            style={{
              background: "linear-gradient(90deg, #1655ff 0%, #4285f4 100%)",
              fontSize: "15pt",
              boxShadow: "0 2px 8px 0 rgba(22,85,255,0.10)",
              border: "none",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  style={{
                    borderTopColor: "transparent",
                    borderRightColor: "white",
                    borderBottomColor: "white",
                    borderLeftColor: "white",
                  }}
                />
                <span
                  className="font-hendrix-medium tracking-wide"
                  style={{ fontSize: "13pt" }}
                >
                  Carregando...
                </span>
              </>
            ) : (
              <span
                className="font-hendrix-medium tracking-wide"
                style={{ fontSize: "15pt" }}
              >
                Continuar
              </span>
            )}
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default ReviewStep2Contratacao;