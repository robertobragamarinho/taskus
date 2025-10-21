import React, { useMemo, useState, useEffect } from "react";
import { useProcess } from "@/hooks/useProcess.js";
import "../../styles/refino.css";
import Cracha from "../../assets/cracha.webp";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";
import GraficoEvolucaoProcesso from "../modules/GraficoEvolucaoProcesso";
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react';

// ⚠️ Import do overlay
import PaymentItauLoadingStep from "../../modules/PaymentItauLoadingStep.jsx";

/* ================== DADOS ESTÁTICOS ================== */
// Dados do gráfico - posição entre candidatos
const dadosGrafico = [
  { etapa: '.', posicao: 2319 },
  { etapa: '.', posicao: 1920 },
  { etapa: '.', posicao: 83 },
  { etapa: 'Cadidatos', posicao: 29 }
];

const requisitos = [
  { id: 1, texto: 'Localização favorável', cumprido: true },
  { id: 2, texto: 'Faixa de idade ideal', cumprido: true },
  { id: 3, texto: 'Conhecimento básico', cumprido: true },
  { id: 4, texto: 'Disponibilidade para trabalhar', cumprido: true },
  { id: 5, texto: 'Certificado de capacitação', cumprido: false }
];

const pontosPositivos = [
  'Excelente comunicação e clareza nas respostas',
  'Demonstrou proatividade e iniciativa',
  'Forte alinhamento com valores da empresa',
  'Ótimas referências profissionais'
];

const pontosNegativos = [
  'Necessita desenvolver habilidades técnicas específicas',
  'Pouca experiência em liderança de equipes',
  'Conhecimento limitado em idiomas estrangeiros'
];

// --- Ícones como componentes React ---
const StepIcon1 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <g color="currentColor">
      <path d="M9 22c.36 0 1.69-.607 3.05-1.822m0 0c1.158-1.036 2.336-2.514 2.95-4.433c1.333-4.17-6.667 0-4 3.475c.328.428.681.74 1.05.958m0 0c1.602.948 3.481.096 4.754-.884c.39-.299.584-.449.7-.402s.184.314.32.85c.434 1.715 1.717 3.099 3.176.868" />
      <path d="M20 13V7.89c0-1.714 0-2.57-.268-3.255c-.43-1.101-1.342-1.97-2.497-2.38C16.517 2 15.617 2 13.818 2c-3.148 0-4.722 0-5.98.447c-2.02.718-3.615 2.237-4.37 4.164C3 7.809 3 9.309 3 12.309v2.577c0 3.108 0 4.661.848 5.74q.366.467.855.816c.367.261.787.438 1.297.558" />
      <path d="M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13 2" />
    </g>
  </svg>
);

const StepIcon2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <path d="M6.565 19.56a1.5 1.5 0 1 1-2.122-2.121a1.5 1.5 0 0 1 2.122 2.122M6.004 12h.371a2 2 0 0 1 1.415.586l3.628 3.628a2 2 0 0 1 .586 1.414V18m-1.494-3l8.046-6.626a2 2 0 0 0 .673-1.066l.765-3.058a.2.2 0 0 0-.244-.244l-3.058.765a2 2 0 0 0-1.066.673L9 13.49m4.91-10.597C12.86 2.298 12.334 2 12 2s-.859.297-1.908.892c-1.015.576-2.078.932-3.116 1.151c-2.06.436-3.09.653-3.533 1.19S3 6.613 3 8.297v1.665M12 22q.472 0 .928-.124c.49-.133.952-.42 1.875-.996c2.062-1.284 3.093-1.925 3.875-2.75a8.5 8.5 0 0 0 2.026-3.57c.25-.903.29-1.877.296-3.56M6.5 17.5l3-3" />
  </svg>
);

const StepIcon3 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <path d="M12 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m1.5 3.5a3.5 3.5 0 1 0 0-7m-.357 16H3.857C2.831 20 2 19.233 2 18.286C2 15.919 4.079 14 6.643 14h3.714a4.9 4.9 0 0 1 2.786.857M19 14v6m3-3h-6" />
  </svg>
);

const steps = [
  {
    id: 1,
    icon: StepIcon1,
    title: "Validação de dados",
    description:
      "Vamos validar suas informações para registrar sua contratação corretamente."
  },
  {
    id: 2,
    icon: StepIcon2,
    title: "Treinamento inicial",
    description:
      "Você fará o treinamento inicial obrigatório da TaskUs, que garante seu certificado de capacitação."
  },
  {
    id: 3,
    icon: StepIcon3,
    title: "Contato do gerente",
    description:
      "Após o treinamento, seu gerente de equipe entrará em contato para alinhar os últimos detalhes da contratação."
  }
];

