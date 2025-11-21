import React, { useMemo, useState, useEffect } from "react";
import { useProcess } from "@/hooks/useProcess.js";
import "../../styles/refino.css";
import Headlines from "../modules/Headlines";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";


// Ícones SVG como componentes
const StepIcon1 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <g color="currentColor">
      <path d="M9 22c.36 0 1.69-.607 3.05-1.822m0 0c1.158-1.036 2.336-2.514 2.95-4.433c1.333-4.17-6.667 0-4 3.475c.328.428.681.74 1.05.958m0 0c1.602.948 3.481.096 4.754-.884c.39-.299.584-.449.7-.402s.184.314.32.85c.434 1.715 1.717 3.099 3.176.868" />
      <path d="M20 13V7.89c0-1.714 0-2.57-.268-3.255c-.43-1.101-1.342-1.97-2.497-2.38C16.517 2 15.617 2 13.818 2c-3.148 0-4.722 0-5.98.447c-2.02.718-3.615 2.237-4.37 4.164C3 7.809 3 9.309 3 12.309v2.577c0 3.108 0 4.661.848 5.74q.366.467.855.816c.367.261.787.438 1.297.558" />
      <path d="M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13 2" />
    </g>
  </svg>
);
const StepIcon2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <path d="M6.565 19.56a1.5 1.5 0 1 1-2.122-2.121a1.5 1.5 0 0 1 2.122 2.122M6.004 12h.371a2 2 0 0 1 1.415.586l3.628 3.628a2 2 0 0 1 .586 1.414V18m-1.494-3l8.046-6.626a2 2 0 0 0 .673-1.066l.765-3.058a.2.2 0 0 0-.244-.244l-3.058.765a2 2 0 0 0-1.066.673L9 13.49m4.91-10.597C12.86 2.298 12.334 2 12 2s-.859.297-1.908.892c-1.015.576-2.078.932-3.116 1.151c-2.06.436-3.09.653-3.533 1.19S3 6.613 3 8.297v1.665M12 22q.472 0 .928-.124c.49-.133.952-.42 1.875-.996c2.062-1.284 3.093-1.925 3.875-2.75a8.5 8.5 0 0 0 2.026-3.57c.25-.903.29-1.877.296-3.56M6.5 17.5l3-3" />
  </svg>
);
const StepIcon3 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}>
    <path d="M12 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m1.5 3.5a3.5 3.5 0 1 0 0-7m-.357 16H3.857C2.831 20 2 19.233 2 18.286C2 15.919 4.079 14 6.643 14h3.714a4.9 4.9 0 0 1 2.786.857M19 14v6m3-3h-6" />
  </svg>
);


const steps = [
  {
    id: 1,
    icon: StepIcon1,
    title: "Validação de dados",
    description: "Vamos validar suas informações para assinar sua carteira e o contrato de trabalho.",
  },
  {
    id: 2,
    icon: StepIcon2,
    title: "Treinamento inicial",
    description: "Você fará o treinamento inicial obrigatório da TaskUs, que garante seu certificado de capacitação.",
  },
  {
    id: 3,
    icon: StepIcon3,
    title: "Contato do gerente",
    description: "Após o treinamento, seu gerente de equipe entrará em contato para alinhar os últimos detalhes da contratação.",
  },
];


const T15 = ({ onContinue }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Overlay de entrada (caso queira usar no futuro)
  // const [entryOverlayPhase, setEntryOverlayPhase] = useState("intro");
  // const showEntryOverlay = entryOverlayPhase === "intro";

  // Scrolla para o topo ao montar
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Dados do contexto
  const { processData } = useProcess();
  const userData = processData?.userData || {};

  // Monta nome do usuário a partir do contexto
  const nome = useMemo(() => {
    if (userData.fullName) return userData.fullName;
    if (userData.firstName && userData.lastName) return `${userData.firstName} ${userData.lastName}`;
    if (userData.firstName) return userData.firstName;
    return "Candidato";
  }, [userData]);

  // Renderização principal
  return (
    <section
      className="bloco_principal max-w-xl mx-auto px-2 sm:px-0"
      style={{ height: '100vh' }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <Maintexts>
          <section id='ETP6T2'/>
          <Headlines variant="white">
            Agora faltam apenas<br /> 3 etapas
            
            para oficializar<br /> sua contratação
          </Headlines>
          <Continuity variant="white" />
        </Maintexts>

        {/* Etapas em cards */}
        <div className="space-y-3 mb-10">
          {steps.map((step) => (
            <article
              key={step.id}
              className="rounded-2xl px-6 py-5 bg-[#f3f6f9] min-h-[90px] flex gap-4 items-center shadow-sm"
              aria-label={`Etapa ${step.id}: ${step.title}`}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow">
                  <step.icon className="w-8 h-8" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-hendrix-semibold mb-1 text-[#1655ff] text-base leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700 leading-snug">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Botão de continuar */}
      <button
        type="button"
        className="w-full mb-10 py-4 rounded-2xl bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-medium text-white text-base shadow-lg hover:from-blue-600 hover:to-blue-500 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-60"
        onClick={async () => {
          setIsLoading(true);
          try {
            await onContinue();
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {isLoading ? "Aguarde..." : "Continuar"}
      </button>
    </section>
  );
};

export default T15;
