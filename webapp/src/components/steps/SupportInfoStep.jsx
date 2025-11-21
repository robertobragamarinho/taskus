const SupportInfoStep = () => {
  const messageTypes = [
    "Informações sobre pedidos e prazos de entrega",
    "Informações sobre produtos ou serviços", 
    "Suporte técnico básico",
    "Reclamações"
  ];

  const routineSteps = [
    "A mensagem do cliente chega no sistema.",
    "Você lê a dúvida e consulta uma resposta pronta.",
    "Copia, ajusta se necessário, e envia.",
    "O atendimento finaliza assim que a dúvida for sanada."
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-4">
          Como são esses atendimentos?
        </h1>
        <p className="font-hendrix-regular text-gray-600 text-sm leading-relaxed mb-6">
          Trabalhamos com atendimento terceirizado. Isso significa que grandes empresas contratam 
          nossa equipe para cuidar da comunicação com os clientes delas.
        </p>
        <p className="font-hendrix-regular text-gray-600 text-sm leading-relaxed mb-6">
          Você vai receber mensagens de clientes sobre:
        </p>
      </div>

      {/* Lista de tipos de mensagens */}
      <div className="space-y-3 mb-8">
        {messageTypes.map((message, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <p className="font-hendrix-regular text-sm text-gray-700">
              {message}
            </p>
          </div>
        ))}
      </div>

      {/* Rotina de trabalho */}
      <div className="mb-6">
        <h2 className="font-hendrix-semibold text-lg text-gray-900 mb-4">
          Sua rotina será assim:
        </h2>
        
        <div className="space-y-4">
          {routineSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-hendrix-semibold">
                {index + 1}
              </div>
              <p className="font-hendrix-regular text-sm text-gray-700 leading-relaxed pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportInfoStep;
