// Teste.jsx
import React from "react";
import Headline from "./Headline";
import GlassCard from "../modules/GlassCard";

export default function Teste() {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* HEADER */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-2 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm/6 font-semibold text-white">Product</a>
            <a href="#" className="text-sm/6 font-semibold text-white">Features</a>
            <a href="#" className="text-sm/6 font-semibold text-white">Marketplace</a>
            <a href="#" className="text-sm/6 font-semibold text-white">Company</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          {/* mobile menu button (opcional) */}
          <div className="flex lg:hidden">
            <button
              type="button"
              command="show-modal"
              commandfor="mobile-menu"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <div className="relative isolate px-6 pt-24 lg:pt-32 lg:px-8">
        {/* --- BACKGROUND “SMOKE/LUZ” --- */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-1/2 aspect-[1155/678] w-[46rem] -translate-x-1/2 rotate-[30deg] opacity-30 sm:w-[72rem]"
            style={{
              background:
                "linear-gradient(to top right, #ff80b5, #9089fc)",
              clipPath:
                "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
            }}
          />
        </div>

        

        {/* CARD DE VIDRO */}
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl">
            {/* brilho roxo no rodapé do card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 rounded-b-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 100%, rgba(147,51,234,0.35) 0%, rgba(0,0,0,0) 60%)",
              }}
            />

            {/* Neblinas internas (blobs) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full blur-3xl mix-blend-screen opacity-40"
              style={{
                background: "radial-gradient(50% 50% at 50% 50%, rgba(56,189,248,0.5), rgba(0,0,0,0) 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full blur-3xl mix-blend-screen opacity-40"
              style={{
                background: "radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.5), rgba(0,0,0,0) 70%)",
              }}
            />

            {/* conteúdo do card */}
            <div className="relative grid gap-10  lg:grid-cols-2 lg:p-14">
              {/* texto */}
              <div className="text-white ">
                <h1 className="text-[7vw] text-center font-semibold tracking-tight sm:text-6xl">
            
                    <span className="font-light">Trabalhe do conforto da sua casa e  </span><br/> ganhe R$2.450,00/Mês + benefícios

                </h1>
                <p className="leading-2">
                    Participe do nosso processo seletivo e descubra ainda hoje se você pode começar a trabalhar como atendente de suporte ao cliente home office.
                </p>
               
                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Come~ça
                  </a>

                </div>
              </div>

           
              
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}