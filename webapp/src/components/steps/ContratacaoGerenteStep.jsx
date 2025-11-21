/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useProcess } from "../../hooks/useProcess.js";
import { motion } from "framer-motion";
import gerenteImg from "../../assets/manager-min.webp";
import "../../styles/refino.css";
import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Continuity from "../modules/Continuity";
import ExplanatoryCards from "../modules/ExplanatoryCards";

// Array de nomes dos gerentes para rotacionar
const GERENTES = [
  "Antônio Matos",
];

// Ícone simples para o card (aspas)
const QuoteIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props} aria-hidden="true" role="img">
    {/* Aspas esquerda */}
    <path
      d="M10.5 7.5c0 2.071-1.679 3.75-3.75 3.75H6v.75C6 13.992 7.508 15.5 9.375 15.5V18C6.409 18 4 15.591 4 12.625V7.5C4 6.119 5.119 5 6.5 5h1.25C9.821 5 10.5 5.679 10.5 7.5Z"
      fill="currentColor"
    />
    {/* Aspas direita */}
    <path
      d="M22.5 7.5c0 2.071-1.679 3.75-3.75 3.75H18v.75c0 1.992 1.508 3.5 3.375 3.5V18C18.409 18 16 15.591 16 12.625V7.5C16 6.119 17.119 5 18.5 5h1.25C21.821 5 22.5 5.679 22.5 7.5Z"
      fill="currentColor"
    />
  </svg>
);

const ContratacaoGerenteStep = ({ onContinuar }) => {
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);

  // Captura nome do usuário do contexto global (useProcess)
  const { processData, updateUserData } = useProcess();
  const userData = processData?.userData || {};
  let nomeUsuario =
    userData.nome ||
    ((userData.firstName || "") +
      (userData.lastName ? " " + userData.lastName : ""));
  if (!nomeUsuario || !nomeUsuario.trim()) nomeUsuario = "candidato";

  // Alterna o gerente usando localStorage
  const [gerenteIndex, setGerenteIndex] = useState(0);
  const gerenteNome = GERENTES[gerenteIndex];

  useEffect(() => {
    // Recupera o índice do gerente do localStorage
    let idx = parseInt(window.localStorage.getItem("taskus_gerente_idx"), 10);
    if (isNaN(idx) || idx < 0 || idx >= GERENTES.length) idx = 0;

    // Calcula próximo índice e persiste
    const nextIdx = (idx + 1) % GERENTES.length;
    window.localStorage.setItem("taskus_gerente_idx", nextIdx);
    setGerenteIndex(idx);

    // Salva o gerente nos dados do usuário do contexto
    updateUserData({ gerente: GERENTES[idx] });
  }, []);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setDots((prev) => (prev + 1) % 4);
      }, 400);
    } else {
      setDots(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const continuar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onContinuar();
    }, 2000);
  };

  // Conteúdo do ExplanatoryCards substituindo o bloco destacado
  const supportTypes = [
    {
      id: "boas-vindas",
      icon: QuoteIcon,
      title: `Bem-vindo(a) à TaskUs Brasil.`,
      description: (
        <>
         Bem vindo(a) à TaskUs Brasil.Opa beleza? Meu nome é Antonio.
          Meu objetivo é garantir que você tenha o suporte necessário para começar a trabalhar com confiança.
          Assim que sua contratação for finalizada, vou te enviar uma mensagem de boas-vindas no WhatsApp com as primeiras instruções.
        </>
      ),
    },
  ];

  return (
    <div className="bloco_principal">
      <div className="w-full max-w-md mx-auto">
        {/* Título e explicação */}
        <Maintexts>
          <section id='ETP6T8'/>
          <Headlines variant="white">
            {gerenteNome} será<br/> o seu gerente de equipe<br/> aqui na TaskUs
          </Headlines>
          <Paragraphs variant="white">
            A partir de agora, você terá contato direto com o Antonio. Ele vai acompanhar seus primeiros dias, tirar dúvidas e garantir que você esteja pronto(a) para iniciar.
          </Paragraphs>
        </Maintexts>

        {/* Imagem do gerente */}
        <img
          src={gerenteImg}
          alt={gerenteNome}
          className="w-full mt-10 object-cover"
          style={{ height: "100%", objectFit: "cover" }}
        />

        {/* Card do gerente com imagem */}
        <div
          className="rounded-2xl mt-5 overflow-hidden bg-[#292929] flex flex-col items-center mb-2"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
        >
          <div
            className="flex items-center justify-between w-full px-6 py-4"
            style={{ minHeight: "70px" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="bg-[#2564eb00] flex items-center justify-center"
                style={{ width: 32, height: 32 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 24 24"
                  fill="#1655ff"
                >
                  <g
                    fill="none"
                    stroke="#1655ff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    color="currentColor"
                  >
                    <path d="M18.99 19H19m-.01 0c-.622.617-1.75.464-2.542.464c-.972 0-1.44.19-2.133.883C13.725 20.937 12.934 22 12 22s-1.725-1.063-2.315-1.653c-.694-.693-1.162-.883-2.133-.883c-.791 0-1.92.154-2.543-.464c-.627-.622-.473-1.756-.473-2.552c0-1.007-.22-1.47-.937-2.186C2.533 13.196 2 12.662 2 12s.533-1.196 1.6-2.262c.64-.64.936-1.274.936-2.186c0-.791-.154-1.92.464-2.543c.622-.627 1.756-.473 2.552-.473c.912 0 1.546-.297 2.186-.937C10.804 2.533 11.338 2 12 2s1.196.533 2.262 1.6c.64.64 1.274.936 2.186.936c.791 0 1.92-.154 2.543.464c.627.622.473 1.756.473 2.552c0 1.007.22 1.47.937 2.186C21.467 10.804 22 11.338 22 12s-.533 1.196-1.6 2.262c-.716.717-.936 1.18-.936 2.186c0 .796.154 1.93-.473 2.552" />
                    <path d="m9 12.893l1.8 1.607l4.2-5" />
                  </g>
                </svg>
              </span>
              <div className="flex flex-col justify-center">
                <span className="font-hendrix-semibold text-white text-base leading-tight">
                  {gerenteNome}
                </span>
                <span
                  className="font-hendrix-regular text-gray-300 text-xs leading-tight"
                  style={{ marginTop: "-2px" }}
                >
                  Team manager
                </span>
              </div>
            </div>
            <span
              className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-hendrix-medium text-xs px-5 py-2 rounded-full shadow"
              style={{ fontSize: "10px", fontWeight: 500 }}
            >
              TaskUs Brasil
            </span>
          </div>
        </div>

        {/* ExplanatoryCards (substitui o bloco de texto destacado anterior) */}
        
      </div>
        <div className="mb-10">
          <ExplanatoryCards supportTypes={supportTypes} />
         
        </div>  
         <div className="w-full mb-10 max-w-md mx-auto">
        <motion.button
          type="button"
          onClick={continuar}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${
            loading ? "cursor-not-allowed opacity-60" : ""
          }`}
          style={{ border: "none" }}
        >
          {loading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                style={{
                  borderTopColor: "transparent",
                  borderRightColor: "white",
                  borderBottomColor: "white",
                  borderLeftColor: "white",
                }}
              />
              <span className="font-hendrix-medium tracking-wide text-base">
                Carregando{".".repeat(dots)}
              </span>
            </>
          ) : (
            <span className="font-hendrix-medium tracking-wide text-lg">
              Continuar
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ContratacaoGerenteStep;