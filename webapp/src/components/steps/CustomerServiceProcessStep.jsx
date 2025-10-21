import '../../styles/refino.css';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";
import ListTopics from "../modules/ListTopics";
import VerifiedList from "../modules/VerifiedList";
import { IconBullet } from "../modules/SvgIcons";
import { useEffect } from "react"; // 👈 importa o hook

const CustomerServiceProcessStep = () => {
  // 👇 sobe a tela pro topo quando entra nessa página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const serviceTypes = [
    'Pedidos com atraso',
    'Trocas ou devoluções',
    'Cancelamentos',
    'Informações sobre produtos'
  ];

  const routineSteps = [
    {
      title: 'O cliente abre o atendimento',
      description: 'Você receberá as solicitações dos clientes diretamente no sistema da empresa.'
    },
    {
      title: 'Você lê e consulta uma resposta',
      description: 'O sistema já traz sugestões de respostas para agilizar seu atendimento.'
    },
    {
      title: 'Copia, ajusta (se precisar) e envia.',
      description: 'Você pode adaptar o texto pronto ou enviar diretamente conforme o caso.'
    },
    {
      title: 'O atendimento finaliza assim que que o problema for resolvido.',
      description: 'Após a resposta ser enviada e validada, o chamado é fechado automaticamente.'
    }
  ];

  // Mapeia os arrays simples para objetos
  const serviceTopics = serviceTypes.map((item) => ({
    icon: IconBullet,
    label: item
  }));

  const routineTopics = routineSteps.map((item) => ({
    title: item // apenas título, sem descrição
  }));

  return (
    <div className="bloco_principal">
      
      <Maintexts>
        <Headlines variant="black">
          Como funcionam os atendimentos?
        </Headlines>

        <Paragraphs variant="black">
          As grandes empresas que nos contratam possuem alta demanda de suporte ao cliente e,
          para manter a qualidade do atendimento, elas contam com a TaskUs como parceira
          especializada.
        </Paragraphs>
      </Maintexts>

      <Continuity variant="black">
        Você vai receber mensagens de clientes sobre esses assuntos:
      </Continuity>

      {/* Lista de tipos de atendimento */}
      <ListTopics topics={serviceTopics} />

      <Continuity variant="black">
        Sua rotina será assim:
      </Continuity>

      {/* Lista da rotina com checkmarks */}
      <VerifiedList resources={routineSteps} withDescription />

    </div>
  );
};

export default CustomerServiceProcessStep;