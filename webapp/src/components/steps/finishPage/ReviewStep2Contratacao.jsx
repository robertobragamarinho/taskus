/* eslint-disable no-unused-vars */


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';

const ReviewStep2Contratacao = ({ onContinue }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);




    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (onContinue) onContinue();
        }, 1000);
    };


    // Dúvidas frequentes
    const faqList = [
        {
            question: 'Enviar os seus acessos do sistema',
            answer: 'Você receberá seus acessos por e-mail após a conclusão do treinamento. Caso não receba, entre em contato com o gerente.'
        },
        {
            question: 'Como agendar minha data de início?',
            answer: 'O gerente entrará em contato pelo WhatsApp para agendar sua data de início após o treinamento.'
        },
        {
            question: 'Como assinar minha carteira de trabalho?',
            answer: 'A assinatura será feita digitalmente após a conclusão do treinamento e envio dos documentos.'
        },
        {
            question: 'Quando recebo os equipamentos?',
            answer: 'O envio dos equipamentos será iniciado após a confirmação da contratação e treinamento.'
        },
        {
            question: 'Quem será meu gerente?',
            answer: 'Você será apresentado ao gerente responsável assim que concluir o treinamento.'
        },
        {
            question: 'Como acessar o sistema?',
            answer: 'Os acessos serão enviados por e-mail e WhatsApp após o treinamento.'
        },
        {
            question: 'Posso tirar dúvidas com o gerente?',
            answer: 'Sim! O gerente estará disponível para tirar dúvidas pelo WhatsApp após o treinamento.'
        }
    ];



    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#181A1B] px-6 pt-8 pb-10">
            <div className="w-full max-w-md mx-auto px-0 pt-8 pb-0">
                {/* Título principal */}
                <h1 className="font-hendrix-bold text-white mb-2 text-left" style={{ fontSize: '27pt', lineHeight: 1.1 }}>
                    Parabéns! Sua contratação foi confirmada.
                </h1>
                <p className="font-hendrix-regular text-[#B3B3B3] mb-8 text-left" style={{ fontSize: '15pt', lineHeight: 1.3 }}>
                    Sua contratação já está garantida. Os últimos passos são: concluir o treinamento, assinar a sua carteira de trabalho e confirmar sua data de início.
                </p>

                {/* Card 1 */}
                <div className="bg-[#232323] rounded-2xl px-7 py-7 mb-6" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="font-hendrix-bold text-white text-4xl mb-2">1</div>
                    <div className="font-hendrix-bold text-white text-lg mb-2">Antes de assinarmos sua carteira e formalizarmos o contrato de trabalho, é necessário que você conclua o treinamento obrigatório.</div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#232323] rounded-2xl px-7 py-7 mb-6" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="font-hendrix-bold text-white text-4xl mb-2">2</div>
                    <div className="font-hendrix-bold text-white text-lg mb-2">Acabamos de enviar um e-mail com a confirmação oficial da sua contratação.</div>
                    <div className="font-hendrix-regular text-[#B3B3B3] text-base">Se não encontrar na caixa de entrada, confira também sua pasta de spam. Não se preocupe: é apenas um aviso com detalhes da sua contratação.</div>
                </div>

                {/* Card 3 - EXATAMENTE igual à imagem */}
                <div className="bg-[#232323] rounded-2xl px-7 py-7 mb-8 flex flex-col" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="font-hendrix-bold text-white text-[44px] leading-none mb-2">3</div>
                    <div className="font-hendrix-bold text-white text-[18px] leading-tight mb-3">Assim que você concluir o treinamento, o Antônio (Gerente de equipe) entrará em contato pelo WhatsApp para:</div>
                    <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-3 font-hendrix-regular text-[#B3B3B3] text-[17px]">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 9l-5 5-3-3" stroke="#1655ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            Te dar as intruções iniciais
                        </li>
                        <li className="flex items-center gap-3 font-hendrix-regular text-[#B3B3B3] text-[17px]">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 9l-5 5-3-3" stroke="#1655ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            Agendar sua data de inicio
                        </li>
                        <li className="flex items-center gap-3 font-hendrix-regular text-[#B3B3B3] text-[17px]">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 9l-5 5-3-3" stroke="#1655ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            Assinar sua carteira de trabalho
                        </li>
                        <li className="flex items-center gap-3 font-hendrix-regular text-[#B3B3B3] text-[17px]">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 9l-5 5-3-3" stroke="#1655ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            Enviar os seus acessos do sistema
                        </li>
                        <li className="flex items-center gap-3 font-hendrix-regular text-[#B3B3B3] text-[17px]">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 9l-5 5-3-3" stroke="#1655ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            Explicar sua rotina diária
                        </li>
                        <li className="flex items-center gap-3 font-hendrix-regular text-[#B3B3B3] text-[17px]">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 9l-5 5-3-3" stroke="#1655ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            Apresentar seus colegas de trabalho
                        </li>
                    </ul>
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



                <div className="w-full mt-2">
                    <h2 className="font-hendrix-bold text-white text-[28px] mb-1 text-left">Dúvidas frequentes</h2>
                    <p className="font-hendrix-regular text-[#B3B3B3] text-[18px] mb-6 text-left">Você tem alguma dúvida? Talvez isso possa te ajudar!</p>
                    <div className="flex flex-col gap-4">
                        {faqList.map((faq, idx) => (
                            <div key={idx} className="bg-[#232323] rounded-2xl px-7 py-4 flex flex-col transition-all duration-300" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                                <button
                                    className="w-full flex items-center justify-between focus:outline-none"
                                    style={{ minHeight: '48px' }}
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    <span className="font-hendrix-regular text-[#B3B3B3] text-[18px]">{faq.question}</span>
                                    <span className="ml-2">
                                        {openFaq === idx ? (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="#1655ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 6v12M6 12h12" stroke="#1655ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                    </span>
                                </button>
                                {openFaq === idx && (
                                    <div className="font-hendrix-regular text-[#B3B3B3] text-[16px] mt-3 text-left transition-all duration-300">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewStep2Contratacao;
