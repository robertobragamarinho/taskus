// SectionFive.jsx
'use client';

import Headline from '../../components/Headline';
import Subheadline from '../../components/SubHeadline.jsx';
import TextReveal from '../../gsap/TextReveal';
import RevealUpGSAP from '../../gsap/RevealUpGSAP.jsx';
import StackedCards from '../../modules/StackedCards.jsx';
import LinesModal from '../../modules/LinesModal.jsx';

const SectionFive = () => {
  return (
    <section
      data-snap-section
      className="grid bg-[#0645ac] place-content-center snap-start snap-always"
    >
      <StackedCards
        className="pin-safe"
        height="100%"
        headerHeightClass="h-[45vw]"
        header={
          <div>
            <Subheadline variant="red">
              <TextReveal inView once typeSpeed={0.03} duration={0.16}>
                Para você entender melhor
              </TextReveal>
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
                o trabalho na prática:
              </Headline> 
            </RevealUpGSAP>
          </div>
        }
      >
        <LinesModal
          icon="shield"
          title="Sua função aqui será atender clientes"
          text="Você vai conversar com os clientes das empresas que nós atendemos. É simples, o cliente entra em contato, você responde e ajuda no que ele precisar. Você usa roteiros prontos e conta com apoio do gerente de equipe, sempre que precisar."
        />
        <LinesModal
          icon="shield"
          title="Você não precisa começar sabendo"
          text="Antes de iniciar o trabalho, você faz um treinamento rápido e 100% online com vídeo aulas e exercícios práticos. Tudo para te deixar 100% preparado(a) para trabalhar."
        />
        <LinesModal
          icon="shield"
          title="Não se preocupe com equipamentos"
          text="Se o seu computador é lento ou se você não tem um, fique tranquilo(a). Nós enviamos para sua casa todos os equipamentos necessários para realizar o trabalho. Isso não gera custo para você, nem de entrega nem dos equipamentos."
        />
      </StackedCards>

      <div className="mt-[20vw]" />
    </section>
  );
};

export default SectionFive;