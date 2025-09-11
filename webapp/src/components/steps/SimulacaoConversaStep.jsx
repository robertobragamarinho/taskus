import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import '../../styles/refino.css';
import LogoTaskUs from '../../assets/logo-min.webp';


const SimulacaoConversaStep = ({ conversaData, onResposta, isLoading, fotoReferencia, total, currentIndex }) => {
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  const handleSelecionarResposta = (opcaoId) => {
    setRespostaSelecionada(opcaoId);
  };

  const handleContinuar = () => {
    if (respostaSelecionada && onResposta) {
      const opcaoSelecionada = conversaData.opcoes.find(opcao => opcao.id === respostaSelecionada);
      
      onResposta(respostaSelecionada, opcaoSelecionada?.texto);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com progresso */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-hendrix-semibold text-blue-600" style={{ fontSize: '10pt', letterSpacing: '0.02em' }}>
            Teste de atendimento
          </span>
          <span className="font-hendrix-medium text-gray-400" style={{ fontSize: '10pt', letterSpacing: '0.02em' }}>
            {currentIndex ?? conversaData.numeroConversa} de {total ?? 5}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full"
            style={{ background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)' }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex ?? conversaData.numeroConversa) / (total ?? 5)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Área da conversa */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4" style={{ minHeight: '220px' }}>
        <div className="flex items-start space-x-4">
          {/* Avatar do cliente */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <img
                className='h-12'
                src={fotoReferencia}
                alt="Foto do cliente"
              />
            </div>
          </div>
          {/* Informações do cliente e mensagem */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-hendrix-semibold text-gray-900" style={{ fontSize: '12pt', letterSpacing: '0.01em' }}>
                  {conversaData.cliente.nome}
                </span>
                <span className="text-gray-500 font-hendrix-regular" style={{ fontSize: '9pt', letterSpacing: '0.01em' }}>
                  {conversaData.cliente.id}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                < img
                  className='h-3'
                  src={LogoTaskUs}
                  alt="Logo taskUs"

                />
              </div>
            </div>
            {/* Mensagem do cliente */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="font-hendrix-regular text-gray-900" style={{ fontSize: '11pt', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                {conversaData.mensagemCliente}
                {conversaData.urgente && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-hendrix-bold ml-2">
                    URGENTE!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pergunta de resposta */}
      <div className="pt-2">
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-hendrix-semibold text-gray-900" style={{ fontSize: '12pt', letterSpacing: '0.01em' }}>
            Qual resposta você usaria?
          </span>
        </div>
        {/* Opções de resposta */}
        <div className="space-y-3">
          {conversaData.opcoes.map((opcao) => (
            <motion.button
              key={opcao.id}
              onClick={() => handleSelecionarResposta(opcao.id)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: respostaSelecionada === opcao.id ? 1.03 : 1.01 }}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 font-hendrix-regular ${respostaSelecionada === opcao.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
              style={{ fontSize: '11pt', letterSpacing: '0.01em' }}
            >
              <div className="flex items-start space-x-3">
                <ChevronRight
                  className={`w-4 h-4 mt-1 flex-shrink-0 ${respostaSelecionada === opcao.id ? 'text-blue-500' : 'text-gray-400'}`}
                />
                <p className="font-hendrix-regular text-gray-900" style={{ fontSize: '11pt', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                  {opcao.texto}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Botão Continuar */}
      {respostaSelecionada && (
        <div className="pt-4">
          <motion.button
            onClick={handleContinuar}
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
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>Salvando...</span>
              </>
            ) : (
              <>
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '10pt' }}>Continuar</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default SimulacaoConversaStep;
