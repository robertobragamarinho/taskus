import { Check } from 'lucide-react';
import '../../styles/refino.css';

const PreferencesStep = () => {
  const benefits = [
    {
      name: 'Vale alimentação',
      value: 'R$450,00 por mês'
    },
    {
      value: '100% pago pela empresa',
      name: 'Plano de saúde - Cobertura nacional'
    },
    {
      value: '100% pago pela empresa',
      name: 'Plano odontológico básico'
    },
    {
      value: 'De Segunda a Sexta-Feira',
      name: 'Trabalho semanal'
    },
    {
      name: '8h por dia',
      value: 'Carga horária'
    },
    {
      name: 'Férias remuneradas',
      value: '1 vez por ano'
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
            Essas são as vantagens exclusivas de trabalhar na VagaCerta
          </span>
        </h1>

        {/* Texto descritivo */}
        <p className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
          Além de um salário digno, você recebe  benefícios essenciais para qualquer trabalhador.
        </p>

      </div>

      {/* Lista de benefícios */}
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 rounded-lg p-4"
            style={{ backgroundColor: '#f9f9f9' }}
          >
            {/* Ícone de check */}
            <div className="flex-shrink-0 mt-1">
              <Check
                className="w-5 h-5 font-medium"
                style={{
                  color: '#1655ff',
                  fontSize: '8pt',
                  fontWeight: '500'
                }}
              />
            </div>

            {/* Conteúdo do benefício */}
            <div className="flex-1">
              <p
                className="font-hendrix-light"
                style={{
                  fontSize: '12pt',
                  color: '#424242'
                }}
              >
                {benefit.name}
              </p>
              <p
                className="font-hendrix-semibold"
                style={{
                  fontSize: '10pt',
                  color: '#1a1a1a'
                }}
              >
                {benefit.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferencesStep;
