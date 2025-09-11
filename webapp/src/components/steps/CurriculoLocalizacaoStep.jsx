import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import '../../styles/refino.css';

const CurriculoLocalizacaoStep = ({ onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [falhaEstados, setFalhaEstados] = useState(false);
  const [formData, setFormData] = useState({
    estado: {
      id: '',
      nome: '',
      sigla: ''
    },
    municipio: {
      id: '',
      nome: ''
    }
  });

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
        console.log('Estados carregados:', data);
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
      setFormData(prev => ({
        ...prev,
        municipio: { id: '', nome: '' }
      }));

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

      // Ordenar por nome
      municipiosUnicos.sort((a, b) => a.nome.localeCompare(b.nome));

      setMunicipios(municipiosUnicos);
      console.log('Municípios carregados:', municipiosUnicos);
    } catch (error) {
      console.error('Erro ao carregar municípios:', error);
    } finally {
      setLoadingMunicipios(false);
    }
  };

  const handleEstadoChange = (e) => {
    if (falhaEstados) {
      setFormData(prev => ({
        ...prev,
        estado: { id: '', nome: e.target.value, sigla: '' },
        municipio: { id: '', nome: '' }
      }));
      setMunicipios([]);
      return;
    }
    const estadoId = e.target.value;
    if (estadoId) {
      const estadoSelecionado = estados.find(estado => estado.id.toString() === estadoId);
      setFormData(prev => ({
        ...prev,
        estado: {
          id: estadoSelecionado.id,
          nome: estadoSelecionado.nome,
          sigla: estadoSelecionado.sigla
        },
        municipio: { id: '', nome: '' }
      }));
      carregarMunicipios(estadoId);
    } else {
      setFormData(prev => ({
        ...prev,
        estado: { id: '', nome: '', sigla: '' },
        municipio: { id: '', nome: '' }
      }));
      setMunicipios([]);
    }
  };

  const handleMunicipioChange = (e) => {
    if (falhaEstados) {
      setFormData(prev => ({
        ...prev,
        municipio: { id: '', nome: e.target.value }
      }));
      return;
    }
    const municipioId = e.target.value;
    if (municipioId) {
      const municipioSelecionado = municipios.find(municipio => municipio.id.toString() === municipioId);
      setFormData(prev => ({
        ...prev,
        municipio: {
          id: municipioSelecionado.id,
          nome: municipioSelecionado.nome
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        municipio: { id: '', nome: '' }
      }));
    }
  };

  const handleContinuar = async () => {
    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      if (onContinuar) {
        // Enviar dados completos com IDs e nomes
        const dadosLocalizacao = {
          estado: formData.estado,
          municipio: formData.municipio
        };
        console.log('Dados de localização a serem salvos:', dadosLocalizacao);
        await onContinuar(dadosLocalizacao);
      }
    } catch (error) {
      console.error('Erro ao continuar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = falhaEstados
    ? formData.estado.nome.trim() && formData.municipio.nome.trim()
    : formData.estado.id && formData.municipio.id;

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
              {falhaEstados ? (
                <input
                  value={formData.estado.nome}
                  onChange={handleEstadoChange}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-900 pr-12"
                  style={{ fontSize: '10pt' }}
                  placeholder="Digite o nome do estado"
                  required
                />
              ) : (
                <>
                  <select
                    value={formData.estado.id}
                    onChange={handleEstadoChange}
                    className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-500 appearance-none pr-12"
                    style={{ fontSize: '10pt' }}
                    disabled={loadingEstados}
                  >
                    <option value="">
                      {loadingEstados ? 'Carregando estados...' : 'Toque para selecionar'}
                    </option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nome}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </>
              )}
            </div>
          </div>

          {/* Campo Cidade */}
          <div className="space-y-2">
            <label className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt' }}>
              Município
            </label>
            <div className="relative">
              {falhaEstados ? (
                <input
                  value={formData.municipio.nome}
                  onChange={handleMunicipioChange}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-900 pr-12"
                  style={{ fontSize: '10pt' }}
                  placeholder="Digite o nome do município"
                  required
                />
              ) : (
                <>
                  <select
                    value={formData.municipio.id}
                    onChange={handleMunicipioChange}
                    className="w-full bg-white rounded-xl p-4 border border-gray-200 font-hendrix-regular text-gray-500 appearance-none pr-12"
                    style={{ fontSize: '10pt' }}
                    disabled={!formData.estado.id || loadingMunicipios}
                  >
                    <option value="">
                      {!formData.estado.id
                        ? 'Selecione um estado primeiro'
                        : loadingMunicipios
                          ? 'Carregando municípios...'
                          : 'Toque para selecionar'
                      }
                    </option>
                    {municipios.map((municipio) => (
                      <option key={municipio.id} value={municipio.id}>
                        {municipio.nome}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
        Verifique se os dados estão corretos
      </p>

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
            ${isLoading && tipoAcao === 'continuar' || !isFormValid
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

export default CurriculoLocalizacaoStep;
