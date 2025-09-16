import { useState, useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import '../../styles/refino.css';

const EquipmentInfoStep = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dados dos equipamentos
  const equipment = [
    {
      name: 'Notebook Inspiron 15',
      model: 'Modelo 3567',
      image: '/api/placeholder/280/200'
    },
    {
      name: 'Monitor Dell',
      model: 'Modelo S2422HZ',
      image: '/api/placeholder/280/200'
    },
    {
      name: 'Webcam Logitech',
      model: 'Modelo C920',
      image: '/api/placeholder/280/200'
    },
    {
      name: 'Headset Wireless',
      model: 'Modelo H600',
      image: '/api/placeholder/280/200'
    }
  ];

  const autoSlideRef = useRef(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % equipment.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  // Auto-slide do carrossel
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment.length]);

  // Swipe / drag support
  const [dragStartX, setDragStartX] = useState(null);
  const [dragStartY, setDragStartY] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    setDragStartX(t.clientX);
    setDragStartY(t.clientY);
    setDragging(true);
    // pause autoplay while interacting
    stopAutoSlide();
  };

  const handleTouchMove = () => {
    if (!dragging || dragStartX === null || dragStartY === null) return;
    // Intentionally empty: we avoid calling preventDefault here because the browser may
    // use a passive listener which would trigger a warning. The container uses
    // `touch-action: pan-y` (see element style) so vertical scrolling is allowed while
    // horizontal swipes still work. If stricter control is needed later, attach a
    // non-passive listener to the element via a ref.
  };

  const handleTouchEnd = (e) => {
    if (dragStartX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = dragStartX - endX;
    const threshold = 50; // px required to change slide
    if (diff > threshold) {
      // swipe left -> next
      setCurrentSlide((prev) => (prev + 1) % equipment.length);
    } else if (diff < -threshold) {
      // swipe right -> prev
      setCurrentSlide((prev) => (prev - 1 + equipment.length) % equipment.length);
    }
    setDragStartX(null);
    setDragStartY(null);
    setDragging(false);
    // restart autoplay
    startAutoSlide();
  };

  // Mouse drag for desktop
  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
    setDragging(true);
    stopAutoSlide();
  };

  const handleMouseMove = () => {
    // noop: we don't need continuous move handling for now
  };

  const handleMouseUp = (e) => {
    if (!dragging || dragStartX === null) return;
    const endX = e.clientX;
    const diff = dragStartX - endX;
    const threshold = 50;
    if (diff > threshold) {
      setCurrentSlide((prev) => (prev + 1) % equipment.length);
    } else if (diff < -threshold) {
      setCurrentSlide((prev) => (prev - 1 + equipment.length) % equipment.length);
    }
    setDragStartX(null);
    setDragging(false);
    // restart autoplay
    startAutoSlide();
  };

  return (
    <div className="space-y-6">
      {/* Título principal */}
      <div className="mb-6">
        

        <h1
          className="titulodaetapa font-hendrix-semibold text-gray-900 mb-4"
          style={{ fontSize: '12pt', lineHeight: '1.2' }}
        >
          <span className="block sm:inline">
            A TaskUS envia tudo o que você precisa para trabalhar
          </span>
        </h1>

        {/* Texto descritivo */}
        <p className="subtitulodaetapa font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
          Como o trabalho é Home Office, assim que você é contratado(a) nós enviamos para sua casa  todos equipamentos necessários para trabalhar.
        </p>

        <p className="subtituloemdestaque font-hendrix-bold text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
          Você não paga nada, tudo é entregue com frete grátis diretamente na sua casa.
        </p>

        <p className="textocontinuidade font-hendrix-regular text-gray-600 mb-6" style={{ fontSize: '9pt' }}>
          Isso inclui:
        </p>
      </div>

      {/* Carrossel de equipamentos */}
      <div className="relative mb-8">
        <div
          className="rounded-xl p-6 overflow-hidden"
          style={{ backgroundColor: '#f3f3f3' }}
        >
          <div
            className="relative h-64"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ touchAction: 'pan-y' }}
          >
            {equipment.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {/* Imagem do equipamento */}
                  <div className="w-48 h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gray-300 rounded-lg items-center justify-center">
                      <span className="text-gray-500 text-sm">Equipamento</span>
                    </div>
                  </div>

                  {/* Nome e modelo */}
                  <div className="text-center">
                    <h3
                      className="font-hendrix-medium text-gray-900 mb-1"
                      style={{ fontSize: '9pt' }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="font-hendrix-regular"
                      style={{
                        fontSize: '7pt',
                        color: '#969696'
                      }}
                    >
                      {item.model}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores do carrossel */}
          <div className="flex justify-center space-x-2 mt-4">
            {equipment.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card de aviso */}
      <div
        className="border-1 border-red-400 rounded-xl p-8"
        style={{ backgroundColor: '#fff' }}
      >
        <div className="flex items-start space-x-3">
          {/* Ícone de warning */}
          <AlertTriangle className="w-9 h-9 text-red-500 flex-shrink-0 mt-0" />

          {/* Conteúdo */}
          <div className="flex-1">
            <h3
              className="font-hendrix-semibold text-red-600 mb-0"
              style={{ fontSize: '10pt' }}
            >
              ATENÇÃO
            </h3>
            <p
              className="font-hendrix-medium text-gray-700"
              style={{ fontSize: '8pt' }}
            >
              Todos os equipamentos enviados são de propriedade da TaskUs e devem ser usados exclusivamente para o trabalho. Cuide deles como se fossem seus e, em caso de desligamento, será necessário devolvê-los.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentInfoStep;
