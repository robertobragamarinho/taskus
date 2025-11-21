// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcess } from '../hooks/useProcess.js';

import ReviewContratacao from '@/components/steps/finishPage/ReviewContratacao.jsx';
import ReviewStep2Contratacao from '@/components/steps/finishPage/ReviewStep2Contratacao.jsx';
import ReviewStep3Contratacao from '@/components/steps/finishPage/ReviewStep3Contratacao.jsx';
import ReviewStep4Contratacao from '@/components/steps/finishPage/ReviewStep4Contratacao.jsx';
import Header from '@/components/modules/Header.jsx';
import LogoTaskUs from '../assets/logo-min.webp';

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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
             {/* Header */}
             <Header rightText="Contratação" />
   

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
