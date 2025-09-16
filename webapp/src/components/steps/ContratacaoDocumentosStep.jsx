
import React, { useState, useContext } from "react";
import '../../styles/refino.css';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import { Loader2 } from 'lucide-react';

const turnos = [
    {
        label: "8:00 às 17:30 (1:30 de intervalo)",
        value: "manha"
    },
    {
        label: "13:00 às 22:00 (1:00 de intervalo)",
        value: "tarde"
    },
    {
        label: "20:00 às 05:00 (1:00 de intervalo)",
        value: "noite"
    }
];


const ContratacaoDocumentosStep = ({ onEnviar }) => {
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    // Não usar updateUserData, pois adiciona ao contexto raiz. Vamos salvar turnoTrabalho dentro de userData.
    const { updateUserData } = useContext(ProcessContext);

    const handleSelect = (value) => {
        setSelected(value);
    };

    const handleConfirm = async () => {
        if (!selected) return;
        setLoading(true);
        const turnoLabel = turnos.find(t => t.value === selected)?.label || '';
        // Salva turnoTrabalho dentro de userData
        if (updateUserData) {
            await updateUserData({ turnoTrabalho: { label: turnoLabel } });
        }
        await new Promise(res => setTimeout(res, 2000));
        setLoading(false);
        if (onEnviar) {
            onEnviar(turnoLabel);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-8 pb-10">
            <form className="w-full max-w-md mx-auto bg-transparent" onSubmit={e => { e.preventDefault(); handleConfirm(); }}>
                {/* Código de aprovação */}
                <div className="mb-4 flex justify-start">
                    <span className="bg-[#0ecb7b] text-white font-hendrix-medium text-xs px-3 py-1 rounded-full shadow" style={{ letterSpacing: '0.5px' }}>
                        Código de aprovação: #WST-782411
                    </span>
                </div>

                {/* Título */}
                <h1 className="font-hendrix-bold text-3xl text-white mb-3 leading-tight">
                    Agora escolha em qual turno você deseja trabalhar
                </h1>
                <p className="font-hendrix-regular text-base text-gray-300 mb-8">
                    Lembrando que nossa escala de trabalho é de Segunda a Sexta-Feira. A carga horária são de 8 horas por dia.
                </p>

                {/* Botões de turno */}
                <div className="space-y-6 mb-10">
                    {turnos.map((t) => (
                        <button
                            key={t.value}
                            type="button"
                            className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-white font-hendrix-semibold text-gray-900 text-lg shadow-lg transition-all border-2 focus:outline-none ${selected === t.value ? 'border-[#1655ff]' : 'border-transparent'}`}
                            onClick={() => handleSelect(t.value)}
                            style={{ boxShadow: selected === t.value ? '0 0 0 2px #1655ff' : undefined }}
                        >
                            <span className="flex items-center gap-2">
                                {t.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Botão de confirmação */}
                <button
                    type="submit"
                    disabled={!selected || loading}
                    className={`w-full py-3 rounded-full bg-gradient-to-r from-[#1655ff] to-[#60a5fa] font-hendrix-semibold text-white text-lg shadow-lg transition flex items-center justify-center ${(!selected || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <Loader2 className="animate-spin mr-2" size={22} />
                    ) : null}
                    {loading ? 'Enviando...' : 'Confirmar'}
                </button>
            </form>
        </div>
    );
};

export default ContratacaoDocumentosStep;
