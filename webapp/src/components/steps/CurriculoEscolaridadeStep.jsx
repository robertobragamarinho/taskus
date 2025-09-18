import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import '../../styles/refino.css';

const CurriculoEscolaridadeStep = ({ onSelecionarEscolaridade }) => {
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



  // Agora apenas seleciona a opção, não avança
  const handleSelecionarOpcao = (opcao) => {
    setEscolaridadeSelecionada(opcao);
  };

  // Novo handler para o botão Continuar
  const handleContinuar = async () => {
    if (!escolaridadeSelecionada) return;
    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      if (onSelecionarEscolaridade) {
        await onSelecionarEscolaridade(escolaridadeSelecionada);
      }
    } catch (error) {
      console.error('Erro ao avançar escolaridade:', error);
    } finally {
      setIsLoading(false);
      setTipoAcao(null);
    }
  };

  return (
    <div className="space-y-8">


      {/* Título principal */}
      <div className="bg-gray-100 rounded-2xl p-6">
        <h1 className="font-hendrix-semibold text-gray-800 mb-6" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Qual é o seu nível de escolaridade?
        </h1>

        {/* Opções de escolaridade */}
        <div className="space-y-3">
          {opcoesEscolaridade.map((opcao) => (
            <button
              key={opcao}
              type="button"
              onClick={() => handleSelecionarOpcao(opcao)}
              className={`w-full py-4 px-6 rounded-2xl font-hendrix-regular text-gray-800 border-2 transition-all duration-200 text-center flex items-center justify-center
                ${escolaridadeSelecionada === opcao
                  ? 'border-blue-600 bg-blue-50 font-hendrix-semibold'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'}
                ${isLoading ? 'cursor-not-allowed opacity-70' : ''}
              `}
              style={{ fontSize: '11pt' }}
              disabled={isLoading}
            >
              {opcao}
            </button>
          ))}
        </div>
      </div>


      <p className="font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
        Verifique se os dados estão corretos
      </p>

      {/* Botão Continuar estilizado igual ao CurriculoCriacaoStep */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleContinuar}
          disabled={!escolaridadeSelecionada || isLoading}
          className={`
            w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${!escolaridadeSelecionada || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'}
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'continuar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <span>Continuar</span>
              </>
            )}
          </div>
        </button>
      </div>

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
