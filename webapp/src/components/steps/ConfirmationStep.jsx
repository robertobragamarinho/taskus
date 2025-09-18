import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { CheckCircle, User, Settings, Crown, Shield, Zap, Heart, Gamepad2, Music, Camera } from 'lucide-react';
import '../../styles/refino.css';

const ConfirmationStep = ({ formData }) => {
  const { personalInfo, preferences } = formData;

  // Mapear planos para exibição
  const planNames = {
    basic: { name: 'Básico', icon: Shield, price: 'Gratuito' },
    premium: { name: 'Premium', icon: Crown, price: 'R$ 29/mês' },
    enterprise: { name: 'Enterprise', icon: Zap, price: 'R$ 99/mês' }
  };

  // Mapear interesses para exibição
  const interestNames = {
    technology: { name: 'Tecnologia', icon: Settings },
    gaming: { name: 'Games', icon: Gamepad2 },
    music: { name: 'Música', icon: Music },
    photography: { name: 'Fotografia', icon: Camera },
    lifestyle: { name: 'Estilo de Vida', icon: Heart }
  };

  const selectedPlan = planNames[preferences.plan];
  const selectedInterests = preferences.interests?.map(id => interestNames[id]).filter(Boolean) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-3">Confirme seus Dados</h1>
        <p className="font-hendrix-regular text-gray-600 text-sm leading-relaxed">
          Revise as informações antes de enviar o formulário
        </p>
      </div>

      {/* Informações Pessoais */}
      <Card className="rounded-xl border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="font-hendrix-semibold flex items-center gap-3 text-lg text-gray-800">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-hendrix-medium text-sm text-gray-500">Nome:</span>
              <p className="font-hendrix-regular text-gray-800 mt-1">{personalInfo.firstName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-hendrix-medium text-sm text-gray-500">Sobrenome:</span>
              <p className="font-hendrix-regular text-gray-800 mt-1">{personalInfo.lastName}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="font-hendrix-medium text-sm text-gray-500">Email:</span>
            <p className="font-hendrix-regular text-gray-800 mt-1">{personalInfo.email}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="font-hendrix-medium text-sm text-gray-500">Telefone:</span>
            <p className="font-hendrix-regular text-gray-800 mt-1">{personalInfo.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Preferências */}
      <Card className="rounded-xl border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="font-hendrix-semibold flex items-center gap-3 text-lg text-gray-800">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-green-600" />
            </div>
            Preferências
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Plano Selecionado */}
          <div>
            <span className="font-hendrix-medium text-sm text-gray-500 mb-3 block">Plano Escolhido:</span>
            {selectedPlan && (
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <selectedPlan.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-hendrix-semibold text-gray-800">{selectedPlan.name}</p>
                  <p className="font-hendrix-regular text-sm text-gray-600">{selectedPlan.price}</p>
                </div>
              </div>
            )}
          </div>

          {/* Notificações */}
          <div>
            <span className="font-hendrix-medium text-sm text-gray-500 mb-3 block">Notificações:</span>
            <div className="flex flex-wrap gap-2">
              {preferences.notifications && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 font-hendrix-medium">
                  Notificações Push
                </Badge>
              )}
              {preferences.newsletter && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 font-hendrix-medium">
                  Newsletter por Email
                </Badge>
              )}
              {!preferences.notifications && !preferences.newsletter && (
                <span className="font-hendrix-regular text-sm text-gray-500">Nenhuma notificação selecionada</span>
              )}
            </div>
          </div>

          {/* Interesses */}
          <div>
            <span className="font-hendrix-medium text-sm text-gray-500 mb-3 block">Interesses:</span>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.length > 0 ? (
                selectedInterests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700 font-hendrix-medium">
                    <interest.icon className="w-3 h-3" />
                    {interest.name}
                  </Badge>
                ))
              ) : (
                <span className="font-hendrix-regular text-sm text-gray-500">Nenhum interesse selecionado</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Final */}
      <Card className="border-green-200 bg-green-50 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-hendrix-semibold text-lg text-green-800 mb-2">Tudo pronto!</h3>
              <p className="font-hendrix-regular text-sm text-green-700 leading-relaxed">
                Seus dados foram preenchidos corretamente. Clique em "Enviar" para finalizar o cadastro.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-gray-500 text-center font-hendrix-light bg-gray-50 p-4 rounded-lg">
        Ao enviar este formulário, você concorda com nossos termos de uso e política de privacidade.
      </div>
    </div>
  );
};

export default ConfirmationStep;

