'use client';
import React from 'react';

// =======================
//    GSAP / ANIMAÇÕES
// =======================
import ZoomForward from '../gsap/ZoomForward';
import MotionTricks from '../gsap/MotionTricks';
import FadeIn from '../gsap/FadeIn';
import PulseAppears from '../gsap/PulseAppears';
import FadeContent from '../gsap/FadeContent.jsx';
import Gradient from '../gsap/Gradient.jsx';
import AnimaRolagem from '../gsap/AnimaRolagem.jsx';
import GradualBlur from '../gsap/GradualBlur.jsx';
import RotatingText from '../gsap/RotatingText.jsx';
import RevealUpGSAP from '../gsap/RevealUpGSAP.jsx';
import TrayOpen from '../gsap/TrayOpen.jsx';

// =======================
//       COMPONENTES
// =======================
import Headline from '../components/Headline.jsx';
import Subheadline from '../components/SubHeadline.jsx';
import VerticalCard from './VerticalCard.jsx';
import Header from '../modules/Header.jsx';
import ShimmerButton from '../modules/ShimmerButton.jsx';
import CtaCard from '../modules/CtaCard.jsx';
import LinesModal from '../modules/LinesModal.jsx';
import GlassCard from '../modules/GlassCard.jsx';
import ScrollRight from '../gsap/ScrollRight.jsx';
import LiquidGlass from '../modules/LiquidGlass.jsx';
import StackedCards from '../modules/StackedCards.jsx';
import UnderSection from '../modules/UnderSection.jsx';
import InfinityScroll from '../modules/InfinityScroll.jsx';
import Faq from '../modules/Faq.jsx';
import JobsCounter from '../modules/JobsCounter.jsx';
import ArrowOpen from './ArrowExpand.jsx';

// =======================
// ✅ ASSETS
// =======================
import SalarioIcon from '../assets/salario-icon.webp';
import Saude from '../assets/saude-icon.webp';
import Odonto from '../assets/odonto-icon.webp';
import Ferias from '../assets/ferias-icon.webp';
import Crescimento from '../assets/crescimento-icon.webp';
import Capacita from '../assets/capacita-icon.webp';


const steps = [
  {
    title: "Após o 5º passo clique em 'participar agora'",
    text:  "Ao clicar no botão você será levado para o Processo Seletivo, onde verá os detalhes da vaga e vai poder fazer o seu cadastro."
  },
  {
    title: "Faça a entrevista online",
    text:  "Depois do cadastro, você precisa responder algumas perguntas rápidas para entendermos quem você é, sua experiência e seu estilo de trabalho."
  },
  {
    title: "Crie o seu currículo e aguarde a analise do RH",
    text:  "Logo após a entrevista, você cria seu currículo no próprio site. É bem simples. Finalizando, enviamos tudo automaticamente para o RH analisar."
  },
  {
    title: "Confirme seus dados e receba os equipamentos",
    text:  "Caso você seja aprovado(a), vamos validar suas informações para oficializar sua contratação e enviar para sua casa os equipamentos de trabalho gratuitamente."
  },
  {
    title: "Faça o treinamento obrigatório", 
    text:  "Antes de começar a trabalhar, você precisa fazer um treinamento rápido. Depois disso, o gerente de equipe entrará em contato para assinar sua carteira e dar suas primeiras instruções."
  },
];


