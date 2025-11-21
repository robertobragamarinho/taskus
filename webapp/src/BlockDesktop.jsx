'use client';
import React, { useRef, useEffect } from 'react';

// ====== SEUS IMPORTS EXISTENTES ======
import GradualBlur from './components/gsap/GradualBlur';
import Gradient from './components/gsap/Gradient.jsx';

// =======================
//         MÓDULOS
// =======================
import Header from './components/modules/Header.jsx';

// =======================
//         SESSÕES
// =======================


import Headline from "./components/Headline"
import AnimaRolagem from "./components/gsap/AnimaRolagem.jsx"
import FadeIn from "./components/gsap/FadeIn.jsx"
import LiquidGlass from "./components/modules/LiquidGlass.jsx"
import FadeContent from "./components/gsap/FadeContent.jsx"
import banner from "./assets/brasil.webp"
import Sheta from "./components/modules/Sheta.jsx"







function ScrollContainer({ sections }) {
  const containerRef = React.useRef(null);
  const sectionRefs = React.useRef([]);
  const currentIndexRef = React.useRef(0);
  const lastScrollRef = React.useRef(0);
  const isAnimatingRef = React.useRef(false);

  // Toque/hold
  const touchStartYRef = React.useRef(0);
  const lastTouchYRef = React.useRef(0);
  const holdTimerRef = React.useRef(null);
  const holdArmedRef = React.useRef(false);
  const touchActiveRef = React.useRef(false);
  const dirRef = React.useRef(0); // -1 = subir, +1 = descer

  // Init
  const didInitRef = React.useRef(false);
  const mountTimeRef = React.useRef(0);

  // iOS detection
  const isIOS = (() => {
    if (typeof navigator === 'undefined') return false;
    return /iP(ad|hone|od)/.test(navigator.platform) || 
           (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  })();

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let af = null;
    let resizeRaf = null;

    const SWIPE_THRESHOLD = 40;
    const INTENT_THRESHOLD = 12;
    const HOLD_COMMIT_MS = 180;
    const INIT_IGNORE_MS = 260;

    const getVH = () => container.clientHeight || window.innerHeight || 0;

    const getInner = (index) => {
      const el = sectionRefs.current[index];
      if (!el) return null;
      return el.querySelector('[data-inner-scroll]');
    };

    const canScrollInside = (index, deltaY) => {
      const s = sections[index];
      if (!s || !s.scrollable) return false;
      const inner = getInner(index);
      if (!inner) return false;

      const atTop = inner.scrollTop <= 0;
      const atBottom = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 1;

      if (deltaY > 0 && !atBottom) return true;
      if (deltaY < 0 && !atTop) return true;
      return false;
    };

    // ---------- lock/unlock ----------
    const preventWhileAnimating = (e) => {
      if (isAnimatingRef.current && e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const hardLockTouch = () => {
      container.style.touchAction = 'none';
    };
    const softTouch = () => {
      container.style.touchAction = 'manipulation';
    };

    const lockScroll = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      // mata momentum no iOS
      if (isIOS) container.style.webkitOverflowScrolling = 'auto';
      container.addEventListener('wheel', preventWhileAnimating, { passive: false });
      container.addEventListener('touchmove', preventWhileAnimating, { passive: false });
      // pointermove também para iOS 17+
      container.addEventListener('pointermove', preventWhileAnimating, { passive: false });
      hardLockTouch();
    };

    const unlockScroll = () => {
      if (!isAnimatingRef.current) return;
      isAnimatingRef.current = false;
      container.removeEventListener('wheel', preventWhileAnimating);
      container.removeEventListener('touchmove', preventWhileAnimating);
      container.removeEventListener('pointermove', preventWhileAnimating);
      if (isIOS) container.style.webkitOverflowScrolling = 'touch';
      softTouch();
    };

    // ---------- animação ----------
    const animateTo = (targetTop, cb) => {
      const startTop = container.scrollTop;
      if (startTop === targetTop) {
        cb?.();
        return;
      }

      if (af) cancelAnimationFrame(af);

      const duration = 560;
      const start = performance.now();
      lockScroll();

      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        container.scrollTop = startTop + (targetTop - startTop) * eased;
        if (t < 1) {
          af = requestAnimationFrame(step);
        } else {
          container.scrollTop = targetTop;
          unlockScroll();
          cb?.();
        }
      };
      af = requestAnimationFrame(step);
    };

    const goToSection = (index) => {
      if (index < 0 || index >= sections.length) return;
      const vh = getVH();
      const targetTop = index * vh;
      animateTo(targetTop, () => {
        currentIndexRef.current = index;
        lastScrollRef.current = targetTop;
      });
    };

    // ---------- init super estável ----------
    const stableInit = () => {
      mountTimeRef.current = performance.now();

      // Duplo triple-RAF + setTimeout(0) para iOS montar layout
      const doZero = () => {
        container.scrollTop = 0;
        currentIndexRef.current = 0;
        lastScrollRef.current = 0;
      };

      const triple = (fn) => requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          requestAnimationFrame(fn)
        )
      );

      triple(() => {
        setTimeout(() => {
          triple(() => {
            doZero();
          });
        }, 0);
      });
    };

    // ---------- handlers ----------
    const handleScroll = () => {
      if (isAnimatingRef.current) return;
      const since = performance.now() - mountTimeRef.current;
      if (since < INIT_IGNORE_MS) return;

      const st = container.scrollTop;
      const vh = getVH();
      const idx = Math.round(st / vh);
      currentIndexRef.current = Math.max(0, Math.min(sections.length - 1, idx));
      lastScrollRef.current = st;
    };

    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      const since = performance.now() - mountTimeRef.current;
      if (since < INIT_IGNORE_MS) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      if (deltaY === 0) return;

      const idx = currentIndexRef.current;
      if (canScrollInside(idx, deltaY)) return;

      const threshold = 30;
      if (deltaY > threshold && idx < sections.length - 1) {
        if (e.cancelable) e.preventDefault();
        goToSection(idx + 1);
      } else if (deltaY < -threshold && idx > 0) {
        if (e.cancelable) e.preventDefault();
        goToSection(idx - 1);
      }
    };

    // --- Pointer events (iOS 13+/17+ mais consistente que touch) ---
    const clearHold = () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      holdArmedRef.current = false;
    };

    const armHold = (dir) => {
      clearHold();
      holdArmedRef.current = true;
      // já endurece o toque para o iOS não “segurar”
      hardLockTouch();
      holdTimerRef.current = setTimeout(() => {
        if (!touchActiveRef.current) return;
        const idx = currentIndexRef.current;
        const atFirst = idx === 0;
        const atLast = idx === sections.length - 1;
        if (dir > 0 && !atLast) goToSection(idx + 1);
        if (dir < 0 && !atFirst) goToSection(idx - 1);
        clearHold();
      }, HOLD_COMMIT_MS);
    };

    const onPointerDown = (e) => {
      // só reage a toque (não mouse)
      if (e.pointerType !== 'touch') return;
      touchActiveRef.current = true;
      touchStartYRef.current = e.clientY;
      lastTouchYRef.current = e.clientY;
      dirRef.current = 0;
      clearHold();
    };

    const onPointerMove = (e) => {
      if (e.pointerType !== 'touch') return;

      const since = performance.now() - mountTimeRef.current;
      if (since < INIT_IGNORE_MS) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      lastTouchYRef.current = e.clientY;

      if (isAnimatingRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const deltaY = touchStartYRef.current - e.clientY; // + descendo, - subindo
      const idx = currentIndexRef.current;

      // inner scroll? deixa passar e solta hardLock se tiver
      if (canScrollInside(idx, deltaY)) {
        if (!isAnimatingRef.current) softTouch();
        clearHold();
        dirRef.current = 0;
        return;
      }

      // swipe decidido
      if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        if (e.cancelable) e.preventDefault();
        clearHold();
        if (deltaY > 0 && idx < sections.length - 1) goToSection(idx + 1);
        else if (deltaY < 0 && idx > 0) goToSection(idx - 1);
        return;
      }

      // intenção de swipe -> arma hold
      if (Math.abs(deltaY) >= INTENT_THRESHOLD) {
        const dir = deltaY > 0 ? 1 : -1;
        if (dirRef.current !== dir || !holdArmedRef.current) {
          dirRef.current = dir;
          armHold(dir);
        }
        // com hold armado, evita que o iOS “segure”
        if (e.cancelable) e.preventDefault();
      } else {
        clearHold();
        dirRef.current = 0;
        // libera toque leve
        softTouch();
      }
    };

    const onPointerUp = () => {
      touchActiveRef.current = false;
      clearHold();
      // ao terminar o gesto, volta para soft touch (se não estiver animando)
      if (!isAnimatingRef.current) softTouch();
    };

    const onTouchStartFallback = (e) => {
      // fallback para navegadores sem Pointer Events
      if (!e.touches || e.touches.length === 0) return;
      touchActiveRef.current = true;
      touchStartYRef.current = e.touches[0].clientY;
      lastTouchYRef.current = e.touches[0].clientY;
      dirRef.current = 0;
      clearHold();
    };

    const onTouchMoveFallback = (e) => {
      if (!e.touches || e.touches.length === 0) return;

      const since = performance.now() - mountTimeRef.current;
      if (since < INIT_IGNORE_MS) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      if (isAnimatingRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const currentY = e.touches[0].clientY;
      lastTouchYRef.current = currentY;
      const deltaY = touchStartYRef.current - currentY;
      const idx = currentIndexRef.current;

      if (canScrollInside(idx, deltaY)) {
        softTouch();
        clearHold();
        dirRef.current = 0;
        return;
      }

      if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        if (e.cancelable) e.preventDefault();
        clearHold();
        if (deltaY > 0 && idx < sections.length - 1) goToSection(idx + 1);
        else if (deltaY < 0 && idx > 0) goToSection(idx - 1);
        return;
      }

      if (Math.abs(deltaY) >= INTENT_THRESHOLD) {
        const dir = deltaY > 0 ? 1 : -1;
        if (dirRef.current !== dir || !holdArmedRef.current) {
          dirRef.current = dir;
          armHold(dir);
        }
        if (e.cancelable) e.preventDefault();
      } else {
        clearHold();
        dirRef.current = 0;
        softTouch();
      }
    };

    const onTouchEndFallback = () => {
      touchActiveRef.current = false;
      clearHold();
      if (!isAnimatingRef.current) softTouch();
    };

    // ---------- bootstrap ----------
    if (!didInitRef.current) {
      didInitRef.current = true;
      stableInit();
    }

    // estado default
    container.style.touchAction = 'manipulation';
    if (isIOS) container.style.webkitOverflowScrolling = 'touch';

    // Scroll + wheel
    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Pointer (melhor caminho no iOS moderno)
    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    container.addEventListener('pointermove', onPointerMove, { passive: false });
    container.addEventListener('pointerup', onPointerUp, { passive: true });
    container.addEventListener('pointercancel', onPointerUp, { passive: true });

    // Fallback Touch (para iOS mais antigo / ambientes sem Pointer Events)
    container.addEventListener('touchstart', onTouchStartFallback, { passive: true });
    container.addEventListener('touchmove', onTouchMoveFallback, { passive: false });
    container.addEventListener('touchend', onTouchEndFallback, { passive: true });
    container.addEventListener('touchcancel', onTouchEndFallback, { passive: true });

    // Reposiciona quando viewport/conteúdo mudam
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const idx = currentIndexRef.current;
        const vh = getVH();
        const targetTop = idx * vh;
        const prev = isAnimatingRef.current;
        isAnimatingRef.current = true;
        if (isIOS) container.style.webkitOverflowScrolling = 'auto';
        container.scrollTop = targetTop;
        if (isIOS) container.style.webkitOverflowScrolling = 'touch';
        isAnimatingRef.current = prev;
      });
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    const onLoad = () => onResize();
    window.addEventListener('load', onLoad, { passive: true });
    if (document.fonts?.ready) { document.fonts.ready.then(onResize); }

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);

      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);

      container.removeEventListener('touchstart', onTouchStartFallback);
      container.removeEventListener('touchmove', onTouchMoveFallback);
      container.removeEventListener('touchend', onTouchEndFallback);
      container.removeEventListener('touchcancel', onTouchEndFallback);

      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('load', onLoad);

      if (af) cancelAnimationFrame(af);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      softTouch();
      if (isIOS) container.style.webkitOverflowScrolling = 'touch';
    };
  }, [sections]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        overflowY: 'scroll',
        // snap via JS
        scrollSnapType: 'none',
        scrollBehavior: 'auto',
        margin: 0,
        padding: 0,
        overscrollBehavior: 'none',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'manipulation',
      }}
    >
      {sections.map(({ id, scrollable, body }, index) => (
        <section
          key={id}
          ref={(el) => (sectionRefs.current[index] = el)}
          style={{
            height: '100vh',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            borderBottom: '0px solid transparent',
            overflow: 'hidden',
          }}
        >
          {scrollable ? (
            <div
              data-inner-scroll
              className="w-full h-full overflow-y-auto"
              style={{
                overscrollBehavior: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'auto', // deixa o inner nativo
              }}
            >
              {body}
            </div>
          ) : (
            <div className="w-full h-full">{body}</div>
          )}
        </section>
      ))}
    </div>
  );
}

