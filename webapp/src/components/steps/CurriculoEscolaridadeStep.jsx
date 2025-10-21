import { useState, useEffect } from 'react';
import '../../styles/refino.css';

import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Alternatives from "../modules/Alternatives";

const CurriculoEscolaridadeStep = ({ onSelecionarEscolaridade }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const opcoesEscolaridade = [
    'Ensino Fundamental Incompleto',
    'Ensino Fundamental Completo',
    'Ensino Médio Incompleto',
    'Ensino Médio Completo',
    'Ensino Superior Incompleto',
    'Ensino Superior Completo'
  ];

  // Alternatives espera { id, text }
  const answers = opcoesEscolaridade.map((text, idx) => ({
    id: idx + 1,
    text
  }));

  // Confirmar usando o botão do próprio Alternatives
  const handleConfirm = async (answerId) => {
    const selecionada = answers.find(a => a.id === (answerId ?? selectedId));
    if (!selecionada) return;

    setIsLoading(true);
    setTipoAcao('continuar');
    try {
      if (onSelecionarEscolaridade) {
        await onSelecionarEscolaridade(selecionada.text);
      }
    } catch (error) {
      console.error('Erro ao avançar escolaridade:', error);
    } finally {
      setIsLoading(false);
      setTipoAcao(null);
    }
  };

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">
          Qual é o seu nível de escolaridade?
        </Headlines>
        <Paragraphs variant="black">
          Selecione a opção que melhor representa sua formação atual.
        </Paragraphs>
      </Maintexts>
 
      {/* Lista de alternativas com botão "Continuar" embutido */}
      <Alternatives
        answers={answers}
        selectedId={selectedId}
        onChange={setSelectedId}
        onConfirm={handleConfirm}
        isLoading={isLoading && tipoAcao === 'continuar'}
        confirmText="Continuar"
        autoConfirm={false}
        className="mt-6"
        size={20}
      />
    </div>
  );
};

export default CurriculoEscolaridadeStep;