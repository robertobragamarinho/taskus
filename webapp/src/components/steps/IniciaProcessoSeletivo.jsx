import { Check } from 'lucide-react';
import { useEffect } from 'react';
import '../../styles/refino.css';

import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";
import VerifiedList from "../modules/VerifiedList";
import ExplanatoryCards from "../modules/ExplanatoryCards";
import { IconPhoneLike, IconChatLike, IconMailEditLike } from "../modules/SvgIcons";

const IniciaProcessoSeletivo = ({ scrollToTopOnMount = true }) => {
  // 👇 Faz o scroll subir ao abrir a página
  useEffect(() => {
    if (scrollToTopOnMount) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [scrollToTopOnMount]);

  const resources = [
    { title: 'O que faz um atendente de suporte', description: '' },
    { title: 'Como funciona a rotina de trabalho', description: '' },
    { title: 'Benefícios de trabalhar na TaskUs', description: '' }
  ];

  const supportTypes = [
    {
      id: 'phone',
      icon: IconPhoneLike,
      title: 'Entrevista Online',
      description:
        'Devido à alta demanda de candidatos, a entrevista online é feita pelo formulário, com perguntas fechadas e respostas rápidas. Você não vai precisar falar com ninguém.'
    }
  ];

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">
          Vaga para atendente <br />de suporte ao cliente
        </Headlines>

        <Paragraphs variant="black">
          Primeiro, vamos te explicar tudo <br />sobre a vaga de emprego em 2 <br />minutos. Logo em seguida você <br />poderá participar da entrevista online.
        </Paragraphs>
      </Maintexts>

      <Continuity variant="black">Você verá agora:</Continuity>

      <VerifiedList resources={resources} withDescription={false} />
      <div className="mb-10"></div>
      <ExplanatoryCards supportTypes={supportTypes} />
    </div>
  );
};

export default IniciaProcessoSeletivo;