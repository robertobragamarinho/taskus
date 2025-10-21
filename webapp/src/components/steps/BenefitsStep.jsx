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
        'Todos os colaboradores da TaskUs recebem R$450,00 por mês em vale-alimentação, além do salário de R$2.400,00. O benefício é entregue em um cartão próprio, que deve ser ativado pelo colaborador e pode ser utilizado em padarias, supermercados, mercearias e restaurantes . O saldo é acumulativo: se não for utilizado em um mês, soma-se ao valor do mês seguinte — por exemplo, ao final de dois meses o colaborador poderá contar com R$900,00 disponíveis.'
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
        'Todos os colaboradores da TaskUs têm acesso a um plano odontológico, com 70% do valor custeado pela empresa e 30% descontado do salário. O benefício inclui consultas de rotina, limpezas, restaurações, extrações, tratamentos de canal e outros procedimentos na rede credenciada. Dessa forma, o colaborador tem a tranquilidade de cuidar da saúde bucal com qualidade e menor custo.'
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
        'O modelo de trabalho remoto oferece praticidade e conforto, com equipamentos fornecidos pela TaskUs e suporte técnico especializado. Assim, você desempenha suas atividades em casa com segurança, foco e total eficiência.'
    }
  ];

  return (
    <div className="bloco_principal">
      <Maintexts>
        <Headlines variant="black">
          Esses são os benefícios de trabalhar na TaskUs
        </Headlines>

        <Paragraphs variant="black">
          Além de um salário justo, você conta com benefícios essenciais para o bem-estar de todo trabalhador.
        </Paragraphs>
      </Maintexts>

      <ListTopics topics={benefits} withDescription />
    </div>
  );
};

export default PreferencesStep;