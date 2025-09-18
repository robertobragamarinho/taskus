/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProcess } from '../hooks/useProcess.js';
import ProfileAnalysisStep from '../components/steps/ProfileAnalysisStep.jsx';
import FinalQuestionStep from '../components/steps/FinalQuestionStep.jsx';

import LogoTaskUs from '../assets/logo-min.webp';
import InfoIconMin from '../assets/info_icon-min.webp';

import PersonalInfoStep from '@/components/steps/PersonalInfoStep.jsx';

import backendAPI from '../services/backendAPIService';



const AnalisePerfilPage = () => {
  const navigate = useNavigate();
  const { updateProcessStep, completeProcess, processData } = useProcess();

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [profileAnswers, setProfileAnswers] = useState({});
  const [showFinalStep, setShowFinalStep] = useState(false);
  // Local state para dados pessoais quando esta página monta o PersonalInfoStep
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

  useEffect(() => {
    // Loading com barra de progresso de 3 segundos
    const duration = 3000; // 3 segundos
    const interval = 30; // Atualizar a cada 30ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            // após loading, ir direto para PersonalInfoStep
            setCurrentPhase('personalInfo');
          }, 100);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Dados das perguntas da análise de perfil
  const profileQuestions = [
    {
      id: 1,
      question: "Você já trabalhou com atendimento ao cliente antes?",
      subtitle: "Lembrando que não é necessário ter experiência para essa vaga",
      answers: [
        { id: 1, text: "Sim" },
        { id: 2, text: "Não" }
      ]
    },
    {
      id: 2,
      question: "Você realmente está disposto(a) a dar o seu melhor para conquistar essa vaga?",
      answers: [
        { id: 1, text: "Sim, eu quero muito essa oportunidade" },
        { id: 2, text: "Não tenho certeza" }
      ]
    },
    {
      id: 3,
      question: "Qual é a melhor forma de trabalhar na sua opinião?",
      answers: [
        { id: 1, text: "Home Office (Em casa)" },
        { id: 2, text: "Presencial (Na empresa)" },
        { id: 3, text: "Híbrido (Na empresa e em casa)" }
      ]
    },
    {
      id: 4,
      question: "Você se sente uma pessoa calma para lidar com clientes?",
      answers: [
        { id: 1, text: "Sim, tenho muita paciência" },
        { id: 2, text: "Mais ou menos" },
        { id: 3, text: "Não tenho muita paciência" }
      ]
    },
    {
      id: 5,
      question: "Você se considera uma pessoa que gosta de trabalhar em equipe?",
      answers: [
        { id: 1, text: "Sim, gosto muito." },
        { id: 2, text: "Tanto faz, consigo me adaptar." },
        { id: 3, text: "Prefiro trabalhar sozinho(a)." }
      ]
    },
    {
      id: 6,
      question: "Como você reage quando encontra uma dificuldade no trabalho?",
      subtitle: "",
      answers: [
        { id: 1, text: "Procuro uma solução sozinho(a)." },
        { id: 2, text: "Peço ajuda a colegas ou superiores." },
        { id: 3, text: "Fico nervoso(a), mas tento resolver" }
      ]
    },
    {
      id: 7,
      question: "Você gostaria de crescer dentro da empresa e assumir novas responsabilidades?",
      subtitle: "",
      answers: [
        { id: 1, text: "Sim, esse é meu objetivo" },
        { id: 2, text: "Talvez, depende da oportunidade" },
        { id: 3, text: "Prefiro me manter em funções mais simples" }
      ]
    },
    {
      id: 8,
      question: "Como você aprende mais rápido?",
      answers: [
        { id: 1, text: "Assistindo vídeos/aulas" },
        { id: 2, text: "Lendo materiais escritos" },
        { id: 3, text: "Praticando sozinho(a)" },
        { id: 4, text: "Com ajuda de colegas ou supervisores" }
      ]
    },
    {
      id: 9,
      question: "Quantas horas por dia você pode se dedicar ao trabalho?",
      answers: [
        { id: 1, text: "Até 4 horas" },
        { id: 2, text: "De 4 a 6 horas" },
        { id: 3, text: "De 6 a 8 horas" },
        { id: 4, text: "Mais de 8 horas" }
      ]
    },
    {
      id: 10,
      question: "Quando receber seu primeiro salário, qual será sua prioridade?",
      answers: [
        { id: 1, text: "Pagar contas pendentes e aliviar dívidas" },
        { id: 2, text: "Ajudar minha família" },
        { id: 3, text: "Guardar ou investir para o futuro" },
        { id: 4, text: "Comprar algo que desejo há tempos" },
        { id: 5, text: "Outra coisa" }
      ]
    },
    {
      id: 11,
      question: "Você tem disponibilidade para começar a trabalhar em até 15 dias após a aprovação?",
      answers: [
        { id: 1, text: "Sim, posso iniciar dentro desse prazo." },
        { id: 2, text: "Não, preciso de mais tempo." },
        { id: 3, text: "Não, preciso de mais tempo pois estou trabalhando no momento." }
      ]
    },
    {
      id: 12,
      question: "Qual é o principal motivo que te fez interessar por essa vaga?",
      answers: [
        { id: 1, text: "Quero um trabalho fixo e digno." },
        { id: 2, text: "Estou desempregado." },
        { id: 3, text: "Quero trabalhar de casa e ter mais liberdade." },
        { id: 4, text: "Quero crescer em carreira internacional." }
      ]
    },
    {
      id: 13,
      question: "Você está disposto(a) a se dedicar para mudar de vida com essa vaga?",
      answers: [
        { id: 1, text: "100% comprometido (a)." },
        { id: 2, text: "Ainda tenho dúvidas, mas quero testar." }
      ]
    },
    {
      id: 14,
      question: "Se for aprovado(a), você se compromete a concluir o treinamento obrigatório antes de iniciar?",
      answers: [
        { id: 1, text: "Sim, estou pronto(a) para me capacitar." },
        { id: 2, text: "Ainda não posso me comprometer." }
      ]
    },
  ];

  const handleStartProfile = async () => {
    await sendConversionEvent('track', 'Lead');
    setCurrentPhase('analysis');
  };

  const handleAnswerSelect = async (answerId) => {
    // Encontrar o texto da resposta selecionada
    const currentQuestionData = profileQuestions[currentQuestion - 1];
    const selectedAnswer = currentQuestionData.answers.find(answer => answer.id === answerId);
    const answerText = selectedAnswer ? selectedAnswer.text : '';

    // Salvar resposta com o texto ao invés do ID
    const newAnswers = {
      ...profileAnswers,
      [currentQuestion]: answerText
    };
    setProfileAnswers(newAnswers);

    // Atualizar etapa no contexto e salvar no banco automaticamente
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

    // Avançar para próxima pergunta ou finalizar
    if (currentQuestion < profileQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quando terminar as perguntas, completar o processo e exibir o passo final
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
      client_user_agent: window.navigator.userAgent.substring(0, 100)
    };

    backendAPI.sendConversionEvent(eventData)
      .then(res => {
        console.log('Conversão enviada:', res);
      })
      .catch(err => {
        console.error('Erro ao enviar conversão:', err);
      });
  };

  // finalizeProfile removida: o fluxo agora chama completeProcess e exibe o passo final antes de navegar

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo ToskUs */}
            <div className="flex items-center space-x-2">
              <img
                className='h-6'
                src={LogoTaskUs}
              />
            </div>

            {/* Logo Recrutamento Online */}
            <div className="flex items-center space-x-2">
              <span className="font-hendrix-medium text-xs text-gray-600">Recrutamento Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-8">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="font-hendrix-semibold text-xl text-gray-800">
                      Carregando entrevista...
                    </h2>
                    <p className="font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
                      Aguarde enquanto preparamos tudo
                    </p>
                  </div>

                  {/* Barra de progresso */}
                  <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    </div>
                    <p className="font-hendrix-medium text-xs text-gray-500">
                      {Math.round(progress)}%
                    </p>
                  </div>
                </motion.div>
              ) : currentPhase === 'personalInfo' ? (
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
                  {/* Título principal */}
                  <div className="text-left space-y-4">

                    <h1
                      className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
                      style={{ fontSize: '12pt', lineHeight: '1.2' }}
                    >
                      <span className="block sm:inline">
                        Responda o questionário a seguir com atenção!
                      </span>
                    </h1>

                    <div className="space-y-3">
                      <p className="subtituloquest font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
                        São apenas 10 perguntas rápidas para a gente te conhecer melhor e entender se você combina com a vaga. Fica tranquilo(a), não existe resposta certa ou errada.
                      </p>

                      <p className="subtitulodaetapa font-hendrix-regular text-gray-600" style={{ fontSize: '9pt', lineHeight: '1.4', marginTop: '-5vw' }}>

                      </p>
                    </div>
                  </div>

                  {/* Card amarelo com tempo */}
                  <div className="bg-yellow-100 rounded-lg p-4 flex items-center space-x-3">
                    <img
                      className='h-8'
                      src={InfoIconMin}
                    />
                    <span className="font-hendrix-regular text-yellow-800" style={{ fontSize: '10pt' }}>

                      Leva menos de 2 minutos
                    </span>
                  </div>

                  {/* Botão Iniciar */}
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
                        border: 'none'
                      }}
                    >
                      <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '7pt' }}>
                        Iniciar perguntas
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
                      onCountdownFinish={() => {
                        // depois de 30s navegar para a próxima rota
                        navigate('/testeHabilidades');
                      }}
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
    </div>
  );
};

export default AnalisePerfilPage;
