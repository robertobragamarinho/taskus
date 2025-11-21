import React from "react";
import WorldMap from "react-svg-worldmap";

/* =========================
   TOKENS VISUAIS / AJUSTES
========================= */
const ACCENT = "#ff3d8b";          // borda dos pontinhos
const MAP_FILL = "#0a4aec";        // cor padrão do mapa (mude aqui)
const MARKER_FILL = "#fff";        // cor dos pontinhos
const MAP_SIZE = 350;              // tamanho do mapa (px)

const MARKER_SIZE = 4.3;
const MARKER_OUTLINE = 2.6;

/* =========================
   CONFIG BRASIL
========================= */
const BR_STROKE = 10;
const BR_COLOR = "#0a81ff";
const BR_FILL = BR_COLOR;
const BR_BORDER = BR_COLOR;

/* =========================
   DINÂMICA / ANIMAÇÕES
========================= */
const PULSE_ENABLED = true;
const PULSE_DURATION = 2400;

const BR_BREATH_DURATION = 3600;

/* pulso de luz */
const BR_LIGHT_WAVE_ENABLED = true;
const BR_LIGHT_COLOR = BR_COLOR;
const BR_LIGHT_BASE = 18;
const BR_LIGHT_DURATION = 2600;
const BR_LIGHT_SPREAD = 3.2;

/* Países marcados */
const MARKED_CODES = [
  "BR",
  "US",
  "AR", "CL", "CO", "MX", "CA",
  "FR", "DE", "IT", "ES", "PT",
  "ZA", "AU", "JP", "IN", "GB",
];

/* Coordenadas (ajustadas) */
const COUNTRY_CENTERS = {
  US: { lat: 3.0, lon: -100.0 },
  BR: { lat: -41.0, lon: -50.0 },

  // Américas
  CO: { lat: -26.5, lon: -69.0 },
  MX: { lat: -15.0, lon: -97.0 },

  // Europa
  FR: { lat: -0.2, lon: 10.0 },
  DE: { lat: -0.8, lon: 20.0 },
  IT: { lat: -1.1, lon: 3.0 },
  ES: { lat: -15.0, lon: 30.0 },
  PT: { lat: -20.0, lon: 85.0 },
  GB: { lat: 0.6, lon: 0.0 },

  // Ásia / Oceania
  AU: { lat: -56.0, lon: 138.0 },
  JP: { lat: 5.2, lon: 143.3 },
  IN: { lat: -10.0, lon: 83.0 },
};

