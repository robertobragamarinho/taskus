
import React, { useState } from "react";
import '../../styles/refino.css';
import { useProcess } from "@/hooks/useProcess.js";

const ContratacaoDadosStep = ({ onConfirm, dados = {} }) => {
    const { processData, updateUserData } = useProcess();


    // Dados do usuário do contexto
    let nomeContexto = '';
    if (processData?.userData?.firstName) {
        nomeContexto = `${processData.userData.firstName} ${processData.userData?.lastName || ''}`.trim();
    }
    const cpfContexto = processData?.userData?.cpf || '';


    // Inputs editáveis
    const [nome, setNome] = useState(nomeContexto || dados.nome || "");
    const [cpf, setCpf] = useState(formatCPF(cpfContexto || ""));
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

    const handleNomeChange = (e) => setNome(e.target.value);

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
            await updateUserData({ nome, cpf: onlyDigits });
            if (nome && cpf) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                await onConfirm({ nome, cpf: onlyDigits });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-8 pb-10">
            <form className="w-full max-w-md mx-auto bg-transparent" onSubmit={handleSubmit}>
                {/* Código de aprovação */}
                <div className="mb-4 flex justify-start">
                    <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
                        Código de aprovação: #WST-782411
                    </span>
                </div>

                {/* Título */}
                <h1 className="font-hendrix-bold text-3xl text-white mb-3 leading-tight">
                    Preencha os seus dados pessoais com atenção!
                </h1>
                <p className="font-hendrix-regular text-base text-gray-300 mb-8">
                    Para formalizar o contrato trabalhista e assinar sua carteira precisamos do seu CPF e seu nome completo como consta em seu documento.
                </p>

                {/* Card de dados */}
                <div className="space-y-6 mb-10">
                    {/* Nome */}
                    <div className="flex flex-col items-start">
                        <label className="font-hendrix-medium text-white text-base mb-2" htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            className="bg-white rounded-2xl px-5 py-3 w-full font-hendrix-semibold text-gray-900 text-lg focus:outline-none"
                            value={nome}
                            onChange={handleNomeChange}
                            placeholder="Nome completo"
                            required
                        />
                    </div>


                    <p className=" text-base text-gray-500 mt-10">
                        Informe seu CPF para completar seus dados.
                    </p>
                    {/* CPF */}
                    <div className="flex flex-col items-start">
                        <label className="font-hendrix-medium text-white text-base mb-2" htmlFor="cpf">CPF</label>
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
                            <span className="text-red-500 font-hendrix-regular mt-2 text-sm">{cpfError}</span>
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
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    )}
                    {isLoading ? 'Aguarde...' : 'Confirmar'}
                </button>
            </form>
        </div>
    );
};

export default ContratacaoDadosStep;