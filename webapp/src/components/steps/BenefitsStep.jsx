import '../../styles/refino.css';
import { useEffect } from 'react';

// Ícones customizados
const Icon1 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
       {...props}>
    <path d="M17 13.23s-.91-.46-1.818-.46c-1.364 0-3.182 1.845-3.182 4.615C12 20.154 14.49 22 17 22s5-1.846 5-4.615s-1.818-4.616-3.182-4.616c-.909 0-1.818.462-1.818.462m0 0c0-1.384.91-3.23 2.727-3.23M10.655 5c.896 0 1.623-.672 1.623-1.5S11.55 2 10.655 2h-5.41c-.896 0-1.622.672-1.622 1.5S4.349 5 5.246 5m5.923-.077c.956 1.766 1.74 3.36 2.22 5.077q.059.21.111.423M10.428 22h-4.1C2.747 22 2 21.31 2 18v-4.223c0-3.4 1.098-5.891 2.705-8.862"/>
  </svg>
);

const Icon2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
       {...props}>
    <g color="currentColor">
      <path d="M8.396 2.552c1.474-.914 2.762-.546 3.535.041c.317.24.476.36.569.36s.252-.12.569-.36c.773-.587 2.06-.955 3.535-.041c1.936 1.2 2.374 5.156-2.09 8.494c-.851.636-1.276.954-2.014.954s-1.163-.318-2.013-.954C6.022 7.708 6.46 3.751 8.396 2.552M4 14h2.395c.294 0 .584.066.847.194l2.042.988c.263.127.553.193.848.193h1.042c1.008 0 1.826.791 1.826 1.767c0 .04-.027.074-.066.085l-2.541.703a1.95 1.95 0 0 1-1.368-.124L6.842 16.75"/>
      <path d="m13 16.5l4.593-1.411a1.985 1.985 0 0 1 2.204.753c.369.51.219 1.242-.319 1.552l-7.515 4.337a2 2 0 0 1-1.568.187L4 20.02"/>
    </g>
  </svg>
);

const Icon3 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
       {...props}>
    <g color="currentColor">
      <path d="M6.5 3.5h-2a1 1 0 0 0-1 1V8a5.5 5.5 0 1 0 11 0V4.5a1 1 0 0 0-1-1h-2"/>
      <path d="M18.5 15.5v1.25a4.75 4.75 0 1 1-9.5 0V13.5m2.5-11v2m-5-2v2"/>
      <path d="M20.5 13.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/>
    </g>
  </svg>
);

const Icon4 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
       {...props}>
    <g color="currentColor">
      <path d="M2.58 8.625c-.071-.59-.106-.885-.057-1.126c.142-.689.748-1.247 1.556-1.434C4.362 6 4.717 6 5.428 6h13.144c.711 0 1.066 0 1.35.065c.807.187 1.413.745 1.555 1.434c.05.241.014.536-.057 1.126c-.162 1.352-.92 2.091-2.369 2.517L14.88 12.37c-1.426.42-2.139.63-2.88.63s-1.454-.21-2.88-.63l-4.171-1.228c-1.448-.426-2.207-1.165-2.37-2.517"/>
      <path d="m3.463 10.5l-.196 2.276c-.352 4.079-.528 6.119.6 7.421S6.94 21.5 10.824 21.5h2.352c3.885 0 5.828 0 6.957-1.303s.952-3.342.6-7.421l-.196-2.276m-5.037-5l-.077-.265c-.385-1.32-.578-1.98-1.036-2.357S13.32 2.5 12.102 2.5h-.204c-1.218 0-1.827 0-2.285.378c-.458.377-.65 1.037-1.036 2.357L8.5 5.5"/>
    </g>
  </svg>
);

const Icon5 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
       {...props}>
    <g color="currentColor">
      <path d="M8.77 2.5q-.41.146-.8.324M5.425 4.466a10 10 0 0 0-.652.624M3.032 7.565q-.28.56-.487 1.157m-.529 2.67c-.022.389-.021.786.002 1.175m.55 2.699q.2.56.464 1.09m1.659 2.387q.366.393.773.746m2.312 1.517A10 10 0 0 0 9 21.5m3 .5c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
      <path d="M12 13.5a1.5 1.5 0 0 0 0-3m0 3a1.5 1.5 0 0 1 0-3m0 3V16m0-5.5V6"/>
    </g>
  </svg>
);

