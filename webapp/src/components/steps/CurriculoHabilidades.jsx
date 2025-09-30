
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import '../../styles/refino.css';

const habilidadesList = [
  'Sei me comunicar bem com pessoas',
  'Sou calmo(a) e tenho paciência',
  'Tenho facilidade com celular e computador',
  'Sou atencioso aos detalhes',
  'Gosto de ajudar e resolver problemas',
  'Sou organizado(a) e pontual',
  'Aprendo rápido'
];

// eslint-disable-next-line no-unused-vars
const CurriculoHabilidadesStep = ({ onVoltar, onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState([]);

  const handleSelecionar = (habilidade) => {
    if (habilidadesSelecionadas.includes(habilidade)) {
      setHabilidadesSelecionadas(habilidadesSelecionadas.filter(h => h !== habilidade));
    } else if (habilidadesSelecionadas.length < 3) {
      setHabilidadesSelecionadas([...habilidadesSelecionadas, habilidade]);
    }
  };

  // const handleVoltar = async () => {
  //   setIsLoading(true);
  //   setTipoAcao('voltar');
  //   try {
  //     if (onVoltar) {
  //       await onVoltar();
  //     }
  //   } catch (error) {
  //     console.error('Erro ao voltar:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleContinuar = async () => {
    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      if (onContinuar) {
        await onContinuar(habilidadesSelecionadas);
      }
    } catch (error) {
      console.error('Erro ao continuar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">


      {/* Título principal */}
      <div className="bg-gray-100 rounded-2xl mt-10 p-6">
        <h1 className="titulodaetapa font-hendrix-semibold text-gray-800 mb-5" style={{ fontSize: '15pt', lineHeight: '1.3' }}>
          Quais dessas <br /> habilidades você possui?
        </h1>
        <p className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '10pt' }}>
          Escolha até 3 alternativas
        </p>

        {/* Alternativas de habilidades */}
        <div className="space-y-3">
          {habilidadesList.map((habilidade) => (
            <button
              key={habilidade}
              type="button"
              onClick={() => handleSelecionar(habilidade)}
              className={`w-full py-4 px-6 rounded-2xl font-hendrix-regular text-gray-800 border-2 transition-all duration-200 flex justify-start text-left
  ${habilidadesSelecionadas.includes(habilidade)
    ? 'border-blue-600 bg-blue-50 font-hendrix-semibold'
    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'}
`}
              style={{ fontSize: '10pt' }}
              disabled={isLoading}
            >
              {habilidade}
            </button>
          ))}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex space-x-4">
        
        {/* Botão Continuar */}
        <button
          onClick={handleContinuar}
          disabled={isLoading || habilidadesSelecionadas.length === 0}
          className={`
            flex-1 py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${isLoading || habilidadesSelecionadas.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'}
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

export default CurriculoHabilidadesStep;
