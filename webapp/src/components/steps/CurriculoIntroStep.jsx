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
    <div className="">
      {/* Título principal */}
      <div className="pt-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#1655ff"><g fill="none" stroke="#1655ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M4 3H3a1 1 0 0 0-1 1v14l1.5 3L5 18V4a1 1 0 0 0-1-1m17 9.001v-4c0-2.358 0-3.536-.732-4.269C19.535 3 18.357 3 16 3h-3c-2.357 0-3.536 0-4.268.732C8 4.465 8 5.643 8 8.001v8c0 2.358 0 3.537.732 4.27c.62.62 1.561.714 3.268.729m0-14h5m-5 4h5"/><path d="M14 19s1.5.5 2.5 2c0 0 1.5-4 5.5-6M2 7h3"/></g></svg>
        <h1 className="tituloquest font-hendrix-semibold text-gray-800" style={{ fontSize: '16pt'}}>
          Precisamos ter um <br />currículo vinculado ao processo seletivo 
        </h1>
      </div>

      {/* Descrição */}
      <div className="">
        <p className="subtituloquest font-hendrix-regular text-gray-600" style={{ fontSize: '10pt'}}>
          Vamos criar um em 6 etapas rápidas, após isso, a equipe de RH irá finalizar a análise da sua entrevista e você saberá se será contratado (a).
        </p>
      </div>

      {/* Aviso de tempo */}
      <div className="bg-yellow-50 mb-10 border border-yellow-200 rounded-xl p-4">
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
          `}
          style={{ fontSize: '11pt' }}
        >
         
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
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoIntroStep;
