import { Check } from 'lucide-react';
import { useEffect } from 'react';
import '../../styles/refino.css';

import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import Continuity from "../modules/Continuity";
import VerifiedList from "../modules/VerifiedList";

const WhatYouWillDoStep = ({ scrollToTopOnMount = true }) => {
  // 👇 Faz a tela subir ao abrir o componente
  useEffect(() => {
    if (scrollToTopOnMount) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [scrollToTopOnMount]);

  const resources = [
    {
      title: 'Sistema do Colaborador',
      description:
        'Esse sistema é uma das suas principais ferramentas de trabalho, é nele que você poderá atender os clientes, visualizar suas tarefas e acompanhar metas.'
    },
    {
      title: 'Roteiros Prontos',
      description:
        'Dentro do sistema, você terá acesso a roteiros de atendimento prontos e organizados para as perguntas e dúvidas mais comuns dos clientes.'
    },
    {
      title: 'Gerente de Equipe',
      description:
        'Em caso de dificuldade, você poderá entrar em contato com o seu gerente de equipe. Ele sempre estará disponível para te ajudar caso você precise.'
    }
  ];

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">
          O que faz um atendente de suporte ao cliente?
        </Headlines>

        <Paragraphs variant="black">
          Como atendente, você será responsável por ajudar os clientes das empresas
          parceiras da TaskUs a resolver problemas e esclarecer dúvidas.
        </Paragraphs>
      </Maintexts>

      <Continuity variant="black">
        O trabalho é simples e você não precisa se preocupar em “saber tudo”, pois você
        terá acesso a:
      </Continuity>

      <VerifiedList resources={resources} />
    </div>
  );
};

export default WhatYouWillDoStep;