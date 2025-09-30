/* eslint-disable no-unused-vars */


import React, { useState, useEffect, useRef, useContext } from "react";
import { Loader2 } from 'lucide-react';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import '../../styles/refino.css';

const equipamentos = [
  "1 - Notebook Dell 2024",
  "1 - Kit teclado e mouse Dell",
  "1 - Headphone",
  "1 - Mousepad",
  "3 - Camisetas",
  "1 - Crachá"
];

const ContratacaoEquipamentosStep = ({ onConfirm }) => {
  const { processData, updateUserData } = useContext(ProcessContext);
  const enderecoContexto = processData?.userData?.endereco || {};
  const [form, setForm] = useState({
    estado: enderecoContexto.Estado || '',
    municipio: enderecoContexto.Cidade || '',
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    referencia: "",
    aceita: false
  });
  const [estadoInput, setEstadoInput] = useState(enderecoContexto.Estado || '');
  const [cidadeInput, setCidadeInput] = useState(enderecoContexto.Cidade || '');
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const estadoInputRef = useRef(null);
  const cidadeInputRef = useRef(null);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [falhaEstados, setFalhaEstados] = useState(false);
  // const [falhaMunicipios, setFalhaMunicipios] = useState(false);

  // Carrega estados ao montar
  useEffect(() => {
    const fetchEstados = async () => {
      setLoadingEstados(true);
      setFalhaEstados(false);
      try {
        const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await res.json();
        setEstados(data);
      } catch {
        setFalhaEstados(true);
      } finally {
        setLoadingEstados(false);
      }
    };
    fetchEstados();
  }, []);


  // Carrega municípios ao selecionar estado
  useEffect(() => {
    if (!estadoSelecionado) {
      setMunicipios([]);
      return;
    }
    const fetchMunicipios = async () => {
      setLoadingMunicipios(true);
      try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado.id}/distritos`);
        const data = await res.json();
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
      } catch {
        // erro silencioso
      } finally {
        setLoadingMunicipios(false);
      }
    };
    fetchMunicipios();
  }, [estadoSelecionado]);


  // Handlers para autocomplete
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    setForm(prev => ({ ...prev, estado: e.target.value, municipio: '' }));
    // Se digitação bater exatamente com um estado, seleciona
    const match = estados.find(est => est.nome.toLowerCase() === e.target.value.toLowerCase());
    if (match) {
      setEstadoSelecionado(match);
    }
  };
  const handleEstadoSelect = (estado) => {
    setEstadoInput(estado.nome);
    setEstadoSelecionado(estado);
    setCidadeInput('');
    setCidadeSelecionada(null);
    setMunicipios([]);
    setForm(prev => ({ ...prev, estado: estado.nome, municipio: '' }));
    // Carrega municípios
    if (estado.id) {
      setTimeout(() => {
        cidadeInputRef.current && cidadeInputRef.current.focus();
      }, 100);
    }
  };

  // Seleção de cidade
  const handleCidadeInput = (e) => {
    setCidadeInput(e.target.value);
    setCidadeSelecionada(null);
    setForm(prev => ({ ...prev, municipio: e.target.value }));
    // Se digitação bater exatamente com uma cidade, seleciona
    const match = municipios.find(mun => mun.nome.toLowerCase() === e.target.value.toLowerCase());
    if (match) setCidadeSelecionada(match);
  };
  const handleCidadeSelect = (cidade) => {
    setCidadeInput(cidade.nome);
    setCidadeSelecionada(cidade);
    setForm(prev => ({ ...prev, municipio: cidade.nome }));
  };


  // Validação
  const isFormValid =
    estadoInput && cidadeInput && form.bairro && form.rua && form.numero && form.aceita;


  // Submit
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    // Monta o campo Logradouro
    const logradouroParts = [];
    if (form.rua) logradouroParts.push(form.rua);
    if (form.numero) logradouroParts.push(`numero: ${form.numero}`);
    if (form.bairro) logradouroParts.push(`bairro: ${form.bairro}`);
    if (form.complemento) logradouroParts.push(`complemento: ${form.complemento}`);
    const logradouro = logradouroParts.join(', ');

    // Atualiza o contexto userData.endereco
    await updateUserData({
      endereco: {
        Estado: estadoInput,
        Cidade: cidadeInput,
        bairro: form.bairro,
        rua: form.rua,
        numero: form.numero,
        complemento: form.complemento,
        referencia: form.referencia,
        Logradouro: logradouro
      }
    });

    await new Promise(res => setTimeout(res, 2000));
    if (onConfirm) await onConfirm({ ...form, estado: estadoInput, municipio: cidadeInput });
    setIsLoading(false);
  };

  return (
  <div className="flex flex-col items-center justify-start px-4 pt-8 pb-10">
      <form className="w-full max-w-md mx-auto bg-transparent" onSubmit={handleSubmit}>
        {/* Código de aprovação */}
 
        {/* Título */}
        <h1 className="headlines font-hendrix-bold text-3xl text-white mb-3 leading-tight">
          Envio dos equipamentos para você trabalhar
        </h1>
        <p className="subheadlines font-hendrix-regular text-base text-gray-300 mb-8">
          Para iniciar suas atividades, a TaskUS envia para sua casa um kit completo de trabalho. O envio será feito pelos correios, pago por nós.
        </p>
        {/* Lista de equipamentos */}
        <div className="space-y-3 mb-8">
          {equipamentos.map((eq) => (
            <div
              key={eq}
              className="w-full py-3 px-5 rounded-2xl bg-[#] font-hendrix-regular text-white text-base"
              style={{ border: '0.9px solid #fff' }}
            >
              {eq}
            </div>
          ))}
        </div>
        {/* Endereço */}
        <h3 className="aviso font-hendrix-bold text-lg text-white mb-3">Preencha o endereço para entrega</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Campo Estado autocomplete */}
          <div className="col-span-1 relative">
            <input
              ref={estadoInputRef}
              name="estado"
              value={estadoInput}
              onChange={handleEstadoInput}
              required
              placeholder={loadingEstados ? 'Carregando estados...' : 'Digite o estado'}
              className="w-full bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900"
              autoComplete="off"
              disabled={loadingEstados}
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
          {/* Campo Cidade autocomplete */}
          <div className="col-span-1 relative">
            <input
              ref={cidadeInputRef}
              name="municipio"
              value={cidadeInput}
              onChange={handleCidadeInput}
              required
              placeholder={
                !estadoSelecionado
                  ? 'Selecione um estado primeiro'
                  : loadingMunicipios
                    ? 'Carregando municípios...'
                    : 'Digite a cidade'
              }
              className="w-full bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900"
              autoComplete="off"
              disabled={!estadoSelecionado || loadingMunicipios}
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

        <input name="bairro" value={form.bairro} onChange={handleChange} required placeholder="Bairro" className="w-full bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900 mb-4" />
        <input name="rua" value={form.rua} onChange={handleChange} required placeholder="Rua" className="w-full bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900 mb-4" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input name="numero" value={form.numero} onChange={handleChange} required placeholder="Número" className="col-span-1 bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900" />
          <input name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento" className="col-span-1 bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900" />
        </div>
        <input name="referencia" value={form.referencia} onChange={handleChange} placeholder="Referência" className="w-full bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900 mb-4" />
        <div className="flex items-center space-x-2 mb-8">
          <input type="checkbox" name="aceita" checked={form.aceita} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded-full" />
          <label htmlFor="aceita" className="font-hendrix-regular text-[15px] text-white text-base">Confirmo que meu endereço está correto</label>
        </div>
        
        {/* Botão */}
        <button
          type="submit"
          className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${!isFormValid || isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading && <Loader2 className="animate-spin mr-2" size={22} />}
          {isLoading ? 'Enviando...' : 'Continuar'}
        </button>
      </form>

      
    </div>
  );
};

export default ContratacaoEquipamentosStep;
