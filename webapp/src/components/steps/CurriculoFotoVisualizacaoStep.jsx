import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import '../../styles/refino.css';

const CurriculoFotoVisualizacaoStep = ({ fotoUrl, onConfirmar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  const handleConfirmar = async () => {
    setIsLoading(true);
    setTipoAcao('confirmar');
    try {
      if (onConfirmar) {
        await onConfirmar();
      }
    } catch (error) {
      console.error('Erro ao confirmar foto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Título da etapa */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-hendrix-medium text-blue-600" style={{ fontSize: '10pt' }}>
            Criando Currículo
          </h2>
          <span className="font-hendrix-regular text-gray-500" style={{ fontSize: '9pt' }}>
            1 de 5
          </span>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="bg-gray-100 rounded-2xl p-6">
        <h1 className="font-hendrix-semibold text-gray-800 mb-6" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Veja como a foto ficou
        </h1>
        
        {/* Área de visualização da foto */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-sm">
            {/* Container da foto com aspecto 4:3 aproximadamente */}
            <div className="w-full h-80 bg-black rounded-2xl overflow-hidden shadow-lg">
              {fotoUrl ? (
                <img 
                  src={fotoUrl} 
                  alt="Foto do currículo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                // Placeholder quando não há foto
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="text-gray-600 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-hendrix-regular text-gray-400">
                      Foto será exibida aqui
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="space-y-4">
        {/* Botão Confirmar */}
        <button
          onClick={handleConfirmar}
          disabled={isLoading && tipoAcao === 'confirmar'}
          className={`
            w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${isLoading && tipoAcao === 'confirmar'
              ? 'bg-gray-800 cursor-not-allowed' 
              : 'bg-gray-900 hover:bg-gray-800 active:bg-gray-700 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'confirmar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Confirmando...</span>
              </>
            ) : (
              <>
                <span>Confirmar</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </div>
        </button>
       
      </div>
    </div>
  );
};

export default CurriculoFotoVisualizacaoStep;
