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
      description: 'Você lê a mensagem e consulta uma resposta. O sistema mostra roteiros com respostas prontas pra te ajudar a responder mais rápido.'
    },
    {
      title: 'Copia, ajusta (se precisar) e envia.',
      description: 'Você pode adaptar o texto pronto ou enviar diretamente conforme o caso.'
    },
    {
      title: 'O atendimento termina assim que o cliente ficar satisfeito',
      description: 'Depois que a resposta é enviada e validada, o chamado é fechado automaticamente no sistema.'
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
        <section id='ETP1T5'/>
        <Headlines variant="black">
          Entenda na prática<br/> como o atendimento<br/> funciona
        </Headlines>

        <Paragraphs variant="black">
          As empresas que contratam a TaskUs<br/> recebem milhares de mensagens por<br/> dia, e por isso precisam da gente para<br/> manter o padrão de qualidade no<br/> suporte ao cliente.
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