import React, { useMemo, useState } from "react";
import { useProcess } from "@/hooks/useProcess.js";
import "../../styles/refino.css";
import Cracha from "../../assets/cracha.webp";

// --- Ícones como componentes React ---
const StepIcon1 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
    {...props}
  >
    <g color="currentColor">
      <path d="M9 22c.36 0 1.69-.607 3.05-1.822m0 0c1.158-1.036 2.336-2.514 2.95-4.433c1.333-4.17-6.667 0-4 3.475c.328.428.681.74 1.05.958m0 0c1.602.948 3.481.096 4.754-.884c.39-.299.584-.449.7-.402s.184.314.32.85c.434 1.715 1.717 3.099 3.176.868" />
      <path d="M20 13V7.89c0-1.714 0-2.57-.268-3.255c-.43-1.101-1.342-1.97-2.497-2.38C16.517 2 15.617 2 13.818 2c-3.148 0-4.722 0-5.98.447c-2.02.718-3.615 2.237-4.37 4.164C3 7.809 3 9.309 3 12.309v2.577c0 3.108 0 4.661.848 5.74q.366.467.855.816c.367.261.787.438 1.297.558" />
      <path d="M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13 2" />
    </g>
  </svg>
);

const StepIcon2 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
    {...props}
  >
    <path d="M6.565 19.56a1.5 1.5 0 1 1-2.122-2.121a1.5 1.5 0 0 1 2.122 2.122M6.004 12h.371a2 2 0 0 1 1.415.586l3.628 3.628a2 2 0 0 1 .586 1.414V18m-1.494-3l8.046-6.626a2 2 0 0 0 .673-1.066l.765-3.058a.2.2 0 0 0-.244-.244l-3.058.765a2 2 0 0 0-1.066.673L9 13.49m4.91-10.597C12.86 2.298 12.334 2 12 2s-.859.297-1.908.892c-1.015.576-2.078.932-3.116 1.151c-2.06.436-3.09.653-3.533 1.19S3 6.613 3 8.297v1.665M12 22q.472 0 .928-.124c.49-.133.952-.42 1.875-.996c2.062-1.284 3.093-1.925 3.875-2.75a8.5 8.5 0 0 0 2.026-3.57c.25-.903.29-1.877.296-3.56M6.5 17.5l3-3" />
  </svg>
);

const StepIcon3 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="#1655ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
    {...props}
  >
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

  return (
    // Card principal
    <div className="w-full min-h-screen max-w-md px-5 flex flex-col items-center mt-5">
      {/* Código de aprovação */}


      {/* Título */}
      <h1 className="titulodaetapa font-hendrix-medium text-2xl text-white mb-5 leading-tight text-left w-full">
        Parabéns! {nome}, você foi selecionado(a) para trabalhar e fazer parte da equipe TaskUs
      </h1>
      <p className="subheadlines font-hendrix-light text-base text-gray-200 mb-10 text-left w-full">
        Você foi selecionado entre <span className="font-hendrix-bold text-white">2.319 candidatos</span> com melhor desempenho e perfil para a vaga.
      </p>

      {/* Imagem com nome na frente */}
      <div className="relative mb-10 w-[320px] h-auto mx-auto flex items-center justify-center">
        <img
          src={Cracha}
          alt="Cracha"
          className="w-[350px] h-auto object-contain"
        />
        {/* Nome do usuário na frente do crachá */}
        <span
          className="absolute left-1/5 top-1/3 translate-x-[-50%] translate-y-[-50%] font-hendrix-bold text-[#1655ff] text-sm mt-7 "
          style={{ pointerEvents: "none" }}
        >
          {nome}
        </span>
      </div>

      {/* Etapas em cards (formatação aplicada) */}
      <div className="w-full mb-6">
        <h2 className="titulodaetapa font-hendrix-medium text-lg text-white mb-10 text-left">
          Agora faltam 3 etapas <br />para você oficializar<br /> sua contratação
        </h2>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-2xl px-6 py-5 bg-[#f3f6f9] min-h-[90px]"
            >
              <div className="flex flex-col items-start">
                {/* Ícone */}
                <div className="mb-2">
                  <div className="w-[48px] h-[48px] mt-1">
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>

                {/* Título */}
                <h3
                  className="font-hendrix-semibold mb-2"
                  style={{ fontSize: "12pt", color: "#1655ff", textAlign: "left" }}
                >
                  {step.title}
                </h3>

                {/* Descrição */}
                <div
                  className="text-sm text-gray-700"
                  style={{ fontSize: "10pt", textAlign: "left" }}
                >
                  {step.description}
                </div>
              </div>
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
  );
};

export default ContratacaoIntroStep;