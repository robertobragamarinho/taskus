/* eslint-disable no-unused-vars */


import { useState, useEffect } from 'react';
import { ChevronRight, Pencil } from 'lucide-react';
import '../../styles/refino.css';
import { useProcess } from '@/hooks/useProcess.js';


const CurriculoCriacaoStep = ({ onContinue }) => {
  const { updateUserData, processData } = useProcess();
  const userData = processData?.userData || {};

  // Estado local para inputs editáveis
  const [nome, setNome] = useState(userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : userData.firstName || '');
  const [email, setEmail] = useState(userData.email || '');
  const [phone, setPhone] = useState(userData.phone || '');
  const [idade, setIdade] = useState(userData.age || userData.idade ||'');
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  // Formatar telefone para exibição
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  };

  // Validação de idade
  const idadeNum = parseInt(idade, 10);
  const idadeInvalida = isNaN(idadeNum) || idadeNum < 18 || idadeNum > 80;

  // Detecta se houve alteração em algum campo
  const dadosAlterados = () => {
    const nomeSplit = nome.trim().split(/\s+/);
    const firstName = nomeSplit[0] || '';
    const lastName = nomeSplit.slice(1).join(' ') || '';
    return (
      firstName !== (userData.firstName || '') ||
      lastName !== (userData.lastName || '') ||
      email !== (userData.email || '') ||
      phone !== (userData.phone || '') ||
      idade !== (userData.age || '')
    );
  };

  // Atualiza contexto/banco se alterou, depois chama onContinue
  
  
  const handleDadosCorretos = async () => {
    setIsLoading(true);
    setTipoAcao('confirmar');
    try {
      if (dadosAlterados()) {
        // Atualiza contexto e banco
        const nomeSplit = nome.trim().split(/\s+/);
        const firstName = nomeSplit[0] || '';
        const lastName = nomeSplit.slice(1).join(' ') || '';
        await updateUserData({
          firstName,
          lastName,
          email,
          phone,
          age: idade
        });
      }
      if (typeof onContinue === 'function') {
        onContinue();
      }
    } catch (error) {
      console.error('Erro ao confirmar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">


      {/* Título principal */}
      <div className="bg-gray-100 rounded-2xl mt-10 p-5">
        <h1 className="titulodaetapa font-hendrix-semibold text-gray-800 mb-10 mt-5" style={{ fontSize: '17pt', lineHeight: '0.9', textAlign: 'left' }}>
          Essas são as informações que já temos salvas
        </h1>

        {/* Dados do usuário */}
        <div className="space-y-4">
          <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
              Seu nome
            </span>
          {/* Nome */}
          <div className="bg-white rounded-xl p-2">
            
            <div className="flex items-center gap-2">
              <div className="areacucc">
                <input
                  className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-left resize-none"
                  style={{ fontSize: '12pt', minWidth: 80, paddingRight: '1rem', minHeight: '38px', maxHeight: '90px', overflowY: 'auto', lineHeight: '1.3' }}
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Digite seu nome"
                  rows={1}
                  spellCheck={false}
                />
              </div>
                <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1" />
                
            </div>
            
          </div>

          {/* E-mail */}
<span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
  E-mail
</span>
<div className="bg-white rounded-xl p-2">
  <div className="flex items-center gap-2">
    <div className="areacucc">
      <input
        type="email"
        className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-left resize-none"
        style={{ fontSize: '12pt', minWidth: 80, paddingRight: '1rem', minHeight: '38px', maxHeight: '90px', overflowY: 'auto', lineHeight: '1.3' }}
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email@email.com.br"
        spellCheck={false}
      />
    </div>
    <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1" />
  </div>
</div>

{/* Telefone */}
<span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
  Telefone
</span>
<div className="bg-white rounded-xl p-2">
  <div className="flex items-center gap-2">
    <div className="areacucc">
      <input
        type="text"
        className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-left resize-none"
        style={{ fontSize: '12pt', minWidth: 80, paddingRight: '1rem', minHeight: '38px', maxHeight: '90px', overflowY: 'auto', lineHeight: '1.3' }}
        value={formatPhone(phone)}
        onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
        placeholder="(00) 0000-0000"
        maxLength={16}
        spellCheck={false}
      />
    </div>
    <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1" />
  </div>
</div>

{/* Idade */}
<span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
  Idade
</span>
<div className="bg-white rounded-xl p-2">
  <div className="flex items-center gap-2">
    <div className="areacucc">
      <input
        type="text"
        className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-left resize-none"
        style={{ fontSize: '12pt', minWidth: 80, paddingRight: '1rem', minHeight: '38px', maxHeight: '90px', overflowY: 'auto', lineHeight: '1.3' }}
        value={idade}
        onChange={e => setIdade(e.target.value.replace(/\D/g, '').slice(0, 2))}
        placeholder="21 anos"
        maxLength={2}
        spellCheck={false}
      />
    </div>
    <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1" />
  </div>
</div>
          {/* Aviso de idade inválida */}
          {idadeInvalida && (
            <div className="text-red-600 font-hendrix-medium text-xs mt-1 ml-2">idade inválida</div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {/* Botão Os dados estão corretos */}
        <button
          onClick={handleDadosCorretos}
          disabled={(isLoading && tipoAcao === 'confirmar') || idadeInvalida}
          className={`
            w-full py-4 px-6 rounded-2xl font-hendrix-semibold text-white
            transition-all duration-300 ease-out
            ${(isLoading && tipoAcao === 'confirmar') || idadeInvalida
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'
            }
          `}
          style={{ fontSize: '11pt' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'confirmar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Confirmando...</span>
              </>
            ) : (
              <>
                <span>Os dados estão corretos</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoCriacaoStep;
