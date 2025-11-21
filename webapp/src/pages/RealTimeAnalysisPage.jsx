import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingFinalizarCurriculo from "@/components/steps/LoadingFinalizarCurriculo.jsx";
import ConfirmacaoCurriculo from "../components/steps/ConfirmacaoCurriculo.jsx";
import CurriculoLoadingStep from "../components/steps/CurriculoLoadingStep.jsx";
import LogoTaskUs from "../assets/logo-min.webp";
import Header from "@/components/modules/Header.jsx";

const RealTimeAnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Permite receber dados via state, mas também pode buscar do contexto se necessário
  const { dadosUsuario, showLoadingStep: showLoadingStepInit } =
    location.state || {};
  const [currentStep, setCurrentStep] = useState(13);
  const [showLoadingStep, setShowLoadingStep] = useState(!!showLoadingStepInit);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header igual ao CurriculoPage */}
      <Header rightText="Análise em andamento" />


      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-sm border overflow-hidden">
          <div className="p-6 pb-8">
            {currentStep === 13 && (
              <LoadingFinalizarCurriculo
                seconds={1}
                onCountdownFinish={() => {
                  setCurrentStep(11);
                }}
              />
            )}

            {/* Etapa 11: Confirmação do Currículo */}
            {currentStep === 11 && !showLoadingStep && (
              <ConfirmacaoCurriculo
                dadosUsuario={dadosUsuario}
                onContinuar={() => {
                  setShowLoadingStep(true);
                }}
              />
            )}

            {/* Novo step de loading após confirmação do currículo */}
            {currentStep === 11 && showLoadingStep && (
              <CurriculoLoadingStep
                seconds={10}
                onCountdownFinish={() => {
                  navigate("/onConfirm");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalysisPage;
