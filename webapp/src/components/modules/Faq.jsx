"use client";
import React, { useId, useMemo, useState } from "react";

/**
 * Faq.jsx
 * — Apenas a lista de perguntas e respostas (accordion), sem topo/rodapé extras.
 * — A11y-friendly (aria-controls/expanded), com limite de itens abertos.
 *
 * Props:
 *  - faq: Array<{question: string, answer: string}> (opcional; senão usa defaultFaq)
 *  - foundedYearBR: number | string (opcional) — substitui o placeholder
 *  - maxOpen: número de itens simultaneamente abertos (default: 2)
 *  - className: classes extras no wrapper
 */

// ----------------------
// Dados FAQ (default)
// ----------------------
const defaultFaq = [
  {
    question: "O que a TaskUs faz?",
    answer:
      "A TaskUs é uma empresa líder global em terceirização de processos de negócios (BPO) de próxima geração, focada em fornecer serviços de experiência do cliente (CX) de alta qualidade, moderação de conteúdo e suporte de back-office para as marcas de tecnologia mais inovadoras do mundo.",
  },
  {
    question: "Quais as empresas que a TaskUs atende no Brasil?",
    answer:
      "No Brasil, a TaskUs atende diversas empresas de tecnologia e startups de rápido crescimento, especialmente nos setores de fintech, e-commerce e streaming. Devido a acordos de confidencialidade, os nomes específicos dos clientes não são divulgados publicamente, mas são líderes em seus respectivos mercados.",
  },
  {
    question: "Quanto tempo tem que a TaskUs chegou aqui?",
    answer:
      "A TaskUs expandiu suas operações para o Brasil, como parte de sua estratégia de crescimento na América Latina, estabelecendo-se como um hub crucial para o mercado de língua portuguesa.",
  },
  {
    question: "Como faço para me inscrever na vaga?",
    answer:
      "Para se inscrever em uma vaga, você deve visitar a seção 'Carreiras' ou 'Trabalhe Conosco' no site oficial da TaskUs. Lá, você encontrará a lista de vagas abertas e poderá preencher o formulário de inscrição e anexar seu currículo.",
  },
  {
    question: "Até quando as vagas estarão disponíveis?",
    answer:
      "As vagas permanecem abertas até serem preenchidas. É recomendável se candidatar o mais rápido possível. A disponibilidade exata pode variar, então verifique a data de publicação e o status da vaga na página de carreiras.",
  },
  {
    question: "Nunca ouvi falar da TaskUs, é confiável?",
    answer:
      "Sim, a TaskUs é uma multinacional de atendimento ao cliente presente em mais de 13 países, com mais de 45 mil colaboradores ativos. No Brasil, está em expansão — por isso muitas pessoas ainda não conhecem. Mas basta uma busca rápida para encontrar notícias e cases da empresa atendendo gigantes. O foco da TaskUs não é o público consumidor, e sim empresas. Ela é contratada por grandes marcas para prestar suporte, por isso não aparece tanto em propagandas.",
  },
  {
    question: "Por que empresas como o Mercado Livre e Magalu contratam vocês?",
    answer:
      "Porque é mais eficiente contratar uma parceira especializada. O Mercado Livre, por exemplo, precisa de milhares de atendentes em vários países. Se cada cliente fosse gerenciado direto por eles, seria inviável. Por isso, contratam empresas como a TaskUs, que têm tecnologia e estrutura para recrutar, treinar e manter equipes de suporte em escala global.",
  },
  {
    question: "Preciso ter experiência para ser aprovado?",
    answer:
      "Não. Você não precisa ter experiência anterior para ser aprovado. Nosso processo é pensado justamente para quem quer começar do zero. Na avaliação, damos prioridade para pessoas comprometidas, com boa comunicação e disposição pra aprender. Antes de começar a trabalhar, você passa por um treinamento online rápido e prático, onde aprende tudo o que vai usar no dia a dia. O que realmente conta é sua vontade de aprender e crescer com a gente.",
  },
  {
    question: "Por que o treinamento é obrigatório para trabalhar?",
    answer:
      "Porque as marcas atendidas (como Amazon e Mercado Livre) exigem que todos os atendentes da TaskUs tenham um certificado oficial de capacitação antes de começar. É uma questão de padrão de qualidade. O curso é rápido (16 horas), online e prático, feito para nivelar todos os colaboradores, mesmo quem nunca trabalhou na área.",
  },
  {
    question: "Vou saber se vou ser contratado(a) no mesmo dia?",
    answer:
      "Sim. O processo da TaskUs foi pensado para ser rápido. Diferente de outras empresas que demoram semanas, graças à tecnologia o nosso processo de contratação é feito em tempo real por uma equipe de RH disponível 24h. Você preenche o cadastro, passa pela análise de perfil e já recebe o retorno no mesmo dia. Caso não seja aprovado, você ainda recebe orientação sobre o motivo. Ou seja, você não fica sem resposta.",
  },
  {
    question: "Após ser contratado(a), como eu converso com o meu chefe?",
    answer:
      "Cada contratado recebe um gerente de equipe responsável pelo acompanhamento diário. Toda a comunicação é feita pela plataforma interna da TaskUs, em português. Você terá acesso a mensagens diretas, reuniões online e suporte para qualquer dúvida. O gerente acompanha de perto suas primeiras semanas. Além disso, há uma equipe de suporte interna para ajudar em questões técnicas, como sistema, login ou uso dos equipamentos.",
  },
  {
    question: "A TaskUs assina carteira de trabalho?",
    answer:
      "Sim, a contratação é formalizada pela Carteira de Trabalho Digital, plataforma oficial do Governo Federal. Isso significa que você terá todos os direitos previstos em lei: férias, 13º, FGTS e benefícios.",
  },
  {
    question: "Como vocês avaliam todos os candidatos 24h por dia?",
    answer:
      "A TaskUs possui uma equipe global de RH que atua em turnos, com tecnologia automatizada que auxilia no processo de recrutamento. O sistema cruza seu perfil com as exigências da vaga e já envia o resultado, enquanto a equipe humana faz a validação. É por isso que o retorno é rápido e pode acontecer em qualquer horário. A tecnologia ajuda, mas a decisão final passa sempre pela equipe de RH.",
  },
  {
    question: "A TaskUs realmente envia notebook e celular de graça?",
    answer:
      "Sim. Assim que sua contratação é confirmada e você inicia o treinamento, a TaskUs já organiza o envio de todos os equipamentos necessários para o seu trabalho: notebook, mouse, teclado e fones de ouvido. Tudo é entregue diretamente na sua casa, de graça. Os equipamentos enviados são exclusivos para o trabalho e devem seguir normas rígidas de uso, como não acessar sites indevidos ou utilizar para lazer, jogos ou atividades pessoais.",
  },
];

