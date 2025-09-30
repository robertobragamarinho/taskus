import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import InfoIconMin from '../../assets/info_icon-min.webp';
import '../../styles/refino.css';

const TesteRapidoAtendimentoStep = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleIniciar = async () => {
    setIsLoading(true);
    try {
      await onStart();
    } catch (error) {
      console.error('Erro ao iniciar teste:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {/* Título principal */}
      <div className="pt-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="none" stroke="#1655ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4.5A1.5 1.5 0 0 1 4.5 3h2A1.5 1.5 0 0 1 8 4.5v2A1.5 1.5 0 0 1 6.5 8h-2A1.5 1.5 0 0 1 3 6.5zm0 13A1.5 1.5 0 0 1 4.5 16h2A1.5 1.5 0 0 1 8 17.5v2A1.5 1.5 0 0 1 6.5 21h-2A1.5 1.5 0 0 1 3 19.5zm5 1h13m-5-13H8m8.323 2.176l-8.675 8.675M16 4.5A1.5 1.5 0 0 1 17.5 3h2A1.5 1.5 0 0 1 21 4.5v2A1.5 1.5 0 0 1 19.5 8h-2A1.5 1.5 0 0 1 16 6.5zM18 21l1.388-.946C20.463 19.32 21 18.955 21 18.5s-.537-.821-1.612-1.554L18 16" color="currentColor"/></svg>
        <h1 className="tituloquest font-hendrix-semibold text-gray-800" style={{ fontSize: '16pt'}}>
          Agora precisamos <br/>que você faça um<br/> teste prático
        </h1>
      </div>

      {/* Descrição */}
      <div className="space-y-4">
        <p className="subtituloquest font-hendrix-regular text-gray-600" style={{ fontSize: '10pt'}}>
          Neste teste você vai ver  situações reais de suporte ao cliente.
          
          Seu desafio é escolher a resposta mais adequada em cada caso e assim demonstrar suas habilidades.

        </p>
      </div>

       {/* Aviso de tempo */}
           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
             <div className="flex items-center space-x-3">
               <div className="flex-shrink-0">
                 <img 
                   className='h-6'
                   src={InfoIconMin}
                 />
               </div>
               <div className="flex-1">
                 <p className="font-hendrix-medium text-yellow-800" style={{ fontSize: '9pt' }}>
                   Leva menos de 5 minutos.
                 </p>
               </div>
             </div>
           </div>

      {/* Botão Iniciar */}
      <div className="pt-4">
        <motion.button
          onClick={handleIniciar}
          disabled={isLoading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: isLoading ? 1 : 1.03 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${isLoading ? 'cursor-not-allowed' : ''}`}
          style={{
            background: isLoading ? 'linear-gradient(135deg, #bdbdbd 0%, #e0e0e0 100%)' : 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
            fontSize: '11pt',
            boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)',
            border: 'none',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                style={{ borderTopColor: 'transparent', borderRightColor: 'white', borderBottomColor: 'white', borderLeftColor: 'white' }}
              />
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>Iniciando...</span>
            </>
          ) : (
            <>
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>Iniciar</span>
              
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default TesteRapidoAtendimentoStep;
