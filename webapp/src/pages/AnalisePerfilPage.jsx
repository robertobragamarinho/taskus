/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProcess } from '../hooks/useProcess.js';

import PaymentItauLoadingStep from '../modules/PaymentItauLoadingStep.jsx';
import FooterFinal, { FooterFinalReduzida } from '../components/modules/FooterFinal';

import Header from "../components/modules/Header";
import Headlines from "../components/modules/Headlines";
import Paragraphs from "../components/modules/Paragraphs";
import Maintexts from "../components/modules/Main-texts";
import Icons from "../components/modules/Icons";
import { IconMessage } from "../components/modules/SvgIcons";
import CardTime from "../components/modules/CardTime";

import InfoIconMin from '../assets/info_icon-min.webp';
import PersonalInfoStep from '@/components/steps/PersonalInfoStep.jsx';
import ProfileAnalysisStep from '../components/steps/ProfileAnalysisStep.jsx';
import FinalQuestionStep from '../components/steps/FinalQuestionStep.jsx';
import ExplanatoryCards from "../components/modules/ExplanatoryCards";
import { IconAlert } from "../components/modules/SvgIcons";

import backendAPI from '../services/backendAPIService';

const AnalisePerfilPage = () => {
  const navigate = useNavigate();
  const { updateProcessStep, completeProcess } = useProcess();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [profileAnswers, setProfileAnswers] = useState({});
  const [showFinalStep, setShowFinalStep] = useState(false);

  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    termsAccepted: false,
  });

  const updatePersonalData = (patch) => {
    setPersonalData(prev => ({ ...prev, ...patch }));
  };

  // Quando a tela de loading finalizar
  const handleLoadingDone = () => {
    setIsLoading(false);
    setCurrentPhase('personalInfo');
  };

  // Cards de alerta
  const alerts = [
    {
      id: 'equipments-alert',
      icon: IconAlert,
      title: 'Aviso importante',
      description:
        'Ao escolher uma resposta e tocar em "continuar" não será mais possível voltar, então leia tudo com atenção.'
    }
  ];

  // PERGUNTAS — versão formal
  const profileQuestions = [
    { id: 1,  question: "Você já atuou anteriormente com atendimento ao cliente?", subtitle: "A experiência prévia não é obrigatória para esta vaga.", answers: [{ id: 1, text: "Sim" }, { id: 2, text: "Não" }] },
    { id: 2,  question: "Você está disposto(a) a desempenhar suas funções com excelência para conquistar esta vaga?", answers: [{ id: 1, text: "Sim, desejo muito esta oportunidade." }, { id: 2, text: "Tenho dúvidas no momento." }] },
    { id: 3,  question: "Qual modalidade de trabalho você considera mais adequada?", answers: [{ id: 1, text: "Home Office (em casa)" }, { id: 2, text: "Presencial (na empresa)" }, { id: 3, text: "Híbrido (na empresa e em casa)" }] },
    { id: 4,  question: "Você se considera uma pessoa tranquila para lidar com clientes?", answers: [{ id: 1, text: "Sim, tenho bastante paciência." }, { id: 2, text: "Em parte." }, { id: 3, text: "Não me considero paciente." }] },
    { id: 5,  question: "Você aprecia trabalhar em equipe?", answers: [{ id: 1, text: "Sim, gosto muito." }, { id: 2, text: "Consigo me adaptar conforme a necessidade." }, { id: 3, text: "Prefiro trabalhar individualmente." }] },
    { id: 6,  question: "Como você costuma proceder diante de dificuldades no trabalho?", answers: [{ id: 1, text: "Busco a solução de forma autônoma." }, { id: 2, text: "Solicito apoio a colegas ou superiores." }, { id: 3, text: "Fico apreensivo(a), mas tento resolver." }] },
    { id: 7,  question: "Você tem interesse em desenvolver sua carreira e assumir novas responsabilidades?", answers: [{ id: 1, text: "Sim, esse é meu objetivo." }, { id: 2, text: "Talvez, depende da oportunidade." }, { id: 3, text: "Prefiro manter funções mais simples." }] },
    { id: 8,  question: "De que forma você aprende com maior facilidade?", answers: [{ id: 1, text: "Assistindo a vídeos/aulas." }, { id: 2, text: "Lendo materiais escritos." }, { id: 3, text: "Praticando de forma autônoma." }, { id: 4, text: "Com orientação de colegas ou supervisores." }] },
    { id: 9,  question: "Quantas horas por dia você tem disponibilidade para trabalhar?", answers: [{ id: 1, text: "Até 4 horas" }, { id: 2, text: "De 4 a 6 horas" }, { id: 3, text: "De 6 a 8 horas" }, { id: 4, text: "Mais de 8 horas" }] },
    { id: 10, question: "Ao receber o primeiro salário, qual será sua principal prioridade?", answers: [{ id: 1, text: "Quitar despesas e reduzir dívidas." }, { id: 2, text: "Auxiliar minha família." }, { id: 3, text: "Guardar ou investir para o futuro." }, { id: 4, text: "Adquirir um item desejado há algum tempo." }, { id: 5, text: "Outra prioridade." }] },
    { id: 11, question: "Você possui disponibilidade para iniciar em até 15 dias após a aprovação?", answers: [{ id: 1, text: "Sim, posso iniciar dentro desse prazo." }, { id: 2, text: "Não, necessito de mais tempo." }, { id: 3, text: "Não, necessito de mais tempo pois estou empregado(a) atualmente." }] },
    { id: 12, question: "Qual o principal motivo do seu interesse por esta oportunidade?", answers: [{ id: 1, text: "Busco um trabalho estável e digno." }, { id: 2, text: "Estou em busca de recolocação profissional." }, { id: 3, text: "Pretendo trabalhar de casa com maior autonomia." }, { id: 4, text: "Desejo crescer em uma carreira internacional." }] },
    { id: 13, question: "Você está disposto(a) a dedicar-se para promover uma mudança positiva em sua vida por meio desta oportunidade?", answers: [{ id: 1, text: "Sim, estou 100% comprometido(a)." }, { id: 2, text: "Ainda possuo dúvidas, porém desejo tentar." }] },
    { id: 14, question: "Caso seja aprovado(a), você se compromete a concluir o treinamento obrigatório antes do início das atividades?", answers: [{ id: 1, text: "Sim, estou preparado(a) para realizar a capacitação." }, { id: 2, text: "Ainda não posso me comprometer." }] },
  ];

  const handleStartProfile = async () => {
    await sendConversionEvent('track', 'Lead');
    setCurrentPhase('analysis');
  };

  const handleAnswerSelect = async (answerId) => {
    const currentQuestionData = profileQuestions[currentQuestion - 1];
    const selectedAnswer = currentQuestionData.answers.find(answer => answer.id === answerId);
    const answerText = selectedAnswer ? selectedAnswer.text : '';

    const newAnswers = { ...profileAnswers, [currentQuestion]: answerText };
    setProfileAnswers(newAnswers);

    try {
      await updateProcessStep(
        'analisePerfil',
        currentQuestion,
        { [currentQuestion]: answerText },
        currentQuestion
      );
    } catch (err) {
      console.error('Erro ao atualizar etapa:', err);
    }

    if (currentQuestion < profileQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      try {
        await completeProcess('analisePerfil', newAnswers);
      } catch (err) {
        console.error('Erro ao completar processo antes do passo final:', err);
      }
      setShowFinalStep(true);
    }
  };

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  const sendConversionEvent = async (action, eventName) => {
    let clientIp = '127.0.0.1';
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      clientIp = data.ip;
    } catch (e) {
      console.warn('Não foi possível obter o IP real, usando 127.0.0.1');
    }

    const eventData = {
      ip_adress: clientIp,
      fbc: getCookie('_fbc') || 'N/A',
      fbp: getCookie('_fbp') || 'N/A',
      event_name: eventName,
      event_time: String(Math.floor(Date.now() / 1000)),
      action_source: 'website',
      event_source_url: window.location.href,
      client_user_agent: window.navigator.userAgent.substring(0, 100),
    };

    backendAPI.sendConversionEvent(eventData)
      .then(res => console.log('Conversão enviada:', res))
      .catch(err => console.error('Erro ao enviar conversão:', err));
  };

  // ======= RENDER =======
  if (isLoading) {
    return (
      <PaymentItauLoadingStep
        stepIndex={1}                     // alvo: 2 (1 abre azul, vira verde; 2 fica azul)
        animateFromPrevious                // (default true) garante animação 1 -> 2
        autoAdvanceMs={3000}
        onLoadingComplete={handleLoadingDone}
        headline="Processo Seletivo"
        subline="Estamos preparando tudo para você iniciar o processo seletivo."
        rotatingMessages={{
          1: ['Preparando sua entrevista…', 'Verificando conexão…', 'Carregando recursos…'],
          2: ['Validando informações…', 'Organizando seu perfil…', 'Quase lá…']
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      <Header rightText="Processo Seletivo" />

      <div className="flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-sm border overflow-hidden">
          <div className="p-5 pb-5">
            <AnimatePresence mode="wait">
              {currentPhase === 'personalInfo' ? (
                <motion.div
                  key="personal-info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <PersonalInfoStep
                    data={personalData}
                    updateData={updatePersonalData}
                    errors={{}}
                    onComplete={() => setCurrentPhase('intro')}
                  />
                </motion.div>
              ) : currentPhase === 'intro' ? (
                <motion.div
                  key="profile-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                > 
                  <div className="bloco_principal">
                    <Icons Icon={IconMessage} size={60} color="#1655ff" />
                    <Maintexts>
                      <Headlines variant="black">Vamos conhecer um pouco mais sobre você</Headlines>
                      <Paragraphs variant="black">
                        Você vai responder 14 perguntas rápidas para entendermos melhor o seu perfil. Fique tranquilo(a), não existe resposta certa ou errada.
                      </Paragraphs>
                    </Maintexts>
                    <CardTime text="Esta etapa leva menos de 3 minutos." icon={InfoIconMin} />
                  </div>

                  <ExplanatoryCards supportTypes={alerts} variant="alert" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="pt-4"
                  >
                    <motion.button
                      onClick={handleStartProfile}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.03 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
                        fontSize: '7pt',
                        boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
                        border: 'none',
                      }}
                    >
                      <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '12pt' }}>
                        Iniciar
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={`question-${currentQuestion}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {showFinalStep ? (
                    <FinalQuestionStep
                      seconds={30}
                      onCountdownFinish={() => navigate('/testeHabilidades')}
                    />
                  ) : (
                    <ProfileAnalysisStep
                      currentQuestion={currentQuestion}
                      totalQuestions={profileQuestions.length}
                      onAnswerSelect={handleAnswerSelect}
                      questionData={profileQuestions[currentQuestion - 1] || profileQuestions[0]}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
      </div>
      <FooterFinalReduzida />
    </div>
  );
};

export default AnalisePerfilPage;