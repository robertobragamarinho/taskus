import Headline from "../../components/Headline"
import AnimaRolagem from "../gsap/AnimaRolagem"
import FadeIn from "../gsap/FadeIn"
import LiquidGlass from "../modules/LiquidGlass"
import Subheadline from "../SubHeadline"
import FadeContent from "../gsap/FadeContent"
import GlassCard from "../modules/GlassCard"
import banner from "../../assets/brasil.webp"
import Sheta from "../../components/modules/Sheta"

const SectionOne = () => {
  return (

    <section className="h-screen relative px-1 py-[20vw] bg-[#0a55f881]">
        <GlassCard>
          <section className="flex flex-col items-center gap-5">

            <FadeIn inView once from="bottom" distance={80} duration={1.9}>
              <Headline variant="h1">
                Ganhe{' '}
                <span className="font-bold">
                  R$2.450,00/Mês <br />+benefícios
                </span>{' '}
                trabalhando no conforto da sua casa
              </Headline>
            </FadeIn>
            <AnimaRolagem
              startOffset={300}
              startOnMount={false}
              startWhenInView
              threshold={0.1}
              useFade
              startOpacity={0}
              endOpacity={1}
              useScaleOvershoot
              startScale={0.1}
              peakScale={1.58}
              endScale={1}
              scaleUpDuration={0.1}
              peakHold={0.1}
              scaleDownDuration={0.5}
            >
              <FadeIn
                inView
                once
                from="bottom"
                distance={24}
                delay={0.1}
                duration={0.5}
              >
                <LiquidGlass>
                  
                    Não é necessário ter experiência
                
                </LiquidGlass>
              </FadeIn>
            </AnimaRolagem>
            <FadeContent>
              <img
                src={banner}
                alt="Banner"
                className="w-[60vw] -mt-[7vw] sm:w-4/5 md:w-3/4 h-auto rounded-lg"
              />
            </FadeContent>
            <Subheadline>
              Participe do nosso processo seletivo e
              descubra, <br />em menos de 10 minutos, se você pode começar<br /> a trabalhar com a gente
            </Subheadline>
            <div className="mb-5">
  
            </div>
          </section>
          <Sheta size={30} />
        </GlassCard>
         <section className='secfn1'></section>
    </section>

  ) 
}

export default SectionOne