/**
 * CAPSULE — limite de layout ao tamanho aproximado de uma tela de MacBook
 * (largura máx 1280px, centralizada)
 */
const Capsule = ({ children, className = "" }) => {
  return (
    <div
      className={`
        w-full h-full
        max-w-[1280px]
        mx-auto
        px-4 sm:px-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * Host que define o array de seções usando os seus componentes atuais
 * e entrega tudo para o ScrollContainer acima.
 */
export default function HomePageScrollHost() {
  const sections = [
    // 🟡 PRIMEIRA DOBRA 
    {
      id: 'section-1',
      scrollable: false,
      body: (
        <>
          <Header.Desktop rightText="Brasil 2025" />

          <GradualBlur
            position="bottom"
            fadeDuration={0}
            height="8rem"
            strength={1}
            divCount={7}
            curve="bezier"
            exponential
            opacity={1}
            blurActivationMode="id"
            fadeIn
          />

          <Gradient
            activateOnId={['ative1', 'ative2', 'ative3', 'ative4', 'ative5']}
            deactivateOnId={[
              'desative1',
              'desative2',
              'desative3',
              'desative4',
              'desative5',
            ]}
          />

          <Header.Switch className="h-0" />
          <div id="blurActive"></div>

          <section className="h-screen relative bg-[#0a55f881] px-1 py-[6vh]">
            {/* Centraliza a cápsula no centro da dobra */}
            <div className="w-full h-full flex items-center justify-center">
              <Capsule className="flex flex-col lg:flex-row items-center justify-center">
                {/* COLUNA ESQUERDA - TEXTOS */}
                <section className="flex flex-col items-left w-full lg:w-1/2  gap-5">
                  <FadeIn inView once from="bottom" distance={80} duration={1.9}>
                    <Headline align="center" variant="h2"  className="text-[20vw]">
                        Ganhe{" "}
                        <span className="font-bold">
                            R$2.450,00/Mês <br />+benefícios
                        </span>{" "}
                        trabalhando<br /> no conforto da sua casa
                    </Headline>
                  </FadeIn>

            <div className='w-full flex items-center justify-center'>
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
            </div>
                  <p className="text-[15pt] mt-10 text-center">
                     Para garantir a melhor experiência de navegação<br />
                     e participar do processo seletivo, aponte a câmera<br /> 
                    do seu celular para o QRCODE ao lado
                  </p>

                   <Sheta size={30} variant="right" />
                 
                </section>

                {/* COLUNA DIREITA - IMAGEM / QR CODE */}
                <section className="w-full lg:w-1/2 flex items-left justify-center">
                  <FadeContent>
                    <img
                      src={banner}
                      alt="Banner"
                      className="
                        w-[80vw]          /* mobile */
                        max-w-[380px]     /* limite mobile */
                        lg:w-[500px]      /* desktop dentro da cápsula */
                        lg:max-w-[570px]  /* não passa disso mesmo em telas grandes */
                        h-auto
                        rounded-lg
                        -mt-6
                        lg:mt-[-1vh]
                        object-contain
                      "
                    />
                  </FadeContent>
                </section>
              </Capsule>
            </div>

            <section className="secfn1"></section>
          </section>
        </>
      ),
    },
  ];

  return <ScrollContainer sections={sections} />;
}