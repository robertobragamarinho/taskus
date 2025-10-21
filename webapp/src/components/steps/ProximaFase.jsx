import { useState, useEffect, useRef } from 'react';
import '../../styles/refino.css';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import ExplanatoryCards from "../modules/ExplanatoryCards";
import { IconInfo, IconClock } from "../modules/SvgIcons";

const ProximaFase = () => {
  // 👇 Faz a tela rolar para o topo ao montar o componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const supportTypes = [
    {
      id: 1,
      icon: IconInfo,
      title: "Entrevista Online",
      description:
        "A entrevista é totalmente online. Você não precisa falar com ninguém, mas cada resposta é revisada pela equipe de RH em tempo real."
    },
    {
      id: 2,
      icon: IconClock,
      title: "Avaliação 24h",
      description:
        "De 01/10 a 30/10, a equipe de RH atua em turnos especiais para atender à alta demanda de contratações. Todos os candidatos são avaliados 24 horas por dia."
    }
  ];

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">
          Pronto! Você já sabe como funciona.
        </Headlines>

        <Paragraphs variant="black">
          Agora vamos começar sua entrevista para te conhecer melhor. Ao final, você descobrirá se foi selecionado(a) para fazer parte da equipe Taskus.
        </Paragraphs>
      </Maintexts>

      {/* Cards explicativos */}
      <ExplanatoryCards supportTypes={supportTypes} />
    </div>
  );
};

export default ProximaFase;