/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Maintexts from "../../modules/Main-texts";
import Headlines from "../../modules/Headlines";
import Paragraphs from "../../modules/Paragraphs";
import ExplanatoryCards from "../../modules/ExplanatoryCards";
import { IconAlert } from "../../modules/SvgIcons";

const ReviewStep4Contratacao = ({ onContinue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Redireciona para o link externo da Q3 EAD
      window.location.href = 'https://q3ead.online/vinculaWork';
    }, 1000);
  };

  // ===== Card informativo
  const supportTypes = [
    {
      id: "training-why-pay",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1655ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M13.466 4.022C15.97 4.022 18 6.035 18 8.517s-2.03 4.494-4.534 4.494a4.53 4.53 0 0 1-4.46-3.675m12.992 4.674h-2.393c-.294 0-.584.066-.847.193l-2.04.987a1.95 1.95 0 0 1-.847.193h-1.042c-1.008 0-1.825.79-1.825 1.765c0 .04.027.074.067.085l2.539.701c.455.126.943.082 1.367-.123l2.18-1.054m-6.152-.25l-4.59-1.41a1.98 1.98 0 0 0-2.202.753c-.369.51-.219 1.24.318 1.55l7.51 4.33a2 2 0 0 0 1.566.187l6.39-1.895" />
          <path d="M2.002 4.52c1.527-.598 3.7-2.056 4.888-2.355c2.633-.529 4.014.25 7.132 1.858c-1.312.028-3.076.779-3.944 2.494m0 0H8.294m1.784 0h1.309c.393.03 1.242.266 1.569 1.027c.13.306.168.668-.09.852c-.347.358-.845.344-1.287.422m0 0c-.508.09-.997.19-1.508.29m1.508-.29l-1.508.29m0 0l-.342.065m.342-.065l-.342.065m0 0c-.797.09-2.739 1.018-3.685 1.279c-.322.153-2.903.654-4.028.566" />
        </svg>
      ),
      title: "Por que esse valor simbólico existe?",
      description: (
        <>
          Porque muitos candidatos são aprovados, mas não iniciam o treinamento
          e isso trava a vaga e impede que outras pessoas participem.
          <br />
          <br />
          Esse valor existe só pra confirmar que você realmente quer seguir e
          garantir que sua vaga fique reservada exclusivamente para você. E fica
          tranquilo(a): esse valor é devolvido no seu primeiro salário.
        </>
      ),
    },
  ];

  // ===== Alerta
  const alerts = [
    {
      id: 'equipments-alert',
      icon: IconAlert,
      title: 'Atenção',
      description:
        'Para manter sua aprovação ativa, é importante iniciar o treinamento nas próximas horas. Se não começar, sua vaga pode ser repassada para outra pessoa da lista de espera.'
    }
  ];

  // ===== FAQ (importado do Step2)
  const faqList = [
    {
      question: "Por que o treinamento com a Q3 EAD é obrigatório?  ",
      answer:
        "Porque as empresas que trabalham com a TaskUs exigem um padrão de qualidade. O treinamento existe para deixar você preparado(a), seguro(a) e pronto(a) para começar,  mesmo que nunca tenha trabalhado na área. É rápido, simples e feito para você não ter dúvidas quando iniciar o trabalho.",
    },
    {
      question: "Por que é necessário pagar um valor simbólico?",
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#0a0026] px-6 pb-10">
      <div className="w-full max-w-md mx-auto px-0 pt-8 pb-0">

        <Maintexts>
          <section id='ETP8T3'/>
          <Headlines variant="white">
            Agora é só iniciar o<br /> treinamento para começar a<br /> trabalhar com a gente.
          </Headlines>
          <Paragraphs variant="white">
            Ele contém todos os materiais de estudo,<br />  video aulas e a certificação necessária para <br /> você começar a trabalhar.
          </Paragraphs>
        </Maintexts>

        {/* Card de valores */}
        <div
          className="bg-[#f2f6f9] rounded-2xl px-7 pt-8 pb-7 mb-6 flex flex-col"
          style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}
        >
          <div className="flex flex-col items-start mb-4">
            <span className="block mb-2" style={{ lineHeight: 1 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="54"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1655ff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <g>
                  <path d="M16.308 4.384c-.59 0-.886 0-1.155-.1l-.111-.046c-.261-.12-.47-.328-.888-.746c-.962-.962-1.443-1.443-2.034-1.488a2 2 0 0 0-.24 0c-.591.045-1.072.526-2.034 1.488c-.418.418-.627.627-.888.746l-.11.046c-.27.1-.565.1-1.156.1h-.11c-1.507 0-2.261 0-2.73.468s-.468 1.223-.468 2.73v.11c0 .59 0 .886-.1 1.155q-.022.057-.046.111c-.12.261-.328.47-.746.888c-.962.962-1.443 1.443-1.488 2.034a2 2 0 0 0 0 .24c.045.591.526 1.072 1.488 2.034c.418.418.627.627.746.888q.025.054.046.11c.1.27.1.565.1 1.156v.11c0 1.507 0 2.261.468 2.73s1.223.468 2.73.468h.11c.59 0 .886 0 1.155.1q.057.021.111.046c.261.12.47.328.888.746c.962.962 1.443 1.443 2.034 1.488q.12.009.24 0c.591-.045 1.072-.526 2.034-1.488c.418-.418.627-.626.888-.746q.054-.025.11-.046c.27-.1.565-.1 1.156-.1h.11c1.507 0 2.261 0 2.73-.468s.468-1.223.468-2.73v-.11c0-.59 0-.886.1-1.155q.021-.057.046-.111c.12-.261.328-.47.746-.888c.962-.962 1.443-1.443 1.488-2.034q.009-.12 0-.24c-.045-.591-.526-1.072-1.488-2.034c-.418-.418-.626-.627-.746-.888l-.046-.11c-.1-.27-.1-.565-.1-1.156v-.11c0-1.507 0-2.261-.468-2.73s-1.223-.468-2.73-.468z" />
                  <path d="M8.5 16.5a4.04 4.04 0 0 1 3.5-2.02c1.496 0 2.801.812 3.5 2.02M14 10a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                </g>
              </svg>
            </span>
            <span className="font-hendrix-regular text-black text-[18px] leading-tight mb-2" style={{ maxWidth: '100%' }}>
              O treinamento completo custa R$680,00, valor definido pela Q3 EAD. Mas como você já foi aprovado(a) pela TaskUs, nós cobrimos praticamente tudo.
              <br /><br />
              Você paga apenas um valor simbólico, bem pequeno de de R$93,25, só para confirmar que realmente quer a vaga.
            </span>
          </div>

          {/* Faixas de valores */}
          <div
            className="flex flex-col border border-black w-full rounded-[2.5vw] overflow-hidden mb-4"
            style={{ boxShadow: '0 1px 4px 0 rgba(22,85,255,0.04)' }}
          >
            <div className="flex justify-between items-center border border-b-black px-5 py-3">
              <span className="font-hendrix-regular text-black text-[14px]">Valor total</span>
              <span className="font-hendrix-bold text-black text-[16px]">R$680,00</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="font-hendrix-regular text-black text-[14px]">Pago por nós</span>
              <span className="font-hendrix-bold text-[#FF5A5A] text-[16px]">- R$586,75</span>
            </div>
            <div className="flex justify-between items-center border border-t-black px-5 py-3">
              <span className="font-hendrix-regular text.black text-[14px]">Seu investimento</span>
              <span className="font-hendrix-bold text-[#2c6dfa] text-[16px]">R$93,25</span>
            </div>
          </div>

          <div className="font-hendrix-regular leading-[17px] text-[#B3B3B3] text-[14px] mt-2">
            Para garantir o valor pago pela TaskUs é necessário digitar o seu CPF ao entrar na Q3 EAD.
          </div>
        </div>

        {/* Card informativo */}
        <div className="mt-5">
          <ExplanatoryCards supportTypes={supportTypes} variant="supportTypes" />
        </div>

        {/* Alerta */}
        <div className="mt-4">
          <ExplanatoryCards supportTypes={alerts} variant="alert" />
        </div>

        {/* Botão principal */}
        <div className="w-full pt-2 mt-10 mb-10 pb-6 flex justify-center">
          <motion.button
            onClick={handleContinue}
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: isLoading ? 1 : 1.03 }}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#1655ff] transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            style={{
              background: 'linear-gradient(90deg, #1655ff 0%, #4285f4 100%)',
              fontSize: '15pt',
              boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
              border: 'none',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? (
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
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Iniciar treinamento</span>
            )}
          </motion.button>
        </div>

        {/* FAQ abaixo do botão */}
        <div className="w-full mt-2">
          <h2 className="font-hendrix-bold text.white text-[28px] mb-1 text-left">
            Dúvidas frequentes
          </h2>
          <p className="font-hendrix-regular text-[#B3B3B3] text-[18px] mb-6 text-left">
            Você tem alguma dúvida? Talvez isso possa te ajudar!
          </p>
          <div className="flex flex-col gap-4">
            {faqList.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#232323] flex flex-col justify-center py-3 items-center rounded-2xl px-7 transition-all duration-300"
                style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}
              >
                <button
                  className="w-full flex justify-between focus:outline-none"
                  style={{ minHeight: "48px" }}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-hendrix-light text-[#B3B3B3] pr-10 text-left text-[3.5vw]">
                    {faq.question}
                  </span>
                  <span className="">
                    {openFaq === idx ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 15l6-6 6 6"
                          stroke="#1655ff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 6v12M6 12h12"
                          stroke="#1655ff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="font-hendrix-regular text-[#ffffff] text-[16px] mt-3 text-left transition-all duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep4Contratacao;