/* eslint-disable no-unused-vars */



import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import '../../styles/refino.css';
import { useProcess } from '@/hooks/useProcess.js';

const CurriculoLocalizacaoStep = ({ onContinuar }) => {
  const { updateUserData } = useProcess();
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [falhaEstados, setFalhaEstados] = useState(false);
  const [estadoInput, setEstadoInput] = useState('');
  const [cidadeInput, setCidadeInput] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const estadoInputRef = useRef(null);
  const cidadeInputRef = useRef(null);

  // Carregar estados na inicialização
  useEffect(() => {
    const carregarEstados = async () => {
      try {
        setLoadingEstados(true);
        setFalhaEstados(false);
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        if (!response.ok) throw new Error('Falha na resposta da API');
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        setFalhaEstados(true);
        console.error('Erro ao carregar estados:', error);
      } finally {
        setLoadingEstados(false);
      }
    };
    carregarEstados();
  }, []);

  // Carregar municípios quando o estado for selecionado
  const carregarMunicipios = async (estadoId) => {
    try {
      setLoadingMunicipios(true);
      setMunicipios([]);
      setCidadeInput('');
      setCidadeSelecionada(null);
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/distritos`);
      const data = await response.json();
      // Extrair municípios únicos pelo nome
      const municipiosUnicos = [];
      const nomesVistos = new Set();
      data.forEach(distrito => {
        const nomeMunicipio = distrito.municipio.nome;
        if (!nomesVistos.has(nomeMunicipio)) {
          nomesVistos.add(nomeMunicipio);
          municipiosUnicos.push({
            id: distrito.municipio.id,
            nome: nomeMunicipio
          });
        }
      });
      municipiosUnicos.sort((a, b) => a.nome.localeCompare(b.nome));
      setMunicipios(municipiosUnicos);
    } catch (error) {
      console.error('Erro ao carregar municípios:', error);
    } finally {
      setLoadingMunicipios(false);
    }
  };


  // Filtro de estados/cidades conforme digitação
  const estadosFiltrados = estadoInput.length === 0
    ? estados
    : estados.filter(e => e.nome.toLowerCase().includes(estadoInput.toLowerCase()));
  const cidadesFiltradas = cidadeInput.length === 0
    ? municipios
    : municipios.filter(m => m.nome.toLowerCase().includes(cidadeInput.toLowerCase()));

  // Seleção de estado
  const handleEstadoInput = (e) => {
    setEstadoInput(e.target.value);
    setEstadoSelecionado(null);
    setCidadeInput('');
    setCidadeSelecionada(null);
    setMunicipios([]);
    // Se digitação bater exatamente com um estado, seleciona
    const match = estados.find(est => est.nome.toLowerCase() === e.target.value.toLowerCase());
    if (match) {
      setEstadoSelecionado(match);
      carregarMunicipios(match.id);
    }
  };
  const handleEstadoSelect = (estado) => {
    setEstadoInput(estado.nome);
    setEstadoSelecionado(estado);
    setCidadeInput('');
    setCidadeSelecionada(null);
    carregarMunicipios(estado.id);
    if (cidadeInputRef.current) cidadeInputRef.current.focus();
  };

  // Seleção de cidade
  const handleCidadeInput = (e) => {
    setCidadeInput(e.target.value);
    setCidadeSelecionada(null);
    // Se digitação bater exatamente com uma cidade, seleciona
    const match = municipios.find(mun => mun.nome.toLowerCase() === e.target.value.toLowerCase());
    if (match) setCidadeSelecionada(match);
  };
  const handleCidadeSelect = (cidade) => {
    setCidadeInput(cidade.nome);
    setCidadeSelecionada(cidade);
  };


  const handleContinuar = async () => {
    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      // Salvar no contexto userData.endereco
      if (estadoSelecionado && cidadeSelecionada) {
        await updateUserData({
          endereco: {
            Estado: estadoSelecionado.nome,
            Cidade: cidadeSelecionada.nome
          }
        });
      }
      if (onContinuar) {
        await onContinuar({
          estado: estadoSelecionado ? estadoSelecionado.nome : '',
          cidade: cidadeSelecionada ? cidadeSelecionada.nome : ''
        });
      }
    } catch (error) {
      console.error('Erro ao continuar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = !!(estadoSelecionado && cidadeSelecionada);

  return (
    <div className="space-y-8">

      {/* Título principal */}
      <div className="bg-gray-100 mt-10 rounded-2xl p-6">
        <h1 className="titulodaetapa font-hendrix-semibold text-gray-800 mb-6" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Em qual estado e cidade você reside atualmente?
        </h1>

        {/* Formulário */}
        <div className="space-y-4">
          {/* Campo Estado */}
          <div className="space-y-2">
            <label className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt' }}>
              Estado
            </label>
            <div className="relative">
              <input
                ref={estadoInputRef}
                value={estadoInput}
                onChange={handleEstadoInput}
                className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-900 pr-12"
                style={{ fontSize: '12pt' }}
                placeholder={loadingEstados ? 'Carregando estados...' : 'Digite seu estado'}
                autoComplete="off"
                disabled={loadingEstados}
              />
              {/* Lista de sugestões */}
              {estadoInput && estadosFiltrados.length > 0 && !estadoSelecionado && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                  {estadosFiltrados.map((estado) => (
                    <div
                      key={estado.id}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-900"
                      onClick={() => handleEstadoSelect(estado)}
                    >
                      {estado.nome}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Campo Cidade */}
          <div className="space-y-2">
            <label className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt' }}>
              Cidade
            </label>
            <div className="relative">
              <input
                ref={cidadeInputRef}
                value={cidadeInput}
                onChange={handleCidadeInput}
                className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-900 pr-12"
                style={{ fontSize: '12pt' }}
                placeholder={
                  !estadoSelecionado
                    ? 'Selecione um estado primeiro'
                    : loadingMunicipios
                      ? 'Carregando municípios...'
                      : 'Digite para buscar o município'
                }
                autoComplete="off"
                disabled={!estadoSelecionado || loadingMunicipios}
              />
              {/* Lista de sugestões */}
              {cidadeInput && cidadesFiltradas.length > 0 && !cidadeSelecionada && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                  {cidadesFiltradas.map((cidade) => (
                    <div
                      key={cidade.id}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-900"
                      onClick={() => handleCidadeSelect(cidade)}
                    >
                      {cidade.nome}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      

      {/* Botões de ação */}
      <div className="flex space-x-4">
        {/* Botão Voltar */}
        {/* ...existing code... */}

        {/* Botão Continuar */}
        <button
          onClick={handleContinuar}
          disabled={isLoading && tipoAcao === 'continuar' || !isFormValid}
          className={`
            flex-1 py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${(isLoading && tipoAcao === 'continuar') || !isFormValid
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

export default CurriculoLocalizacaoStep;
