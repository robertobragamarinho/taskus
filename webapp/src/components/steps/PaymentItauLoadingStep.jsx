import { useEffect } from 'react';
import '../../styles/refino.css';
import ItauLogo from '../../assets/itau_logo-min.webp';

const PaymentItauLoadingStep = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Automaticamente avançar após 5 segundos
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' }}
    >
      {/* Logo do Itaú */}
      <div className="flex flex-col items-center space-y-6">
        {/* Container do logo */}
        <div className="">
          <img
            className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] h-auto"
            src={ItauLogo}
            alt="Itaú Logo"
          />
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center mt-20">
          <div
            className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"
            style={{ borderWidth: '3px' }}
          ></div>
        </div>

      </div>
    </div>
  );
};

export default PaymentItauLoadingStep;
