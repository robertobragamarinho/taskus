import React, { useEffect } from 'react';
import { Package, Keyboard, Headphones, Mouse, Shirt, Badge } from 'lucide-react';
import '../../styles/refino.css';

import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";
import ExplanatoryCards from "../modules/ExplanatoryCards";
import { IconAlert } from "../modules/SvgIcons";
import VideoBlock from "../modules/VideoBlock";
import introVideo from "../../assets/equipamentos.mp4";
import ListTopics from "../modules/ListTopics";

// Cards de alerta
const alerts = [
  {
    id: 'equipments-alert',
    icon: IconAlert,
    title: 'Importante',
    description:
      'Todos os equipamentos enviados pertencem à TaskUs e devem ser utilizados apenas para atividades de trabalho. ' +
      'Cuide deles com atenção e zelo, como se fossem seus. Em caso de desligamento, será necessária a devolução de todos os itens.'
  }
];

// Lista de tópicos (equipamentos)
const equipamentosTopics = [
  { label: "1 - Notebook Dell 2024", icon: Package },
  { label: "1 - Kit teclado e mouse Dell", icon: Keyboard },
  { label: "1 - Headphone", icon: Headphones },
  { label: "1 - Mousepad", icon: Mouse },
  { label: "3 - Camisetas", icon: Shirt },
  { label: "1 - Crachá", icon: Badge }
];

const EquipmentInfoStep = ({ scrollToTopOnMount = true }) => {
  // 👇 Scroll suave para o topo ao carregar
  useEffect(() => {
    if (scrollToTopOnMount) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [scrollToTopOnMount]);

  return (
    <div className="bloco_principal">
      <Maintexts>
        <section id='ETP1T6'/>
        <Headlines variant="black">
           Nós enviamos para<br/> sua  casa tudo que você<br/> precisa para trabalhar
        </Headlines>

        <Paragraphs variant="black">
          Como o trabalho é Home Office, assim que você é contratado(a), nós enviamos para sua casa todos os equipamentos necessários.
        </Paragraphs>
      </Maintexts>

      <Continuity variant="black">
        Tudo é entregue com Frete Grátis diretamente na sua casa, isso inclui:
      </Continuity>

      <VideoBlock
        provider="html5"
        src={introVideo}
        autoplay
        muted
        loop
        controls={false}
        w="w-[100%]"
        h="h-[59vw]"
        className="mx-auto my-8"
      />

      {/* Lista de equipamentos */}
      <ListTopics topics={equipamentosTopics} withDescription={false} enableDrawer={false} />

      {/* Card de alerta */}
      <ExplanatoryCards supportTypes={alerts} variant="alert" />
    </div>
  );
};

export default EquipmentInfoStep; 