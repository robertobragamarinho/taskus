
import React, { useState } from "react";
import '../../styles/refino.css';
import { useProcess } from "@/hooks/useProcess.js";

const ContratacaoDadosStep = ({ onConfirm, dados = {} }) => {
    const { processData, updateUserData } = useProcess();


    // Dados do usuário do contexto
    const nomeContexto = processData?.userData?.firstName && processData?.userData?.lastName
        ? `${processData.userData.firstName} ${processData.userData.lastName}`
        : '';
    const cpfContexto = processData?.userData?.cpf || '';

    // Inputs editáveis
    const [nome, setNome] = useState(nomeContexto || dados.nome || "");
    const [cpf, setCpf] = useState(formatCPF(cpfContexto || ""));

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
    const handleCpfChange = (e) => setCpf(formatCPF(e.target.value));

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserData({ nome, cpf });
        if (nome && cpf) {
            onConfirm({ nome, cpf });
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
                    </div>
                </div>

                {/* Botão */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg hover:from-blue-600 hover:to-blue-500 transition flex items-center justify-center"
                >
                    Confirmar
                    <span className="ml-2 text-xl">&gt;</span>
                </button>
            </form>
        </div>
    );
};

export default ContratacaoDadosStep;