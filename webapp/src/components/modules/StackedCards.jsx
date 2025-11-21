// src/componentes/StackedCards.jsx
import React, {
  useLayoutEffect,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import TrayOpen from "../gsap/TrayOpen";
import PulseAppears from "../gsap/PulseAppears";

/**
 * StackedCards
 *
 * Props:
 *  - header: conteúdo do header (JSX)
 *  - className: classes da section raiz (ex: bg geral)
 *  - cardClassName: classes extras aplicadas em cada card
 *  - height: minHeight de cada card (ex: "75vh")
 *  - gap: espaçamento vertical entre cards (gera grid com rowGap)
 *  - headerHeightClass: altura do header (ex: "h-[45vw]", "h-[60vh]")
 *  - headerClassName: classes do wrapper do header (ex: bg, blur, borda)
 *  - headerStyle: style inline do wrapper do header
 */

// RevealOnScroll ============================================================
function RevealOnScroll({
  children,
  threshold = 0.4,
  rootMargin = "0px 0px -15% 0px",
  once = true,
  className = "",
  style,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  const base = {
    opacity: 0,
    transform: "translateY(24px) scale(0.98)",
    transition:
      "opacity 420ms cubic-bezier(.22,1,.36,1), transform 520ms cubic-bezier(.22,1,.36,1)",
    willChange: "opacity, transform",
  };

  const on = {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...(visible ? on : base), ...style }}
    >
      {children}
    </div>
  );
}

// StackedCards ==============================================================
export default function StackedCards({
  header = null,
  children,
  className = "bg-[#000]",
  cardClassName = "",
  height = "75vh",
  gap,
  headerHeightClass = "h-[45vw]",
  headerClassName = "",
  headerStyle = {},
}) {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const rafIdRef = useRef(null);
  const lastHeightRef = useRef(null);

  // garante scroll no topo ao montar
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollTo(0, 0);
    }
  }, []);

  // mede altura do header e seta --stackTop
  useLayoutEffect(() => {
    const rootEl = rootRef.current;
    const headerEl = headerRef.current;
    if (!rootEl || !headerEl) return;

    const apply = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const rect = headerEl.getBoundingClientRect();
        const h = rect.height;
        if (h !== lastHeightRef.current) {
          rootEl.style.setProperty("--stackTop", `${h}px`);
          lastHeightRef.current = h;
        }
      });
    };

    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(headerEl);

    return () => {
      ro.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const baseCardStyle = useMemo(
    () => ({
      top: "var(--stackTop)",
      minHeight: height,
    }),
    [height]
  );

  const kids = useMemo(() => React.Children.toArray(children), [children]);

  return (
    <section
      ref={rootRef}
      className={className}
      style={{
        "--stackTop": "55px", // fallback
      }}
    >
      {/* HEADER sticky */}
      <div
        ref={headerRef}
        className={[
          headerHeightClass,
          "flex justify-center items-center sticky top-0",
          headerClassName, // ✅ customização via prop
        ]
          .filter(Boolean)
          .join(" ")}
        style={headerStyle}
      >
        {header}
      </div>

      {/* CARDS */}
      <div style={gap ? { display: "grid", rowGap: gap } : undefined}>
        {kids.map((child, i) => (
          <div
            key={i}
            className={[
              "sticky rounded-3xl flex items-center justify-center",
              cardClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ ...baseCardStyle, zIndex: i + 1 }}
          >
            <RevealOnScroll
              threshold={0.45}
              rootMargin="0px 0px -10% 0px"
              once={true}
              className="w-full"
              style={{ transitionDelay: `${Math.min(i * 60, 240)}ms` }}
            >
              <TrayOpen
                startY={300}
                duration={900}
                easing="cubic-bezier(.22,1,.36,1)"
                rootMargin="0px 0px -10% 0px"
                once={true}
              >
                {child}
              </TrayOpen>
            </RevealOnScroll>
          </div>
        ))}
      </div>
    </section>
  );
}