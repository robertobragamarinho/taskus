import { useEffect } from 'react';
import '../../styles/refino.css';

const LoadingFinalizarCurriculo = ({ seconds = 0.8, onCountdownFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onCountdownFinish === 'function') onCountdownFinish();
    }, seconds * 10);

    return () => clearTimeout(timer);
  }, [seconds, onCountdownFinish]);

  return (
    <div
      className="fixed inset-0 bg-white"
      style={{ zIndex: 9999 }}
    />
  );
};

export default LoadingFinalizarCurriculo;