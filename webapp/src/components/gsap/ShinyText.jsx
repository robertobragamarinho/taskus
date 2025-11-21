import React from "react";

const ShinyText = ({
  text = null,
  children,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;
  const content = text ?? children;

  return (
    <>
      <style>
        {`
        .shiny-text {
          color: #b5b5b5a4;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0) 60%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          display: inline-block;
          animation: shine linear infinite;
        }

        @keyframes shine {
          0% {
            background-position: 100%;
          }
          100% {
            background-position: -100%;
          }
        }

        .shiny-text.disabled {
          animation: none !important;
        }
        `}
      </style>

      <span
        className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
        style={{ animationDuration }}
      >
        {content}
      </span>
    </>
  );
};

export default ShinyText;