const ContratacaoIntroStep = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(false);

  // ===== Overlay de entrada (Step 5) =====
  const [entryOverlayPhase, setEntryOverlayPhase] = useState('intro');
  const showEntryOverlay = entryOverlayPhase === 'intro';

  // Opcional: bloquear scroll enquanto o overlay estiver aberto (consistente com suas outras telas)
  useEffect(() => {
    if (!showEntryOverlay) return;
    const y = window.scrollY || 0;
    document.body.dataset.scrollY = String(y);
    Object.assign(document.body.style, {
      position: 'fixed',
      top: `-${y}px`,
      left: '0', right: '0', width: '100%', overflow: 'hidden'
    });
    return () => {
      const savedY = parseInt(document.body.dataset.scrollY || '0', 10);
      Object.assign(document.body.style, { position: '', top: '', left: '', right: '', width: '', overflow: '' });
      window.scrollTo(0, savedY);
      delete document.body.dataset.scrollY;
    };
  }, [showEntryOverlay]);

  // Dados do contexto
  const { processData } = useProcess();
  const userData = processData?.userData || {};

  // Monta nome do usuário a partir do contexto (fullName, ou firstName + lastName)
  const nome = useMemo(() => {
    if (userData.fullName) return userData.fullName;
    if (userData.firstName && userData.lastName) return `${userData.firstName} ${userData.lastName}`;
    if (userData.firstName) return userData.firstName;
    return "Candidato";
  }, [userData]);

  // Mensagens do overlay (etapa 5)
  const rotatingMessages = {
    5: ['Conferindo aprovação…', 'Direcionando Candidato…', 'Liberando acessos…']
  };

  return (
    <>
      {/* ===== Overlay de Entrada (Step 5) ===== */}
      {showEntryOverlay && (
        <PaymentItauLoadingStep
          stepIndex={5}
          animateFromPrevious
          autoAdvanceMs={3000}
          onLoadingComplete={() => setEntryOverlayPhase(null)}
          headline="Processo Seletivo"
          subline="Estamos finalizando sua aprovação para iniciar a ."
          rotatingMessages={rotatingMessages}
        />
      )}

      {/* ===== Conteúdo principal só após overlay sumir ===== */}
      {!showEntryOverlay && (
        <div className="bloco_principal">
          <Maintexts>
            <Headlines variant="white">
              Você foi selecionado(a) <br />para trabalhar e fazer<br /> parte da equipe TaskUs
            </Headlines>
            <Paragraphs variant="white">
              Você foi selecionado entre <span className="font-hendrix-regular text-[#d7d3e8]"><br />2.219 candidatos</span> com melhor <br />desempenho e perfil para a vaga.
            </Paragraphs>
          </Maintexts>

          {/* Imagem com nome na frente */}
          <div className="relative mb-10 h-auto mx-auto flex items-center justify-left">
            <img
              src={Cracha}
              alt="Cracha"
              className="w-[385px] h-auto object-contain"
            />
            {/* Nome do usuário na frente do crachá */}
            <div className="absolute left-[2vw] -translate-y-1/2 w-full px-6 text-left">
              <p className="font-hendrix-bold text-[#1655ff] text-sm mt-7">
                {nome}
              </p>
            </div>
          </div>

          <GraficoEvolucaoProcesso>
            {/* Caso você vá plotar o dadosGrafico, use aqui */}
          </GraficoEvolucaoProcesso>

          {/* Requisitos Cumpridos */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-[#3455ff] mr-2" />
              <h2 className="text-lg font-semibold text-gray-100">Requisitos cumpridos</h2>
            </div>
            <div className="space-y-3">
              {requisitos.map((req) => (
                <div
                  key={req.id}
                  className={`flex items-start p-3 rounded-xl transition-all ${
                    req.cumprido
                      ? 'bg-green-900 border border-green-700'
                      : 'bg-gray-700 border border-gray-600'
                  }`}
                >
                  {req.cumprido ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm ${req.cumprido ? 'text-gray-100' : 'text-gray-300'}`}>
                    {req.texto}
                  </span>
                </div>
              ))}
            </div>
          </div>

          

          {/* Botão */}
          <button
            className="w-full mb-10 py-4 rounded-2xl bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-medium text-white text-base shadow-lg hover:from-blue-600 hover:to-blue-500 transition flex items-center justify-center"
            onClick={async () => {
              setIsLoading(true);
              try {
                await onStart();
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {isLoading ? "Aguarde..." : "Ir para contratação"}
          </button>
        </div>
      )}
    </>
  );
};

export default ContratacaoIntroStep;