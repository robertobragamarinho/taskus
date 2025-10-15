// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcess } from '../hooks/useProcess.js';

import ReviewContratacao from '@/components/steps/finishPage/ReviewContratacao.jsx';
import ReviewStep2Contratacao from '@/components/steps/finishPage/ReviewStep2Contratacao.jsx';
import ReviewStep3Contratacao from '@/components/steps/finishPage/ReviewStep3Contratacao.jsx';
import ReviewStep4Contratacao from '@/components/steps/finishPage/ReviewStep4Contratacao.jsx';

const LogoVagaCerta = null;

const FinishPage = () => {

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();


  // eslint-disable-next-line no-unused-vars
  const { processData, updateProcessStep, completeProcess, resetAllData } = useProcess();
  const [currentStep, setCurrentStep] = useState(1);

  const continueReviewContratacao = () => {
    setCurrentStep(2);
  };

  const step2ReviewContratacao = () => {
    setCurrentStep(3);
  };

  const step3ReviewContratacao = () => {
    setCurrentStep(4);
  };

  const step4ReviewContratacao = async () => {
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181A1B]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 flex-shrink-0 w-full">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo VagaCerta */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <img
                  className='h-5 w-auto max-w-[120px] object-contain'
                  src={LogoVagaCerta}
                  alt="Logo VagaCerta"
                />
              </div>
            </div>
            {/* Logo Recrutamento Online */}
            <div className="flex items-center space-x-2">
              <span className="font-hendrix-medium text-xs text-gray-600 whitespace-nowrap">Contratação</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="">
        {currentStep === 1 && (
          <ReviewContratacao
            onContinue={continueReviewContratacao}
            processData={processData}
          />
        )}

        {currentStep === 2 && (
          <ReviewStep2Contratacao
            onContinue={step2ReviewContratacao}
          />
        )}

        {currentStep === 3 && (
          <ReviewStep3Contratacao
            onContinue={step3ReviewContratacao}
          />
        )}

        {currentStep === 4 && (
          <ReviewStep4Contratacao
            onContinue={step4ReviewContratacao}
          />
        )}
      </main>
    </div>
  );
};

export default FinishPage;
