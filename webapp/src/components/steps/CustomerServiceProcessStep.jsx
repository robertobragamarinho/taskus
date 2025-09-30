import { useEffect } from 'react';

const CustomerServiceProcessStep = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
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
        <p
          className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-6"
          style={{ fontSize: '9pt' }}
        >
          Empresas como Amazon, Shopee e Netshoes têm uma alta demanda de suporte ao cliente, por isso para manter a qualidade e não deixar clientes sem resposta, elas contratam a TaskUs como parceira especializada.
        </p>

        {/* Subtítulo */}
        <p
          className="textocontinuidade font-hendrix-medium text-gray-600 mb-4"
          style={{ fontSize: '9pt' }}
        >
          Você vai receber mensagens de clientes sobre:
        </p>
      </div>

      {/* Lista de tipos de atendimento */}
      <div className="space-y-3 mb-6">
        {serviceTypes.map((type, index) => (
          <div
            key={index}
            className="rounded-lg p-2 flex items-center gap-2"
            style={{ backgroundColor: '#f3f6f9' }}
          >
            {/* Ícone */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-500 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 12H8m8 0c0 .7-1.994 2.008-2.5 2.5M16 12c0-.7-1.994-2.008-2.5-2.5" />
            </svg>

            {/* Texto */}
            <p
              className="font-hendrix-light"
              style={{ fontSize: '12pt', color: '#000' }}
            >
              {type}
            </p>
          </div>
        ))}
      </div>

      {/* Título da rotina */}
      <div className="mb-4">
        <h2
          className="textocontinuidade font-hendrix-medium mt-10 text-gray-600"
          style={{ fontSize: '9pt' }}
        >
          Sua rotina será assim:
        </h2>
      </div>

      {/* Lista da rotina com o mesmo ícone */}
      <div className="space-y-3">
  {routineSteps.map((step, index) => (
    <div
      key={index}
      className="rounded-lg p-2 flex items-start gap-2"  // <-- troquei para items-start
      style={{ backgroundColor: '#f3f6f9' }}
    >
      {/* Ícone */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" // opcional: mt-0.5 dá um leve respiro
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 12H8m8 0c0 .7-1.994 2.008-2.5 2.5M16 12c0-.7-1.994-2.008-2.5-2.5" />
      </svg>

      {/* Texto */}
      <p
        className="font-hendrix-light flex-1"
        style={{ fontSize: '12pt', color: '#000' }}
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