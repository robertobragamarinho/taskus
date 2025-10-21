import React from 'react';
import { CheckCircle, XCircle, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ConfirmacaoSelecaoV1_Black = () => {
  // Dados do gráfico - posição entre candidatos
  const dadosGrafico = [
    { etapa: 'Triagem', posicao: 15 },
    { etapa: 'Análise', posicao: 8 },
    { etapa: 'Avaliação', posicao: 5 },
    { etapa: 'Final', posicao: 3 }
  ];

  const requisitos = [
    { id: 1, texto: 'Formação superior completa', cumprido: true },
    { id: 2, texto: 'Experiência mínima de 3 anos', cumprido: true },
    { id: 3, texto: 'Conhecimento em ferramentas digitais', cumprido: true },
    { id: 4, texto: 'Disponibilidade para viagens', cumprido: true },
    { id: 5, texto: 'Inglês avançado', cumprido: false }
  ];

  const pontosPositivos = [
    'Excelente comunicação e clareza nas respostas',
    'Demonstrou proatividade e iniciativa',
    'Forte alinhamento com valores da empresa',
    'Ótimas referências profissionais'
  ];

  const pontosNegativos = [
    'Necessita desenvolver habilidades técnicas específicas',
    'Pouca experiência em liderança de equipes',
    'Conhecimento limitado em idiomas estrangeiros'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-t-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Parabéns!</h1>
          <p className="text-center text-purple-200">Você foi selecionada para a próxima etapa</p>
        </div>

        {/* Card Principal */}
        <div className="bg-gray-800 rounded-b-3xl shadow-xl p-6 -mt-2">
          
          {/* Gráfico de Posição */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-100">Sua Evolução no Processo</h2>
            </div>
            <div className="bg-gray-700 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                  <XAxis 
                    dataKey="etapa" 
                    tick={{ fontSize: 12, fill: '#e0e0e0' }}
                    stroke="#e0e0e0"
                  />
                  <YAxis 
                    reversed 
                    tick={{ fontSize: 12, fill: '#e0e0e0' }}
                    label={{ value: 'Posição', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#e0e0e0' } }}
                    stroke="#e0e0e0"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 30, 30, 0.95)', 
                      border: '1px solid #555',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#e0e0e0'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="posicao" 
                    stroke="#a78bfa" 
                    strokeWidth={3}
                    dot={{ fill: '#a78bfa', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-gray-300 mt-2">
                Posição final: <span className="font-bold text-purple-400">3º lugar</span> entre os candidatos
              </p>
            </div>
          </div>

          {/* Requisitos Cumpridos */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Requisitos Atendidos</h2>
            <div className="space-y-3">
              {requisitos.map((req) => (
                <div 
                  key={req.id} 
                  className={`flex items-start p-3 rounded-xl transition-all ${
                    req.cumprido 
                      ? 'bg-green-900 border border-green-700' 
                      : 'bg-gray-700 border border-gray-600'
                  }`}
                >
                  {req.cumprido ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm ${req.cumprido ? 'text-gray-100' : 'text-gray-300'}`}>
                    {req.texto}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pontos Positivos */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              Pontos Positivos
            </h2>
            <div className="space-y-2">
              {pontosPositivos.map((ponto, index) => (
                <div key={index} className="flex items-start bg-green-900 p-3 rounded-xl border border-green-700">
                  <span className="text-green-400 font-bold mr-3 text-sm">+</span>
                  <p className="text-sm text-gray-100">{ponto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pontos de Melhoria */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
              Pontos de Melhoria
            </h2>
            <div className="space-y-2">
              {pontosNegativos.map((ponto, index) => (
                <div key={index} className="flex items-start bg-orange-900 p-3 rounded-xl border border-orange-700">
                  <AlertCircle className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-100">{ponto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Ação */}
          <button className="w-full bg-gradient-to-r from-purple-800 to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
            Continuar para Próxima Etapa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoSelecaoV1_Black;

