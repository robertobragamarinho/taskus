// components/FinalModal.jsx
import React from 'react';
import { useProcess } from '@/hooks/useProcess.js';
import Headlines from '../modules/Headlines';
import Paragraphs from '../modules/Paragraphs';
import Maintexts from '../modules/Main-texts';

const FinalModal = ({ open, onContinue, loading }) => {
  const { processData } = useProcess();

  // Buscar nome do usuário do contexto
  const firstName = processData?.userData?.firstName || '';
  const lastName = processData?.userData?.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Candidato(a)';

  if (!open) return null;
  return (
    <div className="fixed px-5 inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900" style={{ opacity: 0.75 }} />
      <div className="relative bg-white rounded-2xl shadow-lg p-10 max-w-sm w-full">
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
        
        <Maintexts>
          <Headlines variant="black">
            Análise concluída!
          </Headlines>
          <Paragraphs variant="black">
            Nossa equipe analisou seu perfil e <span className="font-hendrix-bold text-gray-900">você foi selecionado(a)</span>  para a vaga de atendente de suporte ao cliente. <br/>
          </Paragraphs>
        </Maintexts>

        <div className=''>
          <div className="">
            <div className="space-y-2 mb-6">
            <div className="p-5 space-y-2 bg-[#f0f4f8] rounded-2xl">

                <div>
                  <label
                    htmlFor="det-nome"
                    className="font-hendrix-medium text-gray-700"
                    style={{ fontSize: "12pt" }}
                  ></label>
                  <div
                    id="det-nome"
                    className="font-hendrix-regular w-full flex items-center gap-1 "
                    style={{ fontSize: "8pt", color: "black" }}
                  >
                    {/* SVG preto */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <g color="currentColor">
                        <path d="M18.99 19H19m-.01 0c-.622.617-1.75.464-2.542.464c-.972 0-1.44.19-2.133.883C13.725 20.937 12.934 22 12 22s-1.725-1.063-2.315-1.653c-.694-.693-1.162-.883-2.133-.883c-.791 0-1.92.154-2.543-.464c-.627-.622-.473-1.756-.473-2.552c0-1.007-.22-1.47-.937-2.186C2.533 13.196 2 12.662 2 12s.533-1.196 1.6-2.262c.64-.64.936-1.274.936-2.186c0-.791-.154-1.92.464-2.543c.622-.627 1.756-.473 2.552-.473c.912 0 1.546-.297 2.186-.937C10.804 2.533 11.338 2 12 2s1.196.533 2.262 1.6c.64.64 1.274.936 2.186.936c.791 0 1.92-.154 2.543.464c.627.622.473 1.756.473 2.552c0 1.007.22 1.47.937 2.186C21.467 10.804 22 11.338 22 12s-.533 1.196-1.6 2.262c-.716.717-.936 1.18-.936 2.186c0 .796.154 1.93-.473 2.552" />
                        <path d="M9 12.893s1.2.652 1.8 1.607c0 0 1.8-3.75 4.2-5" />
                      </g>
                    </svg>

                    Candidato(a) aprovado
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="det-nome"
                    className="font-hendrix-medium text-gray-700"
                    style={{ fontSize: "5pt" }}
                  ></label>
                  <div
                    id="det-nome"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                    style={{ fontSize: "10pt" }}
                  >
                    {fullName}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-hendrix-semibold py-3 px-4 rounded-xl transition-colors duration-200"
        >
          {loading ? 'Carregando...' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};

export default FinalModal;