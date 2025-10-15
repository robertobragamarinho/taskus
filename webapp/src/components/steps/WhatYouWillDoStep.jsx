import { Check } from 'lucide-react';
import '../../styles/refino.css';

const WhatYouWillDoStep = () => {
  const resources = [
    {
      title: 'Sistema do Colaborador',
      description: 'Esse sistema é uma das suas principais ferramentas de trabalho, é nele que você  poderá atender os clientes, visualizar suas tarefas  e acompanhar metas.'
    },
    {
      title: 'Roteiros Prontos',
      description: 'Dentro do sistema, você terá acesso a roteiros de atendimento prontos e organizados para as perguntas e dúvidas mais comuns dos clientes.'
    },
    {
      title: 'Gerente de Equipe',
      description: 'Em caso de dificuldade, você poderá entrar em contato com o seu gerente de equipe. Ele sempre estará disponível para te ajudar caso você precise.'
    }
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
            O que faz um atendente de suporte ao cliente?
          </span>
        </h1>

        {/* Primeira descrição */}
        <p className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-3" >
          Como atendente, você será o responsável por ajudar os clientes das empresas parceiras da VagaCerta a resolver problemas e esclarecer dúvidas.
        </p>

        {/* Segunda descrição */}
        <p className="textocontinuidade font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
          O trabalho é simples, e você não precisa se preocupar em “saber tudo”, Pois você terá acesso a:
        </p>
      </div>

      {/* Lista de recursos com checkmarks */}
      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div key={index} className="flex items-start space-x-3">
            {/* Ícone de check */}
            <div className="flex-shrink-0 mt-1">
              <Check
                className="w-5 h-5"
                style={{ color: '#1655ff' }}
              />
            </div>

            {/* Conteúdo */}
            <div className="flex-1">
              <h3
                className="font-hendrix-medium mb-2"
                style={{
                  fontSize: '12pt',
                  color: '#424242'
                }}
              >
                {resource.title}
              </h3>
              <p
                className="font-hendrix-regular leading-relaxed"
                style={{
                  fontSize: '11pt',
                  lineHeight: '4vw',
                  marginTop: '-2vw',
                  color: '#969696'
                }}
              >
                {resource.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouWillDoStep;
