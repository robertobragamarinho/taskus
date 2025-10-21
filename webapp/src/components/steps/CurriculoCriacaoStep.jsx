/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Pencil } from 'lucide-react';
import '../../styles/refino.css';
import { useProcess } from '@/hooks/useProcess.js';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Imputs from "../modules/Imputs"; // ⬅️ componente reutilizável

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CurriculoCriacaoStep = ({ onContinue }) => {
  const { updateUserData, processData } = useProcess();
  const userData = processData?.userData || {};

  // Estado local para inputs editáveis
  const [nome, setNome] = useState(
    userData.firstName && userData.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : userData.firstName || ''
  );
  const [email, setEmail] = useState(userData.email || '');
  const [phone, setPhone] = useState(userData.phone || ''); // armazenado como dígitos
  const [idade, setIdade] = useState(userData.age || userData.idade || '');
  const [isLoading, setIsLoading] = useState(false);
  const [tipoAcao, setTipoAcao] = useState(null);

  // ── Scroll topo ao montar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ── Máscara telefone (00) 0 0000-0000
  const formatPhone = (raw) => {
    const v = (raw || '').replace(/\D/g, '').slice(0, 11); // guarda até 11 dígitos
    const ddd = v.slice(0, 2);
    const dig9 = v.slice(2, 3);
    const bloco1 = v.slice(3, 7);
    const bloco2 = v.slice(7, 11);

    if (!v.length) return '';
    if (v.length <= 2) return `(${ddd}`;
    if (v.length <= 3) return `(${ddd}) ${dig9}`;
    if (v.length <= 7) return `(${ddd}) ${dig9} ${bloco1}`;
    return `(${ddd}) ${dig9} ${bloco1}-${bloco2}`;
  };

  const formattedPhone = formatPhone(phone);
  const phoneLooksValid =
    /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/.test(formattedPhone) || formattedPhone === '';

  // ── Validações + popups (mesmo padrão do PersonalInfoStep)

  // E-mail
  const emailWrapperRef = useRef(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const validateEmail = (val) => {
    if (!val || !val.trim()) return 'Digite seu e-mail.';
    if (!EMAIL_REGEX.test(val)) return 'Digite um e-mail válido (ex.: nome@dominio.com).';
    return '';
  };

  const onEmailChange = (val) => {
    setEmail(val);
    if (emailTouched) {
      const err = validateEmail(val);
      setEmailError(err);
      setShowEmailPopup(!!err);
    }
  };

  const onEmailBlur = () => {
    setEmailTouched(true);
    const err = validateEmail(email || '');
    setEmailError(err);
    setShowEmailPopup(!!err);
  };

  const onEmailFocus = () => setShowEmailPopup(false);

  // Idade
  const ageWrapperRef = useRef(null);
  const [ageTouched, setAgeTouched] = useState(false);
  const [ageError, setAgeError] = useState('');
  const [showAgePopup, setShowAgePopup] = useState(false);

  const validateAge = (val) => {
    if (!val) return 'Digite sua idade.';
    const n = parseInt(val, 10);
    if (Number.isNaN(n)) return 'Digite apenas números.';
    if (n < 18 || n > 80) return 'Idade mínima 18, idade máxima 80.';
    return '';
  };

  const onAgeChange = (val) => {
    const onlyDigits = (val || '').replace(/\D/g, '').slice(0, 2);
    setIdade(onlyDigits);
    if (ageTouched) {
      const err = validateAge(onlyDigits);
      setAgeError(err);
      setShowAgePopup(!!err);
    }
  };

  const onAgeBlur = () => {
    setAgeTouched(true);
    const err = validateAge(idade || '');
    setAgeError(err);
    setShowAgePopup(!!err);
  };

  const onAgeFocus = () => setShowAgePopup(false);

  const idadeInvalida = !!validateAge(idade || '') && (idade || '').length > 0;

  // ── Detecta se houve alteração em algum campo
  const dadosAlterados = () => {
    const nomeSplit = (nome || '').trim().split(/\s+/);
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

  // ── Envio
  const handleDadosCorretos = async () => {
    // força validação local antes de salvar
    const eErr = validateEmail(email || '');
    const aErr = validateAge(idade || '');
    setEmailTouched(true);
    setAgeTouched(true);
    setEmailError(eErr);
    setAgeError(aErr);
    setShowEmailPopup(!!eErr);
    setShowAgePopup(!!aErr);

    if (eErr) {
      emailWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (aErr) {
      ageWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    setTipoAcao('confirmar');
    try {
      if (dadosAlterados()) {
        const nomeSplit = (nome || '').trim().split(/\s+/);
        const firstName = nomeSplit[0] || '';
        const lastName = nomeSplit.slice(1).join(' ') || '';
        await updateUserData({
          firstName,
          lastName,
          email,
          phone, // mantemos apenas dígitos
          age: idade
        });
      }
      if (typeof onContinue === 'function') onContinue();
    } catch (error) {
      console.error('Erro ao confirmar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">
          Essas são as informações que já temos salvas
        </Headlines>
        <Paragraphs variant="black">
          Confira se estão corretas, toque para editar caso necessário.
        </Paragraphs>
      </Maintexts>

      {/* Formulário */}
      <div className="rounded-2xl mt-10 mb-10">
        <div className="space-y-5">
          {/* Nome */}
          <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
            Seu nome
          </span>
          <div className="relative">
            <Imputs
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="bg-white border-gray-200"
              style={{ minHeight: '48px' }}
              spellCheck={false}
            />
            <Pencil className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* E-mail */}
          <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
            E-mail
          </span>
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
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onBlur={onEmailBlur}
              onFocus={onEmailFocus}
              placeholder="email@email.com.br"
              className={`bg-white border-gray-2 00 ${emailTouched && emailError ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
              style={{ minHeight: '48px' }}
              spellCheck={false}
              inputMode="email"
              aria-invalid={emailTouched && !!emailError}
              aria-describedby={emailTouched && emailError ? 'email-error' : undefined}
            />
            {emailTouched && emailError && (
              <span id="email-error" className="sr-only">
                {emailError}
              </span>
            )}
            <Pencil className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Telefone */}
          <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
            Telefone
          </span>
          <div className="relative">
            <Imputs
              id="phone"
              type="tel"
              value={formattedPhone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
              placeholder="(00) 0 0000-0000"
              className={`bg-white ${phoneLooksValid ? 'border-gray-200' : 'border-red-500 bg-red-50'}`}
              style={{ minHeight: '48px' }}
              spellCheck={false}
              inputMode="numeric"
              title="Formato: (00) 0 0000-0000"
            />
            <Pencil className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Idade */}
          <span className="font-hendrix-medium text-gray-700" style={{ fontSize: '10pt', minWidth: 80 }}>
            Idade
          </span>
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
              id="idade"
              type="tel"
              value={idade}
              onChange={(e) => onAgeChange(e.target.value)}
              onBlur={onAgeBlur}
              onFocus={onAgeFocus}
              placeholder="Digite sua idade"
              className={`bg-white ${ageTouched && ageError ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
              style={{ minHeight: '48px' }}
              spellCheck={false}
              inputMode="numeric"
              maxLength={2}
              aria-invalid={ageTouched && !!ageError}
              aria-describedby={ageTouched && ageError ? 'age-error' : undefined}
            />
            {ageTouched && ageError && (
              <span id="age-error" className="sr-only">
                {ageError}
              </span>
            )}
            <Pencil className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Botão confirmar */}
      <div className="space-y-4">
        <button
          onClick={handleDadosCorretos}
          disabled={
            (isLoading && tipoAcao === 'confirmar') ||
            !!validateEmail(email || '') ||
            !!validateAge(idade || '')
          }
          className={`
            w-full px-6 py-4 rounded-full font-hendrix-medium text-white 
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 
            transition-all duration-300
            ${(isLoading && tipoAcao === 'confirmar') ||
            !!validateEmail(email || '') ||
            !!validateAge(idade || '')
              ? 'bg-gradient-to-r from-gray-300 to-gray-400 opacity-70 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#1655ff] to-[#4285f4] hover:scale-105 active:scale-95'
            }
          `}
          style={{ fontSize: '11pt', boxShadow: '0 2px 8px 0 rgba(22,85,255,0.10)' }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && tipoAcao === 'confirmar' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-hendrix-medium tracking-wide text-[10pt]">
                  Confirmando...
                </span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide text-[12pt]">
                Estão corretas
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurriculoCriacaoStep;