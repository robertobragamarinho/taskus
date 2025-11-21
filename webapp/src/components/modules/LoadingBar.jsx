/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { GlobalTimerCtx } from "../modules/GlobalTimerProvider"; // << path corrigido

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

const LoadingBar = ({
  totalDurationMs,
  onComplete,
  size = 100,
  strokeWidth = 5,

  // ---- Controles da "aleatoriedade" visual ----
  randomize = true,               // desative se quiser um render linear suave
  speedMin = 0.65,                // multiplicador de velocidade mínimo
  speedMax = 1.75,                // multiplicador de velocidade máximo
  jitterEveryMinMs = 900,         // intervalo mínimo para trocar velocidade
  jitterEveryMaxMs = 2200,        // intervalo máximo para trocar velocidade
  holdChance = 0.02,              // chance a cada frame de "segurar" progresso por ~250–800ms
  catchupStart = 0.80,            // quando aplicar boost de “catch-up” (progresso linear >= 80%)
  catchupMaxBoost = 4.0,          // boost máximo aplicado ao se aproximar do fim

  // NOVO: tempo fake vindo de fora (em segundos já no formato que deve ser exibido)
  fakeRemainingSeconds,
}) => {
  // ===== Tempo global (ou relógio local) =====
  const globalCtx = useContext(GlobalTimerCtx);

  // Relógio local (fallback) – só será usado se não houver provider
  const localPerfStartRef = useRef(performance.now());
  const [localElapsedMs, setLocalElapsedMs] = useState(0);
  const localRafRef = useRef(null);

  useEffect(() => {
    if (globalCtx) return; // há provider, não precisa do relógio local
    const loop = () => {
      const now = performance.now();
      setLocalElapsedMs(now - localPerfStartRef.current);
      localRafRef.current = requestAnimationFrame(loop);
    };
    localRafRef.current = requestAnimationFrame(loop);
    return () => {
      if (localRafRef.current) cancelAnimationFrame(localRafRef.current);
    };
  }, [globalCtx]);

  const elapsedMs = globalCtx?.elapsedMs ?? localElapsedMs;
  const linearProgress = clamp((elapsedMs / totalDurationMs) * 100, 0, 100); // 0..100

  // ===== Estados visuais =====
  const [displayProgress, _setDisplayProgress] = useState(0);
  const displayProgressRef = useRef(0);
  const setDisplayProgress = (v) => {
    displayProgressRef.current = typeof v === 'function' ? v(displayProgressRef.current) : v;
    _setDisplayProgress(displayProgressRef.current);
  };

  const [animatedNumber, setAnimatedNumber] = useState(0);

  // Agora o timeRemaining pode vir de fora (fake) ou cair para o cálculo interno
  const [timeRemaining, setTimeRemaining] = useState(
    Math.ceil(totalDurationMs / 1000)
  );

  // Se recebermos tempo fake por prop, sempre priorizamos ele
  useEffect(() => {
    if (typeof fakeRemainingSeconds === "number") {
      setTimeRemaining(Math.max(0, Math.ceil(fakeRemainingSeconds)));
    }
  }, [fakeRemainingSeconds]);

  // Dispara onComplete uma única vez (quando visual e linear estiverem completos)
  const completedRef = useRef(false);
  useEffect(() => {
    if (!completedRef.current && linearProgress >= 100 && displayProgress >= 100) {
      completedRef.current = true;
      const t = setTimeout(() => onComplete?.(), 30);
      return () => clearTimeout(t);
    }
  }, [linearProgress, displayProgress, onComplete]);

  // ===== Geometria do círculo =====
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference.toFixed(3);
  const strokeDashoffset = (circumference * (1 - displayProgress / 100)).toFixed(3);

  const getStrokeColor = (p) => {
    if (p < 33) return "#1655ff";
    if (p < 66) return "#7c3aed";
    return "#22c55e";
  };

  // ===== Orbitais decorativos =====
  const orbitals = useMemo(() => {
    const baseR = radius + 5;
    return [
      { id: 1, angle: 0,   radius: baseR,     size: 6, delay: 0,   speed: 50 },
      { id: 2, angle: 120, radius: baseR - 8, size: 5, delay: 0.2, speed: 40 },
      { id: 3, angle: 240, radius: baseR + 10,size: 7, delay: 0.4, speed: 60 },
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

  // ===== Aleatoriedade controlada: jitter + holds + catch-up =====
  const pauseUntilPerfRef = useRef(0);
  const speedFactorRef = useRef(1);
  const nextJitterAtRef = useRef(performance.now());
  const rafRef = useRef(null);

  useEffect(() => {
    let last = performance.now();

    const loop = () => {
      const now = performance.now();
      const dtMs = now - last;             // delta em ms
      const dt = dtMs / 1000;              // delta em segundos
      last = now;

      // Atualiza tempo restante apenas se NÃO estivermos usando tempo fake
      if (typeof fakeRemainingSeconds !== "number") {
        const remainingMs = Math.max(0, totalDurationMs - Math.min(elapsedMs, totalDurationMs));
        setTimeRemaining(Math.max(0, Math.ceil(remainingMs / 1000)));
      }

      // ---- Gerenciamento de "hold" (pausa curta) ----
      const isPaused = now < pauseUntilPerfRef.current;

      // ---- Troca de velocidade (jitter) de tempos em tempos ----
      if (randomize && !isPaused && now >= nextJitterAtRef.current && linearProgress < 100) {
        const next = (Math.random() * (speedMax - speedMin)) + speedMin;
        speedFactorRef.current = next;

        const jitterInterval = (Math.random() * (jitterEveryMaxMs - jitterEveryMinMs)) + jitterEveryMinMs;
        nextJitterAtRef.current = now + jitterInterval;
      }

      // ---- Chance de iniciar um hold aleatório (só se não estiver quase no fim) ----
      if (
        randomize &&
        !isPaused &&
        displayProgressRef.current < 99.5 &&
        linearProgress < 98 &&
        Math.random() < holdChance
      ) {
        const hold = 250 + Math.random() * 550; // 250–800ms
        pauseUntilPerfRef.current = now + hold;
      }

      // ---- Avanço visual respeitando o “deadline” ----
      const curr = displayProgressRef.current;
      const target = linearProgress; // nunca passamos do progresso base
      const diff = target - curr;

      let nextDisplay = curr;

      if (!isPaused && diff > 0) {
        // Base de amortecimento
        const kBase = diff > 5 ? 0.28 : 0.18;

        // Catch-up progressivo quando o linear passa de catchupStart (ex.: 80%)
        let catchUp = 1;
        if (target >= catchupStart * 100) {
          const t = clamp((target / 100 - catchupStart) / (1 - catchupStart), 0, 1); // 0..1
          catchUp = 1 + catchupMaxBoost * easeOutCubic(t); // 1..(1+catchupMaxBoost)
        }

        const jitter = randomize ? speedFactorRef.current : 1;

        // Passo proporcional ao diff, tempo de frame e fatores
        const base = diff * kBase * jitter * catchUp;

        // Proteção para frames longos: normaliza pelo dtMs (~16ms ideal)
        const step = base * (dtMs / 100);

        // Nunca ultrapassa o target
        nextDisplay = clamp(curr + Math.min(diff, Math.max(step, 0.15)), 0, 100);
      }

      // ---- Quando o tempo base chegar ao fim, garantimos o 100% visual de forma suave ----
      if (target >= 100 && nextDisplay < 100) {
        const finishStep = Math.max(0.4, (100 - nextDisplay) * 0.12) * (dtMs / 16);
        nextDisplay = Math.min(100, nextDisplay + finishStep);
      }

      setDisplayProgress(nextDisplay);
      setAnimatedNumber(Math.round(nextDisplay));

      if (linearProgress < 100 || nextDisplay < 100) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    linearProgress,
    totalDurationMs,
    randomize,
    speedMin,
    speedMax,
    jitterEveryMinMs,
    jitterEveryMaxMs,
    holdChance,
    catchupStart,
    catchupMaxBoost,
    fakeRemainingSeconds
  ]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full mb-3 mt-3 bg-[#f3f6f9] rounded-2xl p-4">
      <div className="bg-white/0">
        <div className="flex items-center space-x-6">
          {/* CÍRCULO */}
          <div className="flex-shrink-0">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} className="block">
                <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
                <circle
                  cx={size/2} cy={size/2} r={radius}
                  stroke={getStrokeColor(displayProgress)}
                  strokeWidth={strokeWidth}
                  fill="none" strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-150"
                  style={{
                    transitionTimingFunction: "linear",
                    filter: displayProgress > 0 ? `drop-shadow(0 0 8px ${getStrokeColor(displayProgress)}40)` : "none",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>

              {/* Orbitais */}
              {orbitals.map((o, i) => {
                const angle = (orbitalAngles[i] * Math.PI) / 180;
                const x = size / 2 + Math.cos(angle) * o.radius;
                const y = size / 2 + Math.sin(angle) * o.radius;
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
                  {Math.round(displayProgress) === 100 ? "Concluído!" : ""}
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

          {/* INFORMAÇÕES */}
          <div className="flex-1">
            <div className="flex flex-col">
              <span className="font-hendrix-bold text-gray-700" style={{ fontSize: "11pt", lineHeight: "5vw", textAlign: "left" }}>
                Em análise
              </span>
              <span className="font-hendrix-regular text-gray-600" style={{ fontSize: "12pt", lineHeight: "5vw", textAlign: "left" }}>
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

export default LoadingBar;