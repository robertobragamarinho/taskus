import { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown, Plus } from 'lucide-react';
import '../../styles/refino.css';

const CurriculoExperienciaStep = ({ onVoltar, onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);
  const [experiencias, setExperiencias] = useState([{
    nomeEmpresa: '',
    funcao: '',
    inicio: '',
    fim: ''
  }]);

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

  const handleContinuar = async () => {
    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      if (onContinuar) {
        await onContinuar(experiencias);
      }
    } catch (error) {
      console.error('Erro ao continuar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdicionarOutro = () => {
    setExperiencias(prev => [...prev, {
      nomeEmpresa: '',
      funcao: '',
      inicio: '',
      fim: ''
    }]);
  };

  const updateExperiencia = (index, field, value) => {
    setExperiencias(prev => prev.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    ));
  };



  return (
    <div className="space-y-8">


      {/* Título principal */}
      <div className="bg-gray-100 rounded-2xl p-6">
        <h1 className="font-hendrix-semibold text-gray-800 mb-6" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Se sim, adicione as informações das ultimas empresas que você trabalhou.
        </h1>

        {/* Formulários de experiência */}
        <div className="space-y-6">
          {experiencias.map((experiencia, index) => (
            <div key={index} className="space-y-4">
              {/* Nome da Empresa */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Nome da Empresa"
                  value={experiencia.nomeEmpresa}
                  onChange={(e) => updateExperiencia(index, 'nomeEmpresa', e.target.value)}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-700 placeholder-gray-400"
                  style={{ fontSize: '10pt' }}
                />
              </div>

              {/* O que você fazia */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="O que você fazia?"
                  value={experiencia.funcao}
                  onChange={(e) => updateExperiencia(index, 'funcao', e.target.value)}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-700 placeholder-gray-400"
                  style={{ fontSize: '10pt' }}
                />
              </div>

              {/* Início */}
              <div className="space-y-2">
                <label className="font-hendrix-medium text-gray-700" style={{ fontSize: '9pt' }}>
                  Início
                </label>
                <input
                  type="date"
                  value={experiencia.inicio}
                  onChange={(e) => updateExperiencia(index, 'inicio', e.target.value)}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-700 placeholder-gray-400"
                  style={{ fontSize: '10pt' }}
                  placeholder="DD/MM/AAAA"
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </div>

              {/* Fim */}
              <div className="space-y-2">
                <label className="font-hendrix-medium text-gray-700" style={{ fontSize: '9pt' }}>
                  Fim
                </label>
                <input
                  type="date"
                  value={experiencia.fim}
                  onChange={(e) => updateExperiencia(index, 'fim', e.target.value)}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-700 placeholder-gray-400"
                  style={{ fontSize: '10pt' }}
                  placeholder="DD/MM/AAAA"
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </div>

              {/* Separador entre experiências (só mostra se não for a última) */}
              {index < experiencias.length - 1 && (
                <div className="border-t border-gray-200 pt-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* Botão Adicionar Outro */}
        <div className="mt-6">
          <button
            onClick={handleAdicionarOutro}
            className="w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 ease-out"
            style={{ fontSize: '11pt' }}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Adicionar Outra</span>
              <Plus className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      <p className="font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
        Verifique se os dados estão corretos
      </p>

      {/* Botões de ação */}
      <div className="flex space-x-4">
        {/* Botão Voltar */}
        {/* <button
          onClick={handleVoltar}
          disabled={isLoading && tipoAcao === 'voltar'}
          className={`
            flex-1 py-4 px-6 rounded-2xl font-hendrix-semibold text-white
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
        </button> */}

        {/* Botão Continuar */}
        <button
          onClick={handleContinuar}
          disabled={isLoading && tipoAcao === 'continuar'}
          className={`
            flex-1 py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${isLoading && tipoAcao === 'continuar'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'continuar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Continuando...</span>
              </>
            ) : (
              <>
                <span>Continuar</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoExperienciaStep;
