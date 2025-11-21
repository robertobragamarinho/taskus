// VerticalCard.jsx — vidro configurável (sem backdrop-blur) [ATUALIZADO]
"use client";

import React, { forwardRef, memo, useMemo } from "react";

/**
 * Props novas:
 * - borderMode: "modal" | "theme"  (default: "modal")
 *   - "modal": usa a mesma borda do LinesModal ("border border-white/30")
 *   - "theme": usa a borda do tema (t.borderColor como inline-style)
 */

const THEMES = {
  taskus: {
    bg: "linear-gradient(145deg, rgba(8,28,90,0.9) 0%, rgba(8,6,62,1) 100%)",
    glassBg: "linear-gradient(160deg, rgba(0,183,255,0.15), rgba(0,183,255,0.02))",
    borderColor: "rgba(0,183,255,0.35)",
    glowColor: "rgba(0,183,255,0.32)",
    iconBg: "radial-gradient(80% 80% at 50% 50%, rgba(46,63,253,0.28) 0%, rgba(46,63,253,0.06) 80%)",
    iconColor: "#2E3FFD",
    titleColor: "#ffffff",
    subtitleColor: "#BFDBFE",
    contentColor: "transparent",
  },

  dark: {
    bg: "#0645ac",
    glassBg: "transparent",
    borderColor: "transparent",
    glowColor: "transparent",
    iconBg: "#0645ac",
    iconColor: "#818CF8",
    titleColor: "#E5E7EB",
    subtitleColor: "#fff",
    contentColor: "rgba(209,213,219,0.9)",
  },

  soft: {
    bg: "linear-gradient(160deg, rgba(15,23,42,0.96), rgba(30,64,175,0.88))",
    glassBg: "linear-gradient(145deg, rgba(248,250,252,0.06), rgba(148,163,253,0.06))",
    borderColor: "rgba(148,163,253,0.26)",
    glowColor: "rgba(148,163,253,0.24)",
    iconBg: "radial-gradient(80% 80% at 50% 50%, rgba(129,140,248,0.3), transparent)",
    iconColor: "#A5B4FC",
    titleColor: "#EFF6FF",
    subtitleColor: "#BFDBFE",
    contentColor: "rgba(241,245,249,0.9)",
  },

  outline: {
    bg: "rgba(2,6,23,0.96)",
    glassBg: "transparent",
    borderColor: "transparent",
    glowColor: "transparent",
    iconBg: "radial-gradient(80% 80% at 50% 50%, rgba(59,130,246,0.22), transparent)",
    iconColor: "#60A5FA",
    titleColor: "#E5E7EB",
    subtitleColor: "#9CA3AF",
    contentColor: "rgba(209,213,219,0.9)",
  },
};

