import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { Loader2, Package, Keyboard, Headphones, Mouse, Shirt, Badge } from 'lucide-react'; // Ícones corretos para a lista
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import '../../styles/refino.css';

// Importando os componentes de UI
import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Input from "../modules/Imputs";
import ListTopics from "../modules/ListTopics";
import VideoBlock from "../modules/VideoBlock"; // ajuste o caminho se não usar '@'
import introVideo from "../../assets/equipamentos.mp4"; 
import ExplanatoryCards from "../modules/ExplanatoryCards";
import { IconAlert } from "../modules/SvgIcons";

  const alerts = [
    {
      id: 'equipments-alert',
      icon: IconAlert,
      title: 'Importante',
      description:
        'Todos os equipamentos enviados pertencem à TaskUs e devem ser utilizados apenas para atividades de trabalho. ' +
        'Cuide deles com atenção e zelo, como se fossem seus. Em caso de desligamento, será necessária a devolução de todos os itens.'
    }
  ];

// Array de equipamentos CORRIGIDO e com ícones específicos
const equipamentosTopics = [
  { label: "1 - Notebook Dell 2024", icon: Package },
  { label: "1 - Kit teclado e mouse Dell", icon: Keyboard },
  { label: "1 - Headphone", icon: Headphones },
  { label: "1 - Mousepad", icon: Mouse },
  { label: "3 - Camisetas", icon: Shirt },
  { label: "1 - Crachá", icon: Badge }
];

