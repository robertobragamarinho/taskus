import React, { useState } from "react";
import { Loader2 } from 'lucide-react';
import '../../styles/refino.css';

// Importando os componentes de UI reutilizáveis
import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Continuity from "../modules/Continuity";

import { useProcess } from "../../hooks/useProcess.js";

const ContratacaoPreparacaoStep = ({ onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { processData } = useProcess();
  const endereco = processData?.userData?.endereco || {};

  // Função para formatar o endereço completo
  function formatarEnderecoCompleto(endereco) {
    if (!endereco) return '';
    const rua = endereco.rua || '';
    const numero = endereco.numero || '';
    const complemento = endereco.complemento || '';
    const bairro = endereco.bairro || '';
    const cidade = endereco.Cidade || '';
    const estado = endereco.Estado || '';
    let linha1 = rua;
    if (rua && numero) linha1 += `, ${numero}`;
    if (complemento) linha1 += `, ${complemento}`;
    if (bairro) linha1 += `, ${bairro}`;
    let linha2 = cidade;
    if (cidade && estado) linha2 += ` - ${estado}`;
    return [linha1, linha2].filter(Boolean).join(' ');
  }

  const enderecoCompleto = formatarEnderecoCompleto(endereco);

  const handleClick = async () => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 2000));
    if (onContinuar) {
      onContinuar();
    }
  };

  return (
    <div className="min-h-screen bloco_principal">
      <Maintexts>
        <Headlines variant="white">
          O envio dos equipamentos de trabalho foi emitido
        </Headlines>
        <Paragraphs variant="white">
          O envio não possui nenhum custo e será realizado via correios. O envio será feito em até 2 dias após você terminar o treinamento. Você receberá um código de rastreio em seu e-mail para acompanhar a entrega.
        </Paragraphs>
      </Maintexts>

      {/* Seção para exibir o endereço de entrega */}
      <div className="w-full max-w-md mx-auto mt-8">
        <h3 className="aviso font-hendrix-bold text-lg text-white">Endereço de entrega</h3>
        <p className="font-hendrix-regular text-white text-base mt-2">
          {enderecoCompleto || 'Endereço não informado.'}
        </p>
      </div>

      <Continuity
        onClick={handleClick}
        isLoading={isLoading}
        loadingText="Aguarde..."
        text="Continuar"
      />
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
