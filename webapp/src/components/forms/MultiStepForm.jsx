import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import FooterFinal from "../modules/FooterFinal";

// Importar componentes das etapas
import LoadingStep from '../steps/LoadingStep.jsx';
// PersonalInfoStep removed from flow
import WhatYouWillDoStep from '../steps/WhatYouWillDoStep.jsx';
import SupportTypesInfoStep from '../steps/SupportTypesInfoStep.jsx';
import CustomerServiceProcessStep from '../steps/CustomerServiceProcessStep.jsx';
import SupportInfoStep from '../steps/SupportInfoStep.jsx';
import EquipmentInfoStep from '../steps/EquipmentInfoStep.jsx';
import BenefitsStep from '../steps/BenefitsStep.jsx';
import PreferencesStep from '../steps/PreferencesStep.jsx';
import ConfirmationStep from '../steps/ConfirmationStep.jsx';

import IniciaProcessoSeletivo from '../steps/IniciaProcessoSeletivo.jsx';
import ProximaFase from '../steps/ProximaFase.jsx';

import LogoTaskUs from '../../assets/logo-min.webp'


const MultiStepForm = () => {
  // Não usar comunicação com backend nesta rota /cadastro — fluxo local apenas
  const navigate = useNavigate();

  // Estado para controlar a etapa atual
  const [currentStep, setCurrentStep] = useState(0);

  // Estado global dos dados do formulário
  const [_formData, setFormData] = useState({
    // Etapa 1 - Informações Pessoais
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      termsAccepted: false
    },
    // Etapa 3 - Tipos de Suporte
    supportPreferences: {
      selectedType: ''
    },
    // Etapa 4 - Preferências
    preferences: {
      plan: '',
      notifications: false,
      newsletter: false,
      interests: []
    }
  });

  // Estado para controlar erros de validação

  // Estado para controlar loading
  const [isLoading, setIsLoading] = useState(false);

  // Configuração das etapas
  const steps = [
    {
      id: 0,
      title: 'Carregando',
      description: 'Iniciando processo seletivo'
    },
    {
      id: 1,
      title: 'Início',
      description: 'Inicie o processo seletivo'
    },
    {
      id: 2,
      title: 'O que você fará',
      description: 'Entenda suas responsabilidades'
    },
    {
      id: 3,
      title: 'Tipos de Suporte',
      description: 'Conheça as modalidades de atendimento'
    },
    {
      id: 4,
      title: 'Como são os atendimentos',
      description: 'Entenda o processo de trabalho'
    },
    {
      id: 5,
      title: 'Equipamentos',
      description: 'Equipamentos fornecidos'
    },
    {
      id: 6,
      title: 'Benefícios',
      description: 'Conheça os benefícios oferecidos'
    }
    ,
    {
      id: 7,
      title: 'Novo Step',
      description: 'Placeholder para novo step'
    }
  ];

  // (PersonalInfo removed from flow)

  // Função para atualizar dados do formulário (mantida para compatibilidade)
  // prefixada com _ para indicar que pode não ser usada diretamente aqui
  const _updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      }
    }));
  };

  // No per-step validation required after removing PersonalInfo step

  // Função para avançar para próxima etapa
  const nextStep = async () => {
    // Se já estivermos no último step (7), finalizar/submit
    if (currentStep >= steps.length - 1) {
      await handleSubmit();
      return;
    }

    setIsLoading(true);
    try {
      // avanço até o último índice (steps.length - 1) — sem chamadas ao backend
      const newStep = Math.min(currentStep + 1, steps.length - 1);
      setCurrentStep(newStep);
    } catch (error) {
      console.error('Erro ao atualizar etapa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para voltar uma etapa
  const handleBack = async () => {
    if (isLoading) return;
    // não retrocede abaixo de 0
    const prev = Math.max(currentStep - 1, 0);
    setIsLoading(true);
    try {
      // apenas atualiza localmente sem backend
      setCurrentStep(prev);
    } catch (error) {
      console.error('Erro ao voltar etapa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para enviar formulário
  const handleSubmit = async () => {
    // Sem comunicação com backend — apenas prosseguir localmente para a próxima rota
    setIsLoading(true);
    try {
      // pequena simulação de processamento para feedback visual
      setTimeout(() => {
        setIsLoading(false);
        navigate('/analisePerfil');
      }, 300);
    } catch (error) {
      console.error('Erro ao finalizar cadastro (fluxo local):', error);
      setIsLoading(false);
    }
  };

  // Renderizar componente da etapa atual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LoadingStep
            onComplete={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <IniciaProcessoSeletivo />

        );
      case 2:
        return (
          <WhatYouWillDoStep />
        );
      case 3:
        return (
          <SupportTypesInfoStep />
        );
      case 4:
        return (
          <CustomerServiceProcessStep />
        );
      case 5:
        return (
          <EquipmentInfoStep />
        );
      case 6:
        return (
          <BenefitsStep />
        );
      case 7:
        return (
          <ProximaFase />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div className="bg-[#00005f] border-b border-gray-200 flex-shrink-0">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Logo ToskUs */}
            <div className="flex items-center space-x-2"> 

              <div className="flex items-center space-x-1">
                <img
                  src={LogoTaskUs}
                  className='h-6'
                />
              </div>
            </div>


            {/* Logo Recrutamento Online */}
            <div className="flex items-center space-x-2">
              <span className="font-hendrix-medium text-xs text-blue-200">{'Processo Seletivo'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-sm border overflow-hidden">
          <div className="p-5 pb-8">
            {/* Renderizar etapa atual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>

            {/* Botões de navegação */}
            <div className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {([3, 4, 5, 6, 7].includes(currentStep)) ? (
                  <div className="flex gap-1">
                    {/* Botão voltar (esquerda) */}
                    <button
                      onClick={handleBack}
                      disabled={isLoading}
                      className={`h-14 w-30 flex items-center gap-2 px-2 py-5 text-gray-800 rounded-full transition-all duration-300 hover:opacity-90 ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
                      style={{
                        background: '#000',
                        color: '#fff',
                        fontSize: '10pt'
                      }}
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                      Voltar
                    </button>

                    {/* Botão continuar / finalizar (direita) */}
                    {currentStep < steps.length - 1 ? (
                      <button
                        onClick={nextStep}
                        disabled={isLoading}
                        className={`h-14 flex-1 flex items-center justify-end gap-2 px-2 py-5 text-white rounded-full transition-all duration-300 hover:opacity-90 ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
                        style={{
                          background: isLoading
                            ? 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)'
                            : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                          fontSize: '10pt'
                        }}
                      >
                        {isLoading ? (
                          <>
                            Salvando...
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            {currentStep === 1 ? 'Iniciar Agora' : 'Continuar'}
                            <ChevronRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 text-white rounded-full transition-all duration-300 hover:opacity-90 ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
                        style={{
                          background: isLoading
                            ? 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)'
                            : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                          fontSize: '9pt'
                        }}
                      >
                        {isLoading ? (
                          <>
                            Finalizando...
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            {currentStep === 7
                              ? 'Iniciar Entrevista'
                              : currentStep === 1
                                ? 'Iniciar Agora'
                                : 'Continuar'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  // Para steps 0,1,2 mostramos apenas o botão direito em largura total
                  <div>
                    {currentStep < steps.length - 1 ? (
                      <button
                        onClick={nextStep}
                        disabled={isLoading}
                        className={`h-14 w-full flex items-center font-hendrix-medium justify-center gap-2 px-6 py-3 text-white rounded-full transition-all duration-300 hover:opacity-90 ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
                        style={{
                          background: isLoading
                            ? 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)'
                            : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                          fontSize: '14pt',

                        }}
                      >
                        {isLoading ? (
                          <>
                            Salvando...
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            {currentStep === 7
                              ? 'Iniciar Entrevista'
                              : currentStep === 1
                                ? 'Iniciar Agora'
                                : 'Continuar'}
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-full transition-all duration-300 hover:opacity-90 ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
                        style={{
                          background: isLoading
                            ? 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)'
                            : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                          fontSize: '9pt'
                        }}
                      >
                        {isLoading ? (
                          <>
                            Finalizando...
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            {currentStep === 7
                              ? 'Iniciar Entrevista'
                              : currentStep === 1
                                ? 'Iniciar Agora'
                                : 'Continuar'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
      </div>

       <FooterFinal />
       
    </div>
    
  );
};

export default MultiStepForm;

