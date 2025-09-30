/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcess } from '../hooks/useProcess.js';
import TesteRapidoAtendimentoStep from '../components/steps/TesteRapidoAtendimentoStep.jsx';
import SimulacaoConversaStep from '../components/steps/SimulacaoConversaStep.jsx';
import LastAnswerLoadingStep from '../components/steps/LastAnswerLoadingStep.jsx';

import LogoTaskUs from '../assets/logo-min.webp';


import ClaudioLemosFoto from '../assets/person_2-min.webp';
import MarcelaFonsecaFoto from '../assets/person_3-min.webp';
import JoanaBarrosFoto from '../assets/person_4-min.webp';
import MariaMadalenaFoto from '../assets/person_1-min.webp';

const TesteHabilidadesPage = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { processData, updateProcessStep, completeProcess, resetAllData } = useProcess();
  const [currentStep, setCurrentStep] = useState(1);
  const [conversaAtual, setConversaAtual] = useState(1);
  const [respostasSimulacao, setRespostasSimulacao] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showFinalLoading, setShowFinalLoading] = useState(false);

  // Dados das simulações de conversa
  const simulacoesConversa = [
    {
      numeroConversa: 1,
      cliente: {
        nome: "Cláudio Lemos",
        id: "#257991910",
        foto: ClaudioLemosFoto
      },
      mensagemCliente: "Precisava que minha encomenda chegasse até amanhã, você sabe se vai chegar no prazo?",
      urgente: true,
      opcoes: [
        {
          id: 1,
          texto: "Oi, Cláudio! Entendo a urgência, vou verificar agora. Você pode me confirmar o nº do pedido? Assim que eu consultar a transportadora, te retorno em até 10 minutos com a previsão atualizada."
        },
        {
          id: 2,
          texto: "Consulte o status pelo site oficial da transportadora."
        },
        {
          id: 3,
          texto: "Me dê um minutinho que vou verificar para você."
        },
        {
          id: 4,
          texto: "As entregas dependem do seu CEP. Me informe o seu Código postal para que eu possa verificar."
        }
      ]
    },
    {
      numeroConversa: 2,
      cliente: {
        nome: "Marcela Fonseca",
        id: "#A9821734",
        foto: MarcelaFonsecaFoto
      },
      mensagemCliente: "Fiz uma compra ontem mas e estou com dúvida sobre o pagamento",
      urgente: false,
      opcoes: [
        {
          id: 1,
          texto: "Aguarde 48 horas úteis que o sistema atualiza. Se não mudar, entre em contato de novo."
        },
        {
          id: 2,
          texto: "Oi! Me envie o nº do pedido ou o CPF/e-mail que eu já verifico e te aviso por aqui."
        },
        {
          id: 3,
          texto: "Oi, tudo bem? Eu verifico pra você agora. Pode me informar o nº do pedido ou o CPF/e-mail usado na compra, e qual foi o método de pagamento (cartão, Pix ou boleto)?"
        },
        {
          id: 4,
          texto: "Se você está com dúvida, faça o pagamento novamente para garantir. Depois pedimos reembolso do primeiro."
        }
      ]
    },
    {
      numeroConversa: 3,
      cliente: {
        nome: "Joana Barros",
        id: "#B1234567",
        foto: JoanaBarrosFoto
      },
      mensagemCliente: "Não gostei do streaming, quero cancelar minha assinatura",
      urgente: false,
      opcoes: [
        {
          id: 1,
          texto: "Entendo, posso cancelar. Me passa o e-mail da conta, por favor? Assim que localizar, confirmo o cancelamento e aviso por aqui."
        },
        {
          id: 2,
          texto: "Oi! Sinto muito que a experiência não tenha sido boa. Posso cancelar agora mesmo para você. Para localizar a assinatura, me informa o e-mail ou CPF da conta?"
        },
        {
          id: 3,
          texto: "Não é possível cancelar agora. Você contratou plano anual e terá que esperar até o fim."
        },
        {
          id: 4,
          texto: "Não é possível cancelar agora. Você contratou plano anual e terá que esperar até o fim."
        }
      ]
    },
    {
      numeroConversa: 4,
      cliente: {
        nome: "Maria Madalena",
        id: "#C7654321",
        foto: MariaMadalenaFoto
      },
      mensagemCliente: "Achei o atendimento muito ruim se não resolverem o meu problema vou abrir uma reclamação no reclame aqu",
      urgente: true,
      opcoes: [
        {
          id: 1,
          texto: "Você pode registrar a reclamação no Reclame Aqui, mas o prazo de análise é de 5 dias úteis. Aguarde esse período."
        },
        {
          id: 2,
          texto: "Entendo a sua insatisfação e quero ajudar. Me passe o nº do pedido ou CPF/e-mail para eu verificar e retorno por aqui."
        },
        {
          id: 3,
          texto: "Reclamar não vai acelerar o processo. Estamos fazendo o possível, aguarde."
        },
        {
          id: 4,
          texto: "Oi! Sinto muito pela experiência até aqui não é o padrão que buscamos. Vou assumir seu caso agora para resolver. Pode me informar o nº do pedido ou CPF/e-mail? Abro o protocolo e te retorno em até 30 minutos com a solução ou próximo passo."
        }
      ]
    }
    // João Amâncio (nova)
    ,{
      numeroConversa: 5,
      cliente: {
        nome: "João Amâncio",
        id: "#J998877",
        foto: ClaudioLemosFoto // reutilizando foto existente
      },
      mensagemCliente: "Fiz uma compra ontem mas e estou com dúvida sobre o pagamento",
      urgente: false,
      opcoes: [
        { id: 1, texto: "Aguarde 48 horas úteis que o sistema atualiza. Se não mudar, entre em contato de novo." },
        { id: 2, texto: "Oi! Me envie o nº do pedido ou o CPF/e-mail que eu já verifico e te aviso por aqui." },
        { id: 3, texto: "Oi, tudo bem? Eu verifico pra você agora. Pode me informar o nº do pedido ou o CPF/e-mail usado na compra, e qual foi o método de pagamento (cartão, Pix ou boleto)?" },
        { id: 4, texto: "Se você está com dúvida, faça o pagamento novamente para garantir. Depois pedimos reembolso do primeiro." }
      ]
    },
    // Danilo Ferreira (nova) - pergunta com dados sensíveis, urgência alta
    {
      numeroConversa: 6,
      cliente: {
        nome: "Danilo Ferreira",
        id: "#D578921",
        foto: MarcelaFonsecaFoto
      },
      mensagemCliente: "Olá, comprei um celular no pedido #578921 ontem, paguei no cartão de crédito final 4210, mas até agora não recebi confirmação. Meu CPF é 123.456.789-00 e estou começando a ficar preocupado, preciso de ajuda urgente!",
      urgente: true,
      opcoes: [
        { id: 1, texto: "Número do pedido (#578921)" },
        { id: 2, texto: "Últimos dígitos do cartão (4210)" },
        { id: 3, texto: "CPF (123.456.789-00)" },
        { id: 4, texto: "Todos os dados acima" }
      ]
    },
    // Maria Madalena - pedido de desconto (nova)
    {
      numeroConversa: 7,
      cliente: {
        nome: "Maria Madalena",
        id: "#C7654321",
        foto: MariaMadalenaFoto
      },
      mensagemCliente: "Olha, eu adorei o produto, mas vi no site que não tinha desconto. Você consegue me dar 20% de desconto por fora, sem registrar no sistema?",
      urgente: false,
      opcoes: [
        { id: 1, texto: "Daria o desconto, já que é só um cliente pedindo." },
        { id: 2, texto: "Explicaria que não pode conceder descontos fora das regras da empresa, mas ofereceria verificar promoções oficiais ou próximos benefícios." },
        { id: 3, texto: "Ignoraria a mensagem para evitar conflito." }
      ]
    },
    // Maria Madalena - múltiplas solicitações (nova)
    {
      numeroConversa: 8,
      cliente: {
        nome: "Maria Madalena",
        id: "#C7654321",
        foto: MariaMadalenaFoto
      },
      mensagemCliente: "Oi, tudo bem? Preciso de ajuda com três coisas: 1 - Alterar o endereço da minha entrega. 2 - Saber quando meu pedido vai chegar. 3 - Atualizar o número do meu telefone no cadastro.",
      urgente: false,
      opcoes: [
        { id: 1, texto: "Alterar o endereço da entrega" },
        { id: 2, texto: "Informar o prazo de entrega" },
        { id: 3, texto: "Atualizar o número de telefone" }
      ]
    }
  ];

  // Observação: reutilizei fotos já presentes no projeto para as novas entradas.

  // Função utilitária: embaralhar um array (Fisher-Yates)
  const shuffleArray = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Embaralhar apenas as entradas que pertencem à mesma pessoa (mesmo nome)
  const shuffleSameClient = (simulations) => {
    const byClient = {};
    simulations.forEach((sim, idx) => {
      const name = sim?.cliente?.nome || '__unknown__';
      if (!byClient[name]) byClient[name] = [];
      byClient[name].push({ sim, idx });
    });

    const result = simulations.slice();
    Object.values(byClient).forEach(group => {
      if (group.length > 1) {
        const sims = group.map(g => g.sim);
        const shuffled = shuffleArray(sims);
        group.forEach((g, i) => {
          result[g.idx] = shuffled[i];
        });
      }
    });
    return result;
  };

  // Usar perguntas na ordem original, sem embaralhamento para evitar repetições
  const simulacoes = simulacoesConversa;


  const handleStartTest = async () => {
    try {
      setIsLoading(true);

      // Salvar o início do teste no banco
      await updateProcessStep(
        'testeHabilidades',
        1,
        { inicioTeste: new Date().toISOString() },
        'inicio_teste'
      );

      console.log('✅ Teste de habilidades iniciado');

      // Avançar para a primeira simulação
      setCurrentStep(2);

    } catch (error) {
      console.error('❌ Erro ao iniciar teste de habilidades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRespostaSimulacao = async (opcaoId, textoResposta) => {
    try {
      setIsLoading(true);

      // Salvar resposta da simulação atual
      const novasRespostas = {
        ...respostasSimulacao,
        [conversaAtual]: {
          opcaoId,
          textoResposta,
          timestamp: new Date().toISOString()
        }
      };

      setRespostasSimulacao(novasRespostas);

      // Salvar no banco
      await updateProcessStep(
        'testeHabilidades',
        currentStep,
        novasRespostas,
        `simulacao_${conversaAtual}`
      );

      console.log(`✅ Resposta da simulação ${conversaAtual} salva:`, textoResposta);

      // Verificar se há mais simulações
      if (conversaAtual < simulacoes.length) {
        // Avançar para próxima simulação
        setConversaAtual(prev => prev + 1);
        setCurrentStep(prev => prev + 1);
      } else {
        // Todas as simulações foram completadas
        console.log('✅ Todas as simulações completadas!');
        // Completar o processo de teste de habilidades
        await completeProcess('testeHabilidades', novasRespostas);

        // Mostrar o loading final por 15s antes de navegar
        setShowFinalLoading(true);
        // onCountdownFinish: navegar quando o componente terminar
        // Navegação será tratada pelo callback passado ao FinalQuestionStep
      }

    } catch (error) {
      console.error('❌ Erro ao salvar resposta da simulação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Obter dados da conversa atual (usa a versão possivelmente embaralhada)
  const getConversaAtual = () => {
    const indiceConversa = conversaAtual - 1;
    return simulacoes[indiceConversa] || simulacoes[0];
  };

  return (
    <div className="min-h-screen  flex-col" style={{ backgroundColor: '#f5f5f5' }}>
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
     <div className=" flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-sm border overflow-hidden">
          <div className="p-6 pb-8">
            {/* Etapa 1: Introdução do teste */}
            {currentStep === 1 && (
              <TesteRapidoAtendimentoStep onStart={handleStartTest} />
            )}

            {/* Etapas das simulações: render dinâmico baseado no número de simulações */}
            {showFinalLoading ? (
              <LastAnswerLoadingStep seconds={15} onFinish={() => navigate('/curriculo')} />
            ) : (currentStep >= 2 && currentStep <= (simulacoes.length + 1) && (
              <SimulacaoConversaStep
                key={conversaAtual} // força o reset do estado local ao trocar de simulação
                conversaData={getConversaAtual()}
                onResposta={handleRespostaSimulacao}
                isLoading={isLoading}
                fotoReferencia={
                  getConversaAtual().cliente.foto || ClaudioLemosFoto // foto padrão se não houver
                }
                total={simulacoes.length}
                currentIndex={conversaAtual}
              />
            ))}


          </div>
        </div>
      </div>
    </div>
  );
};

export default TesteHabilidadesPage;
