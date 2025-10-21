import { useEffect } from 'react';
import '../../styles/refino.css';

const CurriculoLoadingStep = ({ onCountdownFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onCountdownFinish === 'function') onCountdownFinish();
    }, 80); // menos de 1 segundo (0.8s)
    return () => clearTimeout(timer);
  }, [onCountdownFinish]);

  return (
    <div className="w-full h-screen bg-white transition-all duration-300" />
  );
};

export default CurriculoLoadingStep;