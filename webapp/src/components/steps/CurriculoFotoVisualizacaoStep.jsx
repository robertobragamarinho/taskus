import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import "../../styles/refino.css";

const CurriculoFotoVisualizacaoStep = ({
  fotoUrl,
  onConfirmar,
  onPular,
  onTrocarFoto,
  setFotoUrl, // NOVO: permite atualizar o estado global
}) => {
  const [isLoading, setIsLoading] = useState({
    confirmar: false,
    pular: false,
    trocar: false,
  });
  const [previewFoto, setPreviewFoto] = useState(fotoUrl);

  // Atualiza preview se fotoUrl mudar externamente
  useEffect(() => {
    setPreviewFoto(fotoUrl);
  }, [fotoUrl]);

  // Ao confirmar, garantir que a foto global seja a última preview
  const handleConfirmar = async () => {
    setIsLoading({ confirmar: true, pular: false, trocar: false });
    try {
      if (setFotoUrl) setFotoUrl(previewFoto); // Atualiza global antes de confirmar
      if (onConfirmar) {
        await onConfirmar();
      }
    } catch (error) {
      console.error("Erro ao confirmar foto:", error);
    } finally {
      setIsLoading({
        confirmar: false,
        pular: false,
        trocar: false,
      });
    }
  };

  // Handler para trocar foto
  const handleTrocarFoto = () => {
    setIsLoading((prev) => ({ ...prev, trocar: true }));
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewFoto(url);
        if (setFotoUrl) setFotoUrl(url); // Atualiza global imediatamente
        if (onTrocarFoto) onTrocarFoto(file, url);
      }
      setIsLoading((prev) => ({ ...prev, trocar: false }));
    };
    input.click();
  };

  return (
    <div className="space-y-8">
      {/* Conteúdo principal */}
      <section id='ETP4T10'/>
      <div className="bg-gray-100 rounded-2xl p-6">
        <h1
          className="font-hendrix-semibold text-gray-800 mb-6"
          style={{ fontSize: "15pt", lineHeight: "1.3" }}
        >
          Veja como a sua foto ficou, se necessario envie outra foto.
        </h1>

        {/* Área de visualização da foto */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-sm">
            {/* Container da foto com aspecto 4:3 aproximadamente */}
            <div className="w-full h-80 bg-black rounded-2xl overflow-hidden shadow-lg">
              {previewFoto ? (
                <img
                  src={previewFoto}
                  alt="Foto do currículo"
                  className="w-full h-full object-cover"
                />
              ) : (
                // Placeholder quando não há foto
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="text-gray-600 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-hendrix-regular text-gray-400">
                      Foto será exibida aqui
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Botões de ação */}
      <div className="space-y-4">
        {/* Botão Confirmar */}
        <button
          onClick={handleConfirmar}
          disabled={isLoading.confirmar}
          className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium text-white
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${isLoading.confirmar
              ? 'bg-gradient-to-r from-gray-300 to-gray-400 opacity-70 cursor-not-allowed'
              : 'hover:scale-105 active:scale-95'}
          `}
          style={{
            fontSize: '11pt',
            background: isLoading.confirmar
              ? undefined
              : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
            boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading.confirmar ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">Enviando...</span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">Usar essa foto</span>
            )}
          </div>
        </button>
        {/* Botão para trocar foto */}
        <button
          onClick={handleTrocarFoto}
          disabled={isLoading.trocar}
          className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all duration-300
            ${isLoading.trocar
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-blue-50 hover:scale-[1.02] active:scale-95'}
          `}
          style={{
            fontSize: '11pt',
            background: '#ffffff',
            color: '#000000',
            border: '1px solid #1655ff',
            boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading.trocar ? (
              <>
                <div className="w-4 h-4 border-2 border-[#1655ff] border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">Alterando...</span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">Alterar foto</span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoFotoVisualizacaoStep;
