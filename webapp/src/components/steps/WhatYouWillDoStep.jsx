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
        'Esse sistema é sua principal ferramenta de trabalho, é nele que você vai visualizar suas tarefas, acompanhar metas e atender os clientes.'
    },
    {
      title: 'Roteiros Prontos',
      description:
        'Dentro do sistema, você vai ter acesso a roteiros de atendimento prontos com as dúvidas mais comuns dos clientes para te ajudar a atender.'
    },
    {
      title: 'Gerente de Equipe',
      description:
        'Caso você tenha dificuldade, poderá entrar em contato com o seu gerente de equipe. Ele sempre estará disponível para te ajudar.'
    }
  ];

  return (
    <div className="bloco_principal">
      <Maintexts>
        <section id='ETP1T3'/>
        <Headlines variant="black">
          O que faz um atendente<br/> de suporte ao cliente?
        </Headlines>

        <Paragraphs variant="black">
          Como atendente, você vai ajudar os<br/> clientes das empresas que contratam a<br/> TaskUs. Sua função é responder dúvidas<br/> e ajudar o cliente até ele conseguir o<br/> que precisa.
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