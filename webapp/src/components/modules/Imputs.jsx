/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";

/**
 * Imputs
 * - placeholder é definido no uso
 * - aceita label opcional
 * - aceita error (string) para exibir mensagem e estilizar
 * - repassa quaisquer outras props para o <input />
 */
const Imputs = forwardRef(
  (
    {
      id,
      type = "text",
      value,
      onChange,
      placeholder,
      label,
      error,                // string de erro opcional
      className = "",
      style,
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      "imputs font-hendrix-regular w-full px-4 py-4 border rounded-[2vw] bg-[#f9fcff] border-gray-200 " +
      "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:bg-white " +
      "text-gray-900 placeholder-gray-500 leading-[1.2] flex items-center";

    const errorClasses = error ? " border-red-300 bg-red-50" : "";

    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className="font-hendrix-medium text-gray-700"
            style={{ fontSize: "12pt" }}
          >
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses}${errorClasses} ${className}`}
          style={{ fontSize: "12pt", ...style }}
          {...rest}
        />

        {error && (
          <p
            className="font-hendrix-light text-red-500 mt-1"
            style={{ fontSize: "12pt" }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Imputs.displayName = "Imputs";
export default Imputs;