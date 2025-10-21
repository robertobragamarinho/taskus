import '../../styles/refino.css';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";
import VerifiedList from "../modules/VerifiedList";
import ExplanatoryCards from "../modules/ExplanatoryCards";
import { IconPhoneLike, IconChatLike, IconMailEditLike } from "../modules/SvgIcons";
import { useEffect } from "react";   // 👈 importa o hook

const SupportTypesInfoStep = () => {
  // 👇 useEffect que sobe a tela ao entrar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const supportTypes = [
    {
      id: 'phone',
      icon: IconPhoneLike,
      title: 'Atendimento por ligação',
      description:
        'Esse modelo de atendimento é ideal para quem tem facilidade em se comunicar e deseja oferecer suporte direto às pessoas por meio de ligações.'
    },
    {
      id: 'whatsapp',
      icon: IconChatLike,
      title: 'Atendimento por WhatsApp',
      description:
        'Você irá atender os clientes de forma rápida e prática através de mensagens no WhatsApp, oferecendo suporte no dia a dia.'
    },
    {
      id: 'email',
      icon: IconMailEditLike,
      title: 'Atendimento por e-mail',
      description:
        'Você irá responder os clientes por e-mail. Esse modelo de suporte é mais utilizado em situações como devoluções, trocas e solicitações de reembolso.'
    }
  ];

  return (
    <div className="bloco_principal">

      <Maintexts>
        <Headlines variant="black">
          Os atendimentos são realizados em 3 canais<br/> de comunicação
        </Headlines>

        <Paragraphs variant="black">
          Ao ser contratado(a), você poderá escolher a área em que tiver mais facilidade para atuar.
        </Paragraphs>
      </Maintexts>

      <ExplanatoryCards supportTypes={supportTypes} />
      
    </div>
  );
};

export default SupportTypesInfoStep;