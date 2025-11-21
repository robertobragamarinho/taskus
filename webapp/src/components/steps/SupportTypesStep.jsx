import { useState } from 'react';
import { useTranslations } from '../../lib/translations.js';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import '../../styles/refino.css';

const SupportTypesStep = ({ formData, updateFormData, errors = {} }) => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  
  const [selectedSupportType, setSelectedSupportType] = useState(
    formData.supportPreferences?.selectedType || ''
  );

  const handleSupportTypeChange = (type) => {
    setSelectedSupportType(type);
    updateFormData('supportPreferences', {
      selectedType: type
    });
  };

  const supportTypes = [
    {
      id: 'phone',
      icon: Phone,
      title: t.phoneSupport,
      labels: [
        { text: 'SemiBold', color: 'bg-red-500' },
        { text: '10pt', color: 'bg-gray-600' }
      ],
      description: t.phoneSupportDescription
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: t.whatsappSupport,
      labels: [
        { text: 'Light', color: 'bg-green-500' },
        { text: '8pt', color: 'bg-gray-600' }
      ],
      description: t.whatsappSupportDescription
    },
    {
      id: 'email',
      icon: Mail,
      title: t.emailSupport,
      labels: [],
      description: t.emailSupportDescription
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-hendrix-semibold text-2xl text-gray-900 mb-3">
          {t.supportTypesTitle}
        </h1>
        <p className="font-hendrix-regular text-gray-600 text-sm leading-relaxed">
          {t.supportTypesSubtitle}
        </p>
      </div>

      {/* Support Types List */}
      <div className="space-y-4">
        {supportTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <div
              key={type.id}
              className={`
                relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${selectedSupportType === type.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
              onClick={() => handleSupportTypeChange(type.id)}
            >
              {/* Icon */}
              <div className="flex items-start gap-4">
                <div className={`
                  p-3 rounded-lg
                  ${type.id === 'phone' ? 'bg-blue-100 text-blue-600' : ''}
                  ${type.id === 'whatsapp' ? 'bg-green-100 text-green-600' : ''}
                  ${type.id === 'email' ? 'bg-purple-100 text-purple-600' : ''}
                `}>
                  <IconComponent size={24} />
                </div>
                
                <div className="flex-1">
                  {/* Title and Labels */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-hendrix-semibold text-lg text-blue-600">
                      {type.title}
                    </h3>
                    {type.labels.map((label, index) => (
                      <span
                        key={index}
                        className={`
                          px-2 py-1 rounded text-white text-xs font-hendrix-medium
                          ${label.color}
                        `}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>
                  
                  {/* Description */}
                  <p className="font-hendrix-regular text-sm text-gray-600 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>

              {/* Selection indicator */}
              {selectedSupportType === type.id && (
                <div className="absolute top-6 right-6">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Error message */}
      {errors.supportType && (
        <div className="text-red-500 text-sm font-hendrix-regular text-center bg-red-50 p-3 rounded-lg">
          {errors.supportType}
        </div>
      )}
    </div>
  );
};

export default SupportTypesStep;
