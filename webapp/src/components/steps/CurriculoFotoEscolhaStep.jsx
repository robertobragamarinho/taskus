import { useState } from 'react';
import { ChevronRight, Clock, ChevronUp } from 'lucide-react';
import '../../styles/refino.css';

// eslint-disable-next-line no-unused-vars
const CurriculoFotoEscolha = ({ enviarFoto, pularEnvioFoto }) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tipoAcao, setTipoAcao] = useState(null);


const _pularEnvioFoto = () => {
    setIsLoading(true);
    setTipoAcao('enviar');
    setTimeout(() => {
        pularEnvioFoto();
        setIsLoading(false);
        setTipoAcao(null);
    }, 2000);
};

  const _enviarFoto = () => {
    setTimeout(() => {
        enviarFoto();
    }, 2000)
  };

  return (
    <div className="space-y-8 ">
      {/* Título principal */}
      <div className="pt-6">
        <h1 className="font-hendrix-semibold text-gray-800" style={{ fontSize: '16pt', lineHeight: '1.3' }}>
          Você gostaria de adicionar uma foto ao seu curriculo? (Opcional)
        </h1>
      </div>

      {/* Botões de ação */}
      <div className="space-y-4">
        {/* Botão PULAR*/}
        <button
          onClick={_pularEnvioFoto}
          disabled={isLoading && tipoAcao === 'enviar'}
          className={`
            w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${isLoading && tipoAcao === 'enviar'
              ? 'bg-gray-800 cursor-not-allowed' 
              : 'bg-gray-900 hover:bg-gray-800 active:bg-gray-700 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'enviar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Pulando...</span>
              </>
            ) : (
              <>
                <span>Pular</span>
                <ChevronUp className="w-4 h-4" />
              </>
            )}
          </div>
        </button>

        {/* Botão Enviar foto */}
        <button
          onClick={_enviarFoto}
          disabled={isLoading && tipoAcao === 'criar'}
          className={`
            w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${isLoading && tipoAcao === 'criar'
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'criar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Carregando...</span>
              </>
            ) : (
              <>
                <span>Sim, eu quero</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoFotoEscolha;
