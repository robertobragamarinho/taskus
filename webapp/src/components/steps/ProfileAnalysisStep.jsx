import { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import '../../styles/refino.css';

const ProfileAnalysisStep = ({ 
  currentQuestion = 1, 
  totalQuestions = 10, 
  onAnswerSelect,
  questionData 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerClick = async (answerId) => {
    // apenas seleciona localmente; confirmação é feita com o botão "Confirmar"
    setSelectedAnswer(answerId);
  };

  const handleConfirm = async () => {
    if (!selectedAnswer) return;
    setIsLoading(true);
    try {
      if (onAnswerSelect) {
        await onAnswerSelect(selectedAnswer);
      }
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dados padrão para a primeira pergunta
  const defaultQuestionData = {
    question: "Porque você está buscando essa oportunidade?",
    answers: [
      { id: 1, text: "Quero um trabalho fixo e digno" },
      { id: 2, text: "Estou desempregado e preciso urgente" },
      { id: 3, text: "Quero trabalhar de casa e ter mais liberdade" },
      { id: 4, text: "Aprender algo novo e crescer profissionalmente" }
    ]
  };

  const data = questionData || defaultQuestionData;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="space-y-6">
      {/* Header com progresso */}
      <div className="space-y-3">
        {/* Linha superior com título e contador */}
        <div className="flex items-center justify-between">
          <span className="font-hendrix-bold text-gray-800" style={{ fontSize: '10pt' }}>
            Análise de perfil
          </span>
          <span className="font-hendrix-medium text-gray-600" style={{ fontSize: '10pt' }}>
            {currentQuestion} de {totalQuestions}
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{ backgroundColor: '#1655ff', width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' }}
          />
        </div>
      </div>

      {/* Pergunta */}
      <div className="pt-4">
        <h2 className="tituloquest font-hendrix-semibold text-gray-800" style={{ fontSize: '12pt' }}>
          {data.question}
        </h2>
        {data.subtitle && (
          <p className="subtituloquest font-hendrix-light text-gray-600 mt-2" style={{ fontSize: '9pt'}}>
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Alternativas */}
      <div className="space-y-3 pt-2">
        {data.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleAnswerClick(answer.id)}
            className={`w-full p-6 rounded-2xl transition-all duration-300 text-left flex items-center space-x-3 ${
              selectedAnswer === answer.id
                ? 'border-transparent'
                : 'border-[0.5px] border-[#1655ff] hover:border-blue-300 bg-white'
            }`}
            style={
              selectedAnswer === answer.id
                ? {
                    background: 'linear-gradient(90deg, #1655ff 0%, #60a5fa 100%)',
                    color: '#fff',
                    boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)',
                  }
                : {
                    borderWidth: '0.5px',
                    borderColor: '#1655ff',
                  }
            }
            disabled={isLoading}
          >
            {/* Ícone à esquerda */}
            <ChevronRight 
              className="flex-shrink-0" 
              style={{ 
                color: selectedAnswer === answer.id ? '#fff' : '#1655ff',
                fontSize: '11pt'
              }}
              size={25}
            />
            <span 
              className="font-hendrix-medium"
              style={{ 
                fontSize: '11pt', 
                color: selectedAnswer === answer.id ? '#fff' : '#4d4d4d',
                fontWeight: 500
              }}
            >
              {answer.text}
            </span>
          </button>
        ))}

        {/* Botão Confirmar que envia a resposta selecionada */}
        <div className="pt-4">
          <button
            onClick={handleConfirm}
            disabled={!selectedAnswer || isLoading}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-200 ${(!selectedAnswer || isLoading) ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}`}
            style={{
              background: isLoading ? 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)' : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
              fontSize: '10pt'
            }}
          >
            {isLoading ? (
              <>
                Confirmando...
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              'Confirmar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalysisStep;