export default function TaskUsFlow({ className = 'flex flex-col' }) {
  return (
    <div className={`w-full ${className}`}>
      
      {/* // 🟡 COMO FUNCIONA O TRABALHO? */}
      <section className="w-full bg-gradient-to-b from-[#0a55f8] to-[#0a55f8d4]  flex justify-center">

        <section id='secin5'/>
        <section id='secfn4'/>

        <div className="w-full px-6 max-w-5xl">
          <StackedCards
            className="pin-safe"
            height="100%"
            headerHeightClass="h-[45vw]"
            header={
              <div>
                <Subheadline variant="yellow">
                  Para você entender melhor
                </Subheadline>
                <RevealUpGSAP
                  threshold={0.2}
                  enterThreshold={0.08}
                  exitThreshold={0.02}
                  rootMargin="15% 0px -5% 0px"
                  duration={0.85}
                  delay={0.1}
                  ease="expo.out"
                >
                  <Headline variant="h1">
                    Veja como funciona <br />
                    o trabalho na prática
                  </Headline>
                </RevealUpGSAP>
              </div>
            }
          >
            <LinesModal
              mode="original"
              icon="headset"
              title={
                <h1>
                  Sua função aqui <br />será   
                  
                  dar suporte a clientes
                </h1>
              }
              text="Você escolhe se quer atender pelo WhatsApp, e-mail ou telefone. Sempre que o cliente entrar em contato, é só responder e ajudar até ele conseguir o que precisa."
            />

            <LinesModal
              mode="original"
              icon="book"
             
              glassBlurClass="backdrop-blur-xl"
              title={
                <h1>
                  Você não precisa <br />começar sabendo de tudo
                </h1>
              }
              text="Ao ser contratado(a) você faz um treinamento rápido para começar mais confiante. Além disso você recebe roteiros prontos para facilitar seu trabalho."
            />

            <LinesModal
              mode="original"
              icon="notebook"
             
              glassBlurClass="backdrop-blur-xl"
              title={
                <h1>
                  Não se preocupe <br />com equipamentos de trabalho
                </h1>
              }
              text="Se o seu computador é lento ou você não tem um, tudo bem. A TaskUs envia para sua casa notebook, mouse, teclado e fones de ouvido gratuitamente."
            />
            
          </StackedCards>
          <div className="mt-[15vw]" />
        </div>

      </section>

      {/* // 🟡 BENEFÍCIOS */}
      <section className="w-full bg-gradient-to-b from-[#0a55f8d4] to-[#0a55f8] flex justify-center">

        <section id='secin6'/>
        <section id='secfn5'/>

        <div className="w-full max-w-5xl">
          <StackedCards
            className="pin-safe"
            height="100%"
            headerHeightClass="h-[45vw]"
            headerClassName=""
            header={
              <div>
                <RevealUpGSAP
                  threshold={0.2}
                  enterThreshold={0.08}
                  exitThreshold={0.02}
                  rootMargin="15% 0px -5% 0px"
                  duration={0.85}
                  delay={0.1}
                  ease="expo.out"
                >
                  <Headline variant="h1">
                    Aqui o seu esforço<br />é valorizado de verdade
                  </Headline>
                </RevealUpGSAP>
                <div className='p-2'/>
                <Subheadline color="text-white">
                  <RevealUpGSAP
                    enterThreshold={0.08}
                    exitThreshold={0.02}
                    rootMargin="15% 0px -5% 0px"
                    duration={0.9}
                    delay={0.18}
                    ease="expo.out"
                  >
                    Esses são os benefícios que só quem trabalha <br />em uma multinacional conquista.
                  </RevealUpGSAP>
                </Subheadline>
              </div>
            }
          >

            <div className="px-6">
               <VerticalCard
                theme="dark"
                imageSrc={SalarioIcon}
                title="Além do salário e carteira assinada você recebe vale alimentação de R$450/mês"
              />
            </div>
            <div className="px-6">
              <VerticalCard
                theme="dark"
                imageSrc={Saude}
                title="Você tem plano de saúde completo, com cobertura nacional e atendimento particular."
              />
            </div>
            <div className="px-6"> 
              <VerticalCard
                theme="dark"
                imageSrc={Odonto}
                title="E também, plano odontológico com cobertura nacional para você cuidar da saúde e autoestima."
              />
            </div>
            <div className="px-6">
              <VerticalCard
                theme="dark"
                imageSrc={Ferias}
                title="Para trabalhar bem,  precisa descansar bem! Por isso, enquanto você está de férias, você continua recebendo seu salário normalmente."
              />
            </div>
            <div className="px-6">
              <VerticalCard
                theme="dark"
                imageSrc={Crescimento}
                title="A cada 3 meses analisamos o seu desempenho, se você estiver preparado, pode subir de cargo e receber um salário maior."
              />
            </div>
            <div className="px-6">
              <VerticalCard
                theme="dark"
                imageSrc={Capacita}
                title="Mas para crescer, você precisa estudar. Por isso, temos bolsas de estudos, para quem quer crescer e ganhar cada vez mais"
              />
            </div>
            <div className="py-10 ">
             
            </div>


            <div className=''>
              <div className="w-full h-[110vw] rounde-t-3xl  pt-[15vw] flex  flex-col  bg-gray-100">
                            
                              <Headline color="black" variant="h1">
                                <RevealUpGSAP threshold={0.2} rootMargin="0px 0px -25% 0px">
                                  Você quer <br />começar, trabalhar <br />com a gente?
                                </RevealUpGSAP>
                              </Headline>
                              <div className="pt-10" />
                              <ArrowOpen
                                size={90}
                                stroke="#0a56f8"
                                strokeWidth={1}
                                legLength={80}
                                tipLength={4}
                              />
              </div>    
            </div>
              
          </StackedCards>
        </div>
      </section>

      {/* // 🟡 COMO SE INSCREVER? */}
      <section className="w-full bg-gray-100 flex justify-center">

        <section id='secin7'/>
        <section id='secfn6'/>

        <div className="w-full max-w-5xl">
          <StackedCards
            className="pin-safe"
            height="100%"
            headerHeightClass="h-[45vw] bg-gray-100"
            header={
              <Headline color="black" variant="h1">
                <RevealUpGSAP threshold={0.2} rootMargin="0px 0px -25% 0px">
                  Siga as instruções<br /> e participe do processo <br />seletivo
                </RevealUpGSAP>
              </Headline>
            }
          >
           {steps.map((s, index) => (
              <LinesModal
                key={index}
                mode="step"
                stepNumber={index + 1}
                stepBgColor={(index + 1) % 2 === 0 ? '#f9f9f9' : '#f3f4f6'}
                stepTextColor="text-black"
                stepTitleColor="text-[#000]"
                stepNumberSize="text-[15vw]"
                stepBodyColor="text-black/75"
                title={s.title}
                text={s.text}
              />
            ))}
            <div className="w-full h-[110vw] pt-[15vw] bg-gray-200"> 


                              <Headline color="black" variant="h1">
                                <RevealUpGSAP threshold={0.2} rootMargin="0px 0px -25% 0px">
                                  Toque agora em<br/> "Participar Agora" e <br/>de o seu primeiro passo<br/> rumo a sua nova carreira
                                </RevealUpGSAP>
                              </Headline>
                              <div className="pt-10" />
                              <ArrowOpen
                                size={90}
                                stroke="#0a56f8"
                                strokeWidth={1}
                                legLength={80}
                                tipLength={4}
                              />
                              

            </div>
          </StackedCards>
        </div>

      </section>

      {/* // 🟡 CTA #01 */}
      <section className="w-full h-[220vw] bg-gray-100 flex justify-center pb-10">
        
        <div className="w-full max-w-5xl bg-gradient-to-b from-[#0a56f8] to-[#0a56f8] rounded-t-3xl flex">

        <section id='secin8'/>
        <section id='secfn7'/>

          <div className="text-black grid place-content-center w-full">
            <div className="text-center px-5 gap-3 pb-6 flex flex-col items-center">

              <Headline variant="h1">
                As contratações já estão<br />
                acontecendo e você pode <br />
                ser o próximo aprovado(a)
              </Headline>
              <Subheadline color="text-white">
                Clique em participar agora e faça o processo seletivo em menos de 10 minutos.
              </Subheadline>
              
            </div>

            <CtaCard variant='completa' bg="#ffffff30" ctaLabel="Participar agora"/>

          </div>

        </div>

      </section>

    </div>
  );
}