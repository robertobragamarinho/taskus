/* eslint-disable no-unused-vars */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../styles/refino.css';

const PaymentPasswordStep = ({ onContinuar }) => {
  const [password, setPassword] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    if (!val) return;
    const newPassword = [...password];
    newPassword[idx] = val;
    setPassword(newPassword);
    if (idx < 5 && val) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (password[idx]) {
        const newPassword = [...password];
        newPassword[idx] = '';
        setPassword(newPassword);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const newPassword = [...password];
        newPassword[idx - 1] = '';
        setPassword(newPassword);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setPassword(paste.split(''));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const [loading, setLoading] = useState(false);

  const handleContinuar = async () => {
    if (password.every(d => d)) {
      setLoading(true);
      setTimeout(async () => {
        await onContinuar(password.join(''));
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Título fixo no topo */}
      <div className="w-full px-6 pt-10 pb-2">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-2 text-left" style={{ lineHeight: 1.25 }}>
          Digite uma senha de<br />6 dígitos para sua conta
        </h1>
      </div>
      {/* Campo de senha centralizado verticalmente */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div
          className="flex justify-center items-center space-x-4"
          style={{
            maxWidth: 340,
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 16,
            paddingRight: 16
          }}
        >
          {password.map((digit, idx) => (
            <input
              key={idx}
              ref={el => inputRefs.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-2xl font-hendrix-semibold border-2 border-gray-300 rounded-xl focus:border-orange-500 outline-none bg-transparent"
              style={{ letterSpacing: '2px' }}
            />
          ))}
        </div>
      </div>
      {/* Botão continuar alinhado ao final da tela */}
      <div className="w-full px-6 pb-8">
        <motion.button
          type="button"
          onClick={handleContinuar}
          disabled={!password.every(d => d) || loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-500 hover:bg-orange-600 ${(!password.every(d => d) || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
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
            <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Continuar</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentPasswordStep;
