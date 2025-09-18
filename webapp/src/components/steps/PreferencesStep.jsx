import { Label } from '@/components/ui/label.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Settings, Crown, Zap, Shield, Bell, Mail, Heart, Gamepad2, Music, Camera } from 'lucide-react';
import '../../styles/refino.css';

const PreferencesStep = ({ data, updateData, errors }) => {
  const handlePlanChange = (value) => {
    updateData({ plan: value });
  };

  const handleCheckboxChange = (field, checked) => {
    updateData({ [field]: checked });
  };

  const handleInterestToggle = (interest) => {
    const currentInterests = data.interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(item => item !== interest)
      : [...currentInterests, interest];
    
    updateData({ interests: updatedInterests });
  };

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      description: 'Funcionalidades essenciais',
      price: 'Gratuito',
      icon: Shield,
      features: ['Acesso básico', 'Suporte por email', '1 projeto']
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Recursos avançados',
      price: 'R$ 29/mês',
      icon: Crown,
      features: ['Acesso completo', 'Suporte prioritário', 'Projetos ilimitados', 'Analytics avançado']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Para empresas',
      price: 'R$ 99/mês',
      icon: Zap,
      features: ['Tudo do Premium', 'API personalizada', 'Suporte 24/7', 'Integração customizada']
    }
  ];

  const interests = [
    { id: 'technology', name: 'Tecnologia', icon: Settings },
    { id: 'gaming', name: 'Games', icon: Gamepad2 },
    { id: 'music', name: 'Música', icon: Music },
    { id: 'photography', name: 'Fotografia', icon: Camera },
    { id: 'lifestyle', name: 'Estilo de Vida', icon: Heart }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-3">Suas Preferências</h1>
        <p className="font-hendrix-regular text-gray-600 text-sm leading-relaxed">
          Escolha o plano e configure suas preferências
        </p>
      </div>

      {/* Seleção de Plano */}
      <div className="space-y-4">
        <Label className="font-hendrix-medium text-lg text-gray-800">Escolha seu plano *</Label>
        <RadioGroup
          value={data.plan}
          onValueChange={handlePlanChange}
          className="space-y-3"
        >
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div key={plan.id} className="flex items-center space-x-3">
                <RadioGroupItem value={plan.id} id={plan.id} />
                <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                  <Card className={`transition-colors rounded-xl ${data.plan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-hendrix-semibold text-lg text-gray-800">{plan.name}</h3>
                            <span className="font-hendrix-bold text-blue-600">{plan.price}</span>
                          </div>
                          <p className="font-hendrix-regular text-sm text-gray-600 mb-3">{plan.description}</p>
                          <ul className="font-hendrix-light text-sm text-gray-600 space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        {errors.plan && (
          <p className="font-hendrix-regular text-sm text-red-500 bg-red-50 p-3 rounded-lg">{errors.plan}</p>
        )}
      </div>

      {/* Preferências de Notificação */}
      <div className="space-y-4">
        <Label className="font-hendrix-medium text-lg text-gray-800">Notificações</Label>
        <div className="space-y-4 bg-gray-50 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="notifications"
              checked={data.notifications}
              onCheckedChange={(checked) => handleCheckboxChange('notifications', checked)}
              className="w-5 h-5"
            />
            <Label htmlFor="notifications" className="flex items-center space-x-3 cursor-pointer font-hendrix-regular text-gray-700">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Receber notificações push</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="newsletter"
              checked={data.newsletter}
              onCheckedChange={(checked) => handleCheckboxChange('newsletter', checked)}
              className="w-5 h-5"
            />
            <Label htmlFor="newsletter" className="flex items-center space-x-3 cursor-pointer font-hendrix-regular text-gray-700">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>Receber newsletter por email</span>
            </Label>
          </div>
        </div>
      </div>

      {/* Interesses */}
      <div className="space-y-4">
        <Label className="font-hendrix-medium text-lg text-gray-800">Seus Interesses</Label>
        <p className="font-hendrix-regular text-sm text-gray-600 leading-relaxed">
          Selecione os tópicos que mais te interessam
        </p>
        <div className="grid grid-cols-2 gap-3">
          {interests.map((interest) => {
            const IconComponent = interest.icon;
            const isSelected = data.interests?.includes(interest.id);
            
            return (
              <Card
                key={interest.id}
                className={`cursor-pointer transition-colors rounded-xl ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleInterestToggle(interest.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-hendrix-medium text-sm text-gray-700">{interest.name}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="text-sm text-gray-500 font-hendrix-light bg-gray-50 p-3 rounded-lg text-center">
        * Campos obrigatórios
      </div>
    </div>
  );
};

export default PreferencesStep;

