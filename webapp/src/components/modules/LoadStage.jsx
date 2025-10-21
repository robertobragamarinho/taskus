// LoadingVariants.jsx
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";

/* -------------------------- helpers & shared hook -------------------------- */

const getStrokeColor = (p) => {
  if (p < 33) return "#1655ff"; // azul
  if (p < 66) return "#7c3aed"; // roxo
  return "#22c55e";             // verde
};

/** Progresso linear + “pausas” visuais no displayProgress */
function useLinearProgressWithPauses(totalDurationMs, onComplete) {
  const [progress, setProgress] = useState(0);                 // real (0–100)
  const [displayProgress, setDisplayProgress] = useState(0);   // exibido (com pausas)
  const [timeRemaining, setTimeRemaining] = useState(
    Math.ceil(totalDurationMs / 1000)
  );
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [pauseUntil, setPauseUntil] = useState(0);

  // progresso real linear + tempo restante
  useEffect(() => {
    const interval = 100; // ms
    const increment = (interval / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + increment);
        const remainingMs = (100 - next) * (totalDurationMs / 100);
        setTimeRemaining(Math.max(0, Math.ceil(remainingMs / 1000)));

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, totalDurationMs]);

  // pausas visuais + aproximação suave
  useEffect(() => {
    const tick = setInterval(() => {
      const now = Date.now();
      const isPaused = now < pauseUntil;

      if (!isPaused && Math.random() < 0.06 && displayProgress < 99.5) {
        const hold = 250 + Math.random() * 550; // 250–800ms
        setPauseUntil(now + hold);
        return;
      }

      if (isPaused) {
        setAnimatedNumber(Math.round(displayProgress));
        return;
      }

      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (diff <= 0) {
          setAnimatedNumber(Math.round(prev));
          return prev;
        }
        const step =
          diff > 5
            ? Math.min(diff, diff * 0.28 + 0.6)
            : Math.min(diff, diff * 0.18 + 0.25);

        const next = Math.min(progress, prev + step);
        setAnimatedNumber(Math.round(next));
        return next;
      });
    }, 100);

    return () => clearInterval(tick);
  }, [progress, displayProgress, pauseUntil]);

  return { progress, displayProgress, timeRemaining, animatedNumber };
}

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

/* --------------------------------- LoadStagen (centralizado) --------------------------------- */

