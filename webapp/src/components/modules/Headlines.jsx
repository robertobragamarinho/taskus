/* eslint-disable react/prop-types */
import React from "react";

const Headlines = ({
  children,
  variant = "white",
  className = "",
  style = {},
  as: Tag = "h1",
  ...rest
}) => {
  const colors = {
    white: "#f3f6f9",
    black: "#374151",
  };

  const baseStyle = {
    fontSize: "20pt",
    lineHeight: "3.2vh",
    textAlign: "left",
    marginBottom: "2vw",
    color: colors[variant] || colors.white,
  };

  return (
    <Tag
      className={`font-hendrix-semibold text-left ${className}`}
      style={{ ...baseStyle, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Headlines;