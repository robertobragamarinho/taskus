'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ===== CSS base (sem wrap; cresce em largura) ===== */
const RT_CSS = `
.text-rotate {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;     /* <- não quebra linha */
  position: relative;
}
.text-rotate-sr-only {
  position: absolute;
  width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
.text-rotate-word { display: inline-flex; }
.text-rotate-lines { display: flex; flex-direction: column; width: 100%; }
.text-rotate-element { display: inline-block; }
.text-rotate-space { white-space: pre; }
.text-rotate-bg {
  position: absolute; inset: 0; pointer-events: none;
  z-index: 0; border-radius: inherit;
}
.text-rotate-wrap { position: relative; z-index: 1; display: inline-flex; white-space: nowrap; }
`;
let __rtCssInjected = false;
function injectCssOnce() {
  if (typeof document === 'undefined' || __rtCssInjected) return;
  const style = document.createElement('style');
  style.setAttribute('data-rotating-text', 'true');
  style.textContent = RT_CSS;
  document.head.appendChild(style);
  __rtCssInjected = true;
}

function cn(...classes) { return classes.filter(Boolean).join(' '); }

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },

    // Seu slide (mantenho vertical por padrão; no uso você pode passar {x:...}):
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit    = { y: '-120%', opacity: 0 },

    animatePresenceMode = 'wait',
    animatePresenceInitial = false,

    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,

    splitBy = 'characters',

    // Fundo
    bgEnabled = true,
    bgClassName = '',

    // Largura mínima do bloco
    minWidth = 96, // px

    // Spring da ANIMAÇÃO DE LARGURA do container (fase A)
    sizeSpring = { type: 'spring', damping: 30, stiffness: 400 },

    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(null);     // próximo idx que estamos preparando
  const [containerWidth, setContainerWidth] = useState(null); // width animável
  const [isSizing, setIsSizing] = useState(false);          // fase A ativa?

  const measureRef = useRef(null);     // medidor invisível
  const containerRef = useRef(null);   // container que anima width
  const timerRef = useRef(null);

  useEffect(() => { injectCssOnce(); }, []);

  const safeTexts = Array.isArray(texts) && texts.length ? texts : [''];

  // ==== Split helpers ====
  const splitIntoCharacters = useCallback((text) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (seg) => seg.segment);
    }
    return Array.from(text);
  }, []);

  const buildElements = useCallback((text) => {
    if (splitBy === 'characters') {
      const words = text.split(' ');
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === 'words') {
      return text.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === 'lines') {
      return text.split('\n').map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return text.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [splitBy, splitIntoCharacters]);

  const elements = useMemo(() => buildElements(safeTexts[currentTextIndex] ?? ''), [safeTexts, currentTextIndex, buildElements]);

  const totalChars = useMemo(
    () => elements.reduce((sum, w) => sum + w.characters.length, 0),
    [elements]
  );

  const getStaggerDelay = useCallback(
    (index, total) => {
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last')  return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center'){
        const c = Math.floor(total / 2);
        return Math.abs(c - index) * staggerDuration;
      }
      if (staggerFrom === 'random'){
        const r = Math.floor(Math.random() * total);
        return Math.abs(r - index) * staggerDuration;
      }
      return Math.abs(Number(staggerFrom) - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  // ====== Fase A: medir LARGURA do próximo texto e animar width do container
  const startSizingTo = useCallback((idx) => {
    if (idx === currentTextIndex) return;
    setTargetIndex(idx);
    setIsSizing(true);

    // mede com o medidor invisível (usa mesmo texto, sem split, sem wraps)
    requestAnimationFrame(() => {
      if (!measureRef.current) return;
      const w = Math.max(minWidth, Math.ceil(measureRef.current.getBoundingClientRect().width));
      setContainerWidth(w); // motion anima width até aqui (sizeSpring)
    });
  }, [currentTextIndex, minWidth]);

  // Quando a animação de width terminar, troca o texto (Fase B)
  const handleSizeDone = useCallback(() => {
    if (!isSizing || targetIndex == null) return;
    setCurrentTextIndex(targetIndex);
    setTargetIndex(null);
    setIsSizing(false);
    onNext?.(targetIndex);
  }, [isSizing, targetIndex, onNext]);

  // Controle público
  const next = useCallback(() => {
    const last = safeTexts.length - 1;
    const t = currentTextIndex === last ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (t !== currentTextIndex) startSizingTo(t);
  }, [currentTextIndex, safeTexts.length, loop, startSizingTo]);

  const previous = useCallback(() => {
    const last = safeTexts.length - 1;
    const t = currentTextIndex === 0 ? (loop ? last : currentTextIndex) : currentTextIndex - 1;
    if (t !== currentTextIndex) startSizingTo(t);
  }, [currentTextIndex, safeTexts.length, loop, startSizingTo]);

  const jumpTo = useCallback((i) => {
    const v = Math.max(0, Math.min(i, safeTexts.length - 1));
    if (v !== currentTextIndex) startSizingTo(v);
  }, [safeTexts.length, currentTextIndex, startSizingTo]);

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) startSizingTo(0);
  }, [currentTextIndex, startSizingTo]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  // autoplay
  useEffect(() => {
    if (!auto) return;
    if (typeof rotationInterval !== 'number' || rotationInterval <= 0) return;
    timerRef.current = setInterval(next, rotationInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [auto, rotationInterval, next]);

  // Define width inicial com base no texto atual
  useEffect(() => {
    // medir o atual quando montar (ou quando current mudar manualmente)
    if (!measureRef.current) return;
    const w = Math.max(minWidth, Math.ceil(measureRef.current.getBoundingClientRect().width));
    setContainerWidth(w);
  }, [currentTextIndex, minWidth]);

  return (
    <>
      {/* Medidor invisível: NÃO ocupa layout (position: fixed fora da tela) */}
      <span
        ref={measureRef}
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          // Herda tipografia do uso real? Se precisar, passe uma class aqui também.
        }}
      >
        {safeTexts[targetIndex ?? currentTextIndex]}
      </span>

      {/* Container animável em LARGURA */}
      <motion.span
        ref={containerRef}
        className={cn('text-rotate', mainClassName)}
        {...rest}
        style={{
          position: 'relative',
          borderRadius: 'inherit',
          overflow: 'hidden',
          width: containerWidth ?? 'auto',  // width controlado
          minWidth,                         // trava w-min
        }}
        animate={{ width: containerWidth ?? 'auto' }}
        transition={sizeSpring}
        onUpdate={() => {/* evita race conditions */}}
        onAnimationComplete={handleSizeDone} // quando width terminar → troca texto
      >
        {/* Fundo acompanhando o tamanho (sem alterar altura) */}
        {bgEnabled && (
          <motion.span
            className={cn('text-rotate-bg', bgClassName)}
            layout
            transition={sizeSpring}
            aria-hidden="true"
          />
        )}

        {/* A11y */}
        <span className="text-rotate-sr-only">{safeTexts[currentTextIndex]}</span>

        {/* Texto animado (Fase B) — só entra após width concluir */}
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          {!isSizing && (
            <motion.span
              key={currentTextIndex}
              className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate', 'text-rotate-wrap')}
              aria-hidden="true"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={transition}
            >
              {elements.map((wordObj, wordIndex, array) => {
                const prevChars = array.slice(0, wordIndex).reduce((s, w) => s + w.characters.length, 0);
                return (
                  <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                    {wordObj.characters.map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition,
                          delay: getStaggerDelay(prevChars + charIndex, totalChars),
                        }}
                        className={cn('text-rotate-element', elementLevelClassName)}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
                  </span>
                );
              })}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;