const VerticalCard = memo(
  forwardRef(function VerticalCard(
    {
      title,
      subtitle,
      icon: Icon,
      imageSrc,
      imageAlt = "",
      badge,
      actions = [],
      href,
      onClick,
      children,
      className = "",
      "aria-label": ariaLabel,
      interactive = false,
      showGlass = true,
      theme = "taskus",

      // overrides opcionais
      bg,
      glassBg,
      borderColor,
      glowColor,
      iconBg,
      iconColor,
      titleColor,
      subtitleColor,
      contentColor,
      heightClass = "h-[100vw]",
      rounded = "rounded-b-[32px]",

      // NOVO
      borderMode = "modal", // "modal" = mesma borda do LinesModal; "theme" = borda do tema
    },
    ref
  ) {
    const Container = href ? "a" : "div";

    const t = useMemo(() => {
      const base = THEMES[theme] || THEMES.taskus;
      return {
        bg: bg || base.bg,
        glassBg: glassBg || base.glassBg,
        borderColor: borderColor || base.borderColor,
        glowColor: glowColor || base.glowColor,
        iconBg: iconBg || base.iconBg,
        iconColor: iconColor || base.iconColor,
        titleColor: titleColor || base.titleColor,
        subtitleColor: subtitleColor || base.subtitleColor,
        contentColor: contentColor || base.contentColor,
      };
    }, [theme, bg, glassBg, borderColor, glowColor, iconBg, iconColor, titleColor, subtitleColor, contentColor]);

    const renderedActions = useMemo(() => {
      if (!actions?.length) return null;
      return (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {actions.map((a, i) => {
            if (!a) return null;
            const isLink = typeof a.href === "string" && a.href.trim().length > 0;
            const baseClasses =
              "w-full text-sm font-medium px-3 py-2 rounded-b-2xl border border-white/10 text-white/90 bg-white/5 hover:bg-white/10 transition-all duration-300";
            return isLink ? (
              <a key={i} href={a.href} onClick={a.onClick} className={baseClasses}>
                {a.label}
              </a>
            ) : (
              <button
                key={i}
                type="button"
                onClick={a.onClick}
                className={baseClasses}
                disabled={a.disabled}
                aria-disabled={a.disabled ? "true" : "false"}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      );
    }, [actions]);

    const glassLayer = showGlass ? (
      <div
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{
          // Mantém a película “glass” visual (SEM backdrop-filter)
          background: t.glassBg,
          opacity: 1,
          // A borda da película (decorativa) pode existir, mas a borda principal agora é controlada por borderMode:
          // Para manter consistência visual, deixei uma borda sutil e translúcida.
          border: "1px solid rgba(249,249,249,0.25)",
        }}
        aria-hidden="true"
      />
    ) : null;

    // Classes de borda conforme o LinesModal:
    // - "modal": aplica "border border-white/30" direto na casca
    // - "theme": usa estilo inline t.borderColor (mantém legado)
    const containerBorderClass = borderMode === "modal" ? "border border-white/30" : "border";
    const containerBorderStyle = borderMode === "theme" ? { borderColor: t.borderColor } : undefined;

    return (
      <Container
        ref={ref}
        href={href}
        onClick={href ? undefined : onClick}
        className={[
          "group relative rounded-3xl my-6 mx-auto w-full overflow-hidden",
          heightClass,
          rounded,
          "isolate contain-paint",
          containerBorderClass, // ← aplica a classe de borda
          interactive ? "transition-transform duration-300 ease-out will-change-transform hover:scale-[1.02]" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          background: t.bg,
          ...(containerBorderStyle || {}),
          boxShadow: `0 0 22px ${t.glowColor}`,
        }}
        role="article"
        aria-label={ariaLabel || title}
        rel={href ? "noreferrer" : undefined}
      >
        {/* Película "glass" (sem backdrop) */}
        {glassLayer}

        {/* Imagem opcional (topo) */}
        {imageSrc && (
          <div className="relative aspect-[4/2] w-full overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 transparent" />
          </div>
        )}

        {/* Conteúdo */}
        <div className="relative p-6 sm:p-7">
          {badge && <div className="mb-3 inline-flex items-center gap-2 rounded-full">{badge}</div>}

          {/* Header */}
          <div className="mb-3 flex items-start gap-3">
            {Icon && (
              <div
                className="relative grid h-11 w-11 place-items-center rounded-2xl"
                style={{
                  background: t.iconBg,
                  boxShadow: "0 6px 16px rgba(46,63,253,0.22), inset 0 0 10px rgba(46,63,253,0.22)",
                }}
              >
                <Icon size={22} strokeWidth={2.2} color={t.iconColor} />
              </div>
            )}

            <div className="flex-1">
              <h3
                className="text-[4.5vw] leading-[5.8vw] font-semibold mb-2 px-5 py-10 text-center"
                style={{ color: t.titleColor }}
              >
                {title}
              </h3>
              {subtitle && (
                <p
                  className="text-[3.5vw] font-light leading-[5vw] tracking-[0.10vw] px-6 text-center"
                  style={{ color: t.subtitleColor }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Corpo */}
          {children && (
            <div className="prose prose-invert max-w-none text-xs sm:text-sm" style={{ color: t.contentColor }}>
              {children}
            </div>
          )}

          {/* Ações */}
          {renderedActions}
        </div>

        {/* Brilho de rodapé */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 100%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
      </Container>
    );
  })
);

export default VerticalCard;