'use client';

import Subheadline from '../../components/SubHeadline.jsx';
import Headline from '../../components/Headline';
import TextReveal from '../../gsap/TextReveal';
import RevealUpGSAP from '../../gsap/RevealUpGSAP.jsx';
import TrayOpen from '../../gsap/TrayOpen.jsx';
import Persons from '../../assets/persons.webp';

const SectionTwo = () => {
  return (
    <section
      data-snap-section
      className="h-screen relative bg-gradient-to-b from-[#0a55f881] to-[#0a55f881]"
    >
  
        <section className="flex flex-col p-6 gap-4 items-center py-[15vw] overflow-hidden">
          
          <Subheadline variant="red">
            
              Afinal, o que a TaskUs faz?
          
          </Subheadline>

          <Headline variant="h1">
            <RevealUpGSAP threshold={0.2} rootMargin="0px 0px -50% 0px">
              Sabe quando alguém <br />
              faz uma compra online,<br /> e precisa de ajuda?
            </RevealUpGSAP>
          </Headline>

          <TrayOpen
            startY={200}
            duration={900}
            easing="cubic-bezier(.22,1,.36,1)"
            rootMargin="0px 0px -20% 0px"
            once={false}
            onComplete={() => {}}
          >
            <div className="border-t border-l mt-10 border-r border-[#00d0ff] flex flex-col items-center py-10 px-3 gap-4 rounded-t-3xl h-[145vw] w-full">
              <RevealUpGSAP
                as="img"
                src={Persons}
                alt="Pessoas em atendimento"
                className="w-[100%] sm:w-4/5 md:w-3/4 h-auto rounded-lg"
                root="#lenis-root"
                enterThreshold={0.01}
                exitThreshold={0.0}
                rootMargin="20% 0px -5% 0px"
                waitForImageLoad={false}
                duration={0.9}
                ease="expo.out"
                width={1280}
                height={720}
                loading="eager"
                decoding="async"
              />

              <Subheadline color="text-white" weight="medium">
                <RevealUpGSAP 
                  root="#lenis-root"
                  enterThreshold={0.08}
                  exitThreshold={0.02}
                  rootMargin="15% 0px -5% 0px"
                  duration={0.85}
                  delay={0.1}
                  ease="expo.out"
                >
                  É aí que a TaskUs entra em ação
                </RevealUpGSAP>
              </Subheadline>

              <Subheadline color="text-white">
                <RevealUpGSAP
                  root="#lenis-root"
                  enterThreshold={0.08}
                  exitThreshold={0.02}
                  rootMargin="15% 0px -5% 0px"
                  duration={0.9}
                  delay={0.18}
                  ease="expo.out"
                >
                  Nós temos equipes de Atendimento que representam empresas,
                  conversando com seus clientes para tirar dúvidas e garantir
                  que cada um receba o suporte que precisa.
                </RevealUpGSAP>
              </Subheadline>
            </div>
          </TrayOpen>
        </section>

    </section>
  
  );
};

export default SectionTwo;