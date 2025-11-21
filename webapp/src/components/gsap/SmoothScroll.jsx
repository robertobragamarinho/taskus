'use client';
import React, { useEffect, useRef, useState } from 'react';

// =======================
//    GSAP / ANIMAÇÕES (mantidos)
// =======================
import ScrollRight from "../gsap/ScrollRight";
import ZoomForward from "../gsap/ZoomForward";
import MotionTricks from "../gsap/MotionTricks";
import TextReveal from "../gsap/TextReveal";
import FadeIn from "../gsap/FadeIn";
import PulseAppears from "../gsap/PulseAppears";
import FadeContent from "../gsap/FadeContent.jsx";
import Gradient from "../gsap/Gradient.jsx";
import AnimaRolagem from "../gsap/AnimaRolagem.jsx";
import GradualBlur from "../gsap/GradualBlur.jsx";
import RotatingText from "../gsap/RotatingText.jsx";
import RevealUpGSAP from '../gsap/RevealUpGSAP.jsx';
import TrayOpen from "../gsap/TrayOpen.jsx";

// =======================
//       COMPONENTES 
// =======================
import Headline from "../components/Headline";
import Subheadline from "../components/SubHeadline";
import Teste from "../components/Teste";

// =======================
//         MÓDULOS
// =======================
import StandardSession from "../modules/StandardSession";
import Header from "../modules/Header";
import ShimmerButton from "../modules/ShimmerButton";
import CtaCard from "../modules/CtaCard";
import LinesModal from "../modules/LinesModal";
import GlassCard from "../modules/GlassCard";
import VerticalCard from "../modules/VerticalCard";
import LiquidGlass from "../modules/LiquidGlass";
import StackedCards from "../modules/StackedCards";
import UnderSection from "../modules/UnderSection";
import InfinityScroll from "../modules/InfinityScroll";
import Faq from "../modules/Faq";
import JobsCounter from "../modules/JobsCounter";

// =======================
// ✅ ASSETS
// =======================
import banner from "../assets/banner.webp";
import Banner2 from "../assets/banner2.webp";
import Mapa from "../assets/MapaMundi.webp";
import Persons from "../assets/persons.webp";

// =======================
//   UTILS DE ESTILO
// =======================
const gridOverlayStyle = {
  backgroundImage:
    'linear-gradient(to right, #4f4f4f2e 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f2e 1px, transparent 1px)',
  backgroundSize: '54px 54px',
  WebkitMaskImage:
    'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
  maskImage:
    'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
};

// =======================
//   SNAP CONTROLLER HOOK
// =======================
function useSnapController(containerRef) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const scrollStartRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll('[data-snap-section]')
    );

    if (sections.length === 0) return;

    // 1) Observer para saber qual seção está visível
    const io = new IntersectionObserver(
      (entries) => {
        // pega a seção com maior interseção
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const idx = sections.indexOf(visible.target);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      {
        root: container,
        threshold: [0.5, 0.75, 0.99],
      }
    );

    sections.forEach((s) => io.observe(s));

    // 2) Função de navegação segura (evita múltiplos disparos)
    const scrollToIndex = (i) => {
      if (i < 0 || i >= sections.length) return;
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });

      // solta o lock depois que o scroll suave deve ter terminado
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 550);
    };

    const goNext = () => scrollToIndex(activeIndex + 1);
    const goPrev = () => scrollToIndex(activeIndex - 1);

    // ✅ Funções auxiliares para verificar se está no fim do scroll
    const isAtBottom = (el) => {
      const scrollBottom = el.scrollTop + el.clientHeight;
      const diff = el.scrollHeight - scrollBottom;
      return diff < 2; // tolerância de 2px para subpixel
    };

    const isAtTop = (el) => {
      return el.scrollTop < 2; // tolerância de 2px
    };

    // 3) Wheel (desktop) - ✅ MELHORADO
    const onWheel = (e) => {
      const target = e.target;
      const scrollable = target.closest('[data-inner-scroll]');
      
      if (scrollable) {
        const atBottom = isAtBottom(scrollable);
        const atTop = isAtTop(scrollable);

        // ✅ Previne o bounce sempre nas bordas
        if ((atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0)) {
          e.preventDefault();
          
          // Só navega se não estiver animando
          if (!isAnimatingRef.current) {
            if (atBottom && e.deltaY > 0) {
              goNext();
            } else if (atTop && e.deltaY < 0) {
              goPrev();
            }
          }
          return;
        }
        
        // Deixa o scroll interno agir normalmente
        return;
      }

      // Fora de inner-scroll
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (e.deltaY > 0) goNext();
      else goPrev();
    };

    // 4) Touch (mobile) - ✅ MELHORADO
    const onTouchStart = (e) => {
      const scrollable = e.target.closest('[data-inner-scroll]');
      touchStartYRef.current = e.touches[0].clientY;
      
      if (scrollable) {
        scrollStartRef.current = scrollable.scrollTop;
      }
    };

    // ✅ NOVO: onTouchMove para prevenir bounce durante o gesto
    const onTouchMove = (e) => {
      const scrollable = e.target.closest('[data-inner-scroll]');
      
      if (scrollable) {
        const atBottom = isAtBottom(scrollable);
        const atTop = isAtTop(scrollable);
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartYRef.current - currentY;

        // Previne o bounce nas bordas
        if ((atBottom && deltaY > 0) || (atTop && deltaY < 0)) {
          e.preventDefault();
        }
      }
    };

    const onTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - endY;
      const threshold = 50;
      
      if (Math.abs(deltaY) < threshold) return;

      const touchTarget = e.target;
      const scrollable = touchTarget.closest('[data-inner-scroll]');
      
      if (scrollable) {
        const atBottom = isAtBottom(scrollable);
        const atTop = isAtTop(scrollable);
        const scrollDelta = scrollable.scrollTop - scrollStartRef.current;

        // ✅ Só navega se realmente chegou no fim e tentou continuar
        if (atBottom && deltaY > threshold && scrollDelta >= 0) {
          e.preventDefault();
          goNext();
        } else if (atTop && deltaY < -threshold && scrollDelta <= 0) {
          e.preventDefault();
          goPrev();
        }
        return;
      }

      if (deltaY > 0) goNext();
      else goPrev();
    };

    // 5) Teclado (opcional)
    const onKeyDown = (e) => {
      // PageDown / ArrowDown / Space (sem shift) => próxima
      if (e.key === 'PageDown' || e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        goNext();
      }
      // PageUp / ArrowUp / Shift+Space => anterior
      if (e.key === 'PageUp' || e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        goPrev();
      }
    };

    // Listeners no container (não no window), pois o scroll é nele
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false }); // ✅ NOVO
    container.addEventListener('touchend', onTouchEnd, { passive: false }); // ✅ passive: false
    container.addEventListener('keydown', onKeyDown);

    // Acessibilidade: foca o container pra receber teclado
    container.setAttribute('tabindex', '0');

    return () => {
      io.disconnect();
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove); // ✅ NOVO
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('keydown', onKeyDown);
    };
  }, [containerRef, activeIndex]);

  // <<< retorna o índice ativo >>>
  return activeIndex;
}

// =======================
// Helpers: marcadores globais no <body>
// =======================
function ensureMarker(id) {
  if (typeof document === "undefined") return;
  if (!document.getElementById(id)) {
    const el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
}

function removeMarker(id) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.remove();
}

function setExclusiveMarkers({ onIds = [], offIds = [] }) {
  onIds.forEach(ensureMarker);
  offIds.forEach(removeMarker);
}

