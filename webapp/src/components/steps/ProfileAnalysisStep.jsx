// ProfileAnalysisStep.jsx
import { useState, useMemo } from 'react';
import '../../styles/refino.css';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Alternatives from "../modules/Alternatives"; // componente novo

const ProfileAnalysisStep = ({
  currentQuestion = 1,
  totalQuestions = 10,
  onAnswerSelect,
  questionData
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pergunta padrão (formal) caso não receba questionData
  const defaultQuestionData = {
    question: "Por que você está interessado(a) nesta oportunidade?",
    subtitle: "Sua resposta nos ajuda a compreender melhor seu objetivo profissional.",
    answers: [
      { id: 1, text: "Busco estabilidade e desenvolvimento profissional." },
      { id: 2, text: "Estou em processo de recolocação no mercado." },
      { id: 3, text: "Desejo trabalhar em modelo remoto, com maior autonomia." },
      { id: 4, text: "Quero adquirir novos conhecimentos e progredir na carreira." }
    ]
  };

  const data = useMemo(() => questionData || defaultQuestionData, [questionData]);
  const progressPercentage = Math.min(100, Math.max(0, (currentQuestion / totalQuestions) * 100));

  // Confirma a alternativa escolhida
  const handleConfirm = async (answerId) => {
    const id = answerId ?? selectedAnswer;
    if (!id || isLoading) return;
    setIsLoading(true);
    try {
      if (onAnswerSelect) {
        await onAnswerSelect(id);
      }
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6" role="group" aria-labelledby="pa-heading">
      {/* Header com progresso */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span
            className="font-hendrix-bold text-gray-800"
            style={{ fontSize: '10pt' }}
          >
            Análise de Perfil
          </span>
          <span
            className="font-hendrix-medium text-gray-400"
            style={{ fontSize: '10pt' }}
            aria-live="polite"
          >
            {currentQuestion} de {totalQuestions}
          </span>
        </div>

        {/* Barra de progresso (com acessibilidade) */}
        <div
          className="w-full bg-gray-200 rounded-full h-2 mb-8"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPercentage)}
          aria-label="Progresso do questionário"
        >
          <div
            className="h-2 rounded-full transition-[width] duration-500 ease-in-out"
            style={{
              backgroundColor: '#1655ff',
              width: `${progressPercentage}%`
            }}
          />
        </div>
      </div>

      {/* Pergunta / Subtítulo */}
      <Headlines variant="black" id="pa-heading">
        {data.question}
      </Headlines>

      {data.subtitle && (
        <Paragraphs variant="black">
          {data.subtitle}
        </Paragraphs>
      )}


      {/* Alternativas + Botão Confirmar */}
      <Alternatives
        answers={data.answers || []}
        selectedId={selectedAnswer}          // controlado
        onChange={setSelectedAnswer}         // atualiza seleção
        onConfirm={() => handleConfirm()}    // confirma resposta
        isLoading={isLoading}
        // Caso seu componente aceite, você pode passar rótulos formais:
        // confirmLabel="Confirmar"
        // loadingLabel="Enviando..."
        // aria-describedby para acessibilidade da dica
        ariaDescribedBy="hint-selection"
        // Caso aceite prop para desabilitar confirmar, envie:
        // disableConfirm={!selectedAnswer || isLoading}
      />

      {/* Rodapé opcional com um aviso formal (mostrado apenas se nada estiver selecionado) */}
      {!selectedAnswer && !isLoading && (
        <div
          className="text-gray-400 font-hendrix-regular"
          style={{ fontSize: '7.5pt' }}
          aria-live="polite"
        >
          O botão de confirmação será habilitado após a seleção de uma alternativa.
        </div>
      )}
    </div>
  );
};

export default ProfileAnalysisStep;