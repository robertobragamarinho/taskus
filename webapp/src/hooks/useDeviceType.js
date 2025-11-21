// src/hooks/useDeviceType.js
import { useEffect, useState } from "react";

export function useDeviceType() {
  const [device, setDevice] = useState(null); 
  // null = ainda detectando, evita piscar conteúdo errado

  useEffect(() => {
    // Garante que a detecção só roda no lado do cliente (browser)
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      // Se não for um ambiente de navegador, assumimos desktop como fallback
      // ou mantemos 'null' se preferir um erro explícito de carregamento.
      // Para este caso, manteremos a lógica de detecção no browser.
      return;
    }

    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // Padrões comuns de celulares/tablets
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      ua
    );

    if (isMobileUA) {
      setDevice("mobile");
    } else {
      setDevice("desktop");
    }
  }, []);

  return device; // "mobile" | "desktop" | null
}
