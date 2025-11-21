import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

/**
 * Componente de Gráfico de Evolução no Processo Seletivo
 * Mostra a posição do candidato ao longo das etapas
 */
const GraficoEvolucaoProcesso = () => {
  // Dados do gráfico - evolução da posição ao longo das etapas
  const dadosGrafico = [
    { etapa: 'Inscrição', posicao: 1500, totalCandidatos: 2219 },
    { etapa: 'Entrevista', posicao: 800, totalCandidatos: 2219 },
    { etapa: 'Teste Prático', posicao: 250, totalCandidatos: 1200 },
    { etapa: 'Avaliação RH', posicao: 85, totalCandidatos: 500 },
    { etapa: 'Selecionado', posicao: 29, totalCandidatos: 150, destaque: true },
  ];

  const suaPosicaoAtual = 29;
  const totalCandidatosAtual = 2219;

  // Tooltip customizado para mostrar informações detalhadas
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold mb-1">{data.etapa}</p>
          <p className="text-[#3455ff] font-bold text-lg">
            Posição: {data.posicao}º
          </p>
          <p className="text-gray-300 text-sm">
            Total de candidatos: {data.totalCandidatos}
          </p>
          {data.destaque && (
            <p className="text-yellow-400 text-xs mt-1 font-semibold">
              ⭐ Você está aqui!
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Label customizado para o ponto destacado
  const renderCustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    // Usa index como key única para cada dot
    if (payload.destaque) {
      return (
        <g key={index}>
          {/* Círculo externo pulsante */}
          <circle 
            cx={cx} 
            cy={cy} 
            r={12} 
            fill="#3455ff" 
            opacity={0.3}
          />
          {/* Círculo principal */}
          <circle 
            cx={cx} 
            cy={cy} 
            r={7} 
            fill="#3455ff" 
            stroke="#fff" 
            strokeWidth={2}
          />
          {/* Label "Você" */}
          <text
            x={cx}
            y={cy - 20}
            textAnchor="middle"
            fill="#3455ff"
            fontSize="14"
            fontWeight="bold"
          >
            Você
          </text>
        </g>
      );
    }
    return (
      <circle 
        key={index}
        cx={cx} 
        cy={cy} 
        r={5} 
        fill="#3455ff" 
        stroke="#fff" 
        strokeWidth={1}
      />
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-[#3455ff] mr-2" />
        <h2 className="text-lg font-semibold text-gray-100">Você foi um(a) dos melhores</h2>
      </div>
      
      <div className="bg-gray-800 rounded-2xl p-6">
        {/* Informação de destaque */}
        <div className="bg-gradient-to-r from-[#3455ff]/20 to-transparent border-l-4 border-[#3455ff] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1">Sua posição</p>
              <p className="text-3xl font-bold text-[#3455ff]">
                {suaPosicaoAtual}º lugar
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-300 text-sm mb-1">Total de candidatos</p>
              <p className="text-2xl font-semibold text-gray-100">
                {totalCandidatosAtual.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Você está entre os <span className="text-[#3455ff] font-semibold">
                {((suaPosicaoAtual / totalCandidatosAtual) * 100).toFixed(2)}% melhores
              </span> candidatos! 🎉
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dadosGrafico} margin={{ top: 30, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
            <XAxis 
              dataKey="etapa" 
              tick={{ fontSize: 8, fill: '#e0e0e0' }}
              stroke="#e0e0e0"
            />
            <YAxis 
              reversed 
              tick={{ fontSize: 9, fill: '#e0e0e0' }}
              label={{ 
                value: 'Posição (quanto menor, melhor)', 
                angle: -90, 
                position: 'insideLeft', 
                style: { fontSize: 7, fill: '#e0e0e0' } 
              }}
              stroke="#e0e0e0"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Linha de referência para a posição atual */}
            <ReferenceLine 
              y={suaPosicaoAtual} 
              stroke="#3455ff" 
              strokeDasharray="5 5" 
              strokeWidth={1}
              opacity={0.5}
            >
              <Label 
                value={`Posição ${suaPosicaoAtual}`} 
                position="right" 
                fill="#3455ff" 
                fontSize={11}
              />
            </ReferenceLine>
            
            <Line 
              type="monotone" 
              dataKey="posicao" 
              stroke="#3455ff" 
              strokeWidth={3}
              dot={renderCustomDot}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>



      </div>
    </div>
  );
};

export default GraficoEvolucaoProcesso;
