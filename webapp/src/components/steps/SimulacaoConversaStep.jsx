// SimulacaoConversaStep.jsx
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import '../../styles/refino.css';
import LogoTaskUs from '../../assets/logo-min.webp';
import Continuity from "../modules/Continuity";

import Alternatives from "../modules/Alternatives"; // << usar o componente novo

const SimulacaoConversaStep = ({
  conversaData,
  onResposta,
  isLoading,
  fotoReferencia,
  total,
  currentIndex
}) => {
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  // 👉 Sempre que a "pergunta" mudar, sobe pro topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // limpa seleção ao trocar de conversa
    setRespostaSelecionada(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, conversaData?.numeroConversa]);

  const handleContinuar = (answerIdFromAlternatives) => {
    // sobe pro topo já no disparo, antes de trocar a próxima tela
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const id = answerIdFromAlternatives ?? respostaSelecionada;
    if (!id || !onResposta) return;

    const opcaoSelecionada = conversaData.opcoes.find(op => op.id === id);
    onResposta(id, opcaoSelecionada?.texto);
  };

  // mapeia as opções do seu payload para o formato do Alternatives
  const answers = (conversaData?.opcoes || []).map(op => ({
    id: op.id,
    text: op.texto,
  }));

  const atual = currentIndex ?? conversaData?.numeroConversa ?? 1;
  const totalConversas = total ?? 5;
  const progress = Math.min(100, Math.max(0, (atual / totalConversas) * 100));

  return (
    <div className="space-y-6">
      {/* Header com progresso */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-hendrix-bold text-gray-800" style={{ fontSize: '10pt' }}>
            Teste prático
          </span>
          <span
            className="font-hendrix-medium text-gray-400"
            style={{ fontSize: '10pt', letterSpacing: '0.02em' }}
          >
            {atual} de {totalConversas}
          </span>
        </div>
        <div
          className="w-full bg-gray-200 rounded-full h-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <motion.div
            className="h-2 rounded-full"
            style={{ background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Área da conversa */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4" style={{ minHeight: '220px' }}>
        <div className="flex items-start space-x-4">
          {/* Avatar do cliente */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <img className="h-12" src={fotoReferencia} alt="Foto do cliente" />
            </div>
          </div>

          {/* Informações do cliente e mensagem */}
          <div className="flex- space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-hendrix-semibold text-gray-900" style={{ fontSize: '12pt', letterSpacing: '0.01em' }}>
                  {conversaData?.cliente?.nome}
                </span>
                <span className="text-gray-500 font-hendrix-regular" style={{ fontSize: '9pt', letterSpacing: '0.01em' }}>
                  {conversaData?.cliente?.id}
                </span>
              </div>
            </div>

            {/* Mensagem do cliente */}
            <div className="bg-gray-50 rounded-xl rounded-tl-none p-4 shadow-sm border border-gray-100">
              <p
                className="font-hendrix-regular text-gray-900"
                style={{ fontSize: '11pt', lineHeight: '1.5', letterSpacing: '0.01em' }}
              >
                {conversaData?.mensagemCliente}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Continuity variant="black">
        Qual resposta você usaria?
      </Continuity>

      {/* Alternativas + Confirmar (controlado) */}
      <Alternatives
        answers={answers}
        selectedId={respostaSelecionada}
        onChange={setRespostaSelecionada}
        onConfirm={handleContinuar}
        isLoading={isLoading}
        icon={ChevronRight}
        confirmText="Continuar"
        autoConfirm={false}     // false para exibir botão "Continuar"
        size={20}
      />
    </div>
  );
};

export default SimulacaoConversaStep;