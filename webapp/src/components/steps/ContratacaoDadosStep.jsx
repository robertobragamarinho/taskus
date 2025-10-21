import React, { useState } from "react";
import '../../styles/refino.css';
import { useProcess } from "@/hooks/useProcess.js";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";

const ContratacaoDadosStep = ({ onConfirm, dados = {} }) => {
  const { processData, updateUserData } = useProcess();

  // CPF do contexto
  const cpfContexto = processData?.userData?.cpf || "";

  // Inputs editáveis
  const [cpf, setCpf] = useState(formatCPF(cpfContexto || dados.cpf || ""));
  const [cpfError, setCpfError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  // Máscara CPF
  function formatCPF(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6, 9);
    const p4 = digits.slice(9, 11);
    let out = p1;
    if (p2) out += `.${p2}`;
    if (p3) out += `.${p3}`;
    if (p4) out += `-${p4}`;
    return out;
  }

  // Validação de CPF
  function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;

    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  const handleCpfChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    const onlyDigits = formatted.replace(/\D/g, "");
    if (onlyDigits.length === 11 && !isValidCPF(onlyDigits)) {
      setCpfError("CPF inválido");
    } else {
      setCpfError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const onlyDigits = cpf.replace(/\D/g, "");
    if (!isValidCPF(onlyDigits)) {
      setCpfError("CPF inválido");
      return;
    }
    setCpfError("");
    setIsLoading(true);

    try {
      await updateUserData({ cpf: onlyDigits });
      if (cpf) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await onConfirm({ cpf: onlyDigits });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bloco_principal">

      <Maintexts>
        <Headlines variant="white">
          Preencha seus dados pessoais com atenção!
        </Headlines>
        <Paragraphs variant="white">
          Para formalizar o contrato trabalhista e assinar sua carteira precisamos do seu CPF.
        </Paragraphs>
      </Maintexts>
      <form className="w-full max-w-md mx-auto bg-transparent" onSubmit={handleSubmit}>


        {/* CPF */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col items-start">
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              className="bg-white rounded-2xl px-5 py-3 w-full font-hendrix-semibold text-gray-900 text-lg focus:outline-none"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              maxLength={14}
              required
            />
            {cpfError && (
              <span className="text-red-500 font-hendrix-regular mt-2 text-sm">
                {cpfError}
              </span>
            )}
          </div>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg hover:from-blue-600 hover:to-blue-500 transition flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
          {isLoading ? "Aguarde..." : "Confirmar"}
        </button>
      </form>
    </div>
  );
};

export default ContratacaoDadosStep;