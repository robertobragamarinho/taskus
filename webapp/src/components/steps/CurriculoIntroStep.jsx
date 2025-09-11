import { useState } from 'react';
import { ChevronRight, Clock, ChevronUp } from 'lucide-react';
import InfoIconMin from '../../assets/info_icon-min.webp';
import '../../styles/refino.css';

const CurriculoIntroStep = ({ onEnviarArquivo, onCriarCurriculo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  const handleEnviarArquivo = async () => {
    setIsLoading(true);
    setTipoAcao('enviar');
    try {
      // Simular seleção de arquivo
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
        await onCriarCurriculo();
      }
    } catch (error) {
      console.error('Erro ao criar currículo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Título principal */}
      <div className="pt-6">
        <h1 className="titulodaetapa font-hendrix-semibold text-gray-800" style={{ fontSize: '16pt'}}>
          Envie seu currículo para continuar com a  entrevista.
        </h1>
      </div>

      {/* Descrição */}
      <div className="space-y-4">
        <p className="subtitulodaetapa font-hendrix-regular text-gray-600" style={{ fontSize: '10pt'}}>
          Caso ainda não tenha, podemos te ajudar a criar um. Escolha a opção que faz mais sentido para você.
        </p>
      </div>

      {/* Aviso de tempo */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img 
              className='h-6'
              src={InfoIconMin}
            />
          </div>
          <div className="flex-1">
            <p className="font-hendrix-medium text-yellow-800" style={{ fontSize: '9pt' }}>
              Criar o currículo leva menos de 5 minutos.
            </p>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="space-y-4">
        {/* Botão Enviar Arquivo */}
        <button
          onClick={handleEnviarArquivo}
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
                <span>Processando...</span>
              </>
            ) : (
              <>
                <span>Enviar do meu celular (PDF, DOC ou Imagem)</span>
                <ChevronUp className="w-4 h-4" />
              </>
            )}
          </div>
        </button>

        {/* Botão Criar Currículo */}
        <button
          onClick={handleCriarCurriculo}
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
                <span>Iniciando...</span>
              </>
            ) : (
              <>
                <span>Criar meu currículo agora</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoIntroStep;
