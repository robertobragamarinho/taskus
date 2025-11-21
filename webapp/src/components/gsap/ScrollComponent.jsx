import React, { useRef, useEffect, useCallback } from 'react';
import './ScrollComponent.css'; // Vamos usar um arquivo CSS separado para os estilos

// --- Componente de Seção Reutilizável ---
const Section = ({ id, type, children, style }) => {
  return (
    <section id={id} className={`section section-${type}`} style={style}>
      <div className="section-content">
        <h2>{id.replace('-', ' ').toUpperCase()} - Tipo: {type.toUpperCase()}</h2>
        {children}
      </div>
    </section>
  );
};

// --- Tipos de Seções ---

// 1. Snap Scroll (Rolagem Completa)
const SnapSection = ({ id, children }) => (
  <Section id={id} type="snap">
    <p>Esta seção usa o efeito de "Snap Scroll". Ao rolar, ela se encaixa perfeitamente na próxima seção.</p>
    {children}
  </Section>
);

// 2. Sticky Scroll com Cards Internos
// Este tipo requer um container pai que gerencie a rolagem e a fixação dos cards.
// A complexidade do sticky scroll com empilhamento é melhor tratada com CSS e um pouco de JS para o efeito de "empilhamento"
// Aqui, vamos simular o efeito sticky com CSS simples, onde o conteúdo fica fixo enquanto o container rola.
const StickyCardsSection = ({ id, cards }) => {
  return (
    <Section id={id} type="sticky-cards">
      <p>Esta seção tem rolagem normal, mas os cards internos ficam fixos e se empilham (efeito simulado com CSS sticky).</p>
      <div className="sticky-container">
        {cards.map((card, index) => (
          <div key={index} className="sticky-card" style={{ top: `${index * 50}px` }}>
            <h3>Card {index + 1}</h3>
            <p>{card}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

// 3. Overlay Scroll (Seção de Baixo para Cima)
// Este efeito é puramente visual e pode ser alcançado com CSS e z-index.
const OverlaySection = ({ id, children }) => (
  <Section id={id} type="overlay" style={{ position: 'relative', zIndex: 1 }}>
    <p>Esta seção fica parada e a próxima vem de baixo para cima com um z-index maior, cobrindo-a.</p>
    {children}
  </Section>
);

// --- Componente Principal ---

const ScrollComponent = () => {
  // Para o Snap Scroll, vamos usar a propriedade CSS scroll-snap-type no container principal.
  // Para a navegação programática (como a transição de overlay), podemos usar refs.

  const snapContainerRef = useRef(null);

  // Exemplo de função para navegação programática (útil para o tipo 1 e 3)
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Exemplo de uso de um botão para ir para a próxima seção
  const NextButton = ({ targetId }) => (
    <button onClick={() => scrollToSection(targetId)} className="next-button">
      Ir para {targetId.replace('-', ' ').toUpperCase()}
    </button>
  );

  const cardsData = [
    "Detalhe 1: O card fica fixo enquanto você rola o conteúdo restante da seção.",
    "Detalhe 2: O próximo card se empilha sobre o anterior, criando um efeito visual interessante.",
    "Detalhe 3: Este é o último card empilhado. O container de rolagem continua até o final."
  ];

  return (
    <div className="scroll-component-wrapper">
      <h1>Componente de Rolagem com 3 Tipos de Transição</h1>
      <p>Use a rolagem do mouse para interagir com as seções.</p>

      {/* Container principal que gerencia a rolagem */}
      <div className="main-scroll-container" ref={snapContainerRef}>

        {/* Seção 1: Snap Scroll */}
        <SnapSection id="secao-1">
          <NextButton targetId="secao-2" />
        </SnapSection>

        {/* Seção 2: Sticky Cards */}
        <StickyCardsSection id="secao-2" cards={cardsData} />

        {/* Seção 3: Overlay Scroll (Base) */}
        <OverlaySection id="secao-3">
          <p>Esta é a seção de base para o efeito Overlay. Ela será coberta pela próxima.</p>
          <NextButton targetId="secao-4" />
        </OverlaySection>

        {/* Seção 4: Overlay Scroll (Cobrindo a 3) */}
        {/* Para o efeito de "vir de baixo para cima com z-index maior", a próxima seção
            precisa ter um z-index maior e estar posicionada de forma que cubra a anterior.
            O scroll-snap ajuda a garantir que a transição seja limpa. */}
        <OverlaySection id="secao-4" style={{ backgroundColor: '#4CAF50', zIndex: 2 }}>
          <p>Esta seção (4) cobre a seção 3. Note o z-index maior.</p>
          <NextButton targetId="secao-5" />
        </OverlaySection>

        {/* Seção 5: Snap Scroll */}
        <SnapSection id="secao-5">
          <NextButton targetId="secao-6" />
        </SnapSection>

        {/* Seção 6: Sticky Cards */}
        <StickyCardsSection id="secao-6" cards={cardsData.slice(0, 2)} />

      </div>
    </div>
  );
};

export default ScrollComponent;
