import { useEffect, useState } from 'react';
import '../../styles/refino.css';

const LoadingFinalizarCurriculo = ({ seconds = 30, onCountdownFinish }) => {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const timer = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (typeof onCountdownFinish === 'function') onCountdownFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [seconds, onCountdownFinish]);

  const elapsed = seconds - remaining;
  const percent = Math.max(0, Math.min(100, Math.round((elapsed / seconds) * 100)));

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
          Parabéns, você concluiu o currículo
        </h1>

        <div
          className="subtituloinicial font-hendrix-regular text-base text-gray-600 leading-relaxed max-w-sm mx-auto mt-3"
          style={{ minHeight: '56px' }}
        >
          <p className="ttsub font-hendrix-regular text-gray-600"
            style={{ fontSize: "9pt" }}>
            Estamos reunindo todas as informações, a equipe de RH já está analisando sua entrevista.
          </p>
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

export default LoadingFinalizarCurriculo;
