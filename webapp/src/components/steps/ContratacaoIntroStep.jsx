import React, { useMemo } from "react";
import { useProcess } from '@/hooks/useProcess.js';
import '../../styles/refino.css';

import logoTaskUs from '../../assets/logo-min.webp';

import { useState } from 'react';

const ContratacaoIntroStep = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Dados do contexto
  const { processData } = useProcess();
  const userData = processData?.userData || {};
  // Monta nome do usuário a partir do contexto (fullName, ou firstName + lastName)
  const nome = useMemo(() => {
    if (userData.fullName) return userData.fullName;
    if (userData.firstName && userData.lastName) return `${userData.firstName} ${userData.lastName}`;
    if (userData.firstName) return userData.firstName;
    return "Candidato";
  }, [userData]);
  const codigoAprovacao = "#WST-782411";
  const totalCandidatos = 217;

  return (
    // Card principal
    <div className="w-full min-h-screen max-w-md bg-[#222426] px-5 flex flex-col items-center mt-5">
      {/* Código de aprovação */}
      <div className="mb-4 w-full flex justify-start mb-5">
        <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
          Código de aprovação: {codigoAprovacao}
        </span>
      </div>

      {/* Título */}
      <h1 className="font-hendrix-bold text-2xl text-white mb-2 leading-tight text-left w-full mb-5">
        Parabéns! {nome}, você foi selecionado(a) para trabalhar aqui na TASKUS
      </h1>
      <p className="font-hendrix-regular text-base text-gray-200 mb-10 text-left w-full">
        Você foi selecionado entre  <span className="font-hendrix-bold text-white">{totalCandidatos} candidatos</span> com melhor desempenho e perfil para a vaga.
      </p>

      {/* Card colorido */}
      <div className="w-full flex justify-center mb-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-start w-[320px]">
          <div className="flex items-center mb-2">
            <img src={logoTaskUs} alt="TaskUs" className="w-15 mr-2" />
          </div>
          <span className="font-hendrix-bold text-lg text-[#181A1B] mb-1">{nome}</span>
          <span className="font-hendrix-regular text-xs text-[#0ecb7b] mb-2">Suporte ao cliente</span>
          {/* Card colorido fake */}
          <div className="flex gap-2 mt-2">
            <span className="inline-block w-8 h-8 rounded-full" style={{ background: '#f43f5e' }}></span>
            <span className="inline-block w-8 h-8 rounded-full" style={{ background: '#fde047' }}></span>
            <span className="inline-block w-8 h-8 rounded-full" style={{ background: '#2563eb' }}></span>
          </div>
        </div>
      </div>

      {/* Etapas */}
      <div className="w-full mb-6">
        <h2 className="font-hendrix-bold text-lg text-white mb-4 text-left">
          Confira os próximos passos para oficializar sua contratação.
        </h2>
        <ol className="list-decimal ml-5 text-left">
          <li className="font-hendrix-regular text-base text-gray-200 mb-3">
            Vamos validar suas informações para registrar sua contratação corretamente.
          </li>
          <li className="font-hendrix-regular text-base text-gray-200 mb-3">
            Você fará o treinamento inicial obrigatório da TaskUs, que garante seu certificado de capacitação.
          </li>
          <li className="font-hendrix-regular text-base text-gray-200 mb-3">
            Após o treinamento, seu gerente de equipe entrará em contato para alinhar os últimos detalhes da contratação.
          </li>
        </ol>
      </div>
      <button
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-medium text-white text-base shadow-lg hover:from-blue-600 hover:to-blue-500 transition flex items-center justify-center"
        onClick={async () => {
          setIsLoading(true);
          try {
            await onStart();
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
      >
        {isLoading && (
          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        {isLoading ? 'Aguarde...' : 'Ir para contratação'}
      </button>
    </div>
  );
};

export default ContratacaoIntroStep;
