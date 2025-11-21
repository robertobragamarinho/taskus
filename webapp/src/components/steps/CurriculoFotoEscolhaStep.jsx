import { useState, useEffect } from 'react';
import { ChevronRight, Clock, ChevronUp } from 'lucide-react';
import '../../styles/refino.css';

import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";

// eslint-disable-next-line no-unused-vars
const CurriculoFotoEscolha = ({ enviarFoto, pularEnvioFoto }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const _pularEnvioFoto = () => {
    setIsLoading(true);
    setTipoAcao('pular');
    setTimeout(() => {
      if (typeof pularEnvioFoto === 'function') pularEnvioFoto();
      setIsLoading(false);
      setTipoAcao(null);
    }, 2000);
  };

  const _enviarFoto = () => {
    setIsLoading(true);
    setTipoAcao('enviar');
    setTimeout(() => {
      if (typeof enviarFoto === 'function') enviarFoto();
      setIsLoading(false);
      setTipoAcao(null);
    }, 2000);
  };

  return (
    <div className="bloco_principal space-y-8">
      {/* Cabeçalho padrão */}
      <Maintexts>
        <section id='ETP4T7'/>
        <Headlines variant="black">
          Você gostaria de adicionar uma foto ao seu currículo?
        </Headlines>
        <Paragraphs variant="black">
          A foto é opcional e você pode pular esta etapa agora se preferir.
        </Paragraphs>
      </Maintexts>

      {/* Botões de ação */}
      <div className="space-y-4">
        {/* Botão Pular — secundário (fundo branco, borda azul) */}
        <button
          onClick={_pularEnvioFoto}
          disabled={isLoading && tipoAcao === 'pular'}
          className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${isLoading && tipoAcao === 'pular'
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-blue-50 hover:scale-[1.02] active:scale-95'
            }
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
            {isLoading && tipoAcao === 'pular' ? (
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

        {/* Botão Enviar foto — primário (gradiente azul) */}
        <button
          onClick={_enviarFoto}
          disabled={isLoading && tipoAcao === 'enviar'}
          className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium text-white
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${isLoading && tipoAcao === 'enviar'
              ? 'bg-gradient-to-r from-gray-300 to-gray-400 opacity-70 cursor-not-allowed'
              : 'hover:scale-105 active:scale-95'
            }
          `}
          style={{
            fontSize: '11pt',
            background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
            boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'enviar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">
                  Carregando...
                </span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">
                Sim, eu quero
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoFotoEscolha;