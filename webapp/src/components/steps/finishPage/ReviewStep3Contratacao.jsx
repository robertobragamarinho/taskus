/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Maintexts from "../../modules/Main-texts";
import Headlines from "../../modules/Headlines";
import Paragraphs from "../../modules/Paragraphs";
import ExplanatoryCards from "../../modules/ExplanatoryCards";

const ReviewStep3Contratacao = ({ onContinue }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (onContinue) onContinue();
        }, 1000);
    };

    const alerts = [
  {
    id: "training",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1655ff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <g fill="none" color="currentColor">
          <path d="M14.953 12.395c-.151.627-.867 1.07-2.3 1.955c-1.383.856-2.075 1.285-2.633 1.113a1.4 1.4 0 0 1-.61-.393C9 14.62 9 13.746 9 12s0-2.62.41-3.07c.17-.186.38-.321.61-.392c.558-.173 1.25.256 2.634 1.112c1.432.886 2.148 1.329 2.3 1.955a1.7 1.7 0 0 1 0 .79" />
          <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
        </g>
      </svg>
    ),
    title: "Inicie o treinamento",
    description:
      "Você será direcionado(a) para a plataforma da Q3 EAD. Basta informar seu CPF, e o sistema reconhece automaticamente que você já foi aprovado(a) pela TaskUs.",
  },
  {
    id: "training",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1655ff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M16 2v4M8 2v4m5-2h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-2c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4M3 10h18" />
        <path d="M9 16.5s1.5.5 2 2c0 0 2.177-4 5-5" />
      </svg>
    ),
    title: "Finalize o quanto antes",
    description:
      "Você tem até 15 dias para concluir o treinamento, mas quanto antes terminar, mais rápido poderá começar a trabalhar.",
  },
];


    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
 
    // Datas
    const data_hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const limite = new Date();
    limite.setDate(limite.getDate() + 15);
    const data_limite = limite.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hora_limite = limite.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="min-h-screen  w-full flex flex-col items-center justify-start bg-[#0a0026] px-6 pt-6 pb-5">
            <div className="">
                {/* Título principal */}
                <Maintexts>
                    <section id='ETP8T2'/>
                    <Headlines variant="white">
                       O treinamento é realizado pela<br/> TaskUs em parceria com a Q3<br/> EAD, nossa parceira oficial.
                    </Headlines>
                    <Paragraphs variant="white">
                        Essa é a última etapa antes de você começar<br/> a trabalhar. Veja como funciona:
                    </Paragraphs>
                </Maintexts>

                <div className="mt-5">
                    <ExplanatoryCards supportTypes={alerts} variant="supportTypes" />
                </div>


                {/* Botão fixo no rodapé */}
                <div className="w-full pt-2 pb-6 mt-10 flex justify-center">
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
                            <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Continuar</span>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ReviewStep3Contratacao;
