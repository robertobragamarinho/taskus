import { useState, useEffect } from 'react';
import '../../styles/refino.css';

const LoadingStep = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  // Total loading duration in milliseconds (2 seconds)
  const totalDurationMs = 2000;
  const [timeRemaining, setTimeRemaining] = useState(Math.ceil(totalDurationMs / 1000));

  // Mensagens rotativas
  const messages = [
    "Estamos contratando pessoas comprometidas, com vontade de crescer, e que estejam prontas para mudar de vida através do trabalho.",
    "Reserve de 5 a 10 minutos agora para completar o processo seletivo. Ao final, você saberá se foi aprovado(a) para dar início imediato.",
    "Durante as etapas, você vai entender como funciona o trabalho, o que será oferecido e quais são os passos obrigatórios até a contratação final.",
    "Você está prestes a dar o primeiro passo rumo a uma nova fase da sua vida."
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Barra de progresso (mantido como no seu código)
  useEffect(() => {
    // We'll update the progress smoothly to reach 100% in totalDurationMs.
    const interval = 50; // ms between ticks for smooth animation
    const increment = (interval / totalDurationMs) * 100; // percent per tick

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(100, prev + increment);

        // remaining milliseconds = fraction of totalDurationMs
        const remainingMs = (100 - newProgress) * (totalDurationMs / 100);
        const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
        setTimeRemaining(remainingSeconds);

        if (newProgress >= 100) {
          clearInterval(timer);
          // small delay before signalling completion to allow UI to update
          setTimeout(() => onComplete(), 200);
          return 100;
        }

        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, totalDurationMs]);

  // Rotaciona mensagens a cada 5s com fade
  useEffect(() => {
    const intervalMs = 8000;
    const fadeMs = 400;

    const rotator = setInterval(() => {
      setFadeIn(false); // fade-out
      const t = setTimeout(() => {
        setMsgIndex(i => (i + 1) % messages.length); // troca texto
        setFadeIn(true); // fade-in
      }, fadeMs);
      return () => clearTimeout(t);
    }, intervalMs);

    return () => clearInterval(rotator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Formata tempo MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-5 px-3 py-10">
      {/* Título principal */}
      <div className="text-center space-y-5">

        <h1
          className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
          style={{ fontSize: '12pt', lineHeight: '1.2' }}
        >
          <span className="block sm:inline">
            Processo seletivo TaskUs Brasil 2025
          </span>
        </h1>

        {/* Bloco com ALTURA PADRÃO para o texto rotativo */}
        <div
          className="subtituloinicial font-hendrix-regular text-base text-gray-600 leading-relaxed max-w-sm transition-opacity duration-500
                     flex items-center justify-center text-center"
          style={{ minHeight: '126px' }} // ~6 linhas em base 16px; ajuste se quiser
        >
          <p
            className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            key={msgIndex}
          >
            {messages[msgIndex]}
          </p>
        </div>
      </div>

      {/* Espaçamento */}
      <div className="flex-1" />

      {/* Seção da barra de progresso */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-hendrix-medium text-sm text-gray-700">
            Você está na fila
          </span>
          <span className="font-hendrix-regular text-sm text-gray-500">
            Tempo estimado {formatTime(timeRemaining)}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)'
            }}
          />
        </div>
      </div>

      {/* Espaçamento */}
      <div className="flex-1" />

      {/* Aviso */}
      <div className="text-center">
        <p className="textocontinuidadeinicial font-hendrix-regular text-sm text-gray-500 leading-relaxed">
          Assim que chegar sua vez você será <span className="font-hendrix-semibold text-gray-700">direcionado(a) para iniciar o processo seletivo online.</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingStep;