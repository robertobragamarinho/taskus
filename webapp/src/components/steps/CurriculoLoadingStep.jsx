import { useEffect, useState } from 'react';
import '../../styles/refino.css';

const CurriculoLoadingStep = ({ seconds = 10, onCountdownFinish }) => {
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
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onCountdownFinish]);

  const elapsed = seconds - remaining;
  const percent = Math.max(0, Math.min(100, Math.round((elapsed / seconds) * 100)));

  return (
    <div className="flex flex-col items-center justify-center min-h-[360px] py-10">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm">
        <div className="text-center">
          <h1 className="tituloinicial font-hendrix-bold text-2xl text-gray-900 leading-tight">
            Carregando próxima etapa...
          </h1>

          <div
            className="subtituloinicial font-hendrix-regular text-base text-gray-600 leading-relaxed max-w-sm mx-auto mt-3"
            style={{ minHeight: '56px' }}
          >
            <p className="transition-opacity duration-300 opacity-100">Aguarde enquanto preparamos tudo para você.</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full"
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
    </div>
  );
};

export default CurriculoLoadingStep;
