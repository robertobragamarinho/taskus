import React from 'react';

const ProgressBar = ({ percent, height = 4, color = '#1e3c72', className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      className="h-full rounded-full transition-all duration-100"
      style={{ width: `${percent}%`, height, backgroundColor: color }}
    />
  </div>
);

export default ProgressBar;