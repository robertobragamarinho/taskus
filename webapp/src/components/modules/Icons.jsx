/* eslint-disable react/prop-types */
import React from "react";

const Icons = ({ Icon, size = 60, color = "#1655ff" }) => {
  if (!Icon) return null;

  return (
    <div style={{ marginBottom: "1vw" }} className="flex justify-left">
      <Icon
        width={size}
        height={size}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </div>
  );
};

export default Icons;