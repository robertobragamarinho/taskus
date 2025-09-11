import React, { useState, useEffect } from "react";
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
  const [form, setForm] = useState({
    estado: { id: '', nome: '', sigla: '' },
    municipio: { id: '', nome: '' },
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    referencia: "",
    aceita: false
  });
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
        // Substitua pela sua API real
        const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await res.json();
        setEstados(data.map(e => ({
          id: String(e.id),
          nome: e.nome,
          sigla: e.sigla
        })));
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
    if (!form.estado.id) {
      setMunicipios([]);
      return;
    }
    const fetchMunicipios = async () => {
      setLoadingMunicipios(true);
      try {
        // Substitua pela sua API real
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.estado.id}/municipios`);
        const data = await res.json();
        setMunicipios(data.map(m => ({
          id: String(m.id),
          nome: m.nome
        })));
      } catch {
        /* setFalhaMunicipios(true); */
      } finally {
        setLoadingMunicipios(false);
      }
    };
    fetchMunicipios();
  }, [form.estado.id]);

  // Handlers
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEstadoChange = e => {
    const value = e.target.value;
    if (falhaEstados) {
      setForm(prev => ({
        ...prev,
        estado: { ...prev.estado, nome: value }
      }));
      return;
    }
    const estadoObj = estados.find(e => e.id === value) || { id: '', nome: '', sigla: '' };
    setForm(prev => ({
      ...prev,
      estado: estadoObj,
      municipio: { id: '', nome: '' }
    }));
  };

  const handleMunicipioChange = e => {
    const value = e.target.value;
    if (falhaEstados) {
      setForm(prev => ({
        ...prev,
        municipio: { ...prev.municipio, nome: value }
      }));
      return;
    }
    const municipioObj = municipios.find(m => m.id === value) || { id: '', nome: '' };
    setForm(prev => ({
      ...prev,
      municipio: municipioObj
    }));
  };

  // Validação
  const isFormValid =
    (falhaEstados
      ? form.estado.nome && form.municipio.nome
      : form.estado.id && form.municipio.id) &&
    form.bairro &&
    form.rua &&
    form.numero &&
    form.aceita;

  // Submit
  const handleSubmit = e => {
    e.preventDefault();
    if (!isFormValid) return;
    if (onConfirm) onConfirm(form);
  };

  return (
  <div className="flex flex-col items-center justify-start px-4 pt-8 pb-10">
      <form className="w-full max-w-md mx-auto bg-transparent" onSubmit={handleSubmit}>
        {/* Código de aprovação */}
        <div className="mb-4 flex justify-start">
          <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
            Código de aprovação: #WST-782411
          </span>
        </div>
        {/* Título */}
        <h1 className="font-hendrix-bold text-3xl text-white mb-3 leading-tight">
          Envio dos equipamentos de trabalho
        </h1>
        <p className="font-hendrix-regular text-base text-gray-300 mb-8">
          Para iniciar suas atividades, a TaskUS envia para sua casa um kit completo de trabalho. O envio será feito pelos correios, pago por nós.
        </p>
        {/* Lista de equipamentos */}
        <div className="space-y-3 mb-8">
          {equipamentos.map((eq) => (
            <div
              key={eq}
              className="w-full py-3 px-5 rounded-2xl bg-[#222426] font-hendrix-semibold text-white text-base"
              style={{ border: '2px solid #fff' }}
            >
              {eq}
            </div>
          ))}
        </div>
        {/* Endereço */}
        <h3 className="font-hendrix-bold text-lg text-white mb-3">Preencha o endereço para entrega</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {falhaEstados ? (
            <>
              <input
                name="estado"
                value={form.estado.nome}
                onChange={handleEstadoChange}
                required
                placeholder="Estado"
                className="col-span-1 bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900"
              />
              <input
                name="municipio"
                value={form.municipio.nome}
                onChange={handleMunicipioChange}
                required
                placeholder="Cidade"
                className="col-span-1 bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900"
              />
            </>
          ) : (
            <>
              <select
                name="estado"
                value={form.estado.id}
                onChange={handleEstadoChange}
                required
                className="col-span-1 bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900"
                disabled={loadingEstados}
              >
                <option value="">
                  {loadingEstados ? 'Carregando estados...' : 'Estado'}
                </option>
                {estados.map(estado => (
                  <option key={estado.id} value={estado.id}>{estado.nome}</option>
                ))}
              </select>
              <select
                name="municipio"
                value={form.municipio.id}
                onChange={handleMunicipioChange}
                required
                className="col-span-1 bg-white rounded-2xl px-5 py-3 text-base font-hendrix-semibold text-gray-900"
                disabled={!form.estado.id || loadingMunicipios}
              >
                <option value="">
                  {!form.estado.id
                    ? 'Cidade'
                    : loadingMunicipios
                      ? 'Carregando municípios...'
                      : 'Cidade'}
                </option>
                {municipios.map(municipio => (
                  <option key={municipio.id} value={municipio.id}>{municipio.nome}</option>
                ))}
              </select>
            </>
          )}
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
          <label htmlFor="aceita" className="font-hendrix-regular text-white text-base">Confirmo que meu endereço está correto</label>
        </div>
        
        {/* Botão */}
        <button
          type="submit"
          className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${!isFormValid ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={!isFormValid}
        >
          Continuar
          <span className="ml-2 text-xl">&gt;</span>
        </button>
      </form>

      
    </div>
  );
};

export default ContratacaoEquipamentosStep;
