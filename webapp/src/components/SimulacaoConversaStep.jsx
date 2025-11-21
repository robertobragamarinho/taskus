/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const SimulacaoConversaStep = ({
  conversaData,
  onResposta,
  isLoading,
  fotoReferencia,
  total,
  currentIndex,
  // fallback caso alguma conversa não tenha tituloPergunta
  tituloPergunta = "Qual resposta você usaria?"
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  if (!conversaData) return null;

  const { cliente, mensagemCliente, urgente, opcoes } = conversaData;

  const handleSelectOption = (opcao) => {
    if (isLoading) return;
    setSelectedOptionId(opcao.id);
    // envia para o pai o id e o texto da opção escolhida
    onResposta(opcao.id, opcao.texto);
  };

  return (
    <div className="space-y-5">
      {/* Header de progresso */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-[3vw] sm:text-xs text-gray-500">
          Pergunta {currentIndex} de {total}
        </div>

        {urgente && (
          <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[3vw] sm:text-[11px] font-medium text-red-600 border border-red-100">
            Urgente
          </span>
        )}
      </div>

      {/* Card do cliente */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {fotoReferencia && (
            <img
              src={fotoReferencia}
              alt={cliente?.nome || "Cliente"}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[3.4vw] sm:text-sm font-semibold text-gray-900">
            {cliente?.nome}
          </span>
          <span className="text-[3vw] sm:text-xs text-gray-500">
            {cliente?.id}
          </span>
        </div>
      </div>

      {/* Mensagem do cliente */}
      <div className="mt-2">
        <div className="inline-block max-w-full rounded-2xl bg-gray-100 px-4 py-3">
          <p className="text-[3.4vw] sm:text-sm text-gray-800 leading-snug">
            {mensagemCliente}
          </p>
        </div>
      </div>

      {/* Título dinâmico da pergunta */}
      <div className="mt-4">
        <h2 className="text-[3.6vw] sm:text-base font-semibold text-gray-900 mb-2">
          {tituloPergunta}
        </h2>
        <p className="text-[3vw] sm:text-xs text-gray-500">
          Escolha abaixo a alternativa que você considera mais adequada.
        </p>
      </div>

      {/* Opções de resposta */}
      <div className="mt-3 space-y-3">
        {opcoes?.map((opcao) => (
          <button
            key={opcao.id}
            type="button"
            onClick={() => handleSelectOption(opcao)}
            disabled={isLoading}
            className={[
              "w-full text-left rounded-2xl border px-4 py-3 transition-all",
              "text-[3.4vw] sm:text-sm leading-snug",
              selectedOptionId === opcao.id
                ? "border-[#1d71f7] bg-[#e5efff] shadow-sm"
                : "border-gray-200 bg-white hover:border-[#1d71f7]/70 hover:bg-[#f5f7ff]",
              isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            ].join(" ")}
          >
            <span className="block text-gray-800">{opcao.texto}</span>
          </button>
        ))}
      </div>

      {/* Rodapé */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[2.8vw] sm:text-[11px] text-gray-400">
          Suas respostas ajudam a avaliar seu perfil de atendimento.
        </span>

        {isLoading && (
          <span className="text-[2.8vw] sm:text-[11px] text-[#1d71f7]">
            Salvando resposta...
          </span>
        )}
      </div>
    </div>
  );
};

export default SimulacaoConversaStep;