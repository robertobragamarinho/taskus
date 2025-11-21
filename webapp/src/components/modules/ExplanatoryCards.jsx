/* eslint-disable react/prop-types */
import React from "react";
import VerifiedList from "./VerifiedList";

const ExplanatoryCards = ({ supportTypes, variant = "default" }) => {
  return (
    <div className="space-y-3">
      {supportTypes.map((type, index) => (
        <div
          key={index}
          className={`rounded-2xl px-6 pt-6 pb-6 ${
            variant === "alert" ? "border" : ""
          }`}
          style={{
            background: variant === "alert" ? "#fef2f2" : "#f3f6f9",
            borderColor: variant === "alert" ? "#ef4444" : "transparent",
            minHeight: 90,
          }}
        >
          <div className="flex flex-col mb-3 items-start">
            {/* Ícone do card */}
            {type.icon && (
              <div className="w-[48px] h-[48px] mt-1">
                <type.icon
                  className="w-10 h-10"
                  style={{
                    color: variant === "alert" ? "#ef4444" : "#1655ff",
                  }}
                />
              </div>
            )}

            {/* Título */}
            <h3
              className={`font-hendrix-semibold mb-2 ${
                variant === "alert" ? "text-red-500" : ""
              }`}
              style={{
                fontSize: "12pt",
                color: variant === "alert" ? "#ef4444" : "#1655ff",
                textAlign: "left",
              }}
            >
              {type.title}
            </h3>

            {/* Descrição */}
            {type.description && (
              <div
                className="font-hendrix-regular text-gray-600"
                style={{
                  fontSize: "11pt",
                  lineHeight: "4.3vw",
                  textAlign: "left",
                }}
              >
                {type.description}
              </div>
            )}
          </div>

          {/* Lista de etapas (VerifiedList) */}
          {Array.isArray(type.resources) && type.resources.length > 0 && (
            <div
              style={{
              
              }}
            >
              <VerifiedList
                resources={type.resources}
                withDescription={false}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExplanatoryCards;