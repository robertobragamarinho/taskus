// MainTexts.jsx
/* eslint-disable react/prop-types */
import React from "react";

const MainTexts = ({ children, variant = "white" }) => {
  const colors = {
    white: "#f3f6f9",
    black: "#374151" // text-gray-700
  };

  return (
    <div 
      className="mb-6">
      {children}
    </div>
  );
};

export default MainTexts;