// SectionThree.jsx
'use client';

import Headline from '../../components/Headline';
import Subheadline from '../../components/SubHeadline.jsx';
import RevealUpGSAP from '../../gsap/RevealUpGSAP.jsx';
import InfinityScroll from '../../modules/InfinityScroll';
import Mapa from '../../assets/MapaMundi.webp';
import World from '../../modules/World.jsx';

const SectionThree = () => {
  return (
    <section
      data-snap-section
      className="h-screen relative bg-gradient-to-b from-[#0a55f881] to-[#0a55f8d4]"
    >
      <div className="px-6">

        <div className="border-b border-l border-r rounded-t-[0vw] border-[#00d0ff] flex flex-col items-center  px-3 gap-4 rounded-3xl h-[115vw] mb-5 w-full">
          

          <World/>
    

          

          <Headline variant="h2">
            <RevealUpGSAP
              threshold={0.2}
              enterThreshold={0.08}
              exitThreshold={0.02}
              rootMargin="15% 0px -5% 0px"
              duration={0.85}
              delay={0.1}
              ease="expo.out"
            >
              E é por isso que <br/>as maiores marcas do <br/>mundo confiam em nós
            </RevealUpGSAP>
          </Headline> 

          <Subheadline>
            <RevealUpGSAP
              enterThreshold={0.08}
              exitThreshold={0.02}
              rootMargin="15% 0px -5% 0px"
              duration={0.85}
              delay={0.1}
              ease="expo.out"
            >
              A cada ano, crescemos mais, levando equipes treinadas, tecnologia de ponta e suporte de alto padrão para grandes empresas em 13 países diferentes.
            </RevealUpGSAP>
          </Subheadline>
        </div>
        
      </div>

      <div className='w-[100vw]'>
          <InfinityScroll />
      </div>

    </section>
  );
};

export default SectionThree;