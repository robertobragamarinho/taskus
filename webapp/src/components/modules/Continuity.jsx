// Continuity.jsx
/* eslint-disable react/prop-types */
import React from "react";

const Continuity = ({ children, variant = "white" }) => {
  const colors = {
    white: "#fff",
    black: "#0054ff" // Tailwind text-gray-700
  };

  return (
    <p
      className="font-hendrix-medium text-left"
      style={{
        fontSize: "12pt",
        lineHeight: "2vh",
        marginTop: "1vw",
        marginBottom: "5.5vw",
        color: colors[variant] || colors.white
      }}
    >
      {children}
    </p>
  );
};

export default Continuity;