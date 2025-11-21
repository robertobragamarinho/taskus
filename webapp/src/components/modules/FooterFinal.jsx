import React, { useState } from 'react';
import Nordlayer from '../../assets/nordlayer.webp';
import Carreiras from '../../assets/carreiras.webp'; 
import Brasil from '../../assets/brasil.webp'; 

// ----------------------
// Dados FAQ
// ----------------------
const faqData = [
  {
    question: "O que a TaskUs faz?",
    answer: "A TaskUs é uma empresa líder global em terceirização de processos de negócios (BPO) de próxima geração, focada em fornecer serviços de experiência do cliente (CX) de alta qualidade, moderação de conteúdo e suporte de back-office para as marcas de tecnologia mais inovadoras do mundo."
  },
  {
    question: "Quais as empresas que a TaskUs atende no Brasil?",
    answer: "No Brasil, a TaskUs atende diversas empresas de tecnologia e startups de rápido crescimento, especialmente nos setores de fintech, e-commerce e streaming. Devido a acordos de confidencialidade, os nomes específicos dos clientes não são divulgados publicamente, mas são líderes em seus respectivos mercados."
  },
  {
    question: "Quanto tempo tem que a TaskUs chegou aqui?",
    answer: "A TaskUs expandiu suas operações para o Brasi, como parte de sua estratégia de crescimento na América Latina, estabelecendo-se como um hub crucial para o mercado de língua portuguesa."
  },
  {
    question: "Como faço para me inscrever na vaga?",
    answer: "Para se inscrever em uma vaga, você deve visitar a seção 'Carreiras' ou 'Trabalhe Conosco' no site oficial da TaskUs. Lá, você encontrará a lista de vagas abertas e poderá preencher o formulário de inscrição e anexar seu currículo."
  },
  {
    question: "Até quando as vagas estarão disponíveis?",
    answer: "As vagas permanecem abertas até serem preenchidas. É recomendável se candidatar o mais rápido possível. A disponibilidade exata pode variar, então verifique a data de publicação e o status da vaga na página de carreiras."
  },
  {
    question: "Quanto tempo tem que a TaskUs chegou aqui?",
    answer: "Conforme mencionado, a TaskUs chegou ao Brasil tem expandido rapidamente sua presença e equipe no país."
  },
  {
    question: "Como faço para me inscrever na vaga?",
    answer: "O processo de inscrição é feito exclusivamente pelo portal de carreiras da TaskUs. Certifique-se de ter um currículo atualizado e preencha todas as informações solicitadas com atenção."
  },
];

// ----------------------
// Subcomponentes comuns
// ----------------------
const Topo = () => (
  <div className="mx-auto pb-5 pt-5 flex justify-between items-center flex-row">
    <img src={Carreiras} alt="Carreiras" className="w-40" />
    <div className="flex items-center text-base font-bold">
      <img src={Brasil} alt="Brasil" className="w-25" />
    </div>
  </div>
);

const ReportarProblema = () => (
  <div className="mb-10 text-base leading-relaxed">
    <p className="m-0 text-[3vw] leading-[3.9vw]">
      Encontrou algum problema nessa página? <a href="#" className="text-black font-bold underline cursor-pointer">Toque aqui</a> <br/>e informe nossa equipe.
      Não se preocupe, você não vai<br/> sair do processo seletivo.
    </p>
  </div>
);

const BarraNordLayer = () => (
  <div className="bg-black w-[100%] text-white py-3">
    <div className="mx-auto pl-6 pr-6 flex justify-between items-center flex-row">
      <div className="flex items-center mr-2 w-30 h-10 text-lg font-bold">
        <img src={Nordlayer} alt="NordLayer" />
      </div>
      <p className="text-xs text-right text-[1.7vw] max-w-md leading-snug text-left md:mt-0">
        Sistema Protegido com criptografia avançada baseada<br/>
        em inteligência artificial desenvolvida por Nord Security.
      </p>
    </div>
  </div>
);

// ----------------------
// Item do FAQ (Accordion)
// ----------------------
const FaqItem = ({ item, index, isOpen, onToggle }) => {
  const handleToggleClick = () => onToggle(index);

  return (
    <div className="border-b border-gray-300">
      <button
        className="flex items-center w-full py-2 text-left focus:outline-none"
        onClick={handleToggleClick}
        aria-expanded={isOpen}
      >
        <span
          className={`w-5 mr-4 text-xl text-black transition-transform duration-300 transform ${isOpen ? 'rotate-90' : ''}`}
        >
          →
        </span>
        <span className="flex-1 no-underline text-[3vw] text-black text-lg font-light transition-colors hover:text-gray-500">
          {item.question}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="pl-[9.11vw] text-base text-[3vw] text-gray-400">{item.answer}</p>
      </div>
    </div>
  );
};

// ----------------------
// Versão COMPLETA (com FAQ) - DEFAULT
// ----------------------
const FooterFinal = () => {
  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (index) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(index);
      if (isOpen) return prev.filter((i) => i !== index);
      let next = [...prev, index];
      if (next.length > 2) next = next.slice(1); // mantém no máx. 2 abertos
      return next;
    });
  };

  return (
    <footer className="bg-red">
      <div className="max-w-[1000px] px-7 mx-auto">
        <Topo />


     
      </div>

      <BarraNordLayer />
    </footer>
  );
};

// ----------------------
// Versão REDUZIDA (sem FAQ) - NOMEADA
// ----------------------
export const FooterFinalReduzida = () => {
  return (
    <footer id="reduzida" className="bg-red">
      <div className="max-w-[1000px] px-7 mx-auto">
        <Topo />
        {/* (sem FAQ) */}
        <ReportarProblema />
      </div>

      <BarraNordLayer />
    </footer>
  );
};

export default FooterFinal;