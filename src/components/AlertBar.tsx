import React from 'react';

const AlertBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-center py-3 md:py-4 px-4 font-bold text-base md:text-lg animate-pulse sticky top-0 z-50 shadow-lg">
      <span className="hidden md:inline">🚨 Found Head Lice? Don't Panic - Get the REAL Solution That Actually Works 🚨</span>
      <span className="md:hidden">🚨 Found Lice? Get the REAL Solution 🚨</span>
    </div>
  );
};

export default AlertBar;