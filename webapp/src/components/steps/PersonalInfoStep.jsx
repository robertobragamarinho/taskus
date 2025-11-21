/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext, useRef } from 'react';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import '../../styles/refino.css';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Imputs from "../modules/Imputs"; // campo reutilizável

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PersonalInfoStep = ({ data, updateData, errors, onComplete } = {}) => {
  const { registerUser } = useContext(ProcessContext);
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const formRef = useRef(null);

  // --- Exibe skeleton por 2s
  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // --- Scroll topo ao entrar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // --- Helpers
  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      const onlyDigits = value.replace(/\D/g, '');
      updateData({ phone: onlyDigits });
    } else {
      updateData({ [field]: value });
    }
  };

  // --- Máscara telefone (00) 0 0000-0000
  const formatPhoneBR = (raw) => {
    const v = (raw || '').replace(/\D/g, '').slice(0, 11);
    const ddd = v.slice(0, 2);
    const dig9 = v.slice(2, 3);
    const bloco1 = v.slice(3, 7);
    const bloco2 = v.slice(7, 11);
    if (v.length === 0) return '';
    if (v.length <= 2) return `(${ddd}`;
    if (v.length <= 3) return `(${ddd}) ${dig9}`;
    if (v.length <= 7) return `(${ddd}) ${dig9} ${bloco1}`;
    return `(${ddd}) ${dig9} ${bloco1}-${bloco2}`;
  };

  const [phoneInput, setPhoneInput] = useState('');
  useEffect(() => {
    setPhoneInput(formatPhoneBR(data.phone || ''));
  }, [data.phone]);

  const handlePhoneChange = (value) => {
    setPhoneInput(formatPhoneBR(value));
    handleInputChange('phone', value);
  };

  // --- E-mail
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const emailWrapperRef = useRef(null);

  const validateEmail = (val) => {
    if (!val || !val.trim()) return 'Digite seu e-mail.';
    if (!EMAIL_REGEX.test(val)) return 'Digite um e-mail válido (ex.: nome@dominio.com).';
    return '';
  };

  const onEmailChange = (val) => {
    handleInputChange('email', val);
    if (emailTouched) {
      const err = validateEmail(val);
      setEmailError(err);
      setShowEmailPopup(!!err);
    }
  };

  const onEmailBlur = () => {
    setEmailTouched(true);
    const err = validateEmail(data.email || '');
    setEmailError(err);
    setShowEmailPopup(!!err);
  };

  const onEmailFocus = () => setShowEmailPopup(false);

  // --- Idade
  const [ageTouched, setAgeTouched] = useState(false);
  const [ageError, setAgeError] = useState('');
  const [showAgePopup, setShowAgePopup] = useState(false);
  const ageWrapperRef = useRef(null);

  const validateAge = (val) => {
    if (!val) return 'Digite sua idade.';
    const ageNum = parseInt(val, 10);
    if (Number.isNaN(ageNum)) return 'Digite apenas números.';
    if (ageNum < 18 || ageNum > 80) return 'Idade mínima 18, idade máxima 80.';
    return '';
  };

  const onAgeChange = (val) => {
    const onlyDigits = val.replace(/\D/g, '').slice(0, 2);
    handleInputChange('age', onlyDigits);
    if (ageTouched) {
      const err = validateAge(onlyDigits);
      setAgeError(err);
      setShowAgePopup(!!err);
    }
  };

  const onAgeBlur = () => {
    setAgeTouched(true);
    const err = validateAge(data.age || '');
    setAgeError(err);
    setShowAgePopup(!!err);
  };

  const onAgeFocus = () => setShowAgePopup(false);

  const canContinue =
    !!data.termsAccepted &&
    !emailError &&
    !ageError &&
    (data.age || '').length === 2;

  // --- Sincroniza botão
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

  const handleLocalContinue = async () => {
    const emailErr = validateEmail(data.email || '');
    const ageErr = validateAge(data.age || '');

    setEmailTouched(true);
    setAgeTouched(true);
    setEmailError(emailErr);
    setAgeError(ageErr);
    setShowEmailPopup(!!emailErr);
    setShowAgePopup(!!ageErr);

    if (emailErr) {
      emailWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (ageErr) {
      ageWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (canContinue && typeof onComplete === 'function' && !loading) {
      setLoading(true);
      let firstName = '', lastName = '';
      if (data.fullName) {
        const names = data.fullName.trim().split(/\s+/);
        firstName = names[0] || '';
        lastName = names.slice(1).join(' ') || '';
      }
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
      } finally {
        setLoading(false);
      }
    }
  };

  /* =========================
     Skeleton Loader (mesma estrutura e alinhamento do real)
  ==========================*/
  if (showSkeleton) {
    return (
      <div className="bloco_principal">
        {/* Header (Maintexts) */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>

        {/* Box informativo */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 mt-4">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-11/12" />
            <div className="h-3 bg-gray-200 rounded w-10/12" />
          </div>
        </div>

        {/* Form (mesmas “linhas” que os Imputs) */}
        <div className="space-y-2 animate-pulse">
          <div className="h-11 bg-gray-200 rounded" />
          <div className="h-11 bg-gray-200 rounded" />
          <div className="h-11 bg-gray-200 rounded" />
          <div className="h-11 bg-gray-200 rounded" />
        </div>

        {/* Checkbox + label */}
        <div className="mt-6 mb-5 flex items-start gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="space-y-1 flex-1">
            <div className="h-3 bg-gray-200 rounded w-52" />
            <div className="h-3 bg-gray-200 rounded w-40" />
          </div>
        </div>

        {/* Botão */}
        <div className="pt-4">
          <div className="h-12 bg-gray-300 rounded-full w-full" />
        </div>
      </div>
    );
  }

  /* =========================
     Conteúdo Real
  ==========================*/
  return (
    <div className="bloco_principal transition-opacity duration-500">
      <Maintexts>
        <section id='ETP2T1'/>
        <Headlines variant="black">Informações <br/>do Candidato(a)</Headlines>
        <Paragraphs variant="black">
          Preencha abaixo para continuar
        </Paragraphs>
      </Maintexts>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p
          className="font-hendrix-extralight text-gray leading-relaxed"
          style={{ fontSize: '8pt', lineHeight: '3.2vw' }}
        >
          Todos os seus dados são armazenados com segurança e utilizados exclusivamente para fins de recrutamento e capacitação profissional, em conformidade com a lei LGPD (Lei geral de proteção de dados conforme artigo Nº13.853).
        </p>
      </div>

      {/* Form */}
      <form ref={formRef} noValidate className="space-y-2">
        {/* Nome completo */}
        <Imputs
          id="fullName"
          type="text"
          placeholder="Nome completo"
          value={data.fullName || ''}
          onChange={(e) => updateData({ fullName: e.target.value })}
          error={errors.fullName}
        />

        {/* E-mail */}
        <div className="relative" ref={emailWrapperRef}>
          {showEmailPopup && emailError && (
            <div
              role="alert"
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 bg-red-600 text-white text-[10px] px-3 py-2 rounded shadow-md pointer-events-none"
              style={{ whiteSpace: 'nowrap' }}
            >
              {emailError}
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-600" />
            </div>
          )}

          <Imputs
            id="email"
            type="email"
            placeholder="E-mail para contato"
            value={data.email || ''}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={onEmailBlur}
            onFocus={onEmailFocus}
            inputMode="email"
            className={`${emailTouched && emailError ? 'border-red-500 bg-red-50' : ''}`}
            aria-invalid={emailTouched && !!emailError}
            aria-describedby={emailTouched && emailError ? 'email-error' : undefined}
          />
          {emailTouched && emailError && (
            <span id="email-error" className="sr-only">
              {emailError}
            </span>
          )}
        </div>

        {/* Telefone */}
        <Imputs
          id="phone"
          type="tel"
          placeholder="Número de telefone"
          value={phoneInput}
          onChange={(e) => handlePhoneChange(e.target.value)}
          inputMode="numeric"
          title="Formato: (00) 0 0000-0000"
          className={/^\(\d{2}\)\s\d\s\d{4}-\d{4}$/.test(phoneInput) || phoneInput === '' ? '' : 'border-red-500 bg-red-50'}
          error={errors.phone}
        />

        {/* Idade */}
        <div className="relative" ref={ageWrapperRef}>
          {showAgePopup && ageError && (
            <div
              role="alert"
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 bg-red-600 text-white text-[10px] px-3 py-2 rounded shadow-md pointer-events-none"
              style={{ whiteSpace: 'nowrap' }}
            >
              {ageError}
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-600" />
            </div>
          )}

          <Imputs
            id="age"
            type="tel"
            maxLength={2}
            inputMode="numeric"
            placeholder="Sua idade"
            value={data.age || ''}
            onChange={(e) => onAgeChange(e.target.value)}
            onBlur={onAgeBlur}
            onFocus={onAgeFocus}
            className={`${ageTouched && ageError ? 'border-red-500 bg-red-50' : ''}`}
            aria-invalid={ageTouched && !!ageError}
            aria-describedby={ageTouched && ageError ? 'age-error' : undefined}
          />
          {ageTouched && ageError && (
            <span id="age-error" className="sr-only">
              {ageError}
            </span>
          )}
        </div>
      </form>

      {/* Checkbox */}
      <div className="mt-6 flex">
        <label className="flex items-center gap-2 mb-5 cursor-pointer">
          <input
            type="checkbox"
            className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
              errors.termsAccepted ? 'border-red-300' : ''
            }`}
            checked={!!data.termsAccepted}
            onChange={(e) => updateData({ termsAccepted: e.target.checked })}
            required
          />
          <span
            className="font-hendrix-medium text-gray-700 flex items-center"
            style={{ fontSize: '7pt', textAlign: 'left' }}
          >
            Autorizo o uso das informações para fins de contratação.
          </span>
        </label>
      </div>

      {/* Botão */}
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