// =============================
// COMPONENTE REFATORADO: SnapScrollPage
// =============================
export default function SnapScrollPage() {
  const containerRef = useRef(null);
  const activeIndex = useSnapController(containerRef);

  // Alterna Header e Blur conforme a seção ativa:
  // Seção 1 => Header ON, Blur OFF
  // Seções 2+ => Header OFF, Blur ON
  useEffect(() => {
    if (activeIndex === 0) {
      setExclusiveMarkers({
        onIds:  ["headerActivate", "blurDesactive"],
        offIds: ["headerDesactive", "blurActive"],
      });
    } else {
      setExclusiveMarkers({
        onIds:  ["headerDesactive", "blurActive"],
        offIds: ["headerActivate", "blurDesactive"],
      });
    }
  }, [activeIndex]);

  return (
    <main
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >

      {/* Header controlado por IDs #headerActivate / #headerDesactive */}
        <Header rightText="Processo " fadeDuration={0.28}
          playIntro
          activationMode="id"          // "id" | "scroll"
          activeId="headerActivate"     // padrão novo
          inactiveId="headerDesactive"  // padrão novo
          fadeIn
        />

      {/* GradualBlur controlado por IDs #blurActive / #blurDesactive */}
      <GradualBlur position="bottom" fadeDuration={0} 
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        blurActivationMode="id" // usa IDs globais
        fadeIn
      />

      {/* Seu Gradient (sem relação com header/blur) */}
      <Gradient
        activateOnId={["ative1", "ative2", "ative3", "ative4", "ative5"]}
        deactivateOnId={["desative1", "desative2", "desative3", "desative4", "desative5"]}
      />

      <article>
        
        
        {/* ========================= Seção 1 — PRIMEIRA DOBRA ========================= */}

        <section
          className="ative1 h-screen py-[15vw] snap-start flex flex-col items-center"
          data-snap-section
        >
          <GlassCard>
            <section className="flex flex-col items-center gap-5">

             {/* Headline */}
              <FadeIn inView once from="bottom" distance={80} duration={1.9}>
                <Headline variant="h1">
                  Receba{" "}
                  <span className="font-bold">
                    R$2.450,00/Mês <br />+benefícios
                  </span>{" "}
                  trabalhando no conforto da sua casa
                </Headline>
              </FadeIn>
              
              {/* Modal Destaque */}
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
                    <TextReveal inView once typeSpeed={0.03} duration={0.36}>
                      Não é necessário ter experiência
                    </TextReveal>
                  </LiquidGlass>
                </FadeIn>
              </AnimaRolagem>

              {/* Imagem */}
              <FadeContent>
                <img
                  src={banner}
                  alt="Banner"
                  className="w-[60vw] -mt-[7vw] sm:w-4/5 md:w-3/4 h-auto rounded-lg"
                />
              </FadeContent>

              {/* Subheadline */}
              <Subheadline>
                Participe do nosso processo seletivo e <br />
                descubra ainda hoje se você pode começar a trabalhar como atendente de
                suporte ao <br />
                cliente home office.
              </Subheadline>

              {/* Botão */}
              <div className='mb-5'>
                <ShimmerButton
                tapHold={3}
                tapCloseDur={0.38}
                tapOpenDur={0.48}
                tapEaseClose="power2.inOut"
                tapEaseOpen="power2.out"
                tapCallOn="afterHold"
                tapSpeed={1}
                reopenOvershoot={1.06}
                reopenGlideDur={0.26}
                reopenBreathDur={0.18}
                reopenStagger={0.06}
                easeToPeak="power3.out"
                easeToEnd="power2.out"
              >
                Participe do processo seletivo
              </ShimmerButton>
              </div>

            </section>
          </GlassCard>
        </section>

        {/* ========================= Seção 2 — O QUE FAZ? ========================= */}

        <section
          data-snap-section
          className="relative  text-white h-screen w-full snap-start overflow-hidden"
        >
          <section className="relative text-white h-screen w-full grid sticky top-0">
            <section className="flex flex-col p-6 gap-4 items-center py-[15vw]">

              <Subheadline variant="red">
                <TextReveal inView once typeSpeed={0.03} duration={0.16}>
                  O que a TaskUs faz?
                </TextReveal>
              </Subheadline>

              <Headline variant="h2">
                <RevealUpGSAP threshold={0.2} rootMargin="0px 0px -50% 0px">
                  Sabe quando alguém <br/>faz uma compra online,<br/> mas precisa de ajuda?
                </RevealUpGSAP>
              </Headline>

              <TrayOpen
                startY={200}
                duration={900}
                easing="cubic-bezier(.22,1,.36,1)"
                rootMargin="0px 0px -20% 0px"
                once={false}
              >
                <div className="border-t border-l mt-10 border-r flex flex-col items-center py-10 px-3 gap-4 rounded-t-3xl h-[145vw] w-full">

                  <RevealUpGSAP
                    threshold={0.2}
                    rootMargin="0px 0px -50% 0px"
                    duration={1.35}
                    delay={0}
                    ease="expo.out"
                  >
                    <img
                      src={Persons}
                      alt="Persons"
                      className="w-[100%] sm:w-4/5 md:w-3/4 h-auto rounded-lg"
                    />
                  </RevealUpGSAP>

                  <Subheadline color="text-white">
                    <RevealUpGSAP
                      threshold={0.2}
                      rootMargin="0px 0px 1% 0px"
                      duration={1.45}
                      delay={0.45}
                      ease="expo.out"
                    >
                      Nós temos equipes de Atendimento que representam empresas, conversando com seus clientes para
                      tirar dúvidas e garantir que cada um receba o suporte que precisa.
                    </RevealUpGSAP>
                  </Subheadline>
                  
                </div>

              </TrayOpen>
            </section>
          </section>
        </section>

      
        {/* =========================
            Seção 3 — Grade
            ========================= */}
        <section
          data-snap-section
          className="relative text-white h-screen w-full bg-slate-950 h-10 grid place-content-center snap-start"
        >
          <div className="pointer-events-none absolute inset-0" style={gridOverlayStyle} />
          <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
            Mais Conteúdo
            <br /> Role para baixo
          </h1>
        </section>


      </article>
    </main>
  );
}
