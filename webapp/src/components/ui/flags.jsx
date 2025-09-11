import React from 'react';

export const BrazilFlag = ({ className = "w-6 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="16" fill="#009739" rx="2" />
    <path 
      d="M12 2L20 8L12 14L4 8L12 2Z" 
      fill="#FEDD00" 
    />
    <circle cx="12" cy="8" r="3" fill="#012169" />
    <path 
      d="M10 6.5L14 6.5M10 8L14 8M10 9.5L14 9.5" 
      stroke="#FEDD00" 
      strokeWidth="0.3"
    />
  </svg>
);

export const USAFlag = ({ className = "w-6 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="16" fill="#B22234" rx="2" />
    <rect width="24" height="1.2" y="1.2" fill="white" />
    <rect width="24" height="1.2" y="3.6" fill="white" />
    <rect width="24" height="1.2" y="6" fill="white" />
    <rect width="24" height="1.2" y="8.4" fill="white" />
    <rect width="24" height="1.2" y="10.8" fill="white" />
    <rect width="24" height="1.2" y="13.2" fill="white" />
    <rect width="10" height="8.5" fill="#3C3B6E" rx="1" />
    <g fill="white">
      <circle cx="2" cy="1.5" r="0.3" />
      <circle cx="4" cy="1.5" r="0.3" />
      <circle cx="6" cy="1.5" r="0.3" />
      <circle cx="8" cy="1.5" r="0.3" />
      <circle cx="3" cy="2.5" r="0.3" />
      <circle cx="5" cy="2.5" r="0.3" />
      <circle cx="7" cy="2.5" r="0.3" />
      <circle cx="2" cy="3.5" r="0.3" />
      <circle cx="4" cy="3.5" r="0.3" />
      <circle cx="6" cy="3.5" r="0.3" />
      <circle cx="8" cy="3.5" r="0.3" />
      <circle cx="3" cy="4.5" r="0.3" />
      <circle cx="5" cy="4.5" r="0.3" />
      <circle cx="7" cy="4.5" r="0.3" />
      <circle cx="2" cy="5.5" r="0.3" />
      <circle cx="4" cy="5.5" r="0.3" />
      <circle cx="6" cy="5.5" r="0.3" />
      <circle cx="8" cy="5.5" r="0.3" />
      <circle cx="3" cy="6.5" r="0.3" />
      <circle cx="5" cy="6.5" r="0.3" />
      <circle cx="7" cy="6.5" r="0.3" />
    </g>
  </svg>
);
