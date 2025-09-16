const CustomerServiceProcessStep = () => {
  const serviceTypes = [
    'Pedidos com atraso',
    'Trocas ou devoluções',
    'Cancelamentos',
    'Informações sobre produtos'
  ];

  const routineSteps = [
    'A mensagem do cliente chega no sistema.',
    'Você lê a dúvida e consulta uma resposta pronta.',
    'Copia, ajusta (se precisar) e envia ao cliente.',
    'O atendimento finaliza assim que que o problema for resolvido.'
  ];

  return (
    <div className="space-y-6">
      {/* Título principal */}
      <div className="mb-6">

        <h1
          className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
          style={{ fontSize: '12pt', lineHeight: '1.2' }}
        >
          <span className="block sm:inline">
            Como funcionam os atendimentos?
          </span>
        </h1>

        {/* Texto descritivo */}
        <p className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
          Empresas como Amazon, Shopee e Netshoes tem uma alta demanda de suporte ao cliente, por isso para manter a qualidade e não deixar clientes sem resposta, elas contratam a TaskUs como parceira especializada.
        </p>

        {/* Subtítulo */}
        <p className="textocontinuidade font-hendrix-semibold text-gray-600 mb-4" style={{ fontSize: '9pt' }}>
          Você vai receber mensagens de clientes sobre:
        </p>
      </div>

      {/* Lista de tipos de atendimento */}
      <div className="space-y-3 mb-6">
        {serviceTypes.map((type, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <p
              className="font-hendrix-light"
              style={{
                fontSize: '12pt',
                color: '#969696'
              }}
            >
              {type}
            </p>
          </div>
        ))}
      </div>

      {/* Título da rotina */}
      <div className="mb-4">
        <h2 className="textocontinuidade font-hendrix-semibold text-gray-900" style={{ fontSize: '9pt' }}>
          Sua rotina será assim:
        </h2>
      </div>

      {/* Lista numerada da rotina */}
      <div className="space-y-3">
        {routineSteps.map((step, index) => (
          <div key={index} className="flex items-start space-x-3">
            {/* Número */}
            <span
              className="font-hendrix-medium flex-shrink-0"
              style={{
                fontSize: '14pt',
                color: '#1655ff'
              }}
            >
              {index + 1}.
            </span>

            {/* Texto */}
            <p
              className="font-hendrix-light flex-1"
              style={{
                fontSize: '12pt',
                color: '#969696'
              }}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerServiceProcessStep;
