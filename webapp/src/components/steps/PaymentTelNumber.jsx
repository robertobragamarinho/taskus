/* eslint-disable no-unused-vars */


import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../styles/refino.css';
import { useProcess } from '../../hooks/useProcess.js';

import { backendAPI } from '../../services/backendAPIService.js';

// Função para gerar 4 códigos aleatórios de 6 dígitos
function gerarCodigosAleatorios() {
  const codigos = [];
  for (let i = 0; i < 4; i++) {
    codigos.push(Math.floor(100000 + Math.random() * 900000).toString());
  }
  return codigos;
}

const PaymentTelNumber = ({ onContinuar, telefoneUsuarioProp }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const [codigoEnviado, setCodigoEnviado] = useState('');
  const [codigosAleatorios] = useState(gerarCodigosAleatorios());

  const { processData } = useProcess();



  // Recupera o telefone do usuário da prop ou do localStorage/context
  useEffect(() => {
    let telefoneUsuario = telefoneUsuarioProp || '';


    console.log('Telefone do usuário para envio do código:', telefoneUsuario);


    if (!telefoneUsuario) {
      try {
        const processData = JSON.parse(localStorage.getItem('processData'));
        telefoneUsuario = processData?.userData?.phone || '';
      } catch {
        console.error('Erro ao recuperar telefone do usuário');
      }
    }

    // Seleciona um dos códigos aleatórios
    const idx = Math.floor(Math.random() * codigosAleatorios.length);
    const codigo = codigosAleatorios[idx];
    setCodigoEnviado(codigo);

    // Chama API de envio de SMS
    async function enviarSMS() {
      // Substitua pela sua API real
      await fetch('/api/enviar-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefone: telefoneUsuario, codigo })
      });
    }
    enviarSMS();
  }, [telefoneUsuarioProp, codigosAleatorios]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    // Gera código aleatório de 6 dígitos
    const codigoEmail = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoEnviado(codigoEmail);

    const confirmaEmail = async () => {
      try {
        const email = processData.userData.email;
        await backendAPI.confirmEmail(email, codigoEmail);
        console.log('✅ E-mail de confirmação enviado para:', email, 'com código:', codigoEmail);
      } catch (error) {
        console.error('❌ Erro ao enviar e-mail de confirmação:', error);
      }
    };

    confirmaEmail();
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    if (!val) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    // Foca no próximo campo
    if (idx < 5 && val) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (code[idx]) {
        const newCode = [...code];
        newCode[idx] = '';
        setCode(newCode);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const newCode = [...code];
        newCode[idx - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setCode(paste.split(''));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const [loading, setLoading] = useState(false);
  const [codigoInvalido, setCodigoInvalido] = useState(false);

  const handleConfirmar = async () => {
    const codigoDigitado = code.join('');
    if (code.every(d => d)) {
      if (codigoDigitado === codigoEnviado) {
        setCodigoInvalido(false);
        setLoading(true);
        setTimeout(async () => {
          await onContinuar(codigoDigitado);
          setLoading(false);
        }, 1000);
      } else {
        setCodigoInvalido(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Título e subtítulo fixos no topo */}
      <div className="w-full px-6 pt-10 pb-2">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-2 text-left" style={{ lineHeight: 1.25 }}>
          Confirme seu endereço de e-mail para continuar
        </h1>
        <p className="font-hendrix-regular text-gray-500 text-base mb-2 text-left">
          Enviamos um código de 6 dígitos por e-mail para você, por favor confira o recebimento e digite o código abaixo.
        </p>
      </div>
      {/* Centraliza campo de código e reenviar verticalmente */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="flex justify-center items-center space-x-4 mb-6">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={el => inputRefs.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => {
                handleChange(e, idx);
                setCodigoInvalido(false);
              }}
              onKeyDown={e => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-2xl font-hendrix-semibold border-b-2 border-gray-300 focus:border-orange-500 outline-none bg-transparent"
              style={{ letterSpacing: '2px' }}
            />
          ))}
        </div>
        {codigoInvalido && (
          <div className="text-red-600 font-hendrix-medium text-sm mb-2 text-center">O código informado não coincide. Tente novamente.</div>
        )}
        <div className="text-center text-gray-500 text-sm mb-10">
          {timer > 0 ? (
            <>Reenviar (Aguarde 0:{timer.toString().padStart(2, '0')})</>
          ) : (
            <button
              type="button"
              className="text-orange-500 font-hendrix-semibold underline hover:text-orange-600 transition"
              onClick={() => setTimer(30)}
            >
              Reenviar
            </button>
          )}
        </div>
      </div>
      {/* Botão continuar alinhado ao final da tela */}
      <div className="w-full px-6 pb-8">
        <motion.button
          type="button"
          onClick={handleConfirmar}
          disabled={!code.every(d => d) || loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-500 hover:bg-orange-600 ${(!code.every(d => d) || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
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
            <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Confirmar</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentTelNumber;
