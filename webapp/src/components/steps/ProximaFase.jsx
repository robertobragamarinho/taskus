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
        "De 17/10 a 19/12, a equipe de RH atua em turnos especiais para atender à alta demanda de contratações. Todos os candidatos são avaliados 24 horas por dia."
    }
  ];

  return (
    <div className="bloco_principal">
      <Maintexts>
        <section id='ETP1T8'/>
        <Headlines variant="black">
          Pronto! Você chegou <br/>até aqui, e isso já mostra<br/> muito sobre você.
        </Headlines>

        <Paragraphs variant="black">
          Agora vamos fazer a entrevista online. Essa etapa é rápida e muito simples.
        </Paragraphs>
      </Maintexts>

      {/* Cards explicativos */}
      <ExplanatoryCards supportTypes={supportTypes} />
    </div>
  );
};

export default ProximaFase;