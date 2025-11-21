import { useState } from 'react';
import { ChevronRight, Clock, ChevronUp } from 'lucide-react';
import InfoIconMin from '../../assets/info_icon-min.webp';
import '../../styles/refino.css';

import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import LoadingBar from "../modules/LoadingBar";
import Continuity from "../modules/Continuity";
import Icons from "../modules/Icons";
import { IconMessage } from "../modules/SvgIcons";
import CardTime from "../modules/CardTime";
import PaymentItauLoadingStep from '../../modules/PaymentItauLoadingStep.jsx';

const CurriculoIntroStep = ({ onEnviarArquivo, onCriarCurriculo }) => {
  // ⬇️ Mostra o overlay ao entrar na tela
  // 'intro' -> mostra overlay; null -> esconde overlay
  const [overlayPhase, setOverlayPhase] = useState('intro');
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  const showOverlay = overlayPhase === 'intro';

  const handleOverlayDone = async () => {
    // terminou a animação inicial -> libera o conteúdo
    setOverlayPhase(null);
  };

  const handleEnviarArquivo = async () => {
    setIsLoading(true);
    setTipoAcao('enviar');
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.doc,.docx,image/*';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file && onEnviarArquivo) {
          await onEnviarArquivo(file);
        }
        setIsLoading(false);
      };
      input.click();
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      setIsLoading(false);
    }
  };

  const handleCriarCurriculo = async () => {
    setIsLoading(true);
    setTipoAcao('criar');
    try {
      if (onCriarCurriculo) {
        // Aguarda 1s para mostrar o spinner antes de avançar
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await onCriarCurriculo();
      }
    } catch (error) {
      console.error('Erro ao criar currículo:', error);
      setIsLoading(false);
    }
    // O setIsLoading(false) será chamado na próxima tela, não aqui
  };

  // Mensagens/headlines do overlay inicial (step 3)
  const messagesByPhase = {
    2: ['Sincronizando dados…', 'Registrando Informações…', 'Liberando Candidato'],
    3: ['Redirecionando…', 'Quase lá...', 'Liberando formulário…']
  };
  const headline = 'Processo Seletivo';
  const subline = 'Estamos preparando as próximas etapas para você preencher.';

  return (
    <div className="bloco_principal">
      {/* Overlay ao abrir a tela (stepIndex=3) */}
      {showOverlay && (
        <PaymentItauLoadingStep
          stepIndex={3}
          animateFromPrevious
          autoAdvanceMs={3000}
          onLoadingComplete={handleOverlayDone}
          headline={headline}
          subline={subline}
          rotatingMessages={messagesByPhase}
        />
      )}

      {/* Conteúdo principal aparece quando overlay sumir */}
      {!showOverlay && (
        <>
          <Icons Icon={IconMessage} size={60} color="#1655ff" />

          <Maintexts>
            <section id='ETP4T1'/>
            <Headlines variant="black">
              Agora, precisamos<br/> criar seu currículo para<br/> continuar o processo<br/> seletivo.
            </Headlines>

            <Paragraphs variant="black">
              São 6 etapas simples. Assim que<br/> terminar, o RH vai avaliar suas<br/> informações para confirmar se você<br/> pode ser contratado(a).
            </Paragraphs>
          </Maintexts>

          <CardTime text="Última etapa antes da análise." icon={InfoIconMin} />

          <div className="">
            {/* Se quiser reativar o botão de enviar arquivo, descomente o bloco abaixo */}
            {/*
            <button
              onClick={handleEnviarArquivo}
              disabled={isLoading && tipoAcao === 'enviar'}
              className={`
                w-full mt-3 px-6 py-4 rounded-full font-hendrix-medium text-[#1655ff] border border-[#1655ff]
                transition-all duration-300
                ${isLoading && tipoAcao === 'enviar' ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
              `}
              style={{ fontSize: '11pt' }}
            >
              {isLoading && tipoAcao === 'enviar' ? 'Enviando…' : 'Enviar meu currículo (PDF/Word)'}
            </button>
            */}

            <button
              onClick={handleCriarCurriculo}
              disabled={isLoading && tipoAcao === 'criar'}
              className={`
                w-full mt-4 px-6 py-4 rounded-full font-hendrix-medium text-white 
                shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 
                transition-all duration-300
                ${isLoading && tipoAcao === 'criar'
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400 opacity-70 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#1655ff] to-[#4285f4] hover:scale-105 active:scale-95'
                }
              `}
              style={{ fontSize: '11pt', boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)' }}
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading && tipoAcao === 'criar' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="font-hendrix-medium tracking-wide text-[11pt]">Aguarde…</span>
                  </>
                ) : (
                  <span className="font-hendrix-medium tracking-wide text-[12pt]">
                    Criar meu currículo agora
                  </span>
                )}
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CurriculoIntroStep;