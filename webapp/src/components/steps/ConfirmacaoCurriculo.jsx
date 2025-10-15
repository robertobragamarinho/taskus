/* eslint-disable no-unused-vars */


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useProcess } from '@/hooks/useProcess.js';
const InfoIconMin = null;
const Alert_Icon_Min = null;
import '../../styles/refino.css';

// eslint-disable-next-line no-unused-vars
const ConfirmaçãoCurriculo = ({ dadosUsuario, tempoEspera = '7 minutos', onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { processData } = useProcess();

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
  const totalSeconds = 20;
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

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
        setElapsed((prev) => prev + 1);
      }, totalSeconds * 10); // ~200ms por % => ~20s no total
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setShowModal(true);
    }
  }, [progress]);

  const remainingSeconds = Math.max(
    totalSeconds - Math.floor((progress / 100) * totalSeconds),
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

  return (
    <>
      {/* ====== CONTAINER PRINCIPAL ====== */}
      <div className="space-y-6">
        {/* Mensagem principal */}
        <h1 className="tituloanalise font-hendrix-semibold text-gray-800 text-lg mb-5">
          {nome}, nossa equipe de RH está analisando o seu perfil agora. Não feche esta página.
        </h1>
        <p className="subtitulodaetapa font-hendrix-regular text-gray-500">
          A análise leva de 4 a 7 minutos. Ao final, vamos informar se você foi selecionado(a) para a contratação.
        </p>



        <div className="rounded-xl p-4" style={{ backgroundColor: '#f3f6f9' }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ backgroundColor: '#e6f0ff' }}>
                <Star className="w-5 h-5" style={{ color: '#1655ff' }} />
              </div>
            </div>
            <div className="flex-1 text-sm text-gray-700" style={{ fontSize: '10pt' }}>
              De 01/09 a 30/09, nossa equipe de RH estará em turnos especiais para atender à alta demanda de contratações. Nesse período, todos os candidatos serão avaliados 24 horas por dia.
            </div>
          </div>
        </div>

        {/* ====== Informações do candidato(a) (somente leitura) */}
        <div className="space-y-2 mt-12">
          <h2 className="textocontinuidade font-hendrix-semibold text-gray-700 text-sm mb-3">
            Informações do candidato(a)
          </h2>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4">
            {/* Nome */}
            <div className="flex items-center justify-between">
              <span className="font-hendrix-medium text-gray-500 text-sm">Nome</span>
              <span className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-60 text-right font-hendrix-regular text-gray-900 text-sm">
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
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <span className="font-hendrix-semibold text-gray-400 text-sm">272 vagas disponíveis</span>
            <div className="flex items-center mb-5">
              <span className="font-hendrix-semibold text-blue-600 text-2xl">Atendente Home Office</span>
            </div>

            <div className="flex items-center space-x-10 mb-2 border-y py-3">
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
                style={{ fontSize: '12pt', lineHeight: '5vw' }}
              >
                Plano de saúde, plano odontológico e férias remuneradas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====== FORA DO CONTAINER PRINCIPAL ====== */}

      {/* Alerta de seleção */}
      <div className="bg-gray-900 text-white rounded-lg pl-5 flex items-center gap-2 mt-4">
        <img className="h-7 w-7" src={Alert_Icon_Min} alt="Alerta" />
        <span className="text-sm aviso flex-1">
          Se você sair agora, sua análise será pausada e você pode perder sua vaga.
        </span>
      </div>

      {/* Vídeo explicativo */}
      <div className="mt-6">
        <p className="font-hendrix-medium text-gray-300 text-base mb-8" style={{ fontSize: '13.5pt' }}>
          Enquanto isso, assista a este pequeno vídeo e descubra como é trabalhar com a VagaCerta.
        </p>
        <div className="w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center">
          <span className="font-hendrix-medium text-gray-500">Vídeo institucional</span>
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

      {/* Modal de finalização */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay transparente */}
          <div className="absolute inset-0 bg-gray-900" style={{ opacity: 0.35 }} />
          <div className="relative bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="font-hendrix-bold text-xl text-gray-900 mb-4">Análise concluída com sucesso!</h2>
            <p className="font-hendrix-regular text-gray-700 mb-6">Clique em continuar para ver o resultado.</p>
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
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>
                  Continuar
                </span>
              )}
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmaçãoCurriculo;