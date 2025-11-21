import React, { useState, useContext, useMemo } from "react";
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import '../../styles/refino.css';

// Importações adicionadas conforme solicitado
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Alternatives from "@/components/modules/Alternatives";

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
    const { updateUserData } = useContext(ProcessContext);

    // Converte o array 'areas' para o formato que o componente 'Alternatives' espera.
    // useMemo garante que a conversão só ocorra se 'areas' mudar.
    const areaOptions = useMemo(() => areas.map(area => ({
        id: area.value, // 'id' é o identificador único para 'Alternatives'
        text: area.label // 'text' é o conteúdo exibido no botão
    })), []);

    // A função de confirmação é agora chamada pelo 'onConfirm' do 'Alternatives'.
    const handleConfirm = async (selectedValue) => {
        if (!selectedValue) return;

        setIsLoading(true);
        const areaLabel = areas.find(a => a.value === selectedValue)?.label || '';
        
        if (updateUserData) {
            await updateUserData({ areaAtuacao: { label: areaLabel } });
        }

        await new Promise(res => setTimeout(res, 2000));

        if (onFinalizar) {
            try {
                // O 'selectedValue' (ex: "email") é passado para a função onFinalizar.
                await Promise.resolve(onFinalizar(selectedValue));
            } catch (error) {
                console.error("Erro ao finalizar o passo:", error);
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bloco_principal">
            {/* Utilizando os componentes de texto para manter a consistência */}
            <Maintexts>
                <section id='ETP6T5'/>
                <Headlines variant="white">
                    Em qual área de atendimento você deseja trabalhar?
                </Headlines>
                <Paragraphs variant="white">
                    Selecione aquela que você se sente mais a vontade de atuar.
                </Paragraphs>
            </Maintexts>

            <div className="w-full max-w-md mx-auto bg-transparent">
                {/* Componente Alternatives substituindo os botões manuais */}
                <Alternatives
                    answers={areaOptions}
                    selectedId={selected}
                    onChange={setSelected}
                    onConfirm={handleConfirm}
                    isLoading={isLoading}
                    confirmText={isLoading ? 'Enviando...' : 'Confirmar'}
                />
            </div>
        </div>
    );
};

export default ContratacaoFinalStep;
