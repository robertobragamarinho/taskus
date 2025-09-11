/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import '../../styles/refino.css';
import { motion } from 'framer-motion';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';

const PaymentConfirmDataStep = ({ onConfirmar, setNumbPhone, setUserName }) => {
  const { processData, updateUserData, registerUser } = useContext(ProcessContext);
  const userData = processData?.userData || {};

  const [form, setForm] = useState({
    nomeCompleto: userData.nome || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
    cpf: userData.cpf || '',
    telefone: userData.phone || '',
    email: userData.email || '',
  });

  // Função para formatar CPF
  function formatarCPF(valor) {
    const digits = valor.replace(/\D/g, '').slice(0, 11);
    let cpfFormatado = digits;
    if (digits.length > 3) cpfFormatado = digits.slice(0, 3) + '.' + digits.slice(3);
    if (digits.length > 6) cpfFormatado = cpfFormatado.slice(0, 7) + '.' + cpfFormatado.slice(7);
    if (digits.length > 9) cpfFormatado = cpfFormatado.slice(0, 11) + '-' + cpfFormatado.slice(11);
    return cpfFormatado;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf') {
      setForm(prev => ({ ...prev, cpf: formatarCPF(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const [loading, setLoading] = useState(false);

  const handleConfirmar = async () => {
    setLoading(true);
    updateUserData(form);
    setNumbPhone(form.telefone);
    setUserName(form.nomeCompleto);
    await registerUser(form);
    setTimeout(async () => {
      if (onConfirmar) await onConfirmar(form);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col justify-start px-6 pt-10">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-6" style={{ lineHeight: 1.25 }}>
          Confirme seus dados para<br />criação da conta salário
        </h1>
        <div className="space-y-7">
          <div>
            <label className="block font-hendrix-medium text-xs text-gray-400 mb-1" style={{ letterSpacing: 0.5 }}>Nome completo</label>
            <input
              name="nomeCompleto"
              value={form.nomeCompleto}
              onChange={handleChange}
              className="font-hendrix-regular text-lg text-gray-900 border-b border-gray-300 pb-2 w-full outline-none bg-transparent"
              autoComplete="name"
              type="text"
            />
          </div>
          <div>
            <label className="block font-hendrix-medium text-xs text-gray-400 mb-1" style={{ letterSpacing: 0.5 }}>CPF</label>
            <input
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              className="font-hendrix-regular text-lg text-gray-900 border-b border-gray-300 pb-2 w-full outline-none bg-transparent"
              autoComplete="off"
              type="text"
              maxLength={14}
            />
          </div>
          <div>
            <label className="block font-hendrix-medium text-xs text-gray-400 mb-1" style={{ letterSpacing: 0.5 }}>Celular</label>
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="font-hendrix-regular text-lg text-gray-900 border-b border-gray-300 pb-2 w-full outline-none bg-transparent"
              autoComplete="tel"
              type="text"
              maxLength={20}
            />
          </div>
          <div>
            <label className="block font-hendrix-medium text-xs text-gray-400 mb-1" style={{ letterSpacing: 0.5 }}>E-mail</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="font-hendrix-regular text-lg text-gray-900 border-b border-gray-300 pb-2 w-full outline-none bg-transparent"
              autoComplete="email"
              type="email"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-6 pb-8 pt-10">
        <motion.button
          type="button"
          onClick={handleConfirmar}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-500 hover:bg-orange-600 ${loading ? 'cursor-not-allowed' : ''}`}
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
            <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Confirmar informações</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentConfirmDataStep;
