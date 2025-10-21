import { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import InfoIconMin from '../../assets/info_icon-min.webp';
import '../../styles/refino.css';

import Header from "../modules/Header";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Icons from "../modules/Icons";
import { IconGridArrow } from "../modules/SvgIcons";
import CardTime from "../modules/CardTime";
import PaymentItauLoadingStep from '../../modules/PaymentItauLoadingStep.jsx';

const TesteRapidoAtendimentoStep = ({ onStart }) => {
  // overlay: 'intro' (mostra ao entrar) | null (sumiu)
  const [overlayPhase, setOverlayPhase] = useState('intro');
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const hasStartedRef = useRef(false);

  const showOverlay = overlayPhase === 'intro';

  const handleOverlayDone = () => {
    // terminou a animação inicial -> libera o conteúdo
    setOverlayPhase(null);
  };

  const handleIniciar = async () => {
    // sobe a tela suavemente para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoadingBtn(true);

    try {
      if (!hasStartedRef.current && typeof onStart === 'function') {
        hasStartedRef.current = true;
        await onStart();
      }
    } catch (error) {
      console.error('Erro ao iniciar teste:', error);
      hasStartedRef.current = false; // permite tentar de novo
    } finally {
      setIsLoadingBtn(false);
    }
  };

  // Mensagens/headlines FIXAS apenas para o overlay inicial
  const messagesByPhase = {
    1: ['Preparando a etapa…', 'Verificando conexão…', 'Carregando recursos…'],
    2: ['Organizando seu perfil…', 'Validando informações…', 'Quase lá…']
  };

  const headline = 'Processo Seletivo';
  const subline = 'Estamos preparando tudo para você iniciar o processo seletivo.';

  return (
    <div className="">
      {/* Overlay só na ENTRADA da tela */}
      {showOverlay && (
        <PaymentItauLoadingStep
          stepIndex={2}
          animateFromPrevious
          autoAdvanceMs={3000}
          onLoadingComplete={handleOverlayDone}
          headline={headline}
          subline={subline}
          rotatingMessages={messagesByPhase}
        />
      )}

      {/* Conteúdo principal só aparece quando overlay sumir */}
      {!showOverlay && (
        <>
          <div className="bloco_principal">
            <Icons Icon={IconGridArrow} size={60} color="#1655ff" />

            <Maintexts>
              <Headlines variant="black">
                Agora precisamos <br />que você faça um<br /> teste prático
              </Headlines>

              <Paragraphs variant="black">
                Para demonstrar suas habilidades, você vai fazer um teste com situações reais de atendimento.
                O desafio é simples: escolher as respostas mais adequadas em cada cenário.
              </Paragraphs>
            </Maintexts>

            <CardTime
              text="O teste leva menos de 5 minutos."
              icon={InfoIconMin}
            />
          </div>

          {/* Botão Iniciar */}
          <div className="pt-4">
            <motion.button
              onClick={handleIniciar}
              disabled={isLoadingBtn}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: isLoadingBtn ? 1 : 1.03 }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${isLoadingBtn ? 'cursor-not-allowed' : ''}`}
              style={{
                background: isLoadingBtn
                  ? 'linear-gradient(135deg, #bdbdbd 0%, #e0e0e0 100%)'
                  : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                fontSize: '11pt',
                boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
                border: 'none',
                opacity: isLoadingBtn ? 0.7 : 1
              }}
            >
              {isLoadingBtn ? (
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
                    Iniciando...
                  </span>
                </>
              ) : (
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>
                  Iniciar
                </span>
              )}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default TesteRapidoAtendimentoStep;