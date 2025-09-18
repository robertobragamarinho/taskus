import { Phone, MessageCircle, Mail } from 'lucide-react';
import '../../styles/refino.css';

const SupportTypesInfoStep = () => {
  const supportTypes = [
    {
      id: 'phone',
      icon: Phone,
      title: 'Atendimento por ligação',
      description: 'Esse modelo de atendimento é ideal para quem tem facilidade em se comunicar e deseja oferecer suporte direto às pessoas por meio de ligações.'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'Atendimento por WhatsApp',
      description: 'Você irá atender os clientes de forma rápida e prática através de mensagens no WhatsApp, oferecendo suporte no dia a dia.'
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Atendimento por e-mail',
      description: 'Você irá responder os clientes por e-mail. Esse modelo de suporte é mais utilizado em situações como devoluções, trocas e solicitações de reembolso.'
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
            São 3 áreas de atendimento disponíveis.
          </span>
        </h1>


        <p className="subtitulodaetapa font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
          Quando você for contratado(a),  poderá escolher qual das 3 áreas quer trabalhar.
        </p>
        <p className="textocontinuidade font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
          Veja abaixo como funciona:
        </p>
      </div>

      {/* Cards dos tipos de suporte */}
      <div className="space-y-4">
        {supportTypes.map((type) => (
          <div
            key={type.id}
            className="p-4 rounded-2xl border border-gray-200"
            style={{ backgroundColor: '#f3f3f3' }}
          >
            <div className="flex items-start space-x-3">
              {/* Ícone */}
              <div className="flex-shrink-0 mt-1">
                <type.icon
                  className="w-6 h-6"
                  style={{ color: '#1655ff' }}
                />
              </div>

              {/* Conteúdo */}
              <div className="flex-1 space-y-2">
                <h3
                  className="font-hendrix-semibold"
                  style={{
                    fontSize: '10pt',
                    color: '#1655ff'
                  }}
                >
                  {type.title}
                </h3>
                <p
                  className="font-hendrix-light leading-relaxed"
                  style={{
                    fontSize: '8pt',
                    color: '#969696'
                  }}
                >
                  {type.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTypesInfoStep;
