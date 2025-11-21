// SectionFour.jsx
'use client';

import Headline from '../../components/Headline';
import Subheadline from '../../components/SubHeadline.jsx';
import RevealUpGSAP from '../../gsap/RevealUpGSAP.jsx';
import TrayOpen from '../../gsap/TrayOpen.jsx';
import TraySlideUp from '../../gsap/TrayOpen.jsx';
import BlueBlurSection from '../../modules/BlueBlurSection.jsx';
import CarreiraBrasilBox from '../../modules/CarreiraBrasilBox.jsx';
import CtaCard from '../../modules/CtaCard.jsx';
import Carreiras from '../../assets/carreiras.webp';
import Brasil from '../../assets/brasil.webp';


const SectionFour = () => {
  return (
    <section
      data-snap-section
      className="h-screen relative bg-gradient-to-b py-9 from-[#0a55f8d4] to-[#0a55f8]"
    >

      <section className="flex flex-col gap-4 items-center overflow-hidden">
        
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
              E agora, o Brasil, <br />
              também faz parte desse crescimento
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
            Com mais empresas buscando nossos
            <br />
            serviços, estamos abrindo novas vagas para
            <br />
            dar conta de toda demanda
          </RevealUpGSAP>
        </Subheadline>

        <div className='p-1'/>

        <TrayOpen
            startY={250}
            duration={900}
            easing="cubic-bezier(.22,1,.36,1)"
            rootMargin="0px 0px -10% 0px"
            once={false}
            onComplete={() => {}}
          >
            <CtaCard variant='compacta' bg="#ffffff30" />
        </TrayOpen>

      </section>

    </section>
  );
};

export default SectionFour;