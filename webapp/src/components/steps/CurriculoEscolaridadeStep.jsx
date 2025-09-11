import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import '../../styles/refino.css';

const CurriculoEscolaridadeStep = ({ onVoltar, onSelecionarEscolaridade }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);
  const [escolaridadeSelecionada, setEscolaridadeSelecionada] = useState('');

  const opcoesEscolaridade = [
    'Ensino Fundamental Incompleto',
    'Ensino Fundamental Completo',
    'Ensino Médio Incompleto',
    'Ensino Médio Completo',
    'Ensino Superior Incompleto',
    'Ensino Superior Completo'
  ];

  // eslint-disable-next-line no-unused-vars
  const handleVoltar = async () => {
    setIsLoading(true);
    setTipoAcao('voltar');
    try {
      if (onVoltar) {
        await onVoltar();
      }
    } catch (error) {
      console.error('Erro ao voltar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelecionarOpcao = async (opcao) => {
    setIsLoading(true);
    setTipoAcao('selecionar');
    setEscolaridadeSelecionada(opcao);

    try {
      if (onSelecionarEscolaridade) {
        await onSelecionarEscolaridade(opcao);
      }
    } catch (error) {
      console.error('Erro ao selecionar escolaridade:', error);
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

      {/* Título principal */}
      <div className="bg-gray-100 rounded-2xl p-6">
        <h1 className="font-hendrix-semibold text-gray-800 mb-6" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Qual é o seu nível de escolaridade?
        </h1>

        {/* Opções de escolaridade */}
        <div className="space-y-3">
          {opcoesEscolaridade.map((opcao, index) => (
            <button
              key={index}
              onClick={() => handleSelecionarOpcao(opcao)}
              disabled={isLoading && tipoAcao === 'selecionar'}
              className={`
                w-full bg-white rounded-xl p-4 border border-gray-200
                font-hendrix-regular text-gray-700 text-left
                transition-all duration-200 ease-out
                ${isLoading && tipoAcao === 'selecionar' && escolaridadeSelecionada === opcao
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'hover:bg-blue-50 hover:border-blue-200 active:bg-blue-100'
                }
                flex items-center justify-between
              `}
              style={{ fontSize: '10pt' }}
            >
              <span>{opcao}</span>
              {isLoading && tipoAcao === 'selecionar' && escolaridadeSelecionada === opcao ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      <p className="font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
        Verifique se os dados estão corretos
      </p>

      {/* Botão Voltar */}
      {/* <div className="flex justify-start">
        <button
          onClick={handleVoltar}
          disabled={isLoading && tipoAcao === 'voltar'}
          className={`
            px-8 py-4 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${isLoading && tipoAcao === 'voltar'
              ? 'bg-gray-800 cursor-not-allowed' 
              : 'bg-gray-900 hover:bg-gray-800 active:bg-gray-700 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'voltar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Voltando...</span>
              </>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </>
            )}
          </div>
        </button>
      </div> */}
    </div>
  );
};

export default CurriculoEscolaridadeStep;
