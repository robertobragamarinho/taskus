import { useState, useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import "../../styles/refino.css";

import Imputs from "../modules/Imputs";
import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";

const CurriculoExperienciaStep = ({ onVoltar, onContinuar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  const [experiencias, setExperiencias] = useState([
    { nomeEmpresa: "", funcao: "", inicio: "", fim: "" },
  ]);

  const textareasRef = useRef([]);

  // ... (funções de data e DateField não foram alteradas)
  const isoToBr = (iso) => {
    if (!iso) return "";
    const [yyyy, mm, dd] = iso.split("-");
    if (!yyyy || !mm || !dd) return "";
    const aa = String(yyyy).slice(-2);
    return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${aa}`;
  };

  const brToIso = (br) => {
    const digits = (br || "").replace(/\D/g, "");
    if (digits.length !== 6) return "";
    const d = digits.slice(0, 2);
    const m = digits.slice(2, 4);
    const y = digits.slice(4, 6);
    const day = Number(d);
    const month = Number(m);
    const year2 = Number(y);
    if (month < 1 || month > 12 || day < 1 || day > 31) return "";
    const fullYear = 2000 + year2;
    const test = new Date(fullYear, month - 1, day);
    const ok =
      test.getFullYear() === fullYear &&
      test.getMonth() === month - 1 &&
      test.getDate() === day;
    if (!ok) return "";
    const tY = String(fullYear).padStart(4, "0");
    const tM = String(month).padStart(2, "0");
    const tD = String(day).padStart(2, "0");
    return `${tY}-${tM}-${tD}`;
  };

  const maskBrDate = (val) => {
    const v = (val || "").replace(/\D/g, "").slice(0, 6);
    const p1 = v.slice(0, 2);
    const p2 = v.slice(2, 4);
    const p3 = v.slice(4, 6);
    if (v.length <= 2) return p1;
    if (v.length <= 4) return `${p1}/${p2}`;
    return `${p1}/${p2}/${p3}`;
  };

  const DateField = ({ label, isoValue, onIsoChange, id, name }) => {
    const [uiValue, setUiValue] = useState(isoToBr(isoValue));
    const [touched, setTouched] = useState(false);
    const [fieldError, setFieldError] = useState("");

    useEffect(() => {
      setUiValue(isoToBr(isoValue));
    }, [isoValue]);

    const validate = (masked) => {
      const digits = (masked || "").replace(/\D/g, "");
      if (digits.length < 6) {
        setFieldError("");
        return;
      }
      const iso = brToIso(masked);
      setFieldError(iso ? "" : "Data inválida (use o formato DD/MM/AA).");
    };

    const handleChange = (e) => {
      const masked = maskBrDate(e.target.value);
      setUiValue(masked);

      if (masked.replace(/\D/g, "").length === 6) {
        const iso = brToIso(masked);
        if (iso) onIsoChange(iso);
      }
      if (masked.length === 0) onIsoChange("");

      if (touched) validate(masked);
    };

    const handleBlur = () => {
      setTouched(true);
      validate(uiValue);
    };

    return (
      <div className="space-y-2">
        <Imputs
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          placeholder="DD/MM/AA"
          value={uiValue}
          onChange={handleChange}
          onBlur={handleBlur}
          label={label}
          maxLength={8}
          className={
            fieldError ? "border-red-300 bg-red-50" : "bg-white border-gray-200"
          }
          style={{
            minHeight: "52px",
            fontSize: "12pt",
            letterSpacing: "0.02em",
          }}
          error={fieldError}
          aria-label={label}
          autoComplete="off"
        />
      </div>
    );
  };

  const addExperiencia = () => {
    setExperiencias((prev) => [
      ...prev,
      { nomeEmpresa: "", funcao: "", inicio: "", fim: "" },
    ]);
    setTimeout(() => {
      textareasRef.current = textareasRef.current.slice(
        0,
        experiencias.length + 1
      );
    }, 0);
  };

  const removerExperiencia = (indexToRemove) => {
    if (experiencias.length <= 1) return;
    setExperiencias((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const updateExperiencia = (index, field, value) => {
    setExperiencias((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
    );
  };

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    textareasRef.current.forEach((ta) => autoResize(ta));
  }, [experiencias]);

  const parseISOToLocalDate = (iso) => {
    if (!iso) return null;
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  };

  const rangesInvalidos = experiencias.some(({ inicio, fim }) => {
    if (!inicio || !fim) return false;
    const di = parseISOToLocalDate(inicio);
    const df = parseISOToLocalDate(fim);
    if (!di || !df) return false;
    return df < di;
  });

  const handleContinuar = async () => {
    setIsLoading(true);
    setTipoAcao("continuar");
    try {
      if (onContinuar) await onContinuar(experiencias);
    } catch (e) {
      console.error("Erro ao continuar:", e);
    } finally {
      setIsLoading(false);
      setTipoAcao(null);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">Experiências profissionais</Headlines>
        <Paragraphs variant="black">
          Preencha abaixo as experiências que você já teve (se houver).
          <br />
          <br />
          <span className="text-blue-700 font-hendrix-medium">
            Caso não tenha trabalhado em nenhuma empresa, você pode pular esta
            etapa.
          </span>
        </Paragraphs>
      </Maintexts>

      <button
        onClick={handleContinuar}
        disabled={(isLoading && tipoAcao === "continuar") || rangesInvalidos}
        className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium text-white
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${
              (isLoading && tipoAcao === "continuar") || rangesInvalidos
                ? "bg-gradient-to-r from-gray-300 to-gray-400 opacity-70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1655ff] to-[#4285f4] hover:scale-105 active:scale-95"
            }
          `}
        style={{
          fontSize: "11pt",
          boxShadow: "0 2px 8px 0 rgba(22,85,255,0.10)",
        }}
      >
        <div className="flex items-center justify-center space-x-2">
          {isLoading && tipoAcao === "continuar" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="font-hendrix-medium tracking-wide text-[10pt]">
                Pulando etapa...
              </span>
            </>
          ) : (
            <span className="font-hendrix-medium tracking-wide text-[12pt]">
              Pular etapa
            </span>
          )}
        </div>
      </button>

      <div className="mt-6 space-y-5">
        {experiencias.map((experiencia, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-[3vw] p-4 border border-gray-200"
          >
            <div className="space-y-4">
              <Imputs
                id={`exp-empresa-${index}`}
                type="text"
                value={experiencia.nomeEmpresa}
                onChange={(e) =>
                  updateExperiencia(index, "nomeEmpresa", e.target.value)
                }
                placeholder="Digite o nome da empresa"
                label="Empresa"
                className="bg-white border-gray-200"
                style={{ minHeight: "52px", fontSize: "12pt" }}
              />

              <div className="space-y-2">
                <label
                  htmlFor={`exp-funcao-${index}`}
                  className="font-hendrix-medium text-gray-700"
                  style={{ fontSize: "12pt" }}
                >
                  O que você fazia?
                </label>
                <textarea
                  id={`exp-funcao-${index}`}
                  ref={(el) => (textareasRef.current[index] = el)}
                  value={experiencia.funcao}
                  onChange={(e) => {
                    updateExperiencia(index, "funcao", e.target.value);
                    autoResize(e.target);
                  }}
                  placeholder="Descreva suas atividades/responsabilidades"
                  rows={1}
                  className="
                    w-full bg-white rounded-xl p-4 min-h-[77px] border border-gray-200
                    font-hendrix-regular text-gray-700 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-300
                  "
                  style={{
                    fontSize: "12pt",
                    lineHeight: "1.4",
                    resize: "none",
                    overflow: "hidden",
                  }}
                />
              </div>

              <DateField
                id={`exp-inicio-${index}`}
                name={`exp-inicio-${index}`}
                label="Início"
                isoValue={experiencia.inicio}
                onIsoChange={(newIso) =>
                  updateExperiencia(index, "inicio", newIso)
                }
              />
              <DateField
                id={`exp-fim-${index}`}
                name={`exp-fim-${index}`}
                label="Fim"
                isoValue={experiencia.fim}
                onIsoChange={(newIso) =>
                  updateExperiencia(index, "fim", newIso)
                }
              />

              {experiencia.inicio &&
                experiencia.fim &&
                parseISOToLocalDate(experiencia.fim) <
                  parseISOToLocalDate(experiencia.inicio) && (
                  <p className="text-red-600 font-hendrix-medium text-xs">
                    A data de fim não pode ser anterior ao início.
                  </p>
                )}

              {/* BOTÃO "REMOVER" COM ESTILO MINIMALISTA */}
              {experiencias.length > 1 && (
                <div className="pt-2">
                  <button
                    onClick={() => removerExperiencia(index)}
                    className="
                      w-full px-6 py-3 rounded-full font-hendrix-medium
                      text-red-500 bg-white border border-red-500
                      shadow-md focus:outline-none focus:ring-2 focus:ring-red-300
                      transition-all duration-300 hover:bg-red-50 hover:scale-[1.02] active:scale-95
                    "
                    style={{
                      fontSize: "11pt",
                      boxShadow: "0 2px 8px 0 rgba(239,68,68,0.10)",
                    }}
                    aria-label={`Remover experiência ${index + 1}`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span className="font-hendrix-medium tracking-wide text-[12pt]">
                        Remover
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={addExperiencia}
          className="
            w-full px-6 py-4 rounded-full font-hendrix-medium
            text-black bg-white border border-[#1655ff]
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] active:scale-95
          "
          style={{
            fontSize: "11pt",
            boxShadow: "0 2px 8px 0 rgba(22,85,255,0.10)",
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="font-hendrix-medium tracking-wide text-[12pt]">
              Adicionar outra
            </span>
            <Plus className="w-4 h-4" />
          </div>
        </button>
      </div>

      <div className="space-y-4 mt-6">
        <button
          onClick={handleContinuar}
          disabled={(isLoading && tipoAcao === "continuar") || rangesInvalidos}
          className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium text-white
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${
              (isLoading && tipoAcao === "continuar") || rangesInvalidos
                ? "bg-gradient-to-r from-gray-300 to-gray-400 opacity-70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1655ff] to-[#4285f4] hover:scale-105 active:scale-95"
            }
          `}
          style={{
            fontSize: "11pt",
            boxShadow: "0 2px 8px 0 rgba(22,85,255,0.10)",
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === "continuar" ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">
                  Continuando...
                </span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">
                Continuar
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoExperienciaStep;
