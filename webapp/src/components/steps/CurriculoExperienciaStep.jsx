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
                <div className="relative">
                  <select
                    value={experiencia.inicio}
                    onChange={(e) => updateExperiencia(index, 'inicio', e.target.value)}
                    className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-500 appearance-none pr-12"
                    style={{ fontSize: '10pt' }}
                  >
                    <option value="">Toque para selecionar</option>
                    <option value="Janeiro 2024">Janeiro 2024</option>
                    <option value="Fevereiro 2024">Fevereiro 2024</option>
                    <option value="Março 2024">Março 2024</option>
                    <option value="Abril 2024">Abril 2024</option>
                    <option value="Maio 2024">Maio 2024</option>
                    <option value="Junho 2024">Junho 2024</option>
                    <option value="Julho 2024">Julho 2024</option>
                    <option value="Agosto 2024">Agosto 2024</option>
                    <option value="Setembro 2024">Setembro 2024</option>
                    <option value="Outubro 2024">Outubro 2024</option>
                    <option value="Novembro 2024">Novembro 2024</option>
                    <option value="Dezembro 2024">Dezembro 2024</option>
                    <option value="Janeiro 2023">Janeiro 2023</option>
                    <option value="Fevereiro 2023">Fevereiro 2023</option>
                    <option value="Março 2023">Março 2023</option>
                    <option value="Abril 2023">Abril 2023</option>
                    <option value="Maio 2023">Maio 2023</option>
                    <option value="Junho 2023">Junho 2023</option>
                    <option value="Julho 2023">Julho 2023</option>
                    <option value="Agosto 2023">Agosto 2023</option>
                    <option value="Setembro 2023">Setembro 2023</option>
                    <option value="Outubro 2023">Outubro 2023</option>
                    <option value="Novembro 2023">Novembro 2023</option>
                    <option value="Dezembro 2023">Dezembro 2023</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <label className="absolute -top-2 left-4 bg-gray-100 px-2 font-hendrix-medium text-gray-700" style={{ fontSize: '9pt' }}>
                    Início
                  </label>
                </div>
              </div>

              {/* Fim */}
              <div className="space-y-2">
                <div className="relative">
                  <select
                    value={experiencia.fim}
                    onChange={(e) => updateExperiencia(index, 'fim', e.target.value)}
                    className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-500 appearance-none pr-12"
                    style={{ fontSize: '10pt' }}
                  >
                    <option value="">Toque para selecionar</option>
                    <option value="Janeiro 2025">Janeiro 2025</option>
                    <option value="Fevereiro 2025">Fevereiro 2025</option>
                    <option value="Março 2025">Março 2025</option>
                    <option value="Abril 2025">Abril 2025</option>
                    <option value="Maio 2025">Maio 2025</option>
                    <option value="Junho 2025">Junho 2025</option>
                    <option value="Julho 2025">Julho 2025</option>
                    <option value="Agosto 2025">Agosto 2025</option>
                    <option value="Setembro 2025">Setembro 2025</option>
                    <option value="Outubro 2025">Outubro 2025</option>
                    <option value="Novembro 2025">Novembro 2025</option>
                    <option value="Dezembro 2025">Dezembro 2025</option>
                    <option value="Atual">Atual</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <label className="absolute -top-2 left-4 bg-gray-100 px-2 font-hendrix-medium text-gray-700" style={{ fontSize: '9pt' }}>
                    Fim
                  </label>
                </div>
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
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoExperienciaStep;
