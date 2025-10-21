import React, { useState, useContext, useMemo } from "react";
import '../../styles/refino.css';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import { Loader2 } from 'lucide-react';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Alternatives from "@/components/modules/Alternatives";

// Os dados dos turnos permanecem os mesmos
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
    // O estado agora armazena o 'value' do turno selecionado (ex: "manha")
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateUserData } = useContext(ProcessContext);

    // Converte o array 'turnos' para o formato que o componente 'Alternatives' espera.
    // O useMemo evita que essa conversão seja refeita a cada renderização.
    const turnoOptions = useMemo(() => turnos.map(turno => ({
        id: turno.value, // 'id' é usado para identificação no 'Alternatives'
        text: turno.label // 'text' é o que será exibido no botão
    })), []);

    // A função de confirmação agora é chamada pelo 'onConfirm' do 'Alternatives'
    const handleConfirm = async (selectedValue) => {
        if (!selectedValue) return;

        setLoading(true);
        // Encontra o label correspondente ao valor selecionado
        const turnoLabel = turnos.find(t => t.value === selectedValue)?.label || '';
        
        if (updateUserData) {
            await updateUserData({ turnoTrabalho: { label: turnoLabel } });
        }

        // Simula um tempo de espera para a operação assíncrona
        await new Promise(res => setTimeout(res, 2000));
        setLoading(false);

        if (onEnviar) {
            onEnviar(turnoLabel);
        }
    };

    return (
        <div className="min-h-screen bloco_principal">
            <Maintexts>
                <Headlines variant="white">
                    Agora escolha em qual turno você deseja trabalhar
                </Headlines>
                <Paragraphs variant="white">
                    Lembrando que nossa escala de trabalho é de Segunda a Sexta-Feira.
                    A carga horária são de 8 horas por dia.
                </Paragraphs>
            </Maintexts>
            
            {/* 
              O formulário não é mais estritamente necessário se o botão de submissão
              estiver dentro do componente Alternatives, mas pode ser mantido por
              questões de estrutura ou semântica.
            */}
            <div className="w-full max-w-md mx-auto bg-transparent">
                <Alternatives
                    answers={turnoOptions}      // Passa as opções de turno formatadas
                    selectedId={selected}       // Controla qual item está selecionado
                    onChange={setSelected}      // Atualiza o estado quando um item é clicado
                    onConfirm={handleConfirm}   // Função a ser chamada ao clicar no botão de confirmação
                    isLoading={loading}         // Desabilita o componente e mostra feedback de carregamento
                    confirmText={loading ? 'Enviando...' : 'Confirmar'} // Texto do botão de confirmação
                />
            </div>
        </div>
    );
};

export default ContratacaoDocumentosStep;