const Icon6 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
       {...props}>
    <g color="currentColor">
      <path d="M10 9.5L5.275 4.476c-.418-.452-.351-.781.142-1.066c.928-.537 1.65-.551 2.627-.015l4.905 2.692c.35.191.692.386 1.051.492m-1.5 7.084l2.11 6.807c.173.556.476.656.946.387c.884-.507 1.24-1.092 1.264-2.146l.12-5.291c.015-.707.013-1.399.56-1.92"/>
      <path d="m8.328 10.984l1.887-1.378l4.423-3.225l.004-.003l.007-.005c.105-.076 1.66-1.21 2.543-1.597c1.084-.475 2.095-.254 3.182.05c.562.156.843.235 1.046.381c.322.233.531.59.574.981c.027.247-.044.527-.187 1.086h0c-.278 1.08-.589 2.054-1.548 2.744c-.78.56-2.555 1.323-2.673 1.374l-.009.004l-.004.001l-5.041 2.167l-2.154.924h0c-.78.334-1.171.502-1.437.812c-.622.727-.71 2.044-.942 2.95c-.128.5-.832 1.367-1.458 1.237c-.387-.08-.395-.565-.443-.874l-.464-2.974c-.11-.711-.12-.726-.688-1.176l-2.378-1.884c-.247-.195-.669-.444-.546-.815c.2-.6 1.312-.768 1.815-.628c.911.255 2.11.838 3.06.67c.405-.072.747-.322 1.431-.822"/>
    </g>
  </svg>
);

const Icon7 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
       {...props}>
    <g color="currentColor">
      <path d="m3.164 11.35l.836.209l.457 4.542c.258 2.566.387 3.849 1.244 4.624s2.147.775 4.726.775h3.146c2.58 0 3.87 0 4.726-.775c.857-.775.986-2.058 1.244-4.625L20 11.56l.836-.21a1.537 1.537 0 0 0 .509-2.75l-8.198-5.737a2 2 0 0 0-2.294 0L2.655 8.6a1.537 1.537 0 0 0 .51 2.75"/>
      <path d="M15 16c-.8.622-1.85 1-3 1s-2.2-.378-3-1"/>
    </g>
  </svg>
);

const PreferencesStep = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const benefits = [
    { name: 'Vale alimentação', value: 'R$450,00 por mês', icon: Icon1 },
    { name: 'Plano de saúde', value: '100% pago pela empresa', icon: Icon2 },
    { name: 'Plano odontológico', value: '100% pago pela empresa', icon: Icon3 },
    { name: 'Trabalho semanal', value: 'De Segunda a Sexta-Feira', icon: Icon4 },
    { name: 'Carga horária', value: '8h por dia', icon: Icon5 },
    { name: 'Férias remuneradas', value: '1 vez por ano', icon: Icon6 },
    { name: 'Home Office', value: 'Trabalhe de sua casa', icon: Icon7 }
  ];

  return (
    <div className="space-y-6">
      {/* Título principal */}
      <div className="mb-6">
        <h1
          className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
          style={{ fontSize: '12pt', lineHeight: '1.2' }}
        >
          Veja os benefícios de trabalhar na TaskUs
        </h1>

        <p className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
          Além de um salário justo, você conta com benefícios essenciais para o bem-estar de todo trabalhador.
        </p>
      </div>

      {/* Lista de benefícios */}
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 rounded-lg p-4"
            style={{ backgroundColor: '#f3f6f9' }}
          >
            {/* Ícone customizado */}
            <div className="flex-shrink-0 text-blue-600">
              <benefit.icon className="w-7 h-7" />
            </div>

            {/* Conteúdo */}
            <div className="flex-1">
              <p className="font-hendrix-bold" style={{ fontSize: '12pt', color: '#424242', marginTop: '-0.5vw' }}>
                {benefit.name}
              </p>
              <p className="font-hendrix-regular" style={{ fontSize: '10pt', color: '#1a1a1a', marginTop: '-1vw' }}>
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