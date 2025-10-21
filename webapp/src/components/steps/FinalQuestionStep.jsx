import { useEffect } from 'react';
import '../../styles/refino.css';

const FinalQuestionStep = ({ onCountdownFinish }) => {
  // Deixa o body totalmente branco enquanto este step está ativo
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  // Dispara o finish no menor tempo possível (próximo tick)
  useEffect(() => {
    const id = setTimeout(() => {
      if (typeof onCountdownFinish === 'function') onCountdownFinish();
    }, 0);
    return () => clearTimeout(id);
  }, [onCountdownFinish]);

  // Página totalmente branca e sem conteúdo
  return <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }} />;
};

export default FinalQuestionStep;