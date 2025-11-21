// src/componentes/TextReveal.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function TextReveal({
  as: Tag = "span",
  className = "",
  children,
  typeSpeed = 0.03,
  duration = 0.16,
  fromBlur = 6,
  fromY = 6,
  once = false,
  inView = false,

  // ✅ ADICIONADO: permite disparar mais cedo/tarde via IntersectionObserver
  rootMargin = "0px 0px -10% 0px",
}) {
  const rootRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const wrapTextNodesAsChars = (el) => {
    if (!el) return [];
    if (el.dataset.trWrapped === "1") {
      return Array.from(el.querySelectorAll(".tr-char"));
    }

    const textNodes = [];
    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          return node.nodeValue && node.nodeValue.length > 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.REJECT;
        },
      },
      false
    );

    let current;
    while ((current = walker.nextNode())) textNodes.push(current);

    textNodes.forEach((tn) => {
      const txt = tn.nodeValue;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < txt.length; i++) {
        const ch = txt[i];
        const span = document.createElement("span");
        span.className = "tr-char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.style.display = "inline-block";
        frag.appendChild(span);
      }
      tn.parentNode.replaceChild(frag, tn);
    });

    el.dataset.trWrapped = "1";
    const letters = Array.from(el.querySelectorAll(".tr-char"));
    return letters;
  };

  const animate = () => {
    const root = rootRef.current;
    if (!root) return;

    const letters = wrapTextNodesAsChars(root);

    // Respeita redução de movimento
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.set(letters, { opacity: 1, filter: "blur(0px)", y: 0 });
      root.style.visibility = "visible";
      hasAnimatedRef.current = true;
      return;
    }

    // Estado inicial (antes de animar)
    gsap.set(letters, {
      opacity: 0,
      filter: `blur(${fromBlur}px)`,
      y: fromY,
      willChange: "transform, filter, opacity",
    });

    root.style.visibility = "visible";

    // Animação
    gsap.killTweensOf(letters);
    gsap.to(letters, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration,
      ease: "power3.out",
      stagger: { each: typeSpeed, from: "start" },
      onComplete: () => (hasAnimatedRef.current = true),
    });
  };

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Evita flash antes do wrap
    el.style.visibility = "hidden";

    if (inView) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!once || !hasAnimatedRef.current) animate();
              if (once) io.unobserve(el);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin, // ✅ ADICIONADO
        }
      );
      io.observe(el);
      return () => io.disconnect();
    } else {
      if (!once || !hasAnimatedRef.current) animate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, inView, once, typeSpeed, duration, fromBlur, fromY, rootMargin]); // ✅ ADICIONADO rootMargin

  const inlineStyle =
    Tag === "span" ? { display: "inline", whiteSpace: "pre-wrap" } : {};

  return (
    <Tag ref={rootRef} className={className} style={inlineStyle}>
      {children}
    </Tag>
  );
}