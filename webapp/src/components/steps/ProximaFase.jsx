import { Star } from 'lucide-react';
import '../../styles/refino.css';

const ProximaFase = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        
        <h1
          className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
          style={{ fontSize: '12pt', lineHeight: '1.2' }}
        >
          <span className="block sm:inline">
            Pronto! Você já sabe como tudo funciona, vamos para a próxima fase.
          </span>
        </h1>


        <p className="mt-3 text-gray-600 font-hendrix-regular" style={{ fontSize: '9pt' }}>
          Agora vamos iniciar a entrevista online para conhecer melhor o seu perfil. Ao final você saberá se será contratado(a) para fazer parte da equipe VagaCerta.
        </p>
      </div>

      {/* Cards informativos - estrela em cima, texto embaixo, ambos alinhados à esquerda */}
      <div className="flex flex-col gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl px-6 py-5" style={{ background: '#f3f6f9', minHeight: 90 }}>
          <div className="flex flex-col items-start">
            <div className="mb-2">
              <div className="w-9 h-9 rounded-md flex items-center justify-center mb-5" style={{ backgroundColor: '#e6f0ff' }}>
                <Star className="w-5 h-5" style={{ color: '#1655ff' }} />
              </div>
            </div>
            <div className="text-sm text-gray-700" style={{ fontSize: '10pt', textAlign: 'left' }}>
              A entrevista é totalmente online você não irá precisar falar com ninguém, mas cada resposta é revisada pela nossa equipe de RH em tempo real.
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="rounded-2xl px-6 py-5" style={{ background: '#f3f6f9', minHeight: 90 }}>
          <div className="flex flex-col items-start">
            <div className="mb-2">
              <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ backgroundColor: '#e6f0ff' }}>
                <Star className="w-5 h-5 mb-5" style={{ color: '#1655ff' }} />
              </div>
            </div>
            <div className="text-sm text-gray-700" style={{ fontSize: '10pt', textAlign: 'left' }}>
              De 01/09 a 30/09, a equipe de RH estará em turnos especiais para atender a alta demanda de contratações. Nesse período, todos os candidatos serão avaliados 24 horas por dia.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProximaFase;
