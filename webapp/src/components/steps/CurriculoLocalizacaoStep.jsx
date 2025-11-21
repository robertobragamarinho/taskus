/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import '../../styles/refino.css';
import { useProcess } from '@/hooks/useProcess.js';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Imputs from "../modules/Imputs"; // ⬅️ import do componente reutilizável

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

  // Scroll para o topo ao montar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Carregar estados na inicialização
  useEffect(() => {
    const carregarEstados = async () => {
      try {
        setLoadingEstados(true);
        setFalhaEstados(false);
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        );
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

  // Carregar municípios
  const carregarMunicipios = async (estadoId) => {
    try {
      setLoadingMunicipios(true);
      setMunicipios([]);
      setCidadeInput('');
      setCidadeSelecionada(null);
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/distritos`
      );
      const data = await response.json();

      const municipiosUnicos = [];
      const nomesVistos = new Set();
      data.forEach((distrito) => {
        const nomeMunicipio = distrito.municipio.nome;
        if (!nomesVistos.has(nomeMunicipio)) {
          nomesVistos.add(nomeMunicipio);
          municipiosUnicos.push({
            id: distrito.municipio.id,
            nome: nomeMunicipio,
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

  // Filtro
  const estadosFiltrados =
    estadoInput.length === 0
      ? estados
      : estados.filter((e) =>
          e.nome.toLowerCase().includes(estadoInput.toLowerCase())
        );

  const cidadesFiltradas =
    cidadeInput.length === 0
      ? municipios
      : municipios.filter((m) =>
          m.nome.toLowerCase().includes(cidadeInput.toLowerCase())
        );

  // Seleção
  const handleEstadoInput = (e) => {
    const val = e.target.value;
    setEstadoInput(val);
    setEstadoSelecionado(null);
    setCidadeInput('');
    setCidadeSelecionada(null);
    setMunicipios([]);

    const match = estados.find(
      (est) => est.nome.toLowerCase() === val.toLowerCase()
    );
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

  const handleCidadeInput = (e) => {
    const val = e.target.value;
    setCidadeInput(val);
    setCidadeSelecionada(null);

    const match = municipios.find(
      (mun) => mun.nome.toLowerCase() === val.toLowerCase()
    );
    if (match) setCidadeSelecionada(match);
  };

  const handleCidadeSelect = (cidade) => {
    setCidadeInput(cidade.nome);
    setCidadeSelecionada(cidade);
  };

  // Continuar
  const handleContinuar = async () => {
    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      if (estadoSelecionado && cidadeSelecionada) {
        await updateUserData({
          endereco: {
            Estado: estadoSelecionado.nome,
            Cidade: cidadeSelecionada.nome,
          },
        });
      }
      if (onContinuar) {
        await onContinuar({
          estado: estadoSelecionado ? estadoSelecionado.nome : '',
          cidade: cidadeSelecionada ? cidadeSelecionada.nome : '',
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
    <div className="bloco_principal">
      <section id='ETP4T3'/>
      <Maintexts>
        <Headlines variant="black">
          Em qual estado e cidade você mora atualmente?
        </Headlines>
      </Maintexts>

      <div className="mt-10 rounded-2xl space-y-4">
        {/* Estado */}
        <div className="relative">
          <Imputs
            id="estado"
            type="text"
            placeholder={loadingEstados ? 'Carregando estados...' : 'Digite seu estado'}
            value={estadoInput}
            onChange={handleEstadoInput}
            disabled={loadingEstados}
            className="bg-white border-gray-200"
            style={{ minHeight: '48px' }}
          />

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

        {/* Cidade */}
        <div className="relative">
          <Imputs
            id="cidade"
            type="text"
            placeholder={
              !estadoSelecionado
                ? 'Selecione um estado primeiro'
                : loadingMunicipios
                ? 'Carregando municípios...'
                : 'Digite para buscar o município'
            }
            value={cidadeInput}
            onChange={handleCidadeInput}
            disabled={!estadoSelecionado || loadingMunicipios}
            className="bg-white border-gray-200"
            style={{ minHeight: '48px' }}
          />

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

      {/* Botão Continuar */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleContinuar}
          disabled={(isLoading && tipoAcao === 'continuar') || !isFormValid}
          className={`
            flex-1 px-6 py-4 rounded-full font-hendrix-medium text-white 
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 
            transition-all duration-300
            ${(isLoading && tipoAcao === 'continuar') || !isFormValid
              ? 'bg-gradient-to-r from-gray-300 to-gray-400 opacity-70 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#1655ff] to-[#4285f4] hover:scale-105 active:scale-95'
            }
          `}
          style={{ fontSize: '11pt', boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'continuar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">
                  Continuando...
                </span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">
                Continuar
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoLocalizacaoStep;