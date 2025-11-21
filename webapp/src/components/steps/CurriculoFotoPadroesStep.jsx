import { useState, useEffect } from 'react';
import { UserCircle2, SunMedium, ScanFace } from 'lucide-react';
import '../../styles/refino.css';

import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import ListTopics from "../modules/ListTopics";

const CurriculoFotoPadroesStep = ({ onEnviarAgora, onPular }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleEnviarAgora = async () => {
    setIsLoading(true);
    setTipoAcao('enviar');
    try {
      // Simular seleção de arquivo de foto
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = e.target.files?.[0];
        if (file && typeof onEnviarAgora === 'function') {
          await onEnviarAgora(file);
        }
        setIsLoading(false);
        setTipoAcao(null);
      };
      input.click();
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
      setIsLoading(false);
      setTipoAcao(null);
    }
  };

  const handlePular = async () => {
    setIsLoading(true);
    setTipoAcao('pular');
    try {
      if (typeof onPular === 'function') {
        // atraso suave apenas para feedback visual
        setTimeout(async () => {
          try {
            await onPular();
          } finally {
            setIsLoading(false);
            setTipoAcao(null);
          }
        }, 800);
      } else {
        setIsLoading(false);
        setTipoAcao(null);
      }
    } catch (error) {
      console.error('Erro ao pular:', error);
      setIsLoading(false);
      setTipoAcao(null);
    }
  };

  const topics = [
    {
      icon: UserCircle2,
      name: 'Rosto centralizado',
      value: 'Mantenha o rosto no centro da imagem.',
      hint:
        'Enquadre dos ombros para cima. Evite cortes na cabeça ou muito espaço acima. Segure o celular na altura dos olhos.',
    },
    {
      icon: SunMedium,
      name: 'Local bem iluminado',
      value: 'Prefira luz natural, sem sombras fortes.',
      hint:
        'Fique de frente para a janela ou uma luz difusa. Evite luz atrás de você (contra-luz) e ambientes muito escuros.',
    },
    {
      icon: ScanFace,
      name: 'Expressão neutra',
      value: 'Sem exageros, aparência natural.',
      hint:
        'Olhe para a câmera, relaxe o rosto e mantenha uma expressão amigável. Evite óculos escuros, bonés e filtros.',
    },
  ];

  const enviarDisabled = isLoading && tipoAcao === 'enviar';
  const pularDisabled = isLoading && tipoAcao === 'pular';

  return (
    <div className="bloco_principal">
      <Maintexts>
        <section id='ETP4T8'/>
        <Headlines variant="black">
          Siga estes padrões para enviar a sua foto
        </Headlines>
        <Paragraphs variant="black">
          A foto é opcional, mas ajuda na identificação. Se preferir, você pode pular esta etapa agora e adicionar depois.
        </Paragraphs>
      </Maintexts>

      {/* Lista de tópicos com descrição + drawer */}
      <div className="gap-3 flex  rounded-2xl  ">
        <ListTopics topics={topics} withDescription enableDrawer={false} />
      </div>

      {/* Botões de ação */}
      <div className="space-y-4">
        {/* Enviar agora — primário (gradiente azul) */}
        <button
          onClick={handleEnviarAgora}
          disabled={enviarDisabled}
          className={`
            w-full px-6 py-4  rounded-full font-hendrix-medium text-white
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${enviarDisabled
              ? 'bg-gradient-to-r from-gray-300  to-gray-400 opacity-70 cursor-not-allowed'
              : 'hover:scale-105 active:scale-95'}
          `}
          style={{
            fontSize: '11pt',
            background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
            boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {enviarDisabled ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">
                  Enviando...
                </span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">
                Enviar Foto
              </span>
            )}
          </div>
        </button>

        {/* Pular — secundário (fundo branco, borda azul) */}
        <button
          onClick={handlePular}
          disabled={pularDisabled}
          className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${pularDisabled
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-blue-50 hover:scale-[1.02] active:scale-95'}
          `}
          style={{
            fontSize: '11pt',
            background: '#ffffff',
            color: '#000000',
            border: '1px solid #1655ff',
            boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {pularDisabled ? (
              <>
                <div className="w-4 h-4 border-2 border-[#1655ff] border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">
                  Pulando...
                </span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">
                Pular
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoFotoPadroesStep;