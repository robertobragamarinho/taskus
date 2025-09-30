import { useEffect, useState } from 'react';
import '../../styles/refino.css';

const LastAnswerLoadingStep = ({ seconds = 15, onFinish }) => {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const timer = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (typeof onFinish === 'function') onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onFinish]);

  const elapsed = seconds - remaining;
  const percent = Math.max(0, Math.min(100, Math.round((elapsed / seconds) * 100)));

  // Mensagens que serão exibidas a cada 25%
  const mensagens = [
    'Registrando suas respostas no sistema da TaskUs…',
    'Vinculando ao seu perfil…',
    'Enviando respostas a equipe de RH...',
    'Registrado com sucesso.'
  ];

  // Determina índice da mensagem atual com base no percent (cada 25%)
  const mensagemIndex = Math.min(3, Math.floor(percent / 25));
  const mensagemAtual = mensagens[mensagemIndex];

  return (
    <div className="mt-10 max-w-md bg-white ">
        <div className="text-center">
           <div className="flex justify-center">
    <lord-icon
      src="https://cdn.lordicon.com/wpequvda.json"
      trigger="loop"
      delay="2000"
      colors="primary:#110a5c"
      style={{ width: "100px", height: "100px" }}
    >
    </lord-icon>
  </div>
          <h1 className="ttcarregamento font-hendrix-semibold text-xl text-gray-800">
            Teste prático concluído
          </h1>

          <div
            className="subtituloinicial font-hendrix-regular text-base text-gray-600 leading-relaxed max-w-sm mx-auto mt-3"
            style={{ minHeight: '56px' }}
          >
            <p  className="ttsub font-hendrix-regular text-gray-600"
    style={{ fontSize: "9pt" }}>Estamos registrando suas respostas em nosso sistema, para que a equipe de RH faça a análise.</p>
          </div>
        </div>

        <div className="mt-8 mb-10">
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5  rounded-full"
              style={{
                width: `${percent}%`,
                background: 'linear-gradient(135deg, #1655ff 0%, #60a5fa 100%)',
                transition: 'width 0.9s linear'
              }}
            />
          </div>

          <div className="text-center mt-3">
            <span className="font-hendrix-medium text-gray-600" style={{ fontSize: '10pt' }}>{percent}%</span>
          </div>
        </div>
      </div>
  );
};

export default LastAnswerLoadingStep;
