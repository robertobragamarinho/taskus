/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProcess } from "../hooks/useProcess.js";
import CurriculoIntroStep from "../components/steps/CurriculoIntroStep.jsx";
import CurriculoCriacaoStep from "../components/steps/CurriculoCriacaoStep.jsx";
import CurriculoLocalizacaoStep from "../components/steps/CurriculoLocalizacaoStep.jsx";
import CurriculoEscolaridadeStep from "../components/steps/CurriculoEscolaridadeStep.jsx";
import CurriculoExperienciaStep from "../components/steps/CurriculoExperienciaStep.jsx";
import CurriculoFotoPadroesStep from "../components/steps/CurriculoFotoPadroesStep.jsx";
import CurriculoFotoVisualizacaoStep from "../components/steps/CurriculoFotoVisualizacaoStep.jsx";
import CurriculoFinalizadoStep from "../components/steps/CurriculoFinalizadoStep.jsx";
import CurriculoFotoEscolha from "@/components/steps/CurriculoFotoEscolhaStep.jsx";
import CurriculoHabilidadesStep from "@/components/steps/CurriculoHabilidades.jsx";
import Header from "@/components/modules/Header.jsx";
import ConfirmacaoCurriculo from "../components/steps/ConfirmacaoCurriculo.jsx";
import CurriculoLoadingStep from "../components/steps/CurriculoLoadingStep.jsx";

import LoadingFinalizarCurriculo from "@/components/steps/LoadingFinalizarCurriculo.jsx";

import LogoTaskUs from "../assets/logo-min.webp";

const CurriculoPage = () => {
  const navigate = useNavigate();
  const { processData, updateProcessStep } = useProcess();
  const [currentStep, setCurrentStep] = useState(1);
  const [showLoadingStep, setShowLoadingStep] = useState(false);
  const [curriculoData, setCurriculoData] = useState({});
  const [dadosUsuario, setDadosUsuario] = useState();
  const [fotoUrl, setFotoUrl] = useState(null);
  const [arqivoPDf, setArquivoPdf] = useState({
    arquivo: null,
    usuario: null,
  });

  const handleEnviarArquivo = async (arquivo) => {
    try {
      const dadosArquivo = {
        nome: arquivo.name,
        tipo: arquivo.type,
        tamanho: arquivo.size,
        dataEnvio: new Date().toISOString(),
      };

      setArquivoPdf({
        arquivo: dadosArquivo,
        usuario: dadosUsuario,
      });

      await updateProcessStep(
        "curriculo",
        1,
        { arquivo: dadosArquivo, metodo: "envio_arquivo" },
        "arquivo_enviado"
      );

      setCurrentStep(10);
    } catch (error) {
      console.error("❌ Erro ao processar arquivo:", error);
    }
  };

  const handleCriarCurriculo = async () => {
    try {
      const dadosCriacao = {
        metodo: "criar_curriculo",
        inicioProcesso: new Date().toISOString(),
      };

      setCurriculoData((prev) => ({
        ...prev,
        ...dadosCriacao,
      }));

      await updateProcessStep("curriculo", 1, dadosCriacao, "criar_curriculo");

      console.log("✅ Processo de criação de currículo iniciado");

      setCurrentStep(2);
    } catch (error) {
      console.error("❌ Erro ao iniciar criação de currículo:", error);
    }
  };

  const handleFotoSelecionada = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFotoUrl(url);
      setCurrentStep(9);
    }
  };

  const handlePularFoto = async () => {
    setFotoUrl(null);
    setCurrentStep(10);
  };

  const handleFotoConfirmada = async () => {
    try {
      const dadosFotoFinal = {
        foto: fotoUrl,
        fotoConfirmada: true,
        dataConfirmacao: new Date().toISOString(),
      };

      setCurriculoData((prev) => ({
        ...prev,
        ...dadosFotoFinal,
      }));

      const userId = sessionStorage.getItem("userId");
      if (userId && fotoUrl) {
        try {
          const { default: backendAPI } = await import(
            "../services/backendAPIService.js"
          );
          await backendAPI.updateUser(userId, { foto: fotoUrl });
        } catch (err) {
          console.warn(
            "⚠️ Erro ao atualizar foto no backend, mas prosseguindo:",
            err
          );
        }
      }

      try {
        await updateProcessStep(
          "curriculo",
          2,
          dadosFotoFinal,
          "foto_confirmada"
        );
      } catch (err) {
        console.warn("⚠️ Erro ao atualizar progresso, mas prosseguindo:", err);
      }

      console.log("✅ Foto confirmada e salva, indo para currículo finalizado");
    } catch (error) {
      console.error("❌ Erro ao confirmar foto final:", error);
    } finally {
      setCurrentStep(10);
    }
  };

  const handleEnviarParaAvaliacao = async () => {
    try {
      const dadosFinais = {
        ...curriculoData,
        enviadoParaAvaliacao: true,
        dataEnvio: new Date().toISOString(),
      };

      await updateProcessStep(
        "curriculo",
        6,
        dadosFinais,
        "enviado_para_avaliacao"
      );

      navigate("/realTimeAnalysis", {
        state: {
          dadosUsuario,
          showLoadingStep: false,
        },
      });
    } catch (error) {
      console.error("❌ Erro ao enviar para avaliação:", error);
    }
  };

  const handleDadosCorretos = async () => {
    try {
      console.log("✅ Dados confirmados pelo usuário");

      await updateProcessStep(
        "curriculo",
        2,
        {
          ...curriculoData,
          ...dadosUsuario,
          dadosConfirmados: true,
          dataConfirmacao: new Date().toISOString(),
        },
        "dados_confirmados"
      );

      setCurrentStep(3);
    } catch (error) {
      console.error("❌ Erro ao confirmar dados:", error);
    }
  };

  const handleVoltarLocalizacao = async () => {
    try {
      console.log("🔙 Voltando para dados salvos");
      setCurrentStep(2);
    } catch (error) {
      console.error("❌ Erro ao voltar:", error);
    }
  };

  const handleContinuarLocalizacao = async (dadosLocalizacao) => {
    try {
      const dadosLocalizacaoSimples = {
        estado: dadosLocalizacao.estado?.nome || "",
        cidade: dadosLocalizacao.municipio?.nome || "",
      };

      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const { default: backendAPI } = await import(
            "../services/backendAPIService.js"
          );
          await backendAPI.updateUser(userId, {
            estado: dadosLocalizacaoSimples.estado,
            cidade: dadosLocalizacaoSimples.cidade,
          });
        } catch (err) {
          console.warn(
            "⚠️ Erro ao atualizar usuário no backend, mas prosseguindo:",
            err
          );
        }
      }

      await updateProcessStep(
        "curriculo",
        3,
        dadosLocalizacaoSimples,
        "localizacao_confirmada"
      );

      setCurriculoData((prev) => ({
        ...prev,
        localizacao: dadosLocalizacaoSimples,
      }));

      setCurrentStep(4);
    } catch (error) {
      console.error("❌ Erro ao salvar localização:", error);
      setCurrentStep(4);
    }
  };

  const handleVoltarEscolaridade = async () => {
    try {
      console.log("🔙 Voltando para localização");
      setCurrentStep(3);
    } catch (error) {
      console.error("❌ Erro ao voltar:", error);
    }
  };

  const handleSelecionarEscolaridade = async (escolaridade) => {
    try {
      console.log("🎓 Escolaridade selecionada:", escolaridade);

      await updateProcessStep(
        "curriculo",
        4,
        {
          ...curriculoData,
          escolaridade: escolaridade,
          dataEscolaridade: new Date().toISOString(),
        },
        "escolaridade_selecionada"
      );

      setCurriculoData((prev) => ({
        ...prev,
        escolaridade: escolaridade,
      }));

      setCurrentStep(5);
    } catch (error) {
      console.error("❌ Erro ao salvar escolaridade:", error);
    }
  };

  const handleVoltarExperiencia = async () => {
    try {
      console.log("🔙 Voltando para escolaridade");
      setCurrentStep(4);
    } catch (error) {
      console.error("❌ Erro ao voltar:", error);
    }
  };

  const handleContinuarExperiencia = async (experiencias) => {
    try {
      const experienciasFormatadas = experiencias.map((exp) => ({
        nome: exp.nomeEmpresa,
        cargo: exp.funcao,
        inicio: exp.inicio,
        fim: exp.fim,
      }));
      console.log(
        "💼 Experiências adicionadas (formatadas):",
        experienciasFormatadas
      );

      await updateProcessStep(
        "curriculo",
        5,
        experienciasFormatadas,
        "experiencias_adicionadas"
      );

      setCurriculoData((prev) => ({
        ...prev,
        experiencias: experienciasFormatadas,
      }));

      setCurrentStep(7);
    } catch (error) {
      console.error("❌ Erro ao salvar experiências:", error);
    }
  };

  const handleContinuarHabilidades = async (habilidades) => {
    try {
      await updateProcessStep(
        "curriculo",
        6,
        { habilidades },
        "habilidades_adicionadas"
      );

      setCurriculoData((prev) => ({
        ...prev,
        habilidades: habilidades,
      }));

      setCurrentStep(6);
    } catch (error) {
      console.error("❌ Erro ao salvar habilidades:", error);
    }
  };

  // ✅ Agora a barra NÃO aparece no step 1
  const stepsComProgresso = [2, 3, 4, 5, 6];
  const totalSteps = 6;

  const progressPercent = stepsComProgresso.includes(currentStep)
    ? Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)
    : 100;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      
      <Header rightText="Criando Currículo" />
      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-sm border overflow-hidden">
          <div className="p-6 pb-8">
            {/* Título e barra de progresso global */}
            {stepsComProgresso.includes(currentStep) && (
              <div className="space-y-2 pt-2 pb-1">
                <div className="flex items-center justify-between">
                  <span
                    className="font-hendrix-bold text-gray-800"
                    style={{ fontSize: "10pt" }}
                  >
                    Criação de Currículo
                  </span>
                  <span
                    className="font-hendrix-medium text-gray-400"
                    style={{ fontSize: "10pt" }}
                    aria-live="polite"
                  >
                    {currentStep} de {totalSteps}
                  </span>
                </div>
                <div
                  className="w-full bg-gray-200 rounded-full h-2 mb-8"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progressPercent)}
                  aria-label="Progresso do questionário"
                >
                  <div
                    className="h-2 rounded-full transition-[width] duration-500 ease-in-out"
                    style={{
                      backgroundColor: "#1655ff",
                      width: `${progressPercent}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Etapa 1: Introdução do currículo (SEM barra) */}
            {currentStep === 1 && (
              <CurriculoIntroStep
                onEnviarArquivo={handleEnviarArquivo}
                onCriarCurriculo={handleCriarCurriculo}
                progressPercent={progressPercent}
              />
            )}

            {currentStep === 2 && (
              <CurriculoCriacaoStep
                onContinue={handleDadosCorretos}
                progressPercent={progressPercent}
              />
            )}

            {currentStep === 3 && (
              <CurriculoLocalizacaoStep
                onVoltar={handleVoltarLocalizacao}
                onContinuar={handleContinuarLocalizacao}
                progressPercent={progressPercent}
              />
            )}

            {currentStep === 4 && (
              <CurriculoEscolaridadeStep
                onVoltar={handleVoltarEscolaridade}
                onSelecionarEscolaridade={handleSelecionarEscolaridade}
                progressPercent={progressPercent}
              />
            )}

            {currentStep === 5 && (
              <CurriculoHabilidadesStep
                onVoltar={handleVoltarExperiencia}
                onContinuar={handleContinuarHabilidades}
                progressPercent={progressPercent}
              />
            )}

            {currentStep === 6 && (
              <CurriculoExperienciaStep
                onVoltar={handleVoltarExperiencia}
                onContinuar={handleContinuarExperiencia}
                progressPercent={progressPercent}
              />
            )}

            {currentStep === 7 && (
              <CurriculoFotoEscolha
                enviarFoto={() => {
                  setCurrentStep(8);
                }}
                pularEnvioFoto={() => {
                  setCurrentStep(10);
                }}
              />
            )}

            {currentStep === 8 && (
              <CurriculoFotoPadroesStep
                onEnviarAgora={handleFotoSelecionada}
                onPular={handlePularFoto}
              />
            )}

            {currentStep === 9 && (
              <CurriculoFotoVisualizacaoStep
                fotoUrl={fotoUrl}
                onConfirmar={handleFotoConfirmada}
                onPular={handlePularFoto}
                setFotoUrl={setFotoUrl}
              />
            )}

            {currentStep === 10 && (
              <>
                <CurriculoFinalizadoStep
                  curriculoData={{
                    ...processData.userData,
                    ...processData.processes?.curriculo?.data,
                    ...curriculoData,
                  }}
                  fotoUrl={fotoUrl}
                  onEnviarParaAvaliacao={handleEnviarParaAvaliacao}
                  dados={arqivoPDf}
                />
                {(!curriculoData.experiencias ||
                  curriculoData.experiencias.length === 0) && (
                  <div className="mt-6 text-center">
                    <span className="font-hendrix-medium text-gray-500 text-base">
                      Sem experiências profissionais
                    </span>
                  </div>
                )}
              </>
            )}

            {currentStep === 13 && (
              <LoadingFinalizarCurriculo
                seconds={10}
                onCountdownFinish={() => {
                  setCurrentStep(11);
                }}
              />
            )}

            {currentStep === 11 && !showLoadingStep && (
              <ConfirmacaoCurriculo
                dadosUsuario={dadosUsuario}
                onContinuar={() => {
                  setShowLoadingStep(true);
                }}
              />
            )}

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

export default CurriculoPage;