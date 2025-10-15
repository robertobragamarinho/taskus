/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import { Input } from '@/components/ui/input.jsx';
import '../../styles/refino.css';


const PersonalInfoStep = ({ data, updateData, errors, onComplete } = {}) => {
  const { registerUser } = useContext(ProcessContext);
  const [ageError, setAgeError] = useState('');
  const [loading, setLoading] = useState(false);


  // Salva no contexto sempre sem formatação
  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      // Salva apenas os dígitos
      const onlyDigits = value.replace(/\D/g, '');
      updateData({ phone: onlyDigits });
    } else {
      updateData({ [field]: value });
    }
  };


  // Formatar telefone para exibição
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)})${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)})${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)})${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  // Ao digitar, exibe formatado, mas salva só os dígitos
  const [phoneInput, setPhoneInput] = useState('');
  useEffect(() => {
    setPhoneInput(formatPhone(data.phone || ''));
  }, [data.phone]);

  const handlePhoneChange = (value) => {
    setPhoneInput(formatPhone(value));
    handleInputChange('phone', value);
  };

  // erro a exibir para idade (local > vindo do pai)
  const ageErrToShow = ageError || errors.age;

  // Lógica única: se idade inválida, equivale a check desmarcado
  const canContinue = !!data.termsAccepted && !ageErrToShow && (data.age || '').length === 2;

  // Aplica a regra no botão EXISTENTE (precisa de data-continue ou id="continue-btn")
  useEffect(() => {
    const btn = document.querySelector('[data-continue], #continue-btn');
    if (btn) {
      btn.disabled = !canContinue || loading;
      btn.setAttribute('aria-disabled', !canContinue || loading ? 'true' : 'false');
      if (!canContinue || loading) {
        btn.classList.add('cursor-not-allowed', 'opacity-60');
      } else {
        btn.classList.remove('cursor-not-allowed', 'opacity-60');
      }
    }
  }, [canContinue, loading]);

  // Handler para continuar quando usado fora do fluxo
  const handleLocalContinue = async () => {
    if (canContinue && typeof onComplete === 'function' && !loading) {
      setLoading(true);
      // Separar nome completo em firstName e lastName
      let firstName = '', lastName = '';
      if (data.fullName) {
        const names = data.fullName.trim().split(/\s+/);
        firstName = names[0] || '';
        lastName = names.slice(1).join(' ') || '';
      }
      // Montar objeto de dados do usuário
      const userData = {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        age: data.age
      };
      try {
        await registerUser(userData);
        onComplete();
      } catch (err) {
        // Pode exibir erro se desejar
        // alert('Erro ao registrar usuário');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com título e subtítulo */}
      <div className="mb-6">
        <h1 className="titulodaetapa font-hendrix-semibold text-xl text-gray-900 mb-3" style={{ fontSize: '12pt' }}>
          Entrevista Inicial
        </h1>
                <p className="font-hendrix-medium text-gray-300 text-base mb-6" style={{ fontSize: '13.5pt' }}>
          Preencha seus dados abaixo com atenção para seguir no processo seletivo da VagaCerta.
        </p>
      </div>

      {/* Aviso de proteção de dados */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="font-hendrix-extralight text-gray leading-relaxed" style={{ fontSize: '8pt', lineHeight: '3.2vw'}}>
          Todos os seus dados são armazenados com segurança e utilizados exclusivamente para fins de recrutamento e capacitação profissional, em conformidade com a lei LGPD (Lei geral de proteção de dados conforme artigo Nº13.853).
        </p>
      </div>

      <div className="space-y-3">
        {/* Nome completo */}
        <div>
          <Input
            id="fullName"
            type="text"
            placeholder="Seu nome completo"
            value={data.fullName || ''}
            onChange={(e) => {
              updateData({ fullName: e.target.value });
            }}
            className={`imputs font-hendrix-regular w-full px-4 py-4 border rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-gray-900 placeholder-gray-500 ${
              errors.fullName ? 'border-red-300 bg-red-50' : ''
            }`}
            style={{ fontSize: '12pt' }}
          />
          {errors.fullName && (
            <p className="font-hendrix-light text-red-500 mt-1" style={{ fontSize: '12pt' }}>{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            id="email"
            type="email"
            placeholder="E-mail para contato"
            value={data.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`imputs font-hendrix-regular w-full px-4 py-4 border rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-gray-900 placeholder-gray-500 ${
              errors.email ? 'border-red-300 bg-red-50' : ''
            }`}
            style={{ fontSize: '12pt' }}
          />
          {errors.email && (
            <p className="font-hendrix-light text-red-500 mt-1" style={{ fontSize: '12pt' }}>{errors.email}</p>
          )}
        </div>

        {/* Telefone / WhatsApp */}
        <div>
          <Input
            id="phone"
            type="tel"
            placeholder="(99)99999-9999"
            value={phoneInput}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={`imputs font-hendrix-regular w-full px-4 py-4 border rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-gray-900 placeholder-gray-500 ${
              errors.phone ? 'border-red-300 bg-red-50' : ''
            }`}
            style={{ fontSize: '12pt' }}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {errors.phone && (
            <p className="imputs font-hendrix-light text-red-500 mt-1" style={{ fontSize: '12pt' }}>{errors.phone}</p>
          )}
        </div>

        {/* Idade (2 dígitos + validação 18–80 só após 2 dígitos) */}
        <div>
          <Input
            id="age"
            type="tel"
            maxLength={2}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Sua idade"
            value={data.age || ''}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 2);
              handleInputChange('age', onlyDigits);

              if (onlyDigits.length === 2) {
                const ageNum = parseInt(onlyDigits, 10);
                if (ageNum < 18 || ageNum > 80) {
                  setAgeError('Sua idade está fora dos requisitos de contratação.');
                } else {
                  setAgeError('');
                }
              } else {
                setAgeError('');
              }
            }}
            className={`imputs font-hendrix-regular w-full px-4 py-4 border rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-gray-900 placeholder-gray-500 ${
              ageErrToShow ? 'border-red-300 bg-red-50' : ''
            }`}
            style={{ fontSize: '12pt' }}
          />
          {ageErrToShow && (
            <p
              className="font-hendrix-light mt-2 text-red-500"
              style={{
                fontSize:
                  ageErrToShow === 'Sua idade está fora dos requisitos de contratação.'
                    ? '10pt' // tamanho especial só para esse aviso
                    : '10pt' // tamanho padrão para outros erros
              }}
            >
              {ageErrToShow}
            </p>
          )}
        </div>
      </div>

      {/* Checkbox de confirmação */}
      <div className="mt-6 flex justify-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
              errors.termsAccepted ? 'border-red-300' : ''
            }`}
            checked={!!data.termsAccepted}
            onChange={(e) => updateData({ termsAccepted: e.target.checked })}
          />
          <span
            className="font-hendrix-medium text-gray-700 leading-relaxed"
            style={{ fontSize: '9pt' }}
          >
            Autorizo o uso das informações para fins de contratação.
          </span>
        </label>
      </div>

      {errors.termsAccepted && (
        <p
          className="font-hendrix-light text-red-500 mt-2 text-center"
          style={{ fontSize: '8pt' }}
        >
          {errors.termsAccepted}
        </p>
      )}

      {/* Botão local de continuar para quando componente for montado isoladamente (AnalisePerfilPage) */}
      <div className="pt-4">
        <button
          type="button"
          data-continue
          onClick={handleLocalContinue}
          className={`w-full px-6 py-3 rounded-full text-white font-hendrix-medium transition-all duration-200 ${
            canContinue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed opacity-60'
          } flex items-center justify-center`}
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          {loading ? 'Salvando...' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;