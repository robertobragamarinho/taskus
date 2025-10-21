import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingFinalizarCurriculo from "@/components/steps/LoadingFinalizarCurriculo.jsx";
import ConfirmacaoCurriculo from "../components/steps/ConfirmacaoCurriculo.jsx";
import CurriculoLoadingStep from "../components/steps/CurriculoLoadingStep.jsx";
import LogoTaskUs from "../assets/logo-min.webp";

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
      <div className="bg-[#00005f] border-b border-gray-200 flex-shrink-0">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo TaskUs */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <img src={LogoTaskUs} className="h-6" />
              </div>
            </div>
            {/* Logo Recrutamento Online */}
            <div className="flex items-center space-x-2">
              <span className="font-hendrix-medium text-xs text-blue-200">
                {"Processo Seletivo"}
              </span>
            </div>
          </div>
        </div>
      </div>
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
