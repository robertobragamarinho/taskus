"use client";
import React from "react";

export default function CarreiraBrasilBox({
  carreirasImg,
  brasilImg,
  wrapperClass = "",
  containerClass = "",
  imgClass = "",
}) {
  return (
    <div
      className={`
        w-full flex mt-[5vw] justify-center
        ${wrapperClass}
      `}
    >
      <div
        className={`
          w-[85%] rounded-[4.5vw] bg-gray-300 flex justify-between items-center gap-2 p-4
          ${containerClass}
        `}
      >
        <div className="flex max-w-[30vw]">
          <img
            src={carreirasImg}
            alt="Mapa Carreiras"
            className={`w-full h-auto ${imgClass}`}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            width={100}
            height={100}
          />
        </div>

        <div className="flex max-w-[23vw]">
          <img
            src={brasilImg}
            alt="Mapa Brasil"
            className={`w-full h-auto mt-[0.8vw] ${imgClass}`}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}