export const LoadStagen = ({
  totalDurationMs,
  onComplete,
  headline = "Preparando tudo…",
  subheadline = "Isso levará apenas alguns instantes.",
  size = 140,
  strokeWidth = 8,
  showTime = true,
}) => {
  const { progress, displayProgress, timeRemaining, animatedNumber } =
    useLinearProgressWithPauses(totalDurationMs, onComplete);

  // geometria do círculo
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference.toFixed(3);
  const strokeDashoffset = (circumference * (1 - displayProgress / 100)).toFixed(3);

  // orbitais
  const orbitals = useMemo(() => {
    const baseR = radius + 6;
    return [
      { id: 1, angle: 0,   radius: baseR,    size: 6, delay: 0,   speed: 55 },
      { id: 2, angle: 120, radius: baseR-8,  size: 5, delay: 0.2, speed: 45 },
      { id: 3, angle: 240, radius: baseR+10, size: 7, delay: 0.4, speed: 65 },
    ];
  }, [radius]);

  const [orbitalAngles, setOrbitalAngles] = useState(orbitals.map(o => o.angle));

  useEffect(() => {
    let rafId;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setOrbitalAngles(prev => prev.map((a, i) => (a + orbitals[i].speed * dt) % 360));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [orbitals]);

  return (
    <div className="w-full  px-6 flex flex-col items-center text-center">

      <div className="relative mb-10" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="block">
          <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
          <circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke={getStrokeColor(displayProgress)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-200"
            style={{
              transitionTimingFunction: "linear",
              filter: displayProgress > 0 ? `drop-shadow(0 0 8px ${getStrokeColor(displayProgress)}40)` : "none",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>

        {orbitals.map((o, i) => {
          const angle = (orbitalAngles[i] * Math.PI) / 180;
          const x = size/2 + Math.cos(angle) * o.radius;
          const y = size/2 + Math.sin(angle) * o.radius;
          return (
            <div
              key={o.id}
              className="absolute rounded-full bg-white"
              style={{
                width: `${o.size}px`,
                height: `${o.size}px`,
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                backgroundColor: getStrokeColor(displayProgress),
                animation: `glow 2s ease-in-out infinite ${o.delay}s`,
                boxShadow: `0 0 ${o.size * 2}px ${getStrokeColor(displayProgress)}60`,
              }}
            />
          );
        })}

        <div className="absolute inset-0  flex flex-col items-center justify-center">
          <div
            className="text-3xl font-bold"
            style={{
              color: getStrokeColor(displayProgress),
              textShadow: displayProgress > 0 ? `0 0 20px ${getStrokeColor(displayProgress)}40` : "none",
            }}
          >
            {animatedNumber}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round(displayProgress) === 100 ? "Concluído!" : "Em progresso"}
          </div>

          {displayProgress > 0 && displayProgress < 100 && (
            <div className="flex space-x-1 mt-2">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: getStrokeColor(displayProgress), animation: "bounce 1.4s ease-in-out infinite" }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: getStrokeColor(displayProgress), animation: "bounce 1.4s ease-in-out infinite 0.2s" }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: getStrokeColor(displayProgress), animation: "bounce 1.4s ease-in-out infinite 0.4s" }} />
            </div>
          )}
        </div>
      </div>

      <h3
        className="font-hendrix-semibold"
        style={{ fontSize: "18pt", lineHeight: "1.2", color: "#111827" }}
      >
        {headline}
      </h3>

      <p
        className="font-hendrix-regular mb-10"
        style={{ fontSize: "12pt", color: "#4B5563", lineHeight: "1.2" }}
      >
        {subheadline}
      </p>


     

      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

/* ----------------------------- LoadingBarHorizontal (círculo à esquerda + infos à direita) ----------------------------- */

export const LoadingBarHorizontal = ({
  totalDurationMs,
  onComplete,
  size = 100,
  strokeWidth = 5,
}) => {
  const { displayProgress, timeRemaining, animatedNumber } =
    useLinearProgressWithPauses(totalDurationMs, onComplete);

  // geometria do círculo
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference.toFixed(3);
  const strokeDashoffset = (circumference * (1 - displayProgress / 100)).toFixed(3);

  // orbitais
  const orbitals = useMemo(() => {
    const baseR = radius + 5;
    return [
      { id: 1, angle: 0,   radius: baseR,    size: 6, delay: 0,   speed: 50 },
      { id: 2, angle: 120, radius: baseR-8,  size: 5, delay: 0.2, speed: 40 },
      { id: 3, angle: 240, radius: baseR+10, size: 7, delay: 0.4, speed: 60 },
    ];
  }, [radius]);

  const [orbitalAngles, setOrbitalAngles] = useState(orbitals.map(o => o.angle));
  useEffect(() => {
    let rafId;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setOrbitalAngles(prev => prev.map((a, i) => (a + orbitals[i].speed * dt) % 360));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [orbitals]);

  return (
    <div className="w-full mb-10 bg-[#f3f6f9] rounded-2xl p-4">
      <div className="bg-white/0">
        <div className="flex items-center space-x-6">
          {/* círculo à esquerda */}
          <div className="flex-shrink-0">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} className="block">
                <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
                <circle
                  cx={size/2}
                  cy={size/2}
                  r={radius}
                  stroke={getStrokeColor(displayProgress)}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-200"
                  style={{
                    transitionTimingFunction: "linear",
                    filter: displayProgress > 0 ? `drop-shadow(0 0 8px ${getStrokeColor(displayProgress)}40)` : "none",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>

              {orbitals.map((o, i) => {
                const angle = (orbitalAngles[i] * Math.PI) / 180;
                const x = size/2 + Math.cos(angle) * o.radius;
                const y = size/2 + Math.sin(angle) * o.radius;
                return (
                  <div
                    key={o.id}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${o.size}px`,
                      height: `${o.size}px`,
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: getStrokeColor(displayProgress),
                      animation: `glow 2s ease-in-out infinite ${o.delay}s`,
                      boxShadow: `0 0 ${o.size * 2}px ${getStrokeColor(displayProgress)}60`,
                    }}
                  />
                );
              })}

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: getStrokeColor(displayProgress),
                    textShadow: displayProgress > 0 ? `0 0 20px ${getStrokeColor(displayProgress)}40` : "none",
                  }}
                >
                  {animatedNumber}%
                </div>
                <div className="text-[3vw] text-gray-500">
                  {Math.round(displayProgress) === 100 ? "Concluído!" : "Em progresso"}
                </div>
                {displayProgress > 0 && displayProgress < 100 && (
                  <div className="flex space-x-1 mt-2">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: getStrokeColor(displayProgress), animation: "bounce 1.4s ease-in-out infinite" }} />
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: getStrokeColor(displayProgress), animation: "bounce 1.4s ease-in-out infinite 0.2s" }} />
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: getStrokeColor(displayProgress), animation: "bounce 1.4s ease-in-out infinite 0.4s" }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* infos à direita */}
          <div className="flex-1">
            <div className="flex flex-col">
              <span
                className="font-hendrix-bold text-gray-700"
                style={{ fontSize: "11pt", lineHeight: "5vw", textAlign: "left" }}
              >
                Você está na fila
              </span>
              <span
                className="font-hendrix-regular text-gray-600"
                style={{ fontSize: "12pt", lineHeight: "5vw", textAlign: "left" }}
              >
                Tempo estimado {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

/* ----------------------------- default export opcional ----------------------------- */
// Se preferir, o default pode ser o LoadStagen:
export default LoadStagen;