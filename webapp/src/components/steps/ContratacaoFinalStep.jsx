
import React, { useState } from "react";
import '../../styles/refino.css';

const areas = [
    {
        label: "Suporte via E-mail",
        value: "email"
    },
    {
        label: "Suporte via WhatsApp",
        value: "whatsapp"
    },
    {
        label: "Suporte via Ligação",
        value: "ligacao"
    }
];

const ContratacaoFinalStep = ({ onFinalizar }) => {
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (value) => {
        setSelected(value);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (selected && onFinalizar) {
            setIsLoading(true);
            try {
                await Promise.resolve(onFinalizar(selected));
            } catch (error) {
                // erro silencioso
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-8 pb-10">
            <form className="w-full max-w-md mx-auto bg-transparent" onSubmit={handleConfirm}>
                {/* Código de aprovação */}
                <div className="mb-4 flex justify-start">
                    <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
                        Código de aprovação: #WST-782411
                    </span>
                </div>

                {/* Título */}
                <h1 className="font-hendrix-bold text-3xl text-white mb-3 leading-tight">
                    Em qual área de atendimento você deseja trabalhar?
                </h1>
                <p className="font-hendrix-regular text-base text-gray-300 mb-8">
                    Você só vai atuar na área escolhida. Selecione aquela em que se sente mais à vontade para garantir o melhor desempenho.
                </p>

                {/* Botões de área */}
                <div className="space-y-6 mb-10">
                    {areas.map((a) => (
                        <button
                            key={a.value}
                            type="button"
                            className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-white font-hendrix-semibold text-gray-900 text-lg shadow-lg transition-all border-2 focus:outline-none ${selected === a.value ? 'border-[#1655ff]' : 'border-transparent'}`}
                            onClick={() => handleSelect(a.value)}
                            style={{ boxShadow: selected === a.value ? '0 0 0 2px #1655ff' : undefined }}
                            disabled={isLoading}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-[#1655ff] text-xl">&gt;</span>
                                {a.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Botão de confirmação */}
                <button
                    type="submit"
                    disabled={!selected || isLoading}
                    className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${!selected || isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Confirmar
                    <span className="ml-2 text-xl">&gt;</span>
                </button>
            </form>
        </div>
    );
};

export default ContratacaoFinalStep;
