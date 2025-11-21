/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

const Paragraphs = ({
  children,
  variant = "white",
  variable = false,
  messages: propMessages,
  intervalMs = 8000,
  fadeMs = 400,
  minHeight,
  align = "left",
  className = "",
  style = {},
  as: Tag = "h2",
  ...rest
}) => {
  const colors = {
    white: "#9abae4",
    black: "#374151",
  };

  const defaultMessages = ["Erro ao carregar conteúdo"];
  const msgs =
    variable && propMessages && propMessages.length
      ? propMessages
      : variable
      ? defaultMessages
      : null;

  const [msgIndex, setMsgIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!variable || !msgs) return;

    const rotator = setInterval(() => {
      setFadeIn(false);
      const t = setTimeout(() => {
        setMsgIndex((i) => (i + 1) % msgs.length);
        setFadeIn(true);
      }, fadeMs);
      return () => clearTimeout(t);
    }, intervalMs);

    return () => clearInterval(rotator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variable, intervalMs, fadeMs]);

  const baseStyle = {
    marginTop: "5vw",
    fontSize: "14pt",
    lineHeight: "2.2vh",
    textAlign: align,
    marginBottom: "2vw",
    color: colors[variant] || colors.white,
    minHeight,
    transition: "opacity 400ms ease",
    opacity: variable ? (fadeIn ? 1 : 0) : 1,
  };

  return (
    <Tag
      className={`font-hendrix-light text-left ${className}`}
      style={{ ...baseStyle, ...style }}
      key={variable ? msgIndex : "static"}
      {...rest}
    >
      {variable ? msgs[msgIndex] : children}
    </Tag>
  );
};

export default Paragraphs;