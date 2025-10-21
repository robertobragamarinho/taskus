import ContratacaoGerenteStep from '../components/steps/ContratacaoGerenteStep.jsx';


import { useState } from 'react';
import ContratacaoIntroStep from '../components/steps/ContratacaoIntroStep.jsx';
import ContratacaoDadosStep from '../components/steps/ContratacaoDadosStep.jsx';

import ContratacaoDocumentosStep from '../components/steps/ContratacaoDocumentosStep.jsx';

import ContratacaoFinalStep from '../components/steps/ContratacaoFinalStep.jsx';

import ContratacaoEquipamentosStep from '../components/steps/ContratacaoEquipamentosStep.jsx';
import ContratacaoPreparacaoStep from '../components/steps/ContratacaoPreparacaoStep.jsx';

import T15 from '../components/steps/T15.jsx';

import LogoTaskUs from '../assets/logo-min.webp';


// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import { useProcess } from '../hooks/useProcess.js';
import { useNavigate } from 'react-router-dom';

const ContratacaoPage = () => {
  const navigate = useNavigate();


  const [currentStep, setCurrentStep] = useState(1);
  const [contratacaoData, setContratacaoData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const { updateProcessStep, processData } = useProcess() || {};

  // Fallback seguro para updateProcessStep
  const safeUpdateProcessStep = async (...args) => {
    if (typeof updateProcessStep === 'function') {
      try {
        await updateProcessStep(...args);
      } catch (err) {
        // Silencioso, não impede o fluxo
        console.error('Erro ao salvar etapa:', err);
      }
    }
  };

  // Step 1: Introdução
  const handleStart = async () => {
    await safeUpdateProcessStep('contratacao', 1, {}, 'intro_finalizada');
    setCurrentStep(8);
  };

  const handleContiue = async () => {
    await safeUpdateProcessStep('contratacao', 8, {}, 'intro_finalizada');
    setCurrentStep(2);
  };

  // Step 2: Dados do candidato
  const handleDadosConfirmados = async (dados) => {
    setContratacaoData(prev => ({ ...prev, ...dados }));
    await safeUpdateProcessStep('contratacao', 2, dados, 'dados_confirmados');
    setCurrentStep(3);
  };

  // Step 3: Documentos
  const handleDocumentosEnviados = async (docs) => {
    setContratacaoData(prev => ({ ...prev, documentos: docs }));
    await safeUpdateProcessStep('contratacao', 3, docs, 'documentos_confirmados');
    setCurrentStep(4);
  };

  // Step 4: Finalização (data de início)
  const handleFinalizar = async (dataInicio) => {
    setContratacaoData(prev => ({ ...prev, dataInicio }));
    await safeUpdateProcessStep('contratacao', 4, { dataInicio }, 'data_inicio_confirmada');
    setCurrentStep(5);
  };

  // Step 5: Equipamentos e endereço
  const handleEquipamentos = async (dadosEndereco) => {
    setContratacaoData(prev => ({ ...prev, endereco: dadosEndereco }));
    await safeUpdateProcessStep('contratacao', 5, dadosEndereco, 'endereco_confirmado');
    setCurrentStep(6);
  };

  // Step 6: Preparação e rastreio
  const handlePreparacao = async () => {
    await safeUpdateProcessStep('contratacao', 6, {}, 'preparacao_finalizada');
    setCurrentStep(7);
  };

  // Step 7: Conheça seu gerente
  const handleGerente = async () => {
    await safeUpdateProcessStep('contratacao', 7, {}, 'gerente_apresentado');

    navigate('/payment');
  };

  return (
     <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
          {/* Header */}
          <div className="bg-[#00005f] flex-shrink-0">
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
                  <span className="font-hendrix-medium text-xs text-blue-200">{'Contratação'}</span>
                </div>
              </div>
            </div>
          </div>

      {/* Main Content */}
      <div className="w-full max-w-md bg-[#0a0026] shadow-lg px-5 py-2 flex flex-col items-center">

        {/* Step 1: Introdução */}
        {currentStep === 1 && (
          <ContratacaoIntroStep onStart={handleStart} />
        )}

        {currentStep === 8 && (
          <T15 onContinue={handleContiue} />
        )}

        {/* Step 2: Dados do candidato */}
        {currentStep === 2 && (
          <ContratacaoDadosStep onConfirm={handleDadosConfirmados} dados={contratacaoData} />
        )}
        {/* Step 3: Documentos */}
        {currentStep === 3 && (
          <ContratacaoDocumentosStep onEnviar={handleDocumentosEnviados} />
        )}
        {/* Step 4: Data de início */}
        {currentStep === 4 && (
          <ContratacaoFinalStep onFinalizar={handleFinalizar} dados={contratacaoData} />
        )}
        {/* Step 5: Equipamentos e endereço */}
        {currentStep === 5 && (
          <ContratacaoEquipamentosStep onConfirm={handleEquipamentos} />
        )}
        {/* Step 6: Preparação e rastreio */}
        {currentStep === 6 && (
          <ContratacaoPreparacaoStep
            onContinuar={handlePreparacao}
            enderecoFormatado={formatarEndereco(contratacaoData.endereco)}
          />
        )}
        {/* Step 7: Conheça seu gerente */}
        {currentStep === 7 && (
          <ContratacaoGerenteStep onContinuar={handleGerente} />
        )}


      </div>
    </div>
  );
};

export default ContratacaoPage;

// Função para formatar o endereço para exibição
function formatarEndereco(endereco) {
  if (!endereco) {
    return '';
  }
  const {
    rua = '',
    numero = '',
    complemento = '',
    bairro = '',
    municipio = {},
    estado = {}
  } = endereco;
  let linha1 = `${rua}${rua && numero ? ', ' : ''}${numero}${complemento ? ', ' + complemento : ''}${bairro ? ', ' + bairro : ''}`;
  let linha2 = `${municipio.nome || ''}${municipio.nome && estado.nome ? ', ' : ''}${estado.nome || estado.sigla || ''}`;
  return linha1 + (linha2 ? `\n${linha2}` : '');
}