/* Converte p/ % do SVG */
function projectToPercent({ lat, lon }) {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

const countryNames = {
  BR: "Brasil", US: "Estados Unidos", AR: "Argentina", CL: "Chile",
  CO: "Colômbia", MX: "México", CA: "Canadá", FR: "França", DE: "Alemanha",
  IT: "Itália", ES: "Espanha", PT: "Portugal", ZA: "África do Sul",
  AU: "Austrália", JP: "Japão", IN: "Índia", GB: "Reino Unido",
};

const World = () => {
  const data = [{ country: "AF", value: 0 }];

  const markers = ["BR", ...MARKED_CODES]
    .filter((code, idx, arr) => arr.indexOf(code) === idx)
    .map((code) => ({
      code,
      pos: COUNTRY_CENTERS[code] ? projectToPercent(COUNTRY_CENTERS[code]) : null,
    }))
    .filter((m) => m.pos);

  const brPos = markers.find((m) => m.code === "BR")?.pos;

  return (
    <div className="w-full h-[57vw]">
      <div
        className="mx-auto inline-block relative worldmap-scope"
        style={{
          width: MAP_SIZE,
          height: "auto",
          "--br-light-duration": `${BR_LIGHT_DURATION}ms`,
          "--br-light-spread": BR_LIGHT_SPREAD,
        }}
      >
        <style>{`
          /* Importante: NÃO colorimos mais todos os paths aqui
             para não bloquear as cores do styleFunction */

          .worldmap-scope svg {
            background: transparent !important;
          }

          /* Só ajustes visuais neutros */
          .worldmap-scope svg path {
            cursor: default;
            transition: 0.2s ease;
            shape-rendering: geometricPrecision;
          }

          /* Respiração Brasil: só anima traço (não mexe cor) */
          @keyframes brBreath {
            0%   { stroke-dasharray: 8 6; stroke-dashoffset: 0; }
            50%  { stroke-dasharray: 12 6; stroke-dashoffset: 6; }
            100% { stroke-dasharray: 8 6; stroke-dashoffset: 0; }
          }
          .worldmap-scope svg path#BR {
            animation: brBreath ${BR_BREATH_DURATION}ms ease-in-out infinite;
          }

          /* Pontinhos */
          .worldmap-scope .country-marker {
            position: absolute;
            width: ${MARKER_SIZE}px;
            height: ${MARKER_SIZE}px;
            border-radius: 50%;
            background: ${MARKER_FILL};
            outline: ${MARKER_OUTLINE}px solid ${ACCENT};
            transform: translate(-50%, -50%) scale(1);
            transform-origin: center;
            pointer-events: auto;
          }
          @keyframes markerPulse {
            0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            50%  { transform: translate(-50%, -50%) scale(1.35); opacity: .85; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          }
          .worldmap-scope .country-marker.live {
            animation: markerPulse ${PULSE_DURATION}ms ease-in-out infinite;
          }

          /* Tooltip */
          .worldmap-scope .country-marker .tip {
            position: absolute;
            left: 50%;
            top: -12px;
            transform: translate(-50%, -100%);
            background: rgba(0,0,0,0.75);
            color: #fff;
            font-size: 10px;
            padding: 4px 6px;
            border-radius: 6px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity .15s ease, transform .15s ease;
          }
          .worldmap-scope .country-marker:hover .tip {
            opacity: 1;
            transform: translate(-50%, -110%);
          }

          /* ondas do BR */
          .worldmap-scope .br-light {
            position: absolute;
            width: ${BR_LIGHT_BASE}px;
            height: ${BR_LIGHT_BASE}px;
            left: 0; top: 0;
            border-radius: 9999px;
            border: 2px solid ${BR_LIGHT_COLOR};
            background: radial-gradient(
              circle,
              ${BR_LIGHT_COLOR}26 0%,
              ${BR_LIGHT_COLOR}1A 45%,
              transparent 70%
            );
            transform: translate(-50%, -50%) scale(0.4);
            transform-origin: center;
            opacity: 0;
            pointer-events: none;
          }
          @keyframes brLightWave {
            0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0.35; }
            70%  { opacity: 0.12; }
            100% { transform: translate(-50%, -50%) scale(${BR_LIGHT_SPREAD}); opacity: 0; }
          }
          .worldmap-scope .br-light.wave1 {
            animation: brLightWave ${BR_LIGHT_DURATION}ms ease-out infinite;
          }
          .worldmap-scope .br-light.wave2 {
            animation: brLightWave ${BR_LIGHT_DURATION}ms ease-out infinite;
            animation-delay: ${Math.round(BR_LIGHT_DURATION / 3)}ms;
          }
        `}</style>

        {/* MAPA */}
        <WorldMap
          size={MAP_SIZE}
          data={data}
          backgroundColor="transparent"
          borderColor="black"
          /* 🔥 TODA a cor agora vem daqui (inline) */
          styleFunction={({ countryCode }) => {
            const base = {
              fill: MAP_FILL,
              stroke: MAP_FILL,
              strokeWidth: 1,
            };
            if (countryCode === "BR") {
              return {
                ...base,
                stroke: BR_BORDER,
                strokeWidth: BR_STROKE,
                paintOrder: "stroke",
                fill: BR_FILL,
              };
            }
            return base;
          }}
        />

        {/* ondas BR */}
        {BR_LIGHT_WAVE_ENABLED && brPos && (
          <>
            <div
              className="br-light wave1"
              style={{ left: `${brPos.x}%`, top: `${brPos.y}%` }}
            />
            <div
              className="br-light wave2"
              style={{ left: `${brPos.x}%`, top: `${brPos.y}%` }}
            />
          </>
        )}

        {/* Marcadores */}
        {markers.map(({ code, pos }, i) => (
          <div
            key={code}
            className={`country-marker ${PULSE_ENABLED ? "live" : ""}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${(i * 90) % PULSE_DURATION}ms`,
            }}
            title={countryNames[code] || code}
          >
            <div className="tip">{countryNames[code] || code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default World;