import { Star } from 'lucide-react';
import '../../styles/refino.css';

const ProximaFase = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-hendrix-semibold text-gray-900" style={{ fontSize: '14pt', lineHeight: 1.2 }}>
          Pronto! Você já sabe como tudo funciona, vamos para a próxima fase.
        </h1>
        <p className="mt-3 text-gray-600 font-hendrix-regular" style={{ fontSize: '9pt' }}>
          Agora vamos iniciar a entrevista online para conhecer melhor o seu perfil. Ao final você saberá se será contratado(a) para fazer parte da equipe TaskUs.
        </p>
      </div>

      {/* Cards informativos */}
      <div className="space-y-4">
        <div className="rounded-xl p-4" style={{ backgroundColor: '#f3f6f9' }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ backgroundColor: '#e6f0ff' }}>
                <Star className="w-5 h-5" style={{ color: '#1655ff' }} />
              </div>
            </div>
            <div className="flex-1 text-sm text-gray-700" style={{ fontSize: '10pt' }}>
              A entrevista é totalmente online você não irá precisar falar com ninguém, mas cada resposta é revisada pela nossa equipe de RH em tempo real.
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: '#f3f6f9' }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ backgroundColor: '#e6f0ff' }}>
                <Star className="w-5 h-5" style={{ color: '#1655ff' }} />
              </div>
            </div>
            <div className="flex-1 text-sm text-gray-700" style={{ fontSize: '10pt' }}>
              De 01/09 a 30/09, a equipe de RH estará em turnos especiais para atender a alta demanda de contratações. Nesse período, todos os candidatos serão avaliados 24 horas por dia.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProximaFase;
