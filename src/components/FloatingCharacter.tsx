import React from 'react';

const FloatingCharacter: React.FC = () => {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-50 border-4 border-orange-500 hover:scale-110 hover:shadow-3xl transition-all duration-300 overflow-hidden group"
      onClick={scrollToOrder}
    >
      <img 
        src="/Lucy Know Lice Bug" 
        alt="Lucy Bug Character" 
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          // Fallback to emoji if image fails
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = '<div class="text-3xl md:text-4xl">🐛</div>';
          }
        }}
      />
      
      {/* Subtle pulse effect only on hover */}
      <div className="absolute inset-0 rounded-full border-4 border-orange-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
      
      {/* Optional: Small tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Get Help Now
      </div>
    </div>
  );
};

export default FloatingCharacter;