import { Star } from 'lucide-react';
import { useEffect } from 'react';
import '../../styles/refino.css';

const ProximaFase = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div>
        
        <h1
          className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
          style={{ fontSize: '12pt', lineHeight: '1.2' }}
        >
          <span className="block sm:inline">
            Quer fazer parte da família TaskUs? Inicie agora o processo seletivo online
          </span>
        </h1>


        <p className="mt-3 subtitulodaetapa text-gray-600 font-hendrix-regular" style={{ fontSize: '9pt' }}>
          Vamos passar por algumas etapas de seleção. e ao final, você saberá se foi selecionado(a) para trabalhar com a gente.
        </p>
      </div>

      {/* Cards informativos - estrela em cima, texto embaixo, ambos alinhados à esquerda */}
      <div className="flex flex-col gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl px-6 py-5" style={{ background: '#f3f6f9', minHeight: 90 }}>
          <div className="flex flex-col items-start">
            <div className="mb-2">
              <div className="w-15 h-15 mb-0 mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1655ff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M15.153 4.284c-1.174-.436-1.695-2.18-3.033-2.28a2 2 0 0 0-.24 0c-1.337.1-1.858 1.844-3.032 2.28c-1.243.461-2.943-.484-3.995.568c-1.013 1.013-.117 2.778-.569 3.995c-.461 1.245-2.393 1.76-2.28 3.273c.101 1.337 1.845 1.859 2.28 3.033c.452 1.217-.444 2.982.569 3.995c1.052 1.052 2.752.107 3.995.568c1.173.436 1.695 2.18 3.033 2.28q.12.009.239 0c1.338-.1 1.86-1.844 3.033-2.28c1.217-.451 2.982.445 3.995-.568c1.087-1.087.04-2.85.614-4.106c.53-1.156 2.344-1.698 2.234-3.161c-.1-1.338-1.843-1.86-2.28-3.034c-.46-1.243.484-2.942-.568-3.995s-2.752-.107-3.995-.568"/><path d="M12.242 16v-4c0-.471 0-.707-.146-.854c-.147-.146-.382-.146-.854-.146m.75-3h.01"/>
                  </svg>
               </div>
            </div>
            <div className="text-sm mb-5 text-gray-700" style={{ fontSize: '10pt', textAlign: 'left' }}>
              A entrevista é totalmente online você não irá precisar falar com ninguém, mas cada resposta é revisada pela nossa equipe de RH em tempo real.
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="rounded-2xl px-6 py-5" style={{ background: '#f3f6f9', minHeight: 90 }}>
          <div className="flex flex-col items-start">
            <div className="mb-2">
              <div className="w-15 h-15 mb-0 mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1655ff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M8.376 3q-.322.12-.631.261m12.973 13.04q.153-.332.282-.676m-2.501 3.74q.258-.24.497-.499m-3.727 2.506q.291-.11.573-.237m-3.686.859q-.346.012-.694 0m-3.675-.854q.272.123.551.228m-3.665-2.447q.204.217.423.422m-2.463-3.678q.113.296.243.583m-.871-3.743a10 10 0 0 1 0-.626m.62-3.142q.111-.293.24-.577m1.791-2.68q.217-.232.449-.449M13.5 12a1.5 1.5 0 1 1-1.5-1.5m1.5 1.5a1.5 1.5 0 0 0-1.5-1.5m1.5 1.5H16m-4-1.5V6m10 6c0-5.523-4.477-10-10-10" color="currentColor"/></svg>
               </div>
            </div>
            <div className="text-sm mb-5 text-gray-700" style={{ fontSize: '10pt', textAlign: 'left' }}>
              De 01/10 a 30/190, a equipe de RH está em turnos especiais para atender a alta demanda de contratações. Nesse período, todos os candidatos serão avaliados 24 horas por dia.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProximaFase;