const ContratacaoEquipamentosStep = ({ onConfirm }) => {
  const { processData, updateUserData } = useContext(ProcessContext);
  const enderecoContexto = processData?.userData?.endereco || {};

  // Estado do formulário
  const [form, setForm] = useState({
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    referencia: "",
    aceita: false
  });

  // Estados para os campos de autocomplete de Estado e Cidade
  const [estadoInput, setEstadoInput] = useState(enderecoContexto.Estado || '');
  const [cidadeInput, setCidadeInput] = useState(enderecoContexto.Cidade || '');
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  
  // Estados para carregar dados da API do IBGE
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cidadeInputRef = useRef(null);

  // Efeito para carregar os estados da API do IBGE
  useEffect(() => {
    const fetchEstados = async () => {
      setLoadingEstados(true);
      try {
        const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'  );
        const data = await res.json();
        setEstados(data);
      } catch (error) {
        console.error("Falha ao carregar estados:", error);
      } finally {
        setLoadingEstados(false);
      }
    };
    fetchEstados();
  }, []);

  // Efeito para carregar os municípios quando um estado é selecionado
  useEffect(() => {
    if (!estadoSelecionado) {
      setMunicipios([]);
      return;
    }
    const fetchMunicipios = async () => {
      setLoadingMunicipios(true);
      try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado.id}/distritos?orderBy=nome`  );
        const data = await res.json();
        const municipiosUnicos = Array.from(new Map(data.map(d => [d.municipio.id, d.municipio])).values());
        setMunicipios(municipiosUnicos);
      } catch (error) {
        console.error("Falha ao carregar municípios:", error);
      } finally {
        setLoadingMunicipios(false);
      }
    };
    fetchMunicipios();
  }, [estadoSelecionado]);

  // Handler genérico para os inputs do formulário
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Filtros para a lista de autocomplete
  const estadosFiltrados = estadoInput ? estados.filter(e => e.nome.toLowerCase().includes(estadoInput.toLowerCase())) : [];
  const cidadesFiltradas = cidadeInput ? municipios.filter(m => m.nome.toLowerCase().includes(cidadeInput.toLowerCase())) : [];

  // Handlers para seleção de Estado
  const handleEstadoInput = (e) => {
    setEstadoInput(e.target.value);
    setEstadoSelecionado(null);
    setCidadeInput('');
    setCidadeSelecionada(null);
  };

  const handleEstadoSelect = (estado) => {
    setEstadoInput(estado.nome);
    setEstadoSelecionado(estado);
    cidadeInputRef.current?.focus();
  };

  // Handlers para seleção de Cidade
  const handleCidadeInput = (e) => {
    setCidadeInput(e.target.value);
    setCidadeSelecionada(null);
  };

  const handleCidadeSelect = (cidade) => {
    setCidadeInput(cidade.nome);
    setCidadeSelecionada(cidade);
  };

  // Validação do formulário
  const isFormValid = estadoSelecionado && cidadeSelecionada && form.bairro && form.rua && form.numero && form.aceita;

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);

    const enderecoFinal = {
      Estado: estadoSelecionado.nome,
      Cidade: cidadeSelecionada.nome,
      ...form
    };

    await updateUserData({ endereco: enderecoFinal });
    await new Promise(res => setTimeout(res, 2000));
    if (onConfirm) await onConfirm(enderecoFinal);
    
    setIsLoading(false);
  };

  return (
    
    <div className="min-h-screen bloco_principal ">
      <Maintexts>
        <section id='ETP6T6'/>
        <Headlines variant="white">Faremos o envio dos <br/>equipamentos para você começar a trabalhar</Headlines>
        <Paragraphs variant="white">
          A TaskUs envia um kit completo de trabalho direto para sua casa, e o melhor: você não paga nada pelo frete.
        </Paragraphs>
      </Maintexts>

  
      
       <VideoBlock
          provider="html5"
          src={introVideo}
          autoplay
          muted
          loop
          controls={false}
          w="w-[85vw]"     // 👈 controla largura
          h="h-[65vw]"   // 👈 controla altura
          className="mx-auto my-8"
        />
        <ListTopics topics={equipamentosTopics} withDescription={false} enableDrawer={false} />



      <form className="w-full max-w-md mx-auto bg-transparent" onSubmit={handleSubmit}>
        {/* Lista de equipamentos usando ListTopics */}
        
        <h3 className="aviso font-hendrix-bold text-lg text-white mb-4 mt-8">Preencha o endereço para entrega</h3>
        
        {/* Campos de Endereço */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Campo Estado com Autocomplete */}
            <div className="relative">
              <Input
                name="estado"
                value={estadoInput}
                onChange={handleEstadoInput}
                required
                placeholder={loadingEstados ? 'Carregando...' : 'Estado'}
                disabled={loadingEstados}
              />
              {estadosFiltrados.length > 0 && !estadoSelecionado && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                  {estadosFiltrados.map((estado) => (
                    <div key={estado.id} className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-900" onClick={() => handleEstadoSelect(estado)}>
                      {estado.nome}
                    </div>
                  ))}
                </div>
              )}
            </div>

            

            {/* Campo Cidade com Autocomplete */}
            <div className="relative">
              <Input
                ref={cidadeInputRef}
                name="municipio"
                value={cidadeInput}
                onChange={handleCidadeInput}
                required
                placeholder={!estadoSelecionado ? 'Selecione o estado' : loadingMunicipios ? 'Carregando...' : 'Cidade'}
                disabled={!estadoSelecionado || loadingMunicipios}
              />
              {cidadesFiltradas.length > 0 && !cidadeSelecionada && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                  {cidadesFiltradas.map((cidade) => (
                    <div key={cidade.id} className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-900" onClick={() => handleCidadeSelect(cidade)}>
                      {cidade.nome}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Input name="bairro" value={form.bairro} onChange={handleChange} required placeholder="Bairro" />
          <Input name="rua" value={form.rua} onChange={handleChange} required placeholder="Rua" />
          
          <div className="grid grid-cols-2 gap-4">
            <Input name="numero" value={form.numero} onChange={handleChange} required placeholder="Número" />
            <Input name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento" />
          </div>
          
          <Input name="referencia" value={form.referencia} onChange={handleChange} placeholder="Ponto de referência" />
        </div>
        <div className="mt-5">
          <ExplanatoryCards supportTypes={alerts} variant="alert" />
        </div>    
        {/* Checkbox de confirmação */}
        <div className="flex items-center space-x-3 my-8">
          <input type="checkbox" id="aceita" name="aceita" checked={form.aceita} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500" />
          <label htmlFor="aceita" className="font-hendrix-regular text-white text-base cursor-pointer">
            Confirmo que meu endereço está correto
          </label>
        </div>
        
        {/* Botão de Submissão */}
        <button
          type="submit"
          className={`w-full py-4 mb-10 mt-10 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${!isFormValid || isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" size={22} /> : 'Continuar'}
        </button>
      </form>
    </div>
  );
};

export default ContratacaoEquipamentosStep;
