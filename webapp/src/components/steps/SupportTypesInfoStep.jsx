import '../../styles/refino.css';
import { useEffect } from 'react';

// Ícone 1
const IconPhoneLike = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <path d="M14 3v3m5-1l-2 2m4 3h-3M9.158 5.712l-.402-.906c-.264-.592-.395-.888-.592-1.115a2 2 0 0 0-.928-.603C6.949 3 6.624 3 5.976 3c-.948 0-1.422 0-1.82.182a2.12 2.12 0 0 0-1.061 1.169c-.143.413-.102.838-.02 1.689q1.31 13.575 14.885 14.885c.85.082 1.276.123 1.69-.02a2.12 2.12 0 0 0 1.168-1.06c.182-.399.182-.873.182-1.821c0-.649 0-.973-.088-1.26a2 2 0 0 0-.603-.928c-.227-.197-.523-.328-1.115-.592l-.906-.402c-.642-.285-.962-.428-1.288-.459a2 2 0 0 0-.919.128c-.305.119-.575.343-1.114.793c-.537.447-.805.67-1.133.79a2.16 2.16 0 0 1-.982.101c-.345-.05-.61-.192-1.139-.475c-1.646-.88-2.553-1.787-3.433-3.433c-.283-.53-.424-.794-.475-1.14a2.16 2.16 0 0 1 .1-.98c.12-.329.344-.597.791-1.134c.45-.54.674-.809.793-1.114c.114-.292.158-.607.128-.919c-.031-.325-.174-.646-.459-1.288"/>
  </svg>
);

// Ícone 2
const IconChatLike = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <g color="currentColor">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.379.28 2.693.784 3.888c.279.66.418.99.436 1.24c.017.25-.057.524-.204 1.073L2 22l3.799-1.016c.549-.147.823-.22 1.073-.204c.25.018.58.157 1.24.436A10 10 0 0 0 12 22"/>
      <path d="m8.588 12.377l.871-1.081c.367-.456.82-.88.857-1.488c.008-.153-.1-.841-.315-2.218C9.916 7.049 9.41 7 8.973 7c-.57 0-.855 0-1.138.13c-.358.163-.725.622-.806 1.007c-.064.305-.016.515.079.935c.402 1.783 1.347 3.544 2.811 5.009c1.465 1.464 3.226 2.409 5.01 2.811c.42.095.629.143.934.079c.385-.08.844-.448 1.008-.806c.129-.283.129-.568.129-1.138c0-.438-.049-.943-.59-1.028c-1.377-.216-2.065-.323-2.218-.315c-.607.036-1.032.49-1.488.857l-1.081.87"/>
    </g>
  </svg>
);

// Ícone 3
const IconMailEditLike = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <g color="currentColor">
      <path d="m2 5.5l6.913 3.917c2.549 1.444 3.625 1.444 6.174 0L22 5.5"/>
      <path d="M21.995 10.028c-.065-3.067-.098-4.6-1.23-5.737c-1.131-1.136-2.706-1.175-5.857-1.254a115 115 0 0 0-5.805 0c-3.15.079-4.726.118-5.857 1.254s-1.165 2.67-1.23 5.737a69 69 0 0 0 0 2.953c.065 3.068.098 4.601 1.23 5.737s2.707 1.176 5.857 1.255q.702.017 1.402.027m10.347-6.56l.693.692a1.5 1.5 0 0 1 0 2.121l-3.628 3.696a2 2 0 0 1-1.047.551l-2.248.488a.5.5 0 0 1-.595-.593l.479-2.235c.074-.397.266-.762.551-1.047l3.674-3.674a1.5 1.5 0 0 1 2.121 0"/>
    </g>
  </svg>
);

const SupportTypesInfoStep = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const supportTypes = [
    {
      id: 'phone',
      icon: IconPhoneLike,
      title: 'Atendimento por ligação',
      description:
        'Esse modelo de atendimento é ideal para quem tem facilidade em se comunicar e deseja oferecer suporte direto às pessoas por meio de ligações.'
    },
    {
      id: 'whatsapp',
      icon: IconChatLike,
      title: 'Atendimento por WhatsApp',
      description:
        'Você irá atender os clientes de forma rápida e prática através de mensagens no WhatsApp, oferecendo suporte no dia a dia.'
    },
    {
      id: 'email',
      icon: IconMailEditLike,
      title: 'Atendimento por e-mail',
      description:
        'Você irá responder os clientes por e-mail. Esse modelo de suporte é mais utilizado em situações como devoluções, trocas e solicitações de reembolso.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Título principal */}
      <div className="text-center space-y-3">
        <h1
          className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
          style={{ fontSize: '12pt', lineHeight: '1.2' }}
        >
          <span className="block sm:inline">
            Os atendimentos são realizados em 3 canais de comunicação
          </span>
        </h1>

        <p className="subtitulodaetapa font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
          Ao ser contratado(a), você poderá escolher a área em que tiver mais facilidade para atuar.
        </p>

      </div>

      {/* Cards dos tipos de suporte – layout estilo “Card 1” */}
      <div className="space-y-4">
        {supportTypes.map((type) => (
          <div
            key={type.id}
            className="rounded-2xl px-6 py-5"
            style={{ background: '#f3f6f9', minHeight: 90 }}
          >
            <div className="flex flex-col items-start">
              {/* Ícone */}
              <div className="mb-2">
                <div className="w-[48px] h-[48px] mt-1">
                  <type.icon className="w-10 h-10" style={{ color: '#1655ff' }} />
                </div>
              </div>

              {/* Título */}
              <h3
                className="font-hendrix-semibold mb-2"
                style={{ fontSize: '12pt', color: '#1655ff', textAlign: 'left' }}
              >
                {type.title}
              </h3>

              {/* Descrição */}
              <div className="text-sm text-gray-700" style={{ fontSize: '10pt', textAlign: 'left' }}>
                {type.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTypesInfoStep;