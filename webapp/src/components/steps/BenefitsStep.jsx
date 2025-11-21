import { useState, useEffect } from 'react';
import '../../styles/refino.css';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import ListTopics from "../modules/ListTopics";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon6,
  Icon7,
} from "../modules/SvgIcons";

const PreferencesStep = () => {
  // 👇 Faz a tela rolar para o topo quando o componente é montado
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const benefits = [
    {
      name: 'Vale alimentação',
      value: 'R$450,00 por mês',
      icon: Icon1,
      hint:
        'Quem trabalha com a gente recebe R$450,00 por mês em vale-alimentação, além do salário fixo de R$2.450,00. O valor é depositado em um cartão exclusivo, que você pode usar livremente em padarias, mercados, mercearias ou restaurantes. E o melhor: se sobrar saldo no fim do mês, ele acumula! Ou seja, em dois meses, você pode ter R$900,00 disponíveis no seu cartão.'
    },
    {
      name: 'Plano de saúde',
      value: '70% pago pela empresa',
      icon: Icon2,
      hint:
        'Todos os colaboradores da TaskUs têm direito a um plano de saúde completo, com 70% do valor custeado pela empresa. Os 30% restantes são descontados diretamente do salário. Esse benefício garante acesso a consultas médicas, exames laboratoriais, atendimentos de urgência e internações em hospitais da rede credenciada, oferecendo mais segurança e tranquilidade para você e sua família.'
    },
    {
      name: 'Plano odontológico',
      value: '70% pago pela empresa',
      icon: Icon3,
      hint:
        'Quem trabalha com a gente tem acesso a um plano odontológico completo, com 70% do valor pago pela TaskUs. Você pode usar o benefício para consultas, limpezas, restaurações e outros cuidados com a saúde do seu sorriso. Tudo em clínicas credenciadas e de qualidade.'
    },
    {
      name: 'Trabalho semanal',
      value: 'De segunda a sexta-feira',
      icon: Icon4,
      hint:
        'Na TaskUs, a carga horária é organizada em um modelo tradicional, de segunda a sexta-feira, com 8 horas de trabalho por dia.'
    },
    {
      name: 'Férias remuneradas',
      value: '1 vez por ano',
      icon: Icon6,
      hint:
        'Todos os colaboradores da TaskUs têm direito a férias remuneradas uma vez por ano, conforme previsto pela legislação trabalhista. Durante esse período, o profissional continua recebendo seu salário normalmente, garantindo descanso e recuperação sem comprometer sua renda.'
    },
    {
      name: 'Home Office',
      value: 'Trabalhe de sua casa',
      icon: Icon7,
      hint:
        'Na TaskUs, acreditamos que pessoas felizes trabalham melhor. Por isso, nossas vagas são 100% home office pra que você possa trabalhar com conforto e mais liberdade no seu dia a dia.'
    }
  ];

  return (
    <div className="bloco_principal">
      <Maintexts>
        <section id='ETP1T7'/>
        <Headlines variant="black">
           Aqui o seu esforço<br/> é recompensado de<br/> verdade
        </Headlines>

        <Paragraphs variant="black">
          Além de um salário justo, você<br/>  recebe benefícios que garantem<br/>  mais conforto e segurança no seu<br/>  dia a dia.
        </Paragraphs>
      </Maintexts>

      <ListTopics topics={benefits} withDescription />
    </div>
  );
};

export default PreferencesStep;