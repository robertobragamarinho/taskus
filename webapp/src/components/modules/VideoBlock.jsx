/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";

const isYouTube = (url) =>
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url || "");
const isVimeo = (url) =>
  /^(https?:\/\/)?(www\.)?vimeo\.com\//i.test(url || "");

const VideoBlock = ({
  provider = "auto",
  src,
  sources = [],
  poster,
  captions,
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  playsInline = true,
  preload = "metadata",
  rounded = "rounded-2xl",
  className = "",
  w = "w-full",     // 👈 controle de largura
  h = "h-auto",     // 👈 controle de altura
  allowFullScreen = true,
  iframeTitle = "Vídeo",
  onPlay,
  onEnded,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  // Lazy-load
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setInView(true)),
      { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Eventos HTML5
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const handleCanPlay = () => setReady(true);
    const handlePlaying = () => onPlay?.();
    const handleEnded = () => onEnded?.();
    const handleError = () => setError("Falha ao carregar o vídeo.");

    vid.addEventListener("canplay", handleCanPlay);
    vid.addEventListener("playing", handlePlaying);
    vid.addEventListener("ended", handleEnded);
    vid.addEventListener("error", handleError);

    return () => {
      vid.removeEventListener("canplay", handleCanPlay);
      vid.removeEventListener("playing", handlePlaying);
      vid.removeEventListener("ended", handleEnded);
      vid.removeEventListener("error", handleError);
    };
  }, [onPlay, onEnded]);

  // Detecta provider
  const resolvedProvider =
    provider !== "auto"
      ? provider
      : isYouTube(src)
      ? "youtube"
      : isVimeo(src)
      ? "vimeo"
      : "html5";

  return (
    <div ref={containerRef} className={`w-full max-w-full ${className}`}>
      {/* agora você controla w e h via props */}
      <div className={`relative ${w} ${h} overflow-hidden ${rounded}`}>
        {/* Skeleton */}
        {!ready && !error && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* HTML5 */}
        {inView && resolvedProvider === "html5" && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover ${
              ready ? "" : "opacity-0"
            }`}
            poster={poster}
            autoPlay={autoplay}
            muted={muted}
            loop={loop}
            controls={controls}
            playsInline={playsInline}
            preload={preload}
            onLoadedData={() => setReady(true)}
          >
            {Array.isArray(sources) && sources.length > 0
              ? sources.map((s, i) => (
                  <source key={i} src={s.src} type={s.type || undefined} />
                ))
              : src && <source src={src} />}
            {captions?.src && (
              <track
                kind="subtitles"
                src={captions.src}
                srcLang={captions.srclang || "pt-BR"}
                label={captions.label || "Português (BR)"}
                default={Boolean(captions.default)}
              />
            )}
            Seu navegador não suporta vídeo HTML5.
          </video>
        )}

        {/* YouTube */}
        {inView && resolvedProvider === "youtube" && (
          <iframe
            className={`absolute inset-0 w-full h-full ${ready ? "" : "opacity-0"}`}
            src={toYouTubeEmbed(src, { autoplay, muted, loop })}
            title={iframeTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={allowFullScreen}
            onLoad={() => setReady(true)}
          />
        )}

        {/* Vimeo */}
        {inView && resolvedProvider === "vimeo" && (
          <iframe
            className={`absolute inset-0 w-full h-full ${ready ? "" : "opacity-0"}`}
            src={toVimeoEmbed(src, { autoplay, muted, loop })}
            title={iframeTitle}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen={allowFullScreen}
            onLoad={() => setReady(true)}
          />
        )}

        {/* Fallback de erro */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-600 text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoBlock;

/* ========= Helpers ========= */
function toYouTubeEmbed(url, { autoplay, muted, loop }) {
  let id = null;
  try {
    const u = new URL(url);
    id = u.hostname.includes("youtu.be")
      ? u.pathname.replace("/", "")
      : u.searchParams.get("v");
  } catch {
    id = url;
  }
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
    loop: loop ? "1" : "0",
    ...(loop ? { playlist: id } : {}),
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function toVimeoEmbed(url, { autoplay, muted, loop }) {
  let id = null;
  try {
    const u = new URL(url);
    id = u.pathname.replace("/", "");
  } catch {
    id = url;
  }
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    muted: muted ? "1" : "0",
    loop: loop ? "1" : "0",
    transparent: "0",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}