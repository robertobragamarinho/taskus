'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PoliticasAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: 'Dados que podemos coletar',
      text: `Informações de identificação e contato; dados profissionais (currículo, histórico acadêmico); dados técnicos de navegação (IP, dispositivo, páginas acessadas) e informações fornecidas durante entrevistas, testes ou formulários.`,
    },
    {
      title: 'Como usamos seus dados',
      text: `Analisamos sua candidatura, operamos e melhoramos nossos serviços, enviamos comunicações sobre o processo, cumprimos obrigações legais e mantemos segurança e prevenção a fraudes.`,
    },
    {
      title: 'Compartilhamento',
      text: `Podemos compartilhar dados com provedores de tecnologia, suporte operacional e autoridades quando necessário, sempre respeitando as bases legais. Não comercializamos dados pessoais.`,
    },
    {
      title: 'Segurança',
      text: `Adotamos medidas técnicas e administrativas para proteger os dados. Nenhuma plataforma é 100% livre de riscos; monitoramos e aprimoramos continuamente nossos controles.`,
    },
    {
      title: 'Retenção',
      text: `Mantemos os dados apenas pelo tempo necessário às finalidades informadas ou conforme a lei, excluindo-os de maneira segura depois disso.`,
    },
    {
      title: 'Seus direitos',
      text: `Você pode solicitar acesso, correção, atualização, exclusão de dados ou revogar consentimentos quando aplicável. Use nosso canal oficial de suporte ao candidato.`,
    },
    {
      title: 'Limitações',
      text: `Não nos responsabilizamos por falhas causadas por conexão, dispositivos pessoais ou softwares de terceiros, nem por informações incorretas fornecidas pelo usuário.`,
    },
    {
      title: 'Acesso e inscrição',
      text: `O uso das plataformas requer informações verdadeiras e atualizadas. Podemos suspender cadastros inconsistentes ou que violem estes termos.`,
    },
    {
      title: 'Processo seletivo e contratação',
      text: `As etapas podem incluir cadastro, entrevistas e avaliações. Participar do processo não garante contratação; em caso de aprovação, você receberá orientações sobre os próximos passos.`,
    },
    {
      title: 'Treinamento e capacitação',
      text: `Algumas posições podem exigir treinamento prévio com materiais e avaliações. A conclusão pode ser requisito para início das atividades.`,
    },
    {
      title: 'Conduta do usuário',
      text: `É proibido usar as plataformas para fins ilegais, violar direitos de terceiros, burlar segurança ou compartilhar credenciais. O usuário deve preservar confidencialidade de acessos.`,
    },
    {
      title: 'Propriedade intelectual',
      text: `Todos os conteúdos, marcas e materiais disponibilizados são protegidos por lei e não podem ser reproduzidos sem autorização.`,
    },
    {
      title: 'Cookies',
      text: `Usamos cookies e tecnologias similares para lembrar preferências, medir audiência e melhorar a experiência. Você pode gerenciá-los nas configurações do navegador.`,
    },
  ];

  return (
    <div className="bg-[#000d2a00] -mt-10 pt-10 min-h-[80vh]">
      {items.map((item, i) => (
        <div key={i} className="border-b border-gray-800 py-2">
          <button
            onClick={() => toggle(i)}
            className="flex justify-between items-center w-full text-left"
          >
            <span className="text-gray-500 text-[2.2vw] sm:text-[1.6vw] font-semibold">
              {item.title}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-gray-700 transition-transform duration-300 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === i ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-gray-400 text-[2.4vw] sm:text-[1.8vw] leading-relaxed">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoliticasAccordion;