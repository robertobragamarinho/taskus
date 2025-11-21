/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from "react";

const DefaultRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ListTopics = ({
  topics = [],
  withDescription = false,
  enableDrawer = true,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTopic, setDrawerTopic] = useState(null);

  const openDrawer = (topic) => {
    if (!withDescription || !enableDrawer) return;
    setDrawerTopic(topic);
    setDrawerOpen(true);
  };

  const closeDrawer = useCallback(() => {
    // fecha a animação
    setDrawerOpen(false);
    // desmonta o conteúdo depois da transição (300ms)
    const timeout = setTimeout(() => setDrawerTopic(null), 300);
    return () => clearTimeout(timeout);
  }, []);

  // Fechar com ESC
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  // Bloquear scroll do body apenas quando a gaveta estiver aberta
  useEffect(() => {
    if (!withDescription || !enableDrawer) return;
    const original = document.body.style.overflow;
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [drawerOpen, withDescription, enableDrawer]);

  return (
    <>
      {/* Lista */}
      <div className="space-y-3 mb-6 w-full">
        {topics.map((topic, index) => {
          const RightIcon = topic.rightIcon || DefaultRightIcon;
          const LeftIcon = topic.icon;
          const clickable = withDescription && enableDrawer;

          return (
            <button
              key={index}
              type="button"
              onClick={() => openDrawer(topic)}
              className={`w-full text-left rounded-lg p-4 flex ${
                withDescription ? "items-start space-x-3" : "items-center gap-2"
              } transition-shadow hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
              style={{
                backgroundColor: "#f3f6f9",
                cursor: clickable ? "pointer" : "default",
                width: "100%",
              }}
              aria-haspopup={clickable ? "dialog" : undefined}
              aria-expanded={clickable ? (drawerOpen ? "true" : "false") : undefined}
            >
              {/* Ícone à esquerda */}
              <div className={withDescription ? "flex-shrink-0 text-blue-600" : ""}>
                {LeftIcon ? (
                  <LeftIcon
                    className={withDescription ? "w-7 h-7" : "w-5 h-5 flex-shrink-0"}
                    style={!withDescription ? { color: "#1655ff" } : {}}
                    aria-hidden="true"
                  />
                ) : null}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 w-full">
                {withDescription ? (
                  <>
                    <p
                      className="font-hendrix-bold"
                      style={{ fontSize: "12pt", color: "#424242", marginTop: "-0.5vw" }}
                    >
                      {topic.name}
                    </p>
                    <p
                      className="font-hendrix-regular"
                      style={{ fontSize: "10pt", color: "#1a1a1a", marginTop: "-1vw" }}
                    >
                      {topic.value}
                    </p>
                  </>
                ) : (
                  <p
                    className="font-hendrix-light"
                    style={{ fontSize: "12pt", color: "#000" }}
                  >
                    {topic.label || topic.name}
                  </p>
                )}
              </div>

              {/* Ícone à direita */}
              {withDescription && enableDrawer && (
                <div className="flex-shrink-0 self-center text-[#1655ff]">
                  <RightIcon aria-hidden="true" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Gaveta e overlay: renderiza somente quando houver tópico selecionado */}
      {withDescription && enableDrawer && drawerTopic && (
        <>
          {/* Overlay */}
          <div
            onClick={closeDrawer}
            className={`fixed inset-0 z-40 transition-opacity duration-300 ${
              drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            } bg-black/60 backdrop-blur-sm`}
            aria-hidden="true"
          />

          {/* Container do drawer (sem eventos quando fechado) */}
          <div
            className={`fixed left-0 right-0 bottom-0 z-50 w-full ${
              drawerOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div
              className={`rounded-t-2xl px-5 pt-4 pb-6 bg-white shadow-xl w-full max-w-full transform transition-transform duration-300 ${
                drawerOpen ? "translate-y-0" : "translate-y-full"
              }`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
            >
              <div className="relative mb-4 mt-7 w-full">
                {/* Botão fechar */}
                <button
                  onClick={closeDrawer}
                  type="button"
                  className="absolute top-0 right-0 px-8 py-2 rounded-lg font-hendrix-medium 
                             bg-[#1655ff] text-white shadow-md active:bg-red-600"
                >
                  Fechar
                </button>

                <div className="flex items-start space-x-3 pr-20 w-full">
                  <div className="flex-shrink-0 text-blue-600">
                    {drawerTopic?.icon ? (
                      (() => {
                        const DrawerIcon = drawerTopic.icon;
                        return <DrawerIcon className="w-8 h-8" aria-hidden="true" />;
                      })()
                    ) : null}
                  </div>

                  <div className="w-full">
                    <h3
                      id="drawer-title"
                      className="font-hendrix-bold"
                      style={{ fontSize: "14pt", marginTop: "-0.5vw", color: "#111827" }}
                    >
                      {drawerTopic.name}
                    </h3>
                    <p
                      className="font-hendrix-regular"
                      style={{ fontSize: "11pt", color: "#4B5563", marginTop: "-1vw" }}
                    >
                      {drawerTopic.value}
                    </p>
                  </div>
                </div>
              </div>

              <p
                className="font-hendrix-regular mt-7 mb-5 w-full"
                style={{ fontSize: "11pt", color: "#374151", lineHeight: "1.3" }}
              >
                {drawerTopic.hint || "Erro ao carregar texto"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListTopics;