import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import '../../styles/refino.css';

const CurriculoFotoPadroesStep = ({ onEnviarAgora, onPular }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  const handleEnviarAgora = async () => {
    setIsLoading(true);
    setTipoAcao('enviar');
    try {
      // Simular seleção de arquivo de foto
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file && onEnviarAgora) {
          await onEnviarAgora(file);
        }
        setIsLoading(false);
      };
      input.click();
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
      setIsLoading(false);
    }
  };

  const handlePular = async () => {
    try {
      if (onPular) {
        setIsLoading(true);
        setTipoAcao('pular');
        setTimeout(async () => {
          try {
            await onPular();
          } catch (error) {
            console.error('Erro ao pular:', error);
          } finally {
            setIsLoading(false);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao pular:', error);
    }
  };

  return (
    <div className="space-y-8">
      

      {/* Conteúdo principal */}
      <div className="bg-gray-100 rounded-2xl p-6">
        <h1 className="font-hendrix-semibold text-gray-800 mb-6" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Siga estes padrões para a enviar a sua foto
        </h1>

        {/* Imagem de exemplo */}
        <div className="flex justify-center items-center">
          <div className=" rounded-3xl shadow-md p-10 w-full max-w-md">
            <ul className="space-y-6 mb-2">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <div>
                  <span className="font-hendrix-semibold text-gray-900">Rosto centralizado</span>
                  <div className="text-gray-400 font-hendrix-regular text-sm">Seu rosto deve estar no centro da imagem.</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <div>
                  <span className="font-hendrix-semibold text-gray-900">Local bem iluminado</span>
                  <div className="text-gray-400 font-hendrix-regular text-sm">Tire a foto perto de uma janela, sem sombras fortes</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <div>
                  <span className="font-hendrix-semibold text-gray-900">Expressão neutra</span>
                  <div className="text-gray-400 font-hendrix-regular text-sm">Mantenha o semblante natural, sem sorrisos exagerados.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="space-y-4">
        {/* Botão Enviar agora */}
        <button
          onClick={handleEnviarAgora}
          disabled={isLoading && tipoAcao === 'enviar'}
          className={`
            w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            flex justify-center items-center
            ${isLoading && tipoAcao === 'enviar'
              ? 'bg-gray-800 cursor-not-allowed'
              : 'bg-gray-900 hover:bg-gray-800 active:bg-gray-700 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2 w-full">
            {isLoading && tipoAcao === 'enviar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Enviar agora</span>
              </>
            )}
          </div>
        </button>

        {/* Botão Pular */}
        <button
          onClick={handlePular}
          disabled={isLoading && tipoAcao === 'pular'}
          className={`
            w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            flex justify-center items-center
            ${isLoading && tipoAcao === 'pular'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2 w-full">
            {isLoading && tipoAcao === 'pular' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Pulando...</span>
              </>
            ) : (
              <>
                <span>Pular</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoFotoPadroesStep;
