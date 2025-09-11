import { useState, useEffect } from 'react';
import { ChevronRight, Pencil } from 'lucide-react';
import '../../styles/refino.css';
import { useProcess } from '@/hooks/useProcess.js';

const CurriculoCriacaoStep = ({ dadosUsuario, onPrecisoEditar, onDadosCorretos, onChange }) => {

  const { updateUserData } = useProcess();

  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  const [ phoneUser , setPhoneUser ] = useState('');

  // Carregar dados do usuário da sessionStorage e API ao montar
  useEffect(() => {
    const loadUserData = async () => {
      const userId = sessionStorage.getItem('userId');
      if (userId && typeof onChange === 'function') {
        try {
          const { default: backendAPI } = await import('../../services/backendAPIService.js');
          const result = await backendAPI.getUser(userId);
          setPhoneUser(result?.data?.phone);
          if (result.success && result.data) {
            const user = result.data;
            onChange({
              nome: user.nome || '',
              email: user.email || '',
              telefone: user.phone,
              idade: user.idade ? String(user.idade) : ''
            });
            // Atualiza o contexto global com os dados do usuário, incluindo phone
            
              updateUserData({
                nome: user.nome,
                email: user.email,
                phone: user.phone,
                idade: user.idade ? String(user.idade) : ''
              });
          }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          // Silencioso
        }
      }
    };
    loadUserData();


    console.log("DADOS DO USUARIO: ", dadosUsuario);
    // eslint-disable-next-line
  }, []);

  // Função para formatar telefone para visualização
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  };

  // Função para atualizar os dados do usuário de forma controlada
  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      // Remove tudo que não for dígito
      const onlyDigits = value.replace(/\D/g, '').slice(0, 11);
      if (typeof onChange === 'function') {
        onChange({ ...dadosUsuario, phone: onlyDigits });
      }
      setPhoneUser(onlyDigits);
    } else if (field === 'idade') {
      // Permite apenas números
      const onlyDigits = value.replace(/\D/g, '').slice(0, 2);
      if (typeof onChange === 'function') {
        onChange({ ...dadosUsuario, idade: onlyDigits });
      }
    } else {
      if (typeof onChange === 'function') {
        onChange({ ...dadosUsuario, [field]: value });
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handlePrecisoEditar = async () => {
    setIsLoading(true);
    setTipoAcao('editar');
    try {
      if (onPrecisoEditar) {
        await onPrecisoEditar();
      }
    } catch (error) {
      console.error('Erro ao editar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDadosCorretos = async () => {
    setIsLoading(true);
    setTipoAcao('confirmar');
    try {
      if (onDadosCorretos) {
        await onDadosCorretos();
      }
    } catch (error) {
      console.error('Erro ao confirmar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Validação de idade
  const idadeNum = parseInt(dadosUsuario?.idade, 10);
  const idadeInvalida = isNaN(idadeNum) || idadeNum < 18 || idadeNum > 80;

  return (
    <div className="space-y-8">
      {/* Título da etapa */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-hendrix-medium text-blue-600" style={{ fontSize: '12pt' }}>
            Criando Currículo
          </h2>
          <span className="font-hendrix-regular text-gray-500" style={{ fontSize: '9pt' }}>
            1 de 5
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* Título principal */}
      <div className="bg-gray-100 rounded-2xl p-5">
        <h1 className="font-hendrix-semibold text-gray-800 mb-10 mt-5" style={{ fontSize: '17pt', lineHeight: '0.9', textAlign: 'center' }}>
          Essas são as informações que já temos salvas
        </h1>

        {/* Dados do usuário */}
        <div className="space-y-4">

          {/* Nome */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-2">
            <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
              Nome
            </span>
            <div className="flex-1 flex items-center">
              <input
                type="text"
                className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-right flex-1"
                style={{ fontSize: '10pt', minWidth: 0, marginLeft: '1rem' }}
                value={dadosUsuario?.nome || ''}
                onChange={e => handleInputChange('nome', e.target.value)}
                placeholder="Nome Usuário"
              />
              <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1" />
            </div>
          </div>

          {/* E-mail */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-2">
            <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
              E-mail
            </span>
            <div className="flex-1 flex items-center gap-3">
              <input
                type="email"
                className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-right flex-1"
                style={{ fontSize: '10pt', minWidth: 0, marginLeft: '1rem' }}
                value={dadosUsuario?.email || ''}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="email@email.com.br"
              />
              <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {/* Telefone */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-2">
            <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
              Telefone
            </span>
            <div className="flex-1 flex items-center gap-3">
              <input
                type="text"
                className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-right flex-1"
                style={{ fontSize: '10pt', minWidth: 0, marginLeft: '1rem' }}
                value={formatPhone(dadosUsuario && dadosUsuario.phone ? dadosUsuario.phone : phoneUser)}
                onChange={e => handleInputChange('phone', e.target.value)}
                placeholder="(34) 99871-3749"
                maxLength={16}
              />
              <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {/* Idade */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-2">
            <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
              Idade
            </span>
            <div className="flex-1 flex items-center gap-3">
              <input
                type="text"
                className="font-hendrix-regular text-gray-800 bg-transparent border-none focus:ring-0 outline-none text-right flex-1"
                style={{ fontSize: '10pt', minWidth: 0, marginLeft: '1rem' }}
                value={dadosUsuario?.idade || ''}
                onChange={e => handleInputChange('idade', e.target.value)}
                placeholder="21 anos"
                maxLength={2}
              />
              <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0" />
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
          disabled={isLoading && tipoAcao === 'confirmar' || idadeInvalida}
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
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoCriacaoStep;
