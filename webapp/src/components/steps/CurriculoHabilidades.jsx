import { useState, useEffect } from 'react';
import '../../styles/refino.css';

import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Alternatives from "../modules/Alternatives";

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
  const [selectedIds, setSelectedIds] = useState([]); // ids selecionados

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mapeia para o formato do Alternatives
  const answers = habilidadesList.map((text, idx) => ({
    id: idx + 1,
    text
  }));

  const handleConfirm = async (ids) => {
    // ids: array de números (dos selecionados)
    const selecionadas = answers
      .filter(a => ids.includes(a.id))
      .map(a => a.text);

    if (!selecionadas.length) return;

    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      if (typeof onContinuar === 'function') {
        await onContinuar(selecionadas);
      }
    } catch (error) {
      console.error('Erro ao continuar:', error);
    } finally {
      setIsLoading(false);
      setTipoAcao(null);
    }
  };

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">
          Quais dessas habilidades você possui?
        </Headlines>
        <Paragraphs variant="black">
          Selecione até 3 alternativas.
        </Paragraphs>
      </Maintexts>

      <Alternatives
        answers={answers}
        multiple
        maxSelected={3}
        selectedIds={selectedIds}
        onChange={setSelectedIds}
        onConfirm={handleConfirm}
        isLoading={isLoading && tipoAcao === 'continuar'}
        confirmText={isLoading && tipoAcao === 'continuar' ? 'Continuando...' : 'Continuar'}
        autoConfirm={false}
        className="mt-6"
        size={22}
      />
    </div>
  );
};

export default CurriculoHabilidadesStep;