// helper: substitui placeholder de ano
function applyFoundedYear(text, year) {
  if (!year) return text;
  return text.replace("", String(year));
}

// normaliza/filtra duplicatas básicas por pergunta
function normalizeFaq(rawFaq, foundedYearBR) {
  const seen = new Set();
  const list = [];
  for (const item of rawFaq) {
    const qKey = item.question.trim().toLowerCase();
    if (seen.has(qKey)) continue;
    seen.add(qKey);
    list.push({
      question: item.question,
      answer: applyFoundedYear(item.answer, foundedYearBR),
    });
  }
  return list;
}

// ----------------------
// Item do FAQ (Accordion)
// ----------------------
const FaqItem = React.memo(function FaqItem({ item, index, isOpen, onToggle, groupId }) {
  const panelId = `${groupId}-panel-${index}`;
  const btnId = `${groupId}-btn-${index}`;

  return (
    <div className="bg-gray-100 border-b border-gray-300">
      <button
        id={btnId}
        className="flex items-center w-full py-2 text-left focus:outline-none"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span
          className={`w-5 mr-4 text-[4vw] text-black transition-transform duration-300 transform ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          →
        </span>
        <span className="flex-1 no-underline text-[3vw] text-black font-light transition-colors hover:text-gray-500">
          {item.question}
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pl-[9.11vw] text-base text-[3vw] text-gray-400">{item.answer}</p>
      </div>
    </div>
  );
});

// ----------------------
// Componente principal — APENAS FAQ
// ----------------------
export default function Faq({
  faq = defaultFaq,
  foundedYearBR,
  maxOpen = 2,
  className = "",
}) {
  const [openItems, setOpenItems] = useState([]);
  const groupId = useId();

  const items = useMemo(() => normalizeFaq(faq, foundedYearBR), [faq, foundedYearBR]);

  const handleToggle = (index) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(index);
      if (isOpen) return prev.filter((i) => i !== index);
      let next = [...prev, index];
      if (next.length > maxOpen) next = next.slice(1);
      return next;
    });
  };

  return (
    <div className={`w-full ${className}`} role="region" aria-label="Perguntas frequentes">
      <div className="border-t border-gray-300">
        {items.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            index={index}
            isOpen={openItems.includes(index)}
            onToggle={handleToggle}
            groupId={groupId}
          />
        ))}
      </div>
    </div>
  );
}
