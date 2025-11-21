/* eslint-disable react/prop-types */
import React from "react";
import { Check } from "lucide-react";

const VerifiedList = ({ resources, withDescription = true }) => {
  return (
    <div className={`${withDescription ? "space-y-5" : "space-y-1"} mt-7 mb-5`}>
      {resources.map((resource, index) => (
        <div
          key={index}
          className={`flex space-x-3 ${
            withDescription ? "items-start" : "items-center"
          }`}
        >
          {/* Ícone de check */}
          <div
            className={`flex-shrink-0 ${
              withDescription ? "self-start mt-[2px]" : "self-center"
            }`}
          >
            <Check className="w-5 h-5" style={{ color: "#1655ff" }} />
          </div>

          {/* Conteúdo */}
          <div className="flex-1 ">
            <h3
              className="font-hendrix-medium"
              style={{
                fontSize: "12pt",
                lineHeight: "3.8vw",
                color: "#424242",
              }}
            >
              {resource.title}
            </h3>

            {withDescription && (
              <p
                className="font-hendrix-regular  text-gray-600"
                style={{
                  fontSize: "11pt",
                  lineHeight: "4vw",
                  marginTop: "1vw",
                  color: "#969696",
                }}
              >
                {resource.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerifiedList;