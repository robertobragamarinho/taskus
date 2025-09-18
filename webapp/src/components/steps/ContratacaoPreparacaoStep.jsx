import React, { useState } from "react";
import { Loader2 } from 'lucide-react';
// enderecoFormatado: string formatado para exibir o endereço
import '../../styles/refino.css';

const ContratacaoPreparacaoStep = ({ onContinuar, enderecoFormatado }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 2000));
    if (onContinuar) onContinuar();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 pt-8 pb-10">
      <div className="w-full max-w-md mx-auto">
        {/* Código de aprovação */}
        <div className="mb-6 flex justify-start">
          <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
            Código de aprovação: #WST-782411
          </span>
        </div>
        {/* Título */}
        <h1 className="font-hendrix-bold text-3xl text-white mb-4 leading-tight">
          O envio dos equipamentos<br />de trabalho foi emitido
        </h1>
        <p className="font-hendrix-regular text-base text-gray-300 mb-8">
          O envio não possui nenhum custo e será realizado via correios. O envio será feito em até 2 dias após você terminar o treinamento. Você receberá um código de rastreio em seu e-mail para acompanhar a entrega.
        </p>
        {/* Endereço */}
        <h3 className="font-hendrix-bold text-lg text-white mb-1">Endereço de entrega</h3>
        <p className="font-hendrix-semibold text-white text-base mb-10">
          {typeof enderecoFormatado === 'string' ? enderecoFormatado : ''}
        </p>
      </div>
      <div className="w-full max-w-md mx-auto mb-15">
        <button
          type="button"
          className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin mr-2" size={22} />}
          {isLoading ? 'Enviando...' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};

export default ContratacaoPreparacaoStep;
