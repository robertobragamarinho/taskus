import '../../styles/refino.css';
import Headlines from "../modules/Headlines";
import Paragraphs from "../modules/Paragraphs";
import Maintexts from "../modules/Main-texts";
import LoadingBar from "../modules/LoadingBar";
import Continuity from "../modules/Continuity";

const LoadingStep = ({ onComplete }) => {
  // Defina o tempo total aqui (ms)
  const totalDurationMs = 1230000; // ~33m22s

  // Mensagens rotativas para o Paragraphs (modo variável)
  const messages = [
    "Estamos contratando pessoas comprometidas, com vontade de crescer, e que estejam prontas para mudar de vida através do trabalho.",
    "Reserve de 5 a 10 minutos agora para completar o processo seletivo. Ao final, você saberá se foi aprovado(a) para dar início imediato.",
    "Durante as etapas, você vai entender como funciona o trabalho, o que será oferecido e quais são os passos obrigatórios até a contratação final.",
    "Você está prestes a dar o primeiro passo rumo a uma nova fase da sua vida."
  ];

  return (
    <div className="bloco_principal">

      <Maintexts>
        <Headlines variant="black">
          Processo seletivo<br/> TaskUs Brasil 2025
        </Headlines>

        <Paragraphs
          variable
          variant="black"
          messages={messages}
          minHeight="90px"
        />
      </Maintexts>

      <Continuity variant="black">
        Clique em continuar, para iniciar<br/> a primeira etapa do processo seletivo.
      </Continuity>

    </div>
  );
};

export default LoadingStep;