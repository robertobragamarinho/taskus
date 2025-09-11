import React, { useState, useEffect } from "react";
import '../../styles/refino.css';

import LogoTaskUs from '../../assets/logo-min.webp';

const PaymentCallback = ({ onContinue }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [blink, setBlink] = useState(true);


  const handleClick = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      await onContinue();
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animação de piscar
  useEffect(() => {
    if (!isLoading) {
      const blinkInterval = setInterval(() => {
        setBlink(prev => !prev);
      }, 500);
      return () => clearInterval(blinkInterval);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 flex flex-col items-center">
        {/* Título principal */}
        <div className="text-center space-y-3 w-full">
          <img
            className="mx-auto"
            src={LogoTaskUs}
            style={{
              width: "100%",
              maxWidth: "250px",
              height: "auto",
              opacity: blink ? 1 : 0.5,
              transition: "opacity 0.2s"
            }}
            alt="TaskUs Logo"
          />
          <p
            className="font-hendrix-regular text-gray-600"
            style={{
              fontSize: "10pt",
              lineHeight: 1.4,
              opacity: blink ? 1 : 0.8,
              transition: "opacity 0.2s"
            }}
          >
            <br />
          </p>
          <p
            className="font-hendrix-regular text-gray-600"
            style={{
              fontSize: "10pt",
              lineHeight: 1.4,
              opacity: blink ? 1 : 0.3,
              transition: "opacity 0.4s"
            }}
          >
            Retornando para a plataforma da TaskUs
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
