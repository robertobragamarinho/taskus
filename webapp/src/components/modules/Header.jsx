/* eslint-disable react/prop-types */
import React from "react";
import LogoTaskUs from "../../assets/logo-min.webp"; // ajuste o caminho se necessário

const Header = ({ rightText = "Processo Seletivo" }) => {
  return (
  <div className="bg-[#00005f] flex-shrink-0">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo TaskUs */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <img src={LogoTaskUs} alt="TaskUs Logo" className="h-6" />
            </div>
          </div>

          {/* Texto à direita */}
          <div className="flex items-center space-x-2">
            <span className="font-hendrix-medium text-xs text-blue-200">
              {rightText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;