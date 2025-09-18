import { Check } from 'lucide-react';
import '../../styles/refino.css';

const IniciaProcessoSeletivo = () => {
  const resources = [
    {
      title: 'O que faz um atendente de suporte',
      description: ''
    },
    {
      title: 'Como funciona a rotina de trabalho',
      description: ''
    },
    {
      title: 'Benefícios de trabalhar com a TaskUs',
      description: ''
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
            Bem-vindo(a) ao processo seletivo online da TaskUs!
          </span>
        </h1>

        {/* Primeira descrição */}
        <p className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-3" >
          Em poucos minutos você vai saber se essa vaga é realmente para você
        </p>

        {/* Segunda descrição */}
        <p className="textocontinuidade font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
          Você verá agora:
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

export default IniciaProcessoSeletivo;
