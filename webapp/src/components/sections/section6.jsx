// SectionSix.jsx
'use client';

import Headline from '../../components/Headline.jsx';
import Subheadline from '../../components/SubHeadline.jsx';
import RevealUpGSAP from '../../gsap/RevealUpGSAP.jsx';
import StackedCards from '../../modules/StackedCards.jsx';
import LinesModal from '../../modules/LinesModal.jsx';
import CtaCard from '../../modules/CtaCard.jsx';

const SectionSix = () => {
  return (
    
     <section
      data-snap-section
      className="h-screen relative bg-gray-100 gap-4 flex flex-col py-9"
    >
          <RevealUpGSAP
              threshold={0.2}
              enterThreshold={0.08}
              exitThreshold={0.02}
              rootMargin="15% 0px -5% 0px"
              duration={0.85}
              delay={0.1}
              ease="expo.out"
            >
              <Headline variant="h1" color="black" id="beneficios-h">
                A TaskUs só chegou até<br/> aqui graças às pessoas<br/>que trabalham com nós
              </Headline>
            </RevealUpGSAP>

            <Subheadline color="text-black">
              <RevealUpGSAP
                enterThreshold={0.08}
                exitThreshold={0.02}
                rootMargin="15% 0px -5% 0px"
                duration={0.9}
                delay={0.18}
                ease="expo.out"
              >
                Acreditamos que, quando uma equipeé valorizada,<br/> ela cresce junto. Por isso, essa  oportunidade de <br/>trabalho é para quem quer:
              </RevealUpGSAP>
            </Subheadline>

            <div className='px-6 bg-gray-100'>
          

               <LinesModal
                  mode="original"
                  icon="headset"
                  iconStroke={0.5}
                  glassBlurClass="backdrop-blur-xl"
                  title={
                    <h1>
                      Estabilidade Financeira
                    </h1>
                  }
                  text="Trabalhar na TaskUs é ter a certeza de receber todo mês, sem atraso. Salário fixo, benefícios garantidose a segurança de saber que seu esforço é  recompensado de forma justa."
               />

                <LinesModal
                  mode="original"
                  icon="headset"
                  iconStroke={0.5}
                  glassBlurClass="backdrop-blur-xl"
                  title={
                    <h1>
                      Estabilidade Financeira
                    </h1>
                  }
                  text="Trabalhar na TaskUs é ter a certeza de receber todo mês, sem atraso. Salário fixo, benefícios garantidose a segurança de saber que seu esforço é  recompensado de forma justa."
               />

                <LinesModal
                  mode="original"
                  icon="headset"
                  iconStroke={0.5}
                  glassBlurClass="backdrop-blur-xl"
                  title={
                    <h1>
                      Estabilidade Financeira
                    </h1>
                  }
                  text="Trabalhar na TaskUs é ter a certeza de receber todo mês, sem atraso. Salário fixo, benefícios garantidose a segurança de saber que seu esforço é  recompensado de forma justa."
               />
               
            </div>

      <div className="mt-[20vw]" />
    </section>
  );
};

export default SectionSix;