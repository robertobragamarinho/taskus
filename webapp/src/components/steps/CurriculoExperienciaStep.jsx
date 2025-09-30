import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import '../../styles/refino.css';

const CurriculoExperienciaStep = ({ onVoltar, onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);
  const [experiencias, setExperiencias] = useState([{
    nomeEmpresa: '',
    funcao: '',
    inicio: '', // ISO YYYY-MM-DD
    fim: ''     // ISO YYYY-MM-DD
  }]);

  // ---- Helpers ----
  const isoToBr = (iso) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    if (!y || !m || !d) return '';
    return `${d.padStart(2,'0')}/${m.padStart(2,'0')}/${y}`;
  };

  const brToIso = (br) => {
    const digits = br.replace(/\D/g, '');
    if (digits.length !== 8) return '';
    const d = digits.slice(0, 2);
    const m = digits.slice(2, 4);
    const y = digits.slice(4, 8);
    const day = +d, month = +m, year = +y;
    if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) return '';
    return `${y}-${m}-${d}`;
  };

  const maskBrDate = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 8);
    const p1 = v.slice(0, 2);
    const p2 = v.slice(2, 4);
    const p3 = v.slice(4, 8);
    if (v.length <= 2) return p1;
    if (v.length <= 4) return `${p1}/${p2}`;
    return `${p1}/${p2}/${p3}`;
  };

  // ---- Campo de data digitável ----
  const DateField = ({ label, isoValue, onIsoChange, id, name }) => {
    const [uiValue, setUiValue] = useState(isoToBr(isoValue));

    // sincroniza apenas quando isoValue muda externamente
    useEffect(() => {
      setUiValue(isoToBr(isoValue));
    }, [isoValue]);

    const handleChange = (e) => {
      const masked = maskBrDate(e.target.value);
      setUiValue(masked);

      // só atualiza ISO quando completo (10 chars)
      if (masked.length === 10) {
        const iso = brToIso(masked);
        if (iso) onIsoChange(iso);
      }
      // se apagar tudo, zera ISO
      if (masked.length === 0) {
        onIsoChange('');
      }
    };

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="font-hendrix-medium text-gray-700"
          style={{ fontSize: '9pt' }}
        >
          {label}
        </label>
        <input
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={uiValue}
          onChange={handleChange}
          placeholder="DD/MM/AAAA"
          maxLength={10}
          className="w-full bg-white rounded-xl p-4 min-h-[52px] border border-gray-200 font-hendrix-regular text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{ fontSize: '12pt', letterSpacing: '0.02em' }}
          aria-label={label}
        />
      </div>
    );
  };

  // ---- Mutadores ----
  const addExperiencia = () => {
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

  // Validação: fim >= início
  const rangesInvalidos = experiencias.some(({ inicio, fim }) => {
    if (!inicio || !fim) return false;
    return new Date(fim) < new Date(inicio);
  });

  const handleContinuar = async () => {
    setIsLoading(true);
    setTipoAcao('continuar');
    try { if (onContinuar) await onContinuar(experiencias); }
    catch (e) { console.error('Erro ao continuar:', e); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-100 mt-10 rounded-2xl p-6">
        <h1 className="titulodaetapa font-hendrix-semibold text-gray-800 mb-6" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Você já trabalhou antes? Se sim preencha as informações abaixo
        </h1>

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
                  className="w-full bg-white rounded-xl p-4 min-h-[52px] border border-gray-200 font-hendrix-regular text-gray-700 placeholder-gray-400"
                  style={{ fontSize: '12pt' }}
                />
              </div>

              {/* O que você fazia */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="O que você fazia?"
                  value={experiencia.funcao}
                  onChange={(e) => updateExperiencia(index, 'funcao', e.target.value)}
                  className="w-full bg-white rounded-xl p-4 min-h-[52px] border border-gray-200 font-hendrix-regular text-gray-700 placeholder-gray-400"
                  style={{ fontSize: '12pt' }}
                />
              </div>

              {/* Início (digitável) */}
              <DateField
                id={`exp-inicio-${index}`}
                name={`exp-inicio-${index}`}
                label="Início"
                isoValue={experiencia.inicio}
                onIsoChange={(newIso) => updateExperiencia(index, 'inicio', newIso)}
              />

              {/* Fim (digitável) */}
              <DateField
                id={`exp-fim-${index}`}
                name={`exp-fim-${index}`}
                label="Fim"
                isoValue={experiencia.fim}
                onIsoChange={(newIso) => updateExperiencia(index, 'fim', newIso)}
              />

              {(experiencia.inicio && experiencia.fim && new Date(experiencia.fim) < new Date(experiencia.inicio)) && (
                <p className="text-red-600 font-hendrix-medium text-xs">
                  A data de fim não pode ser anterior ao início.
                </p>
              )}

              {index < experiencias.length - 1 && (
                <div className="border-t border-gray-200 pt-4"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={addExperiencia}
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

      <div className="flex space-x-4">
        <button
          onClick={handleContinuar}
          disabled={(isLoading && tipoAcao === 'continuar') || rangesInvalidos}
          className={`
            flex-1 py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${((isLoading && tipoAcao === 'continuar') || rangesInvalidos)
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
              <span>Continuar</span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoExperienciaStep;