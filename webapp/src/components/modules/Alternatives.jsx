/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";

/**
 * Props suportadas (retrocompatível):
 * - answers: [{ id, text }]
 * - onConfirm: (selectedId | selectedIds[]) => void
 * - isLoading: boolean
 *
 * Seleção única (modo antigo):
 * - selectedId, onChange(id)
 *
 * Seleção múltipla (novo):
 * - multiple: boolean
 * - selectedIds: number[]
 * - onChange: (ids: number[]) => void
 * - maxSelected: number (default: Infinity)
 *
 * Visuais:
 * - icon, confirmText, autoConfirm, size, className
 */
const Alternatives = ({
  answers = [],
  onConfirm,
  isLoading = false,

  // Seleção única (legacy)
  selectedId,
  // Seleção múltipla (novo)
  selectedIds,

  onChange, // funciona para único ou múltiplo

  // Config
  multiple = false,
  maxSelected = Infinity,

  // UI
  icon: Icon = ChevronRight,
  confirmText = "Confirmar",
  autoConfirm = false,
  size = 25,
  className = "",
}) => {
  // Estados internos (caso não seja controlado por props)
  const [internalSelectedId, setInternalSelectedId] = useState(null);
  const [internalSelectedIds, setInternalSelectedIds] = useState([]);

  // Normaliza seleção atual conforme o modo
  const currentSelectedId = useMemo(
    () => (selectedId !== undefined ? selectedId : internalSelectedId),
    [selectedId, internalSelectedId]
  );

  const currentSelectedIds = useMemo(
    () => (selectedIds !== undefined ? selectedIds : internalSelectedIds),
    [selectedIds, internalSelectedIds]
  );

  const isAtMax =
    multiple && Number.isFinite(maxSelected)
      ? currentSelectedIds.length >= maxSelected
      : false;

  const toggleMulti = (id) => {
    let next = [];
    if (currentSelectedIds.includes(id)) {
      next = currentSelectedIds.filter((x) => x !== id);
    } else {
      if (isAtMax) return; // ignora quando atingiu o máximo
      next = [...currentSelectedIds, id];
    }

    if (Array.isArray(selectedIds) && typeof onChange === "function") {
      onChange(next);
    } else {
      setInternalSelectedIds(next);
    }

    if (autoConfirm && typeof onConfirm === "function" && !isLoading) {
      onConfirm(next);
    }
  };

  const handleSelectSingle = (id) => {
    if (selectedId !== undefined && typeof onChange === "function") {
      onChange(id);
    } else {
      setInternalSelectedId(id);
    }

    if (autoConfirm && typeof onConfirm === "function" && !isLoading) {
      onConfirm(id);
    }
  };

  const handleConfirm = () => {
    if (typeof onConfirm !== "function" || isLoading) return;

    if (multiple) {
      if (!currentSelectedIds.length) return;
      onConfirm(currentSelectedIds);
    } else {
      if (!currentSelectedId) return;
      onConfirm(currentSelectedId);
    }
  };

  const isActive = (id) =>
    multiple ? currentSelectedIds.includes(id) : currentSelectedId === id;

  const isBlocked = (id) =>
    multiple ? !isActive(id) && isAtMax : false; // em múltipla seleção, bloqueia novas quando chegou no máximo

  return (
    <div className={`space-y-2 mt-5 pt-2 ${className}`}>
      {answers.map((answer) => {
        const active = isActive(answer.id);
        const blocked = isBlocked(answer.id);

        return (
          <button
            key={answer.id}
            type="button"
            onClick={() =>
              multiple ? toggleMulti(answer.id) : handleSelectSingle(answer.id)
            }
            disabled={isLoading || blocked}
            className={
              "w-full p-4 rounded-2xl transition-all duration-300 text-left flex items-start gap-3 " +
              (active
                ? "border-transparent"
                : "border-[0.5px] border-[#1655ff] hover:border-blue-300 bg-white")
            }
            style={
              active
                ? {
                    background:
                      "linear-gradient(90deg, #1655ff 0%, #60a5fa 100%)",
                    color: "#fff",
                    boxShadow: "0 2px 8px 0 rgba(22,85,255,0.08)",
                  }
                : {
                    borderWidth: "0.5px",
                    borderColor: "#1655ff",
                    opacity: blocked ? 0.6 : 1,
                  }
            }
          >
            {/* Ícone */}
            <div className="flex-shrink-0 flex items-start">
              <Icon
                style={{
                  color: active ? "#fff" : "#1655ff",
                  fontSize: "11pt",
                }}
                size={size}
              />
            </div>

            {/* Texto */}
            <span
              className="font-hendrix-medium"
              style={{
                fontSize: "11pt",
                color: active ? "#fff" : "#4d4d4d",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {answer.text}
            </span>
          </button>
        );
      })}

      {!autoConfirm && (
        <div className="pt-4">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={
              isLoading ||
              (multiple ? currentSelectedIds.length === 0 : !currentSelectedId)
            }
            className={
              "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-200 " +
              (isLoading ||
              (multiple
                ? currentSelectedIds.length === 0
                : !currentSelectedId)
                ? "opacity-60 cursor-not-allowed"
                : "hover:opacity-90")
            }
            style={{
              background: isLoading
                ? "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)"
                : "linear-gradient(135deg, #1655ff 0%, #4285f4 100%)",
              fontSize: "10pt",
              lineHeight: 2,
            }}
          >
            {isLoading ? (
              <>
                Confirmando...
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Alternatives;