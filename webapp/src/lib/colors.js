/**
 * Paleta de Cores do Projeto
 * Cores extraídas do design system fornecido
 */

export const colors = {
  // Cores Neutras
  white: '#ffffff',
  lightGray: '#f3f3f3',
  mediumGray: '#969696',
  darkGray: '#424242',
  black: '#333333',

  // Cores Primárias
  primaryBlue: '#1655ff',
  lightBlue: '#5590ff',

  // Cores de Destaque
  pink: '#ff1366',
  yellow: '#fed000',
};

/**
 * Paleta de cores organizada por categorias de uso
 */
export const colorPalette = {
  // Cores de fundo
  background: {
    primary: colors.white,
    secondary: colors.lightGray,
    dark: colors.black,
  },

  // Cores de texto
  text: {
    primary: colors.black,
    secondary: colors.darkGray,
    muted: colors.mediumGray,
    inverse: colors.white,
  },

  // Cores de UI
  ui: {
    primary: colors.primaryBlue,
    secondary: colors.lightBlue,
    accent: colors.pink,
    warning: colors.yellow,
    border: colors.lightGray,
    divider: colors.mediumGray,
  },

  // Estados
  states: {
    hover: colors.lightBlue,
    active: colors.primaryBlue,
    focus: colors.primaryBlue,
    disabled: colors.lightGray,
  },

  // Cores de feedback
  feedback: {
    success: colors.primaryBlue,
    error: colors.pink,
    warning: colors.yellow,
    info: colors.lightBlue,
  },
};

/**
 * Cores em formato CSS Custom Properties
 * Para uso direto no CSS/Tailwind
 */
export const cssVariables = {
  '--color-white': colors.white,
  '--color-light-gray': colors.lightGray,
  '--color-medium-gray': colors.mediumGray,
  '--color-dark-gray': colors.darkGray,
  '--color-black': colors.black,
  '--color-primary-blue': colors.primaryBlue,
  '--color-light-blue': colors.lightBlue,
  '--color-pink': colors.pink,
  '--color-yellow': colors.yellow,
};

/**
 * Configuração para Tailwind CSS
 * Cores que podem ser adicionadas ao tailwind.config.js
 */
export const tailwindColors = {
  'brand-white': colors.white,
  'brand-light-gray': colors.lightGray,
  'brand-medium-gray': colors.mediumGray,
  'brand-dark-gray': colors.darkGray,
  'brand-black': colors.black,
  'brand-primary': colors.primaryBlue,
  'brand-secondary': colors.lightBlue,
  'brand-accent': colors.pink,
  'brand-warning': colors.yellow,
};

/**
 * Gradientes usando as cores da paleta
 */
export const gradients = {
  primaryBlue: `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.lightBlue} 100%)`,
  accent: `linear-gradient(135deg, ${colors.pink} 0%, ${colors.primaryBlue} 100%)`,
  neutral: `linear-gradient(135deg, ${colors.lightGray} 0%, ${colors.mediumGray} 100%)`,
  warning: `linear-gradient(135deg, ${colors.yellow} 0%, ${colors.pink} 100%)`,
};

/**
 * Variações de opacidade para cada cor
 */
export const alphaColors = {
  primaryBlue: {
    10: `${colors.primaryBlue}1A`, // 10% opacity
    20: `${colors.primaryBlue}33`, // 20% opacity
    30: `${colors.primaryBlue}4D`, // 30% opacity
    50: `${colors.primaryBlue}80`, // 50% opacity
    70: `${colors.primaryBlue}B3`, // 70% opacity
    90: `${colors.primaryBlue}E6`, // 90% opacity
  },
  pink: {
    10: `${colors.pink}1A`,
    20: `${colors.pink}33`,
    30: `${colors.pink}4D`,
    50: `${colors.pink}80`,
    70: `${colors.pink}B3`,
    90: `${colors.pink}E6`,
  },
  black: {
    10: `${colors.black}1A`,
    20: `${colors.black}33`,
    30: `${colors.black}4D`,
    50: `${colors.black}80`,
    70: `${colors.black}B3`,
    90: `${colors.black}E6`,
  },
};

export default colors;
