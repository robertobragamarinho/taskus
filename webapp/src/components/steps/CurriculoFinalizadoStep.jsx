  // Função para formatar data de AAAA-MM-DD para DD/MM/AAAA
  function formatarDataBR(data) {
    if (!data) return '';
    // Se já estiver no formato DD/MM/AAAA, retorna direto
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return data;
    // Se vier no formato AAAA-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    }
    return data;
  }
  // Função para formatar telefone no padrão (34) 99871-3749
  function formatTelefoneBR(telefone) {
    if (!telefone) return '';
    // Remove tudo que não for dígito
    const digits = telefone.toString().replace(/\D/g, '');
    if (digits.length === 11) {
      // Celular com DDD: (99) 99999-9999
      return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
    } else if (digits.length === 10) {
      // Fixo com DDD: (99) 9999-9999
      return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    }
    return telefone; // Retorna como está se não bater os padrões
  }

import { User, Mail, Phone, Calendar, MapPin, GraduationCap, Briefcase, Star } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProcess } from '@/hooks/useProcess.js';
import '../../styles/refino.css';

const CurriculoFinalizadoStep = ({ curriculoData, fotoUrl, onEnviarParaAvaliacao, dados }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { processData } = useProcess();

  const handleEnviar = async () => {
    setIsLoading(true);
    try {
      await onEnviarParaAvaliacao();
    } catch {
      // Silencioso
    } finally {
      setIsLoading(false);
    }
  };

  // Utilitário para fallback
  const getValue = (value) => {
    if (value === undefined || value === null || value === "") return null;
    return value;
  };

  // Dados do contexto
  const userData = processData?.userData || {};
  const nomeCompleto = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
  const emailContext = userData.email;
  const telefoneContext = userData.phone;
  const idadeContext = userData.age;

  // Estado e cidade: busca em múltiplos caminhos possíveis no contexto
  const estado =
    getValue(userData.Estado) ||
    getValue(userData.estado) ||
    getValue(userData?.endereco?.Estado) ||
    getValue(userData?.endereco?.estado) ||
    getValue(curriculoData?.localizacao?.estado) ||
    getValue(curriculoData?.estado) ||
    '';
  const cidade =
    getValue(userData.Cidade) ||
    getValue(userData.cidade) ||
    getValue(userData?.endereco?.Cidade) ||
    getValue(userData?.endereco?.cidade) ||
    getValue(curriculoData?.localizacao?.cidade) ||
    getValue(curriculoData?.cidade) ||
    '';
  const escolaridade = getValue(curriculoData?.escolaridade);
  // Prioridade: contexto > curriculoData > dados
  const nome = getValue(nomeCompleto) || getValue(curriculoData?.nome);
  const email = getValue(emailContext) || getValue(curriculoData?.email) || getValue(dados?.usuario?.email);
  const telefoneRaw = getValue(telefoneContext) || getValue(curriculoData?.telefone) || getValue(dados?.usuario?.phone);
  const telefone = formatTelefoneBR(telefoneRaw);
  const idade = getValue(idadeContext) || getValue(curriculoData?.idade) || getValue(dados?.usuario?.age);

  // Experiências pode vir como array ou não
  const experiencias = Array.isArray(curriculoData?.experiencias) ? curriculoData.experiencias : [];

  // Habilidades pode vir como array ou string
  const habilidades = Array.isArray(curriculoData?.habilidades) ? curriculoData.habilidades : (curriculoData?.habilidades ? [curriculoData.habilidades] : []);

  return (
    <div className="space-y-6">
      {/* Card do currículo */}
      <div className="bg-white border border-gray-400 rounded-2xl p-6 space-y-6 shadow-sm">

        {/* Foto + Nome alinhados lado a lado */}
        <div className="flex bg-gray-50 rounded-xl p-3 items-center gap-3 mb-10">
          {/* Foto de perfil */}
          <div className="w-15 h-15 bg-gray-800  rounded-full flex items-center justify-center overflow-hidden">
            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>

          {/* Nome */}
          <div>
            <h2
                className="font-hendrix-semibold text-gray-800 text-[12pt] leading-tight"
              >
                {nome}
              </h2>
          </div>
        </div>

        {/* Informações pessoais */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="font-hendrix-medium text-gray-600" style={{ fontSize: '9pt' }}>E-mail</span>
            </div>
            <span className="font-hendrix-regular text-gray-800" style={{ fontSize: '9pt' }}>{email}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="font-hendrix-medium text-gray-600" style={{ fontSize: '9pt' }}>Telefone</span>
            </div>
            <span className="font-hendrix-regular text-gray-800" style={{ fontSize: '9pt' }}>{telefone}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="font-hendrix-medium text-gray-600" style={{ fontSize: '9pt' }}>Idade</span>
            </div>
            <span className="font-hendrix-regular text-gray-800" style={{ fontSize: '9pt' }}>{idade}</span>
          </div>
          {/* Só mostra Estado e Cidade se NÃO houver nome do arquivo */}
          {!(dados && dados.arquivo && dados.arquivo.nome) && (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-hendrix-medium text-gray-600" style={{ fontSize: '9pt' }}>Estado</span>
                </div>
                <span className="font-hendrix-regular text-gray-800" style={{ fontSize: '9pt' }}>{estado}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-hendrix-medium text-gray-600" style={{ fontSize: '9pt' }}>Cidade</span>
                </div>
                <span className="font-hendrix-regular text-gray-800" style={{ fontSize: '9pt' }}>{cidade}</span>
              </div>
            </>
          )}
        </div>

        {dados && dados.arquivo && dados.arquivo.nome ? (
          <div className="space-y-4">
            <h3 className="font-hendrix-semibold text-gray-800" style={{ fontSize: '11pt' }}>Recebemos seu currículo!</h3>
            <div className="space-y-2">
              <span className="font-hendrix-regular text-gray-800">Arquivo: {dados.arquivo.nome}</span><br/>
            </div>
          </div>
        ) : (
          <>
            {/* Escolaridade */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gray-700" />
                <h3 className="font-hendrix-semibold text-gray-800" style={{ fontSize: '11pt' }}>Escolaridade</h3>
              </div>
              <p className="font-hendrix-regular text-gray-600 pl-7" style={{ fontSize: '9pt' }}>{escolaridade}</p>
            </div>

            {/* Experiência Profissional - só exibe se houver experiências válidas */}
            {experiencias.length > 0 && experiencias.some(exp => 
              (exp.nomeEmpresa || exp.nome) || 
              (exp.funcao || exp.cargo) || 
              (exp.dataInicio || exp.inicio) || 
              (exp.dataFim || exp.fim)
            ) && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-700" />
                  <h3 className="font-hendrix-semibold text-gray-800" style={{ fontSize: '11pt' }}>Experiência Profissional</h3>
                </div>
                {experiencias.map((exp, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-hendrix-semibold text-gray-800" style={{ fontSize: '9pt' }}>
                          {getValue(exp.nomeEmpresa || exp.nome)}
                        </p>
                        <p className="font-hendrix-regular text-gray-600" style={{ fontSize: '8pt' }}>
                          {getValue(exp.funcao || exp.cargo)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-gray-500" style={{ fontSize: '8pt' }}>
                      <span className="font-hendrix-regular">Início</span>
                      <span className="font-hendrix-regular">{formatarDataBR(getValue(exp.dataInicio || exp.inicio))}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-500" style={{ fontSize: '8pt' }}>
                      <span className="font-hendrix-regular">Fim</span>
                      <span className="font-hendrix-regular">{formatarDataBR(getValue(exp.dataFim || exp.fim))}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Habilidades em destaque */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gray-700" />
                <h3 className="font-hendrix-semibold text-gray-800" style={{ fontSize: '11pt' }}>Habilidades em destaque</h3>
              </div>
              <div className="space-y-2 pl-7">
                {habilidades.length > 0 ? (
                  habilidades.map((hab, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      <p className="font-hendrix-regular text-gray-600" style={{ fontSize: '9pt' }}>
                        {getValue(hab)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-hendrix-regular text-gray-400" style={{ fontSize: '9pt' }}>
                    Nenhuma habilidade cadastrada.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Botão de enviar para avaliação */}
      <div className="pt-4">
        <motion.button
          onClick={handleEnviar}
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
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '12pt' }}>Enviando...</span>
            </>
          ) : (
            <>
              <span className="font-hendrix-bold tracking-wide" style={{ fontSize: '12pt' }}>Enviar para análise</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default CurriculoFinalizadoStep;
